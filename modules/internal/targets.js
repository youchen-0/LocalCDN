/**
 * Internal Target Module
 * Belongs to LocalCDN (since 2020-02-26)
 *
 * @author      nobody
 * @since       2020-11-04
 *
 * @license     MPL 2.0
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';


/**
 * Targets
 */

var targets = {};


/**
 * Public Methods
 */

targets.determineBundle = function (path) {
    path = path.replace('resources', '');
    let val = '';
    if (path.startsWith('/findify')) {
        val = 'Findify';
    } else if (path.startsWith('/bootstrap-datepicker')) {
        val = 'Bootstrap Datepicker';
    } else if (path.startsWith('/jquery.lazy/')) {
        val = 'jQuery Lazy';
    } else if (path.startsWith('/waypoints/')) {
        val = 'Waypoints';
    } else if (path.startsWith('/highlight.js/')) {
        val = 'highlight.js';
    } else if (path.startsWith('/element-ui/')) {
        val = 'ElementUI';
    } else if (path.startsWith('/select2/')) {
        val = 'Select2';
    } else if (path.startsWith('/gsap/')) {
        val = 'GSAP';
    } else if (path.startsWith('/angular-translate/')) {
        val = 'angular-translate';
    } else if (path.startsWith('/OwlCarousel2/')) {
        val = 'Owl Carousel 2';
    } else if (Regex.FONT_AWESOME_FONTS_ONLY.test(path)) {
        val = 'Font Awesome (Fonts)';
    } else if (Regex.BOOTSTRAP_FONTS_ONLY.test(path)) {
        val = 'Bootstrap (Fonts)';
    } else if (path.startsWith('/jquery.cycle2/')) {
        val = 'Cycle2';
    } else if (path.startsWith('/semantic-ui/')) {
        val = 'Semantic UI';
    } else if (path.startsWith('/datatables/')) {
        val = 'DataTables';
    } else if (path.startsWith('/mathjax/')) {
        val = 'MathJax';
    }

    return val === '' ? val : `${val} (Bundle)`;
};

targets.setLastVersion = function (type, version) {
    type = type.replace('resources', '');
    if (version !== null && version !== undefined) {
        version = version.toString();
    }
    if (type.startsWith('/ajax-bootstrap-select/1.')) {
        return '1.4.5';
    } else if (type.startsWith('/algoliasearch/3.')) {
        return '3.35.1';
    } else if (type.startsWith('/algoliasearch/4.')) {
        return '4.9.1';
    } else if (type.startsWith('/anchor-js/3.')) {
        return '3.2.2';
    } else if (type.startsWith('/anchor-js/4.')) {
        return '4.3.1';
    } else if (type.startsWith('/angular.js/1.')) {
        if (helpers.compareVersion('1.2.19', version)) return '1.2.19'; // <= v1.2.19
        else if (helpers.compareVersion('1.2.32', version)) return '1.2.32'; // > 1.2.19 to <= v1.2.32
        else if (helpers.compareVersion('1.3.20', version)) return '1.3.20'; // > 1.2.32 to <= 1.3.20
        else if (helpers.compareVersion('1.4.14', version)) return '1.4.14'; // > 1.3.20 to <= 1.4.14
        else if (helpers.compareVersion('1.5.11', version)) return '1.5.11'; // > 1.4.14 to <= 1.5.11
        else if (helpers.compareVersion('1.6.10', version)) return '1.6.10'; // > 1.5.11 to <= 1.6.10
        else return '1.8.2'; // >= 1.6.11
    } else if (type.startsWith('/angularjs-slider/6.')) {
        return '6.7.0';
    } else if (type.startsWith('/angularjs-slider/7.')) {
        return '7.0.0';
    } else if (type.startsWith('/angularjs-toaster/0.')) {
        return '0.4.18';
    } else if (type.startsWith('/angularjs-toaster/1.')) {
        return '1.2.0';
    } else if (type.startsWith('/angularjs-toaster/2.')) {
        return '2.2.0';
    } else if (type.startsWith('/angularjs-toaster/3.')) {
        return '3.0.0';
    } else if (type.startsWith('/angular-animate/1.')) {
        return '1.8.2';
    } else if (type.startsWith('/angular-aria/1.')) {
        return '1.8.2';
    } else if (type.startsWith('/angular-cookies/1.')) {
        return '1.8.2';
    } else if (type.startsWith('/angular-loader/1.')) {
        return '1.8.2';
    } else if (type.startsWith('/angular-message-format/1.')) {
        return '1.8.2';
    } else if (type.startsWith('/angular-messages/1.')) {
        return '1.8.2';
    } else if (type.startsWith('/angular-parse-ext/1.')) {
        return '1.8.2';
    } else if (type.startsWith('/angular-resource/1.')) {
        return '1.8.2';
    } else if (type.startsWith('/angular-route/1.')) {
        return '1.8.2';
    } else if (type.startsWith('/angular-sanitize/1.')) {
        return '1.8.2';
    } else if (type.startsWith('/angular-touch/1.')) {
        return '1.8.2';
    } else if (type.startsWith('/angular-bootstrap-colorpicker/3.')) {
        return '3.0.32';
    } else if (type.startsWith('/zumper-angular-payments/1.')) {
        return '1.0.7';
    } else if (type.startsWith('/angular-stripe-checkout@5.')) {
        return '5.1.0';
    } else if (type.startsWith('/angular-ui-bootstrap/')) {
        if (helpers.compareVersion('0.10.0', version)) return '0.10.0'; // <= v0.10.0
        else if (helpers.compareVersion('0.14.3', version)) return '0.14.3'; // > 0.10.0 <= v0.14.3
        else if (helpers.compareVersion('0.14.4', version)) return '1.3.3'; // > 0.14.3 <= v1.3.3
        return '2.5.6';
    } else if (type.startsWith('/angular-ui-router/')) {
        if (helpers.compareVersion('0.4.3', version)) return '0.4.3'; // <= 0.4.3
        else return '1.0.29'; // > 0.4.3
    } else if (type.startsWith('/angular-ui-utils/0.')) {
        return '0.1.1';
    } else if (type.startsWith('/angular-ui-select/0.')) {
        return '0.20.0';
    } else if (type.startsWith('/angular-sanitize/1.')) {
        return '1.7.9';
    } else if (type.startsWith('/angucomplete-alt/3.')) {
        return '3.0.0';
    } else if (type.startsWith('/animate.css/3.')) {
        return '3.7.2';
    } else if (type.startsWith('/animate.css/4.')) {
        return '4.1.1';
    } else if (type.startsWith('/animejs/3.')) {
        return '3.2.1';
    } else if (type.startsWith('/autocomplete.js/0.')) {
        return '0.38.0';
    } else if (type.startsWith('/angular-material/1.') || type.startsWith('/angular-material/0.')) {
        return '1.2.2';
    } else if (type.startsWith('/angular-translate/2.')) {
        return '2.18.4';
    } else if (type.startsWith('/appboy-web-sdk/3.')) {
        return '3.3.0';
    } else if (type.startsWith('/axios/0.')) {
        return '0.21.1';
    } else if (type.startsWith('/babel-polyfill/')) {
        return '7.12.1';
    } else if (type.startsWith('/babel-standalone/')) {
        return '6.26.0';
    } else if (type.startsWith('/backbone.js/0.')) {
        return '0.9.10';
    } else if (type.startsWith('/backbone.js/1.')) {
        return '1.4.0';
    } else if (type.startsWith('/baguettebox.js/1.')) {
        return '1.11.1';
    } else if (type.startsWith('/blazy/1.')) {
        return '1.8.2';
    } else if (type.startsWith('/bluebird/3.')) {
        return '3.7.2';
    } else if (type.startsWith('/bodymovin/4.')) {
        return '4.13.0';
    } else if (type.startsWith('/bodymovin/5.')) {
        return '5.7.11';
    } else if (type.startsWith('/bootbox.js/4.')) {
        return '4.4.0';
    } else if (type.startsWith('/bootbox.js/5.')) {
        return '5.5.2';
    } else if (type.startsWith('/bootstrap-daterangepicker/2.')) {
        return '2.1.27';
    } else if (type.startsWith('/bootstrap-daterangepicker/3.')) {
        return '3.1';
    } else if (type.startsWith('/bootstrap-datepicker/1.')) {
        return '1.9.0';
    } else if (type.startsWith('/bootstrap-multiselect/0.')) {
        return '0.9.16';
    } else if (type.startsWith('/bootstrap-slider/10.')) {
        return '10.6.2';
    } else if (type.startsWith('/bootstrap-slider/11.')) {
        return '11.0.2';
    } else if (type.startsWith('/bootstrap-select/1.')) {
        return '1.13.18';
    } else if (type.startsWith('/bootstrap-table/1.')) {
        return '1.18.3';
    } else if (type.startsWith('/bootstrap-toggle/2.')) {
        return '2.2.2';
    } else if (type.startsWith('/bootstrap-vue/2.')) {
        return '2.21.2';
    } else if (type.startsWith('/bootstrap-3-typeahead/4.')) {
        return '4.0.2';
    } else if (type.startsWith('/bowser/')) {
        if (version !== 'latest' && helpers.compareVersion('1.9.4', version)) return '1.9.4';
        return '2.11.0';
    } else if (type.startsWith('/bulma/0.')) {
        return '0.9.2';
    } else if (type.startsWith('/bxslider/4.')) {
        return '4.2.15';
    } else if (type.startsWith('/Chart.js/2.')) {
        return '2.9.4';
    } else if (type.startsWith('/Chart.js/3.')) {
        return '3.3.2';
    } else if (type.startsWith('/chosen/1.')) {
        return '1.8.7';
    } else if (type.startsWith('/clipboard.js/1.')) {
        return '1.7.1';
    } else if (type.startsWith('/clipboard.js/2.')) {
        return '2.0.8';
    } else if (type.startsWith('/cookieconsent2/3.')) {
        return '3.1.1';
    } else if (type.startsWith('/d3/3.')) {
        return '3.5.17';
    } else if (type.startsWith('/d3/4.')) {
        return '4.13.0';
    } else if (type.startsWith('/d3/5.')) {
        return '5.16.0';
    } else if (type.startsWith('/d3/6.')) {
        return '6.7.0';
    } else if (type.startsWith('/d3-legend/2.')) {
        return '2.25.6';
    } else if (type.startsWith('/datatables/1.')) {
        return '1.10.25';
    } else if (type.startsWith('/dayjs/1.')) {
        return '1.10.5';
    } else if (type.startsWith('/dexie/3.') || type.startsWith('/dexie/latest')) {
        return '3.0.3';
    } else if (type.startsWith('/docsearch.js/2.')) {
        return '2.6.3';
    } else if (type.startsWith('/dojo/1.')) {
        return '1.16.4';
    } else if (type.startsWith('/drawer/3.')) {
        return '3.2.2';
    } else if (type.startsWith('/element-ui/2.')) {
        return '2.15.2';
    } else if (type.startsWith('/embedly-player/0.')) {
        return '0.1.0';
    } else if (type.startsWith('/ember.js/1.')) {
        return '1.13.13';
    } else if (type.startsWith('/ember.js/2.')) {
        return '2.18.2';
    } else if (type.startsWith('/ember.js/3.')) {
        return '3.27.3';
    } else if (type.startsWith('/ethjs')) {
        return '0.4.0';
    } else if (type.startsWith('/ext-core/3.')) {
        return '3.1.0';
    } else if (type.startsWith('/findify')) {
        if (helpers.compareVersion('6.9.15', version)) return '6.9.15'; // <= 6.9.15
        else if (helpers.compareVersion('6.17.0', version)) return '6.17.0'; // > 6.9.15 to <= 6.17.0
        else return '7.0.19';
    } else if (type.startsWith('/fancybox/2.')) {
        return '2.1.7';
    } else if (type.startsWith('/fancybox/3.')) {
        return '3.5.7';
    } else if (type.startsWith('/feather-icons/4.')) {
        return '4.28.0';
    } else if (type.startsWith('/flv.js/')) {
        return '1.5.0';
    } else if (type.startsWith('/font-awesome/3.')) {
        return '3.2.1';
    } else if (type.startsWith('/font-awesome/4.')) {
        return '4.7.0';
    } else if (type.startsWith('/font-awesome/5.')) {
        return '5.15.3';
    } else if (type.startsWith('/gsap/1.')) {
        return '1.20.5';
    } else if (type.startsWith('/gsap/2.')) {
        return '2.1.3';
    } else if (type.startsWith('/gsap/3.')) {
        return '3.6.1';
    } else if (type.startsWith('/google-material-design-icons/')) {
        return '3.0.1';
    } else if (type.startsWith('/google-material-design-icons/')) {
        return 'v88';
    } else if (type.startsWith('/highlight.js/11.')) {
        return '11.0.0';
    } else if (type.startsWith('/highlight.js/10.')) {
        return '10.7.3';
    } else if (type.startsWith('/highlight.js/9.')) {
        return '9.18.5';
    } else if (type.startsWith('/highlight.js/8.')) {
        return '9.18.5';
    } else if (type.startsWith('/highlight.js/7.')) {
        return '9.18.5';
    } else if (type.startsWith('/history/4.')) {
        return '4.10.1';
    } else if (type.startsWith('/history/5.')) {
        return '5.0.0';
    } else if (type.startsWith('/hls.js/1.')) {
        return '1.0.5';
    } else if (type.startsWith('/hls.js/0.')) {
        return '0.14.17';
    } else if (type.startsWith('/hogan.js/')) {
        return '3.0.2';
    } else if (type.startsWith('/instantsearch.js/3.')) {
        return '3.7.0';
    } else if (type.startsWith('/instantsearch.js/4.')) {
        return '4.23.0';
    } else if (type.startsWith('/iScroll/5.')) {
        return '5.2.0';
    } else if (type.startsWith('/jets/0.')) {
        return '0.14.1';
    } else if (type.startsWith('/jquery/1.')) {
        if (helpers.compareVersion('1.7.1', version)) return '1.7.1'; // <= v1.7.1
        else if (helpers.compareVersion('1.8.3', version)) return '1.8.3'; // > 1.7.1 to <= 1.8.3
        else if (helpers.compareVersion('1.11.2', version)) return '1.11.2'; // > 1.8.3 to <= 1.11.2
        else if (version === '1.11.3') return '1.11.3'; // = 1.11.3
        else return '1.12.4'; // > 1.11.3
    } else if (type.startsWith('/jquery/2.')) {
        return '2.2.4';
    } else if (type.startsWith('/jquery/3.') || type.startsWith('/jquery/latest')) {
        if (helpers.compareVersion('3.2.1', version)) return '3.2.1'; // <= v3.2.1
        else if (helpers.compareVersion('3.5.1', version)) return '3.5.1'; // <= v3.5.1
        else return '3.6.0';
    } else if (type.startsWith('/jquery.devbridge-autocomplete/1.')) {
        return '1.4.11';
    } else if (type.startsWith('/jqueryui/1.')) {
        if (helpers.compareVersion('1.8.24', version)) return '1.8.24'; // <= v1.8.24
        if (helpers.compareVersion('1.10.0', version)) return '1.10.0'; // > v1.8.24 to <= v1.10.0
        else return '1.12.1'; // >= 1.8.19
    } else if (type.startsWith('/jquery.blockUI/2.')) {
        return '2.70';
    } else if (type.startsWith('/jquery-cookie/1.')) {
        return '1.4.1';
    } else if (type.startsWith('/jquery-csv/1.')) {
        return '1.0.11';
    } else if (type.startsWith('/jquery-easing/1.')) {
        return '1.4.1';
    } else if (type.startsWith('/jquery.lazyload/1.')) {
        return '1.9.1';
    } else if (type.startsWith('/jquery.lazy/1.')) {
        return '1.7.11';
    } else if (type.startsWith('/jquery.matchHeight/0.')) {
        return '0.7.2';
    } else if (type.startsWith('/jquery-migrate/1.')) {
        return '1.4.1';
    } else if (type.startsWith('/jquery-migrate/3.')) {
        return '3.3.2';
    } else if (type.startsWith('/jquery-mobile/1.')) {
        return '1.4.5';
    } else if (type.startsWith('/jquery-mousewheel/3.')) {
        return '3.1.13';
    } else if (type.startsWith('/jScrollPane/2.')) {
        return '2.2.2';
    } else if (type.startsWith('/jquery-validate/1.')) {
        return '1.19.3';
    } else if (type.startsWith('/jeditable.js/1.')) {
        return '1.8.0';
    } else if (type.startsWith('/jeditable.js/2.')) {
        return '2.0.19';
    } else if (type.startsWith('/jquery.cycle2/2.')) {
        return '2.1.6';
    } else if (type.startsWith('/jquery.scrollbar/0.')) {
        return '0.2.11';
    } else if (type.startsWith('/jquery-validation-unobtrusive/3.')) {
        return '3.2.12';
    } else if (type.startsWith('/jquery.tablesorter/2.')) {
        return '2.31.3';
    } else if (type.startsWith('/jquery-modal/0.')) {
        return '0.9.2';
    } else if (type.startsWith('/mobile/1.')) {
        return '1.4.5';
    } else if (type.startsWith('/nvd3/1.')) {
        return '1.8.6';
    } else if (type.startsWith('/jasny-bootstrap/4.')) {
        return '4.0.0';
    } else if (type.startsWith('/jasny-bootstrap/3.')) {
        return '3.1.3';
    } else if (type.startsWith('/js-cookie/2.')) {
        return '2.2.1';
    } else if (type.startsWith('/knockout/3.')) {
        return '3.5.1';
    } else if (type.startsWith('/lazysizes/4.')) {
        return '4.1.8';
    } else if (type.startsWith('/lazysizes/5.')) {
        return '5.3.2';
    } else if (type.startsWith('/leaflet/0.')) {
        return '0.7.7';
    } else if (type.startsWith('/leaflet/1.')) {
        return '1.7.1';
    } else if (type.startsWith('/Leaflet.EasyButton/2.')) {
        return '2.4.0';
    } else if (type.startsWith('/leaflet.featuregroup.subgroup/1.')) {
        return '1.0.2';
    } else if (type.startsWith('/leaflet.markercluster/1.')) {
        return '1.5.0';
    } else if (type.startsWith('/libphonenumber-js/1.')) {
        return '1.9.16';
    } else if (type.startsWith('/libsodium-wrappers/0.')) {
        return '0.5.4';
    } else if (type.startsWith('/lightcase/2.')) {
        return '2.5.0';
    } else if (type.startsWith('/lightgallery/1.')) {
        return '1.10.0';
    } else if (type.startsWith('/noUiSlider/15.')) {
        return '15.1.1';
    } else if (type.startsWith('/noUiSlider/14.')) {
        return '14.7.0';
    } else if (type.startsWith('/lodash.js/4.')) {
        return '4.17.21';
    } else if (type.startsWith('/lodash.js/3.')) {
        return '3.10.1';
    } else if (type.startsWith('/lozad')) {
        return '1.16.0';
    } else if (type.startsWith('/magnific-popup.js/1.')) {
        return '1.1.0';
    } else if (type.startsWith('/markdown-it/')) {
        return '12.0.6';
    } else if (type.startsWith('/mdbootstrap/4.')) {
        return '4.19.1';
    } else if (type.startsWith('/material-design-icons/2.')) {
        return '2.8.94';
    } else if (type.startsWith('/material-design-icons/3.')) {
        return '3.9.97';
    } else if (type.startsWith('/material-design-icons/4.')) {
        return '4.9.95';
    } else if (type.startsWith('/material-design-icons/5.')) {
        return '5.8.55';
    } else if (type.startsWith('/materialize/1.')) {
        return '1.0.0';
    } else if (type.startsWith('/materialize/0.')) {
        if (helpers.compareVersion('0.97.8', version)) return '0.97.8'; // <= v0.97.8
        return '0.100.2';
    } else if (type.startsWith('/mathjax/2.') || type.startsWith('/mathjax/latest')) {
        return '2.7.5';
    } else if (type.startsWith('/mdb-ui-kit/3.')) {
        return '3.5.0';
    } else if (type.startsWith('/Modaal/0.')) {
        return '0.4.4';
    } else if (type.startsWith('/modernizr/2.')) {
        return '2.8.3';
    } else if (type.startsWith('/moment.js/2.')) {
        return '2.29.1';
    } else if (type.startsWith('/mootools/1.')) {
        return '1.6.0';
    } else if (type.startsWith('/ngx-bootstrap/6.')) {
        return '6.2.0';
    } else if (type.startsWith('/object-assign@4.')) {
        return '4.1.1';
    } else if (type.startsWith('/oclazyload/1.')) {
        return '1.1.0';
    } else if (type.startsWith('/OwlCarousel2/2.')) {
        return '2.3.4';
    } else if (type.startsWith('/owl-carousel/2.')) {
        return '2.3.4';
    } else if (type.startsWith('/owl-carousel/1.')) {
        return '1.3.3';
    } else if (type.startsWith('/p2p-media-loader-core') || type.startsWith('/p2p-media-loader-hlsjs')) {
        return '0.6.2';
    } else if (type.startsWith('/p5.js/1.')) {
        return '1.3.1';
    } else if (type.startsWith('/p5.js/0.')) {
        return '0.10.2';
    } else if (type.startsWith('/page.js/1.')) {
        return '1.11.6';
    } else if (type.startsWith('/paginationjs/2.')) {
        return '2.1.5';
    } else if (type.startsWith('/plyr/3.')) {
        return '3.6.8';
    } else if (type.startsWith('/popper.js/1.')) {
        return '1.16.1';
    } else if (type.startsWith('/popper.js/2.')) {
        return '2.9.2';
    } else if (type.startsWith('/prop-types/15.')) {
        return '15.7.2';
    } else if (type.startsWith('/protonet-jquery.inview/1.')) {
        return '1.1.2';
    } else if (type.startsWith('/prototype/1.')) {
        return '1.7.3';
    } else if (type.startsWith('/raven.js/3.')) {
        return '3.27.2';
    } else if (type.startsWith('/react/16.')) {
        return '16.14.0';
    } else if (type.startsWith('/react/17.')) {
        return '17.0.2';
    } else if (type.startsWith('/react-dom/16.')) {
        return '16.14.0';
    } else if (type.startsWith('/react-dom/17.')) {
        return '17.0.2';
    } else if (type.startsWith('/react-redux/7.')) {
        return '7.2.4';
    } else if (type.startsWith('/react-router/5.')) {
        return '5.2.0';
    } else if (type.startsWith('/react-side-effect/')) {
        return '2.1.1';
    } else if (type.startsWith('/react-lifecycles-compat/')) {
        return '3.0.4';
    } else if (type.startsWith('/redux/4.')) {
        return '4.1.0';
    } else if (type.startsWith('/rickshaw/1.')) {
        return '1.7.1';
    } else if (type.startsWith('/scriptaculous/1.')) {
        return '1.9.0';
    } else if (type.startsWith('/select2/3.')) {
        return '3.5.4';
    } else if (type.startsWith('/select2/4.')) {
        return '4.0.13';
    } else if (type.startsWith('/semantic-ui/2.')) {
        return '2.4.1';
    } else if (type.startsWith('/showdown/1.')) {
        return '1.9.1';
    } else if (type.startsWith('/showdown/0.')) {
        return '0.5.1';
    } else if (type.startsWith('/simplemde/')) {
        return '1.11.2';
    } else if (type.startsWith('/slick-carousel/1.')) {
        return '1.9.0';
    } else if (type.startsWith('/slick-lightbox/0.')) {
        return '0.2.12';
    } else if (type.startsWith('/slider-pro/1.')) {
        return '1.5.0';
    } else if (type.startsWith('/snowplow/2.')) {
        return '2.17.3';
    } else if (type.startsWith('/socket.io/2.')) {
        return '2.4.0';
    } else if (type.startsWith('/socket.io/3.')) {
        return '3.1.3';
    } else if (type.startsWith('/socket.io/4.')) {
        return '4.0.1';
    } else if (type.startsWith('/spin.js/2.')) {
        return '2.3.2';
    } else if (type.startsWith('/spin.js/3.')) {
        return '3.1.0';
    } else if (type.startsWith('/spin.js/4.')) {
        return '4.1.0';
    } else if (type.startsWith('/stickyfill/1.')) {
        return '1.1.4';
    } else if (type.startsWith('/stickyfill/2.')) {
        return '2.1.0';
    } else if (type.startsWith('/store.js/2.')) {
        return '2.0.12';
    } else if (type.startsWith('/swfobject/2.')) {
        return '2.2';
    } else if (type.startsWith('/Swiper/3.')) {
        return '3.4.2';
    } else if (type.startsWith('/Swiper/4.')) {
        return '4.5.1';
    } else if (type.startsWith('/Swiper/5.')) {
        return '5.4.5';
    } else if (type.startsWith('/Swiper/6.') || type.startsWith('/Swiper/')) {
        return '6.6.1';
    } else if (type.startsWith('/tether/1.')) {
        return '1.4.7';
    } else if (type.startsWith('/tooltipster/3.')) {
        return '3.3.0';
    } else if (type.startsWith('/tooltipster/4.')) {
        return '4.2.8';
    } else if (type.startsWith('/toastr.js/2.')) {
        return '2.1.4';
    } else if (type.startsWith('/twitter-bootstrap/2.')) {
        return '2.3.2';
    } else if (type.startsWith('/twitter-bootstrap/3.')) {
        if (helpers.compareVersion('3.0.0', version)) return '3.0.0'; // <= 3.0.0
        else if (helpers.compareVersion('3.3.7', version)) return '3.3.7'; // <= 3.3.7
        else return '3.4.1';
    } else if (type.startsWith('/twitter-bootstrap/4.')) {
        return '4.6.0';
    } else if (type.startsWith('/twitter-bootstrap/5.')) {
        return '5.0.1';
    } else if (type.startsWith('/underscore.js/1.')) {
        return '1.13.1';
    } else if (type.startsWith('/urlive/1.')) {
        return '1.1.1';
    } else if (type.startsWith('/vanilla-lazyload')) {
        return '17.3.2';
    } else if (type.startsWith('/videojs-seek-buttons/1.')) {
        return '1.6.0';
    } else if (type.startsWith('/videojs-seek-buttons/2.')) {
        return '2.0.0';
    } else if (type.startsWith('/video.js/')) {
        if (helpers.compareVersion('5.20.5', version)) return '5.20.5'; // <= 5.20.5
        else if (helpers.compareVersion('6.13.0', version)) return '6.13.0'; // > 5.20.5 to <= 6.13.0
        else return '7.12.3';
    } else if (type.startsWith('/vue/1.')) {
        return '1.0.28';
    } else if (type.startsWith('/vue/2.')) {
        return '2.6.13';
    } else if (type.startsWith('/vue/3.')) {
        return '3.0.11';
    } else if (type.startsWith('/vue-i18n/8.')) {
        return '8.24.3';
    } else if (type.startsWith('/vue-i18n/9.')) {
        return '9.1.6';
    } else if (type.startsWith('/vue-resource/1.')) {
        return '1.5.2';
    } else if (type.startsWith('/waypoints/4.')) {
        return '4.0.1';
    } else if (type.startsWith('/webfont')) {
        return '1.6.28';
    } else if (type.startsWith('/webrtc-adapter/6.')) {
        return '6.4.8';
    } else if (type.startsWith('/webrtc-adapter/7.')) {
        return '7.4.0';
    } else if (type.startsWith('/wow/1.')) {
        return '1.1.2';
    } else if (version === null) {
        return 'latest';
    }
    return false;
};

targets.determineResourceName = function (filename) {
    // eslint-disable-next-line no-use-before-define
    return ListOfFiles[filename] || 'Unknown';
};

const ListOfFiles = {
    'bodymovin.min.jsm': 'bodymovin/lottie',
    'jquery.bxslider.min.jsm': 'bxslider (JS)',
    'jquery.bxslider.min.css': 'bxslider (CSS)',
    'easy-button.min.jsm': 'Leaflet.EasyButton',
    'leaflet.featuregroup.subgroup.jsm': 'Leaflet.FeatureGroup.SubGroup',
    'leaflet.markercluster.jsm': 'leaflet.markercluster',
    'embedly-player.min.jsm': 'embedly player',
    'bs-datepicker.css': 'Datepicker (ngx-bootstrap)',
    'sp.min.jsm': 'Snowplow',
    'appboy.min.jsm': 'Appboy/Braze Web SDK',
    'MaterialIcons.woff2': 'Google Material Icons',
    'font-awesome': 'Font Awesome',
    'leaflet.jsm': 'leaflet (JS)',
    'leaflet.css': 'leaflet (CSS)',
    'bluebird.min.jsm': 'bluebird',
    'feather.min.jsm': 'Feather Icons',
    'babel.min.jsm': 'Babel standalone',
    'anime.min.jsm': 'animejs',
    'lightcase.min.jsm': 'lightcase (JS)',
    'lightcase.min.css': 'lightcase (CSS)',
    'jasny-bootstrap.min.css': 'Jasny Bootstrap (JS)',
    'jasny-bootstrap.min.jsm': 'Jasny Bootstrap (CSS)',
    'bulma.min.css': 'Bulma',
    'hogan.min.jsm': 'hogan.js',
    'highlight.min.jsm': 'highlight.js (Bundle)',
    'jquery.cookie.min.jsm': 'jquery-cookie',
    'jquery.scrollbar.min.jsm': 'jQuery Scrollbar',
    'dayjs.min.jsm': 'Day.js',
    'jquery.validate.unobtrusive.min.jsm': 'jQuery Validate Unobtrusive',
    'jquery.sliderPro.min.jsm': 'Slider Pro (JS)',
    'knockout-latest.min.jsm': 'Knockout',
    'bootstrap-multiselect.min.jsm': 'Bootstrap Multiselect',
    'ajax-bootstrap-select.min.jsm': 'Ajax Bootstrap Select',
    'bootstrap-vue.min.jsm': 'BootstrapVue (JS)',
    'bootstrap-vue.min.css': 'BootstrapVue (CSS)',
    'bowser.min.jsm': 'Bowser',
    'mirage2.min.jsm': 'mirage2',
    'chosen.jquery.min.jsm': 'chosen',
    'nouislider.min.jsm': 'noUiSlider (JS)',
    'mdb-ui-kit.min.jsm': 'MDB UI Kit (JS)',
    'mdb-ui-kit.min.css': 'MDB UI Kit (CSS)',
    'docsearch.min.jsm': 'docsearch.js (JS)',
    'docsearch.min.css': 'docsearch.js (CSS)',
    'blazy.min.jsm': 'blazy',
    'materialdesignicons.min.css': 'MaterialDesign',
    'dexie.min.jsm': 'dexie',
    'p5.min.jsm': 'p5.js',
    'p5.sound.min.jsm': 'p5.js (Sound)',
    'jquery.inview.min.jsm': 'inview (Protonet)',
    'modaal.min.jsm': 'Modaal (JS)',
    'modaal.min.css': 'Modaal (CSS)',
    'jquery.magnific-popup.min.jsm': 'magnific-popup.js (JS)',
    'magnific-popup.min.css': 'magnific-popup.js (CSS)',
    'pagination.min.css': 'Pagination.js (CSS)',
    'pagination.min.jsm': 'Pagination.js (JS)',
    'bootstrap-table.min.jsm': 'Bootstrap Table (JS)',
    'bootstrap-table.min.css': 'Bootstrap Table (CSS)',
    'jquery.matchHeight-min.jsm': 'jquery.matchHeight.js',
    'iscroll.min.jsm': 'iScroll',
    'drawer.min.jsm': 'Drawer (JS)',
    'drawer.min.css': 'Drawer (CSS)',
    'lightgallery-all.min.jsm': 'lightGallery (JS)',
    'lightgallery.min.css': 'lightGallery (CSS)',
    'sodium.min.jsm': 'libsodium.js',
    'polyfill.min.jsm': 'Babel Polyfill',
    'video-js.min.css': 'Video.js (CSS)',
    'video.min.jsm': 'Video.js (JS)',
    'cookieconsent.min.css': 'Cookie Consent (CSS)',
    'cookieconsent.min.jsm': 'Cookie Consent (JS)',
    'markdown-it.min.jsm': 'markdown-it',
    'vue-i18n.min.jsm': 'Vue.js (i18n)',
    'v4-shims.min.css': 'Font Awesome (Shim)',
    'instantsearch.production.min.jsm': 'InstantSearch.js',
    'redux.min.jsm': 'Redux',
    'react-side-effect.min.jsm': 'react-side-effect',
    'react-router.min.jsm': 'react router',
    'react-redux.min.jsm': 'react redux',
    'react-lifecycles-compat.min.jsm': 'react lifecycles compat',
    'prop-types.min.jsm': 'prop-types',
    'history.min.jsm': 'history',
    'axios.min.jsm': 'Axios',
    'object-assign.min.jsm': 'Object assign',
    'slick-lightbox.css': 'slick-lightbox CSS',
    'slick-lightbox.min.jsm': 'slick-lightbox JS',
    'noframework.waypoints.min.jsm': 'Waypoints (Bundle)',
    'jquery.waypoints.min.jsm': 'Waypoints (Bundle)',
    'waypoints.debug.jsm': 'Waypoints (Bundle)',
    'zepto.waypoints.min.jsm': 'Waypoints (Bundle)',
    'shortcuts/infinite.min.jsm': 'Waypoints (Bundle)',
    'shortcuts/inview.min.jsm': 'Waypoints (Bundle)',
    'shortcuts/sticky.min.jsm': 'Waypoints (Bundle)',
    'anchor.min.jsm': 'AnchorJS',
    'jquery.easing.min.jsm': 'jQuery Easing Plugin',
    'baguetteBox.min.jsm': 'baguetteBox.js (JS)',
    'baguetteBox.min.css': 'baguetteBox.js (CSS)',
    'videojs-seek-buttons.min.css': 'Videojs seek buttons (CSS)',
    'videojs-seek-buttons.min.jsm': 'Videojs seek buttons (JS)',
    'p2p-media-loader-hlsjs.min.jsm': 'P2P Media Loader Hls.js',
    'bootstrap-toggle.min.jsm': 'Bootstrap Toggle (JS)',
    'bootstrap2-toggle.min.jsm': 'Bootstrap2 Toggle (JS)',
    'bootstrap-toggle.min.css': 'Bootstrap Toggle (CSS)',
    'bootstrap2-toggle.min.css': 'Bootstrap2 Toggle (CSS)',
    'vue-resource.min.jsm': 'vue-resource',
    'jquery.lazy.min.jsm': 'jQuery Lazy (Bundle)',
    'jquery.lazy.plugins.min.jsm': 'jQuery Lazy (Bundle)',
    'jquery.lazy.ajax.min.jsm': 'jQuery Lazy (Bundle)',
    'jquery.lazy.av.min.jsm': 'jQuery Lazy (Bundle)',
    'jquery.lazy.iframe.min.jsm': 'jQuery Lazy (Bundle)',
    'jquery.lazy.noop.min.jsm': 'jQuery Lazy (Bundle)',
    'jquery.lazy.picture.min.jsm': 'jQuery Lazy (Bundle)',
    'jquery.lazy.script.min.jsm': 'jQuery Lazy (Bundle)',
    'jquery.lazy.vimeo.min.jsm': 'jQuery Lazy (Bundle)',
    'jquery.lazy.youtube.min.jsm': 'jQuery Lazy (Bundle)',
    'fa-loader.jsm': 'Font Awesome CSS (WFL)',
    'fa-loader.css': 'Font Awesome JS (WFL)',
    'jquery.tooltipster.min.jsm': 'Tooltipster',
    'jquery.jscrollpane.min.jsm': 'jScrollPane',
    'stickyfill.min.jsm': 'Stickyfill',
    'jquery.mousewheel.min.jsm': 'jQuery Mousewheel',
    'a1f20be65b.css': 'Font Awesome (CSS)',
    'a1f20be65b.jsm': 'Font Awesome (JS)',
    'owl.transitions.min.css': 'OwlCarousel (CSS Transitions)',
    'owl.theme.min.css': 'OwlCarousel (CSS Theme)',
    'owl.carousel.min.css': 'OwlCarousel (CSS)',
    'owl.carousel.min.jsm': 'OwlCarousel (JS)',
    'bootstrap-datepicker3.standalone.min.css': 'Bootstrap Datepicker 3 (CSS)',
    'jets.min.jsm': 'Jets.js',
    'lazyload.min.jsm': 'Vanilla Lazyload',
    'materialize.min.jsm': 'Materialize (JS)',
    'materialize.min.css': 'Materialize (CSS)',
    'slick.min.jsm': 'slick (JS)',
    'slick.min.css': 'slick (CSS)',
    'slick-theme.min.css': 'slick (Theme)',
    'google-material-design-icons.css': 'Google Material Icons',
    'Chart.bundle.min.jsm': 'Chart.js (JS)',
    'Chart.min.css': 'Chart.js (CSS)',
    'bootbox.min.jsm': 'BootboxJS',
    'bootstrap3-typeahead.min.jsm': 'Bootstrap 3 Typeahead',
    'libphonenumber-js.min.jsm': 'libphonenumber-js',
    'showdown.min.jsm': 'Showdown',
    'angular-ui-utils.min.jsm': 'Angular UI Utils',
    'bootstrap-colorpicker-module.min.jsm': 'Angular Bootstrap Colorpicker (JS)',
    'colorpicker.min.css': 'Angular Bootstrap Colorpicker (CSS)',
    'ethjs.min.jsm': 'ethjs',
    'adapter.min.jsm': 'WebRTC adapter',
    'algoliasearch.min.jsm': 'AlgoliaSearch',
    'algoliasearch3.33.0_algoliasearchLite_algoliasearchHelper.jsm': 'jsDelivr combined',
    'all.min.css': 'Font Awesome (CSS)',
    'all.min.jsm': 'Font Awesome (JS)',
    'angucomplete-alt.min.jsm': 'AngulComplete',
    'angular-animate.min.jsm': 'AngularJS Animate',
    'angular-aria.min.jsm': 'AngularJS Aria',
    'angular-cookies.min.jsm': 'AngularJS Cookies',
    'angular-loader.min.jsm': 'AngularJS Loader',
    'angular-material.min.css': 'AngularJS Material Design',
    'angular-material.min.jsm': 'AngularJS Material Design',
    'angular-message-format.min.jsm': 'AngularJS Message Format',
    'angular-messages.min.jsm': 'AngularJS Messages',
    'angular-parse-ext.min.jsm': 'AngularJS ParseExt',
    'angular-payments.jsm': 'Angular Payments',
    'angular-resource.min.jsm': 'AngularJS Resource',
    'angular-route.min.jsm': 'AngularJS Route',
    'angular-sanitize.min.jsm': 'AngularJS Sanitize',
    'angular-stripe-checkout.min.jsm': 'Angular Stripe Checkout',
    'angular-touch.min.jsm': 'AngularJS Touch',
    'angular-ui-router.min.jsm': 'Angular UI Router',
    'angular.min.jsm': 'Angular (JS)',
    'animate.min.css': 'Animate (CSS)',
    'autocomplete.min.jsm': 'autocomplete.js',
    'backbone-min.jsm': 'Backbone.js',
    'bootstrap-datepicker.min.jsm': 'Bootstrap Datepicker (JS)',
    'bootstrap-datepicker.standalone.min.css': 'Bootstrap Datepicker (CSS)',
    'bootstrap-select.min.css': 'Bootstrap-select (CSS)',
    'bootstrap-select.min.jsm': 'Bootstrap-select (JS)',
    'bootstrap-slider.min.css': 'bootstrap-slider (CSS)',
    'bootstrap-slider.min.jsm': 'bootstrap-slider (JS)',
    'bootstrap.min.css': 'Bootstrap (CSS)',
    'bootstrap.min.jsm': 'Bootstrap (JS)',
    'clipboard.min.jsm': 'clipboard.js',
    'd3-legend.min.jsm': 'D3.js Legend',
    'd3.min.jsm': 'D3.js',
    'daterangepicker.min.jsm': 'Bootstrap Daterangepicker',
    'dojo.jsm': 'Dojo',
    'ember.min.jsm': 'Ember.js',
    'ext-core.jsm': 'Ext Core',
    'flv.min.jsm': 'flv.js',
    'font-awesome.min.css': 'Font Awesome',
    'hls.min.jsm': 'hls.js',
    'jquery-migrate.min.jsm': 'jQuery Migrate',
    'jquery-ui.min.css': 'jQuery UI Themes',
    'jquery-ui.min.jsm': 'jQuery UI',
    'jquery.autocomplete.min.jsm': 'jQuery Ajax AutoComplete',
    'jquery.blockUI.min.jsm': 'jQuery Block UI',
    'jquery.csv.min.jsm': 'jQuery-csv',
    'jquery.fancybox-media.jsm': 'fancyBox Media (JS)',
    'jquery.fancybox.min.css': 'fancyBox (CSS)',
    'jquery.fancybox.min.jsm': 'fancyBox (JS)',
    'jquery.jeditable.min.jsm': 'jQuery Validation Plugin',
    'jquery.lazyload.min.jsm': 'jQuery Lazy Load',
    'jquery.min.jsm': 'jQuery',
    'jquery.mobile.min.jsm': 'jQuery Mobile',
    'jquery.modal.min.css': 'jQuery Modal',
    'jquery.modal.min.jsm': 'jQuery Modal',
    'jquery.tablesorter.min.jsm': 'jQuery Tablesorter',
    'jquery.urlive.min.jsm': 'jQuery URLive',
    'jquery.validate.min.jsm': 'jQuery jeditable',
    'js.cookie.min.jsm': 'JavaScript Cookie',
    'jsdelivr-combine-jquery-hogan-algoliasearch-autocomplete.jsm': 'jsDelivr combined',
    'lazysizes.min.jsm': 'lazysizes',
    'lodash.min.jsm': 'Lodash',
    'lozad.min.jsm': 'lozad.js',
    'mdb.min.css': 'MDBootstrap (CSS)',
    'mdb.min.jsm': 'MDBootstrap (JS)',
    'modernizr.min.jsm': 'Modernizr',
    'moment-with-locales.min.jsm': 'Moment.js',
    'mootools-yui-compressed.jsm': 'MooTools',
    'nv.d3.min.css': 'NVD3 (CSS)',
    'nv.d3.min.jsm': 'NVD3 (JS)',
    'ocLazyLoad.min.jsm': 'ocLazyLoad',
    'p2p-media-loader-core.min.jsm': 'P2P Media Loader Core',
    'page.min.jsm': 'page.js',
    'plyr.min.css': 'plyr (CSS)',
    'plyr.min.jsm': 'plyr (JS)',
    'plyr.svg': 'plyr (SVG)',
    'popper.min.jsm': 'Popper',
    'prototype.min.jsm': 'Prototype',
    'prototype.jsm': 'Prototype',
    'raven.min.jsm': 'Raven.js',
    'react-dom.production.min.jsm': 'ReactDOM',
    'react.production.min.jsm': 'React',
    'rickshaw.min.css': 'rickshaw (CSS)',
    'rickshaw.min.jsm': 'rickshaw (JS)',
    'rocket-loader.min.jsm': 'Rocket Loader',
    'rzslider.min.jsm': 'AngularJS slider',
    'scriptaculous.jsm': 'Scriptaculous',
    'select.min.jsm': 'AngularJS ui-select',
    'select2.full.min.jsm': 'Select2 (JS)',
    'select2.min.css': 'Select2 (CSS)',
    'simplemde.min.css': 'simplemde (CSS)',
    'simplemde.min.jsm': 'simplemde (JS)',
    'socket.io.min.jsm': 'Socket.IO',
    'spin.min.jsm': 'spin.js',
    'store.legacy.min.jsm': 'Store.js',
    'swfobject.jsm': 'SWFObject',
    'swiper.min.css': 'Swiper (CSS)',
    'swiper.min.jsm': 'Swiper (JS)',
    'tether.min.jsm': 'Tether (JS)',
    'toaster.min.css': 'AngularJS Toaster (CSS)',
    'toaster.min.jsm': 'AngularJS Toaster (JS)',
    'toastr.min.css': 'toastr.js',
    'toastr.min.jsm': 'toastr.js',
    'ui-bootstrap-tpls.min.jsm': 'Angular UI Bootstrap',
    'ui-bootstrap.min.jsm': 'Angular UI Bootstrap',
    'underscore-min.jsm': 'Underscore.js',
    'urlize.jsm': 'urlize',
    'vue.min.jsm': 'Vue.js',
    'webcomponents-loader.min.jsm': 'WebComponents Loader (JS)',
    'webfontloader.jsm': 'Web Font Loader',
    'wow.min.jsm': 'WOW'
};
