/**
 * Details of Requests
 * Belongs to LocalCDN.
 *
 * @author      nobody42
 * @since       2020-02-26
 * @license     MPL 2.0
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

/**
 * Overview
 */

var statistics = {};

/**
 * Private Methods
 */

statistics._renderContents = function () {

    helpers.insertI18nContentIntoDocument(document);
    helpers.insertI18nTitlesIntoDocument(document);

    statistics._renderNonContextualContents();
    statistics._renderContextualContents();
};

statistics._renderNonContextualContents = function () {

    let donationButtonElement, versionLabelElement, version;

    version = chrome.runtime.getManifest().version;

    donationButtonElement = document.getElementById('donate-button');
    donationButtonElement.addEventListener('mouseup', statistics._onDonationButtonClicked);

    versionLabelElement = document.getElementById('version-label');
    versionLabelElement.innerText = helpers.formatVersion(version);
};

statistics._renderInjectionPanel = function () {

    let websiteContextElement, injectionOverviewElement;

    websiteContextElement = document.getElementById('website-context');
    injectionOverviewElement = statistics._createInjectionOverviewElement(statisticData);

    websiteContextElement.append(injectionOverviewElement);
};

statistics._renderContextualContents = function () {

    if (Object.keys(statisticData).length > 0) {
        statistics._renderInjectionPanel(statisticData);
    }
};

statistics._createInjectionOverviewElement = function () {

    let divOutline = document.createElement('div');
    divOutline.setAttribute('class', 'cdn-list');

    for (let source in statisticData) {

        let injectionOverviewElement = document.createElement('div');
        injectionOverviewElement.setAttribute('class', 'list');

        let injectionGroupHeaderElement, injectionGroupElement, cdn;

        cdn = statisticData[source];

        injectionGroupHeaderElement = statistics._createInjectionGroupHeaderElement(source, cdn);
        injectionGroupElement = statistics._createInjectionGroupElement(source, cdn);

        injectionOverviewElement.appendChild(injectionGroupHeaderElement);
        injectionOverviewElement.appendChild(injectionGroupElement);

        divOutline.appendChild(injectionOverviewElement);
    }

    return divOutline;
};

statistics._createInjectionGroupHeaderElement = function (source, cdn) {

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

statistics._createInjectionGroupElement = function (source, cdn) {

    let injectionGroupElement;

      injectionGroupElement = document.createElement('ul');
      injectionGroupElement.setAttribute('class', 'sublist');

      for (let injection of cdn) {

          let injectionElement = statistics._createInjectionElement(injection);
          injectionGroupElement.appendChild(injectionElement);
      }

      return injectionGroupElement;
};

statistics._createInjectionElement = function (injection) {

    let injectionElement, filename, name, nameTextNode, noteElement, noteTextNode;

    injectionElement = document.createElement('li');
    injectionElement.setAttribute('class', 'sublist-item');
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


/**
 * Event Handlers
 */

statistics._onDocumentLoaded = function () {

    chrome.storage.sync.get([Setting.STATISTIC_DATA], function (items) {
        statisticData = items.statisticData;
        statistics._renderContents();
    });

};

statistics._onDonationButtonClicked = function () {

    chrome.tabs.update({
        'url': chrome.extension.getURL('pages/donate/donate.html'),
        'active': (event.button === 0)
    });

};


/**
 * Initializations
 */

let statisticData;
document.addEventListener('DOMContentLoaded', statistics._onDocumentLoaded);
