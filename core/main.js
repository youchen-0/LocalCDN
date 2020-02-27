/**
 * Entry Point
 * Belongs to Decentraleyes.
 *
 * @author      Thomas Rientjes
 * @since       2016-04-04
 * @license     MPL-2.0
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

/**
 * Main
 */

var main = {};

/**
 * Private Methods
 */

main._initializeSettings = function () {

    let settingDefaults = {
        [Setting.XHR_TEST_DOMAIN]: Address.DECENTRALEYES,
        [Setting.SHOW_ICON_BADGE]: true,
        [Setting.BLOCK_MISSING]: false,
        [Setting.DISABLE_PREFETCH]: true,
        [Setting.ENFORCE_STAGING]: false,
        [Setting.STRIP_METADATA]: true,
        [Setting.WHITELISTED_DOMAINS]: {}
    };

    chrome.storage.local.get(settingDefaults, function (items) {

        if (items === null) {
            items = settingDefaults; // Restore setting defaults.
        }

        if (items.blockMissing === true || items.enforceStaging === true) {
            stateManager.updateEnvironment(Environment.STAGING);
        } else {
            stateManager.updateEnvironment(Environment.STABLE);
        }

        if (items.disablePrefetch !== false) {

            chrome.privacy.network.networkPredictionEnabled.set({
                'value': false
            });
        }

        chrome.storage.local.set(items);
    });
};

main._showReleaseNotes = function (details) {

    let location, previousVersion;

    location = chrome.extension.getURL('pages/welcome/welcome.html');

    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL ||
        details.reason === chrome.runtime.OnInstalledReason.UPDATE) {

        previousVersion = details.previousVersion;

        if (previousVersion && previousVersion.charAt(0) === '2') {
            return; // Do not show release notes after minor updates.
        }

        if (details.temporary !== true) {

            chrome.storage.local.get({
                [Setting.SHOW_RELEASE_NOTES]: true
            }, function (items) {

                if (items.showReleaseNotes === true) {

                    chrome.tabs.create({
                        'url': location,
                        'active': false
                    });
                }
            });
        }
    }
};

/**
 * Initializations
 */

chrome.runtime.onInstalled.addListener(main._showReleaseNotes);
main._initializeSettings();

wrappers.setBadgeBackgroundColor({
    'color': [74, 130, 108, 255]
});

wrappers.setBadgeTextColor({
    'color': [255, 255, 255, 255]
});
