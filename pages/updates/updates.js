/**
 * Main Updates Page
 * Belongs to Decentraleyes.
 *
 * @author      nobody42
 * @since       2020-03-08
 * @license     MPL 2.0
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

/**
 * Updates
 */

var updates = {};

/**
 * Private Methods
 */
updates._openRuleSet = function({target}) {

     let urls = mappings;
     let updateKey = target.getAttribute('data-option');
     let updateType = target.getAttribute('value');

     let textArea = document.getElementById("generated-rules");
     let btnCopy = document.getElementById("button-copy-rule-set");

     let content = "";

     textArea.style.display = "block";
     btnCopy.style.display = "block";

     for (var domain in urls) {
         if (updateKey === "uMatrix") {
             content += "* " + domain + " script allow" + '\n';
             content += "* " + domain + " css allow" + '\n';
         } else if (updateKey === "uBlock") {
             content += "* " + domain + " * noop" + '\n';
         }
     }
     textArea.value = content.replace(/\n+$/, "");
 }

 updates._copyRuleSet = function() {
     let textArea = document.getElementById("generated-rules");
     navigator.clipboard.writeText(textArea.value).then(function() {
         textArea.select();
     }, function() {
         alert("Rule set cannot be copied!");
     });
 }

 updates._onDocumentLoaded = function () {

     document.getElementById('generate-ublock-rules').checked = false;
     document.getElementById('generate-umatrix-rules').checked = false;

     let updateElements = {
         ['ruleSets']: document.getElementsByName("rule-sets"),
         ['copyRuleSet']: document.getElementById("button-copy-rule-set")
     };

     for(let i = 0; i < updateElements.ruleSets.length; i++) {
         updateElements.ruleSets[i].addEventListener('change', updates._openRuleSet);
     }
     updateElements.copyRuleSet.addEventListener('click', updates._copyRuleSet);
 };

document.addEventListener('DOMContentLoaded', updates._onDocumentLoaded);
