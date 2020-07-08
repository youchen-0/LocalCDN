/**
 * Entry Point
 * Belongs to LocalCDN (since 2020-02-26)
 * (Origin: Decentraleyes)
 *
 * @author      Thomas Rientjes
 * @since       2016-04-04
 *
 * @author      nobody
 * @since       2020-02-26
 *
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
        [Setting.XHR_TEST_DOMAIN]: Address.LOCALCDN,
        [Setting.SHOW_ICON_BADGE]: true,
        [Setting.BLOCK_MISSING]: false,
        [Setting.DISABLE_PREFETCH]: true,
        [Setting.ENFORCE_STAGING]: false,
        [Setting.HIDE_RELEASE_NOTES]: false,
        [Setting.STRIP_METADATA]: true,
        [Setting.WHITELISTED_DOMAINS]: {},
        [Setting.LOGGING]: false,
        [Setting.DOMAINS_MANIPULATE_DOM]: {},
        [Setting.NEGATE_HTML_FILTER_LIST]: false,
        [Setting.BLOCK_GOOGLE_FONTS]: true,
        [Setting.USE_MONOCHROME_ICONS]: false
    };

    chrome.storage.sync.get(settingDefaults, function (items) {

        if (items === null) {
            items = settingDefaults; // Restore setting defaults.
        }

        if (items.disablePrefetch !== false) {

            chrome.privacy.network.networkPredictionEnabled.set({
                'value': false
            });
        }
        stateManager.useMonochromeIcons = items.useMonochromeIcons;
        wrappers.setIcon({
            'path': stateManager.useMonochromeIcons ? IconType.Enabled.White : IconType.Enabled.Green,
        });

        chrome.storage.sync.set(items);
    });
};

main._showReleaseNotes = function (details) {

    let location, updateAdBlockerRules, previousVersion;

    location = chrome.extension.getURL('pages/welcome/welcome.html');
    updateAdBlockerRules = chrome.extension.getURL('pages/updates/updates.html');

    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {

        chrome.storage.sync.set({
            [Setting.LAST_MAPPING_UPDATE]: lastMappingUpdate
        }, function() {

            previousVersion = details.previousVersion;

            if (previousVersion && previousVersion.charAt(0) === '2') {
                return; // Do not show release notes after minor updates.
            }

            if (details.temporary !== true) {

                chrome.storage.sync.get([Setting.HIDE_RELEASE_NOTES], function (items) {

                    if (items.hideReleaseNotes !== true) {

                        chrome.tabs.create({
                            'url': location,
                            'active': false
                        });
                    }
                });
            }
        });
    } else if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {

        let newValue = lastMappingUpdate;
        let oldValue = "";

        // If add-on update true, check last update of mappings.js
        chrome.storage.sync.get([Setting.LAST_MAPPING_UPDATE, Setting.HIDE_RELEASE_NOTES], function (items) {

            oldValue = items.lastMappingUpdate;

            if (oldValue !== newValue) {
                // Updated mappings.js
                chrome.storage.sync.set({
                    [Setting.LAST_MAPPING_UPDATE]: newValue
                }, function() {
                    if (!items.hideReleaseNotes) {
                        chrome.tabs.create({
                            'url': updateAdBlockerRules,
                            'active': false
                        });
                    }
                });
            } else {
                // No mappings.js update
                return;
            }
        });
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
