/**
 * Logging Page
 * Belongs to LocalCDN
 *
 * @author      nobody
 * @since       2021-02-19
 *
 * @license     MPL 2.0
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';


/**
 * Logging Page
 */

var logging = {};

logging._onDocumentLoaded = function () {
    logging._getLoggingData()
        .then(logging._generateTable);
    document.getElementById('btn-delete').addEventListener('click', logging._deleteLogs);
    document.getElementById('btn-reload').addEventListener('click', logging._resfresh);
};

logging._generateTable = function () {
    let data = logging._data;
    if (data.length === 0) {
        logging._showTable(false);
        return;
    }

    for (let i = data.length - 1; i >= 0; i--) {
        let tbody, row, cell, content, redirect;

        tbody = document.getElementById('logging-content').getElementsByTagName('tbody')[0];
        row = tbody.insertRow();

        if (Object.values(data[i])[3]) {
            row.classList.add('missing');
        }

        cell = row.insertCell();
        content = document.createTextNode(i + 1);
        cell.appendChild(content);

        cell = row.insertCell();
        content = document.createTextNode(Object.values(data[i])[0]);
        cell.appendChild(content);

        cell = row.insertCell();
        content = document.createTextNode(Object.values(data[i])[1]);
        cell.appendChild(content);

        cell = row.insertCell();
        if (Object.values(data[i])[2] === '') {
            redirect = '-';
        } else {
            redirect = Object.values(data[i])[2];
        }
        content = document.createTextNode(redirect);
        cell.appendChild(content);
    }

    logging._showTable(true);
};

logging._deleteLogs = function () {
    if (confirm('Are you sure you want to delete these logs?')) {
        let message = {
            'topic': 'logs:delete',
            'value': '',
        };

        chrome.runtime.sendMessage(message);
        logging._resfresh();
    }
};

logging._getLoggingData = function () {
    return new Promise((resolve) => {
        let message = {
            'topic': 'logs:get'
        };

        chrome.runtime.sendMessage(message, function (data) {
            logging._data = data['logs'];
            resolve();
        });
    });
};

logging._showTable = function (value) {
    let v1, v2;

    v1 = value ? 'block' : 'none';
    v2 = value ? 'none' : 'block';

    document.getElementById('logging-content').style.display = v1;
    document.getElementById('btn-delete').style.display = v1;
    document.getElementById('no-logging-content').style.display = v2;
};

logging._resfresh = function () {
    location.reload();
};

logging._data = [];

document.addEventListener('DOMContentLoaded', logging._onDocumentLoaded);
