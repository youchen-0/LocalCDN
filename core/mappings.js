/**
 * Mappings
 * Belongs to Decentraleyes.
 *
 * @author      Thomas Rientjes
 * @since       2014-05-30
 * @license     MPL 2.0
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

/**
 * Mappings
 */

var mappings = {

    // Google Hosted Libraries
    'ajax.googleapis.com': {
        '/ajax/libs/': {
            'angularjs/{version}/angular.': resources.angular,
            'angularjs/{version}/angular-animate.': resources.angularAnimate,
            'angularjs/{version}/angular-sanitize.': resources.angularSanitize,
            'angularjs/{version}/angular-cookies.': resources.angularCookies,
            'angularjs/{version}/angular-touch.': resources.angularTouch,
            'dojo/{version}/dojo/dojo.': resources.dojo,
            'ext-core/{version}/ext-core.': resources.extCore,
            'ext-core/{version}/ext-core-debug.': resources.extCore,
            'jquery/{version}/jquery.': resources.jQuery,
            'jqueryui/{version}/jquery-ui.js': resources.jQueryUI,
            'jqueryui/{version}/jquery-ui.min.js': resources.jQueryUI,
            'mootools/{version}/mootools-yui-compressed.': resources.mootools,
            'prototype/{version}/prototype.': resources.prototypeJS,
            'scriptaculous/{version}/scriptaculous.': resources.scriptaculous,
            'swfobject/{version}/swfobject.': resources.swfobject,
            'webfont/{version}/webfont.': resources.webfont,

        }
    },
    // Microsoft Ajax CDN
    'ajax.aspnetcdn.com': {
        '/ajax/': {
            'jQuery/jquery-{version}.': resources.jQuery,
            'jquery/jquery-{version}.': resources.jQuery,
            'modernizr/modernizr-{version}.': resources.modernizr
        }
    },
    // Microsoft Ajax CDN [Deprecated]
    'ajax.microsoft.com': {
        '/ajax/': {
            'jQuery/jquery-{version}.': resources.jQuery,
            'jquery/jquery-{version}.': resources.jQuery,
            'modernizr/modernizr-{version}.': resources.modernizr
        }
    },
    // CDNJS (Cloudflare)
    'cdnjs.cloudflare.com': {
        '/ajax/libs/': {
            'angular.js/{version}/angular.': resources.angular,
            'backbone.js/{version}/backbone.': resources.backbone,
            'backbone.js/{version}/backbone-min.': resources.backbone,
            'dojo/{version}/dojo.': resources.dojo,
            'ember.js/{version}/ember.': resources.ember,
            'ext-core/{version}/ext-core.': resources.extCore,
            'jquery/{version}/jquery.': resources.jQuery,
            'jqueryui/{version}/jquery-ui.js': resources.jQueryUI,
            'jqueryui/{version}/jquery-ui.min.js': resources.jQueryUI,
            'mathjax/{version}/MathJax.js': resources.MathJax,
            'modernizr/{version}/modernizr.': resources.modernizr,
            'moment.js/{version}/moment.': resources.moment,
            'mootools/{version}/mootools-core': resources.mootools,
            'scriptaculous/{version}/scriptaculous.': resources.scriptaculous,
            'swfobject/{version}/swfobject.': resources.swfobject,
            'underscore.js/{version}/underscore.': resources.underscore,
            'underscore.js/{version}/underscore-min.': resources.underscore,
            'webfont/{version}/webfont': resources.webfont
        }
    },
    // jQuery CDN (MaxCDN)
    'code.jquery.com': {
        '/': {
            'jquery-{version}.': resources.jQuery,
            'ui/{version}/jquery-ui.js': resources.jQueryUI,
            'ui/{version}/jquery-ui.min.js': resources.jQueryUI,

            // Basic Shorthand Notations [Deprecated]
            'jquery-latest.': {
                'path': 'resources/jquery/1.11.1/jquery.min.jsm',
                'type': 'application/javascript'
            },
            'jquery.': {
                'path': 'resources/jquery/1.11.1/jquery.min.jsm',
                'type': 'application/javascript'
            }
        }
    },
    // jsDelivr (MaxCDN)
    'cdn.jsdelivr.net': {
        '/': {
            'angularjs/{version}/angular.': resources.angular,
            'backbonejs/{version}/backbone.': resources.backbone,
            'backbonejs/{version}/backbone-min.': resources.backbone,
            'dojo/{version}/dojo.': resources.dojo,
            'emberjs/{version}/ember.': resources.ember,
            'jquery/{version}/jquery.': resources.jQuery,
            'npm/jquery@{version}/dist/jquery.': resources.jQuery,
            'jquery.ui/{version}/jquery-ui.js': resources.jQueryUI,
            'jquery.ui/{version}/jquery-ui.min.js': resources.jQueryUI,
            'momentjs/{version}/moment.': resources.moment,
            'mootools/{version}/mootools-': resources.mootools,
            'swfobject/{version}/swfobject.': resources.swfobject,
            'underscorejs/{version}/underscore.': resources.underscore,
            'underscorejs/{version}/underscore-min.': resources.underscore,
            'webfontloader/{version}/webfont': resources.webfont
        }
    },
    // Yandex CDN
    'yastatic.net': {
        '/': {
            'angularjs/{version}/angular.': resources.angular,
            'backbone/{version}/backbone.': resources.backbone,
            'backbone/{version}/backbone-min.': resources.backbone,
            'dojo/{version}/dojo/dojo.': resources.dojo,
            'ext-core/{version}/ext-core.': resources.extCore,
            'jquery/{version}/jquery.': resources.jQuery,
            'jquery-ui/{version}/jquery-ui.js': resources.jQueryUI,
            'jquery-ui/{version}/jquery-ui.min.js': resources.jQueryUI,
            'modernizr/{version}/modernizr.': resources.modernizr,
            'momentjs/{version}/moment.': resources.moment,
            'prototype/{version}/prototype.': resources.prototypeJS,
            'scriptaculous/{version}/scriptaculous.': resources.scriptaculous,
            'swfobject/{version}/swfobject.': resources.swfobject,
            'underscore/{version}/underscore.': resources.underscore,
            'underscore/{version}/underscore-min.': resources.underscore
        }
    },
    // Yandex CDN [Deprecated]
    'yandex.st': {
        '/': {
            'angularjs/{version}/angular.': resources.angular,
            'backbone/{version}/backbone.': resources.backbone,
            'backbone/{version}/backbone-min.': resources.backbone,
            'dojo/{version}/dojo/dojo.': resources.dojo,
            'ext-core/{version}/ext-core.': resources.extCore,
            'jquery/{version}/jquery.': resources.jQuery,
            'jquery-ui/{version}/jquery-ui.js': resources.jQueryUI,
            'jquery-ui/{version}/jquery-ui.min.js': resources.jQueryUI,
            'modernizr/{version}/modernizr.': resources.modernizr,
            'momentjs/{version}/moment.': resources.moment,
            'prototype/{version}/prototype.': resources.prototypeJS,
            'scriptaculous/{version}/scriptaculous.': resources.scriptaculous,
            'swfobject/{version}/swfobject.': resources.swfobject,
            'underscore/{version}/underscore.': resources.underscore,
            'underscore/{version}/underscore-min.': resources.underscore
        }
    },
    // Baidu CDN
    'apps.bdimg.com': {
        '/libs/': {
            'angular.js/{version}/angular.': resources.angular,
            'backbone.js/{version}/backbone.': resources.backbone,
            'backbone.js/{version}/backbone-min.': resources.backbone,
            'dojo/{version}/dojo.': resources.dojo,
            'ember.js/{version}/ember.': resources.ember,
            'ext-core/{version}/ext-core.': resources.extCore,
            'jquery/{version}/jquery.': resources.jQuery,
            'jqueryui/{version}/jquery-ui.js': resources.jQueryUI,
            'jqueryui/{version}/jquery-ui.min.js': resources.jQueryUI,
            'moment/{version}/moment.': resources.moment,
            'mootools/{version}/mootools-yui-compressed.': resources.mootools,
            'prototype/{version}/prototype.': resources.prototypeJS,
            'scriptaculous/{version}/scriptaculous.': resources.scriptaculous,
            'swfobject/{version}/swfobject.': resources.swfobject,
            'swfobject/{version}/swfobject_src.': resources.swfobject,
            'underscore.js/{version}/underscore.': resources.underscore,
            'underscore.js/{version}/underscore-min.': resources.underscore,
            'webfont/{version}/webfont.': resources.webfont,
            'webfont/{version}/webfont_debug.': resources.webfont
        }
    },
    // Baidu CDN
    'libs.baidu.com': {
        '/': {
            'angular.js/{version}/angular.min.js': resources.angularjs,
            'backbone.js/{version}/backbone.': resources.backbone,
            'backbone.js/{version}/backbone-min.': resources.backbone,
            'dojo/{version}/dojo.': resources.dojo,
            'ember.js/{version}/ember.min.js': resources.ember.js,
            'ext-core/{version}/ext-core.': resources.extCore,
            'jquery/{version}/jquery.': resources.jQuery,
            'jqueryui/{version}/jquery-ui.js': resources.jQueryUI,
            'jqueryui/{version}/jquery-ui.min.js': resources.jQueryUI,
            'moment/{version}/moment.': resources.moment,
            'mootools/{version}/mootools-yui-compressed.': resources.mootools,
            'prototype/{version}/prototype.': resources.prototypeJS,
            'scriptaculous/{version}/scriptaculous.': resources.scriptaculous,
            'swfobject/{version}/swfobject.': resources.swfobject,
            'underscore.js/{version}/underscore.': resources.underscore,
            'underscore.js/{version}/underscore-min.': resources.underscore,
            'webfont/{version}/webfont.': resources.webfont,
            'webfont/{version}/webfont_debug.': resources.webfont
        },
        '/libs/': {
            'angular.js/{version}/angular.min.js': resources.angularjs,
            'backbone.js/{version}/backbone.': resources.backbone,
            'backbone.js/{version}/backbone-min.': resources.backbone,
            'dojo/{version}/dojo.': resources.dojo,
            'ember.js/{version}/ember.min.js': resources.ember.js,
            'ext-core/{version}/ext-core.': resources.extCore,
            'jquery/{version}/jquery.': resources.jQuery,
            'jqueryui/{version}/jquery-ui.js': resources.jQueryUI,
            'jqueryui/{version}/jquery-ui.min.js': resources.jQueryUI,
            'mootools/{version}/mootools-yui-compressed.': resources.mootools,
            'prototype/{version}/prototype.': resources.prototypeJS,
            'scriptaculous/{version}/scriptaculous.': resources.scriptaculous,
            'swfobject/{version}/swfobject.': resources.swfobject,
            'underscore.js/{version}/underscore.': resources.underscore,
            'underscore.js/{version}/underscore-min.': resources.underscore,
            'webfont/{version}/webfont.': resources.webfont,
            'webfont/{version}/webfont_debug.': resources.webfont
        }
    },
    // Baidu CDN
    'apps.bdimg.com': {
        '/libs/': {
            'angular.js/{version}/angular.min.js': resources.angularjs,
            'backbone.js/{version}/backbone.': resources.backbone,
            'backbone.js/{version}/backbone-min.': resources.backbone,
            'dojo/{version}/dojo.': resources.dojo,
            'ember.js/{version}/ember.min.js': resources.ember.js,
            'ext-core/{version}/ext-core.': resources.extCore,
            'jquery/{version}/jquery.': resources.jQuery,
            'jqueryui/{version}/jquery-ui.js': resources.jQueryUI,
            'jqueryui/{version}/jquery-ui.min.js': resources.jQueryUI,
            'mootools/{version}/mootools-yui-compressed.': resources.mootools,
            'prototype/{version}/prototype.': resources.prototypeJS,
            'scriptaculous/{version}/scriptaculous.': resources.scriptaculous,
            'swfobject/{version}/swfobject.': resources.swfobject,
            'underscore.js/{version}/underscore.': resources.underscore,
            'underscore.js/{version}/underscore-min.': resources.underscore,
            'webfont/{version}/webfont.': resources.webfont,
            'webfont/{version}/webfont_debug.': resources.webfont
        }
    },
    // Staticfile CDN
    'cdn.staticfile.org': {
        '/': {
            'angular.js/{version}/angular.min.js': resources.angularjs,
            'backbone.js/{version}/backbone.': resources.backbone,
            'backbone.js/{version}/backbone-min.': resources.backbone,
            'dojo/{version}/dojo.': resources.dojo,
            'ember.js/{version}/ember.min.js': resources.ember.js,
            'ext-core/{version}/ext-core.': resources.extCore,
            'jquery/{version}/jquery.': resources.jQuery,
            'jqueryui/{version}/jquery-ui.js': resources.jQueryUI,
            'jqueryui/{version}/jquery-ui.min.js': resources.jQueryUI,
            'modernizr/{version}/modernizr.': resources.modernizr,
            'mootools/{version}/mootools-yui-compressed.': resources.mootools,
            'prototype/{version}/prototype.': resources.prototypeJS,
            'scriptaculous/{version}/scriptaculous.': resources.scriptaculous,
            'swfobject/{version}/swfobject.': resources.swfobject,
            'webfont/{version}/webfont.': resources.webfont,
            'webfont/{version}/webfont_debug.': resources.webfont
        }
    },
    // BootCDN
    'cdn.bootcss.com': {
        '/': {
            'angular.js/{version}/angular.min.js': resources.angularjs,
            'backbone.js/{version}/backbone.': resources.backbone,
            'backbone.js/{version}/backbone-min.': resources.backbone,
            'dojo/{version}/dojo.': resources.dojo,
            'ember.js/{version}/ember.min.js': resources.ember.js,
            'ext-core/{version}/ext-core.': resources.extCore,
            'jquery/{version}/jquery.': resources.jQuery,
            'jqueryui/{version}/jquery-ui.js': resources.jQueryUI,
            'jqueryui/{version}/jquery-ui.min.js': resources.jQueryUI,
            'modernizr/{version}/modernizr.': resources.modernizr,
            'mootools/{version}/mootools-yui-compressed.': resources.mootools,
            'prototype/{version}/prototype.': resources.prototypeJS,
            'scriptaculous/{version}/scriptaculous.': resources.scriptaculous,
            'swfobject/{version}/swfobject.': resources.swfobject,
            'underscore.js/{version}/underscore.': resources.underscore,
            'underscore.js/{version}/underscore-min.': resources.underscore,
            'webfont/{version}/webfont.': resources.webfont,
            'webfont/{version}/webfont_debug.': resources.webfont
        }
    },
    // Tencent Public Libraries
    'mat1.gtimg.com': {
        '/libs/' :{
            'angular.js/{version}/angular.min.js': resources.angularjs,
            'jquery/{version}/jquery.': resources.jQuery,
        }
    },
    // Qihoo 360 CDN
    'lib.baomitu.com': {
        '/': {
            'angular.js/{version}/angular.min.js': resources.angularjs,
            'backbone.js/{version}/backbone.': resources.backbone,
            'backbone.js/{version}/backbone-min.': resources.backbone,
            'dojo/{version}/dojo.': resources.dojo,
            'ember.js/{version}/ember.min.js': resources.ember.js,
            'ext-core/{version}/ext-core.': resources.extCore,
            'jquery/{version}/jquery.': resources.jQuery,
            'jqueryui/{version}/jquery-ui.js': resources.jQueryUI,
            'jqueryui/{version}/jquery-ui.min.js': resources.jQueryUI,
            'modernizr/{version}/modernizr.': resources.modernizr,
            'mootools/{version}/mootools-yui-compressed.': resources.mootools,
            'prototype/{version}/prototype.': resources.prototypeJS,
            'scriptaculous/{version}/scriptaculous.': resources.scriptaculous,
            'swfobject/{version}/swfobject.': resources.swfobject,
            'underscore.js/{version}/underscore.': resources.underscore,
            'underscore.js/{version}/underscore-min.': resources.underscore,
            'webfont/{version}/webfont.': resources.webfont,
            'webfont/{version}/webfont_debug.': resources.webfont
        }
    },
    // Sina Public Resources
    'lib.sinaapp.com': {
        '/js/': {
            'angular.js/angular-{version}/angular.': resources.angular,
            'backbone/{version}/backbone.': resources.backbone,
            'dojo/{version}/dojo.': resources.dojo,
            'ext-core/{version}/ext-core.': resources.extCore,
            'ext-core/{version}/ext-core-debug.': resources.extCore,
            'jquery/{version}/jquery.': resources.jQuery,
            'jquery-ui/{version}/jquery-ui.js': resources.jQueryUI,
            'jquery-ui/{version}/jquery-ui.min.js': resources.jQueryUI,
            'mootools/{version}/mootools.': resources.mootools,
            'prototype/{version}/prototype.': resources.prototypeJS,
            'scriptaculous/{version}/scriptaculous.': resources.scriptaculous,
            'swfobject/{version}/swfobject.': resources.swfobject,
            'underscore/{version}/underscore.': resources.underscore,
            'underscore/{version}/underscore-min.': resources.underscore,
            'webfont/{version}/webfont.': resources.webfont,
            'webfont/{version}/webfont_debug.': resources.webfont
        }
    },
    // UpYun Library
    'upcdn.b0.upaiyun.com': {
        '/libs/': {
            'dojo/dojo-{version}.': resources.dojo,
            'emberjs/emberjs-{version}.': resources.ember,
            'jquery/jquery-{version}.': resources.jQuery,
            'jqueryui/jquery.ui-{version}.js': resources.jQueryUI,
            'jqueryui/jquery.ui-{version}.min.js': resources.jQueryUI,
            'modernizr/modernizr-{version}.': resources.modernizr,
            'mootoolscore/mootools.core-{version}.': resources.mootools
        }
    },
    // BootCDN
    'cdn.bootcss.com': {
        '/': {
            'angular.js/{version}/angular.': resources.angular,
            'backbone.js/{version}/backbone.': resources.backbone,
            'backbone.js/{version}/backbone-min.': resources.backbone,
            'dojo/{version}/dojo.': resources.dojo,
            'ember.js/{version}/ember.': resources.ember,
            'ext-core/{version}/ext-core.': resources.extCore,
            'jquery/{version}/jquery.': resources.jQuery,
            'jqueryui/{version}/jquery-ui.js': resources.jQueryUI,
            'jqueryui/{version}/jquery-ui.min.js': resources.jQueryUI,
            'modernizr/{version}/modernizr.': resources.modernizr,
            'moment.js/{version}/moment.': resources.moment,
            'mootools/{version}/mootools-yui-compressed.': resources.mootools,
            'prototype/{version}/prototype.': resources.prototypeJS,
            'scriptaculous/{version}/scriptaculous.': resources.scriptaculous,
            'swfobject/{version}/swfobject.': resources.swfobject,
            'underscore.js/{version}/underscore.': resources.underscore,
            'underscore.js/{version}/underscore-min.': resources.underscore,
            'webfont/{version}/webfontloader.': resources.webfont
        }
    },
    // StackPath BootstrapCDN
    'stackpath.bootstrapcdn.com': {
        '/bootstrap/': {
            '{version}/js/bootstrap.min.js': resources.bootstrapJS,
            '{version}/css/bootstrap.min.css': resources.bootstrapCSS
        }
    },
    // MaxCDN Bootstrap
    'maxcdn.bootstrapcdn.com': {
        '/bootstrap/': {
            '{version}/js/bootstrap.min.js': resources.bootstrapJS,
            '{version}/css/bootstrap.min.css': resources.bootstrapCSS
        }
    },
    // NetDNA Bootstrap
    'netdna.bootstrapcdn.com': {
        '/bootstrap/': {
            '{version}/js/bootstrap.min.js': resources.bootstrapJS,
            '{version}/css/bootstrap.min.css': resources.bootstrapCSS
        }
    }
};

// Geekzu Public Service [Mirror]
mappings['sdn.geekzu.org'] = {
    '/ajax/ajax/libs/': mappings['ajax.googleapis.com']['/ajax/libs/']
};

// USTC Linux User Group [Mirror]
mappings['ajax.proxy.ustclug.org'] = mappings['ajax.googleapis.com'];
