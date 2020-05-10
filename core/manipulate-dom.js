/**
 * Remove integrity checks from embedded CSS and JavaScript files
 * Belongs to LocalCDN.
 *
 * @author      nobody42
 * @since       2020-02-27
 *
 * @license     MPL 2.0
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';


/**
 * Manipulate DOM
 */

var manipulateDOM = {};


/**
 * Private Methods
 */

manipulateDOM._removeCrossOriginAndIntegrityAttr = function (details) {

    // by Jaap (https://gitlab.com/Jaaap)
    // https://gitlab.com/nobody42/localcdn/-/issues/66
    let header = details.responseHeaders.find(h => h.name.toLowerCase() === 'content-type');

    if (header && BrowserType.FIREFOX) {

        let mimeType, charset, initiatorDomain, isWhitelisted;

        mimeType = header.value.replace(/;.*/, '').toLowerCase();
        charset = /charset\s*=/.test(header.value) ? header.value.replace(/^.*?charset\s*=\s*/, '') : 'UTF-8';
        initiatorDomain = helpers.extractDomainFromUrl(details.url, true) || Address.EXAMPLE;
        isWhitelisted = stateManager._domainIsWhitelisted(initiatorDomain);

        if (!isWhitelisted && mimeType === 'text/html') {

            header.value = 'text/html; charset=UTF-8';
            let decoder = new TextDecoder(charset);
            let encoder = new TextEncoder();
            let filter = browser.webRequest.filterResponseData(details.requestId);

            //Note that this will not work if the '<script crossorigin="anonymous" src="dfgsfgd.com">' string is divided into two chunks, but we want to flush this data asap.
            filter.ondata = evt => {
                //remove crossorigin and integrity attributes
                let str = decoder.decode(evt.data, {stream: true}).replace(/<(link|script)[^>]+>/ig, m => {
                        if (cdnDomainsRE.test(m))
                            return m.replace(/\s+(integrity|crossorigin)(="[^"]*"|='[^']*'|=[^"'`=\s]+|)/ig, '');
                        return m;
                    });
                filter.write(encoder.encode(str));
            }

            filter.onstop = evt => {
                let str = decoder.decode(); //end-of-stream
                filter.write(encoder.encode(str));
                filter.close();
            }
        }
        return {responseHeaders: details.responseHeaders};

    } else if(BrowserType.CHROMIUM) {

        // Chromium browsers do not support webRequest.filterResponseData
        // https://bugs.chromium.org/p/chromium/issues/detail?id=487422
        console.warn('[ LocalCDN ] browser.webRequest.filterResponseData not supported by your browser.');

    }
};


/**
 * Initializations
 */

 let whitelistedDomains = {};
 let cdnDomainsRE = new RegExp('//(' + Object.keys(mappings).map(m => m.replace(/\W/g, '\\$&')).join('|') + ')/');


/**
* Event Handlers
*/

chrome.webRequest.onHeadersReceived.addListener(
    manipulateDOM._removeCrossOriginAndIntegrityAttr,
    {'types': [WebRequestType.MAIN_FRAME], 'urls': [Address.ANY]},
	[WebRequest.BLOCKING, WebRequest.RESPONSE_HEADERS]
);
