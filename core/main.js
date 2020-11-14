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

    storageManager.type.get(null, function (items) {
        if (items === null) {
            items = SettingDefaults; // Restore setting defaults.
        }

        if (items.disablePrefetch !== false) {
            chrome.privacy.network.networkPredictionEnabled.set({
                'value': false
            });
        }

        // Copy old data
        if (Object.keys(items.allowlistedDomains).length === 0) {
            items.allowlistedDomains = items.whitelistedDomains;
        }

        // Delete old key
        if (typeof items.whitelistedDomains !== 'undefined') {
            delete items['whitelistedDomains'];
            storageManager.type.remove('whitelistedDomains');
        }

        // Convert value of notifications
        if (typeof items.hideReleaseNotes !== 'undefined') {
            items.updateNotification = items.hideReleaseNotes ? 0 : 2;
            delete items['hideReleaseNotes'];
            storageManager.type.remove('hideReleaseNotes');
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
            [Setting.LAST_MAPPING_UPDATE]: mappings.lastMappingUpdate
        }, function() {
            if (details.temporary !== true) {
                chrome.tabs.create({
                    'url': chrome.extension.getURL('pages/welcome/welcome.html'),
                    'active': false
                });
            }
        });
    } else if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
        storageManager.type.get([Setting.LAST_MAPPING_UPDATE, Setting.UPDATE_NOTIFICATION], function (items) {
            let mappingUpdate = items.lastMappingUpdate !== mappings.lastMappingUpdate;

            // Updated mappings.js
            if (mappingUpdate) {
                storageManager.type.set({
                    [Setting.LAST_MAPPING_UPDATE]: mappings.lastMappingUpdate
                });
            }

            if ( (mappingUpdate && items.updateNotification == 1) || items.updateNotification == 2 ) {
                chrome.tabs.create({
                    'url': chrome.extension.getURL('pages/updates/updates.html?mappingupdate=' + mappingUpdate),
                    'active': false
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
