/**
 * Remove integrity checks from embedded CSS and JavaScript files
 * Belongs to LocalCDN.
 *
 * @author      nobody
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

    if(!BrowserType.FIREFOX) {
        // Chromium (and other) browsers do not support webRequest.filterResponseData
        // https://bugs.chromium.org/p/chromium/issues/detail?id=487422
        console.warn('[ LocalCDN ] browser.webRequest.filterResponseData not supported by your browser.');
        return;
    }

    let initiatorDomain, listedToManipulateDOM, negateHtmlFilter, filtering;

    initiatorDomain = helpers.extractDomainFromUrl(details.url, true) || Address.EXAMPLE;
    listedToManipulateDOM = stateManager._domainIsListed(initiatorDomain, "manipulate-dom");
    negateHtmlFilter = stateManager.getInvertOption;

    if( ( negateHtmlFilter || listedToManipulateDOM ) && !( negateHtmlFilter && listedToManipulateDOM ) ) {
        filtering = true;
    } else {
        filtering = false;
    }

    // by Jaap (https://gitlab.com/Jaaap)
    let header = details.responseHeaders.find(h => h.name.toLowerCase() === 'content-type');

    if (header && filtering) {

        let mimeType, isAllowlisted;

        mimeType = header.value.replace(/;.*/, '').toLowerCase();
        isAllowlisted = stateManager._domainIsListed(initiatorDomain);

        if (!isAllowlisted && mimeType === 'text/html') {

            let asciiDecoder, decoder, encoder, charset, isFirstData, filter;

            charset = /charset\s*=/.test(header.value) && header.value.replace(/^.*?charset\s*=\s*/, '').replace(/["']?/g, '');

            // Check if charset is supported by TextDecoder()
            if(/charset\s*=/.test(header.value) && !EncodingTypes[charset.toString().toLowerCase()]){
                console.error('[ LocalCDN ] Unsupported charset: ' + charset);
                return;
            }

            asciiDecoder = new TextDecoder('ASCII');
            encoder = new TextEncoder();
            isFirstData = true;
            filter = browser.webRequest.filterResponseData(details.requestId);
            let data = [];

            header.value = 'text/html; charset=UTF-8';

            // Note that should work if the '<script crossorigin="anonymous" src="dfgsfgd.com">' string is divided into two chunks.
            filter.ondata = evt => {
                if (isFirstData) {
                    if (!charset) {
                        //content-type has no charset declared
                        let htmlHead = asciiDecoder.decode(evt.data, {stream: false});
                        let charsetMatch = htmlHead.match(/<meta.*charset=["']?([^>"'\/]+)["'].*[>\/]/i);
                        charset = charsetMatch ? charsetMatch[1] : "UTF-8";
                    }
                    decoder = new TextDecoder(charset);
                }
                isFirstData = false;

                data.push(evt.data);
            }

            filter.onstop = evt => {
                let str = '';
                for (let buffer of data) {
                    str += decoder.decode(buffer, {stream: true});
                }
                str += decoder.decode(); // end-of-stream

                //remove crossorigin and integrity attributes
                str = str.replace(/<(link|script)[^>]+>/ig, m => {
                    if (cdnDomainsRE.test(m)) {
                        return m.replace(/\s+(integrity|crossorigin)(="[^"]*"|='[^']*'|=[^"'`=>\s]+|)/ig, '');
                    }
                    return m;
                });
                filter.write(encoder.encode(str));
                filter.close();
            }
        }
        return {responseHeaders: details.responseHeaders};

    }
};


/**
 * Initializations
 */

 let allowlistedDomains = {};
 let cdnDomainsRE = new RegExp('//(' + Object.keys(mappings.cdn).map(m => m.replace(/\W/g, '\\$&')).join('|') + ')/');


/**
* Event Handlers
*/

chrome.webRequest.onHeadersReceived.addListener(
    manipulateDOM._removeCrossOriginAndIntegrityAttr,
    {'types': [WebRequestType.MAIN_FRAME], 'urls': [Address.ANY]},
    [WebRequest.BLOCKING, WebRequest.RESPONSE_HEADERS]
);
