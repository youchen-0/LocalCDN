/**
 * Main Popup Page
 * Belongs to Decentraleyes.
 *
 * @author      Thomas Rientjes
 * @author      nobody42
 * @since       2016-08-09
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

    popup._renderNonContextualContents();

    popup._determineTargetTab()
        .then(popup._determineDomainWhitelistStatus)
        .then(popup._determineStatusManipulateDOM)
        .then(popup._determineResourceInjections)
        .then(popup._renderContextualContents);
};

popup._renderNonContextualContents = function () {

    let versionLabelElement, counterElement, testingUtilityLinkElement, optionsButtonElement, donationButtonElement;

    versionLabelElement = document.getElementById('version-label');
    counterElement = document.getElementById('injection-counter');
    testingUtilityLinkElement = document.getElementById('testing-utility-link');
    optionsButtonElement = document.getElementById('options-button');
    donationButtonElement = document.getElementById('donate-button');

    versionLabelElement.innerText = popup._version;
    counterElement.innerText = helpers.formatNumber(popup._amountInjected);

    testingUtilityLinkElement.addEventListener('mouseup', popup._onTestingUtilityLinkClicked);
    optionsButtonElement.addEventListener('mouseup', popup._onOptionsButtonClicked);
    donationButtonElement.addEventListener('mouseup', popup._onDonationButtonClicked);
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

        let enableProtectionTitle = chrome.i18n.getMessage('enableProtectionTitle');

        manipulateDOMToggleElement.disabled = true;
        protectionToggleElement.checked = false;

        manipulateDOMToggleStyle.setAttribute('class', 'slider-disabled');
        protectionToggleElement.setAttribute('title', enableProtectionTitle);
        protectionToggleElement.addEventListener('click', popup._enableProtection);

    } else {

        manipulateDOMToggleElement.disabled = false;
        manipulateDOMToggleStyle.setAttribute('class', 'slider');

        let disableProtectionTitle = chrome.i18n.getMessage('disableProtectionTitle');
        protectionToggleElement.checked = true;
        protectionToggleElement.addEventListener('click', popup._disableProtection);
        protectionToggleElement.setAttribute('title', disableProtectionTitle);

        if (popup._domainManipulateDOM === true) {

            manipulateDOMToggleElement.checked = true;
            manipulateDOMToggleElement.addEventListener('click', popup._disableManipulateDOM);

        } else {

            manipulateDOMToggleElement.checked = false;
            manipulateDOMToggleElement.addEventListener('click', popup._enableManipulateDOM);

        }
    }

    websiteContextElement.setAttribute('class', 'panel');
};

popup._renderInjectionPanel = function (groupedInjections) {

    let websiteContextElement, injectionOverviewElement;

    websiteContextElement = document.getElementById('website-context');
    injectionOverviewElement = popup._createInjectionOverviewElement(groupedInjections);

    websiteContextElement.append(injectionOverviewElement);
};

popup._enableProtection = function () {

    let message = {
        'topic': 'whitelist:remove-domain',
        'value': popup._domain
    };

    chrome.runtime.sendMessage(message, function () {
        popup._onToggled();
    });
};

popup._disableProtection = function () {

    let message = {
        'topic': 'whitelist:add-domain',
        'value': popup._domain
    };

    chrome.runtime.sendMessage(message, function () {
        popup._onToggled();
    });
};

popup._enableManipulateDOM = function () {

    let message = {
        'topic': 'manipulateDOM:add-domain',
        'value': popup._domain
    };

    chrome.runtime.sendMessage(message, function () {
        popup._onToggled();
    });
};

popup._disableManipulateDOM = function () {

    let message = {
        'topic': 'manipulateDOM:remove-domain',
        'value': popup._domain
    };

    chrome.runtime.sendMessage(message, function () {
        popup._onToggled();
    });
};

popup._determineDomainWhitelistStatus = function () {

    return new Promise((resolve) => {

        let message = {
            'topic': 'domain:fetch-is-whitelisted',
            'value': popup._domain
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
            'topic': 'domain:fetch-is-manipulateDOM',
            'value': popup._domain
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
            'value': popup._targetTab.id
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

        chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {

            popup._targetTab = tabs[0];
            popup._domain = helpers.extractDomainFromUrl(tabs[0].url, true);

            resolve();
        });
    });
};

popup._determineAmountInjected = function () {

    return new Promise((resolve) => {

        chrome.storage.local.get(Setting.AMOUNT_INJECTED, function (items) {

            popup._amountInjected = items.amountInjected || 0;
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

    statisticData = groupedInjections;

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

    let count = 0;
    let oversized = false;
    for (let injection of filtered) {

        if(count < 3){
            let injectionElement = popup._createInjectionElement(injection);
            injectionGroupElement.appendChild(injectionElement);
        } else {
            oversized = true;
        }
        count++;
    }
    if (oversized) {
        let injectionElement = popup._createInjectionElement(filtered, count-3, true);
        injectionGroupElement.appendChild(injectionElement);
    }
    count = 0;
    return injectionGroupElement;
};

popup._createInjectionElement = function (injection, counter = 0, oversized = false) {

    let injectionElement, filename, name, nameTextNode, noteElement, noteTextNode;

    injectionElement = document.createElement('li');
    injectionElement.setAttribute('class', 'sublist-item');

    if(oversized) {
        nameTextNode = document.createTextNode(`... and ${counter} more`);
        injectionElement.setAttribute('id', 'get-stats-btn');

        injectionElement.addEventListener('mouseup', function() {
            popup._onMoreInjectionsButton();
        }, false);

        injectionElement.appendChild(nameTextNode);

        return injectionElement;
    }

    filename = helpers.extractFilenameFromPath(injection.path);

    // If bundle empty, use filename
    if (injection.bundle === ''){
        name = helpers.determineResourceName(filename);
    } else {
        name = injection.bundle + ' (Bundle)'
    }

    nameTextNode = document.createTextNode(`- ${name}`);
    injectionElement.appendChild(nameTextNode);

    if (injection.version !== null) {
        noteElement = document.createElement('span');
        noteElement.setAttribute('class', 'side-note');
        let versionNode = (injection.version === 'beta') ? ` ${injection.version}` : ` v${injection.version}`;
        noteTextNode = document.createTextNode(versionNode);
        noteElement.appendChild(noteTextNode);
        injectionElement.appendChild(noteElement);
    }

    return injectionElement;
};

popup._filterDuplicates = function(array, key) {
    /**
     * Function to remove duplicates from an array, depending on 'key'.
     * Ignore empty values of the 'key'
     *
     */

    let filtered = array
        .map(e => e[key])
        .map((value, index, newArray) => (value != '') ? (newArray.indexOf(value) === index && index) : index )
        .filter(e => array[e])
        .map(e => array[e]);

    return filtered;
};


/**
 * Event Handlers
 */

popup._onDocumentLoaded = function () {

    let manifest, language;

    manifest = chrome.runtime.getManifest();
    language = navigator.language;

    popup._version = helpers.formatVersion(manifest.version);
    popup._scriptDirection = helpers.determineScriptDirection(language);

    popup._determineAmountInjected()
        .then(popup._renderContents);
};

popup._onTestingUtilityLinkClicked = function (event) {

    if (event.button === 0 || event.button === 1) {

        chrome.tabs.create({
            'url': 'https://localcdn.de/test',
            'active': (event.button === 0)
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
            'url': chrome.extension.getURL('pages/donate/donate.html'),
            'active': (event.button === 0)
        });
    }

    if (event.button === 0) {
        window.close();
    }
};

popup._onToggled = function () {

    let bypassCache = (typeof browser === 'undefined');

    chrome.tabs.reload(popup._targetTab.id, {bypassCache});
    popup._close();
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

popup._onMoreInjectionsButton = function () {

    //statisticData
    chrome.storage.local.set({
        [Setting.STATISTIC_DATA]: statisticData
    });

    chrome.tabs.create({
        'url': chrome.extension.getURL('pages/statistics/statistics.html'),
        'active': true
    });

    popup._close;

};


/**
 * Initializations
 */
let statisticData;
document.addEventListener('DOMContentLoaded', popup._onDocumentLoaded);
