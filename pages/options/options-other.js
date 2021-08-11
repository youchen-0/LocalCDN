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
    let url, bgColor, txtColor, selectedIcon;

    if (!chrome.browserAction.setIcon) {
        document.getElementById('icon-style-div').style.display = 'none';
        return;
    }

    selectedIcon = opt.selectedIcon;

    if (selectedIcon === 'Default') {
        document.getElementById('icon-default').checked = true;
    } else if (selectedIcon === 'Grey') {
        document.getElementById('icon-grey').checked = true;
    } else if (selectedIcon === 'Light') {
        document.getElementById('icon-light').checked = true;
    }
    url = chrome.runtime.getURL(`icons/action/${selectedIcon.toLowerCase()}/icon38-default.png`);
    document.getElementById('icon-badge-preview').src = url;
    document.getElementById('html-icon-badge-preview').src = url;

    bgColor = opt.badgeDefaultBackgroundColor;
    txtColor = opt.badgeDefaultTextColor;
    optionsOther._createBadge(BadgeSetting, bgColor, txtColor);

    bgColor = opt.badgeHTMLFilterBackgroundColor;
    txtColor = opt.badgeHTMLfilterTextColor;
    optionsOther._createBadge(BadgeSettingHTMLFilter, bgColor, txtColor);
};

optionsOther._createBadge = function (element, bgColor, txtColor) {
    document.getElementById(element.COUNTER_PREVIEW_BADGE).style.backgroundColor = bgColor;
    document.getElementById(element.PRE_BADGED_BACKGROUND_COLOR).style.backgroundColor = bgColor;
    document.getElementById(element.BADGED_BACKGROUND_COLOR).value = bgColor;

    document.getElementById(element.COUNTER_PREVIEW_BADGE).style.color = txtColor;
    document.getElementById(element.PRE_BADGED_TEXT_COLOR).style.backgroundColor = txtColor;
    document.getElementById(element.BADGED_TEXT_COLOR).value = txtColor;

    document.getElementById(element.BADGED_BACKGROUND_COLOR).addEventListener('keyup', optionsOther._onChangedHexColor);
    document.getElementById(element.BADGED_TEXT_COLOR).addEventListener('keyup', optionsOther._onChangedHexColor);
    document.getElementById(element.RESTORE_BACKGROUND_COLOR).addEventListener('click', optionsOther._setDefaultColor);
    document.getElementById(element.RESTORE_TEXT_COLOR).addEventListener('click', optionsOther._setDefaultColor);

    optionsOther._colorPicker(element);
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
    document.getElementById('html-icon-badge-preview').src = url;
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

optionsOther._colorPicker = function (element) {
    /* eslint-disable no-undef, no-invalid-this */
    const badgeBackgroundColor = new CP(document.getElementById(element.BADGED_BACKGROUND_COLOR));
    badgeBackgroundColor.on('change', function (r, g, b) {
        this.source.value = this.color(r, g, b);
    });
    badgeBackgroundColor.on('drag', function (r, g, b) {
        let bgColor = this.color(r, g, b);
        wrappers.setBadgeBackgroundColor({'color': bgColor, 'type': element.TYPE});
        this.source.value = bgColor;
        document.getElementById(element.COUNTER_PREVIEW_BADGE).style.backgroundColor = bgColor;
        document.getElementById(element.PRE_BADGED_BACKGROUND_COLOR).style.backgroundColor = bgColor;
    });

    const badgeDefaultTextColor = new CP(document.getElementById(element.BADGED_TEXT_COLOR));
    badgeDefaultTextColor.on('change', function (r, g, b) {
        this.source.value = this.color(r, g, b);
    });
    badgeDefaultTextColor.on('drag', function (r, g, b) {
        let txtColor = this.color(r, g, b);
        wrappers.setBadgeTextColor({'color': txtColor, 'type': element.TYPE});
        this.source.value = txtColor;
        document.getElementById(element.COUNTER_PREVIEW_BADGE).style.color = txtColor;
        document.getElementById(element.PRE_BADGED_TEXT_COLOR).style.backgroundColor = txtColor;
    });
    /* eslint-enable no-undef, no-invalid-this */
};

optionsOther._setDefaultColor = function ({target}) {
    let element;
    if (target.id === 'restore-text-color' || target.id === 'restore-background-color') {
        element = BadgeSetting;
    } else {
        element = BadgeSettingHTMLFilter;
    }
    if (target.id === element.RESTORE_TEXT_COLOR) {
        let txtColor = '#FFFFFF';
        document.getElementById(element.COUNTER_PREVIEW_BADGE).style.color = txtColor;
        document.getElementById(element.PRE_BADGED_TEXT_COLOR).style.backgroundColor = txtColor;
        document.getElementById(element.BADGED_TEXT_COLOR).value = txtColor;
    } else if (target.id === 'restore-background-color') {
        let bgColor = '#4A826C';
        document.getElementById(element.COUNTER_PREVIEW_BADGE).style.backgroundColor = bgColor;
        document.getElementById(element.PRE_BADGED_BACKGROUND_COLOR).style.backgroundColor = bgColor;
        document.getElementById(element.BADGED_BACKGROUND_COLOR).value = bgColor;
    }
};

optionsOther._onChangedHexColor = function ({target}) {
    let element;
    if (target.id === 'badged-text-color' || target.id === 'badged-background-color') {
        element = BadgeSetting;
    } else {
        element = BadgeSettingHTMLFilter;
    }
    if (/#([a-f0-9]{3}){1,2}\b/i.test(target.value)) {
        target.classList.remove('color-error');
        if (target.id === element.BADGED_TEXT_COLOR) {
            let txtColor = target.value;
            document.getElementById(element.COUNTER_PREVIEW_BADGE).style.color = txtColor;
            document.getElementById(element.PRE_BADGED_TEXT_COLOR).style.backgroundColor = txtColor;
        } else {
            let bgColor = target.value;
            document.getElementById(element.COUNTER_PREVIEW_BADGE).style.backgroundColor = bgColor;
            document.getElementById(element.PRE_BADGED_BACKGROUND_COLOR).style.backgroundColor = bgColor;
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

    document.getElementById('badged-background-color').addEventListener('change', options.onOptionChanged);
    document.getElementById('badged-text-color').addEventListener('change', options.onOptionChanged);

    document.getElementById('html-badged-background-color').addEventListener('change', options.onOptionChanged);
    document.getElementById('html-badged-text-color').addEventListener('change', options.onOptionChanged);
};

optionsOther._platformSupportIcons = true;
