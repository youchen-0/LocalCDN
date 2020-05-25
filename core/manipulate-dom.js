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


    let initiatorDomain, listedToManipulateDOM;
    listedToManipulateDOM = stateManager._domainIsWhitelisted(initiatorDomain, "manipulate-dom");
    initiatorDomain = helpers.extractDomainFromUrl(details.url, true) || Address.EXAMPLE;



    // by Jaap (https://gitlab.com/Jaaap)
    let header = details.responseHeaders.find(h => h.name.toLowerCase() === 'content-type');

    if (header && BrowserType.FIREFOX && listedToManipulateDOM) {

        let mimeType, isWhitelisted;

        mimeType = header.value.replace(/;.*/, '').toLowerCase();
        isWhitelisted = stateManager._domainIsWhitelisted(initiatorDomain);

        if (!isWhitelisted && mimeType === 'text/html') {

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

            header.value = 'text/html; charset=UTF-8';

            //Note that this will not work if the '<script crossorigin="anonymous" src="dfgsfgd.com">' string is divided into two chunks, but we want to flush this data asap.
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
                //remove crossorigin and integrity attributes
                let str = decoder.decode(evt.data, {stream: true}).replace(/<(link|script)[^>]+>/ig, m => {
                    if (cdnDomainsRE.test(m)) {
                        return m.replace(/\s+(integrity|crossorigin)(="[^"]*"|='[^']*'|=[^"'`=\s]+|)/ig, '');
                    }
                    return m;
                });
                filter.write(encoder.encode(str));
                isFirstData = false;
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
