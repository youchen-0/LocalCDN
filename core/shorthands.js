/**
 * Shorthands
 * Belongs to LocalCDN (since 2020-02-26)
 * (Origin: Decentraleyes)
 *
 * @author      Thomas Rientjes
 * @since       2018-02-24
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
 * Shorthands
 */

var shorthands = {};

shorthands.specialFiles = function (channelHost, channelPath, searchString) {

    let lastVersion;

    /**
     * NOTE:
     * jsDelivr allows to load several files in one request
     * This is just a workaround. If there are more websites which use this,
     * we will have to do crazy things here to find and redirect these files.
     *
     * It's not possible to respond to a request with multiple redirections
     * https://gitlab.com/nobody42/localcdn/-/issues/45
     */

    if (Regex.JSDELIVR_COMBINE.test(channelHost + channelPath)) {
        return {
            'source': channelHost,
            'versionDelivered': 'beta',
            'path': 'resources/jsdelivr-combine-jquery-hogan-algoliasearch-autocomplete.jsm',
            'bundle': ''
        };
    } else if ((channelHost + channelPath) === 'cdn.jsdelivr.net/g/algoliasearch@3(algoliasearchLite.min.js),algoliasearch.helper@2') {
        // https://gitlab.com/nobody42/localcdn/-/issues/55
        return {
            'source': channelHost,
            'versionDelivered': 'beta',
            'path': 'resources/algoliasearch3.33.0_algoliasearchLite_algoliasearchHelper.jsm',
            'bundle': ''
        };
    } else if (Regex.GOOGLE_MATERIAL_ICONS.test(channelHost + channelPath + searchString)) {
        lastVersion = targets.setLastVersion('/google-material-design-icons/');
        return {
            'source': channelHost,
            'versionDelivered': lastVersion,
            'path': 'resources/google-material-design-icons/google-material-design-icons.css',
            'bundle': ''
        };
    } else if (Regex.BOOTSTRAP_DATEPICKER_3.test(channelPath)) {
        lastVersion = targets.setLastVersion('/bootstrap-datepicker/1.');
        return {
            'source': channelHost,
            'versionDelivered': lastVersion,
            'path': `resources/bootstrap-datepicker/${lastVersion}/bootstrap-datepicker3.standalone.min.css`,
            'bundle': ''
        };
    } else if (Regex.BOOTSTRAP_DATEPICKER.test(channelPath)) {
        lastVersion = targets.setLastVersion('/bootstrap-datepicker/1.');
        return {
            'source': channelHost,
            'versionDelivered': lastVersion,
            'path': `resources/bootstrap-datepicker/${lastVersion}/bootstrap-datepicker.standalone.min.css`,
            'bundle': ''
        };
    } else if (Regex.FONT_AWESOME.test(channelHost + channelPath)) {
        lastVersion = targets.setLastVersion('/font-awesome/4.');
        return {
            'source': channelHost,
            'versionRequested': '4.6.3',
            'versionDelivered': lastVersion,
            'path': 'resources/webfont/fa-loader.css',
            'bundle': ''
        };
    } else if (Regex.FONT_AWESOME_WITH_CODE.test(channelHost + channelPath)) {
        let fileExtension = channelPath.endsWith('css') ? 'css' : 'jsm';
        lastVersion = targets.setLastVersion('/font-awesome/4.');
        return {
            'source': channelHost,
            'versionRequested': '4.6.3',
            'versionDelivered': lastVersion,
            'path': `resources/webfont/fa-loader.${fileExtension}`,
            'bundle': ''
        };
    } else if ((channelHost + channelPath) === 'cdn.jsdelivr.net/npm/vue') {
        lastVersion = targets.setLastVersion('/vue/2.');
        return {
            'source': channelHost,
            'versionRequested': 'latest',
            'versionDelivered': lastVersion,
            'path': `resources/vue/${lastVersion}/vue.min.jsm`,
            'bundle': ''
        };
    } else if ((channelHost + channelPath) === 'ajax.cloudflare.com/cdn-cgi/scripts/7089c43e/cloudflare-static/rocket-loader.min.js') {
        return {
            'source': channelHost,
            'versionRequested': 'latest',
            'path': 'resources/rocket-loader/latest/rocket-loader.min.jsm',
            'bundle': ''
        };
    } else if ((channelHost + channelPath) === 'unpkg.com/@umds/object-assign@4.1.1-beta.24/object-assign.min.js') {
        lastVersion = targets.setLastVersion('/object-assign@4.');
        return {
            'source': channelHost,
            'versionRequested': '4.1.1',
            'versionDelivered': lastVersion,
            'path': `resources/object-assign/${lastVersion}/object-assign.min.jsm`,
            'bundle': ''
        };
    } else if ((channelHost + channelPath) === 'netdna.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css') {
        // This CDN delivers 'Font Awesome v4.7.0' as latest version
        lastVersion = targets.setLastVersion('/font-awesome/4.');
        return {
            'source': channelHost,
            'versionRequested': lastVersion,
            'path': `resources/font-awesome/${lastVersion}/css/font-awesome.min.css`,
            'bundle': ''
        };
    } else if ((channelHost + channelPath) === 'cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.0.0-beta.2.4/owl.carousel.min.js') {
        return {
            'source': channelHost,
            'versionDelivered': '2.0.0-beta.2.4',
            'versionRequested': '2.0.0-beta.2.4',
            'path': 'resources/owl-carousel/2.0.0-beta.2.4/owl.carousel.min.jsm',
            'bundle': ''
        };
    } else if ((channelHost + channelPath).startsWith('cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/')) {
        if (channelPath.endsWith('js')) {
            channelPath += 'm';
        }
        lastVersion = targets.setLastVersion('/select2/4.');
        return {
            'source': channelHost,
            'versionDelivered': lastVersion,
            'versionRequested': '4.1.0-beta.1',
            'path': `resources/select2/${lastVersion}/${helpers.extractFilenameFromPath(channelPath)}`,
            'bundle': 'Select2'
        };
    } else if (channelHost + channelPath === 'cdn.jsdelivr.net/npm/anchor-js/anchor.min.js') {
        // This CDN always delivers the latest version of 'AnchorJS'
        lastVersion = targets.setLastVersion('/anchor-js/4.');
        return {
            'source': channelHost,
            'versionDelivered': lastVersion,
            'versionRequested': lastVersion,
            'path': `resources/anchor-js/${lastVersion}/anchor.min.jsm`,
            'bundle': ''
        };
    } else if (Regex.BOOTSTRAP_FONTS_ONLY.test(channelPath)) {
        return {
            'source': channelHost,
            'path': `resources/twitter-bootstrap/fonts/${helpers.extractFilenameFromPath(channelPath)}`,
            'bundle': 'Bootstrap (Fonts)'
        };
    } else if (channelHost + channelPath === 'cdn.jsdelivr.net/npm/js-cookie@beta/dist/js.cookie.min.js') {
        return {
            'source': channelHost,
            'path': 'resources/js-cookie/latest/js.cookie.min.jsm',
            'bundle': 'JSCookies'
        };
    } else {
        return false;
    }
};
