/**
 * Resources
 * Belongs to Decentraleyes.
 *
 * @author      Thomas Rientjes
 * @since       2014-05-30
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
 * Resources
 */

var resources = {

    // AlgoliaSearch
    'algoliaSearch': {
        'path': 'resources/algoliasearch/3.35.1/algoliasearch.min.jsm',
        'type': 'application/javascript'
    },
    // TEMPORARY SOLUTION
    // algoliasearch@3(algoliasearchLite.min.js),algoliasearch.helper@2
    'algoliasearchSearchlightHelper': {
        'path': 'resources/algoliasearch3.33.0_algoliasearchLite_algoliasearchHelper.jsm',
        'type': 'application/javascript'
    },
    // AnguComplete
    'anguComplete': {
        'path': 'resources/angucomplete-alt/{version}/angucomplete-alt.min.jsm',
        'type': 'application/javascript'
    },
    // AngularJS
    'angular': {
    	'path': 'resources/angularjs/{version}/angular.min.jsm',
    	'type': 'application/javascript'
    },
    'angularAnimate': {
    	'path': 'resources/angularjs/{version}/angular-animate.min.jsm',
    	'type': 'application/javascript'
    },
    'angularAria': {
    	'path': 'resources/angularjs/{version}/angular-aria.min.jsm',
    	'type': 'application/javascript'
    },
    'angularCookies': {
    	'path': 'resources/angularjs/{version}/angular-cookies.min.jsm',
    	'type': 'application/javascript'
    },
    'angularLoader': {
    	'path': 'resources/angularjs/{version}/angular-loader.min.jsm',
    	'type': 'application/javascript'
    },
    'angularMessageFormat': {
    	'path': 'resources/angularjs/{version}/angular-message-format.min.jsm',
    	'type': 'application/javascript'
    },
    'angularMessages': {
    	'path': 'resources/angularjs/{version}/angular-messages.min.jsm',
    	'type': 'application/javascript'
    },
    'angularParseExt': {
    	'path': 'resources/angularjs/{version}/angular-parse-ext.min.jsm',
    	'type': 'application/javascript'
    },
    'angularResource': {
    	'path': 'resources/angularjs/{version}/angular-resource.min.jsm',
    	'type': 'application/javascript'
    },
    'angularRoute': {
    	'path': 'resources/angularjs/{version}/angular-route.min.jsm',
    	'type': 'application/javascript'
    },
    'angularSanitize': {
    	'path': 'resources/angularjs/{version}/angular-sanitize.min.jsm',
    	'type': 'application/javascript'
    },
    'angularTouch': {
    	'path': 'resources/angularjs/{version}/angular-touch.min.jsm',
    	'type': 'application/javascript'
    },
    'angularMaterialDesignJS': {
    	'path': 'resources/angular-material/{version}/angular-material.min.jsm',
    	'type': 'application/javascript'
    },
    'angularMaterialDesignCSS': {
    	'path': 'resources/angular-material/{version}/angular-material.min.css',
        'type': 'text/css'
    },
    // AngularJS slider
    'angularJSslider': {
        'path': 'resources/angularjs-slider/{version}/rzslider.min.jsm',
        'type': 'application/javascript'
    },
    // AngularJS ui-select
    'angularJsUiSelect': {
        'path': 'resources/angular-ui-select/{version}/select.min.jsm',
        'type': 'application/javascript'
    },
    // AngularUI Bootstrap
    'angularUiBootstrapTPLS': {
        'path': 'resources/angular-ui-bootstrap/{version}/ui-bootstrap-tpls.min.jsm',
        'type': 'application/javascript'
    },
    'angularUiBootstrap': {
        'path': 'resources/angular-ui-bootstrap/{version}/ui-bootstrap.min.jsm',
        'type': 'application/javascript'
    },
    // AngularUI Router
    'angularUiRouter': {
        'path': 'resources/angular-ui-router/{version}/angular-ui-router.min.jsm',
        'type': 'application/javascript'
    },
    // AngularJS Toaster
    'angularJsToasterCSS': {
        'path': 'resources/angularjs-toaster/{version}/toaster.min.css',
        'type': 'text/css'
    },
    'angularJsToasterJS': {
        'path': 'resources/angularjs-toaster/{version}/toaster.min.jsm',
        'type': 'application/javascript'
    },
    // Angular Payments
    'angularPayments': {
        'path': 'resources/angular-payments/{version}/angular-payments.jsm',
        'type': 'application/javascript'
    },
    // Angular Stripe Checkout
    'angularStripeCheckout': {
        'path': 'resources/angular-stripe-checkout/{version}/angular-stripe-checkout.jsm',
        'type': 'application/javascript'
    },
    // Angular Sanitize
    'angularSanitize': {
        'path': 'resources/angular-sanitize/{version}/angular-sanitize.min.jsm',
        'type': 'application/javascript'
    },
    // Animate CSS
    'animateCSS': {
        'path': 'resources/animate.css/{version}/animate.min.css',
        'type': 'text/css'
    },
    // autocomplete.js
    'autocompleteJS': {
        'path': 'resources/autocomplete.js/{version}/autocomplete.min.jsm',
        'type': 'application/javascript'
    },
    // Backbone.js
    'backbone': {
        'path': 'resources/backbone.js/{version}/backbone-min.jsm',
        'type': 'application/javascript'
    },
    // Bootstrap.js
    'bootstrapJS': {
        'path': 'resources/bootstrap.js/{version}/bootstrap.min.jsm',
        'type': 'application/javascript'
    },
    // Bootstrap.css
    'bootstrapCSS': {
        'path': 'resources/bootstrap.css/{version}/bootstrap.min.css',
        'type': 'text/css'
    },
    // Bootstrap Daterangepicker
    'bootstrapDaterangepicker': {
        'path': 'resources/bootstrap-daterangepicker/{version}/daterangepicker.min.jsm',
        'type': 'application/javascript'
    },
    // Bootstrap Datepicker
    'bootstrapDatepickerCSS': {
        'path': 'resources/bootstrap-datepicker/{version}/css/bootstrap-datepicker.standalone.min.css',
        'type': 'text/css'
    },
    'bootstrapDatepickerJS': {
        'path': 'resources/bootstrap-datepicker/{version}/js/bootstrap-datepicker.min.jsm',
        'type': 'application/javascript'
    },
    // Bootstrap-select
    'bootstrapSelectCSS': {
        'path': 'resources/bootstrap-select/{version}/css/bootstrap-select.min.css',
        'type': 'text/css'
    },
    'bootstrapSelectJS': {
        'path': 'resources/bootstrap-select/{version}/js/bootstrap-select.min.jsm',
        'type': 'application/javascript'
    },
    // bootstrap-slider (Slider for Bootstrap 3)
    'bootstrapSliderCSS': {
        'path': 'resources/bootstrap-slider/{version}/bootstrap-slider.min.css',
        'type': 'text/css'
    },
    'bootstrapSliderJS': {
        'path': 'resources/bootstrap-slider/{version}/bootstrap-slider.min.jsm',
        'type': 'application/javascript'
    },
    // clipboard.js
    'clipboardJS': {
        'path': 'resources/clipboard.js/{version}/clipboard.min.jsm',
        'type': 'application/javascript'
    },
    // D3.js
    'd3JS': {
        'path': 'resources/d3/{version}/d3.min.jsm',
        'type': 'application/javascript'
    },
    // D3 Legend
    'd3legend': {
        'path': 'resources/d3-legend/{version}/d3-legend.min.jsm',
        'type': 'application/javascript'
    },
    // Dojo
    'dojo': {
        'path': 'resources/dojo/{version}/dojo/dojo.jsm',
        'type': 'application/javascript'
    },
    // Ember.js
    'ember': {
        'path': 'resources/ember.js/{version}/ember.min.jsm',
        'type': 'application/javascript'
    },
    // Ext Core
    'extCore': {
        'path': 'resources/ext-core/{version}/ext-core.jsm',
        'type': 'application/javascript'
    },
    // fancyBox
    'fancyBoxMediaJS': {
        'path': 'resources/fancybox/{version}/helpers/jquery.fancybox-media.jsm',
        'type': 'application/javascript'
    },
    'fancyBoxCSS': {
        'path': 'resources/fancybox/{version}/jquery.fancybox.min.css',
        'type': 'text/css'
    },
    'fancyBoxJS': {
        'path': 'resources/fancybox/{version}/jquery.fancybox.min.jsm',
        'type': 'application/javascript'
    },
    // Finify bundle
    'findifyBundle': {
        'path': 'resources/findify-bundle/{version}/',
        'type': 'application/javascript'
    },
    // flv.js
    'flvJS': {
        'path': 'resources/flv.js/{version}/flv.min.jsm',
        'type': 'application/javascript'
    },

    // Font Awesome
    'fontawesome': {
        'path': 'resources/fontawesome/{version}/css/font-awesome.min.css',
        'type': 'text/css'
    },
    // Font Awesome
    'fontawesome5CSS': {
        'path': 'resources/fontawesome/{version}/css/all.min.css',
        'type': 'text/css'
    },
    'fontawesome5JS': {
        'path': 'resources/fontawesome/{version}/js/all.min.jsm',
        'type': 'application/javascript'
    },
    // hls.js
    'hlsJS': {
        'path': 'resources/hls.js/{version}/hls.min.jsm',
        'type': 'application/javascript'
    },
    // jeditableJS
    'jeditableJS': {
        'path': 'resources/jquery-jeditable/{version}/jquery.jeditable.min.jsm',
        'type': 'application/javascript'
    },
    // jQuery Ajax AutoComplete
    'jQueryAjaxAutoComplete': {
        'path': 'resources/jquery.devbridge-autocomplete/1.4.10/jquery.autocomplete.min.jsm',
        'type': 'application/javascript'
    },
    // jQuery
    'jQuery': {
        'path': 'resources/jquery/{version}/jquery.min.jsm',
        'type': 'application/javascript'
    },
    // jQuery BlockUI
    'jQueryBlockUI': {
        'path': 'resources/jquery.blockUI/{version}/jquery.blockUI.min.jsm',
        'type': 'application/javascript'
    },
    // jQuery-csv
    'jQueryCSV': {
        'path': 'resources/jquery-csv/1.0.9/jquery.csv.min.jsm',
        'type': 'application/javascript'
    },
    // jQuery Lazy Load
    'jQueryLazyLoad': {
        'path': 'resources/jquery.lazyload/{version}/jquery.lazyload.min.jsm',
        'type': 'application/javascript'
    },
    // jQuery Migrate
    'jQueryMigrate': {
        'path': 'resources/jquery-migrate/{version}/jquery-migrate.min.jsm',
        'type': 'application/javascript'
    },
    // jQuery UI
    'jQueryUI': {
        'path': 'resources/jqueryui/{version}/jquery-ui.min.jsm',
        'type': 'application/javascript'
    },
    // jQuery UI Themes
    'jQueryUiThemes': {
        'path': 'resources/jqueryui/{version}/themes/base/minified/jquery-ui.min.css',
        'type': 'text/css'
    },
    // jQuery URLive
    'jqueryURLive': {
        'path': 'resources/urlive/{version}/jquery.urlive.min.jsm',
        'type': 'application/javascript'
    },
    // jQuery Validation Plugin
    'jqueryValidationPlugin': {
        'path': 'resources/jquery-validate/{version}/jquery.validate.min.jsm',
        'type': 'application/javascript'
    },
    // jQuery Mobile
    'jQueryMobile': {
        'path': 'resources/jquery-mobile/{version}/jquery.mobile.min.jsm',
        'type': 'application/javascript'
    },
    // js-cookie
    'jscookie': {
        'path': 'resources/js-cookie/{version}/js.cookie.min.jsm',
        'type': 'application/javascript'
    },
    // lazysizes
    'lazysizes': {
        'path': 'resources/lazysizes/{version}/lazysizes.min.jsm',
        'type': 'application/javascript'
    },
    // Lodash
    'lodashJS': {
        'path': 'resources/lodash.js/{version}/lodash.min.jsm',
        'type': 'application/javascript'
    },
    // lozad.js
    'lozad': {
        'path': 'resources/lozad.js/{version}/lozad.min.jsm',
        'type': 'application/javascript'
    },
    // Material Design for Bootstrap
    'mdbootstrapJS': {
        'path': 'resources/mdbootstrap/{version}/js/mdb.min.jsm',
        'type': 'application/javascript'
    },
    'mdbootstrapCSS': {
        'path': 'resources/mdbootstrap/{version}/css/mdb.min.css',
        'type': 'text/css'
    },
    // Cloudflare Mirage 2
    'mirage2': {
        'path': 'resources/mirage2/latest/mirage2.min.jsm',
        'type': 'application/javascript'
    },
    // Modernizr
    'modernizr': {
        'path': 'resources/modernizr/{version}/modernizr.min.jsm',
        'type': 'application/javascript'
    },
    // Moment.js
    'moment': {
        'path': 'resources/moment.js/{version}/moment.min.jsm',
        'type': 'application/javascript'
    },
    // MooTools
    'mootools': {
        'path': 'resources/mootools/{version}/mootools-core.min.jsm',
        'type': 'application/javascript'
    },
    'mootoolsYui': {
        'path': 'resources/mootools/{version}/mootools-yui-compressed.jsm',
        'type': 'application/javascript'
    },
    // ocLazyLoad
    'ocLazyLoad': {
        'path': 'resources/oclazyload/{version}/ocLazyLoad.min.jsm',
        'type': 'application/javascript'
    },
    // P2P Media Loader Core
    'p2pMediaLoaderCore': {
        'path': 'resources/p2p-media-loader-core/{version}/p2p-media-loader-core.min.jsm',
        'type': 'application/javascript'
    },
    // page.js
    'pageJs': {
        'path': 'resources/page.js/{version}/page.min.jsm',
        'type': 'application/javascript'
    },
    // plyr CSS
    'plyrCSS': {
        'path': 'resources/plyr/{version}/plyr.min.css',
        'type': 'text/css'
    },
    // Popper
    'popperJS': {
        'path': 'resources/popper.js/{version}/umd/popper.min.jsm',
        'type': 'text/css'
    },
    // Prototype
    'prototypeJS': {
        'path': 'resources/prototype/{version}/prototype.jsm',
        'type': 'application/javascript'
    },
    // Raven.js
    'ravenJS': {
        'path': 'resources/raven/{version}/raven.min.jsm',
        'type': 'application/javascript'
    },
    'ravenPluginAngularJS': {
        'path': 'resources/raven.js/{version}/plugins/angular.min.jsm',
        'type': 'application/javascript'
    },
    // React
    'react': {
        'path': 'resources/react/16.13.1/umd/react.production.min.jsm',
        'type': 'application/javascript'
    },
    // ReactDOM
    'reactDOM': {
        'path': 'resources/react-dom/16.13.1/umd/react-dom.production.min.jsm',
        'type': 'application/javascript'
    },
    // rickshaw
    'rickshawJS': {
        'path': 'resources/rickshaw/{version}/rickshaw.min.jsm',
        'type': 'application/javascript'
    },
    'rickshawCSS': {
        'path': 'resources/rickshaw/{version}/rickshaw.min.css',
        'type': 'text/css'
    },
    // Cloudflare Rocket Loader
    'cfRocketLoader': {
        'path': 'resources/rocket-loader/latest/rocket-loader.min.jsm',
        'type': 'application/javascript'
    },
    // Scriptaculous
    'scriptaculous': {
        'path': 'resources/scriptaculous/{version}/scriptaculous.jsm',
        'type': 'application/javascript'
    },
    // Select2
    'select2css': {
        'path': 'resources/select2/{version}/select2.min.css',
        'type': 'text/css'
    },
    'select2js': {
        'path': 'resources/select2/{version}/select2.full.min.jsm',
        'type': 'application/javascript'
    },
    // socket.io
    'socketIO': {
        'path': 'resources/socket.io/{version}/socket.io.jsm',
        'type': 'application/javascript'
    },
    // spin.js
    'spinJS': {
        'path': 'resources/spin.js/{version}/spin.min.jsm',
        'type': 'application/javascript'
    },
    // Store.js
    'storeJS': {
        'path': 'resources/store.js/{version}/store.legacy.min.jsm',
        'type': 'application/javascript'
    },
    // SWFObject
    'swfobject': {
        'path': 'resources/swfobject/{version}/swfobject.jsm',
        'type': 'application/javascript'
    },
    // Swiper
    'swiperJS': {
        'path': 'resources/swiper/{version}/js/swiper.min.jsm',
        'type': 'application/javascript'
    },
    'swiperCSS': {
        'path': 'resources/swiper/{version}/css/swiper.min.css',
        'type': 'text/css'
    },
    // Tether JS
    'tetherJS': {
        'path': 'resources/tether/{version}/js/tether.min.jsm',
        'type': 'application/javascript'
    },
    // Twitter Bootstrap JS
    'twitterBootstrapJS': {
        'path': 'resources/twitter-bootstrap/{version}/js/bootstrap.min.jsm',
        'type': 'application/javascript'
    },
    // Twitter Bootstrap CSS
    'twitterBootstrapCSS': {
        'path': 'resources/twitter-bootstrap/{version}/css/bootstrap.min.css',
        'type': 'text/css'
    },
    // toastr.js
    'toastrCSS': {
        'path': 'resources/toastr.js/{version}/toastr.min.css',
        'type': 'text/css'
    },
    // toastr.js
    'toastrJS': {
        'path': 'resources/toastr.js/{version}/toastr.min.jsm',
        'type': 'application/javascript'
    },
    // Underscore.js
    'underscore': {
        'path': 'resources/underscore.js/{version}/underscore-min.jsm',
        'type': 'application/javascript'
    },
    // urlize
    'urlize': {
        'path': 'resources/urlize/{version}/urlize.jsm',
        'type': 'application/javascript'
    },
    // Vue.js
    'vueJs': {
        'path': 'resources/vue/{version}/vue.min.jsm',
        'type': 'application/javascript'
    },
    // WebComponents.js
    'webcomponentsJS': {
        'path': 'resources/webcomponentsjs/{version}/webcomponents-loader.jsm',
        'type': 'application/javascript'
    },
    // Web Font Loader
    'webfont': {
        'path': 'resources/webfont/{version}/webfont.jsm',
        'type': 'application/javascript'
    },
    'webfontloader': {
        'path': 'resources/webfont/{version}/webfontloader.jsm',
        'type': 'application/javascript'
    },
    // WebRTC adapter
    'webRTCadapter': {
        'path': 'resources/webrtc-adapter/{version}/adapter.min.jsm',
        'type': 'application/javascript'
    },
    // WOW
    'wow': {
        'path': 'resources/wow/{version}/wow.min.jsm',
        'type': 'application/javascript'
    }
};
