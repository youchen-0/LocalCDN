/**
 * Welcome Page
 * Belongs to LocalCDN (since 2020-02-26)
 * (Origin: Decentraleyes)
 *
 * @author      nobody
 * @since       2020-02-27
 *
 * @license     MPL 2.0
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

/**
 * Welcome
 */

var welcome = {};


/**
 * Event Handlers
 */

welcome._onDonationElementClicked = function () {

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


welcome._onDocumentLoaded = function () {

    let donationElement = document.getElementById('p-donate');
    donationElement.addEventListener('mouseup', welcome._onDonationElementClicked);

};

document.addEventListener('DOMContentLoaded', welcome._onDocumentLoaded);
