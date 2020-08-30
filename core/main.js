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

    storageManager.checkStorageType();

    storageManager.type.get(SettingDefaults, function (items) {

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

        storageManager.type.set(items);
    });
};

main._showReleaseNotes = function (details) {

    storageManager.checkStorageType();

    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {

        storageManager.type.set({
            [Setting.LAST_MAPPING_UPDATE]: lastMappingUpdate
        }, function() {

            if (details.temporary !== true) {

                storageManager.type.get([Setting.HIDE_RELEASE_NOTES], function (items) {

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

        // TODO: Remove me in v2.4.1
        storageManager.migrateData('local');

        // If add-on update true, check last update of mappings.js
        storageManager.type.get([Setting.LAST_MAPPING_UPDATE, Setting.HIDE_RELEASE_NOTES], function (items) {

            let mappingUpdate = items.lastMappingUpdate !== lastMappingUpdate;

            if (mappingUpdate || !items.hideReleaseNotes) {
                // Updated mappings.js
                storageManager.type.set({
                    [Setting.LAST_MAPPING_UPDATE]: lastMappingUpdate
                }, function() {
                    // TODO: Remove me in v2.4.1
                    // if (!items.hideReleaseNotes) {
                    if (true) {
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
