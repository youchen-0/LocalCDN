/**
 * Global Constants
 * Belongs to LocalCDN (since 2020-02-26)
 * (Origin: Decentraleyes)
 *
 * @author      Thomas Rientjes
 * @since       2017-10-27
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
 * Constants
 */

const Address = {
    'ANY': '*://*/*',
    'ANY_PATH': '/*',
    'ANY_PROTOCOL': '*://',
    'CHROME': 'chrome:',
    'CHROME_EXTENSION': 'chrome-extension:',
    'LOCALCDN': 'localcdn.org',
    'EXAMPLE': 'example.org',
    'HTTP': 'http:',
    'HTTPS': 'https:',
    'RESOURCE_PATH': '/resources',
    'ROOT_PATH': '/',
    'WWW_PREFIX': 'www.'
};

const Environment = {
    'STABLE': 'stable',
    'STAGING': 'staging'
};

const Header = {
    'COOKIE': 'Cookie',
    'ORIGIN': 'Origin',
    'REFERER': 'Referer'
};

const MessageResponse = {
    'ASYNCHRONOUS': true,
    'SYNCHRONOUS': false
};

const Resource = {
    'MAPPING_EXPRESSION': /\.map$/i,
    'VERSION_EXPRESSION': /(?:\d{1,2}\.){1,3}\d{1,2}/,
    'SINGLE_NUMBER_EXPRESSION': /^\D+\d\D+$/,
    'VERSION_PLACEHOLDER': '{version}'
};

const Setting = {
    'AMOUNT_INJECTED': 'amountInjected',
    'BLOCK_MISSING': 'blockMissing',
    'DISABLE_PREFETCH': 'disablePrefetch',
    'ENFORCE_STAGING': 'enforceStaging',
    'SHOW_ICON_BADGE': 'showIconBadge',
    'HIDE_RELEASE_NOTES': 'hideReleaseNotes',
    'STRIP_METADATA': 'stripMetadata',
    'LAST_MAPPING_UPDATE': 'lastMappingUpdate',
    'WHITELISTED_DOMAINS': 'whitelistedDomains',
    'XHR_TEST_DOMAIN': 'xhrTestDomain',
    'LOGGING': 'enableLogging',
    'DOMAINS_MANIPULATE_DOM': 'domainsManipulateDOM',
    'NEGATE_HTML_FILTER_LIST': 'negateHtmlFilterList',
    'BLOCK_GOOGLE_FONTS': 'blockGoogleFonts',
    'SELECTED_ICON': 'selectedIcon',
    'INTERNAL_STATISTICS': 'internalStatistics',
    'INTERNAL_STATISTICS_DATA': 'internalStatisticsData',
    'ALLOWED_DOMAINS_GOOGLE_FONTS': 'allowedDomainsGoogleFonts',
    'STORAGE_TYPE': 'storageType',
    'BADGE_COLOR': 'badgeColor',
    'BADGE_TEXT_COLOR': 'badgeTextColor'
};

const SettingDefaults = {
    [Setting.ALLOWED_DOMAINS_GOOGLE_FONTS]: {},
    [Setting.AMOUNT_INJECTED]: 0,
    [Setting.BLOCK_GOOGLE_FONTS]: true,
    [Setting.BLOCK_MISSING]: false,
    [Setting.DISABLE_PREFETCH]: true,
    [Setting.DOMAINS_MANIPULATE_DOM]: {},
    [Setting.LOGGING]: false,
    [Setting.ENFORCE_STAGING]: false,
    [Setting.HIDE_RELEASE_NOTES]: false,
    [Setting.INTERNAL_STATISTICS]: false,
    [Setting.INTERNAL_STATISTICS_DATA]: {},
    [Setting.LAST_MAPPING_UPDATE]: '2020-01-01',
    [Setting.NEGATE_HTML_FILTER_LIST]: false,
    [Setting.SELECTED_ICON]: 'Default',
    [Setting.SHOW_ICON_BADGE]: true,
    [Setting.STORAGE_TYPE]: 'local',
    [Setting.STRIP_METADATA]: true,
    [Setting.WHITELISTED_DOMAINS]: {},
    [Setting.XHR_TEST_DOMAIN]: Address.LOCALCDN,
    [Setting.BADGE_COLOR]: '#4A826C',
    [Setting.BADGE_TEXT_COLOR]: '#FFFFFF'
};

const WebRequest = {
    'GET': 'GET',
    'BLOCKING': 'blocking',
    'HEADERS': 'requestHeaders',
    'RESPONSE_HEADERS': 'responseHeaders'
};

const WebRequestType = {
    'MAIN_FRAME': 'main_frame',
    'XHR': 'xmlhttprequest'
};

const Whitelist = {
    'TRIM_EXPRESSION': /^;+|;+$/g,
    'VALUE_SEPARATOR': ';'
};

const BrowserType = {
    'CHROMIUM': chrome.runtime.getURL("/").startsWith("chrome-extension"),
    'FIREFOX': chrome.runtime.getURL("/").startsWith("moz-extension")
};

const IconType = {
    'Default': {
        'Enabled': {
            '16': chrome.runtime.getURL('icons/action/default/icon16-default.png'),
            '18': chrome.runtime.getURL('icons/action/default/icon18-default.png'),
            '19': chrome.runtime.getURL('icons/action/default/icon19-default.png'),
            '32': chrome.runtime.getURL('icons/action/default/icon32-default.png'),
            '36': chrome.runtime.getURL('icons/action/default/icon36-default.png'),
            '38': chrome.runtime.getURL('icons/action/default/icon38-default.png'),
            '64': chrome.runtime.getURL('icons/action/default/icon64-default.png')
        },
        'Disabled': {
            '16': chrome.runtime.getURL('icons/action/default/icon16-disabled.png'),
            '18': chrome.runtime.getURL('icons/action/default/icon18-disabled.png'),
            '19': chrome.runtime.getURL('icons/action/default/icon19-disabled.png'),
            '32': chrome.runtime.getURL('icons/action/default/icon32-disabled.png'),
            '36': chrome.runtime.getURL('icons/action/default/icon36-disabled.png'),
            '38': chrome.runtime.getURL('icons/action/default/icon38-disabled.png'),
            '64': chrome.runtime.getURL('icons/action/default/icon64-disabled.png')
        }
    },
    'Light': {
        'Enabled': {
            '16': chrome.runtime.getURL('icons/action/light/icon16-default.png'),
            '18': chrome.runtime.getURL('icons/action/light/icon18-default.png'),
            '19': chrome.runtime.getURL('icons/action/light/icon19-default.png'),
            '32': chrome.runtime.getURL('icons/action/light/icon32-default.png'),
            '36': chrome.runtime.getURL('icons/action/light/icon36-default.png'),
            '38': chrome.runtime.getURL('icons/action/light/icon38-default.png'),
            '64': chrome.runtime.getURL('icons/action/light/icon64-default.png')
        },
        'Disabled': {
            '16': chrome.runtime.getURL('icons/action/light/icon16-disabled.png'),
            '18': chrome.runtime.getURL('icons/action/light/icon18-disabled.png'),
            '19': chrome.runtime.getURL('icons/action/light/icon19-disabled.png'),
            '32': chrome.runtime.getURL('icons/action/light/icon32-disabled.png'),
            '36': chrome.runtime.getURL('icons/action/light/icon36-disabled.png'),
            '38': chrome.runtime.getURL('icons/action/light/icon38-disabled.png'),
            '64': chrome.runtime.getURL('icons/action/light/icon64-disabled.png')
        }
    },
    'Grey': {
        'Enabled': {
            '16': chrome.runtime.getURL('icons/action/grey/icon16-default.png'),
            '18': chrome.runtime.getURL('icons/action/grey/icon18-default.png'),
            '19': chrome.runtime.getURL('icons/action/grey/icon19-default.png'),
            '32': chrome.runtime.getURL('icons/action/grey/icon32-default.png'),
            '36': chrome.runtime.getURL('icons/action/grey/icon36-default.png'),
            '38': chrome.runtime.getURL('icons/action/grey/icon38-default.png'),
            '64': chrome.runtime.getURL('icons/action/grey/icon64-default.png')
        },
        'Disabled': {
            '16': chrome.runtime.getURL('icons/action/grey/icon16-disabled.png'),
            '18': chrome.runtime.getURL('icons/action/grey/icon18-disabled.png'),
            '19': chrome.runtime.getURL('icons/action/grey/icon19-disabled.png'),
            '32': chrome.runtime.getURL('icons/action/grey/icon32-disabled.png'),
            '36': chrome.runtime.getURL('icons/action/grey/icon36-disabled.png'),
            '38': chrome.runtime.getURL('icons/action/grey/icon38-disabled.png'),
            '64': chrome.runtime.getURL('icons/action/grey/icon64-disabled.png')
        }
    }
};

const Regex = {
    'GOOGLE_FONTS': /fonts\.googleapis\.com\/(css|icons)(?!.*Material\+Icons).*/,
    'GOOGLE_MATERIAL_ICONS': /fonts\.googleapis\.com\/(icon|css)\?family=Material\+Icons/,
    'JSDELIVR_COMBINE': /cdn\.jsdelivr\.net.*\/combine.*jquery.*hogan.*algoliasearch.*autocomplete.*/,
    'BOOTSTRAP_DATEPICKER_3': /\/bootstrap-datepicker3.*\.css/,
    'BOOTSTRAP_DATEPICKER': /\/bootstrap-datepicker.*\.css/,
    'FONT_AWESOME': /use\.fontawesome\.com\/fa-code\.css/,
    'FONT_AWESOME_WITH_CODE': /use\.fontawesome\.com\/[a-z0-9]{10}\.js/
};

const Links = {
    'CODEBERG_HTML_FILTER': 'https://codeberg.org/nobody/LocalCDN/wiki/Blank-websites-or-weird-characters',
    'CODEBERG_RULESET': 'https://codeberg.org/nobody/LocalCDN/wiki/Ruleset-generator-for-your-adblocker',
    'WELCOME': chrome.extension.getURL('pages/welcome/welcome.html'),
    'DONATE': chrome.extension.getURL('pages/donate/donate.html'),
    'CHANGELOG': chrome.extension.getURL('pages/updates/updates.html'),
    'FAQ': chrome.extension.getURL('pages/help/help.html'),
    'STATISTICS': chrome.extension.getURL('pages/statistics/statistics.html')
};

// Supported charsets for TextDecoder()
// https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder/TextDecoder
const EncodingTypes = {
    'unicode-1-1-utf-8': true,
    'utf-8': true,
    'utf8': true,
    '866': true,
    'cp866': true,
    'csibm866': true,
    'ibm866': true,
    'csisolatin2': true,
    'iso-8859-2': true,
    'iso-ir-101': true,
    'iso8859-2': true,
    'iso88592': true,
    'iso_8859-2': true,
    'iso_8859-2:1987': true,
    'l2': true,
    'latin2': true,
    'csisolatin3': true,
    'iso-8859-3': true,
    'iso-ir-109': true,
    'iso8859-3': true,
    'iso88593': true,
    'iso_8859-3': true,
    'iso_8859-3:1988': true,
    'l3': true,
    'latin3': true,
    'csisolatin4': true,
    'iso-8859-4': true,
    'iso-ir-110': true,
    'iso8859-4': true,
    'iso88594': true,
    'iso_8859-4': true,
    'iso_8859-4:1988': true,
    'l4': true,
    'latin4': true,
    'csisolatincyrillic': true,
    'cyrillic': true,
    'iso-8859-5': true,
    'iso-ir-144': true,
    'iso88595': true,
    'iso_8859-5': true,
    'iso_8859-5:1988': true,
    'arabic': true,
    'asmo-708': true,
    'csiso88596e': true,
    'csiso88596i': true,
    'csisolatinarabic': true,
    'ecma-114': true,
    'iso-8859-6': true,
    'iso-8859-6-e': true,
    'iso-8859-6-i': true,
    'iso-ir-127': true,
    'iso8859-6': true,
    'iso88596': true,
    'iso_8859-6': true,
    'iso_8859-6:1987': true,
    'csisolatingreek': true,
    'ecma-118': true,
    'elot_928': true,
    'greek': true,
    'greek8': true,
    'iso-8859-7': true,
    'iso-ir-126': true,
    'iso8859-7': true,
    'iso88597': true,
    'iso_8859-7': true,
    'iso_8859-7:1987': true,
    'sun_eu_greek': true,
    'csiso88598e': true,
    'csisolatinhebrew': true,
    'hebrew': true,
    'iso-8859-8': true,
    'iso-8859-8-e': true,
    'iso-ir-138': true,
    'iso8859-8': true,
    'iso88598': true,
    'iso_8859-8': true,
    'iso_8859-8:1988': true,
    'visual': true,
    'csiso88598i': true,
    'iso-8859-8-i': true,
    'logical': true,
    'csisolatin6': true,
    'iso-8859-10': true,
    'iso-ir-157': true,
    'iso8859-10': true,
    'iso885910': true,
    'l6': true,
    'latin6': true,
    'iso-8859-13': true,
    'iso8859-13': true,
    'iso885913': true,
    'iso-8859-14': true,
    'iso8859-14': true,
    'iso885914': true,
    'csisolatin9': true,
    'iso-8859-15': true,
    'iso8859-15': true,
    'iso885915': true,
    'l9': true,
    'latin9': true,
    'iso-8859-16': true,
    'cskoi8r': true,
    'koi': true,
    'koi8': true,
    'koi8-r': true,
    'koi8_r': true,
    'koi8-u': true,
    'csmacintosh': true,
    'mac': true,
    'macintosh': true,
    'x-mac-roman': true,
    'dos-874': true,
    'iso-8859-11': true,
    'iso8859-11': true,
    'iso885911': true,
    'tis-620': true,
    'windows-874': true,
    'cp1250': true,
    'windows-1250': true,
    'x-cp1250': true,
    'cp1251': true,
    'windows-1251': true,
    'x-cp1251': true,
    'ansi_x3.4-1968': true,
    'ascii': true,
    'cp1252': true,
    'cp819': true,
    'csisolatin1': true,
    'ibm819': true,
    'iso-8859-1': true,
    'iso-ir-100': true,
    'iso8859-1': true,
    'iso88591': true,
    'iso_8859-1': true,
    'iso_8859-1:1987': true,
    'l1': true,
    'latin1': true,
    'us-ascii': true,
    'windows-1252': true,
    'x-cp1252': true,
    'cp1253': true,
    'windows-1253': true,
    'x-cp1253': true,
    'cp1254': true,
    'csisolatin5': true,
    'iso-8859-9': true,
    'iso-ir-148': true,
    'iso8859-9': true,
    'iso88599': true,
    'iso_8859-9': true,
    'iso_8859-9:1989': true,
    'l5': true,
    'latin5': true,
    'windows-1254': true,
    'x-cp1254': true,
    'cp1255': true,
    'windows-1255': true,
    'x-cp1255': true,
    'cp1256': true,
    'windows-1256': true,
    'x-cp1256': true,
    'cp1257': true,
    'windows-1257': true,
    'x-cp1257': true,
    'cp1258': true,
    'windows-1258': true,
    'x-cp1258': true,
    'x-mac-cyrillic': true,
    'x-mac-ukrainian': true,
    'chinese': true,
    'csgb2312': true,
    'csiso58gb231280': true,
    'gb2312': true,
    'gb_2312': true,
    'gb_2312-80': true,
    'gbk': true,
    'iso-ir-58': true,
    'x-gbk': true,
    'gb18030': true,
    'hz-gb-2312': true,
    'big5': true,
    'big5-hkscs': true,
    'cn-big5': true,
    'csbig5': true,
    'x-x-big5': true,
    'cseucpkdfmtjapanese': true,
    'euc-jp': true,
    'x-euc-jp': true,
    'csiso2022jp': true,
    'iso-2022-jp': true,
    'iso-2022-jp-2': true,
    'csshiftjis': true,
    'ms_kanji': true,
    'shift-jis': true,
    'shift_jis': true,
    'sjis': true,
    'windows-31j': true,
    'x-sjis': true,
    'cseuckr': true,
    'csksc56011987': true,
    'euc-kr': true,
    'iso-ir-149': true,
    'korean': true,
    'ks_c_5601-1987': true,
    'ks_c_5601-1989': true,
    'ksc5601': true,
    'ksc_5601': true,
    'windows-949': true,
    'csiso2022kr': true,
    'iso-2022-kr': true,
    'utf-16be': true,
    'utf-16': true,
    'utf-16le': true,
    'x-user-defined': true,
    'iso-2022-cn': true,
    'iso-2022-cn-ext': true
};
