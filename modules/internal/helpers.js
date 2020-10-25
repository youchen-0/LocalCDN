/**
 * Internal Helper Module
 * Belongs to LocalCDN (since 2020-02-26)
 * (Origin: Decentraleyes)
 *
 * @author      Thomas Rientjes
 * @since       2017-10-26
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
 * Helpers
 */

var helpers = {};

/**
 * Public Methods
 */

helpers.insertI18nContentIntoDocument = function (document) {
    let scriptDirection, i18nElements, translationComplete;

    translationComplete = true;
    scriptDirection = helpers.determineScriptDirection(navigator.language);
    i18nElements = document.querySelectorAll('[data-i18n-content]');

    i18nElements.forEach(function (i18nElement) {
        let i18nMessageName = i18nElement.getAttribute('data-i18n-content');

        if (chrome.i18n.getMessage(i18nMessageName) !== '') {
            if (i18nElement.type === 'button') {
                i18nElement.value = chrome.i18n.getMessage(i18nMessageName);
            } else {
                i18nElement.innerText = chrome.i18n.getMessage(i18nMessageName);
            }
            i18nElement.setAttribute('dir', scriptDirection);
        } else {
            translationComplete = false;
        }
    });

    return translationComplete;
};

helpers.insertI18nTitlesIntoDocument = function (document) {
    let scriptDirection, i18nElements;

    scriptDirection = helpers.determineScriptDirection(navigator.language);
    i18nElements = document.querySelectorAll('[data-i18n-title]');

    i18nElements.forEach(function (i18nElement) {
        let i18nMessageName = i18nElement.getAttribute('data-i18n-title');

        i18nElement.setAttribute('title', chrome.i18n.getMessage(i18nMessageName));
        i18nElement.setAttribute('dir', scriptDirection);
    });
};

helpers.languageIsFullySupported = function (language) {
    let languageSupported, supportedLanguages;

    languageSupported = false;

    supportedLanguages = [
        'ar',
        'bg',
        'zh',
        'cs',
        'da',
        'nl',
        'en',
        'eo',
        'et',
        'fi',
        'fr',
        'de',
        'el',
        'he',
        'hu',
        'is',
        'id',
        'it',
        'ja',
        'ko',
        'nb',
        'pl',
        'pt',
        'ro',
        'ru',
        'es',
        'sv',
        'tr',
    ];

    for (let supportedLanguage of supportedLanguages) {
        if (language.search(supportedLanguage) !== -1) {
            languageSupported = true;
        }
    }

    return languageSupported;
};

helpers.normalizeDomain = function (domain) {
    domain = domain.toLowerCase().trim();

    if (domain.startsWith(Address.WWW_PREFIX)) {
        domain = domain.slice(Address.WWW_PREFIX.length);
    }

    return domain;
};

helpers.extractDomainFromUrl = function (url, normalize) {
    if (/^(?!(http[s]?|file):\/\/).*/.test(url)) {
        return null;
    }

    let extractedDomain;

    try {
        extractedDomain = new URL(url).host;
    } catch (exception) {
        extractedDomain = null;
    }

    if (url.startsWith(Address.CHROME)) {
        extractedDomain = null;
    }

    if (extractedDomain === '') {
        extractedDomain = null;
    }

    if (extractedDomain !== null && normalize === true) {
        extractedDomain = helpers.normalizeDomain(extractedDomain);
    }

    return extractedDomain;
};

helpers.extractFilenameFromPath = function (path) {
    let pathSegments, filename;

    pathSegments = path.split('/');
    filename = pathSegments[pathSegments.length - 1];

    return filename;
};

helpers.generateRandomHexString = function (length) {
    let randomValues, randomHexString;

    randomValues = crypto.getRandomValues(new Uint8Array(length));
    randomHexString = '';

    for (let value of randomValues) {
        // eslint-disable-next-line no-bitwise
        let hexValue = (0 ^ (value & (15 >> (0 / 4)))).toString(16);
        randomHexString += hexValue;
    }

    return randomHexString;
};

helpers.determineCdnName = function (domainName) {
    switch (domainName) {
        case 'ajax.googleapis.com':
            return 'Google Hosted Libraries';
        case 'ajax.aspnetcdn.com':
            return 'Microsoft Ajax CDN';
        case 'ajax.microsoft.com':
            return 'Microsoft Ajax CDN [Deprecated]';
        case 'cdnjs.cloudflare.com':
            return 'CDNJS (Cloudflare)';
        case 'code.jquery.com':
            return 'jQuery CDN (MaxCDN)';
        case 'cdn.jsdelivr.net':
            return 'jsDelivr (Cloudflare)';
        case 'yastatic.net':
            return 'Yandex CDN';
        case 'yandex.st':
            return 'Yandex CDN [Deprecated]';
        case 'apps.bdimg.com':
            return 'Baidu CDN';
        case 'libs.baidu.com':
            return 'Baidu CDN [Deprecated]';
        case 'lib.sinaapp.com':
            return 'Sina Public Resources';
        case 'upcdn.b0.upaiyun.com':
            return 'UpYun Library';
        case 'cdn.bootcss.com':
            return 'BootCDN #1';
        case 'sdn.geekzu.org':
            return 'Geekzu Public Service [Mirror]';
        case 'ajax.proxy.ustclug.org':
            return 'USTC Linux User Group [Mirror]';
        case 'unpkg.com':
            return 'UNPKG (Cloudflare)';
        case 'stackpath.bootstrapcdn.com':
            return 'StackPath BootstrapCDN';
        case 'maxcdn.bootstrapcdn.com':
            return 'MaxCDN Bootstrap CDN';
        case 'use.fontawesome.com':
            return 'Font Awesome CDN';
        case 'ajax.cloudflare.com':
            return 'Cloudflare CDN';
        case 'akamai-webcdn.kgstatic.net':
            return 'Akamai WebCDN';
        case 'netdna.bootstrapcdn.com':
            return 'NetDNA';
        case 'pagecdn.io':
            return 'PageCDN';
        case 'fonts.googleapis.com':
            return 'Google Fonts';
        case 'gitcdn.github.io':
            return 'GitHub';
        case 'cdn.bootcdn.net':
            return 'BootCDN #2';
        default:
            return 'Unknown';
    }
};

helpers.determineResourceName = function (filename) {
    if (filename in ListOfFiles) {
        return ListOfFiles[filename];
    }
    return 'Unknown';
};

helpers.determineBundle = function (path = '') {
    if (path.includes('findify')) {
        return 'Findify';
    } else if (path.includes('bootstrap-datepicker')) {
        return 'Bootstrap Datepicker';
    } else if (path.includes('/jquery.lazy/')) {
        return 'jQuery Lazy';
    } else if (path.includes('/waypoints/')) {
        return 'Waypoints';
    } else if (path.includes('/highlight.js/')) {
        return 'highlight.js';
    } else if (path.includes('/element-ui/')) {
        return 'ElementUI';
    } else {
        return '';
    }
};

helpers.determineScriptDirection = function (language) {
    let rightToLeftLanguages, scriptDirection;

    rightToLeftLanguages = ['ar', 'he'];

    if (rightToLeftLanguages.indexOf(language) === -1) {
        scriptDirection = 'ltr';
    } else {
        scriptDirection = 'rtl';
    }

    return scriptDirection;
};

helpers.formatNumber = function (number) {
    if (typeof number === 'number') {
        return number.toLocaleString();
    }
};

helpers.formatVersion = function (version) {
    if (version.indexOf('beta') === -1) {
        return version;
    } else {
        return 'BETA';
    }
};

helpers.formatFilename = function (targetPath) {
    if (targetPath.startsWith('resources/element-ui/')) {
        targetPath = targetPath.toLowerCase();
        if (!targetPath.endsWith('.min.jsm')) {
            targetPath = targetPath.replace('.jsm', '.min.jsm');
        }
    }
    return targetPath;
};

helpers.setLastVersion = function (type, version) {
    /**
     * If-Else-If is the fastest way.
     * Measurement results:
     * Switch-Case (with Regex): 0-8ms (Average ~4ms)
     * If-Else-If:               0-5ms (Average <1ms)
     */

    if (version !== null && version !== undefined) {
        version = version.toString();
    }
    if (type.includes('/algoliasearch/3.')) {
        return '3.35.1';
    } else if (type.includes('/anchor-js/3.')) {
        return '3.2.2';
    } else if (type.includes('/anchor-js/4.')) {
        return '4.2.2';
    } else if (type.includes('/angularjs/1.')) {
        if (helpers.compareVersion('1.2.19', version)) return '1.2.19'; // <= v1.2.19
        else if (helpers.compareVersion('1.2.32', version)) return '1.2.32'; // > 1.2.19 to <= v1.2.32
        else if (helpers.compareVersion('1.3.20', version)) return '1.3.20'; // > 1.2.32 to <= 1.3.20
        else if (helpers.compareVersion('1.4.14', version)) return '1.4.14'; // > 1.3.20 to <= 1.4.14
        else if (helpers.compareVersion('1.5.11', version)) return '1.5.11'; // > 1.4.14 to <= 1.5.11
        else if (helpers.compareVersion('1.6.10', version)) return '1.6.10'; // > 1.5.11 to <= 1.6.10
        else return '1.7.9'; // >= 1.6.11
    } else if (type.includes('/angularjs-slider/6.')) {
        return '6.7.0';
    } else if (type.includes('/angularjs-toaster/2.')) {
        return '2.2.0';
    } else if (type.includes('/angularjs-toaster/0.')) {
        return '0.4.18';
    } else if (type.includes('/angular-bootstrap-colorpicker/3.')) {
        return '3.0.32';
    } else if (type.includes('/angular-payments@1.')) {
        return '1.0.7';
    } else if (type.includes('/angular-stripe-checkout@5.')) {
        return '5.1.0';
    } else if (type.includes('/angular-ui-bootstrap/')) {
        if (helpers.compareVersion('0.10.0', version)) return '0.10.0'; // <= v0.10.0
        else if (helpers.compareVersion('0.14.3', version)) return '0.14.3'; // > 0.10.0 <= v0.14.3
        return '1.3.3'; // > v0.14.0
    } else if (type.includes('/angular-ui-router/')) {
        if (helpers.compareVersion('0.4.3', version)) return '0.4.3'; // <= 0.4.3
        else return '1.0.25'; // > 0.4.3
    } else if (type.includes('/angular-ui-utils/0.')) {
        return '0.1.1';
    } else if (type.includes('/angular-ui-select/0.')) {
        return '0.20.0';
    } else if (type.includes('/angular-sanitize/1.')) {
        return '1.7.9';
    } else if (type.includes('/angucomplete-alt/3.')) {
        return '3.0.0';
    } else if (type.includes('/animate.css/3.')) {
        return '3.7.2';
    } else if (type.includes('/autocomplete.js/')) {
        return '0.37.1';
    } else if (type.includes('/angular-material/1.')) {
        return '1.1.21';
    } else if (type.includes('/angular-material/0.')) {
        return '1.1.21';
    } else if (type.includes('/angular-translate/2.')) {
        return '2.7.2';
    } else if (type.includes('/angular-translate-loader-static-files/2.')) {
        return '2.7.2';
    } else if (type.includes('/angular-translate-interpolation-messageformat/2.')) {
        return '2.7.2';
    } else if (type.includes('/axios/0.')) {
        return '0.20.0';
    } else if (type.includes('/backbone.js/0.')) {
        return '0.9.10';
    } else if (type.includes('/backbone.js/1.')) {
        return '1.4.0';
    } else if (type.includes('/baguettebox.js/1.')) {
        return '1.11.1';
    } else if (type.includes('/bootbox.js/4.')) {
        return '4.4.0';
    } else if (type.includes('/bootstrap/3.')) {
        return '3.3.7';
    } else if (type.includes('/bootstrap/4.')) {
        return '4.5.3';
    } else if (type.includes('/bootstrap-daterangepicker/2.')) {
        return '2.1.27';
    } else if (type.includes('/bootstrap-datepicker/1.')) {
        return '1.9.0';
    } else if (type.includes('/bootstrap-slider/10.')) {
        return '10.6.2';
    } else if (type.includes('/bootstrap-select/1.')) {
        return '1.13.17';
    } else if (type.includes('/bootstrap-toggle/2.')) {
        return '2.2.2';
    } else if (type.includes('/bootstrap-3-typeahead/4.')) {
        return '4.0.2';
    } else if (type.includes('/chart.js/2.')) {
        return '2.9.4';
    } else if (type.includes('/clipboard.js/1.')) {
        return '1.7.1';
    } else if (type.includes('/clipboard.js/2.')) {
        return '2.0.6';
    } else if (type.includes('/cookieconsent2/3.')) {
        return '3.1.1';
    } else if (type.includes('/d3/3.')) {
        return '3.5.17';
    } else if (type.includes('/d3-legend/2.')) {
        return '2.25.6';
    } else if (type.includes('/dojo/1.')) {
        return '1.14.1';
    } else if (type.includes('/element-ui/2.')) {
        return '2.13.2';
    } else if (type.includes('/ember.js/1.')) {
        return '1.13.13';
    } else if (type.includes('/ember.js/2.')) {
        return '2.18.2';
    } else if (type.includes('/ember.js/3.')) {
        return '3.12.3';
    } else if (type.includes('/ethjs')) {
        return '0.3.4';
    } else if (type.includes('/ext-core/3.')) {
        return '3.1.0';
    } else if (type.includes('findify')) {
        return '6.9.15';
    } else if (type.includes('/fancybox/2.')) {
        return '2.1.5';
    } else if (type.includes('/fancybox/3.')) {
        return '3.5.7';
    } else if (type.includes('/flv.js/')) {
        return '1.5.0';
    } else if (type.includes('/fontawesome/3.')) {
        return '3.2.1';
    } else if (type.includes('/fontawesome/4.')) {
        return '4.7.0';
    } else if (type.includes('/fontawesome/5.')) {
        return '5.15.1';
    } else if (type.includes('/highlight.js/10.')) {
        return '10.3.1';
    } else if (type.includes('/highlight.js/9.')) {
        return '9.18.3';
    } else if (type.includes('/history/')) {
        return '4.10.1';
    } else if (type.includes('/hls.js/')) {
        return '0.13.2';
    } else if (type.includes('/instantsearch.js/3.')) {
        return '3.7.0';
    } else if (type.includes('/instantsearch.js/4.')) {
        return '4.8.1';
    } else if (type.includes('/jets/0.')) {
        return '0.14.1';
    } else if (type.includes('/jquery/1.')) {
        if (helpers.compareVersion('1.7.1', version)) return '1.7.1'; // <= v1.7.1
        else if (helpers.compareVersion('1.8.3', version)) return '1.8.3'; // > 1.7.1 to <= 1.8.3
        else return '1.12.4'; // >= 1.8.4
    } else if (type.includes('/jquery/1.8.')) {
        return '1.8.3';
    } else if (type.includes('/jquery/2.')) {
        return '2.2.4';
    } else if (type.includes('/jquery/3.') || type.includes('/jquery/null')) {
        return '3.5.1';
    } else if (type.includes('/jquery.devbridge-autocomplete/1.')) {
        return '1.4.10';
    } else if (type.includes('/jqueryui/1.')) {
        if (helpers.compareVersion('1.8.24', version)) return '1.8.24'; // <= v1.8.24
        else return '1.12.1'; // >= 1.8.19
    } else if (type.includes('/jquery.blockUI/2.')) {
        return '2.70';
    } else if (type.includes('/jquery-csv/1.')) {
        return '1.0.9';
    } else if (type.includes('/jquery-easing/1.')) {
        return '1.4.1';
    } else if (type.includes('/jquery.lazyload/1.')) {
        return '1.9.1';
    } else if (type.includes('/jquery.lazy/1.')) {
        return '1.7.11';
    } else if (type.includes('/jquery-migrate/1.')) {
        return '1.4.1';
    } else if (type.includes('/jquery-migrate/3.')) {
        return '3.1.0';
    } else if (type.includes('/jquery-mousewheel/3.')) {
        return '3.1.13';
    } else if (type.includes('/jScrollPane/2.')) {
        return '2.2.2';
    } else if (type.includes('/jquery-validate/1.')) {
        return '1.19.1';
    } else if (type.includes('/jquery-jeditable/1.')) {
        return '1.8.0';
    } else if (type.includes('tablesorter/2.')) {
        return '2.31.3';
    } else if (type.includes('/jquery-modal/0.')) {
        return '0.9.2';
    } else if (type.includes('/mobile/1.')) {
        return '1.4.5';
    } else if (type.includes('/nvd3/1.')) {
        return '1.8.6';
    } else if (type.includes('/js-cookie/2.')) {
        return '2.2.1';
    } else if (type.includes('/lazysizes/4.')) {
        return '4.1.8';
    } else if (type.includes('/libphonenumber-js/1.')) {
        return '1.7.53';
    } else if (type.includes('/lodash.js/4.')) {
        return '4.17.10';
    } else if (type.includes('/lodash.js/3.')) {
        return '3.10.1';
    } else if (type.includes('lozad')) {
        return '1.14.0';
    } else if (type.includes('/markdown-it/')) {
        return '12.0.2';
    } else if (type.includes('/mdbootstrap/4.')) {
        return '4.18.0';
    } else if (type.includes('/materialize/1.')) {
        return '1.0.0';
    } else if (type.includes('/materialize/0.')) {
        if (helpers.compareVersion('0.97.8', version)) return '0.97.8'; // <= v0.97.8
        return '0.100.2';
    } else if (type.includes('/modernizr/2.')) {
        return '2.8.3';
    } else if (type.includes('/moment.js/2.')) {
        return '2.29.1';
    } else if (type.includes('/mootools/1.')) {
        if (helpers.compareVersion('1.4.5', version)) return '1.4.5'; // <= v1.4.5
        else return '1.6.0'; // > 1.4.5
    } else if (type.includes('/object-assign@4.')) {
        return '4.1.1';
    } else if (type.includes('/oclazyload/1.')) {
        return '1.1.0';
    } else if (type.includes('/owl-carousel/2.')) {
        return '2.3.4';
    } else if (type.includes('/owl-carousel/1.')) {
        return '1.3.3';
    } else if (type.includes('p2p-media-loader-core') || type.includes('p2p-media-loader-hlsjs')) {
        return '0.6.2';
    } else if (type.includes('/page.js/1.')) {
        return '1.7.1';
    } else if (type.includes('/plyr/3.')) {
        return '3.5.10';
    } else if (type.includes('/popper.js/1.')) {
        return '1.16.1';
    } else if (type.includes('/popper.js/2.')) {
        return '2.5.3';
    } else if (type.includes('/prop-types/15.')) {
        return '15.7.2';
    } else if (type.includes('/prototype/1.')) {
        return '1.7.3.0';
    } else if (type.includes('/raven.js/3.')) {
        return '3.26.2';
    } else if (type.includes('/react/16.')) {
        return '16.13.1';
    } else if (type.includes('/react-dom/16.')) {
        return '16.13.1';
    } else if (type.includes('/react-redux/7.')) {
        return '7.2.1';
    } else if (type.includes('/react-router/5.')) {
        return '5.2.0';
    } else if (type.includes('/react-side-effect/')) {
        return '2.1.0';
    } else if (type.includes('/react-lifecycles-compat/')) {
        return '3.0.4';
    } else if (type.includes('/redux/4.')) {
        return '4.0.5';
    } else if (type.includes('/rickshaw/1.')) {
        return '1.6.6';
    } else if (type.includes('/scriptaculous/1.')) {
        return '1.9.0';
    } else if (type.includes('/select2/4.')) {
        return '4.0.12';
    } else if (type.includes('/showdown/1.')) {
        return '1.9.1';
    } else if (type.includes('/showdown/0.')) {
        return '0.5.1';
    } else if (type.includes('/simplemde/')) {
        return '1.11.2';
    } else if (type.includes('/slick-carousel/1.')) {
        return '1.9.0';
    } else if (type.includes('/slick-lightbox/0.')) {
        return '0.2.12';
    } else if (type.includes('/socket.io/2.')) {
        return '2.3.0';
    } else if (type.includes('/spin.js/2.')) {
        return '2.3.2';
    } else if (type.includes('/stickyfill/1.')) {
        return '1.1.4';
    } else if (type.includes('/stickyfill/2.')) {
        return '2.1.0';
    } else if (type.includes('/store.js/2.')) {
        return '2.0.4';
    } else if (type.includes('/swfobject/2.')) {
        return '2.2';
    } else if (type.includes('/swiper/4.')) {
        return '4.5.1';
    } else if (type.includes('/swiper/5.')) {
        return '5.4.2';
    } else if (type.includes('/tether/1.')) {
        return '1.4.7';
    } else if (type.includes('/tooltipster/3.')) {
        return '3.3.0';
    } else if (type.includes('/toastr.js/2.')) {
        return '2.1.4';
    } else if (type.includes('/underscore.js/1.')) {
        return '1.11.0';
    } else if (type.includes('/urlive/1.')) {
        return '1.1.1';
    } else if (type.includes('/vanilla-lazyload')) {
        return '17.1.0';
    } else if (type.includes('/videojs-seek-buttons/')) {
        return '1.6.0';
    } else if (type.includes('/vue/1.')) {
        return '1.0.28';
    } else if (type.includes('/vue/2.')) {
        return '2.6.12';
    } else if (type.includes('/vue-i18n/8.')) {
        return '8.22.1';
    } else if (type.includes('/vue-resource/1.')) {
        return '1.5.1';
    } else if (type.includes('/waypoints/4.')) {
        return '4.0.1';
    } else if (type.includes('webfont')) {
        return '1.6.28';
    } else if (type.includes('/webrtc-adapter/6.')) {
        return '6.4.8';
    } else if (type.includes('/wow/1.')) {
        return '1.1.2';
    } else if (version === null) {
        return 'latest';
    }
};

helpers.compareVersion = function (v1, v2) {
    /**
     *  compareVersion( '1.5.7' , '1.5.8' ) is TRUE
     *  compareVersion( '1.5.8' , '1.5.7' ) is FALSE
     *  compareVersion( '1.5.7' , '1.5.7' ) is TRUE
     */
    v1 = v1.split('.');
    v2 = v2.split('.');
    const k = Math.min(v1.length, v2.length);
    for (let i = 0; i < k; ++i) {
        v1[i] = parseInt(v1[i], 10);
        v2[i] = parseInt(v2[i], 10);
        if (v1[i] > v2[i]) return true;
        if (v1[i] < v2[i]) return false;
    }
    return v1.length == v2.length ? true : v1.length < v2.length ? false : true;
};

const ListOfFiles = {
    'cookieconsent.min.css': 'Cookie Consent (CSS)',
    'cookieconsent.min.jsm': 'Cookie Consent (JS)',
    'markdown-it.min.jsm': 'markdown-it',
    'vue-i18n.min.jsm': 'Vue.js (i18n)',
    'v4-shims.css': 'Font Awesome (Shim)',
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
    'angular-translate.min.jsm': 'Angular Translate',
    'angular-translate-interpolation-messageformat.min.jsm': 'Angular Translate Interpolation Messageformat',
    'angular-translate-loader-static-files.min.jsm': 'Angular Translate Load Static Files',
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
    'angular-stripe-checkout.jsm': 'Angular Stripe Checkout',
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
    'popper.min.jsm': 'Popper',
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
    'socket.io.jsm': 'Socket.IO',
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
    'webcomponents-loader.jsm': 'WebComponents Loader (JS)',
    'webfontloader.jsm': 'Web Font Loader',
    'wow.min.jsm': 'WOW'
};
