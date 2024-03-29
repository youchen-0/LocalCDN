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
    let initiatorDomain, requestedDomain, isAllowlisted;

    initiatorDomain = helpers.extractDomainFromUrl(tabDetails.url, true);

    if (initiatorDomain === null) {
        initiatorDomain = Address.EXAMPLE;
    }

    // If requested Domain not in mappings.js it is not relevant
    requestedDomain = helpers.extractDomainFromUrl(requestDetails.url, true);
    if (mappings['cdn'][requestedDomain] === undefined) {
        return false;
    }

    isAllowlisted = helpers.checkAllowlisted(initiatorDomain, requestAnalyzer.allowlistedDomains);
    if (isAllowlisted) {
        return false;
    }

    // Font Awesome injections in Chromium deactivated  (https://gitlab.com/nobody42/localcdn/-/issues/67)
    if (!BrowserType.FIREFOX) {
        if (requestDetails.url.includes('font-awesome') || requestDetails.url.includes('fontawesome')) {
            console.warn(`${LogString.PREFIX} ${LogString.FONT_AWESOME}`);
            log.append(tabDetails.url, requestDetails.url, LogString.FONT_AWESOME, true);
            return false;
        }
        if (requestAnalyzer.isGoogleMaterialIcons(requestedDomain, requestDetails.url)) {
            // also valid for Google Material icons
            console.warn(`${LogString.PREFIX} ${LogString.GOOGLE_MATERIAL_ICONS}`);
            log.append(tabDetails.url, requestDetails.url, LogString.GOOGLE_MATERIAL_ICONS, true);
            return false;
        }
    }

    // Ignore requests if website is 'yandex.com' and CDN is 'yastatic.net', because website and CDN are the same.
    if (tabDetails.url.includes('yandex.com') && requestDetails.url.includes('yastatic.net')) {
        log.append(tabDetails.url, requestDetails.url, LogString.YANDEX, true);
        return false;
    }

    // Only requests of type GET can be valid candidates.
    return requestDetails.method === WebRequest.GET;
};

requestAnalyzer.isGoogleMaterialIcons = function (url) {
    return url.includes('Material+Icons') || url.includes('materialicons');
};

requestAnalyzer.isGoogleFont = function (domain) {
    return domain.includes('fonts.googleapis.com') || domain.includes('fonts.gstatic.com');
};

requestAnalyzer.getLocalTarget = function (requestDetails, initiator) {
    let destinationUrl, destinationHost, destinationPath, hostMappings, basePath,
        resourceMappings, destinationSearchString;

    destinationSearchString = '';
    destinationUrl = new URL(requestDetails.url);

    destinationHost = destinationUrl.host;
    destinationPath = destinationUrl.pathname;
    if (destinationUrl.search) {
        destinationSearchString = destinationUrl.search;
    }

    // Use the proper mappings for the targeted host.
    hostMappings = mappings.cdn[destinationHost];

    // Resource mapping files are never locally available.
    if (Resource.MAPPING_EXPRESSION.test(destinationPath)) {
        return {
            'result': false,
        };
    }

    basePath = requestAnalyzer._matchBasePath(hostMappings, destinationPath)['result'];
    resourceMappings = hostMappings[basePath];

    if (!resourceMappings) {
        return {
            'result': false,
        };
    }

    // Return either the local target's path or false.
    // eslint-disable-next-line max-len
    return requestAnalyzer._findLocalTarget(
        resourceMappings,
        basePath,
        destinationHost,
        destinationPath,
        destinationSearchString,
        initiator
    );
};


/**
 * Private Methods
 */

requestAnalyzer._matchBasePath = function (hostMappings, channelPath) {
    for (let basePath of Object.keys(hostMappings)) {
        if (channelPath.startsWith(basePath)) {
            return {
                'result': basePath,
            };
        }
    }

    return {
        'result': false,
    };
};

// eslint-disable-next-line max-len
requestAnalyzer._findLocalTarget = function (resourceMappings, basePath, channelHost, channelPath, destinationSearchString, initiator) {
    let resourcePath, versionNumber, resourcePattern, shorthandResource;

    storageManager.type.get(Setting.LOGGING, function (items) {
        requestAnalyzer.logging = items.enableLogging;
    });

    resourcePath = channelPath.replace(basePath, '');

    // Evaluate first in case of version 'latest' and numerals in resource
    versionNumber = resourcePath.match(Resource.VERSION_EXPRESSION);

    // Handle weird version expressions
    if (!versionNumber && Resource.SINGLE_NUMBER_EXPRESSION.test(channelPath)) {
        versionNumber = channelPath.match(/\d/);
        resourcePattern = resourcePath.replace(versionNumber, Resource.VERSION_PLACEHOLDER);
        versionNumber = [`${versionNumber}.0`];
    } else {
        resourcePattern = resourcePath.replace(versionNumber, Resource.VERSION_PLACEHOLDER);
    }

    shorthandResource = shorthands.specialFiles(channelHost, channelPath, destinationSearchString);
    if (shorthandResource['result'] !== false) {
        if (requestAnalyzer.logging) {
            console.log(`${LogString.PREFIX} ${LogString.REPLACED_RESOURCE} ${shorthandResource.path}`);
            log.append(initiator, channelHost + channelPath, shorthandResource.path, false);
        }
        return shorthandResource;
    }

    if (resourcePattern === undefined) {
        return {
            'result': false,
        };
    }

    for (let resourceMold of Object.keys(resourceMappings)) {
        if (resourcePattern.startsWith(resourceMold)) {
            let targetPath, versionDelivered, versionRequested, bundle;
            targetPath = resourceMappings[resourceMold].path;
            targetPath = targetPath.replace(Resource.VERSION_PLACEHOLDER, versionNumber);
            // Replace the requested version with the latest depending on major version
            versionDelivered = targets.setLastVersion(targetPath, versionNumber);
            if (versionDelivered === '') {
                return {
                    'result': false,
                };
            }

            targetPath = targetPath.replace(versionNumber, versionDelivered);

            if (versionNumber === null) {
                versionDelivered = targetPath.match(Resource.VERSION_EXPRESSION).toString();
                versionRequested = 'latest';
            } else {
                versionRequested = versionNumber[0];
            }

            // Get bundle name
            bundle = targets.determineBundle(targetPath);
            if (bundle !== '') {
                targetPath = requestAnalyzer._getPathOfBundle(initiator, channelHost, channelPath, targetPath, bundle);
            }
            if (targetPath['result'] === false) {
                break;
            }

            if (requestAnalyzer.logging) {
                console.log(`${LogString.PREFIX} ${LogString.REPLACED_RESOURCE} ${targetPath}`);
                log.append(initiator, channelHost + channelPath, targetPath, false);
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

    if (requestAnalyzer.logging && !IgnoredHost[channelHost]) {
        console.warn(`${LogString.PREFIX} ${LogString.MISSING_RESOURCE} ${channelHost}${channelPath}`);
        log.append(initiator, channelHost + channelPath, '-', true);
    }
    return {
        'result': false,
    };
};

requestAnalyzer._getPathOfBundle = function (initiator, channelHost, channelPath, targetPath, bundle) {
    let filename = channelPath.split('/').pop();
    if (bundle === 'MathJax (Bundle)' && filename !== 'MathJax.js') {
        filename = channelPath.replace(Resource.MATHJAX, '');
        if (!MathJaxFiles[filename]) {
            console.warn(`${LogString.PREFIX} ${LogString.MISSING_RESOURCE} ${channelHost + channelPath}`);
            log.append(initiator, channelHost + channelPath, '-', true);
            return {
                'result': false,
            };
        }
    }
    return helpers.formatFilename(filename.endsWith('.js')
        ? `${targetPath + filename}m`
        : targetPath + filename);
};

requestAnalyzer._applyAllowlistedDomains = function () {
    storageManager.type.get(Setting.ALLOWLISTED_DOMAINS, function (items) {
        requestAnalyzer.allowlistedDomains = items.allowlistedDomains || {};
    });
};
requestAnalyzer._applyManipulateDOMDomains = function () {
    storageManager.type.get(Setting.DOMAINS_MANIPULATE_DOM, function (items) {
        requestAnalyzer.domainsManipulateDOM = items.domainsManipulateDOM || {};
    });
};


/**
 * Initializations
 */

requestAnalyzer.allowlistedDomains = {};
requestAnalyzer._applyAllowlistedDomains();

requestAnalyzer.domainsManipulateDOM = {};
requestAnalyzer._applyManipulateDOMDomains();


/**
 * Event Handlers
 */

chrome.storage.onChanged.addListener(requestAnalyzer._applyAllowlistedDomains);
chrome.storage.onChanged.addListener(requestAnalyzer._applyManipulateDOMDomains);
