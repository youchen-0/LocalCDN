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

    chrome.storage.sync.get(settingDefaults, function (items) {

        if (items === null) {
            items = SettingDefaults; // Restore setting defaults.
        }

        if (items.disablePrefetch !== false) {

            chrome.privacy.network.networkPredictionEnabled.set({
                'value': false
            });
        }
        stateManager.selectedIcon = items.selectedIcon;
        wrappers.setIcon({
            'path': stateManager.selectedIcon
        }, 'Enabled');

        chrome.storage.sync.set(items);
    });
};

main._showReleaseNotes = function (details) {

    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {

        chrome.storage.sync.set({
            [Setting.LAST_MAPPING_UPDATE]: lastMappingUpdate
        }, function() {

            if (details.temporary !== true) {

                chrome.storage.sync.get([Setting.HIDE_RELEASE_NOTES], function (items) {

                    if (items.hideReleaseNotes !== true) {

                        chrome.tabs.create({
                            'url': chrome.extension.getURL('pages/welcome/welcome.html'),
                            'active': false
                        });
                    }
                });
            }
        });
    } else if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {

        // If add-on update true, check last update of mappings.js
        chrome.storage.sync.get([Setting.LAST_MAPPING_UPDATE, Setting.HIDE_RELEASE_NOTES], function (items) {

            let mappingUpdate = items.lastMappingUpdate !== lastMappingUpdate;

            if (mappingUpdate || !items.hideReleaseNotes) {
                // Updated mappings.js
                chrome.storage.sync.set({
                    [Setting.LAST_MAPPING_UPDATE]: lastMappingUpdate
                }, function() {
                    if (!items.hideReleaseNotes) {
                        chrome.tabs.create({
                            'url': chrome.extension.getURL('pages/updates/updates.html?mappingupdate=' + mappingUpdate),
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
