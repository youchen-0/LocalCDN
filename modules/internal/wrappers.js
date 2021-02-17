/**
 * Internal API Wrapper Module
 * Belongs to LocalCDN.
 *
 * @author      Thomas Rientjes
 * @since       2017-12-03

 * @author      nobody
 * @since       2020-07-09

 * @license     MPL 2.0
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';


/**
 * Wrappers
 */

var wrappers = {};


/**
 * Public Methods
 */

wrappers.setBadgeBackgroundColor = function (details) {
    if (chrome.browserAction.setBadgeBackgroundColor !== undefined) {
        chrome.browserAction.setBadgeBackgroundColor(details);

        storageManager.type.set({
            [Setting.BADGE_COLOR]: details.color
        });
    }
};

wrappers.setBadgeText = function (details) {
    if (chrome.browserAction.setBadgeText !== undefined) {
        chrome.browserAction.setBadgeText(details);
    }
};

wrappers.setBadgeTextColor = function (details) {
    if (chrome.browserAction.setBadgeTextColor !== undefined) {
        chrome.browserAction.setBadgeTextColor(details);

        storageManager.type.set({
            [Setting.BADGE_TEXT_COLOR]: details.color
        });
    }
};

wrappers.setIcon = function (details, type) {
    if (chrome.browserAction.setIcon) {
        details.path = IconType[details.path][type];
        chrome.browserAction.setIcon(details);
    }
};

storageManager.type.get([Setting.BADGE_COLOR, Setting.BADGE_TEXT_COLOR], function (items) {
    wrappers.textColor = items.badgeTextColor || '#FFFFFF';
    wrappers.backgroundColor = items.badgeColor || '#4A826C';

    wrappers.setBadgeTextColor({'color': wrappers.textColor});
    wrappers.setBadgeBackgroundColor({'color': wrappers.backgroundColor});
});
