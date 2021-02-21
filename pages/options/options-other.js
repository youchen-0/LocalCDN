/**
 * Options Page (Other)
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
 * Options (Other)
 */

var optionsOther = {};


/**
 * Private Methods
 */

optionsOther._renderIconSection = function (opt) {
    let url, bgColor, txtColor;

    if (!chrome.browserAction.setIcon) {
        document.getElementById('icon-style-div').style.display = 'none';
    } else {
        let selectedIcon = opt.selectedIcon;

        if (selectedIcon === 'Default') {
            document.getElementById('icon-default').checked = true;
        } else if (selectedIcon === 'Grey') {
            document.getElementById('icon-grey').checked = true;
        } else if (selectedIcon === 'Light') {
            document.getElementById('icon-light').checked = true;
        }
        url = chrome.runtime.getURL(`icons/action/${selectedIcon.toLowerCase()}/icon38-default.png`);
        document.getElementById('icon-badge-preview').src = url;

        bgColor = opt.badgeColor || '#4A826C';
        txtColor = opt.badgeTextColor || '#FFFFFF';

        document.getElementById('counter-preview-badge').style.backgroundColor = bgColor;
        document.getElementById('pre-badged-background-color').style.backgroundColor = bgColor;
        document.getElementById('badged-background-color').value = bgColor;

        document.getElementById('counter-preview-badge').style.color = txtColor;
        document.getElementById('pre-badged-text-color').style.backgroundColor = txtColor;
        document.getElementById('badged-text-color').value = txtColor;

        document.getElementById('badged-background-color').addEventListener('keyup', optionsOther._onChangedHexColor);
        document.getElementById('badged-text-color').addEventListener('keyup', optionsOther._onChangedHexColor);
        document.getElementById('restore-background-color').addEventListener('click', optionsOther._setDefaultColor);
        document.getElementById('restore-text-color').addEventListener('click', optionsOther._setDefaultColor);

        optionsOther._colorPicker();
    }
};

optionsOther._renderStorageSection = function (opt) {
    document.getElementById('sync-help').addEventListener('click', function () { options._onLinkClick(`${Links.FAQ}#sync`); });
    document.getElementById('storage-type-local').addEventListener('change', optionsOther._onStorageOptionChanged);
    document.getElementById('storage-type-sync').addEventListener('change', optionsOther._onStorageOptionChanged);
    document.getElementById('export-data').addEventListener('click', storageManager.export);
    document.getElementById('import-data').addEventListener('click', storageManager.startImportFilePicker);
    document.getElementById('import-file-picker').addEventListener('change', storageManager.handleImportFilePicker);

    optionsOther._preSelectStorage(opt.storageType);
};

optionsOther._setIcon = function (optionValue) {
    wrappers.setIcon({'path': optionValue}, 'Enabled');
    let url = chrome.runtime.getURL(`icons/action/${optionValue.toLowerCase()}/icon38-default.png`);
    document.getElementById('icon-badge-preview').src = url;
};

optionsOther._preSelectStorage = function (type) {
    if (type === 'local') {
        document.getElementById('storage-type-local').checked = true;
    } else {
        document.getElementById('storage-type-sync').checked = true;
    }
};

optionsOther._onStorageOptionChanged = function ({target}) {
    chrome.storage.local.set({
        [Setting.STORAGE_TYPE]: target.value,
    });
    if (target.value === 'local') {
        storageManager.migrateData('local');
    } else {
        storageManager.migrateData('sync');
    }
};

optionsOther._colorPicker = function () {
    /* eslint-disable no-undef, no-invalid-this */
    const badgeBackgroundColor = new CP(document.getElementById('badged-background-color'));
    badgeBackgroundColor.on('change', function (r, g, b) {
        this.source.value = this.color(r, g, b);
    });
    badgeBackgroundColor.on('drag', function (r, g, b) {
        options._backgroundColor = this.color(r, g, b);
        this.source.value = options._backgroundColor;
        wrappers.setBadgeBackgroundColor({'color': options._backgroundColor});
        document.getElementById('counter-preview-badge').style.backgroundColor = options._backgroundColor;
        document.getElementById('pre-badged-background-color').style.backgroundColor = options._backgroundColor;
    });

    const badgeTextColor = new CP(document.getElementById('badged-text-color'));
    badgeTextColor.on('change', function (r, g, b) {
        this.source.value = this.color(r, g, b);
    });
    badgeTextColor.on('drag', function (r, g, b) {
        options._textColor = this.color(r, g, b);
        this.source.value = options._textColor;
        wrappers.setBadgeTextColor({'color': options._textColor});
        document.getElementById('counter-preview-badge').style.color = options._textColor;
        document.getElementById('pre-badged-text-color').style.backgroundColor = options._textColor;
    });
    /* eslint-enable no-undef, no-invalid-this */
};

optionsOther._setDefaultColor = function ({target}) {
    if (target.id === 'restore-text-color') {
        options._textColor = '#FFFFFF';
        wrappers.setBadgeTextColor({'color': options._textColor});
        document.getElementById('counter-preview-badge').style.color = options._textColor;
        document.getElementById('pre-badged-text-color').style.backgroundColor = options._textColor;
        document.getElementById('badged-text-color').value = options._textColor;
    } else if (target.id === 'restore-background-color') {
        options._backgroundColor = '#4A826C';
        wrappers.setBadgeBackgroundColor({'color': options._backgroundColor});
        document.getElementById('counter-preview-badge').style.backgroundColor = options._backgroundColor;
        document.getElementById('pre-badged-background-color').style.backgroundColor = options._backgroundColor;
        document.getElementById('badged-background-color').value = options._backgroundColor;
    }
};

optionsOther._onChangedHexColor = function ({target}) {
    if (/#([a-f0-9]{3}){1,2}\b/i.test(target.value)) {
        target.classList.remove('color-error');
        if (target.id === 'badged-text-color') {
            options._textColor = target.value;
            wrappers.setBadgeTextColor({'color': options._textColor});
            document.getElementById('counter-preview-badge').style.color = options._textColor;
            document.getElementById('pre-badged-text-color').style.backgroundColor = options._textColor;
        } else {
            options._backgroundColor = target.value;
            wrappers.setBadgeBackgroundColor({'color': options._backgroundColor});
            document.getElementById('counter-preview-badge').style.backgroundColor = options._backgroundColor;
            document.getElementById('pre-badged-background-color').style.backgroundColor = options._backgroundColor;
        }
    } else {
        target.classList.add('color-error');
    }
};

optionsOther.init = function (opt) {
    if (BrowserType.CHROMIUM) {
        document.getElementById('div-badged-text-color').style.display = 'none';
    }

    document.getElementById('icon-default').addEventListener('change', options.onOptionChanged);
    document.getElementById('icon-grey').addEventListener('change', options.onOptionChanged);
    document.getElementById('icon-light').addEventListener('change', options.onOptionChanged);

    optionsOther._renderIconSection(opt);
    optionsOther._renderStorageSection(opt);
};

optionsOther._platformSupportIcons = true;
