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
    /*
        NOTE:
        jsDelivr allows to load several files in one request
        This is just a workaround. If there are more websites which use this, we will have to do crazy things here to find and redirect these files.

        It's not possible to respond to a request with multiple redirections
        https://gitlab.com/nobody42/localcdn/-/issues/45
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
        return {
            'source': channelHost,
            'versionDelivered': '3.0.1',
            'path': 'resources/google-material-design-icons/google-material-design-icons.css',
            'bundle': ''
        };
    } else if (Regex.BOOTSTRAP_DATEPICKER_3.test(channelPath)) {
        return {
            'source': channelHost,
            'versionDelivered': '1.9.0',
            'path': 'resources/bootstrap-datepicker/1.9.0/bootstrap-datepicker3.standalone.min.css',
            'bundle': ''
        };
    } else if (Regex.BOOTSTRAP_DATEPICKER.test(channelPath)) {
        return {
            'source': channelHost,
            'versionDelivered': '1.9.0',
            'path': 'resources/bootstrap-datepicker/1.9.0/bootstrap-datepicker.standalone.min.css',
            'bundle': ''
        };
    } else if (Regex.FONT_AWESOME.test(channelHost + channelPath)) {
        return {
            'source': channelHost,
            'versionRequested': '4.6.3',
            'versionDelivered': '4.7.0',
            'path': 'resources/webfont/fa-loader.css',
            'bundle': ''
        };
    } else if (Regex.FONT_AWESOME_WITH_CODE.test(channelHost + channelPath)) {
        return {
            'source': channelHost,
            'versionRequested': '4.6.3',
            'versionDelivered': '4.7.0',
            'path': 'resources/webfont/fa-loader.jsm',
            'bundle': ''
        };
    } else if ((channelHost + channelPath) === 'cdn.jsdelivr.net/npm/vue') {
        return {
            'source': channelHost,
            'versionRequested': 'latest',
            'versionDelivered': '2.6.12',
            'path': 'resources/vue/2.6.12/vue.min.jsm',
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
        return {
            'source': channelHost,
            'versionRequested': '4.1.1',
            'path': 'resources/object-assign/4.1.1/object-assign.min.jsm',
            'bundle': ''
        };
    } else if ((channelHost + channelPath) === 'netdna.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css') {
        // This CDN delivers 'Font Awesome v4.7.0' as latest version
        return {
            'source': channelHost,
            'versionRequested': '4.7.0',
            'path': 'resources/fontawesome/4.7.0/css/font-awesome.min.css',
            'bundle': ''
        };
    } else {
        return false;
    }
};
