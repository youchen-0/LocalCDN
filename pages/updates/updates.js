/**
 * Main Updates Page
 * Belongs to LocalCDN (since 2020-02-26)
 * (Origin: Decentraleyes)
 *
 * @author      nobody
 * @since       2020-03-08
 *
 * @license     MPL 2.0
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

/**
 * Updates
 */

var updates = {};

/**
 * Private Methods
 */

updates._openHistoryReleaseNotes = function () {
    let container = document.getElementById('history-release-notes');
    let toggle = document.getElementById('history-indicator');

    if (container.style.display === 'none') {
        container.style.display = 'block';
        toggle.textContent = '–';
    } else {
        container.style.display = 'none';
        toggle.textContent = '+';
    }
};

updates._onDocumentLoaded = function () {
    // ********************************************************************************
    // TODO: Remove me in v2.4.1
    document.getElementById('export').addEventListener('click', updates._export);
    // ********************************************************************************

    document.getElementById('generate-ublock-rules').checked = false;
    document.getElementById('generate-umatrix-rules').checked = false;

    let updateElements = {
        ['ruleSets']: document.getElementsByName('rule-sets'),
        ['copyRuleSet']: document.getElementById('button-copy-rule-set'),
    };

    for (let i = 0; i < updateElements.ruleSets.length; i++) {
        updateElements.ruleSets[i].addEventListener('change', ruleGenerator.openRuleSet);
    }

    updateElements.copyRuleSet.addEventListener('click', ruleGenerator.copyRuleSet);

    document.getElementById('history').addEventListener('click', updates._openHistoryReleaseNotes);

    // GET parameter to display the rule set generator
    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('mappingupdate') === 'true') {
        document.getElementById('generator-section').style.display = 'block';
    }
};
// ********************************************************************************
// TODO: Remove me in v2.4.1
updates._export = function () {
    let filename = new Date().toISOString();
    filename = filename.substring(0, 10) + '_localcdn_backup.txt';

    chrome.storage.sync.get(null, function (items) {
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(items, null, '  ')));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    });
};
// ********************************************************************************
document.addEventListener('DOMContentLoaded', updates._onDocumentLoaded);
