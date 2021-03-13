/**
 * Interceptor
 * Belongs to LocalCDN (since 2020-02-26)
 * (Origin: Decentraleyes)
 *
 * @author      Thomas Rientjes
 * @since       2016-04-06
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
 * Interceptor
 */

var interceptor = {};


/**
 * Public Methods
 */

interceptor.handleRequest = function (requestDetails, tabIdentifier, tab) {
    let validCandidate, targetDetails, targetPath;

    validCandidate = requestAnalyzer.isValidCandidate(requestDetails, tab);

    if (!validCandidate) {
        return {
            'cancel': false
        };
    }

    targetDetails = requestAnalyzer.getLocalTarget(requestDetails, tab.url);
    targetPath = targetDetails.path;


    if (Regex.GOOGLE_FONTS.test(requestDetails.url)) {
        let initiatorDomain = helpers.extractDomainFromUrl(tab.url, true);
        // Check if the website is allowed to load Google Fonts
        if (interceptor.blockGoogleFonts === true && !requestAnalyzer.domainsGoogleFonts[initiatorDomain]) {
            return {
                'cancel': true
            };
        } else if (interceptor.blockGoogleFonts === false || requestAnalyzer.domainsGoogleFonts[initiatorDomain]) {
            return {
                'cancel': false
            };
        }
    }

    if (targetDetails === false) {
        ++stateManager.tabs[tabIdentifier].missing;
    }

    if (!targetDetails) {
        return interceptor._handleMissingCandidate(requestDetails.url, tabIdentifier);
    }

    stateManager.requests[requestDetails.requestId] = {
        tabIdentifier, targetDetails
    };

    return {
        'redirectUrl': chrome.extension.getURL(targetPath + fileGuard.secret)
    };
};


/**
 * Private Methods
 */

interceptor._handleMissingCandidate = function (requestUrl, tabIdentifier) {
    let requestUrlSegments, injectionCount, missingCount;

    if (stateManager.showIconBadge === true) {
        if (stateManager.changeBadgeColorMissingResources === true) {
            missingCount = stateManager.tabs[tabIdentifier].missing || 0;
            injectionCount = Object.keys(stateManager.tabs[tabIdentifier].injections).length || 0;

            if (missingCount > 0 && injectionCount === 0) {
                wrappers.setBadgeMissing(tabIdentifier, injectionCount);
            }
        } else {
            wrappers.defaultBadge(tabIdentifier);
        }
    }

    if (interceptor.blockMissing === true) {
        return {
            'cancel': true
        };
    }

    requestUrlSegments = new URL(requestUrl);

    if (requestUrlSegments.protocol === Address.HTTP) {
        requestUrlSegments.protocol = Address.HTTPS;
        requestUrl = requestUrlSegments.toString();

        return {
            'redirectUrl': requestUrl
        };
    } else {
        return {
            'cancel': false
        };
    }
};

interceptor._handleStorageChanged = function (changes) {
    if (Setting.XHR_TEST_DOMAIN in changes) {
        interceptor.xhrTestDomain = changes.xhrTestDomain.newValue;
    }

    if (Setting.BLOCK_MISSING in changes) {
        interceptor.blockMissing = changes.blockMissing.newValue;
    }

    if (Setting.BLOCK_GOOGLE_FONTS in changes) {
        interceptor.blockGoogleFonts = changes.blockGoogleFonts.newValue;
    }

    if (Setting.ALLOWED_DOMAINS_GOOGLE_FONTS in changes) {
        interceptor.allowedDomainsGoogleFonts = changes.allowedDomainsGoogleFonts.newValue;
    }
};


/**
 * Initializations
 */

interceptor.xhrTestDomain = Address.LOCALCDN;
interceptor.blockMissing = false;
interceptor.blockGoogleFonts = true;
interceptor.allowedDomainsGoogleFonts = {};

interceptor.relatedSettings = [];

interceptor.relatedSettings.push(Setting.AMOUNT_INJECTED);
interceptor.relatedSettings.push(Setting.XHR_TEST_DOMAIN);
interceptor.relatedSettings.push(Setting.BLOCK_MISSING);
interceptor.relatedSettings.push(Setting.ALLOWED_DOMAINS_GOOGLE_FONTS);

storageManager.type.get(interceptor.relatedSettings, function (items) {
    storageManager.amountInjected = items.amountInjected || 0;
    interceptor.xhrTestDomain = items.xhrTestDomain || Address.LOCALCDN;
    interceptor.blockMissing = items.blockMissing || false;
    interceptor.blockGoogleFonts = items.blockGoogleFonts || true;
    interceptor.allowedDomainsGoogleFonts = items.allowedDomainsGoogleFonts || {};
});


/**
 * Event Handlers
 */

chrome.storage.onChanged.addListener(interceptor._handleStorageChanged);
