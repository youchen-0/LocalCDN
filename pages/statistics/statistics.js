/**
 * Statistic
 * Belongs to LocalCDN (since 2020-02-26)
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

'use strict';

/**
 * Statistic
 */
var statistics = {};

/**
 * Private Methods
 */
statistics._onDocumentLoaded = function () {
    helpers.insertI18nContentIntoDocument(document);
    helpers.insertI18nTitlesIntoDocument(document);

    // Default view is 'today'
    statistics._dateRange = [new Date().toISOString().slice(0, 10)];
    document.getElementById('date-range').value = statistics._dateUnit;

    statistics._registerListener();
    statistics._getStatistics().then(statistics._renderContents);
};

statistics._renderContents = function () {
    statistics._filterAndSortData();
    statistics._determineInjections();

    statistics._clearTables();
    statistics._determineInjections();
    statistics._generateTable(statistics._dataSortedCDNs, 'cdns');
    statistics._generateTable(statistics._dataSortedFrameworks, 'frameworks');
};

statistics._generateTable = function (data, type) {
    let arr = Object.values(data);
    if (arr.length === 0) {
        arr = [['no data', '-']];
    }

    for (const value of arr) {
        let row = document.createElement('tr');

        let keyColumn = document.createElement('td');
        let ppName = statistics._displayNameOfFramework(value[0], type);
        keyColumn.appendChild(document.createTextNode(ppName));
        row.appendChild(keyColumn);

        let valueColumn = document.createElement('td');
        valueColumn.appendChild(document.createTextNode(value[1]));
        row.appendChild(valueColumn);

        document.getElementById('tbody-' + type).appendChild(row);
    }
};

statistics._filterAndSortData = function () {
    // Purge
    statistics._dataSortedCDNs = {};
    statistics._dataSortedFrameworks = {};

    statistics._dateRange.forEach(function (entry) {
        if (entry in statistics._data) {
            statistics._dataSortedCDNs = Object.assign(statistics._dataSortedCDNs, statistics._data[entry]['cdns']);
            statistics._dataSortedFrameworks = Object.assign(statistics._dataSortedFrameworks, statistics._data[entry]['frameworks']);
        }
    });
    statistics._dataSortedCDNs = Object.entries(statistics._dataSortedCDNs).sort((a, b) => b[1] - a[1]);
    statistics._dataSortedFrameworks = Object.entries(statistics._dataSortedFrameworks).sort((a, b) => b[1] - a[1]);
};

statistics._setDateRange = function () {
    let today = new Date();
    let from = new Date();
    let days;
    let type = statistics._dateUnit;

    // Purge
    statistics._dateRange = [];

    if (type === 'week') {
        days = 7;
    } else if (type === 'month') {
        days = 30;
    } else if (type === 'year') {
        days = 365;
    } else {
        statistics._dateRange = [new Date().toISOString().slice(0, 10)];
    }

    if (days > 1) {
        for (let i = 0; i < days; i++) {
            // NOTE: setDate/getDate is buggy over day/month/year boundaries
            let diff = 24 * 3600000 * i;
            let day = from.setTime(today.getTime() - diff);
            statistics._dateRange.push(new Date(day).toISOString().slice(0, 10));
        }
    }
    statistics._renderContents();
};

statistics._determineInjections = function () {
    // NOTE: Differences between CDNs and frameworks possible.
    //       CDN can be contacted without loading a framework.
    let sum = 0;
    let days = 0;
    let avg = 0;
    statistics._dataOverview = [];

    statistics._dateRange.forEach(function (entry) {
        if (entry in statistics._data) {
            for (const value of Object.values(statistics._data[entry]['frameworks'])) {
                sum += parseFloat(value);
            }
            days++;
        }
    });
    avg = sum / days > 0 ? sum / days : 0;
    avg = Math.round((avg + Number.EPSILON) * 100) / 100;

    document.getElementById('avg-quantity').textContent = isNaN(avg) ? '-' : avg;
    document.getElementById('quantity-injected-frameworks').textContent = isNaN(sum) ? '-' : sum;
};

statistics._getStatistics = function () {
    return new Promise((resolve) => {
        chrome.storage.local.get([Setting.INTERNAL_STATISTICS_DATA], function (items) {
            statistics._data = items.internalStatisticsData;
            resolve();
        });
    });
};

statistics._clearTables = function () {
    const tbody = document.querySelectorAll('tbody');

    tbody.forEach((table) => {
        while (table.hasChildNodes()) {
            table.removeChild(table.firstChild);
        }
    });
};

statistics._displayNameOfFramework = function (str, type) {
    // Is used in generateTable(), but should only be used for frameworks
    if (type === 'frameworks' && str !== 'no data') {
        let filename = helpers.extractFilenameFromPath(str);
        filename = helpers.determineResourceName(filename);

        let version = str.match(Resource.VERSION_EXPRESSION);

        if (version !== null && version.length > 0) {
            version = version === 'latest' ? '(' + version + ')' : '(v' + version + ')';
        } else {
            version = '';
        }
        return filename + ' ' + version;
    }
    // If type is CDN
    return str;
};

statistics._handlerDateRange = function ({ target }) {
    let type = target.value;
    if (type === 'day' || type === 'week' || type === 'month' || type === 'year') {
        statistics._dateUnit = type;
        statistics._getStatistics().then(statistics._setDateRange);
    } else if (type === 'delete') {
        statistics._deleteStatistic();
    }
};

statistics._deleteStatistic = function () {
    let text = chrome.i18n.getMessage('dialogConfirmDeleteStatistics');
    if (confirm(text)) {
        chrome.storage.local.set({
            [Setting.INTERNAL_STATISTICS_DATA]: {},
        });
    }
};

statistics._registerListener = function () {
    document.getElementById('date-range').addEventListener('change', statistics._handlerDateRange);
    document.getElementById('btn-delete').addEventListener('click', function () {
        statistics._handlerDateRange({ target: { value: 'delete' } });
    });
};

/**
 * Initializations
 */
statistics._data = {};
statistics._dataSortedCDNs = {};
statistics._dataSortedFrameworks = {};
statistics._dataOverview = [];
statistics._dateRange = [];
statistics._dateUnit = 'day';

document.addEventListener('DOMContentLoaded', statistics._onDocumentLoaded);
