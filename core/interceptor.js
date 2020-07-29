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

    if (requestDetails.url.startsWith('https://fonts.googleapis.com/css?family')) {
        if(interceptor.blockGoogleFonts  !== false && interceptor.blockMissing !== false) {
            return {
                'cancel': false
            };
        }
    }

    if (!validCandidate) {

        return {
            'cancel': false
        };
    }

    targetDetails = requestAnalyzer.getLocalTarget(requestDetails);
    targetPath = targetDetails.path;

    if (!targetDetails) {
        return interceptor._handleMissingCandidate(requestDetails.url);
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

interceptor._handleMissingCandidate = function (requestUrl, preserveUrl) {

    let requestUrlSegments;

    if (interceptor.blockMissing === true) {

        return {
            'cancel': true
        };
    }

    if (preserveUrl === true) {

        return {
            'cancel': false
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
};

/**
 * Initializations
 */

interceptor.amountInjected = 0;
interceptor.xhrTestDomain = Address.LOCALCDN;
interceptor.blockMissing = false;
interceptor.blockGoogleFonts = true;

interceptor.relatedSettings = [];

interceptor.relatedSettings.push(Setting.AMOUNT_INJECTED);
interceptor.relatedSettings.push(Setting.XHR_TEST_DOMAIN);
interceptor.relatedSettings.push(Setting.BLOCK_MISSING);

chrome.storage.sync.get(interceptor.relatedSettings, function (items) {

    interceptor.amountInjected = items.amountInjected || 0;
    interceptor.xhrTestDomain = items.xhrTestDomain || Address.LOCALCDN;
    interceptor.blockMissing = items.blockMissing || false;
    interceptor.blockGoogleFonts = items.blockGoogleFonts || true;
});

/**
 * Event Handlers
 */

chrome.storage.onChanged.addListener(interceptor._handleStorageChanged);
