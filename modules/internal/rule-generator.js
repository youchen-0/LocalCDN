/**
 * Rule Generator
 * Belongs to LocalCDN (since 2020-02-26)
 *
 * @author      nobody
 * @since       2020-03-08
 *
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

var ruleGenerator = {};

/**
 * Public Methods
 */
ruleGenerator.openRuleSet = function ({ target }) {
    let urls = mappings.cdn;
    let key = target.getAttribute('data-option');

    let textArea = document.getElementById('generated-rules');
    let btnCopy = document.getElementById('button-copy-rule-set');

    let content = '';

    textArea.style.display = 'block';
    btnCopy.style.display = 'block';

    for (var domain in urls) {
        if (key === 'uMatrix') {
            content += '* ' + domain + ' script allow' + '\n';
            content += '* ' + domain + ' css allow' + '\n';
        } else if (key === 'uBlock') {
            content += '* ' + domain + ' * noop' + '\n';
        } else if (key === 'AdGuard') {
            content += '@@||' + domain + '^\n';
        }
    }
    textArea.value = content.replace(/\n+$/, '');
};

ruleGenerator.copyRuleSet = function () {
    let textArea = document.getElementById('generated-rules');
    navigator.clipboard.writeText(textArea.value).then(
        function () {
            textArea.select();
        },
        function () {
            alert('Rule set cannot be copied!');
        }
    );
};
