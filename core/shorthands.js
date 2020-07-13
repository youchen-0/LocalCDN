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

var shorthands = {

    // Google Hosted Libraries [Deprecated]
    'ajax.googleapis.com': {
        'resources/jquery/1.8/jquery.min.jsm': {
            'path': 'resources/jquery/1.8.3/jquery.min.jsm',
            'version': '1.8.3'
        },
        'resources/jquery/1.7/jquery.min.jsm': {
            'path': 'resources/jquery/1.7.2/jquery.min.jsm',
            'version': '1.7.2'
        },
        'resources/jquery/1.6/jquery.min.jsm': {
            'path': 'resources/jquery/1.6.4/jquery.min.jsm',
            'version': '1.6.4'
        },
        'resources/jquery/1.5/jquery.min.jsm': {
            'path': 'resources/jquery/1.5.2/jquery.min.jsm',
            'version': '1.5.2'
        },
        'resources/jquery/1.4/jquery.min.jsm': {
            'path': 'resources/jquery/1.4.4/jquery.min.jsm',
            'version': '1.4.4'
        },
        'resources/jquery/1.3/jquery.min.jsm': {
            'path': 'resources/jquery/1.3.2/jquery.min.jsm',
            'version': '1.3.2'
        },
        'resources/jquery/1.2/jquery.min.jsm': {
            'path': 'resources/jquery/1.2.6/jquery.min.jsm',
            'version': '1.2.6'
        }
    },
    // jQuery CDN [Deprecated]
    'code.jquery.com': {
        'resources/jquery/1.7/jquery.min.jsm': {
            'path': 'resources/jquery/1.7.0/jquery.min.jsm',
            'version': '1.7.0'
        },
        'resources/jquery/1.6/jquery.min.jsm': {
            'path': 'resources/jquery/1.6.0/jquery.min.jsm',
            'version': '1.6.0'
        },
        'resources/jquery/1.5/jquery.min.jsm': {
            'path': 'resources/jquery/1.5.0/jquery.min.jsm',
            'version': '1.5.0'
        },
        'resources/jquery/1.4/jquery.min.jsm': {
            'path': 'resources/jquery/1.4.0/jquery.min.jsm',
            'version': '1.4.0'
        },
        'resources/jquery/1.3/jquery.min.jsm': {
            'path': 'resources/jquery/1.3.0/jquery.min.jsm',
            'version': '1.3.0'
        }
    }
};

// Geekzu Public Service [Mirror]
shorthands['sdn.geekzu.org'] = shorthands['ajax.googleapis.com'];

// USTC Linux User Group [Mirror]
shorthands['ajax.proxy.ustclug.org'] = shorthands['ajax.googleapis.com'];

shorthands.specialFiles = function (channelHost, channelPath, searchString) {
    /*
        NOTE:
        jsDelivr allows to load several files in one request
        This is just a workaround. If there are more websites which use this, we will have to do crazy things here to find and redirect these files.

        It's not possible to respond to a request with multiple redirections
        https://gitlab.com/nobody42/localcdn/-/issues/45
    */
    let regexJsDelivr = RegExp(/\/combine.*jquery.*hogan.*algoliasearch.*autocomplete.*/);
    if (channelHost.includes('cdn.jsdelivr.net') && regexJsDelivr.test(channelPath)) {
        return {
            'source': channelHost,
            'version': 'beta',
            'path': 'resources/jsdelivr-combine-jquery-hogan-algoliasearch-autocomplete.jsm',
            'bundle': ''
        };
    } else if (channelHost.includes('cdn.jsdelivr.net') && channelPath.includes('algoliasearch@3(algoliasearchLite.min.js),algoliasearch.helper@2')) {
        // https://gitlab.com/nobody42/localcdn/-/issues/55
        return {
            'source': channelHost,
            'version': 'beta',
            'path': 'resources/algoliasearch3.33.0_algoliasearchLite_algoliasearchHelper.jsm',
            'bundle': ''
        };
    } else if (channelHost + channelPath + searchString === 'fonts.googleapis.com/icon?family=Material+Icons') {
        return {
            'source': channelHost,
            'version': '3.0.1',
            'path': 'resources/google-material-design-icons/google-material-design-icons.css',
            'bundle': ''
        };
    } else if (/\/bootstrap-datepicker3.*\.css/.test(channelPath)) {
        return {
            'source': channelHost,
            'version': '1.9.0',
            'path': 'resources/bootstrap-datepicker/1.9.0/bootstrap-datepicker3.standalone.min.css',
            'bundle': ''
        };
    } else if (/\/bootstrap-datepicker.*\.css/.test(channelPath)) {
        return {
            'source': channelHost,
            'version': '1.9.0',
            'path': 'resources/bootstrap-datepicker/1.9.0/bootstrap-datepicker.standalone.min.css',
            'bundle': ''
        };
    } else {
        return false;
    }
};
