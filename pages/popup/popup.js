/**
 * Main Popup Page
 * Belongs to LocalCDN (since 2020-02-26)
 * (Origin: Decentraleyes)
 *
 * @author      Thomas Rientjes
 * @since       2016-08-09
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
 * Popup
 */

var popup = {};


const PopupLinks = {
    'statistics': Links.STATISTICS,
    'translation': Links.WEBLATE,
    'logging': Links.LOGGING,
    'faq-html-filter': Links.FAQ_HTML_FILTER,
    'donate': Links.DONATE,
};

/**
 * Private Methods
 */

popup._renderContents = function () {
    helpers.insertI18nContentIntoDocument(document);
    helpers.insertI18nTitlesIntoDocument(document);

    if (!helpers.insertI18nContentIntoDocument(document)) {
        popup._renderLocaleNotice();
    }

    popup._renderNonContextualContents();

    popup._determineTargetTab()
        .then(popup._determineDomainAllowlistStatus)
        .then(popup._determineStatusManipulateDOM)
        .then(popup._determineResourceInjections)
        .then(popup._determineNegateHtmlFilterOption)
        .then(popup._renderContextualContents);

    if (BrowserType.CHROMIUM) {
        document.getElementById('div-manipulateDOM').hidden = true;
    }
};

popup._renderNonContextualContents = function () {
    let versionLabelElement, nameLabelElement, counterElement, testingUtilityLinkElement,
        optionsButtonElement, donationButtonElement, infoButtonLabel;

    versionLabelElement = document.getElementById('version-label');
    nameLabelElement = document.getElementById('name-label');
    counterElement = document.getElementById('injection-counter');
    testingUtilityLinkElement = document.getElementById('testing-utility-link');
    optionsButtonElement = document.getElementById('options-button');
    donationButtonElement = document.getElementById('donate-button');
    infoButtonLabel = document.getElementById('manipulateDOM-indicator');

    versionLabelElement.innerText = popup._version;
    nameLabelElement.innerText = popup._name;
    counterElement.innerText = helpers.formatNumber(popup._amountInjected);

    testingUtilityLinkElement.addEventListener('mouseup', popup._onTestingUtilityLinkClicked);
    optionsButtonElement.addEventListener('mouseup', popup._onOptionsButtonClicked);
    donationButtonElement.addEventListener('mouseup', popup._onButtonClicked);
    infoButtonLabel.addEventListener('mouseup', popup._onButtonClicked);

    if (popup._statisticsStatus) {
        document.getElementById('statistics-button').style.display = 'block';
        document.getElementById('statistics-button').addEventListener('mouseup', popup._onButtonClicked);
    }

    if (popup._loggingStatus) {
        document.getElementById('logging-button').style.display = 'block';
        document.getElementById('logging-button').addEventListener('mouseup', popup._onButtonClicked);
    }

    if (!popup.hideDonationButton) {
        document.getElementById('donate-button').style.display = 'flex';
    }
};

popup._renderContextualContents = function () {
    if (popup._domain !== null) {
        popup._renderDomainAllowlistPanel();
        document.getElementById('testing-utility-link').style.display = 'block';
    }

    if (Object.keys(popup._resourceInjections).length > 0) {
        popup._renderInjectionPanel(popup._resourceInjections);
    }
};

popup._renderDomainAllowlistPanel = function () {
    let websiteContextElement, protectionToggleElement, domainIndicatorElement,
        manipulateDOMToggleElement, manipulateDOMToggleStyle;

    websiteContextElement = document.getElementById('website-context');
    protectionToggleElement = document.getElementById('protection-toggle-switch');
    domainIndicatorElement = document.getElementById('domain-indicator');

    protectionToggleElement.setAttribute('dir', popup._scriptDirection);
    domainIndicatorElement.innerText = popup._domain;
    manipulateDOMToggleElement = document.getElementById('manipulateDOM-toggle-switch');
    manipulateDOMToggleStyle = document.getElementById('toggle-switch-manipulateDOM');

    if (popup._domainIsAllowlisted === true) {
        manipulateDOMToggleElement.disabled = true;
        protectionToggleElement.checked = false;

        manipulateDOMToggleStyle.setAttribute('class', 'slider-disabled');
        protectionToggleElement.addEventListener('click', popup._enableProtection);
    } else {
        manipulateDOMToggleElement.disabled = false;
        manipulateDOMToggleStyle.setAttribute('class', 'slider');

        protectionToggleElement.checked = true;
        protectionToggleElement.addEventListener('click', popup._disableProtection);

        if (popup.negateHtmlFilterList && !popup._domainManipulateDOM) {
            manipulateDOMToggleElement.checked = true;
            manipulateDOMToggleElement.addEventListener('click', popup._enableManipulateDOM);
        } else if (!popup.negateHtmlFilterList && !popup._domainManipulateDOM) {
            manipulateDOMToggleElement.checked = false;
            manipulateDOMToggleElement.addEventListener('click', popup._enableManipulateDOM);
        } else if (popup.negateHtmlFilterList && popup._domainManipulateDOM) {
            manipulateDOMToggleElement.checked = false;
            manipulateDOMToggleElement.addEventListener('click', popup._disableManipulateDOM);
        } else if (!popup.negateHtmlFilterList && popup._domainManipulateDOM) {
            manipulateDOMToggleElement.checked = true;
            manipulateDOMToggleElement.addEventListener('click', popup._disableManipulateDOM);
        }
    }

    websiteContextElement.setAttribute('class', 'panel');
};

popup._renderInjectionPanel = function (groupedInjections) {
    let websiteContextElement, injectionOverviewElement;

    websiteContextElement = document.getElementById('website-context');
    injectionOverviewElement = popup._createInjectionOverviewElement(groupedInjections);
    injectionOverviewElement.setAttribute('class', 'panel-overflow');
    websiteContextElement.append(injectionOverviewElement);
};

popup._enableProtection = function () {
    let message = {
        'topic': 'allowlist:remove-domain',
        'value': popup._domain,
    };

    chrome.runtime.sendMessage(message, function () {
        popup._onToggled();
    });
};

popup._disableProtection = function () {
    let message = {
        'topic': 'allowlist:add-domain',
        'value': popup._domain,
    };

    chrome.runtime.sendMessage(message, function () {
        popup._onToggled();
    });
};

popup._enableManipulateDOM = function () {
    let message = {
        'topic': 'manipulateDOM:add-domain',
        'value': popup._domain,
    };

    chrome.runtime.sendMessage(message, function () {
        popup._onToggled();
    });
};

popup._disableManipulateDOM = function () {
    let message = {
        'topic': 'manipulateDOM:remove-domain',
        'value': popup._domain,
    };

    chrome.runtime.sendMessage(message, function () {
        popup._onToggled();
    });
};

popup._determineDomainAllowlistStatus = function () {
    return new Promise((resolve) => {
        let message = {
            'topic': 'domain:fetch-is-allowlisted',
            'value': popup._domain,
        };

        if (popup._domain === null) {
            return;
        }

        chrome.runtime.sendMessage(message, function (response) {
            popup._domainIsAllowlisted = response.value;
            resolve();
        });
    });
};

popup._determineStatusManipulateDOM = function () {
    return new Promise((resolve) => {
        let message = {
            'topic': 'domain:fetch-is-manipulateDOM',
            'value': popup._domain,
        };

        chrome.runtime.sendMessage(message, function (response) {
            popup._domainManipulateDOM = response.value;
            resolve();
        });
    });
};

popup._determineResourceInjections = function () {
    return new Promise((resolve) => {
        let message = {
            'topic': 'tab:fetch-injections',
            'value': popup._targetTab.id,
        };

        chrome.runtime.sendMessage(message, function (response) {
            let groupedInjections = popup._groupResourceInjections(response.value);
            popup._resourceInjections = groupedInjections;

            resolve();
        });
    });
};

popup._determineTargetTab = function () {
    return new Promise((resolve) => {
        helpers.determineActiveTab().then((activeTab) => {
            popup._targetTab = activeTab;
            popup._domain = helpers.extractDomainFromUrl(activeTab.url, true);
            resolve();
        });
    });
};

popup._getData = function () {
    return new Promise((resolve) => {
        let message = {
            'topic': 'popup:get-data'
        };

        chrome.runtime.sendMessage(message, function (items) {
            popup._amountInjected = items.data.amountInjected;
            popup._statisticsStatus = items.data.internalStatistics;
            popup.negateHtmlFilterList = items.data.negateHtmlFilterList;
            popup._loggingStatus = items.data.loggingStatus;
            popup.hideDonationButton = items.data.hideDonationButton;
            resolve();
        });
    });
};

popup._groupResourceInjections = function (injections) {
    let groupedInjections = {};

    for (let index in injections) {
        let {source} = injections[index];

        groupedInjections[source] = groupedInjections[source] || [];
        groupedInjections[source].push(injections[index]);
    }

    return groupedInjections;
};

popup._createInjectionOverviewElement = function (groupedInjections) {
    let injectionOverviewElement = document.createElement('ul');
    injectionOverviewElement.setAttribute('class', 'list');

    for (let source in groupedInjections) {
        let injectionGroupHeaderElement, injectionGroupElement, cdn;

        cdn = groupedInjections[source];

        injectionGroupHeaderElement = popup._createInjectionGroupHeaderElement(source, cdn);
        injectionGroupElement = popup._createInjectionGroupElement(source, cdn);

        injectionOverviewElement.appendChild(injectionGroupHeaderElement);
        injectionOverviewElement.appendChild(injectionGroupElement);
    }

    return injectionOverviewElement;
};

popup._createInjectionGroupHeaderElement = function (source, cdn) {
    let injectionGroupHeaderElement, badgeElement, badgeTextNode, cdnNameTextNode;

    injectionGroupHeaderElement = document.createElement('li');
    injectionGroupHeaderElement.setAttribute('class', 'list-item');

    badgeElement = document.createElement('span');
    badgeElement.setAttribute('class', 'badge');

    badgeTextNode = document.createTextNode(cdn.length);
    badgeElement.appendChild(badgeTextNode);

    cdnNameTextNode = document.createTextNode(helpers.determineCdnName(source));

    injectionGroupHeaderElement.appendChild(badgeElement);
    injectionGroupHeaderElement.appendChild(cdnNameTextNode);

    return injectionGroupHeaderElement;
};

popup._createInjectionGroupElement = function (source, cdn) {
    let injectionGroupElement, bundle, filtered;

    // Filter duplicates
    bundle = [];
    for (let injection of cdn) {
        bundle.push(injection);
    }
    filtered = popup._filterDuplicates(bundle, 'bundle');

    injectionGroupElement = document.createElement('ul');
    injectionGroupElement.setAttribute('class', 'sublist');

    for (let injection of filtered) {
        let injectionElement = popup._createInjectionElement(injection);
        injectionGroupElement.appendChild(injectionElement);
    }

    return injectionGroupElement;
};

popup._createInjectionElement = function (injection) {
    let injectionElement, filename, name, nameTextNode, noteElement, noteTextNode;

    injectionElement = document.createElement('li');
    injectionElement.setAttribute('class', 'sublist-item');

    filename = helpers.extractFilenameFromPath(injection.path);

    // If bundle empty, use filename
    if (injection.bundle === '') {
        name = targets.determineResourceName(filename);
    } else {
        name = `${injection.bundle}`;
    }

    nameTextNode = document.createTextNode(`- ${name}`);
    injectionElement.appendChild(nameTextNode);

    if (injection.versionRequested !== null) {
        noteElement = document.createElement('span');
        noteElement.setAttribute('class', 'side-note');

        let versionNode;

        if (injection.versionRequested === undefined || injection.versionDelivered === undefined) {
            versionNode = '';
        } else if (injection.versionRequested === injection.versionDelivered) {
            versionNode = ` v${injection.versionRequested}`;
        } else if (injection.versionRequested === 'beta') {
            versionNode = ` ${injection.versionRequested}`;
        } else if (injection.versionRequested !== 'latest') {
            versionNode = ` (v${injection.versionRequested} » v${injection.versionDelivered})`;
        } else if (injection.versionRequested === 'latest') {
            versionNode = ` v${injection.versionDelivered}`;
        } else {
            versionNode = '';
        }
        noteTextNode = document.createTextNode(versionNode);
        noteElement.appendChild(noteTextNode);
        injectionElement.appendChild(noteElement);
    }

    return injectionElement;
};

popup._filterDuplicates = function (array, key) {
    /**
     * Function to remove duplicates from an array, depending on 'key'.
     * Ignore empty values of the 'key'
     *
     */
    let filtered = array
        .map((e) => e[key])
        .map(function (value, index, newArray) {
            return value !== '' ? newArray.indexOf(value) === index && index : index;
        })
        .filter((e) => array[e])
        .map((e) => array[e]);

    return filtered;
};

popup._renderLocaleNotice = function () {
    let localeNoticeElement, nameTextNode;

    localeNoticeElement = document.getElementById('popup-incomplete-translation');
    localeNoticeElement.setAttribute('class', 'notice notice-default');
    localeNoticeElement.addEventListener('mouseup', popup._onButtonClicked);

    nameTextNode = document.createTextNode('Translation is incomplete. You want to help on Weblate?');

    localeNoticeElement.appendChild(nameTextNode);
};


/**
 * Event Handlers
 */

popup._onDocumentLoaded = function () {
    let manifest, language;

    manifest = chrome.runtime.getManifest();
    language = navigator.language;

    popup._name = manifest.name;
    popup._version = manifest.version;
    popup._scriptDirection = helpers.determineScriptDirection(language);

    popup._getData().then(popup._renderContents);
};

popup._onTestingUtilityLinkClicked = function (event) {
    if (event.button === 0 || event.button === 1) {
        chrome.tabs.create({
            'url': Links.LOCALCDN_TEST_WEBSITE,
            'active': event.button === 0,
        }, function (tab) {
            popup._injectDomain(tab.id);
        });
    }

    if (event.button === 0) {
        window.close();
    }
};

popup._injectDomain = function (tabId) {
    let message = {
        'topic': 'tab:inject',
        'value': tabId,
        'url': popup._targetTab.url
    };

    chrome.runtime.sendMessage(message);
};

popup._onOptionsButtonClicked = function () {
    chrome.runtime.openOptionsPage();
    return window.close();
};

popup._onToggled = function () {
    let bypassCache = typeof browser === 'undefined';

    chrome.tabs.reload(popup._targetTab.id, {bypassCache});
    setTimeout(function () {
        popup._close();
    }, 200);
};

popup._close = function () {
    chrome.runtime.getPlatformInfo(function (information) {
        if (information.os === chrome.runtime.PlatformOs.ANDROID) {
            chrome.tabs.getCurrent(function (activeTab) {
                if (activeTab) {
                    chrome.tabs.remove(activeTab.id);
                } else {
                    window.close();
                }
            });
        } else {
            window.close();
        }
    });
};

popup._onButtonClicked = function ({target}) {
    let data = target.getAttribute('data-link');
    if (event.button === 0 || event.button === 1) {
        chrome.tabs.create({
            'url': PopupLinks[data],
            'active': event.button === 0,
        });
    }
    if (event.button === 0) {
        window.close();
    }
};

/**
 * Initializations
 */

popup.negateHtmlFilterList = false;
popup._statisticsStatus = false;
popup._loggingStatus = false;

document.addEventListener('DOMContentLoaded', popup._onDocumentLoaded);
