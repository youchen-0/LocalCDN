/**
 * Resources
 * Belongs to LocalCDN (since 2020-02-26)
 * (Origin: Decentraleyes)
 *
 * @author      Thomas Rientjes
 * @since       2014-05-30
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
 * Resources
 */

var resources = {

    // AlgoliaSearch
    'algoliaSearch': {
        'path': 'resources/algoliasearch/{version}/algoliasearch.min.jsm',
        'type': 'application/javascript'
    },
    // AnchorJS
    'anchorJS': {
        'path': 'resources/anchor-js/{version}/anchor.min.jsm',
        'type': 'application/javascript'
    },
    // AnguComplete [Deprecated]
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
    // angularMaterialDesign
    'angularMaterialDesignJS': {
    	'path': 'resources/angular-material/{version}/angular-material.min.jsm',
    	'type': 'application/javascript'
    },
    'angularMaterialDesignCSS': {
    	'path': 'resources/angular-material/{version}/angular-material.min.css',
        'type': 'text/css'
    },
    // angular-bootstrap-colorpicker [Deprecated]
    'angularBootstrapColorpickerJS': {
        'path': 'resources/angular-bootstrap-colorpicker/{version}/js/bootstrap-colorpicker-module.min.jsm',
        'type': 'application/javascript'
    },
    'angularBootstrapColorpickerCSS': {
        'path': 'resources/angular-bootstrap-colorpicker/{version}/css/colorpicker.min.css',
        'type': 'text/css'
    },
    // AngularJS slider
    'angularJSslider': {
        'path': 'resources/angularjs-slider/{version}/rzslider.min.jsm',
        'type': 'application/javascript'
    },
    // AngularJS ui-select [Deprecated]
    'angularJsUiSelect': {
        'path': 'resources/angular-ui-select/{version}/select.min.jsm',
        'type': 'application/javascript'
    },
    // angular-ui-utils [Deprecated]
    'angularUiUtils': {
        'path': 'resources/angular-ui-utils/{version}/angular-ui-utils.min.jsm',
        'type': 'application/javascript'
    },
    // AngularUI Bootstrap [Deprecated]
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
    // AngularJS Toaster [Deprecated?]
    'angularJsToasterCSS': {
        'path': 'resources/angularjs-toaster/{version}/toaster.min.css',
        'type': 'text/css'
    },
    'angularJsToasterJS': {
        'path': 'resources/angularjs-toaster/{version}/toaster.min.jsm',
        'type': 'application/javascript'
    },
    // Angular Payments [Deprecated]
    'angularPayments': {
        'path': 'resources/angular-payments/{version}/angular-payments.jsm',
        'type': 'application/javascript'
    },
    // Angular Stripe Checkout [Deprecated]
    'angularStripeCheckout': {
        'path': 'resources/angular-stripe-checkout/{version}/angular-stripe-checkout.jsm',
        'type': 'application/javascript'
    },
    // Angular Translate
    'angularTranslate': {
        'path': 'resources/angular-translate/{version}/angular-translate.min.jsm',
        'type': 'application/javascript'
    },
    'angularTranslateInterpolationMessageformat': {
        'path': 'resources/angular-translate/{version}/angular-translate-interpolation-messageformat.min.jsm',
        'type': 'application/javascript'
    },
    'angularTranslateLoaderStaticFiles': {
        'path': 'resources/angular-translate/{version}/angular-translate-loader-static-files.min.jsm',
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
    // axios
    'axios': {
        'path': 'resources/axios/{version}/axios.min.jsm',
        'type': 'application/javascript'
    },
    // Babel Polyfill
    'babelPolyfill': {
        'path': 'resources/babel-polyfill/{version}/polyfill.min.jsm',
        'type': 'application/javascript'
    },
    // Backbone.js
    'backbone': {
        'path': 'resources/backbone.js/{version}/backbone-min.jsm',
        'type': 'application/javascript'
    },
    // baguetteBox.js
    'baguetteBoxJS': {
        'path': 'resources/baguettebox.js/{version}/baguetteBox.min.jsm',
        'type': 'application/javascript'
    },
    'baguetteBoxCSS': {
        'path': 'resources/baguettebox.js/{version}/baguetteBox.min.css',
        'type': 'text/css'
    },
    // blazy
    'blazy': {
        'path': 'resources/blazy/{version}/blazy.min.jsm',
        'type': 'application/javascript'
    },
    // BootboxJS
    'bootbox': {
        'path': 'resources/bootbox.js/{version}/bootbox.min.jsm',
        'type': 'application/javascript'
    },
    // Bootstrap
    'bootstrapJS': {
        'path': 'resources/bootstrap/{version}/bootstrap.min.jsm',
        'type': 'application/javascript'
    },
    'bootstrapCSS': {
        'path': 'resources/bootstrap/{version}/bootstrap.min.css',
        'type': 'text/css'
    },
    'bootstrapFontsOnly': {
        'path': 'resources/bootstrap/fonts/'
    },
    // Bootstrap Daterangepicker
    'bootstrapDaterangepicker': {
        'path': 'resources/bootstrap-daterangepicker/{version}/daterangepicker.min.jsm',
        'type': 'application/javascript'
    },
    // Bootstrap Datepicker (bundle)
    'bootstrapDatepickerBundle': {
        'path': 'resources/bootstrap-datepicker/{version}/',
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
    // Bootstrap Table
    'bootstrapTableJS': {
        'path': 'resources/bootstrap-table/{version}/bootstrap-table.min.jsm',
        'type': 'application/javascript'
    },
    'bootstrapTableCSS': {
        'path': 'resources/bootstrap-table/{version}/bootstrap-table.min.css',
        'type': 'text/css'
    },
    // Bootstrap Toggle [Deprecated]
    'bootstrapToggleJS': {
        'path': 'resources/bootstrap-toggle/{version}/js/bootstrap-toggle.min.jsm',
        'type': 'application/javascript'
    },
    'bootstrap2ToggleJS': {
        'path': 'resources/bootstrap-toggle/{version}/js/bootstrap2-toggle.min.jsm',
        'type': 'application/javascript'
    },
    'bootstrapToggleCSS': {
        'path': 'resources/bootstrap-toggle/{version}/css/bootstrap-toggle.min.css',
        'type': 'text/css'
    },
    'bootstrap2ToggleCSS': {
        'path': 'resources/bootstrap-toggle/{version}/css/bootstrap2-toggle.min.css',
        'type': 'text/css'
    },
    // Bootstrap 3 Typeahead
    'bootstrap3Typeahead': {
        'path': 'resources/bootstrap-3-typeahead/{version}/bootstrap3-typeahead.min.jsm',
        'type': 'application/javascript'
    },
    // Chart.js
    'chartJs': {
        'path': 'resources/chart.js/{version}/Chart.bundle.min.jsm',
        'type': 'application/javascript'
    },
    'chartJsCSS': {
        'path': 'resources/chart.js/{version}/Chart.min.css',
        'type': 'text/css'
    },
    // chosen
    'chosen': {
        'path': 'resources/chosen/{version}/chosen.jquery.min.jsm',
        'type': 'application/javascript'
    },
    // clipboard.js
    'clipboardJS': {
        'path': 'resources/clipboard.js/{version}/clipboard.min.jsm',
        'type': 'application/javascript'
    },
    // Cookie Consent [Deprecated?]
    'cookieconsent2JS': {
        'path': 'resources/cookieconsent2/{version}/cookieconsent.min.jsm',
        'type': 'application/javascript'
    },
    'cookieconsent2CSS': {
        'path': 'resources/cookieconsent2/{version}/cookieconsent.min.css',
        'type': 'text/css'
    },
    // D3.js
    'd3JS': {
        'path': 'resources/d3/{version}/d3.min.jsm',
        'type': 'application/javascript'
    },
    // D3 Legend [Deprecated]
    'd3legend': {
        'path': 'resources/d3-legend/{version}/d3-legend.min.jsm',
        'type': 'application/javascript'
    },
    // dexie
    'dexie': {
        'path': 'resources/dexie/{version}/dexie.min.jsm',
        'type': 'application/javascript'
    },
    // docsearch.js
    'docsearchJS': {
        'path': 'resources/docsearch.js/{version}/docsearch.min.jsm',
        'type': 'application/javascript'
    },
    'docsearchCSS': {
        'path': 'resources/docsearch.js/{version}/docsearch.min.css',
        'type': 'text/css'
    },
    // Dojo
    'dojo': {
        'path': 'resources/dojo/{version}/dojo/dojo.jsm',
        'type': 'application/javascript'
    },
    // Drawer [Deprecated]
    'drawerJS': {
        'path': 'resources/drawer/{version}/drawer.min.jsm',
        'type': 'application/javascript'
    },
    'drawerCSS': {
        'path': 'resources/drawer/{version}/drawer.min.css',
        'type': 'text/css'
    },
    // Element-UI (Bundle)
    'elementUI': {
        'path': 'resources/element-ui/{version}/',
        'type': 'application/javascript'
    },
    // Ember.js
    'ember': {
        'path': 'resources/ember.js/{version}/ember.min.jsm',
        'type': 'application/javascript'
    },
    // ethJs [Deprecated]
    'ethJs': {
        'path': 'resources/ethjs/{version}/ethjs.min.jsm',
        'type': 'application/javascript'
    },
    // Ext Core
    'extCore': {
        'path': 'resources/ext-core/{version}/ext-core.jsm',
        'type': 'application/javascript'
    },
    // fancyBox [Deprecated?]
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
    // flv.js [Deprecated]
    'flvJS': {
        'path': 'resources/flv.js/{version}/flv.min.jsm',
        'type': 'application/javascript'
    },
    // Font Awesome
    'fontawesome': {
        'path': 'resources/fontawesome/{version}/css/font-awesome.min.css',
        'type': 'text/css'
    },
    'fontawesome5CSS': {
        'path': 'resources/fontawesome/{version}/css/all.min.css',
        'type': 'text/css'
    },
    'fontawesome5CSSv4shims': {
        'path': 'resources/fontawesome/{version}/css/v4-shims.css',
        'type': 'text/css'
    },
    'fontawesome5JS': {
        'path': 'resources/fontawesome/{version}/js/all.min.jsm',
        'type': 'application/javascript'
    },
    'fontawesomeFontsOnly': {
        'path': 'resources/fontawesome/{version}/fonts/'
    },
    // GSAP
    'gsapBundle': {
        'path': 'resources/gsap/{version}/',
        'type': 'application/javascript'
    },
    // Google Charts
    'googleCharts': {
        'path': 'resources/google-charts/loader.jsm',
        'type': 'application/javascript'
    },
    // Google Material Icons
    'googleMaterialIcons': {
        'path': 'resources/google-material-design-icons/google-material-design-icons.css',
        'type': 'text/css'
    },
    // highlight.js (Bundle)
    'highlightJS': {
        'path': 'resources/highlight.js/{version}/',
        'type': 'application/javascript'
    },
    // history
    'history': {
        'path': 'resources/history/{version}/history.min.jsm',
        'type': 'application/javascript'
    },
    // hls.js
    'hlsJS': {
        'path': 'resources/hls.js/{version}/hls.min.jsm',
        'type': 'application/javascript'
    },
    // InstantSearch.js
    'InstantSearchJS': {
        'path': 'resources/instantsearch.js/{version}/instantsearch.production.min.jsm',
        'type': 'application/javascript'
    },
    // iScroll [Deprecated]
    'iScroll': {
        'path': 'resources/iScroll/{version}/iscroll.min.jsm',
        'type': 'application/javascript'
    },
    // jeditableJS
    'jeditableJS': {
        'path': 'resources/jquery-jeditable/{version}/jquery.jeditable.min.jsm',
        'type': 'application/javascript'
    },
    // Jets.js [Deprecated]
    'jetsJS': {
        'path': 'resources/jets/{version}/jets.min.jsm',
        'type': 'application/javascript'
    },
    // jQuery Ajax AutoComplete
    'jQueryAjaxAutoComplete': {
        'path': 'resources/jquery.devbridge-autocomplete/{version}/jquery.autocomplete.min.jsm',
        'type': 'application/javascript'
    },
    // jQuery
    'jQuery': {
        'path': 'resources/jquery/{version}/jquery.min.jsm',
        'type': 'application/javascript'
    },
    // jQuery BlockUI [Deprecated]
    'jQueryBlockUI': {
        'path': 'resources/jquery.blockUI/{version}/jquery.blockUI.min.jsm',
        'type': 'application/javascript'
    },
    // jQuery-csv
    'jQueryCSV': {
        'path': 'resources/jquery-csv/{version}/jquery.csv.min.jsm',
        'type': 'application/javascript'
    },
    // jQuery Easing Plugin
    'jQueryEasing': {
        'path': 'resources/jquery-easing/{version}/jquery.easing.min.jsm',
        'type': 'application/javascript'
    },
    // jQuery Lazy Load [Deprecated]
    'jQueryLazyLoad': {
        'path': 'resources/jquery.lazyload/{version}/jquery.lazyload.min.jsm',
        'type': 'application/javascript'
    },
    // jQuery Lazy (Bundle)
    'jQueryLazyBundle': {
        'path': 'resources/jquery.lazy/{version}/',
        'type': 'application/javascript'
    },
    // jquery.matchHeight.js [Deprecated]
    'jqueryMatchHeightJS': {
        'path': 'resources/jquery.matchHeight/{version}/jquery.matchHeight-min.jsm',
        'type': 'application/javascript'
    },
    // jQuery Migrate
    'jQueryMigrate': {
        'path': 'resources/jquery-migrate/{version}/jquery-migrate.min.jsm',
        'type': 'application/javascript'
    },
    // jQuery Modal [Deprecated]
    'jQueryModalJS': {
        'path': 'resources/jquery-modal/{version}/jquery.modal.min.jsm',
        'type': 'application/javascript'
    },
    'jQueryModalCSS': {
        'path': 'resources/jquery-modal/{version}/jquery.modal.min.css',
        'type': 'text/css'
    },
    // jqueryMousewheelJS [Deprecated?]
    'jqueryMousewheelJS': {
        'path': 'resources/jquery-mousewheel/{version}/jquery.mousewheel.min.jsm',
        'type': 'application/javascript'
    },
    // jQuery Tablesorter
    'jQueryTablesorter': {
        'path': 'resources/jquery-tablesorter/{version}/jquery.tablesorter.min.jsm',
        'type': 'application/javascript'
    },
    // jQuery Tooltipster
    'jQueryTooltipster': {
        'path': 'resources/tooltipster/{version}/js/jquery.tooltipster.min.jsm',
        'type': 'application/javascript'
    },
    // jQuery UI
    'jQueryUI': {
        'path': 'resources/jqueryui/{version}/jquery-ui.min.jsm',
        'type': 'application/javascript'
    },
    'jQueryUiThemes': {
        'path': 'resources/jqueryui/{version}/themes/base/minified/jquery-ui.min.css',
        'type': 'text/css'
    },
    // jScrollPane
    'jScrollPane': {
        'path': 'resources/jScrollPane/{version}/jquery.jscrollpane.min.jsm',
        'type': 'application/javascript'
    },
    // jQuery URLive [Deprecated]
    'jqueryURLive': {
        'path': 'resources/urlive/{version}/jquery.urlive.min.jsm',
        'type': 'application/javascript'
    },
    // jQuery Validation Plugin
    'jqueryValidationPlugin': {
        'path': 'resources/jquery-validate/{version}/jquery.validate.min.jsm',
        'type': 'application/javascript'
    },
    // jQuery Mobile [Deprecated]
    'jQueryMobile': {
        'path': 'resources/jquery-mobile/{version}/jquery.mobile.min.jsm',
        'type': 'application/javascript'
    },
    // js-cookie [Deprecated]
    'jscookie': {
        'path': 'resources/js-cookie/{version}/js.cookie.min.jsm',
        'type': 'application/javascript'
    },
    // lazysizes
    'lazysizes': {
        'path': 'resources/lazysizes/{version}/lazysizes.min.jsm',
        'type': 'application/javascript'
    },
    // libphonenumber-js
    'libphonenumber': {
        'path': 'resources/libphonenumber-js/{version}/libphonenumber-js.min.jsm',
        'type': 'application/javascript'
    },
    // libsodium.js
    'libsodiumJS': {
        'path': 'resources/libsodium.js/{version}/sodium.min.jsm',
        'type': 'application/javascript'
    },
    // lightGallery
    'lightGalleryJS': {
        'path': 'resources/lightgallery/{version}/js/lightgallery-all.min.jsm',
        'type': 'application/javascript'
    },
    'lightGalleryCSS': {
        'path': 'resources/lightgallery/{version}/css/lightgallery.min.css',
        'type': 'text/css'
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
    // magnific-popup.js [Deprecated]
    'magnificPopupJS': {
        'path': 'resources/magnific-popup.js/{version}/jquery.magnific-popup.min.jsm',
        'type': 'application/javascript'
    },
    'magnificPopupCSS': {
        'path': 'resources/magnific-popup.js/{version}/magnific-popup.min.css',
        'type': 'text/css'
    },
    // markdown-it
    'markdownIt': {
        'path': 'resources/markdown-it/{version}/markdown-it.min.jsm',
        'type': 'application/javascript'
    },
    // MaterialDesign (https://github.com/Templarian/MaterialDesign)
    'materialDesign': {
        'path': 'resources/material-design-icons/{version}/css/materialdesignicons.min.css',
        'type': 'text/css'
    },
    // Materialize [Deprecated?]
    'materializeCSS': {
        'path': 'resources/materialize/{version}/css/materialize.min.css',
        'type': 'text/css'
    },
    'materializeJS': {
        'path': 'resources/materialize/{version}/js/materialize.min.jsm',
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
    // MDB UI Kit
    'mdbUiKitJS': {
        'path': 'resources/mdb-ui-kit/{version}/mdb-ui-kit.min.jsm',
        'type': 'application/javascript'
    },
    'mdbUiKitCSS': {
        'path': 'resources/mdb-ui-kit/{version}/mdb-ui-kit.min.css',
        'type': 'text/css'
    },
    // Cloudflare Mirage 2
    'mirage2': {
        'path': 'resources/mirage2/latest/mirage2.min.jsm',
        'type': 'application/javascript'
    },
    // Modaal [Deprecated]
    'modaalJS': {
        'path': 'resources/modaal/{version}/modaal.min.jsm',
        'type': 'application/javascript'
    },
    'modaalCSS': {
        'path': 'resources/modaal/{version}/modaal.min.css',
        'type': 'text/css'
    },
    // Modernizr
    'modernizr': {
        'path': 'resources/modernizr/{version}/modernizr.min.jsm',
        'type': 'application/javascript'
    },
    // Moment.js
    'moment': {
        'path': 'resources/moment.js/{version}/moment-with-locales.min.jsm',
        'type': 'application/javascript'
    },
    // MooTools [Deprecated]
    'mootools': {
        'path': 'resources/mootools/{version}/mootools-core.min.jsm',
        'type': 'application/javascript'
    },
    'mootoolsYui': {
        'path': 'resources/mootools/{version}/mootools-yui-compressed.jsm',
        'type': 'application/javascript'
    },
    // noUiSlider
    'noUiSlider': {
        'path': 'resources/noUiSlider/{version}/nouislider.min.jsm',
        'type': 'application/javascript'
    },
    // NVD3 [Deprecated]
    'nvd3JS': {
        'path': 'resources/nvd3/{version}/nv.d3.min.jsm',
        'type': 'application/javascript'
    },
    'nvd3CSS': {
        'path': 'resources/nvd3/{version}/nv.d3.min.css',
        'type': 'text/css'
    },
    // object-assign
    'objectAssign': {
        'path': 'resources/object-assign/{version}/object-assign.min.jsm',
        'type': 'application/javascript'
    },
    // ocLazyLoad [Deprecated]
    'ocLazyLoad': {
        'path': 'resources/oclazyload/{version}/ocLazyLoad.min.jsm',
        'type': 'application/javascript'
    },
    // OwlCarousel [Deprecated]
    'owlCarouselJS': {
        'path': 'resources/owl-carousel/{version}/owl.carousel.min.jsm',
        'type': 'application/javascript'
    },
    'owlCarouselCSStheme': {
        'path': 'resources/owl-carousel/{version}/owl.theme.min.css',
        'type': 'text/css'
    },
    'owlCarouselCSStransitions': {
        'path': 'resources/owl-carousel/{version}/owl.transitions.min.css',
        'type': 'text/css'
    },
    'owlCarouselCSScarousel': {
        'path': 'resources/owl-carousel/{version}/owl.carousel.min.css',
        'type': 'text/css'
    },
    // P2P Media Loader Core
    'p2pMediaLoaderCore': {
        'path': 'resources/p2p-media-loader-core/{version}/p2p-media-loader-core.min.jsm',
        'type': 'application/javascript'
    },
    // P2P Media Loader Hls.js
    'p2pMediaLoaderHlsJS': {
        'path': 'resources/p2p-media-loader-hlsjs/{version}/p2p-media-loader-hlsjs.min.jsm',
        'type': 'application/javascript'
    },
    // p5.js
    'p5JS': {
        'path': 'resources/p5js/{version}/p5.min.jsm',
        'type': 'application/javascript'
    },
    'p5JSsound': {
        'path': 'resources/p5js/{version}/p5.sound.min.jsm',
        'type': 'application/javascript'
    },
    // page.js [Deprecated?]
    'pageJs': {
        'path': 'resources/page.js/{version}/page.jsm',
        'type': 'application/javascript'
    },
    // Pagination.js [Deprecated]
    'paginationjsJS': {
        'path': 'resources/paginationjs/2.1.5/pagination.min.jsm',
        'type': 'application/javascript'
    },
    'paginationjsCSS': {
        'path': 'resources/paginationjs/2.1.5/pagination.min.css',
        'type': 'text/css'
    },
    // plyr CSS
    'plyrCSS': {
        'path': 'resources/plyr/{version}/plyr.min.css',
        'type': 'text/css'
    },
    'plyrJS': {
        'path': 'resources/plyr/{version}/plyr.min.jsm',
        'type': 'application/javascript'
    },
    'plyrSVG': {
        'path': 'resources/plyr/{version}/plyr.svg',
        'type': 'image/svg+xml'
    },
    // Popper
    'popperJS': {
        'path': 'resources/popper.js/{version}/umd/popper.min.jsm',
        'type': 'text/css'
    },
    // prop-types
    'propTypes': {
        'path': 'resources/prop-types/{version}/prop-types.min.jsm',
        'type': 'application/javascript'
    },
    // protonet-jquery.inview [Deprecated]
    'protonetJqueryInview': {
        'path': 'resources/protonet-jquery.inview/{version}/jquery.inview.min.jsm',
        'type': 'application/javascript'
    },
    // Prototype [Deprecated]
    'prototypeJS': {
        'path': 'resources/prototype/{version}/prototype.jsm',
        'type': 'application/javascript'
    },
    // Raven.js
    'ravenJS': {
        'path': 'resources/raven.js/{version}/raven.min.jsm',
        'type': 'application/javascript'
    },
    'ravenPluginAngularJS': {
        'path': 'resources/raven.js/{version}/plugins/angular.min.jsm',
        'type': 'application/javascript'
    },
    // React
    'react': {
        'path': 'resources/react/{version}/umd/react.production.min.jsm',
        'type': 'application/javascript'
    },
    // ReactDOM
    'reactDOM': {
        'path': 'resources/react-dom/{version}/umd/react-dom.production.min.jsm',
        'type': 'application/javascript'
    },
    // react-lifecycles-compat
    'reactLifecyclesCompat': {
        'path': 'resources/react-lifecycles-compat/{version}/react-lifecycles-compat.min.jsm',
        'type': 'application/javascript'
    },
    // React Redux
    'reactRedux': {
        'path': 'resources/react-redux/{version}/react-redux.min.jsm',
        'type': 'application/javascript'
    },
    // React Router
    'reactRouter': {
        'path': 'resources/react-router/{version}/react-router.min.jsm',
        'type': 'application/javascript'
    },
    // React Side Effect
    'reactSideEffect': {
        'path': 'resources/react-side-effect/{version}/react-side-effect.min.jsm',
        'type': 'application/javascript'
    },
    // Redux
    'redux': {
        'path': 'resources/redux/{version}/redux.min.jsm',
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
    // Scriptaculous [Deprecated]
    'scriptaculous': {
        'path': 'resources/scriptaculous/{version}/scriptaculous.jsm',
        'type': 'application/javascript'
    },
    // Select2 (Bundle)
    'select2': {
        'path': 'resources/select2/{version}/',
        'type': 'application/javascript'
    },
    // showdown [Deprecated?]
    'showdown': {
        'path': 'resources/showdown/{version}/showdown.min.jsm',
        'type': 'application/javascript'
    },
    // simplemde [Deprecated]
    'simplemdeJS': {
        'path': 'resources/simplemde/{version}/simplemde.min.jsm',
        'type': 'application/javascript'
    },
    'simplemdeCSS': {
        'path': 'resources/simplemde/{version}/simplemde.min.css',
        'type': 'text/css'
    },
    // slick-carousel/slick.js [Deprecated]
    'slickCarouselJS': {
        'path': 'resources/slick-carousel/{version}/slick.min.jsm',
        'type': 'application/javascript'
    },
    'slickCarouselCSS': {
        'path': 'resources/slick-carousel/{version}/slick.min.css',
        'type': 'text/css'
    },
    'slickCarouselTheme': {
        'path': 'resources/slick-carousel/{version}/slick-theme.min.css',
        'type': 'text/css'
    },
    // slick-lightbox [Deprecated]
    'slickLightboxJS': {
        'path': 'resources/slick-lightbox/{version}/slick-lightbox.min.jsm',
        'type': 'application/javascript'
    },
    'slickLightboxCSS': {
        'path': 'resources/slick-lightbox/{version}/slick-lightbox.css',
        'type': 'text/css'
    },
    // socket.io
    'socketIO': {
        'path': 'resources/socket.io/{version}/socket.io.min.jsm',
        'type': 'application/javascript'
    },
    // spin.js
    'spinJS': {
        'path': 'resources/spin.js/{version}/spin.min.jsm',
        'type': 'application/javascript'
    },
    // stickyfill [Deprecated]
    'stickyfill': {
        'path': 'resources/stickyfill/{version}/stickyfill.min.jsm',
        'type': 'application/javascript'
    },
    // Store.js [Deprecated]
    'storeJS': {
        'path': 'resources/store.js/{version}/store.legacy.min.jsm',
        'type': 'application/javascript'
    },
    // SWFObject [Deprecated]
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
    // Tether JS [Deprecated]
    'tetherJS': {
        'path': 'resources/tether/{version}/js/tether.min.jsm',
        'type': 'application/javascript'
    },
    // toastr [Deprecated]
    'toastrCSS': {
        'path': 'resources/toastr.js/{version}/toastr.min.css',
        'type': 'text/css'
    },
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
    // vanilla-lazyload
    'vanillaLazyload': {
        'path': 'resources/vanilla-lazyload/{version}/lazyload.min.jsm',
        'type': 'application/javascript'
    },
    // videojs-seek-buttons
    'videojsSeekButtonsJS': {
        'path': 'resources/videojs-seek-buttons/{version}/videojs-seek-buttons.min.jsm',
        'type': 'application/javascript'
    },
    'videojsSeekButtonsCSS': {
        'path': 'resources/videojs-seek-buttons/{version}/videojs-seek-buttons.min.css',
        'type': 'text/css'
    },
    // video.js
    'videoJS': {
        'path': 'resources/video.js/{version}/video.min.jsm',
        'type': 'application/javascript'
    },
    'videoJScss': {
        'path': 'resources/video.js/{version}/video-js.min.css',
        'type': 'text/css'
    },
    // Vue.js
    'vueJs': {
        'path': 'resources/vue/{version}/vue.min.jsm',
        'type': 'application/javascript'
    },
    // Vue.js i18n
    'vueI18N': {
        'path': 'resources/vue-i18n/{version}/vue-i18n.min.jsm',
        'type': 'application/javascript'
    },
    // vue-resource
    'vueResource': {
        'path': 'resources/vue-resource/{version}/vue-resource.min.jsm',
        'type': 'application/javascript'
    },
    // Waypoints (bundle) [Deprecated]
    'jQueryWaypoints': {
        'path': 'resources/waypoints/{version}/',
        'type': 'application/javascript'
    },
    // WebComponents.js [Deprecated]
    'webcomponentsJS': {
        'path': 'resources/webcomponentsjs/{version}/webcomponents-loader.jsm',
        'type': 'application/javascript'
    },
    // Web Font Loader
    'webfontloader': {
        'path': 'resources/webfont/{version}/webfontloader.jsm',
        'type': 'application/javascript'
    },
    'webfontloaderFontawesomeJS': {
        'path': 'resources/webfont/fa-loader.jsm',
        'type': 'application/javascript'
    },
    'webfontloaderFontawesomeCSS': {
        'path': 'resources/webfont/fa-loader.css',
        'type': 'text/css'
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
    },
    // algoliasearch@3(algoliasearchLite.min.js),algoliasearch.helper@2
    'algoliasearchSearchlightHelper': {
        'path': 'resources/algoliasearch3.33.0_algoliasearchLite_algoliasearchHelper.jsm',
        'type': 'application/javascript'
    },
    // jsdelivr-combine-jquery-hogan-algoliasearch-autocomplete.jsm (in shorthands.js)
    'jsdelivrCombineJqueryHoganAlgoliasearchAutocomplete': {
        'path': 'resources/jsdelivr-combine-jquery-hogan-algoliasearch-autocomplete.jsm',
        'type': 'application/javascript'
    }
};
