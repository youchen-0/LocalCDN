/**
 * State Manager
 * Belongs to Decentraleyes.
 *
 * @author      Thomas Rientjes
 * @since       2017-03-10
 *
 * @author      nobody42
 * @since       2020-02-26
 *
 * @license     MPL 2.0
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

/**
 * State Manager
 */

var stateManager = {};

/**
 * Public Methods
 */

stateManager.registerInjection = function (tabIdentifier, injection) {

    let injectionIdentifier, registeredTab, injectionCount;

    injectionIdentifier = injection.source + injection.path + injection.version;
    registeredTab = stateManager.tabs[tabIdentifier];

    registeredTab.injections[injectionIdentifier] = injection;
    injectionCount = Object.keys(registeredTab.injections).length || 0;

    if (injectionCount > 0) {

        chrome.browserAction.setTitle({
            'tabId': tabIdentifier,
            'title': `LocalCDN (${injectionCount})`
        });

        if (stateManager.showIconBadge === true) {

            wrappers.setBadgeText({
                'tabId': tabIdentifier,
                'text': injectionCount.toString()
            });
        }
    }

    if (isNaN(interceptor.amountInjected)) {

        chrome.storage.local.get(Setting.AMOUNT_INJECTED, function (items) {

            interceptor.amountInjected = items.amountInjected;

            chrome.storage.local.set({
                [Setting.AMOUNT_INJECTED]: ++interceptor.amountInjected
            });
        });

    } else {

        chrome.storage.local.set({
            [Setting.AMOUNT_INJECTED]: ++interceptor.amountInjected
        });
    }
};

stateManager.setEnvironment = function (environment) {

    if (environment === Environment.STABLE) {

        // Strike a balance between coverage and website stability.
        files.active = files.stable;

    } else if (environment === Environment.STAGING) {

        // Improve coverage at the expense of website stability.
        files.active = Object.assign({}, files.stable, files.staging);
    }
};

stateManager.updateEnvironment = function (preferredEnvironment) {

    return new Promise((resolve) => {

        if (preferredEnvironment === Environment.STABLE) {

            let requiredItems = [Setting.BLOCK_MISSING, Setting.ENFORCE_STAGING];

            chrome.storage.local.get(requiredItems, function (items) {

                if (items.blockMissing === true || items.enforceStaging === true) {
                    stateManager.setEnvironment(Environment.STAGING);
                } else {
                    stateManager.setEnvironment(Environment.STABLE);
                }

                resolve();
            });

        } else if (preferredEnvironment === Environment.STAGING) {

            stateManager.setEnvironment(Environment.STAGING);
            resolve();
        }
    });
};

stateManager.addDomainToWhitelist = function (domain) {

    return new Promise((resolve) => {

        let whitelistedDomains = requestAnalyzer.whitelistedDomains;
        whitelistedDomains[domain] = true;

        chrome.storage.local.set({whitelistedDomains}, resolve);
    });
};

stateManager.removeDomainFromWhitelist = function (domain) {

    return new Promise((resolve) => {

        let whitelistedDomains = requestAnalyzer.whitelistedDomains;
        delete whitelistedDomains[domain];

        chrome.storage.local.set({whitelistedDomains}, resolve);
    });
};

/**
 * Private Methods
 */

stateManager._createTab = function (tab) {

    let tabIdentifier, requestFilters;

    tabIdentifier = tab.id;

    stateManager.tabs[tabIdentifier] = {
        'injections': {}
    };

    requestFilters = {
        'tabId': tabIdentifier,
        'urls': stateManager.validHosts
    };

    chrome.webRequest.onBeforeRequest.addListener(function (requestDetails) {

        let tab = stateManager.tabs[tabIdentifier].details || {};
        return interceptor.handleRequest(requestDetails, tabIdentifier, tab);

    }, requestFilters, [WebRequest.BLOCKING]);
};

stateManager._removeTab = function (tabIdentifier) {
    delete stateManager.tabs[tabIdentifier];
};

stateManager._updateTab = function (details) {

    let tabDomain, domainIsWhitelisted, frameIdentifier, tabIdentifier;

    tabDomain = helpers.extractDomainFromUrl(details.url, true);
    domainIsWhitelisted = stateManager._domainIsWhitelisted(tabDomain);

    frameIdentifier = details.frameId;
    tabIdentifier = details.tabId;

    if (frameIdentifier !== 0 || tabIdentifier === -1) {
        return;
    }

    chrome.browserAction.setTitle({
        'tabId': tabIdentifier,
        'title': 'LocalCDN (0)'
    });

    if (domainIsWhitelisted) {

        stateManager._setIconDisabled(tabIdentifier);

        chrome.browserAction.setTitle({
            'tabId': tabIdentifier,
            'title': 'LocalCDN (–)'
        });
    }

    if (stateManager.showIconBadge === true) {
        stateManager._clearBadgeText(tabIdentifier);
    }

    if (stateManager.tabs[tabIdentifier]) {
        stateManager.tabs[tabIdentifier].injections = {};
    }
};

stateManager._handleStorageChanged = function (changes) {

    if (Setting.BLOCK_MISSING in changes) {

        if (changes.blockMissing.newValue === true) {
            stateManager.updateEnvironment(Environment.STAGING);
        } else {
            stateManager.updateEnvironment(Environment.STABLE);
        }
    }

    if (Setting.ENFORCE_STAGING in changes) {

        if (changes.enforceStaging.newValue === true) {
            stateManager.updateEnvironment(Environment.STAGING);
        } else {
            stateManager.updateEnvironment(Environment.STABLE);
        }
    }

    if (Setting.SHOW_ICON_BADGE in changes) {

        stateManager.showIconBadge = changes.showIconBadge.newValue;

        if (changes.showIconBadge.newValue !== true) {

            chrome.tabs.query({}, function (tabs) {
                tabs.forEach(stateManager._removeIconBadgeFromTab);
            });
        }
    }

    if (Setting.STRIP_METADATA in changes) {

        requestSanitizer.disable();

        if (changes.stripMetadata.newValue !== false) {
            requestSanitizer.enable();
        }
    }
};

stateManager._clearBadgeText = function (tabIdentifier) {

    wrappers.setBadgeText({
        'tabId': tabIdentifier,
        'text': ''
    });
};

stateManager._removeIconBadgeFromTab = function (tab) {
    stateManager._clearBadgeText(tab.id);
};

stateManager._domainIsWhitelisted = function (domain) {

    if (domain !== null) {

        let whitelistRecord, isWhitelisted;

        whitelistRecord = requestAnalyzer.whitelistedDomains[domain];
        isWhitelisted = Boolean(whitelistRecord);

        return isWhitelisted;
    }

    return false;
};

stateManager._setIconDisabled = function (tabIdentifier) {

    wrappers.setIcon({
        'path': stateManager.disabledIconPath,
        'tabId': tabIdentifier
    });
};

stateManager._getContentType = function (headers) {

    // by Jaap (https://gitlab.com/Jaaap)
    for (let header of headers) {
        if (header.name.toLowerCase() === "content-type") { //"text/html; charset=UTF-8"
            return {
                mimeType: header.value.replace(/;.*/, '').toLowerCase(),
                charset: /charset\s*=/.test(header.value) ? header.value.replace(/^.*?charset\s*=\s*/, '') : 'UTF-8'
            };
        }
    }
    return { mimeType: '', charset: '' };
};

stateManager._removeCrossoriginAndIntegrityAttr = function (details) {

    // by Jaap (https://gitlab.com/Jaaap)
    let { mimeType, charset } = stateManager._getContentType(details.responseHeaders);

    let initiatorDomain = helpers.extractDomainFromUrl(details.url, true) || Address.EXAMPLE;
    let isWhitelisted = requestAnalyzer.whitelistedDomains[initiatorDomain];
    let cdnDomainsRE = new RegExp("//(" + Object.keys(mappings).map(m => m.replace(/\W/g, '\\$&')).join('|') + ")/");

    if (!isWhitelisted && mimeType === "text/html") {
        let decoder = new TextDecoder(charset);
        let encoder = new TextEncoder();

        let filter = browser.webRequest.filterResponseData(details.requestId);

        //Note that this will not work if the '<script crossorigin="anonymous" src="dfgsfgd.com">' string is divided into two chunks, but we want to flush this data asap.
        filter.ondata = evt => {
            //remove crossorigin and integrity attributes
            let str = decoder.decode(evt.data, {stream: true}).replace(/<(link|script)[^>]+>/ig, m => {
                if (cdnDomainsRE.test(m))
                    return m.replace(/\s+(integrity|crossorigin)(="[^"]*"|='[^']*'|=[^"'`=\s]+|)/ig, "");
                return m;
            });
            filter.write(encoder.encode(str));
        }

        filter.onstop = evt => {
            let str = decoder.decode(); // end-of-stream
            filter.write(encoder.encode(str));
            filter.close();
        }
    }
};

/**
 * Initializations
 */

stateManager.requests = {};
stateManager.tabs = {};

stateManager.disabledIconPath = {
    '16': chrome.runtime.getURL('icons/action/icon16-disabled.png'),
    '18': chrome.runtime.getURL('icons/action/icon18-disabled.png'),
    '19': chrome.runtime.getURL('icons/action/icon19-disabled.png'),
    '32': chrome.runtime.getURL('icons/action/icon32-disabled.png'),
    '36': chrome.runtime.getURL('icons/action/icon36-disabled.png'),
    '38': chrome.runtime.getURL('icons/action/icon38-disabled.png'),
    '64': chrome.runtime.getURL('icons/action/icon64-disabled.png')
};

stateManager.validHosts = [];

for (let mapping in mappings) {

    let supportedHost = Address.ANY_PROTOCOL + mapping + Address.ANY_PATH;
    stateManager.validHosts.push(supportedHost);
}

chrome.tabs.query({}, function (tabs) {
    tabs.forEach(stateManager._createTab);
});

chrome.storage.local.get(Setting.SHOW_ICON_BADGE, function (items) {

    if (items.showIconBadge === undefined) {
        items.showIconBadge = true;
    }

    stateManager.showIconBadge = items.showIconBadge;
});

/**
 * Event Handlers
 */

chrome.tabs.onCreated.addListener(stateManager._createTab);
chrome.tabs.onRemoved.addListener(stateManager._removeTab);

chrome.webRequest.onHeadersReceived.addListener(function (response) {

        stateManager._removeCrossoriginAndIntegrityAttr(response)

}, {'types': [WebRequestType.MAIN_FRAME], 'urls': [Address.ANY]}, [WebRequest.BLOCKING, WebRequest.RESPONSE_HEADERS]);

chrome.webRequest.onBeforeRequest.addListener(function (requestDetails) {

    if (requestDetails.tabId !== -1 && stateManager.tabs[requestDetails.tabId]) {

        stateManager.tabs[requestDetails.tabId].details = {
            'url': requestDetails.url
        };
    }

}, {'types': [WebRequestType.MAIN_FRAME], 'urls': [Address.ANY]}, [WebRequest.BLOCKING]);

chrome.webNavigation.onCommitted.addListener(stateManager._updateTab, {
    'url': [{'urlContains': ':'}]
});

chrome.webRequest.onErrorOccurred.addListener(function (requestDetails) {

    if (stateManager.requests[requestDetails.requestId]) {
        delete stateManager.requests[requestDetails.requestId];
    }

}, {'urls': [Address.ANY]});

chrome.webRequest.onBeforeRedirect.addListener(function (requestDetails) {

    let knownRequest = stateManager.requests[requestDetails.requestId];

    if (knownRequest) {

        stateManager.registerInjection(knownRequest.tabIdentifier, knownRequest.targetDetails);
        delete stateManager.requests[requestDetails.requestId];
    }

}, {'urls': [Address.ANY]});

chrome.storage.onChanged.addListener(stateManager._handleStorageChanged);
