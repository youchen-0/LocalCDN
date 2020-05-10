/**
 * Files
 * Belongs to Decentraleyes.
 *
 * @author      Thomas Rientjes
 * @since       2014-07-24
 *
 * @author      nobody42
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
 * Files
 */

var files = {

    // Files [Stable]
    [Environment.STABLE]: {

        // AlgoliaSearch
        'resources/algoliasearch/3.35.1/algoliasearch.min.jsm': true,

        // TEMPORARY SOLUTION
        // algoliasearch@3(algoliasearchLite.min.js),algoliasearch.helper@2
        'resources/algoliasearch3.33.0_algoliasearchLite_algoliasearchHelper.jsm': true,

        // Angular Bootstrap
        'resources/angular-ui-bootstrap/1.3.3/ui-bootstrap-tpls.min.jsm': true,
        'resources/angular-ui-bootstrap/1.3.3/ui-bootstrap.min.jsm': true,
        'resources/angular-ui-bootstrap/0.14.3/ui-bootstrap-tpls.min.jsm': true,
        'resources/angular-ui-bootstrap/0.14.3/ui-bootstrap.min.jsm': true,

        // Angular Payments
        'resources/angular-payments/1.0.7/angular-payments.jsm': true,

        // Angular Stripe Checkout
        'resources/angular-stripe-checkout/5.1.0/angular-stripe-checkout.jsm': true,

        // AngularJS
        'resources/angularjs/1.7.9/angular-animate.min.jsm': true,
        'resources/angularjs/1.7.9/angular-aria.min.jsm': true,
        'resources/angularjs/1.7.9/angular-cookies.min.jsm': true,
        'resources/angularjs/1.7.9/angular-loader.min.jsm': true,
        'resources/angularjs/1.7.9/angular-message-format.min.jsm': true,
        'resources/angularjs/1.7.9/angular-messages.min.jsm': true,
        'resources/angularjs/1.7.9/angular-parse-ext.min.jsm': true,
        'resources/angularjs/1.7.9/angular-resource.min.jsm': true,
        'resources/angularjs/1.7.9/angular-route.min.jsm': true,
        'resources/angularjs/1.7.9/angular-sanitize.min.jsm': true,
        'resources/angularjs/1.7.9/angular-touch.min.jsm': true,
        'resources/angularjs/1.7.9/angular.min.jsm': true,

        'resources/angularjs/1.6.10/angular-animate.min.jsm': true,
        'resources/angularjs/1.6.10/angular-aria.min.jsm': true,
        'resources/angularjs/1.6.10/angular-cookies.min.jsm': true,
        'resources/angularjs/1.6.10/angular-loader.min.jsm': true,
        'resources/angularjs/1.6.10/angular-message-format.min.jsm': true,
        'resources/angularjs/1.6.10/angular-messages.min.jsm': true,
        'resources/angularjs/1.6.10/angular-parse-ext.min.jsm': true,
        'resources/angularjs/1.6.10/angular-resource.min.jsm': true,
        'resources/angularjs/1.6.10/angular-route.min.jsm': true,
        'resources/angularjs/1.6.10/angular-sanitize.min.jsm': true,
        'resources/angularjs/1.6.10/angular-touch.min.jsm': true,
        'resources/angularjs/1.6.10/angular.min.jsm': true,

        'resources/angularjs/1.4.14/angular-animate.min.jsm': true,
        'resources/angularjs/1.4.14/angular-aria.min.jsm': true,
        'resources/angularjs/1.4.14/angular-cookies.min.jsm': true,
        'resources/angularjs/1.4.14/angular-loader.min.jsm': true,
        'resources/angularjs/1.4.14/angular-message-format.min.jsm': true,
        'resources/angularjs/1.4.14/angular-messages.min.jsm': true,
        'resources/angularjs/1.4.14/angular-parse-ext.min.jsm': true,
        'resources/angularjs/1.4.14/angular-resource.min.jsm': true,
        'resources/angularjs/1.4.14/angular-route.min.jsm': true,
        'resources/angularjs/1.4.14/angular-sanitize.min.jsm': true,
        'resources/angularjs/1.4.14/angular-touch.min.jsm': true,
        'resources/angularjs/1.4.14/angular.min.jsm': true,

        'resources/angularjs/1.5.11/angular-animate.min.jsm': true,
        'resources/angularjs/1.5.11/angular-aria.min.jsm': true,
        'resources/angularjs/1.5.11/angular-cookies.min.jsm': true,
        'resources/angularjs/1.5.11/angular-loader.min.jsm': true,
        'resources/angularjs/1.5.11/angular-message-format.min.jsm': true,
        'resources/angularjs/1.5.11/angular-messages.min.jsm': true,
        'resources/angularjs/1.5.11/angular-parse-ext.min.jsm': true,
        'resources/angularjs/1.5.11/angular-resource.min.jsm': true,
        'resources/angularjs/1.5.11/angular-route.min.jsm': true,
        'resources/angularjs/1.5.11/angular-sanitize.min.jsm': true,
        'resources/angularjs/1.5.11/angular-touch.min.jsm': true,
        'resources/angularjs/1.5.11/angular.min.jsm': true,

        'resources/angularjs/1.3.13/angular-animate.min.jsm': true,
        'resources/angularjs/1.3.13/angular-aria.min.jsm': true,
        'resources/angularjs/1.3.13/angular-cookies.min.jsm': true,
        'resources/angularjs/1.3.13/angular-loader.min.jsm': true,
        'resources/angularjs/1.3.13/angular-messages.min.jsm': true,
        'resources/angularjs/1.3.13/angular-resource.min.jsm': true,
        'resources/angularjs/1.3.13/angular-route.min.jsm': true,
        'resources/angularjs/1.3.13/angular-sanitize.min.jsm': true,
        'resources/angularjs/1.3.13/angular-touch.min.jsm': true,
        'resources/angularjs/1.3.13/angular.min.jsm': true,

        // AngularJS Slider
        'resources/angularjs-slider/6.7.0/rzslider.min.jsm': true,

        // AngularJS Toaster
        'resources/angularjs-toaster/0.4.18/toaster.min.css': true,
        'resources/angularjs-toaster/0.4.18/toaster.min.jsm': true,
        'resources/angularjs-toaster/2.2.0/toaster.min.css': true,
        'resources/angularjs-toaster/2.2.0/toaster.min.jsm': true,

        // Animate CSS
        'resources/animate.css/3.7.2/animate.min.css': true,

        // AnguComplete
        'resources/angucomplete-alt/3.0.0/angucomplete-alt.min.jsm': true,

        // Angular UI Router
        'resources/angular-ui-router/1.0.25/angular-ui-router.min.jsm': true,
        'resources/angular-ui-router/0.4.3/angular-ui-router.min.jsm': true,

        // AngularJS ui-select
        'resources/angular-ui-select/0.20.0/select.min.jsm': true,

        // Backbone.js
        'resources/backbone.js/0.9.10/backbone-min.jsm': true,
        'resources/backbone.js/1.4.0/backbone-min.jsm': true,

        // Bootstrap.js
        'resources/bootstrap.js/3.3.7/bootstrap.min.jsm': true,
        'resources/bootstrap.js/4.4.1/bootstrap.min.jsm': true,

        // Bootstrap.css
        'resources/bootstrap.css/3.3.7/bootstrap.min.css': true,
        'resources/bootstrap.css/4.4.1/bootstrap.min.css': true,

        // Bootstrap-select
        'resources/bootstrap-select/1.13.14/bootstrap-select.min.css': true,

        // bootstrap-slider
        'resources/bootstrap-slider/10.6.2/bootstrap-slider.min.css': true,
        'resources/bootstrap-slider/10.6.2/bootstrap-slider.min.jsm': true,

        // Bootstrap Daterangepicker
        'resources/bootstrap-daterangepicker/2.1.27/daterangepicker.min.jsm': true,

        // clipboard.js
        'resources/clipboard.js/2.0.6/clipboard.min.jsm': true,

        // D3.js
        'resources/d3/3.5.17/d3.min.jsm': true,

        // Dojo
        'resources/dojo/1.14.1/dojo/dojo.jsm': true,

        // Ember.js
        'resources/ember.js/1.13.13/ember.min.jsm': true,
        'resources/ember.js/2.18.2/ember.min.jsm': true,
        'resources/ember.js/3.12.3/ember.min.jsm': true,

        // Ext Core
        'resources/ext-core/3.1.0/ext-core.jsm': true,

        // fancyBox
        'resources/fancybox/2.1.5/helpers/jquery.fancybox-media.jsm': true,
        'resources/fancybox/2.1.5/jquery.fancybox.min.css': true,
        'resources/fancybox/2.1.5/jquery.fancybox.min.jsm': true,

        // Finify bundle
        'resources/findify-bundle/6.9.15/bundle.jsm': true,
        'resources/findify-bundle/6.9.15/components.jsm': true,
        'resources/findify-bundle/6.9.15/config.jsm': true,
        'resources/findify-bundle/6.9.15/initializer.jsm': true,
        'resources/findify-bundle/6.9.15/polyfill.jsm': true,
        'resources/findify-bundle/6.9.15/vendors~components~initializer.jsm': true,
        'resources/findify-bundle/6.9.15/vendors~initializer.jsm': true,
        'resources/findify-bundle/6.9.15/vendors~sentry.jsm': true,

        // flv.js
        'resources/flv.js/1.5.0/flv.min.jsm': true,

        // Font Awesome
        'resources/fontawesome/3.2.1/css/font-awesome.min.css': true,
        'resources/fontawesome/3.2.1/css/font-awesome.css': true,
        'resources/fontawesome/3.2.1/css/font-awesome-ie7.css': true,
        'resources/fontawesome/3.2.1/css/font-awesome-ie7.min.css': true,
        'resources/fontawesome/4.7.0/css/font-awesome.min.css': true,
        'resources/fontawesome/5.7.2/css/all.css': true,

        // hls.js
        'resources/hls.js/0.13.2/hls.min.jsm': true,

        // jQuery
        'resources/jquery/1.7.1/jquery.min.jsm': true,
        'resources/jquery/1.8.3/jquery.min.jsm': true,
        'resources/jquery/1.12.4/jquery.min.jsm': true,
        'resources/jquery/2.2.4/jquery.min.jsm': true,
        'resources/jquery/3.4.1/jquery.min.jsm': true,

        // jQuery BlockUI
        'resources/jquery.blockUI/2.70/jquery.blockUI.min.jsm': true,

        // jQuery-csv
        'resources/jquery-csv/1.0.9/jquery.csv.min.jsm': true,

        // jQuery Ajax AutoComplete
        'resources/jquery.devbridge-autocomplete/1.4.10/jquery.autocomplete.min.jsm': true,

        // jQuery Lazy Load
        'resources/jquery.lazyload/1.9.1/jquery.lazyload.min.jsm': true,

        // jQuery Migrate
        'resources/jquery-migrate/1.4.1/jquery-migrate.min.jsm': true,
        'resources/jquery-migrate/3.1.0/jquery-migrate.min.jsm': true,

        // jQuery UI
        'resources/jqueryui/1.11.4/jquery-ui.min.jsm': true,
        'resources/jqueryui/1.8.18/jquery-ui.min.jsm': true,

        // jQuery UI Themes
        'resources/jqueryui/1.8.18/themes/base/minified/jquery-ui.min.css': true,

        // jQuery Validation Plugin
        'resources/jquery-validate/1.19.1/jquery.validate.min.jsm': true,

        // jQuery jeditable
        'resources/jquery-jeditable/1.8.0/jquery.jeditable.min.jsm': true,

        // jQuery URLive
        'resources/urlive/1.1.1/jquery.urlive.min.jsm': true,

        // JavaScript Cookie
        'resources/js-cookie/2.2.1/js.cookie.min.jsm': true,

        // lazysizes
        'resources/lazysizes/4.1.8/lazysizes.min.jsm': true,

        // lodash
        'resources/lodash.js/4.17.10/lodash.min.jsm': true,

        // lozad.js
        'resources/lozad.js/1.14.0/lozad.min.jsm': true,

        // Modernizr
        'resources/modernizr/2.8.3/modernizr.min.jsm': true,

        // Moment.js
        'resources/moment.js/2.24.0/moment.min.jsm': true,

        // MooTools
        'resources/mootools/1.6.0/mootools-core.min.jsm': true,

        // ocLazyLoad
        'resources/oclazyload/1.1.0/ocLazyLoad.min.jsm': true,

        // P2P Media Loader Core
        'resources/p2p-media-loader-core/0.6.2/p2p-media-loader-core.min.jsm': true,

        // plyr CSS
        'resources/plyr/3.5.10/plyr.min.css': true,

        // Prototype
        'resources/prototype/1.7.3.0/prototype.jsm': true,

        // page.js
        'resources/page.js/1.7.1/page.min.jsm': true,

        // popper.js
        'resources/popper.js/1.16.1/popper.min.jsm': true,

        // Raven.js
        'resources/raven.js/3.26.2/raven.min.jsm': true,
        'resources/raven.js/3.26.2/plugins/angular.min.jsm': true,

        // React
        'resources/react/16.13.1/umd/react.production.min.jsm': true,

        // ReactDOM
        'resources/react-dom/16.13.1/umd/react-dom.production.min.jsm': true,

        // rickshaw
        'resources/rickshaw/1.6.6/rickshaw.min.jsm': true,
        'resources/rickshaw/1.6.6/rickshaw.min.css': true,

        // Cloudflare Rocket Loader
        'resources/rocket-loader/latest/rocket-loader.min.jsm': true,

        // Scriptaculous
        'resources/scriptaculous/1.9.0/scriptaculous.jsm': true,

        // Socket.IO
        'resources/socket.io/2.3.0/socket.io.jsm': true,

        // Select2
        'resources/select2/4.0.12/select2.full.min.jsm': true,
        'resources/select2/4.0.12/select2.min.css': true,

        // spin.js
        'resources/spin.js/2.3.2/spin.min.jsm': true,

        // Store.js
        'resources/store.js/2.0.4/store.legacy.min.jsm': true,

        // SWFObject
        'resources/swfobject/2.2/swfobject.jsm': true,

        // toastr.js
        'resources/toastr.js/2.1.4/toastr.min.css': true,
        'resources/toastr.js/2.1.4/toastr.min.jsm': true,

        // Twitter Bootstrap
        'resources/twitter-bootstrap/3.4.1/js/bootstrap.min.jsm': true,
        'resources/twitter-bootstrap/3.4.1/css/bootstrap.min.css': true,

        // Underscore.js
        'resources/underscore.js/1.8.3/underscore-min.jsm': true,

        // urlize
        'resources/urlize/latest/urlize.jsm': true,

        // Vue.js
        'resources/vue/1.0.28/vue.min.jsm': true,
        'resources/vue/2.6.11/vue.min.jsm': true,

        // WebComponents.js
        'resources/webcomponentsjs/latest/webcomponents-loader.jsm': true,

        // Web Font Loader
        'resources/webfont/1.6.28/webfont.jsm': true,

        // WebRTC adapter
        'resources/webrtc-adapter/6.4.8/adapter.min.jsm': true,

        // WOW
        'resources/wow/1.1.2/wow.min.jsm': true
    },

    // Files [Staging]
    [Environment.STAGING]: {

    }
};
