/**
 * Options Page (Info)
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
 * Options (Info)
 */

var optionsInfo = {};


/**
 * Private Methods
 */

optionsInfo._renderCdnFrameworkSection = function () {
    let unsupportedFrameworks, btnCDNs, btnFrameworks;

    unsupportedFrameworks = 0;
    optionsInfo._listOfFrameworks = {};

    btnCDNs = document.getElementById('cdn');
    btnCDNs.value = 'CDNs: ';

    btnFrameworks = document.getElementById('framework');
    btnFrameworks.value = 'Frameworks: ';

    Object.values(Object.values(resources)).forEach((element) => {
        let path = Object.values(element)[0];
        path = path.split('/');
        optionsInfo._listOfFrameworks[path[1]] = true;
    });

    if (BrowserType.CHROMIUM) {
        // Chromium based browser does not support Google Material Icons and Font Awesome
        document.getElementById('unsupported-frameworks').style.display = 'block';
        unsupportedFrameworks = 2;
    }

    optionsInfo._createList('cdn');
    document.getElementById('cdn').classList.add('btns-active');

    btnFrameworks.addEventListener('click', optionsInfo._btnCreateList);
    btnCDNs.addEventListener('click', optionsInfo._btnCreateList);

    // Reduce CDNs by 3, because loli.net includes = cdn.css.net, cdnjs.loli.net, ajax.loli.net, fonts.loli.net
    btnCDNs.value += Object.keys(mappings.cdn).length - 3;
    btnFrameworks.value += Object.keys(optionsInfo._listOfFrameworks).length - unsupportedFrameworks;
};

optionsInfo._renderLinkSection = function () {
    /* eslint-disable brace-style*/
    document.getElementById('btn-info-tab').addEventListener('click', options._changeTab);
    document.getElementById('link-welcome-page').addEventListener('click', function () { options._onLinkClick(Links.WELCOME); });
    document.getElementById('link-changelog').addEventListener('click', function () { options._onLinkClick(Links.CHANGELOG); });
    document.getElementById('link-donate').addEventListener('click', function () { options._onLinkClick(Links.DONATE); });
    document.getElementById('link-faq').addEventListener('click', function () { options._onLinkClick(Links.FAQ); });
    document.getElementById('link-statistic').addEventListener('click', function () { options._onLinkClick(Links.STATISTICS); });
    /* eslint-enable brace-style*/
};

optionsInfo._btnCreateList = function ({target}) {
    if (target.id === 'cdn') {
        document.getElementById('cdn').classList.add('btns-active');
        document.getElementById('framework').classList.remove('btns-active');
    } else {
        document.getElementById('cdn').classList.remove('btns-active');
        document.getElementById('framework').classList.add('btns-active');
    }
    optionsInfo._createList(target.id);
};

optionsInfo._createList = function (type) {
    let textArea, list;

    textArea = document.getElementById('generated-list');
    textArea.value = '';

    if (type === 'cdn') {
        list = Object.keys(mappings.cdn);
    } else if (type === 'framework') {
        list = Object.keys(optionsInfo._listOfFrameworks);
    } else {
        return;
    }

    list.forEach((elem) => {
        if (!(BrowserType.CHROMIUM && (elem === 'fontawesome' || elem === 'google-material-design-icons'))) {
            textArea.value += `${elem}\n`;
        }
    });
};


/**
 * Initializations
 */

optionsInfo._listOfFrameworks = {};
optionsInfo._listOfCDNs = {};

optionsInfo.init = function () {
    optionsInfo._renderCdnFrameworkSection();
    optionsInfo._renderLinkSection();


};