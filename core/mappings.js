/**
 * Mappings
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
 * Mappings
 */

var mappings = {};

/*
 * Date of last update.
 * This only needs to be updated when new domains are added.
 * It's not necessary for subdirectories!
 */
mappings.lastMappingUpdate = '2020-10-26';

mappings.cdn = {

    // Google Hosted Libraries
    'ajax.googleapis.com': {
        '/ajax/libs/': {
            'angularjs/{version}/angular-animate.': resources.angularAnimate,
            'angularjs/{version}/angular-aria.': resources.angularAria,
            'angularjs/{version}/angular-cookies.': resources.angularCookies,
            'angularjs/{version}/angular-loader.': resources.angularLoader,
            'angularjs/{version}/angular-message-format.': resources.angularMessageFormat,
            'angularjs/{version}/angular-messages.': resources.angularMessages,
            'angularjs/{version}/angular-parse-ext.': resources.angularParseExt,
            'angularjs/{version}/angular-resource.': resources.angularResource,
            'angularjs/{version}/angular-route.': resources.angularRoute,
            'angularjs/{version}/angular-sanitize.': resources.angularSanitize,
            'angularjs/{version}/angular-touch.': resources.angularTouch,
            'angularjs/{version}/angular.': resources.angular,
            'angular_material/{version}/angular-material.min.js': resources.angularMaterialDesignJS,
            'angular_material/{version}/angular-material.min.css': resources.angularMaterialDesignCSS,
            'dojo/{version}/dojo/dojo.': resources.dojo,
            'ext-core/{version}/ext-core.': resources.extCore,
            'ext-core/{version}/ext-core-debug.': resources.extCore,
            'jquery/{version}/jquery.': resources.jQuery,
            'jqueryui/{version}/jquery-ui.js': resources.jQueryUI,
            'jqueryui/{version}/jquery-ui.min.js': resources.jQueryUI,
            'jqueryui/{version}/themes/base/minified/jquery-ui.min.css': resources.jQueryUiThemes,
            'mootools/{version}/mootools-core': resources.mootools,
            'mootools/{version}/mootools-yui-compressed.': resources.mootoolsYui,
            'prototype/{version}/prototype.': resources.prototypeJS,
            'scriptaculous/{version}/scriptaculous.': resources.scriptaculous,
            'swfobject/{version}/swfobject.': resources.swfobject,
            'webfont/{version}/webfont.': resources.webfontloader,
            'webfont/{version}/webfontloader.js': resources.webfontloader,
            'webfont/1/webfont.js': resources.webfontloader
        }
    },
    // Microsoft Ajax CDN
    'ajax.aspnetcdn.com': {
        '/ajax/': {
            'jQuery/jquery-{version}.': resources.jQuery,
            'jquery/jquery-{version}.': resources.jQuery,
            'modernizr/modernizr-{version}.': resources.modernizr,
            'bootstrap/{version}/bootstrap.min.': resources.bootstrapJS
        }
    },
    // Microsoft Ajax CDN [Deprecated]
    'ajax.microsoft.com': {
        '/ajax/': {
            'jQuery/jquery-{version}.': resources.jQuery,
            'jquery/jquery-{version}.': resources.jQuery,
            'modernizr/modernizr-{version}.': resources.modernizr
        }
    },
    // CDNJS (Cloudflare)
    'cdnjs.cloudflare.com': {
        '/ajax/libs/': {
            'algoliasearch/{version}/algoliasearch.angular.': resources.algoliaSearch,
            'algoliasearch/{version}/algoliasearch.': resources.algoliaSearch,
            'anchor-js/{version}/anchor.': resources.anchorJS,
            'angucomplete-alt/{version}/angucomplete-alt.': resources.anguComplete,
            'angular-bootstrap-colorpicker/{version}/css/colorpicker.': resources.angularBootstrapColorpickerCSS,
            'angular-bootstrap-colorpicker/{version}/js/bootstrap-colorpicker-module.': resources.angularBootstrapColorpickerJS,
            'angular-ui-bootstrap/{version}/ui-bootstrap-tpls.': resources.angularUiBootstrapTPLS,
            'angular-ui-bootstrap/{version}/ui-bootstrap.min.js': resources.angularUiBootstrap,
            'angular-ui-router/{version}/angular-ui-router.': resources.angularUiRouter,
            'angular-ui-select/{version}/select.': resources.angularJsUiSelect,
            'angular-ui-utils/{version}/angular-ui-utils.': resources.angularUiUtils,
            'angularjs-slider/{version}/rzslider.': resources.angularJSslider,
            'angular-animate/{version}/angular-animate.min.': resources.angularAnimate,
            'angular.js/{version}/angular-animate.': resources.angularAnimate,
            'angular.js/{version}/angular-aria.': resources.angularAria,
            'angular.js/{version}/angular-cookies.': resources.angularCookies,
            'angular.js/{version}/angular-loader.': resources.angularLoader,
            'angular.js/{version}/angular-message-format.': resources.angularMessageFormat,
            'angular.js/{version}/angular-messages.': resources.angularMessages,
            'angular.js/{version}/angular-parse-ext.': resources.angularParseExt,
            'angular.js/{version}/angular-resource.': resources.angularResource,
            'angular.js/{version}/angular-route.': resources.angularRoute,
            'angular.js/{version}/angular-sanitize.': resources.angularSanitize,
            'angular.js/{version}/angular-touch.': resources.angularTouch,
            'angular.js/{version}/angular.': resources.angular,
            'angular-material/{version}/angular-material.min.css': resources.angularMaterialDesignCSS,
            'angular-material/{version}/angular-material.css': resources.angularMaterialDesignCSS,
            'angular-material/{version}/angular-material.min.js': resources.angularMaterialDesignJS,
            'angular-material/{version}/angular-material.js': resources.angularMaterialDesignJS,
            'angular-translate/{version}/angular-translate.min.js': resources.angularTranslate,
            'angular-translate/{version}/angular-translate.js': resources.angularTranslate,
            'angular-translate-loader-static-files/{version}/angular-translate-loader-static-files.min.js': resources.angularTranslateLoaderStaticFiles,
            'angular-translate-loader-static-files/{version}/angular-translate-loader-static-files.js': resources.angularTranslateLoaderStaticFiles,
            'angular-translate-interpolation-messageformat/{version}/angular-translate-interpolation-messageformat.min.js': resources.angularTranslateInterpolationMessageformat,
            'angular-translate-interpolation-messageformat/{version}/angular-translate-interpolation-messageformat.js': resources.angularTranslateInterpolationMessageformat,
            'angularjs-toaster/{version}/toaster.min.css': resources.angularJsToasterCSS,
            'angularjs-toaster/{version}/toaster.min.js': resources.angularJsToasterJS,
            'angularjs-toaster/{version}/toaster.css': resources.angularJsToasterCSS,
            'angularjs-toaster/{version}/toaster.js': resources.angularJsToasterJS,
            'angular-sanitize/{version}/angular-sanitize.': resources.angularSanitize,
            'animate.css/{version}/animate.': resources.animateCSS,
            'backbone.js/{version}/backbone.': resources.backbone,
            'backbone.js/{version}/backbone-min.': resources.backbone,
            'baguettebox.js/{version}/baguetteBox.js': resources.baguetteBoxJS,
            'baguettebox.js/{version}/baguetteBox.min.js': resources.baguetteBoxJS,
            'baguettebox.js/{version}/baguetteBox.css': resources.baguetteBoxCSS,
            'baguettebox.js/{version}/baguetteBox.min.css': resources.baguetteBoxCSS,
            'bootbox.js/{version}/bootbox.': resources.bootbox,
            'bootstrap-daterangepicker/{version}/daterangepicker.': resources.bootstrapDaterangepicker,
            'bootstrap-datepicker/{version}/js/bootstrap-datepicker.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/css/bootstrap-datepicker.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/css/bootstrap-datepicker3.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.ar.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.ar-tn.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.az.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.bg.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.bm.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.bn.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.br.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.bs.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.ca.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.cs.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.cy.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.da.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.de.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.el.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.en-AU.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker-en-CA.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.en-CA.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.en-GB.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.en-IE.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.en-NZ.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.en-ZA.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.eo.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.es.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.et.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.eu.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.fa.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.fi.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.fo.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.fr-CH.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.fr.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.gl.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.he.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.hi.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.hr.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.hu.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.hy.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.id.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.is.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.it-CH.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.it.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.ja.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.ka.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.kh.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.kk.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.km.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.ko.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.kr.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.lt.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.lv.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.me.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.mk.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.mn.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.ms.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.nl-BE.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.nl.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.no.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.oc.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.pl.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.pt-BR.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.pt.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.ro.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.rs-latin.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.rs.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.ru.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.si.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.sk.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.sl.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.sq.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.sr-latin.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.sr.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.sv.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.sw.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.ta.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.tg.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.th.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.tk.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.tr.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.uk.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.uz-cyrl.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.uz-latn.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.vi.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.zh-CN.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/locales/bootstrap-datepicker.zh-TW.': resources.bootstrapDatepickerBundle,
            'bootstrap-datepicker/{version}/css/datepicker.': resources.bootstrapDatepickerBundle,
            'bootstrap-select/{version}/css/bootstrap-select.': resources.bootstrapSelectCSS,
            'bootstrap-select/{version}/js/bootstrap-select.': resources.bootstrapSelectJS,
            'bootstrap-slider/{version}/css/bootstrap-slider.min.css': resources.bootstrapSliderCSS,
            'bootstrap-slider/{version}/css/bootstrap-slider.css': resources.bootstrapSliderCSS,
            'bootstrap-slider/{version}/bootstrap-slider.min.js': resources.bootstrapSliderJS,
            'bootstrap-toggle/{version}/js/bootstrap-toggle.': resources.bootstrapToggleJS,
            'bootstrap-toggle/{version}/js/bootstrap2-toggle.': resources.bootstrap2ToggleJS,
            'bootstrap-toggle/{version}/css/bootstrap-toggle.': resources.bootstrapToggleCSS,
            'bootstrap-toggle/{version}/css/bootstrap2-toggle.': resources.bootstrap2ToggleCSS,
            'bootstrap-3-typeahead/{version}/bootstrap3-typeahead.': resources.bootstrap3Typeahead,
            'Chart.js/{version}/Chart.bundle.': resources.chartJs,
            'Chart.js/{version}/Chart.min.js': resources.chartJs,
            'Chart.js/{version}/Chart.js': resources.chartJs,
            'Chart.js/{version}/Chart.css': resources.chartJsCSS,
            'Chart.js/{version}/Chart.min.css': resources.chartJsCSS,
            'clipboard.js/{version}/clipboard.min.js': resources.clipboardJS,
            'cookieconsent2/{version}/cookieconsent.min.js': resources.cookieconsent2JS,
            'cookieconsent2/{version}/cookieconsent.js': resources.cookieconsent2JS,
            'cookieconsent2/{version}/cookieconsent.min.css': resources.cookieconsent2CSS,
            'cookieconsent2/{version}/cookieconsent.css': resources.cookieconsent2CSS,
            'd3/{version}/d3.min.js': resources.d3JS,
            'd3-legend/{version}/d3-legend.': resources.d3legend,
            'dojo/{version}/dojo.': resources.dojo,
            'element-ui/{version}/': resources.elementUI,
            'ember.js/{version}/ember.': resources.ember,
            'ext-core/{version}/ext-core.': resources.extCore,
            'fancybox/{version}/jquery.fancybox.min.js': resources.fancyBoxJS,
            'fancybox/{version}/jquery.fancybox.js': resources.fancyBoxJS,
            'fancybox/{version}/helpers/jquery.fancybox-media.js': resources.fancyBoxMediaJS,
            'fancybox/{version}/jquery.fancybox.min.css': resources.fancyBoxCSS,
            'fancybox/{version}/jquery.fancybox.css': resources.fancyBoxCSS,
            'font-awesome/{version}/css/font-awesome': resources.fontawesome,
            'font-awesome/{version}/css/': resources.fontawesome5CSS,
            'font-awesome/{version}/js/': resources.fontawesome5JS,
            'highlight.js/{version}/': resources.highlightJS,
            'instantsearch.js/{version}/instantsearch.production.': resources.InstantSearchJS,
            'jeditable.js/{version}/jquery.jeditable.min.js': resources.jeditableJS,
            'jeditable.js/{version}/jeditable.min.js': resources.jeditableJS,
            'jets/{version}/jets.': resources.jetsJS,
            'jquery/{version}/jquery.': resources.jQuery,
            'jquery/{version}/jquery.min.': resources.jQuery,
            'jquery.devbridge-autocomplete/{version}/jquery.autocomplete.min.js': resources.jQueryAjaxAutoComplete,
            'jquery.blockUI/{version}/jquery.blockUI.min.js': resources.jQueryBlockUI,
            'jquery-csv/{version}/jquery.csv.min.js': resources.jQueryCSV,
            'jquery-easing/{version}/jquery.easing.': resources.jQueryEasing,
            'jquery.lazyload/{version}/jquery.lazyload.min.js': resources.jQueryLazyLoad,
            'jquery.lazy/{version}/': resources.jQueryLazyBundle,
            'jquery-migrate/{version}/jquery-migrate.min.js': resources.jQueryMigrate,
            'jqueryui/{version}/jquery-ui.js': resources.jQueryUI,
            'jqueryui/{version}/jquery-ui.min.js': resources.jQueryUI,
            'jquery-validate/{version}/jquery.validate.min.js': resources.jqueryValidationPlugin,
            'jquery.tablesorter/{version}/js/jquery.tablesorter.': resources.jQueryTablesorter,
            'jquery-modal/{version}/jquery.modal.js': resources.jQueryModalJS,
            'jquery-modal/{version}/jquery.modal.min.js': resources.jQueryModalJS,
            'jquery-modal/{version}/jquery.modal.css': resources.jQueryModalCSS,
            'jquery-modal/{version}/jquery.modal.min.css': resources.jQueryModalCSS,
            'jquery-mousewheel/{version}/jquery.mousewheel.min.js': resources.jqueryMousewheelJS,
            'jScrollPane/{version}/script/jquery.jscrollpane.': resources.jScrollPane,
            'js-cookie/{version}/js.cookie.min.js': resources.jscookie,
            'lazysizes/{version}/lazysizes.min.js': resources.lazysizes,
            'libphonenumber-js/{version}/libphonenumber-js.': resources.libphonenumber,
            'lodash.js/{version}/lodash.': resources.lodashJS,
            'markdown-it/{version}/markdown-it.': resources.markdownIt,
            'materialize/{version}/css/materialize.': resources.materializeCSS,
            'materialize/{version}/js/materialize.': resources.materializeJS,
            'mdbootstrap/{version}/js/mdb.': resources.mdbootstrapJS,
            'mdbootstrap/{version}/css/mdb.': resources.mdbootstrapCSS,
            'modernizr/{version}/modernizr.': resources.modernizr,
            'moment.js/{version}/moment.': resources.moment,
            'moment.js/{version}/moment.min.': resources.moment,
            'mootools/{version}/mootools-core': resources.mootools,
            'nvd3/{version}/nv.d3.min.js': resources.nvd3JS,
            'nvd3/{version}/nv.d3.js': resources.nvd3JS,
            'nvd3/{version}/nv.d3.min.css': resources.nvd3CSS,
            'nvd3/{version}/nv.d3.css': resources.nvd3CSS,
            'oclazyload/{version}/ocLazyLoad.': resources.ocLazyLoad,
            'OwlCarousel2/{version}/owl.carousel.': resources.owlCarouselJS,
            'owl-carousel/{version}/owl.carousel.js': resources.owlCarouselJS,
            'owl-carousel/{version}/owl.carousel.min.js': resources.owlCarouselJS,
            'owl-carousel/{version}/owl.carousel.css': resources.owlCarouselCSScarousel,
            'owl-carousel/{version}/owl.carousel.min.css': resources.owlCarouselCSScarousel,
            'owl-carousel/{version}/owl.theme.': resources.owlCarouselCSStheme,
            'owl-carousel/{version}/owl.transitions.': resources.owlCarouselCSStransitions,
            'page.js/{version}/page.min.': resources.pageJs,
            'plyr/{version}/plyr.css': resources.plyrCSS,
            'popper.js/{version}/umd/popper.min.js': resources.popperJS,
            'raven.js/{version}/raven.min.js': resources.ravenJS,
            'raven.js/{version}/plugins/angular.min.js': resources.ravenPluginAngularJS,
            'react/{version}/umd/react.production.min.js': resources.react,
            'react-dom/{version}/umd/react-dom.production.min.js': resources.reactDOM,
            'rickshaw/{version}/rickshaw.min.css': resources.rickshawCSS,
            'rickshaw/{version}/rickshaw.min.js': resources.rickshawJS,
            'scriptaculous/{version}/scriptaculous.': resources.scriptaculous,
            'select2/{version}/': resources.select2,
            'showdown/{version}/showdown.': resources.showdown,
            'showdown/{version}/Showdown.': resources.showdown,
            'slick-carousel/{version}/slick.min.css': resources.slickCarouselCSS,
            'slick-carousel/{version}/slick.css': resources.slickCarouselCSS,
            'slick-carousel/{version}/slick.min.js': resources.slickCarouselJS,
            'slick-carousel/{version}/slick.js': resources.slickCarouselJS,
            'slick-lightbox/{version}/slick-lightbox.min.js': resources.slickLightboxJS,
            'slick-lightbox/{version}/slick-lightbox.js': resources.slickLightboxJS,
            'slick-lightbox/{version}/slick-lightbox.css': resources.slickLightboxCSS,
            'spin.js/{version}/spin.min.js': resources.spinJS,
            'stickyfill/{version}/stickyfill.': resources.stickyfill,
            'socket.io/{version}/socket.io.': resources.socketIO,
            'swfobject/{version}/swfobject.': resources.swfobject,
            'Swiper/{version}/css/swiper.': resources.swiperCSS,
            'Swiper/{version}/js/swiper.': resources.swiperJS,
            'tether/{version}/js/tether.': resources.tetherJS,
            'tooltipster/{version}/js/jquery.tooltipster.': resources.jQueryTooltipster,
            'toastr.js/{version}/toastr.min.css': resources.toastrCSS,
            'toastr.js/{version}/toastr.min.js': resources.toastrJS,
            'twitter-bootstrap/{version}/js/bootstrap.min.js': resources.bootstrapJS,
            'twitter-bootstrap/{version}-alpha.3/js/bootstrap.min.js': resources.bootstrapJS,
            'twitter-bootstrap/{version}-alpha.3/css/bootstrap.min.css': resources.bootstrapCSS,
            'twitter-bootstrap/{version}/css/bootstrap': resources.bootstrapCSS,
            'twitter-bootstrap/{version}/bootstrap.min.js': resources.bootstrapJS,
            'twitter-bootstrap/{version}/bootstrap.js': resources.bootstrapJS,
            'twitter-bootstrap/{version}/bootstrap.min.css': resources.bootstrapCSS,
            'twitter-bootstrap/{version}/bootstrap.css': resources.bootstrapCSS,
            'underscore.js/{version}/underscore.': resources.underscore,
            'underscore.js/{version}/underscore-min.': resources.underscore,
            'urlive/{version}/jquery.urlive.': resources.jqueryURLive,
            'vue/{version}/vue.min.js': resources.vueJs,
            'vue-i18n/{version}/vue-i18n.': resources.vueI18N,
            'vue-resource/{version}/vue-resource.': resources.vueResource,
            'waypoints/{version}/noframework.waypoints.': resources.jQueryWaypoints,
            'waypoints/{version}/jquery.waypoints.': resources.jQueryWaypoints,
            'waypoints/{version}/waypoints.debug.': resources.jQueryWaypoints,
            'waypoints/{version}/zepto.waypoints.': resources.jQueryWaypoints,
            'waypoints/{version}/shortcuts/infinite.': resources.jQueryWaypoints,
            'waypoints/{version}/shortcuts/inview.': resources.jQueryWaypoints,
            'waypoints/{version}/shortcuts/sticky.': resources.jQueryWaypoints,
            'webfont/{version}/webfont.js': resources.webfontloader,
            'webfont/{version}/webfontloader.js': resources.webfontloader,
            'webrtc-adapter/{version}/adapter.min.js': resources.webRTCadapter,
            'wow/{version}/wow.min.': resources.wow
        }
    },
    // jQuery CDN (MaxCDN)
    'code.jquery.com': {
        '/': {
            'jquery-{version}.': resources.jQuery,
            'jquery-latest.': resources.jQuery,
            'ui/{version}/jquery-ui.': resources.jQueryUI,
            'mobile/{version}/jquery.mobile': resources.jQueryMobile
        }
    },
    // jsDelivr (Cloudflare)
    'cdn.jsdelivr.net': {
        '/npm/': {
            'anchor-js@{version}/anchor.': resources.anchorJS,
            'algoliasearch@{version}/dist/algoliasearch.': resources.algoliaSearch,
            'angular@{version}/angular.': resources.angular,
            'angular@{version}/angular.min.': resources.angular,
            'angular-payments@{version}/lib/angular-payments.js': resources.angularPayments,
            'angular-stripe-checkout@{version}/angular-stripe-checkout.js': resources.angularStripeCheckout,
            'animate.css@{version}/animate.min.css': resources.animateCSS,
            'autocomplete.js@{version}/dist/autocomplete.': resources.autocompleteJS,
            'axios@{version}/dist/axios.': resources.axios,
            'backbone@{version}/backbone.': resources.backbone,
            'backbone@{version}/backbone-min.': resources.backbone,
            'backbone@{version}/backbone.min.': resources.backbone,
            'bootstrap@{version}/dist/js/bootstrap.': resources.bootstrapJS,
            'bootstrap@{version}/dist/css/bootstrap.': resources.bootstrapCSS,
            'clipboard@{version}/dist/clipboard.': resources.clipboardJS,
            'dojo@{version}/dojo.': resources.dojo,
            'ember-source@{version}/dist/ember.': resources.ember,
            'ember-source@{version}/dist/ember.min.': resources.ember,
            'ember-source@{version}/dist/legacy/ember.': resources.ember,
            'ember-source@{version}/dist/legacy/ember.min.': resources.ember,
            'ethjs@{version}/dist/ethjs.': resources.ethJs,
            '@findify/bundle@{version}/dist/bundle.js': resources.findifyBundle,
            '@findify/bundle@{version}/dist/components.js': resources.findifyBundle,
            '@findify/bundle@{version}/dist/config.js': resources.findifyBundle,
            '@findify/bundle@{version}/dist/initializer.js': resources.findifyBundle,
            '@findify/bundle@{version}/dist/polyfill.js': resources.findifyBundle,
            '@findify/bundle@{version}/dist/vendors~components~initializer.js': resources.findifyBundle,
            '@findify/bundle@{version}/dist/vendors~initializer.js': resources.findifyBundle,
            '@findify/bundle@{version}/dist/vendors~sentry.js': resources.findifyBundle,
            'flv.js/dist/flv.min.js': resources.flvJS,
            'font-awesome@{version}/css/font-awesome.': resources.fontawesome,
            'hls.js/dist/hls.min.js': resources.hlsJS,
            'history@{version}/umd/history.min.js': resources.history,
            'hls.js@latest': resources.hlsJS,
            'instantsearch.js@{version}/dist/instantsearch.production.': resources.InstantSearchJS,
            'jquery@{version}/dist/jquery.': resources.jQuery,
            'jquery@{version}/dist/jquery.min.': resources.jQuery,
            'jquery-ui@{version}/jquery-ui.js': resources.jQueryUI,
            'jquery-ui@{version}/jquery-ui.min.js': resources.jQueryUI,
            'jquery-ui-dist@{version}/jquery-ui.js': resources.jQueryUI,
            'jquery-ui-dist@{version}/jquery-ui.min.js': resources.jQueryUI,
            'lodash@{version}/lodash.min.js': resources.lodashJS,
            'lozad': resources.lozad,
            'npm-modernizr@{version}/modernizr.': resources.modernizr,
            'npm-modernizr@{version}/modernizr.min.': resources.modernizr,
            'markdown-it@{version}/dist/markdown-it.': resources.markdownIt,
            'moment@{version}/moment.': resources.moment,
            'moment@{version}/moment.min.': resources.moment,
            'mootools@{version}/lib/mootools-core-{version}-server.': resources.mootools,
            'mootools@{version}/lib/mootools-core-{version}-server.min.': resources.mootools,
            'react-redux@{version}/dist/react-redux.': resources.reactRedux,
            'react-router@{version}/umd/react-router.': resources.reactRouter,
            'react-side-effect@{version}/lib/index.umd.': resources.reactSideEffect,
            'react-lifecycles-compat@{version}/react-lifecycles-compat.': resources.reactLifecyclesCompat,
            'p2p-media-loader-core@latest/build/p2p-media-loader-core.min.js': resources.p2pMediaLoaderCore,
            'p2p-media-loader-hlsjs@latest/build/p2p-media-loader-hlsjs.min.js': resources.p2pMediaLoaderHlsJS,
            'popper.js@{version}/dist/umd/popper.': resources.popperJS,
            'prop-types@{version}/prop-types.': resources.propTypes,
            'redux@{version}/dist/redux.': resources.redux,
            'react-dom@{version}/umd/react-dom.production.min.js': resources.reactDOM,
            'react@{version}/umd/react.production.min.js': resources.react,
            'select2@{version}/': resources.select2,
            'swfobject@{version}/index.js': resources.swfobject,
            'store-js@{version}/dist/store.legacy.min.js': resources.storeJS,
            'scriptaculous-js@{version}/scriptaculous.': resources.scriptaculous,
            'slick-carousel@{version}/slick/slick.min.css': resources.slickCarouselCSS,
            'slick-carousel@{version}/slick/slick.css': resources.slickCarouselCSS,
            'slick-carousel@{version}/slick/slick.min.js': resources.slickCarouselJS,
            'slick-carousel@{version}/slick/slick.js': resources.slickCarouselJS,
            'underscore@{version}/underscore.': resources.underscore,
            'underscore@{version}/underscore-min.': resources.underscore,
            'urlize.js/urlize.js': resources.urlize,
            'vanilla-lazyload@{version}/dist/lazyload.': resources.vanillaLazyload,
            'videojs-seek-buttons/dist/videojs-seek-buttons.css': resources.videojsSeekButtonsCSS,
            'videojs-seek-buttons/dist/videojs-seek-buttons.min.css': resources.videojsSeekButtonsCSS,
            'videojs-seek-buttons/dist/videojs-seek-buttons.js': resources.videojsSeekButtonsJS,
            'videojs-seek-buttons/dist/videojs-seek-buttons.min.js': resources.videojsSeekButtonsJS,
            'vue-resource@{version}/dist/vue-resource.': resources.vueResource,
            '@webcomponents/webcomponentsjs/webcomponents-loader.js': resources.webcomponentsJS,
            'webfontloader@{version}/webfontloader.': resources.webfontloader
        },
        '/': {
            'algoliasearch/3/algoliasearch.': resources.algoliaSearch,
            'angularjs/{version}/angular.': resources.angular,
            'autocomplete.js/0/autocomplete.': resources.autocompleteJS,
            'backbonejs/{version}/backbone.': resources.backbone,
            'backbonejs/{version}/backbone-min.': resources.backbone,
            'bootstrap/{version}/css/bootstrap.': resources.bootstrapCSS,
            'bootstrap/{version}/js/bootstrap.': resources.bootstrapJS,
            'dojo/{version}/dojo.': resources.dojo,
            'emberjs/{version}/ember.': resources.ember,
            'gh/fancyapps/fancybox@{version}/dist/jquery.fancybox.js': resources.fancyBoxJS,
            'gh/fancyapps/fancybox@{version}/dist/jquery.fancybox.min.js': resources.fancyBoxJS,
            'gh/fancyapps/fancybox@{version}/dist/jquery.fancybox.css': resources.fancyBoxCSS,
            'gh/fancyapps/fancybox@{version}/dist/jquery.fancybox.min.css': resources.fancyBoxCSS,
            'gh/highlightjs/cdn-release@{version}/build/': resources.highlightJS,
            'jquery/{version}/jquery.': resources.jQuery,
            'jquery.ui/{version}/jquery-ui.js': resources.jQueryUI,
            'jquery.ui/{version}/jquery-ui.min.js': resources.jQueryUI,
            'jquery.slick/{version}/slick.css': resources.slickCarouselCSS,
            'jquery.slick/{version}/slick.min.css': resources.slickCarouselCSS,
            'jquery.slick/{version}/slick.js': resources.slickCarouselJS,
            'jquery.slick/{version}/slick.min.js': resources.slickCarouselJS,
            'momentjs/{version}/moment.': resources.moment,
            'momentjs/{version}/moment.min.': resources.moment,
            'mootools/{version}/mootools-': resources.mootools,
            'simplemde/latest/simplemde.js': resources.simplemdeJS,
            'simplemde/latest/simplemde.min.js': resources.simplemdeJS,
            'simplemde/latest/simplemde.css': resources.simplemdeCSS,
            'simplemde/latest/simplemde.min.css': resources.simplemdeCSS,
            'swfobject/{version}/swfobject.': resources.swfobject,
            'underscorejs/{version}/underscore.': resources.underscore,
            'underscorejs/{version}/underscore-min.': resources.underscore,
            'webfontloader/{version}/webfont': resources.webfontloader
        },
        // TEMPORARY SOLUTION
        '/g/': {
            'algoliasearch@3(algoliasearchLite.min.js),algoliasearch.helper@2': resources.algoliasearchSearchlightHelper
        }
    },
    // Google Material Icons
    'fonts.googleapis.com': {
        '/': {
            'icon?family=Material+Icons': resources.googleMaterialIcons,
            'css?family=Material+Icons': resources.googleMaterialIcons
        }
    },
    // Yandex CDN
    'yastatic.net': {
        '/': {
            'angularjs/{version}/angular-animate.': resources.angularAnimate,
            'angularjs/{version}/angular-aria.': resources.angularAria,
            'angularjs/{version}/angular-cookies.': resources.angularCookies,
            'angularjs/{version}/angular-loader.': resources.angularLoader,
            'angularjs/{version}/angular-message-format.': resources.angularMessageFormat,
            'angularjs/{version}/angular-messages.': resources.angularMessages,
            'angularjs/{version}/angular-parse-ext.': resources.angularParseExt,
            'angularjs/{version}/angular-resource.': resources.angularResource,
            'angularjs/{version}/angular-route.': resources.angularRoute,
            'angularjs/{version}/angular-sanitize.': resources.angularSanitize,
            'angularjs/{version}/angular-touch.': resources.angularTouch,
            'angularjs/{version}/angular.': resources.angular,
            'backbone/{version}/backbone.': resources.backbone,
            'backbone/{version}/backbone-min.': resources.backbone,
            'dojo/{version}/dojo/dojo.': resources.dojo,
            'ext-core/{version}/ext-core.': resources.extCore,
            'jquery/{version}/jquery.': resources.jQuery,
            'jquery-ui/{version}/jquery-ui.js': resources.jQueryUI,
            'jquery-ui/{version}/jquery-ui.min.js': resources.jQueryUI,
            'modernizr/{version}/modernizr.': resources.modernizr,
            'momentjs/{version}/moment.': resources.moment,
            'momentjs/{version}/moment.min.': resources.moment,
            'prototype/{version}/prototype.': resources.prototypeJS,
            'scriptaculous/{version}/scriptaculous.': resources.scriptaculous,
            'swfobject/{version}/swfobject.': resources.swfobject,
            'underscore/{version}/underscore.': resources.underscore,
            'underscore/{version}/underscore-min.': resources.underscore
        }
    },
    // Yandex CDN [Deprecated]
    'yandex.st': {
        '/': {
            'angularjs/{version}/angular.': resources.angular,
            'backbone/{version}/backbone.': resources.backbone,
            'backbone/{version}/backbone-min.': resources.backbone,
            'dojo/{version}/dojo/dojo.': resources.dojo,
            'ext-core/{version}/ext-core.': resources.extCore,
            'jquery/{version}/jquery.': resources.jQuery,
            'jquery-ui/{version}/jquery-ui.js': resources.jQueryUI,
            'jquery-ui/{version}/jquery-ui.min.js': resources.jQueryUI,
            'modernizr/{version}/modernizr.': resources.modernizr,
            'momentjs/{version}/moment.': resources.moment,
            'momentjs/{version}/moment.min.': resources.moment,
            'prototype/{version}/prototype.': resources.prototypeJS,
            'scriptaculous/{version}/scriptaculous.': resources.scriptaculous,
            'swfobject/{version}/swfobject.': resources.swfobject,
            'underscore/{version}/underscore.': resources.underscore,
            'underscore/{version}/underscore-min.': resources.underscore
        }
    },
    // Baidu CDN
    'apps.bdimg.com': {
        '/libs/': {
            'angular.js/{version}/angular-animate.': resources.angularAnimate,
            'angular.js/{version}/angular-aria.': resources.angularAria,
            'angular.js/{version}/angular-cookies.': resources.angularCookies,
            'angular.js/{version}/angular-loader.': resources.angularLoader,
            'angular.js/{version}/angular-message-format.': resources.angularMessageFormat,
            'angular.js/{version}/angular-messages.': resources.angularMessages,
            'angular.js/{version}/angular-parse-ext.': resources.angularParseExt,
            'angular.js/{version}/angular-resource.': resources.angularResource,
            'angular.js/{version}/angular-route.': resources.angularRoute,
            'angular.js/{version}/angular-sanitize.': resources.angularSanitize,
            'angular.js/{version}/angular-touch.': resources.angularTouch,
            'angular.js/{version}/angular.': resources.angular,
            'backbone.js/{version}/backbone.': resources.backbone,
            'backbone.js/{version}/backbone-min.': resources.backbone,
            'dojo/{version}/dojo.': resources.dojo,
            'ember.js/{version}/ember.': resources.ember,
            'ext-core/{version}/ext-core.': resources.extCore,
            'jquery/{version}/jquery.': resources.jQuery,
            'jqueryui/{version}/jquery-ui.js': resources.jQueryUI,
            'jqueryui/{version}/jquery-ui.min.js': resources.jQueryUI,
            'moment/{version}/moment.': resources.moment,
            'moment/{version}/moment.min.': resources.moment,
            'mootools/{version}/mootools-yui-compressed.': resources.mootools,
            'prototype/{version}/prototype.': resources.prototypeJS,
            'scriptaculous/{version}/scriptaculous.': resources.scriptaculous,
            'swfobject/{version}/swfobject.': resources.swfobject,
            'swfobject/{version}/swfobject_src.': resources.swfobject,
            'underscore.js/{version}/underscore.': resources.underscore,
            'underscore.js/{version}/underscore-min.': resources.underscore,
            'webfont/{version}/webfont.': resources.webfontloader,
            'webfont/{version}/webfont_debug.': resources.webfontloader
        }
    },
    // Baidu CDN
    'libs.baidu.com': {
        '/': {
            'angular.js/{version}/angular-animate.': resources.angularAnimate,
            'angular.js/{version}/angular-aria.': resources.angularAria,
            'angular.js/{version}/angular-cookies.': resources.angularCookies,
            'angular.js/{version}/angular-loader.': resources.angularLoader,
            'angular.js/{version}/angular-message-format.': resources.angularMessageFormat,
            'angular.js/{version}/angular-messages.': resources.angularMessages,
            'angular.js/{version}/angular-parse-ext.': resources.angularParseExt,
            'angular.js/{version}/angular-resource.': resources.angularResource,
            'angular.js/{version}/angular-route.': resources.angularRoute,
            'angular.js/{version}/angular-sanitize.': resources.angularSanitize,
            'angular.js/{version}/angular-touch.': resources.angularTouch,
            'angular.js/{version}/angular.': resources.angular,
            'backbone.js/{version}/backbone.': resources.backbone,
            'backbone.js/{version}/backbone-min.': resources.backbone,
            'dojo/{version}/dojo.': resources.dojo,
            'ember.js/{version}/ember.min.js': resources.ember.js,
            'ext-core/{version}/ext-core.': resources.extCore,
            'jquery/{version}/jquery.': resources.jQuery,
            'jqueryui/{version}/jquery-ui.js': resources.jQueryUI,
            'jqueryui/{version}/jquery-ui.min.js': resources.jQueryUI,
            'moment/{version}/moment.': resources.moment,
            'moment/{version}/moment.min.': resources.moment,
            'mootools/{version}/mootools-yui-compressed.': resources.mootools,
            'prototype/{version}/prototype.': resources.prototypeJS,
            'scriptaculous/{version}/scriptaculous.': resources.scriptaculous,
            'swfobject/{version}/swfobject.': resources.swfobject,
            'underscore.js/{version}/underscore.': resources.underscore,
            'underscore.js/{version}/underscore-min.': resources.underscore,
            'webfont/{version}/webfont.': resources.webfontloader,
            'webfont/{version}/webfont_debug.': resources.webfontloader
        },
        '/libs/': {
            'angular.js/{version}/angular-animate.': resources.angularAnimate,
            'angular.js/{version}/angular-aria.': resources.angularAria,
            'angular.js/{version}/angular-cookies.': resources.angularCookies,
            'angular.js/{version}/angular-loader.': resources.angularLoader,
            'angular.js/{version}/angular-message-format.': resources.angularMessageFormat,
            'angular.js/{version}/angular-messages.': resources.angularMessages,
            'angular.js/{version}/angular-parse-ext.': resources.angularParseExt,
            'angular.js/{version}/angular-resource.': resources.angularResource,
            'angular.js/{version}/angular-route.': resources.angularRoute,
            'angular.js/{version}/angular-sanitize.': resources.angularSanitize,
            'angular.js/{version}/angular-touch.': resources.angularTouch,
            'angular.js/{version}/angular.': resources.angular,
            'backbone.js/{version}/backbone.': resources.backbone,
            'backbone.js/{version}/backbone-min.': resources.backbone,
            'dojo/{version}/dojo.': resources.dojo,
            'ember.js/{version}/ember.min.js': resources.ember.js,
            'ext-core/{version}/ext-core.': resources.extCore,
            'jquery/{version}/jquery.': resources.jQuery,
            'jqueryui/{version}/jquery-ui.js': resources.jQueryUI,
            'jqueryui/{version}/jquery-ui.min.js': resources.jQueryUI,
            'mootools/{version}/mootools-yui-compressed.': resources.mootools,
            'prototype/{version}/prototype.': resources.prototypeJS,
            'scriptaculous/{version}/scriptaculous.': resources.scriptaculous,
            'swfobject/{version}/swfobject.': resources.swfobject,
            'underscore.js/{version}/underscore.': resources.underscore,
            'underscore.js/{version}/underscore-min.': resources.underscore,
            'webfont/{version}/webfont.': resources.webfontloader,
            'webfont/{version}/webfont_debug.': resources.webfontloader
        }
    },
    // Staticfile CDN
    'cdn.staticfile.org': {
        '/': {
            'angular.js/{version}/angular-animate.': resources.angularAnimate,
            'angular.js/{version}/angular-aria.': resources.angularAria,
            'angular.js/{version}/angular-cookies.': resources.angularCookies,
            'angular.js/{version}/angular-loader.': resources.angularLoader,
            'angular.js/{version}/angular-message-format.': resources.angularMessageFormat,
            'angular.js/{version}/angular-messages.': resources.angularMessages,
            'angular.js/{version}/angular-parse-ext.': resources.angularParseExt,
            'angular.js/{version}/angular-resource.': resources.angularResource,
            'angular.js/{version}/angular-route.': resources.angularRoute,
            'angular.js/{version}/angular-sanitize.': resources.angularSanitize,
            'angular.js/{version}/angular-touch.': resources.angularTouch,
            'angular.js/{version}/angular.': resources.angular,
            'backbone.js/{version}/backbone.': resources.backbone,
            'backbone.js/{version}/backbone-min.': resources.backbone,
            'dojo/{version}/dojo.': resources.dojo,
            'ember.js/{version}/ember.min.js': resources.ember.js,
            'ext-core/{version}/ext-core.': resources.extCore,
            'jquery/{version}/jquery.': resources.jQuery,
            'jqueryui/{version}/jquery-ui.js': resources.jQueryUI,
            'jqueryui/{version}/jquery-ui.min.js': resources.jQueryUI,
            'modernizr/{version}/modernizr.': resources.modernizr,
            'mootools/{version}/mootools-yui-compressed.': resources.mootools,
            'prototype/{version}/prototype.': resources.prototypeJS,
            'scriptaculous/{version}/scriptaculous.': resources.scriptaculous,
            'swfobject/{version}/swfobject.': resources.swfobject,
            'webfont/{version}/webfont.': resources.webfontloader,
            'webfont/{version}/webfont_debug.': resources.webfontloader
        }
    },
    // BootCDN
    'cdn.bootcss.com': {
        '/': {
            'angular.js/{version}/angular-animate.': resources.angularAnimate,
            'angular.js/{version}/angular-aria.': resources.angularAria,
            'angular.js/{version}/angular-cookies.': resources.angularCookies,
            'angular.js/{version}/angular-loader.': resources.angularLoader,
            'angular.js/{version}/angular-message-format.': resources.angularMessageFormat,
            'angular.js/{version}/angular-messages.': resources.angularMessages,
            'angular.js/{version}/angular-parse-ext.': resources.angularParseExt,
            'angular.js/{version}/angular-resource.': resources.angularResource,
            'angular.js/{version}/angular-route.': resources.angularRoute,
            'angular.js/{version}/angular-sanitize.': resources.angularSanitize,
            'angular.js/{version}/angular-touch.': resources.angularTouch,
            'angular.js/{version}/angular.': resources.angular,
            'backbone.js/{version}/backbone.': resources.backbone,
            'backbone.js/{version}/backbone-min.': resources.backbone,
            'dojo/{version}/dojo.': resources.dojo,
            'element-ui/{version}/': resources.elementUI,
            'ember.js/{version}/ember.min.js': resources.ember.js,
            'ext-core/{version}/ext-core.': resources.extCore,
            'jquery/{version}/jquery.': resources.jQuery,
            'jqueryui/{version}/jquery-ui.js': resources.jQueryUI,
            'jqueryui/{version}/jquery-ui.min.js': resources.jQueryUI,
            'modernizr/{version}/modernizr.': resources.modernizr,
            'mootools/{version}/mootools-yui-compressed.': resources.mootools,
            'prototype/{version}/prototype.': resources.prototypeJS,
            'scriptaculous/{version}/scriptaculous.': resources.scriptaculous,
            'swfobject/{version}/swfobject.': resources.swfobject,
            'underscore.js/{version}/underscore.': resources.underscore,
            'underscore.js/{version}/underscore-min.': resources.underscore,
            'webfont/{version}/webfont.': resources.webfontloader,
            'webfont/{version}/webfont_debug.': resources.webfontloader,
            'ember.js/{version}/ember.': resources.ember,
            'moment.js/{version}/moment.': resources.moment,
            'moment.js/{version}/moment.min.': resources.moment,
            'webfont/{version}/webfontloader.': resources.webfontloader
        }
    },
    // Tencent Public Libraries
    'mat1.gtimg.com': {
        '/libs/' :{
            'angular.js/{version}/angular-animate.': resources.angularAnimate,
            'angular.js/{version}/angular-aria.': resources.angularAria,
            'angular.js/{version}/angular-cookies.': resources.angularCookies,
            'angular.js/{version}/angular-loader.': resources.angularLoader,
            'angular.js/{version}/angular-message-format.': resources.angularMessageFormat,
            'angular.js/{version}/angular-messages.': resources.angularMessages,
            'angular.js/{version}/angular-parse-ext.': resources.angularParseExt,
            'angular.js/{version}/angular-resource.': resources.angularResource,
            'angular.js/{version}/angular-route.': resources.angularRoute,
            'angular.js/{version}/angular-sanitize.': resources.angularSanitize,
            'angular.js/{version}/angular-touch.': resources.angularTouch,
            'angular.js/{version}/angular.': resources.angular,
            'jquery/{version}/jquery.': resources.jQuery,
        }
    },
    // Sina Public Resources
    'lib.sinaapp.com': {
        '/js/': {
            'angular.js/angular-{version}/angular.': resources.angular,
            'backbone/{version}/backbone.': resources.backbone,
            'dojo/{version}/dojo.': resources.dojo,
            'ext-core/{version}/ext-core.': resources.extCore,
            'ext-core/{version}/ext-core-debug.': resources.extCore,
            'jquery/{version}/jquery.': resources.jQuery,
            'jquery/{version}/jquery-': resources.jQuery,
            'jquery-ui/{version}/jquery-ui.js': resources.jQueryUI,
            'jquery-ui/{version}/jquery-ui.min.js': resources.jQueryUI,
            'mootools/{version}/mootools.': resources.mootools,
            'prototype/{version}/prototype.': resources.prototypeJS,
            'scriptaculous/{version}/scriptaculous.': resources.scriptaculous,
            'swfobject/{version}/swfobject.': resources.swfobject,
            'underscore/{version}/underscore.': resources.underscore,
            'underscore/{version}/underscore-min.': resources.underscore,
            'webfont/{version}/webfont.': resources.webfontloader,
            'webfont/{version}/webfont_debug.': resources.webfontloader
        }
    },
    // UpYun Library
    'upcdn.b0.upaiyun.com': {
        '/libs/': {
            'dojo/dojo-{version}.': resources.dojo,
            'emberjs/emberjs-{version}.': resources.ember,
            'jquery/jquery-{version}.': resources.jQuery,
            'jqueryui/jquery.ui-{version}.js': resources.jQueryUI,
            'jqueryui/jquery.ui-{version}.min.js': resources.jQueryUI,
            'modernizr/modernizr-{version}.': resources.modernizr,
            'mootoolscore/mootools.core-{version}.': resources.mootools
        }
    },
    // StackPath BootstrapCDN
    'stackpath.bootstrapcdn.com': {
        '/': {
            'bootstrap/{version}/js/bootstrap.min.': resources.bootstrapJS,
            'bootstrap/{version}/css/bootstrap.min.': resources.bootstrapCSS,
            'font-awesome/{version}/css/font-awesome': resources.fontawesome
        }
    },
    // MaxCDN Bootstrap
    'maxcdn.bootstrapcdn.com': {
        '/': {
            'bootstrap/{version}/js/bootstrap.min.': resources.bootstrapJS,
            'bootstrap/{version}/css/bootstrap.min.': resources.bootstrapCSS,
            'twitter-bootstrap/{version}/css/bootstrap': resources.bootstrapCSS,
            'font-awesome/{version}/css/font-awesome': resources.fontawesome
        }
    },
    // NetDNA Bootstrap
    'netdna.bootstrapcdn.com': {
        '/bootstrap/': {
            '{version}/js/bootstrap.min.': resources.bootstrapJS,
            '{version}/css/bootstrap.min.': resources.bootstrapCSS
        },
        '/font-awesome/': {
            '{version}/css/font-awesome.': resources.fontawesome
        }
    },
    // Font Awesome CDN
    'use.fontawesome.com': {
        '/': {
            'releases/v{version}/css/all': resources.fontawesome5CSS,
            'releases/v{version}/css/v4-shims': resources.fontawesome5CSSv4shims,
            'releases/v{version}/js/': resources.fontawesome5JS,
            'fa-loader.js': resources.webfontloaderFontawesomeJS,
            'fa-loader.css': resources.webfontloaderFontawesomeCSS,
            'webfontloader/{version}/webfontload': resources.webfontloader
        }
    },
    // Cloudflare Rocket-Loader
    'ajax.cloudflare.com': {
        '/': {
            'cdn-cgi/scripts/7089c43e/cloudflare-static/rocket-loader.min.': resources.cfRocketLoader,
            'cdn-cgi/scripts/04b3eb47/cloudflare-static/mirage2.': resources.mirage2
        }
    },
    // Akamai WebCDN
    'akamai-webcdn.kgstatic.net': {
        '/': {
            'renewal/static/js/lozad.min.': resources.lozad
        }
    },
    // gitcdn.github.io
    'gitcdn.github.io': {
        '/': {
            'bootstrap-toggle/{version}/js/bootstrap-toggle.': resources.bootstrapToggleJS,
            'bootstrap-toggle/{version}/js/bootstrap2-toggle.': resources.bootstrap2ToggleJS,
            'bootstrap-toggle/{version}/css/bootstrap-toggle.': resources.bootstrapToggleCSS,
            'bootstrap-toggle/{version}/css/bootstrap2-toggle.': resources.bootstrap2ToggleCSS
        }
    },
    // vjs.zencdn.net
    'vjs.zencdn.net': {
        '/': {
        }
    },
};

// Geekzu Public Service [Mirror]
mappings.cdn['sdn.geekzu.org'] = {
    '/ajax/ajax/libs/': mappings.cdn['ajax.googleapis.com']['/ajax/libs/']
};

// USTC Linux User Group [Mirror]
mappings.cdn['ajax.proxy.ustclug.org'] = mappings.cdn['ajax.googleapis.com'];

//UNPKG (Cloudflare)
mappings.cdn['unpkg.com'] = {
    '/': mappings.cdn['cdn.jsdelivr.net']['/npm/']
};

// PageCDN
mappings.cdn['pagecdn.io'] = {
    '/lib/': mappings.cdn['cdnjs.cloudflare.com']['/ajax/libs/']
};

// loli.net [Mirror]
mappings.cdn['cdn.css.net'] = {
    '/lib/': mappings.cdn['cdnjs.cloudflare.com']['/ajax/libs/']
};

mappings.cdn['cdnjs.loli.net'] = mappings.cdn['cdnjs.cloudflare.com'];

mappings.cdn['ajax.loli.net'] = mappings.cdn['ajax.googleapis.com'];

mappings.cdn['fonts.loli.net'] = mappings.cdn['fonts.googleapis.com'];

// Qihoo 360 CDN [Mirror]
mappings.cdn['lib.baomitu.com'] = {
    '/': mappings.cdn['cdnjs.cloudflare.com']['/ajax/libs/']
}

// Boot CDN New [Mirror]
mappings.cdn['cdn.bootcdn.net'] = mappings.cdn['cdnjs.cloudflare.com'];
