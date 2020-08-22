/**
 * Request Analyzer
 * Belongs to LocalCDN (since 2020-02-26)
 * (Origin: Decentraleyes)
 *
 * @author      Thomas Rientjes
 * @since       2016-04-11
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
 * Request Analyzer
 */

var requestAnalyzer = {};

/**
 * Public Methods
 */

requestAnalyzer.isValidCandidate = function (requestDetails, tabDetails) {
    let initiatorDomain, isWhitelisted;

    initiatorDomain = helpers.extractDomainFromUrl(tabDetails.url, true);

    if (initiatorDomain === null) {
        initiatorDomain = Address.EXAMPLE;
    }

    isWhitelisted = requestAnalyzer.whitelistedDomains[initiatorDomain];

    if (isWhitelisted) {
        return false;
    }

    // Font Awesome injections in Chromium deactivated  (https://gitlab.com/nobody42/localcdn/-/issues/67)
    if (BrowserType.CHROMIUM) {
        if (/(font-awesome|fontawesome)/.test(requestDetails.url)) {
            console.warn('[ LocalCDN ] Font Awesome is not fully supported by your browser.');
            return false;
        } else if (requestDetails.url.startsWith('https://fonts.googleapis.com')) {
            // also valid for Google Material icons
            console.warn('[ LocalCDN ] Google Material Icons are not fully supported by your browser.');
            return false;
        }
    }

    // Disable LocalCDN if website is 'yandex.com' and CDN is 'yastatic.net', because website and CDN are the same.
    if (tabDetails.url.includes('yandex.com') && requestDetails.url.includes('yastatic.net')) {
        return false;
    }

    // Only requests of type GET can be valid candidates.
    return requestDetails.method === WebRequest.GET;
};

requestAnalyzer.getLocalTarget = function (requestDetails) {
    let destinationUrl, destinationHost, destinationPath, hostMappings, basePath, resourceMappings;
    let destinationSearchString = '';

    destinationUrl = new URL(requestDetails.url);

    destinationHost = destinationUrl.host;
    destinationPath = destinationUrl.pathname;
    if (destinationUrl.search) {
        destinationSearchString = destinationUrl.search;
    }

    // Use the proper mappings for the targeted host.
    hostMappings = mappings[destinationHost];

    // Resource mapping files are never locally available.
    if (Resource.MAPPING_EXPRESSION.test(destinationPath)) {
        return false;
    }

    basePath = requestAnalyzer._matchBasePath(hostMappings, destinationPath);
    resourceMappings = hostMappings[basePath];

    if (!resourceMappings) {
        return false;
    }

    // Return either the local target's path or false.
    return requestAnalyzer._findLocalTarget(resourceMappings, basePath, destinationHost, destinationPath, destinationSearchString);
};

/**
 * Private Methods
 */

requestAnalyzer._matchBasePath = function (hostMappings, channelPath) {
    for (let basePath of Object.keys(hostMappings)) {
        if (channelPath.startsWith(basePath)) {
            return basePath;
        }
    }

    return false;
};

requestAnalyzer._findLocalTarget = function (resourceMappings, basePath, channelHost, channelPath, destinationSearchString) {
    let resourcePath, versionNumber, resourcePattern, filename, shorthandResource;

    chrome.storage.sync.get(Setting.LOGGING, function (items) {
        requestAnalyzer.logging = items.enableLogging;
    });

    resourcePath = channelPath.replace(basePath, '');
    versionNumber = resourcePath.match(Resource.VERSION_EXPRESSION);
    resourcePattern = resourcePath.replace(versionNumber, Resource.VERSION_PLACEHOLDER);

    shorthandResource = shorthands.specialFiles(channelHost, channelPath, destinationSearchString);
    if (shorthandResource) {
        if (requestAnalyzer.logging) {
            console.log('[ LocalCDN ] Replaced resource: ' + shorthandResource.path);
        }
        return shorthandResource;
    }

    for (let resourceMold of Object.keys(resourceMappings)) {
        if (resourcePattern.startsWith(resourceMold)) {
            let targetPath, hostShorthands, versionDelivered, versionRequested;

            targetPath = resourceMappings[resourceMold].path;
            targetPath = targetPath.replace(Resource.VERSION_PLACEHOLDER, versionNumber);
            // Replace the requested version with the latest depending on major version
            versionDelivered = helpers.setLastVersion(targetPath, versionNumber).toString();
            targetPath = targetPath.replace(versionNumber, versionDelivered);

            versionRequested = versionNumber === null ? 'latest' : versionNumber[0];

            hostShorthands = shorthands[channelHost];

            if (hostShorthands && hostShorthands[targetPath]) {
                let shorthand = hostShorthands[targetPath];

                targetPath = shorthand.path;
                versionDelivered = shorthand.version;
            } else if (versionNumber === null) {
                versionDelivered = targetPath.match(Resource.VERSION_EXPRESSION).toString();
            }

            // Get bundle name
            let bundle = helpers.determineBundle(channelPath);
            if (bundle !== '') {
                filename = channelPath.split('/').pop();
                targetPath = ( RegExp('.*\.css$').test(filename) ) ? targetPath + filename : targetPath + filename + 'm';
            }

            if (requestAnalyzer.logging) {
                console.log('[ LocalCDN ] Replaced resource: ' + targetPath);
            }
            // Prepare and return a local target.
            return {
                'source': channelHost,
                'versionRequested': versionRequested,
                'versionDelivered': versionDelivered,
                'path': targetPath,
                'bundle': bundle
            };
        }
    }
    if (requestAnalyzer.logging) {
        console.warn('[ LocalCDN ] Missing resource: ' + channelHost + channelPath);
    }
    return false;
};

requestAnalyzer._applyWhitelistedDomains = function () {
    chrome.storage.sync.get(Setting.WHITELISTED_DOMAINS, function (items) {
        requestAnalyzer.whitelistedDomains = items.whitelistedDomains || {};
    });
};
requestAnalyzer._applyManipulateDOMDomains = function () {
    chrome.storage.sync.get(Setting.DOMAINS_MANIPULATE_DOM, function (items) {
        requestAnalyzer.domainsManipulateDOM = items.domainsManipulateDOM || {};
    });
};
requestAnalyzer._applyAllowedDomainsGoogleFonts = function () {
    chrome.storage.sync.get(Setting.ALLOWED_DOMAINS_GOOGLE_FONTS, function (items) {
        requestAnalyzer.domainsGoogleFonts = items.allowedDomainsGoogleFonts || {};
    });
};

/**
 * Initializations
 */

requestAnalyzer.whitelistedDomains = {};
requestAnalyzer._applyWhitelistedDomains();

requestAnalyzer.domainsManipulateDOM = {};
requestAnalyzer._applyManipulateDOMDomains();

requestAnalyzer.domainsGoogleFonts = {};
requestAnalyzer._applyAllowedDomainsGoogleFonts();
/**
 * Event Handlers
 */

chrome.storage.onChanged.addListener(requestAnalyzer._applyWhitelistedDomains);
chrome.storage.onChanged.addListener(requestAnalyzer._applyManipulateDOMDomains);
chrome.storage.onChanged.addListener(requestAnalyzer._applyAllowedDomainsGoogleFonts);
