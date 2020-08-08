/**
 * State Manager
 * Belongs to LocalCDN (since 2020-02-26)
 * (Origin: Decentraleyes)
 *
 * @author      Thomas Rientjes
 * @since       2017-03-10
 *
 * @author      nobody
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

        chrome.storage.sync.get(Setting.AMOUNT_INJECTED, function (items) {

            interceptor.amountInjected = items.amountInjected;

            chrome.storage.sync.set({
                [Setting.AMOUNT_INJECTED]: ++interceptor.amountInjected
            });
        });

    } else {

        chrome.storage.sync.set({
            [Setting.AMOUNT_INJECTED]: ++interceptor.amountInjected
        });
    }
    if (stateManager.internalStatistics) {
        stats.setStats(injection);
    }
};

stateManager.addDomainToWhitelist = function (domain) {

    return new Promise((resolve) => {

        let whitelistedDomains = requestAnalyzer.whitelistedDomains;
        whitelistedDomains[domain] = true;

        chrome.storage.sync.set({whitelistedDomains}, resolve);
    });
};

stateManager.removeDomainFromWhitelist = function (domain) {

    return new Promise((resolve) => {

        let whitelistedDomains = requestAnalyzer.whitelistedDomains;
        delete whitelistedDomains[domain];

        chrome.storage.sync.set({whitelistedDomains}, resolve);
    });
};

stateManager.addDomainToManipulateDOMlist = function (domain) {

    return new Promise((resolve) => {

        let domainsManipulateDOM = requestAnalyzer.domainsManipulateDOM;
        domainsManipulateDOM[domain] = true;

        chrome.storage.sync.set({domainsManipulateDOM}, resolve);
    });
};

stateManager.removeDomainFromManipulateDOMlist = function (domain) {

    return new Promise((resolve) => {

        let domainsManipulateDOM = requestAnalyzer.domainsManipulateDOM;
        delete domainsManipulateDOM[domain];

        chrome.storage.sync.set({domainsManipulateDOM}, resolve);
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

        tab = stateManager.tabs[tabIdentifier].details || {};
        return interceptor.handleRequest(requestDetails, tabIdentifier, tab);

    }, requestFilters, [WebRequest.BLOCKING]);
};

stateManager._removeTab = function (tabIdentifier) {
    delete stateManager.tabs[tabIdentifier];
};

stateManager._updateTab = function (details) {

    let tabDomain, domainIsWhitelisted, frameIdentifier, tabIdentifier;

    tabDomain = helpers.extractDomainFromUrl(details.url, true);
    domainIsWhitelisted = stateManager._domainIsListed(tabDomain);

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
    if (Setting.NEGATE_HTML_FILTER_LIST in changes) {
        stateManager.getInvertOption = changes.negateHtmlFilterList.newValue;
    }
    if (Setting.SELECTED_ICON in changes) {
        stateManager.selectedIcon = changes.selectedIcon.newValue;
    }
    if (Setting.INTERNAL_STATISTICS in changes) {
        stateManager.internalStatistics = changes.internalStatistics.newValue;
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

stateManager._domainIsListed = function (domain, listname) {

    if (domain !== null) {

        let whitelistRecord, isWhitelisted;

        if (listname === "manipulate-dom") {
            whitelistRecord = requestAnalyzer.domainsManipulateDOM[domain];
            isWhitelisted = Boolean(whitelistRecord);
        } else {
            whitelistRecord = requestAnalyzer.whitelistedDomains[domain];
            isWhitelisted = Boolean(whitelistRecord);
        }

        return isWhitelisted;
    }

    return false;
};

stateManager._setIconDisabled = function (tabIdentifier) {

    wrappers.setIcon({
        'path': stateManager.selectedIcon,
        'tabId': tabIdentifier
    }, 'Disabled');
};


/**
 * Initializations
 */

stateManager.requests = {};
stateManager.tabs = {};
stateManager.getInvertOption = false;
stateManager.validHosts = [];
stateManager.selectedIcon = 'Default';
stateManager.internalStatistics = false;

for (let mapping in mappings) {

    let supportedHost = Address.ANY_PROTOCOL + mapping + Address.ANY_PATH;
    stateManager.validHosts.push(supportedHost);
}

chrome.tabs.query({}, function (tabs) {
    tabs.forEach(stateManager._createTab);
});

chrome.storage.sync.get([Setting.SHOW_ICON_BADGE, Setting.SELECTED_ICON], function (items) {

    if (items.showIconBadge === undefined) {
        items.showIconBadge = true;
    }
    if (items.selectedIcon === undefined) {
        stateManager.selectedIcon = 'Default';
    }
    stateManager.showIconBadge = items.showIconBadge;
    stateManager.selectedIcon = items.selectedIcon;
});

chrome.storage.local.get([Setting.INTERNAL_STATISTICS], function (items) {
    stateManager.internalStatistics = items.internalStatistics;
});


/**
 * Event Handlers
 */

chrome.tabs.onCreated.addListener(stateManager._createTab);
chrome.tabs.onRemoved.addListener(stateManager._removeTab);

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
