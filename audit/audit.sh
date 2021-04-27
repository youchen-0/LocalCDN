#!/bin/bash
# =============================================================================
# AUDIT SCRIPT TO VERIFY THE INTEGRITY OF THE BUNDLED RESOURCES
#
# Author        nobody
# Versions      1.2
#
# License       MPL 2.0
#
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this file,
# You can obtain one at http://mozilla.org/MPL/2.0/.
#
# =============================================================================
# PREREQUISITES:
#
# - Bash >= 4.4
# - LocalCDN >= v2.6.3
# - Local Tor SOCKS5 Proxy (optional, but recommended)
#
# =============================================================================
# INSTALL TOR PROXY:
# - sudo apt install tor
#   e.g. https://linuxconfig.org/install-tor-proxy-on-ubuntu-20-04-linux
#
# CHECK TOR:
# - systemctl status tor@default.service
# - systemctl status tor.service
#
# =============================================================================
# HOW TO START:
#
# A) Check all files:
#      bash audit.sh
#
# B) Check all files and use local Tor proxy (torsocks):
#      bash audit.sh -t
#
# C) Check only one library:
#    Choose the folder name from /resources/, e.g. jquery
#      bash audit.sh -d jquery
#
# D) Check all files and replace in case of hash mismatch:
#      bash audit.sh -r
#
# E) Check only one library files and replace in case of hash mismatch:
#    Choose the folder name from /resources/, e.g. jquery
#      bash audit.sh -rd jquery
#
# =============================================================================
# WHICH FILES WILL BE CHECKED?
#
# All files in the directory /resources/
#
# Exceptions:
#   /resources/*/note
#   /resources/google-material-design-icons/google-material-design-icons.css
#
# =============================================================================
# WHY ARE THESE FILES EXCLUDED?
# google-material-design-icons.css  This is a separate file so that the WOFF2
#                                   file in this extension is used and not an
#                                   external one.
#
# /resources/*/note                 These files contain notes if a file has
#                                   been renamed.
# =============================================================================


# =============================================================================
# CDNs
# =============================================================================
readonly CLOUDFLARE="https://cdnjs.cloudflare.com/ajax/libs"
readonly CLOUDFLARE_AJAX="https://ajax.cloudflare.com/cdn-cgi/scripts"
readonly JSDELIVR="https://cdn.jsdelivr.net"
readonly NETDNA_BOOTSTRAPCDN="https://netdna.bootstrapcdn.com"
readonly GITHUB="https://raw.githubusercontent.com"


# =============================================================================
# GLOBALS
# =============================================================================
readonly REGEX_JS=".*\.jsm$"
COUNTER_ALL=0
COUNTER_HASH_FAILED=0
COUNTER_CONNECT_FAILED=0
COUNTER_HASH_OK=0
COUNTER_SKIPPED=0
LOCAL_HASH=""
REMOTE_HASH=""
FILES_FAILED=""
FILES_SKIPPED=""
FILES_NO_CONNECTION=""

USE_TOR=false
CHECK="ALL"
REPLACE=false
CREATE_THIRD_PARTY_FILE=false
ONLY_THIRD_PARTY=false


# =============================================================================
# FORMATTING
# =============================================================================
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly NOCOLOR='\033[0m'
readonly BOLD=$(tput bold)
readonly NORMAL=$(tput sgr0)
readonly DIVIDER=$(printf '%*s\n' 141 '' | tr ' ' "=")


# =============================================================================
# HELP
# =============================================================================
function help() {
    echo -e "Audit script to verify the integrity of the bundled resources.\n"
    echo -e "Usage:"
    echo -e "           bash audit.sh [options]"
    echo -e "           bash audit.sh [options] -d [resource]\n"
    echo -e "Example:"
    echo -e "           bash audit.sh"
    echo -e "           bash audit.sh -tfr"
    echo -e "           bash audit.sh -tfrd jquery\n"
    echo -e "Options:"
    echo -e "  -t       Use local Tor proxy (torsocks)"
    echo -e "  -f       Create THIRD_PARTY.txt file with all contacted URLs"
    echo -e "  -r       Replace in case of hash mismatch"
    echo -e "  -l       List all resources"
    echo -e "  -d       Check only ONE resource, e.g. jquery"
    echo -e "           'bash audit.sh -d jquery'"
    echo -e "  -u       Generate URLs only and create THIRD_PARTY.txt"
    exit 0
}

# =============================================================================
# LIST RESOURCES
# =============================================================================
function list_resources() {
    echo -e "Usage:"
    echo -e "           bash audit.sh -d [resource]\n"
    echo -e "Example:"
    echo -e "           bash audit.sh -d jquery"
    echo -e "           bash audit.sh -d angular-bootstrap-colorpicker\n"
    echo -e "Resources:"
    resources=()
    while IFS=  read -r -d $'\0'; do
        resources+=( $(echo "$REPLY" | cut -d"/" -f3) )
    done < <(find ../resources/ -maxdepth 1 -print0)
    printf "           %s\n" "${resources[@]}"
    exit 0
}


# =============================================================================
# PreCheck
# =============================================================================
function pre_check() {
    if [ "$USE_TOR" = true ] && ! command -v torsocks &> /dev/null; then
        echo "Command not found: torsocks"
        read -r -p "Press enter to close..."; exit 1
    fi

    if ! command -v wget &> /dev/null; then
        echo "Command not found: wget"
        read -r -p "Press enter to close..."; exit 1
    fi

    if ! command -v sha512sum &> /dev/null; then
        echo "Command not found: sha512sum"
        read -r -p "Press enter to close..."; exit 1
    fi

    if ! command -v sed &> /dev/null; then
        echo "Command not found: sed"
        read -r -p "Press enter to close..."; exit 1
    fi

    if ! command -v cut &> /dev/null; then
        echo "Command not found: cut"
        read -r -p "Press enter to close..."; exit 1
    fi

    if ! command -v awk &> /dev/null; then
        echo "Command not found: awk"
        read -r -p "Press enter to close..."; exit 1
    fi
}


# =============================================================================
# SPECIAL CASES (E.G. BUNDLES)
# =============================================================================
declare -A arr_gsap
arr_gsap[AttrPlugin.min.js]="plugins/AttrPlugin.min.js"
arr_gsap[BezierPlugin.min.js]="plugins/BezierPlugin.min.js"
arr_gsap[CSSPlugin.min.js]="plugins/CSSPlugin.min.js"
arr_gsap[CSSRulePlugin.min.js]="plugins/CSSRulePlugin.min.js"
arr_gsap[ColorPropsPlugin.min.js]="plugins/ColorPropsPlugin.min.js"
arr_gsap[DirectionalRotationPlugin.min.js]="plugins/DirectionalRotationPlugin.min.js"
arr_gsap[EaselPlugin.min.js]="plugins/EaselPlugin.min.js"
arr_gsap[EndArrayPlugin.min.js]="plugins/EndArrayPlugin.min.js"
arr_gsap[ModelifiersPlugin.min.js]="plugins/ModelifiersPlugin.min.js"
arr_gsap[PixiPlugin.min.js]="plugins/PixiPlugin.min.js"
arr_gsap[RaphaelPlugin.min.js]="plugins/RaphaelPlugin.min.js"
arr_gsap[RoundPropsPlugin.min.js]="plugins/RoundPropsPlugin.min.js"
arr_gsap[ScrollToPlugin.min.js]="plugins/ScrollToPlugin.min.js"
arr_gsap[TextPlugin.min.js]="plugins/TextPlugin.min.js"
arr_gsap[EasePack.min.js]="easing/EasePack.min.js"
arr_gsap[Draggable.min.js]="utils/Draggable.min.js"
arr_gsap[ModifiersPlugin.min.js]="plugins/ModifiersPlugin.min.js"

declare -A arr_cycle
arr_cycle[jquery.cycle2.min.js]="jquery.cycle2.min.js"
arr_cycle[jquery.cycle2.autoheight.min.js]="jquery.cycle2.autoheight.min.js"
arr_cycle[jquery.cycle2.caption.min.js]="jquery.cycle2.caption.min.js"
arr_cycle[jquery.cycle2.caption2.min.js]="jquery.cycle2.caption2.min.js"
arr_cycle[jquery.cycle2.carousel.min.js]="jquery.cycle2.carousel.min.js"
arr_cycle[jquery.cycle2.center.min.js]="jquery.cycle2.center.min.js"
arr_cycle[jquery.cycle2.command.min.js]="jquery.cycle2.command.min.js"
arr_cycle[jquery.cycle2.core.min.js]="jquery.cycle2.core.min.js"
arr_cycle[jquery.cycle2.flip.min.js]="jquery.cycle2.flip.min.js"
arr_cycle[jquery.cycle2.hash.min.js]="jquery.cycle2.hash.min.js"
arr_cycle[jquery.cycle2.ie-fade.min.js]="jquery.cycle2.ie-fade.min.js"
arr_cycle[jquery.cycle2.loader.min.js]="jquery.cycle2.loader.min.js"
arr_cycle[jquery.cycle2.lookahead.min.js]="jquery.cycle2.lookahead.min.js"
arr_cycle[jquery.cycle2.pager.min.js]="jquery.cycle2.pager.min.js"
arr_cycle[jquery.cycle2.prevnext.min.js]="jquery.cycle2.prevnext.min.js"
arr_cycle[jquery.cycle2.progressive.min.js]="jquery.cycle2.progressive.min.js"
arr_cycle[jquery.cycle2.scrollVert.min.js]="jquery.cycle2.scrollVert.min.js"
arr_cycle[jquery.cycle2.shuffle.min.js]="jquery.cycle2.shuffle.min.js"
arr_cycle[jquery.cycle2.swipe.min.js]="jquery.cycle2.swipe.min.js"
arr_cycle[jquery.cycle2.tile.min.js]="jquery.cycle2.tile.min.js"
arr_cycle[jquery.cycle2.tmpl.min.js]="jquery.cycle2.tmpl.min.js"
arr_cycle[jquery.cycle2.video.min.js]="jquery.cycle2.video.min.js"
arr_cycle[jquery.cycle2.autoheight.min.js]="core/jquery.cycle2.autoheight.min.js"
arr_cycle[jquery.cycle2.caption.min.js]="core/jquery.cycle2.caption.min.js"
arr_cycle[jquery.cycle2.command.min.js]="core/jquery.cycle2.command.min.js"
arr_cycle[jquery.cycle2.core.min.js]="core/jquery.cycle2.core.min.js"
arr_cycle[jquery.cycle2.hash.min.js]="core/jquery.cycle2.hash.min.js"
arr_cycle[jquery.cycle2.loader.min.js]="core/jquery.cycle2.loader.min.js"
arr_cycle[jquery.cycle2.pager.min.js]="core/jquery.cycle2.pager.min.js"
arr_cycle[jquery.cycle2.prevnext.min.js]="core/jquery.cycle2.prevnext.min.js"
arr_cycle[jquery.cycle2.progressive.min.js]="core/jquery.cycle2.progressive.min.js"
arr_cycle[jquery.cycle2.tmpl.min.js]="core/jquery.cycle2.tmpl.min.js"
arr_cycle[jquery.cycle2.caption2.min.js]="plugin/jquery.cycle2.caption2.min.js"
arr_cycle[jquery.cycle2.carousel.min.js]="plugin/jquery.cycle2.carousel.min.js"
arr_cycle[jquery.cycle2.center.min.js]="plugin/jquery.cycle2.center.min.js"
arr_cycle[jquery.cycle2.flip.min.js]="plugin/jquery.cycle2.flip.min.js"
arr_cycle[jquery.cycle2.ie-fade.min.js]="plugin/jquery.cycle2.ie-fade.min.js"
arr_cycle[jquery.cycle2.scrollVert.min.js]="plugin/jquery.cycle2.scrollVert.min.js"
arr_cycle[jquery.cycle2.shuffle.min.js]="plugin/jquery.cycle2.shuffle.min.js"
arr_cycle[jquery.cycle2.swipe.min.js]="plugin/jquery.cycle2.swipe.min.js"
arr_cycle[jquery.cycle2.tile.min.js]="plugin/jquery.cycle2.tile.min.js"
arr_cycle[jquery.cycle2.video.min.js]="plugin/jquery.cycle2.video.min.js"


# =============================================================================
# CHECK RESOURCE
# =============================================================================
function check_resource() {
    path=$1
    folder=$(echo -e "$path" | cut -d"/" -f3)

    if [ "$CHECK" != "ALL" ] && [ "$CHECK" != "$folder" ]; then
        return 0
    fi

    ((COUNTER_ALL++))
    echo -e "$DIVIDER"
    echo -e "SCANNED:     ${COUNTER_ALL}/${#array[@]}"
    echo -e "PATH:        $i"

    version=$(echo -e "$path" | cut -d"/" -f4)
    file=$(echo -e "$path" | cut -d"/" -f5)
    subfile=$(echo -e "$path" | awk -F"/" '{print $NF}')
    jfile=$file
    url=""
    is_javascript=false
    error=false

    if [[ $path =~ $REGEX_JS ]]; then
        path=$(echo "$path" | sed 's/.$//')
        jfile=$(echo "$file" | sed 's/.$//')
        subfile=$(echo "$subfile" | sed 's/.$//')
        is_javascript=true
    fi

    # Get URL of CDN
    create_url

    if [ "$ONLY_THIRD_PARTY" = true ]; then
        third_party+=("${url}")
        return 0
    fi

    # Random sleep if the CDN rejects connections (DoS)
    # sleeps 0.1s - 0.9s per request
    #sleep 0.$(( (RANDOM % 10) + 1 ))s

    # Use Tor Proxy if set
    if [ "$USE_TOR" = true ]; then
        if ! torsocks wget -t 3 -qO ./tmp "$url"; then
            error=true
        fi
    else
        if ! wget -t 3 -qO ./tmp "$url"; then
            error=true
        fi
    fi

    if [ "$error" = true ]; then
        echo -e "${YELLOW}LOCAL HASH:  -${NOCOLOR}"
        echo -e "${YELLOW}REMOTE HASH: -${NOCOLOR}"
        echo -e "${YELLOW}STATUS:      NO CONNECTION $url${NOCOLOR}"
        FILES_NO_CONNECTION="${YELLOW}No connection: $path --> $url${NOCOLOR}\n$FILES_NO_CONNECTION"
        ((COUNTER_CONNECT_FAILED++))
        return 0
    fi

    # Calculate hash value
    LOCAL_HASH=$(sha512sum "$1" | cut -d " " -f 1)
    REMOTE_HASH=$(sha512sum ./tmp | cut -d " " -f 1)

    if [ "$LOCAL_HASH" != "$REMOTE_HASH" ]; then
        echo -e "${RED}LOCAL HASH:  $LOCAL_HASH${NOCOLOR}"
        echo -e "${RED}REMOTE HASH: $REMOTE_HASH${NOCOLOR}"
        echo -e "${RED}STATUS:      FAILED${NOCOLOR}"
        if [ "$REPLACE" = true ]; then
            if [ "$is_javascript" = true ]; then
                mv ./tmp "${path}m"
            else
                mv ./tmp "${path}"
            fi
            echo -e "${RED}             FILE ALREADY REPLACED${NOCOLOR}"
            FILES_FAILED="${RED}Hash mismatch: $path (File already replaced)${NOCOLOR}\n$FILES_FAILED"
        else
            # No replace
            FILES_FAILED="${RED}Hash mismatch: $path${NOCOLOR}\n$FILES_FAILED"
        fi
        ((COUNTER_HASH_FAILED++))
    else
        echo -e "${GREEN}LOCAL HASH:  $LOCAL_HASH${NOCOLOR}"
        echo -e "${GREEN}REMOTE HASH: $REMOTE_HASH${NOCOLOR}"
        echo -e "${GREEN}STATUS:      PASSED${NOCOLOR}"
        ((COUNTER_HASH_OK++))
    fi

    # Append URL to THIRD_PARTY.txt
    third_party+=("${url}")
}


# =============================================================================
# CREATE URLs
# =============================================================================
function create_url() {
    if [ "$folder" = "angular-stripe-checkout" ]; then
        url="$JSDELIVR/npm/angular-stripe-checkout@$version/angular-stripe-checkout.min.js"
    elif [ "$folder" = "ethjs" ]; then
        url="$JSDELIVR/npm/ethjs@$version/dist/ethjs.min.js"
    elif [ "$folder" = "findify-bundle" ]; then
        url="$JSDELIVR/npm/@findify/bundle@$version/dist/$subfile"
    elif [ "$folder" = "react-lifecycles-compat" ]; then
        url="$JSDELIVR/npm/react-lifecycles-compat@$version/react-lifecycles-compat.min.js"
    elif [ "$folder" = "react-side-effect" ]; then
        url="https://unpkg.com/react-side-effect@$version/lib/index.umd.min.js"
    elif [ "$folder" = "p2p-media-loader-core" ]; then
        url="$JSDELIVR/npm/p2p-media-loader-core@$version/build/p2p-media-loader-core.min.js"
    elif [ "$folder" = "p2p-media-loader-hlsjs" ]; then
        url="$JSDELIVR/npm/p2p-media-loader-hlsjs@$version/build/p2p-media-loader-hlsjs.min.js"
    elif [ "$folder" = "urlize" ]; then
        url="$JSDELIVR/npm/urlize.js/urlize.js"
    elif [ "$folder" = "videojs-seek-buttons" ]; then
        if [ "$subfile" = "videojs-seek-buttons.min.css" ]; then
            url="$JSDELIVR/npm/videojs-seek-buttons@$version/dist/videojs-seek-buttons.css"
        else
            url="$JSDELIVR/npm/videojs-seek-buttons@$version/dist/videojs-seek-buttons.min.js"
        fi
    elif [ "$folder" = "rocket-loader" ]; then
        url="$CLOUDFLARE_AJAX/7089c43e/cloudflare-static/rocket-loader.min.js"
    elif [ "$folder" = "google-material-design-icons" ]; then
        url="https://fonts.gstatic.com/s/materialicons/$version/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2"
    elif [ "$folder" = "object-assign" ]; then
        url="$JSDELIVR/npm/object-assign@4.1.1/index.js"
    elif [ "$folder" = "mirage2" ]; then
        url="$CLOUDFLARE_AJAX/04b3eb47/cloudflare-static/mirage2.min.js"
    elif [ "$folder" = "highlight.js" ]; then
        if [[ $path =~ .*\.(css|png)$ ]]; then
            url="$CLOUDFLARE/$folder/$version/styles/$subfile"
        elif [[ $subfile = "highlight.min.js" ]]; then
            url="$CLOUDFLARE/$folder/$version/$subfile"
        else
            url="$CLOUDFLARE/$folder/$version/languages/$subfile"
        fi
    elif [ "$folder" = "bootstrap-datepicker" ]; then
        if [[ $file =~ .*\.css$ ]]; then
            url="$CLOUDFLARE/$folder/$version/css/$file"
        elif [[ $jfile =~ .*bootstrap-datepicker.min.js$ ]]; then
            url="$CLOUDFLARE/$folder/$version/js/$jfile"
        else
            url="$CLOUDFLARE/$folder/$version/locales/$jfile"
        fi
    elif [ "$folder" = "bowser" ]; then
    	url="$CLOUDFLARE/bowser/$version/bundled.min.js"
    elif [ "$folder" = "select2" ]; then
        if [[ $subfile =~ (select2\.min\.js|select2\.full\.min\.js)$ ]]; then
            url="$CLOUDFLARE/$folder/$version/js/$subfile"
        elif [ "$subfile" = "select2.min.css" ]; then
            url="$CLOUDFLARE/$folder/$version/css/$subfile"
        else
            url="$CLOUDFLARE/$folder/$version/js/i18n/$subfile"
        fi
    elif [ "$folder" = "gsap" ]; then
        if [ "$version" = "1.20.5" ] || [ "$version" = "2.1.3" ]; then
            if [ "${arr_gsap[$jfile]}" != "" ]; then
                url="$CLOUDFLARE/$folder/$version/${arr_gsap[$subfile]}"
            else
                url="$CLOUDFLARE/$folder/$version/$subfile"
            fi
        else
            url="$CLOUDFLARE/$folder/$version/$jfile"
        fi
    elif [ "$folder" = "element-ui" ]; then
        if [ "$jfile" = "index.min.css" ]; then
            url="$CLOUDFLARE/$folder/$version/theme-chalk/index.min.css"
        elif [ "$jfile" = "index.min.js" ]; then
            url="$CLOUDFLARE/$folder/$version/$jfile"
        elif [ "$subfile" = "element-icons.woff" ]; then
            url="$CLOUDFLARE/$folder/$version/theme-chalk/fonts/element-icons.woff"
        else
            url="$CLOUDFLARE/$folder/$version/locale/$jfile"
        fi
    elif [ "$folder" = "bootstrap-multiselect" ]; then
        url="$CLOUDFLARE/$folder/$version/js/$jfile"
    elif [ "$folder" = "bootstrap-slider" ] && [ "$jfile" = "bootstrap-slider.min.css" ]; then
        url="$CLOUDFLARE/$folder/$version/css/$jfile"
    elif [ "$folder" = "drawer" ]; then
        if [[ $jfile =~ .*\.css$ ]]; then
            url="$CLOUDFLARE/$folder/$version/css/$jfile"
        elif [[ $jfile =~ .*\.js$ ]]; then
            url="$CLOUDFLARE/$folder/$version/js/$jfile"
        fi
    elif [ "$folder" = "jScrollPane" ]; then
        if [ "$jfile" = "jquery.jscrollpane.min.js" ]; then
            url="$CLOUDFLARE/$folder/$version/script/$jfile"
        fi
    elif [ "$folder" = "mdb-ui-kit" ]; then
        if [ "$jfile" = "mdb-ui-kit.min.css" ]; then
            url="$CLOUDFLARE/$folder/$version/mdb.min.css"
        elif [ "$jfile" = "mdb-ui-kit.min.js" ]; then
            url="$CLOUDFLARE/$folder/$version/mdb.min.js"
        fi
    elif [ "$folder" = "ember.js" ]; then
        if [ "$jfile" = "ember.min.js" ]; then
            url="$CLOUDFLARE/$folder/$version/ember.debug.js"
        fi
    elif [ "$folder" = "Modaal" ]; then
        if [ "$jfile" = "modaal.min.css" ]; then
            url="$CLOUDFLARE/$folder/$version/css/$jfile"
        elif [ "$jfile" = "modaal.min.js" ]; then
            url="$CLOUDFLARE/$folder/$version/js/$jfile"
        fi
    elif [ "$folder" = "owl-carousel" ]; then
        if [ "$version" = "1.3.3" ]; then
            url="$CLOUDFLARE/owl-carousel/$version/$jfile"
        else
            url="$CLOUDFLARE/OwlCarousel2/$version/$jfile"
        fi
    elif [ "$folder" = "p5.js" ]; then
        if [ "$jfile" = "p5.sound.min.js" ]; then
            url="$CLOUDFLARE/$folder/$version/addons/$jfile"
        else
            url="$CLOUDFLARE/$folder/$version/$jfile"
        fi
    elif [ "$folder" = "paginationjs" ]; then
        if [ "$jfile" = "pagination.min.css" ]; then
            url="$CLOUDFLARE/$folder/$version/pagination.css"
        else
            url="$CLOUDFLARE/$folder/$version/$jfile"
        fi
    elif [ "$folder" = "OwlCarousel2" ]; then
        if [ "$subfile" = "owl.carousel.min.js" ]; then
            url="$CLOUDFLARE/$folder/$version/$subfile"
        else
            url="$CLOUDFLARE/$folder/$version/assets/$subfile"
        fi
    elif [ "$folder" = "slider-pro" ]; then
        url="$CLOUDFLARE/$folder/$version/js/$jfile"
    elif [ "$folder" = "Swiper" ] && [ "$version" != "3.4.2" ] && [ "$version" != "4.5.1" ] && [ "$version" != "5.4.5" ]; then
        if [[ "$path" =~ .*swiper\.min\.css$ ]]; then
            url="$JSDELIVR/npm/swiper@$version/swiper-bundle.min.css"
        elif [[ "$path" =~ .*swiper\.min\.js$ ]]; then
            url="$JSDELIVR/npm/swiper@$version/swiper-bundle.min.js"
        fi
    elif [ "$folder" = "tooltipster" ] && [ "$version" = "4.2.8" ]; then
        url="$CLOUDFLARE/$folder/$version/js/tooltipster.bundle.min.js"
    elif [ "$folder" = "vue" ] && [ "$version" != "1.0.28" ] && [ "$version" != "2.6.12" ]; then
        url="$CLOUDFLARE/$folder/$version/vue.global.prod.js"
    elif [ "$folder" = "waypoints" ]; then
        if [ "$jfile" = "infinite.min.js" ] || [ "$jfile" = "inview.min.js" ] || [ "$jfile" = "sticky.min.js" ]; then
            url="$CLOUDFLARE/$folder/$version/shortcuts/$jfile"
        else
            url="$CLOUDFLARE/$folder/$version/$jfile"
        fi
    elif [ "$folder" = "twitter-bootstrap" ] && [ "$version" != "2.3.2" ]; then
        if [[ "$subfile" =~ \.css$ ]]; then
            url="$CLOUDFLARE/$folder/$version/css/$subfile"
        elif [[ "$subfile" =~ \.js$ ]]; then
            url="$CLOUDFLARE/$folder/$version/js/$subfile"
        elif [ "$subfile" = "glyphicons-halflings-regular.woff2" ]; then
            url="$CLOUDFLARE/twitter-bootstrap/3.4.1/fonts/glyphicons-halflings-regular.woff2"
        fi
    elif [ "$folder" = "twitter-bootstrap" ] && [ "$version" = "2.3.2" ]; then
        if [[ "$subfile" =~ \.css$ ]]; then
            url="$NETDNA_BOOTSTRAPCDN/$folder/$version/css/bootstrap-combined.no-icons.min.css"
        fi
    elif [ "$folder" = "webcomponentsjs" ]; then
        url="$CLOUDFLARE/$folder/2.5.0/webcomponents-loader.min.js"
    elif [ "$folder" = "vue-i18n" ] && [[ "$version" != 8* ]]; then
        url="$CLOUDFLARE/$folder/$version/vue-i18n.cjs.min.js"
    elif [ "$path" = "../resources/twitter-bootstrap/fonts/glyphicons-halflings-regular.woff2" ]; then
        url="$CLOUDFLARE/twitter-bootstrap/3.4.1/fonts/glyphicons-halflings-regular.woff2"
    elif [ "$subfile" = "jquery-ui.min.css" ]; then
        url="$CLOUDFLARE/jqueryui/1.8.24/themes/base/minified/jquery-ui.min.css"
    elif [ "$folder" = "raven.js" ]; then
        url="$JSDELIVR/npm/raven-js@3.27.2/dist/raven.min.js"
    elif [ "$folder" = "jquery-validate" ]; then
        url="$GITHUB/jquery-validation/jquery-validation/$version/dist/jquery.validate.min.js"
    elif [ "$folder" = "jquery-validate" ]; then
        url="$GITHUB/jquery-validation/jquery-validation/$version/dist/jquery.validate.min.js"
    elif [ "$folder" = "history" ] && [ "$version" = "5.0.0" ] && [ "$jfile" = "history.min.js" ]; then
        url="$CLOUDFLARE/history/5.0.0/history.production.min.js"
    elif [ "$folder" = "ember.js" ] && [ "$version" = "3.24.2" ] && [ "$jfile" = "ember.min.js" ]; then
        url="$CLOUDFLARE/ember.js/3.24.2/ember.debug.js"
    elif [ "$folder" = "dojo" ]; then
        url="$CLOUDFLARE/dojo/$version/dojo.min.js"
    elif [ "$folder" = "material-design-icons" ]; then
        url="$GITHUB/Templarian/MaterialDesign-Webfont/v$version/$jfile/$subfile"
    elif [ "$folder" = "algoliasearch" ]; then
        if [ "$version" = "3.35.1" ]; then
            url="$CLOUDFLARE/algoliasearch/$version/algoliasearch.min.js"
        else
            url="$CLOUDFLARE/algoliasearch/$version/algoliasearch.umd.min.js"
        fi
    elif [ "$folder" = "angular-translate" ]; then
        if [ "$subfile" = "angular-translate.min.js" ]; then
            url="$CLOUDFLARE/angular-translate/$version/$subfile"
        else
            subfolder=$(echo -e "$subfile" | sed 's/\.min\.js//')
            url="$CLOUDFLARE/$folder/$version/$subfolder/$subfile"
        fi
    elif [ "$folder" = "ajax-bootstrap-select" ]; then
        url="$CLOUDFLARE/$folder/$version/js/$subfile"
    elif [ "$folder" = "algoliasearch3.33.0_algoliasearchLite_algoliasearchHelper.jsm" ]; then
        url="$JSDELIVR/g/algoliasearch@3(algoliasearchLite.min.js),algoliasearch.helper@2"
    elif [ "$subfile" = "videojs-seek-buttons.min.js" ]; then
        url="$JSDELIVR/npm/videojs-seek-buttons/dist/videojs-seek-buttons.js"
    elif [ "$subfile" = "jsdelivr-combine-jquery-hogan-algoliasearch-autocomplete.js" ]; then
        url="$JSDELIVR/combine/npm/jquery@2.2.4/dist/jquery.min.js,npm/hogan.js@3.0.2/dist/hogan-3.0.2.min.js,npm/algoliasearch@3.30.0/dist/algoliasearch.min.js,npm/autocomplete.js@0.31.0/dist/autocomplete.min.js"
    elif [ "$folder" = "vue-resource" ]; then
        url="$GITHUB/pagekit/vue-resource/$version/dist/vue-resource.min.js"
    elif [ "$path" = "../resources/webfont/fa-loader.js" ]; then
        url="https://use.fontawesome.com/a1f20be65b.js"
    elif [ "$folder" = "jquery.cycle2" ]; then
        if [ "${arr_cycle[$subfile]}" != "" ]; then
            url="$CLOUDFLARE/$folder/$version/${arr_cycle[$subfile]}"
        fi
    elif [ "$folder" = "semantic-ui" ]; then
        relativpath=$(echo -e "$path" | awk -F"../$folder/$version" '{print $NF}')
        url="$CLOUDFLARE/$folder/$version/$relativpath"
    elif [ "$folder" = "Chart.js" ] && [ "$version" != "2.9.4" ]; then
        url="$JSDELIVR/npm/chart.js@$version/dist/chart.min.js"
    elif [ "$folder" = "angular-ui-select" ] && [ "$version" = "0.19.8" ]; then
        url="$JSDELIVR/npm/ui-select@$version/dist/select.min.js"
    elif [ "$folder" = "plyr" ]; then
        if [ "$jfile" = "plyr.min.js" ]; then
            url="$JSDELIVR/npm/plyr@$version/dist/plyr.min.js"
        elif [ "$jfile" = "plyr.min.css" ]; then
            url="$JSDELIVR/npm/plyr@$version/dist/plyr.css"
        fi
    elif [ "$folder" = "anchor-js" ]; then
        url="$JSDELIVR/npm/anchor-js@$version/$subfile"
    elif [ "$folder" = "fancybox" ] && [ "$version" = "2.1.7" ]; then
        if [[ $file =~ .*\.css$ ]]; then
            url="$CLOUDFLARE/$folder/$version/css/$file"
        else
            url="$CLOUDFLARE/$folder/$version/js/$jfile"
        fi
    elif [ "$folder" = "appboy-web-sdk" ]; then
        url="$JSDELIVR/npm/appboy-web-sdk@$version/$subfile"
    else
        if [ "$subfile" = "$jfile" ]; then
            url="$CLOUDFLARE/$folder/$version/$subfile"
        else
            url="$CLOUDFLARE/$folder/$version/$file/$subfile"
        fi
    fi
}


# =============================================================================
# MAIN
# =============================================================================

# Check if all used commands exist
pre_check

# Handle arguments
while getopts d:fhlrtu opt; do
   case $opt in
       d) CHECK="$OPTARG";;
       f) CREATE_THIRD_PARTY_FILE=true;;
       h) help;;
       l) list_resources;;
       r) REPLACE=true;;
       t) USE_TOR=true;;
       u) ONLY_THIRD_PARTY=true && CREATE_THIRD_PARTY_FILE=true;;
       ?) help;;
   esac
done


array=()
third_party=()

# Find files in /resource/
while IFS=  read -r -d $'\0'; do
    array+=("$REPLY")
done < <(find ../resources/ -type f \( -iname "*.jsm" -or -iname "*.css" -or -iname "*.woff" -or -iname "*.woff2" \) ! -iname "fa-loader.css" ! -iname "google-material-design-icons.css" -print0)


for i in "${array[@]}"; do
    check_resource "$i"
done

# remove temporary file
rm ./tmp 2> /dev/null

IFS=$'\n' sorted=($(sort <<<"${third_party[*]}"))
unset IFS

# create THIRD_PARTY.txt
if [ "$CREATE_THIRD_PARTY_FILE" = true ]; then
    printf "%s\n" "${sorted[@]}" > ../THIRD_PARTY.txt
fi

echo -e "\n\n\n"
echo -e "$DIVIDER"
echo -e "${GREEN}${BOLD}D O N E${NORMAL}${NOCOLOR}"
echo -e "$DIVIDER"
echo -e "${BOLD}Total:${NORMAL}          $COUNTER_ALL"
echo -e ""
echo -e "${BOLD}Hash passed:  ${NORMAL}  $COUNTER_HASH_OK"
echo -e "${BOLD}Hash mismatch:${NORMAL}  $COUNTER_HASH_FAILED"
echo -e "${BOLD}Skipped:      ${NORMAL}  $COUNTER_SKIPPED"
echo -e "${BOLD}No connection:${NORMAL}  $COUNTER_CONNECT_FAILED"
echo -e ""
echo -e "$FILES_FAILED$FILES_SKIPPED$FILES_NO_CONNECTION"
echo -e ""
