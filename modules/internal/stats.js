/**
 * Stats
 * Belongs to LocalCDN (since 2020-02-26)
 * (Origin: Decentraleyes)
 *
 * @author      nobody
 * @since       2020-02-26
 *
 * @license     MPL 2.0
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 */

"use strict";

/**
 * Stats
 */
var stats = {};

stats.setStats = function (injection) {
    let data, today, cdn, framework, newEntry;

    data = stats.data;
    today = new Date().toISOString().slice(0, 10);
    cdn = injection.source;
    framework = injection.path;

    if (today in data) {
        if (cdn in data[today]["cdns"]) {
            data[today]["cdns"][cdn] = ++data[today]["cdns"][cdn];
        } else {
            Object.assign(data[today]["cdns"], { [cdn]: 1 });
        }
        if (framework in data[today]["frameworks"]) {
            data[today]["frameworks"][framework] = ++data[today]["frameworks"][
                framework
            ];
        } else {
            Object.assign(data[today]["frameworks"], { [framework]: 1 });
        }
    } else {
        newEntry = { frameworks: { [framework]: 1 }, cdns: { [cdn]: 1 } };
        data[today] = newEntry;
    }

    chrome.storage.local.set({
        [Setting.INTERNAL_STATISTICS_DATA]: data,
    });
};

stats.getStats = function () {
    chrome.storage.local.get([Setting.INTERNAL_STATISTICS_DATA], function (items) {
        stats.data = items.internalStatisticsData || {};
    });
};

stats.getStats();

stats.data = {};