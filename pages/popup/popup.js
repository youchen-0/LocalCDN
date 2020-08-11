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
        .then(popup._determineDomainWhitelistStatus)
        .then(popup._determineStatusManipulateDOM)
        .then(popup._determineResourceInjections)
        .then(popup._determineNegateHtmlFilterOption)
        .then(popup._renderContextualContents);

    if (BrowserType.CHROMIUM) {
        document.getElementById('div-manipulateDOM').hidden = true;
    }
};

popup._renderNonContextualContents = function () {
    let versionLabelElement, nameLabelElement, counterElement, testingUtilityLinkElement, optionsButtonElement, donationButtonElement, infoButtonLabel;

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
    donationButtonElement.addEventListener('mouseup', popup._onDonationButtonClicked);
    infoButtonLabel.addEventListener('mouseup', popup._onInfoButtonClicked);

    if (popup._statisticsStatus) {
        document.getElementById('statistics-button').style.display = 'block';
        document.getElementById('statistics-button').addEventListener('mouseup', popup._onStatisticsButtonClicked);
    }
};

popup._renderContextualContents = function () {
    if (popup._domain !== null) {
        popup._renderDomainWhitelistPanel();
    }

    if (Object.keys(popup._resourceInjections).length > 0) {
        popup._renderInjectionPanel(popup._resourceInjections);
    }
};

popup._renderDomainWhitelistPanel = function () {
    let websiteContextElement, protectionToggleElement, domainIndicatorElement, manipulateDOMToggleElement, manipulateDOMToggleStyle;

    websiteContextElement = document.getElementById('website-context');
    protectionToggleElement = document.getElementById('protection-toggle-switch');
    domainIndicatorElement = document.getElementById('domain-indicator');

    protectionToggleElement.setAttribute('dir', popup._scriptDirection);
    domainIndicatorElement.innerText = popup._domain;
    manipulateDOMToggleElement = document.getElementById('manipulateDOM-toggle-switch');
    manipulateDOMToggleStyle = document.getElementById('toggle-switch-manipulateDOM');

    if (popup._domainIsWhitelisted === true) {
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
        topic: 'whitelist:remove-domain',
        value: popup._domain,
    };

    chrome.runtime.sendMessage(message, function () {
        popup._onToggled();
    });
};

popup._disableProtection = function () {
    let message = {
        topic: 'whitelist:add-domain',
        value: popup._domain,
    };

    chrome.runtime.sendMessage(message, function () {
        popup._onToggled();
    });
};

popup._enableManipulateDOM = function () {
    let message = {
        topic: 'manipulateDOM:add-domain',
        value: popup._domain,
    };

    chrome.runtime.sendMessage(message, function () {
        popup._onToggled();
    });
};

popup._disableManipulateDOM = function () {
    let message = {
        topic: 'manipulateDOM:remove-domain',
        value: popup._domain,
    };

    chrome.runtime.sendMessage(message, function () {
        popup._onToggled();
    });
};

popup._determineDomainWhitelistStatus = function () {
    return new Promise((resolve) => {
        let message = {
            topic: 'domain:fetch-is-whitelisted',
            value: popup._domain,
        };

        chrome.runtime.sendMessage(message, function (response) {
            popup._domainIsWhitelisted = response.value;
            resolve();
        });
    });
};

popup._determineStatusManipulateDOM = function () {
    return new Promise((resolve) => {
        let message = {
            topic: 'domain:fetch-is-manipulateDOM',
            value: popup._domain,
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
            topic: 'tab:fetch-injections',
            value: popup._targetTab.id,
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
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            popup._targetTab = tabs[0];
            popup._domain = helpers.extractDomainFromUrl(tabs[0].url, true);

            resolve();
        });
    });
};

popup._determineAmountInjected = function () {
    return new Promise((resolve) => {
        chrome.storage.sync.get(Setting.AMOUNT_INJECTED, function (items) {
            popup._amountInjected = items.amountInjected || 0;
            resolve();
        });
    });
};

popup._determineNegateHtmlFilterOption = function () {
    return new Promise((resolve) => {
        chrome.storage.sync.get(Setting.NEGATE_HTML_FILTER_LIST, function (items) {
            popup.negateHtmlFilterList = items.negateHtmlFilterList;
            resolve();
        });
    });
};

popup._getStatisticsStatus = function () {
    return new Promise((resolve) => {
        chrome.storage.local.get(Setting.INTERNAL_STATISTICS, function (items) {
            popup._statisticsStatus = items.internalStatistics || false;
            resolve();
        });
    });
};

popup._groupResourceInjections = function (injections) {
    let groupedInjections = {};

    for (let index in injections) {
        let { source } = injections[index];

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
    let injectionGroupElement;

    // Filter duplicates
    let bundle = [];
    for (let injection of cdn) {
        bundle.push(injection);
    }
    let filtered = popup._filterDuplicates(bundle, 'bundle');

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
        name = helpers.determineResourceName(filename);
    } else {
        name = injection.bundle + ' (Bundle)';
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
        .map((value, index, newArray) => (value != '' ? newArray.indexOf(value) === index && index : index))
        .filter((e) => array[e])
        .map((e) => array[e]);

    return filtered;
};

popup._renderLocaleNotice = function () {
    let localeNoticeElement, nameTextNode;

    localeNoticeElement = document.getElementById('popup-incomplete-translation');
    localeNoticeElement.setAttribute('class', 'notice notice-default');
    localeNoticeElement.addEventListener('mouseup', popup._onIncompleteTranslation);

    nameTextNode = document.createTextNode('Translation is incomplete. You want to help on Weblate?');

    localeNoticeElement.appendChild(nameTextNode);
    localeNoticeElement.addEventListener('mouseup', popup._onIncompleteTranslation);
};



/**
 * Event Handlers
 */
popup._onDocumentLoaded = function () {
    let manifest, language;

    manifest = chrome.runtime.getManifest();
    language = navigator.language;

    popup._name = manifest.name;
    popup._version = helpers.formatVersion(manifest.version);
    popup._scriptDirection = helpers.determineScriptDirection(language);

    popup._determineAmountInjected()
        .then(popup._getStatisticsStatus)
        .then(popup._renderContents);
};

popup._onTestingUtilityLinkClicked = function (event) {
    if (event.button === 0 || event.button === 1) {
        chrome.tabs.create({
            url: 'https://www.localcdn.org/test',
            active: event.button === 0,
        });
    }

    if (event.button === 0) {
        window.close();
    }
};

popup._onOptionsButtonClicked = function () {
    chrome.runtime.openOptionsPage();
    return window.close();
};

popup._onDonationButtonClicked = function () {
    if (event.button === 0 || event.button === 1) {
        chrome.tabs.create({
            url: chrome.extension.getURL('pages/donate/donate.html'),
            active: event.button === 0,
        });
    }

    if (event.button === 0) {
        window.close();
    }
};

popup._onToggled = function () {
    let bypassCache = typeof browser === 'undefined';

    chrome.tabs.reload(popup._targetTab.id, { bypassCache });
    setTimeout(function () {
        popup._close();
    }, 200);
};

popup._close = function () {
    chrome.runtime.getPlatformInfo(function (information) {
        if (information.os === chrome.runtime.PlatformOs.ANDROID) {
            chrome.tabs.getCurrent(function (tab) {
                chrome.tabs.remove(tab.id);
            });
        } else {
            window.close();
        }
    });
};

popup._onInfoButtonClicked = function () {
    if (event.button === 0 || event.button === 1) {
        chrome.tabs.create({
            url: chrome.extension.getURL('pages/help/help.html'),
            active: event.button === 0,
        });
    }

    if (event.button === 0) {
        window.close();
    }
};

popup._onIncompleteTranslation = function () {
    if (event.button === 0 || event.button === 1) {
        chrome.tabs.create({
            url: 'https://hosted.weblate.org/projects/localcdn/',
            active: event.button === 0,
        });
    }

    if (event.button === 0) {
        window.close();
    }
};

popup._onStatisticsButtonClicked = function () {
    if (event.button === 0 || event.button === 1) {
        chrome.tabs.create({
            url: chrome.extension.getURL('pages/statistics/statistics.html'),
            active: event.button === 0,
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

document.addEventListener('DOMContentLoaded', popup._onDocumentLoaded);
