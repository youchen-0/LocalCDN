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
    let initiatorDomain, isAllowlisted;

    initiatorDomain = helpers.extractDomainFromUrl(tabDetails.url, true);

    if (initiatorDomain === null) {
        initiatorDomain = Address.EXAMPLE;
    }

    isAllowlisted = helpers.checkAllowlisted(initiatorDomain, requestAnalyzer.allowlistedDomains);
    if (isAllowlisted) {
        return false;
    }

    // Font Awesome injections in Chromium deactivated  (https://gitlab.com/nobody42/localcdn/-/issues/67)
    if (BrowserType.CHROMIUM) {
        if (/(font-awesome|fontawesome)/.test(requestDetails.url)) {
            console.warn('[ LocalCDN ] Font Awesome is not fully supported by your browser.');
            log.append(tabDetails.url, requestDetails.url, 'Font Awesome is not fully supported by your browser', true);
            return false;
        } else if (requestDetails.url.startsWith('https://fonts.googleapis.com')) {
            // also valid for Google Material icons
            console.warn('[ LocalCDN ] Google Material Icons are not fully supported by your browser.');
            log.append(tabDetails.url, requestDetails.url, 'Google Material Icons are not fully supported by your browser', true);
            return false;
        }
    }

    // Disable LocalCDN if website is 'yandex.com' and CDN is 'yastatic.net', because website and CDN are the same.
    if (tabDetails.url.includes('yandex.com') && requestDetails.url.includes('yastatic.net')) {
        log.append(tabDetails.url, requestDetails.url, 'Workaround. Disable LocalCDN if website and CDN are the same', true);
        return false;
    }

    // Only requests of type GET can be valid candidates.
    return requestDetails.method === WebRequest.GET;
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
        return false;
    }

    basePath = requestAnalyzer._matchBasePath(hostMappings, destinationPath);
    resourceMappings = hostMappings[basePath];

    if (!resourceMappings) {
        return false;
    }

    // Return either the local target's path or false.
    // eslint-disable-next-line max-len
    return requestAnalyzer._findLocalTarget(resourceMappings, basePath, destinationHost, destinationPath, destinationSearchString, initiator);
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

// eslint-disable-next-line max-len
requestAnalyzer._findLocalTarget = function (resourceMappings, basePath, channelHost, channelPath, destinationSearchString, initiator) {
    let resourcePath, versionNumber, resourcePattern, filename, shorthandResource;

    storageManager.type.get(Setting.LOGGING, function (items) {
        requestAnalyzer.logging = items.enableLogging;
    });

    resourcePath = channelPath.replace(basePath, '');

    // Evaluate first in case of version 'latest' and numerals in resource
    versionNumber = resourcePath.match(Resource.VERSION_EXPRESSION);

    // Handle weird version expressions
    if (!versionNumber) {
        if (Resource.SINGLE_NUMBER_EXPRESSION.test(channelPath)) {
            versionNumber = channelPath.match(/\d/);
            resourcePattern = resourcePath.replace(versionNumber, Resource.VERSION_PLACEHOLDER);
            versionNumber = [`${versionNumber}.0`];
        }
    } else {
        resourcePattern = resourcePath.replace(versionNumber, Resource.VERSION_PLACEHOLDER);
    }

    shorthandResource = shorthands.specialFiles(channelHost, channelPath, destinationSearchString);
    if (shorthandResource) {
        if (requestAnalyzer.logging) {
            console.log(`[ LocalCDN ] Replaced resource: ${shorthandResource.path}`);
            log.append(initiator, channelHost + channelPath, shorthandResource.path, false);
        }
        return shorthandResource;
    }

    if (resourcePattern === undefined) {
        return false;
    }

    for (let resourceMold of Object.keys(resourceMappings)) {
        if (resourcePattern.startsWith(resourceMold)) {
            let targetPath, versionDelivered, versionRequested, bundle;
            targetPath = resourceMappings[resourceMold].path;
            targetPath = targetPath.replace(Resource.VERSION_PLACEHOLDER, versionNumber);
            // Replace the requested version with the latest depending on major version
            versionDelivered = targets.setLastVersion(targetPath, versionNumber);
            if (versionDelivered === false) {
                return false;
            }
            versionDelivered = versionDelivered.toString();
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
                filename = channelPath.split('/').pop();
                if (bundle === 'MathJax (Bundle)' && filename !== 'MathJax.js') {
                    filename = channelPath.replace(Resource.MATHJAX, '');
                    if (!MathJaxFiles[filename]) {
                        console.warn(`[ LocalCDN ] Missing resource: ${channelHost + channelPath}`);
                        log.append(initiator, channelHost + channelPath, '-', true);
                        break;
                    }
                    if (filename === 'config/TeX-AMS_HTML.js') {
                        filename = 'config/TeX-AMS_HTML-full.js';
                    }
                }
                targetPath = (filename.endsWith('.js')) ? `${targetPath + filename}m` : targetPath + filename;
                targetPath = helpers.formatFilename(targetPath);
            }

            if (requestAnalyzer.logging) {
                console.log(`[ LocalCDN ] Replaced resource: ${targetPath}`);
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
        console.warn(`[ LocalCDN ] Missing resource: ${channelHost}${channelPath}`);
        log.append(initiator, channelHost + channelPath, '-', true);
    }
    return false;
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
