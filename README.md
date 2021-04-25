# LocalCDN

[![Translate](https://www.localcdn.org/badges/translation.svg)](https://hosted.weblate.org/projects/localcdn/localcdn/) [![CDNs](https://www.localcdn.org/badges/cdn.svg)](https://codeberg.org/nobody/LocalCDN/src/branch/main/core/mappings.js) [![Frameworks](https://www.localcdn.org/badges/frameworks.svg)](https://codeberg.org/nobody/LocalCDN/src/branch/main/resources/) [![Firefox Add-on](https://www.localcdn.org/badges/amo-version.svg)](https://addons.mozilla.org/de/firefox/addon/localcdn-fork-of-decentraleyes/) [![Chrome Add-on](https://www.localcdn.org/badges/chrome-version.svg)](https://chrome.google.com/webstore/detail/localcdn/njdfdhgcmkocbgbhcioffdbicglldapd/)

A web browser extension (and a fork of Decentraleyes) that emulates Content Delivery Networks to improve your online privacy. It intercepts traffic, finds supported resources locally, and injects them into the environment. All of this happens automatically, so no prior configuration is required. Feel free to use the following [testing utility](https://www.localcdn.org/test/) to find out if you are properly protected. For more information, please read the [tutorial](https://www.localcdn.org/tutorial) or the [Wiki](https://codeberg.org/nobody/LocalCDN/wiki). You can also [download](https://addons.mozilla.org/en-US/firefox/addon/localcdn-fork-of-decentraleyes/) the extension directly from Mozilla and just try it.

### What are the advantages?

* Supports cloud storage by browsers sync feature (Firefox Sync or own Sync-Server) if enabled <img width="15px" src="https://www.localcdn.org/img/icon-firefox-25.png"> <img width="15px" src="https://www.localcdn.org/img/icon-chrome-25.png">
* Removes integrity and crossorigin tags from embedded script and style elements to replace even more frameworks <img width="15px" src="https://www.localcdn.org/img/icon-firefox-25.png">
* Font Awesome  <img width="15px" src="https://www.localcdn.org/img/icon-firefox-25.png">
* Google Material Icons <img width="15px" src="https://www.localcdn.org/img/icon-firefox-25.png">
* jQuery up to 3.5.1 <img width="15px" src="https://www.localcdn.org/img/icon-firefox-25.png"> <img width="15px" src="https://www.localcdn.org/img/icon-chrome-25.png">
* Bootstrap CSS <img width="15px" src="https://www.localcdn.org/img/icon-firefox-25.png">
* Bootstrap JavaScript <img width="15px" src="https://www.localcdn.org/img/icon-firefox-25.png"> <img width="15px" src="https://www.localcdn.org/img/icon-chrome-25.png">
* AngularJS, AngularJS-Animate, AngularJS-Sanitize, AngularJS-Cookies and AngularJS-Touch <img width="15px" src="https://www.localcdn.org/img/icon-firefox-25.png"> <img width="15px" src="https://www.localcdn.org/img/icon-chrome-25.png">
* React, Vue.js, Chart.js and many other frameworks/libraries <img width="15px" src="https://www.localcdn.org/img/icon-firefox-25.png"> <img width="15px" src="https://www.localcdn.org/img/icon-chrome-25.png">
* Internal statistics about CDNs and frameworks (day, week, month, year) <img width="15px" src="https://www.localcdn.org/img/icon-firefox-25.png"> <img width="15px" src="https://www.localcdn.org/img/icon-chrome-25.png">
* Export/Import your config (day, week, month, year) <img width="15px" src="https://www.localcdn.org/img/icon-firefox-25.png"> <img width="15px" src="https://www.localcdn.org/img/icon-chrome-25.png">
* Prepared rules for uBlock Origin, uMatrix and AdGuard <img width="15px" src="https://www.localcdn.org/img/icon-firefox-25.png"> <img width="15px" src="https://www.localcdn.org/img/icon-chrome-25.png">

> **Note:** LocalCDN is no silver bullet, but it does prevent a lot of websites from making you send these kinds of requests. Ultimately, you can make LocalCDN block requests for any missing CDN resources, too.

#### How does it work?
LocalCDN uses redirection for certain requests. There is a [mapping file](https://codeberg.org/nobody/LocalCDN/src/branch/main/core/mappings.js#L71) that lists the source (all CDNs and the path to the frameworks) and a [resource file](https://codeberg.org/nobody/LocalCDN/src/branch/main/core/resources.js#L328) that defines the destination.

Currently only JavaScript and CSS files are redirected. However, some CSS files internally refer to other files, e.g. Font Awesome. All requests are redirected to a local file, e.g. [jQuery](https://codeberg.org/nobody/LocalCDN/src/branch/main/resources/jquery). This is the reason why the extension is currently 10 MB in size. Only if LocalCDN cannot find a local resource (and the option is enabled), a request will be blocked.

An adblocker (e.g. uBlock Origin, uMatrix or AdGuard) decides which requests are allowed. Only if your adblocker allows a request, it will be intercepted by LocalCDN. LocalCDN catches the request after an adblocker and not before.

## What's the different of LocalCDN in comparison to other CDN emulators?

#### LocalCDN
[<img src="screenshots/replacement_html_filter_off.png" alt="LocalCDN" width="500"/>](screenshots/replacement_html_filter_off.png)

#### LocalCDN with activated HTML filter (optional)
[<img src="screenshots/replacement_html_filter_on.png" alt="LocalCDN with activated HTML filter (optional)" width="500"/>](screenshots/replacement_html_filter_on.png)

#### Other CDN emulators
[<img src="screenshots/replacement_other_cdn_emulators.png" alt="Other CDN emulators" width="500"/>](screenshots/replacement_other_cdn_emulators.png)

## We need you!

![We Need You!](pages/images/we-need-you.png?raw=true "We Need You!")

The whole Internet is full of different frameworks and CDNs that negatively affect your privacy. If you find a website that embeds another unsupported version of a framework, please report that website.

#### :warning: **Important** :warning:

In some cases, it isn't possible to use our framework because the website sets up a strong "Same Origin Policy" (SOP). Please read [Broken JavaScript or CSS on some websites](https://codeberg.org/nobody/LocalCDN/wiki/Home#user-content-7-a-website-looks-weird-or-cannot-be-used-if-i-deactivate-localcdn-everything-works-what-is-the-problem) before opening an issue.

On behalf of everyone: Thank you!

## Screenshots

#### Light
[<img src="screenshots/screenshot_light.png" alt="Light Theme" width="500"/>](screenshots/screenshot_light.png)

#### Dark
[<img src="screenshots/screenshot_dark.png" alt="Dark Theme" width="500"/>](screenshots/screenshot_dark.png)

#### Rule generator for uBlock Origin, uMatrix and AdGuard (after an update)
[<img src="screenshots/screenshot_after_update.png" alt="Rule generator after an update" width="500"/>](screenshots/screenshot_after_update.png)

#### Settings
[<img src="screenshots/screenshot_settings_1.png" alt="Settings (Basic)" width="500"/>](screenshots/screenshot_settings_1.png)

[<img src="screenshots/screenshot_settings_2.png" alt="Settings (Advanced)" width="500"/>](screenshots/screenshot_settings_2.png)

[<img src="screenshots/screenshot_settings_3.png" alt="Settings (Other)" width="500"/>](screenshots/screenshot_settings_3.png)

[<img src="screenshots/screenshot_settings_4.png" alt="Settings (Info)" width="500"/>](screenshots/screenshot_settings_4.png)

#### Internal statistics
[<img src="screenshots/screenshot_statistics_light.png" alt="Internal statistics" width="200"/>](screenshots/screenshot_statistics_light.png) [<img src="screenshots/screenshot_statistics_dark.png" alt="Internal statistics" width="200"/>](screenshots/screenshot_statistics_dark.png)

## Contributing Code

Suggestions in the form of **Issues**, and contributions in the form of **Merge Requests**, are highly welcome.

## Installation

* Mozilla Firefox *(63 or higher)*: [get it on addons.mozilla.org](https://addons.mozilla.org/en-US/firefox/addon/localcdn-fork-of-decentraleyes/)
* Chromium based browser: [Chrome Web Store (by Emanuel Bennici)](https://chrome.google.com/webstore/detail/localcdn-fork-from-decent/njdfdhgcmkocbgbhcioffdbicglldapd) :warning: **Please note this Wiki article [FAQ: Chromium incompatibilities](https://codeberg.org/nobody/LocalCDN/wiki/Home#user-content-2-can-i-use-this-extension-in-my-chrome-browser)** :warning:

#### Running the Code as temporary extension

Please read this [guide](https://codeberg.org/nobody/LocalCDN/wiki/Home#user-content-5-you-recently-changed-something-in-the-code-and-i-would-like-to-test-it-how-do-you-do-that) to run the extension from source.

> **Important:** All tagged commits are signed with GPG. It's likely best to ignore unsigned commits, unless you really know what you're doing. Please send an email if you have any questions or security concerns.

## Contact

Just open an issue with your question or write an [email](https://www.localcdn.org/contact/) (PGP possible!).

## Submitting Translations
The language you want is not completely translated or you are a language talent? Please help us by translating this add-on on [Weblate](https://hosted.weblate.org/projects/localcdn/).

## Donations

LocalCDN is free and open-source. If you like LocalCDN you can support continued development by making a donation. Any help would be greatly appreciated!

* IBAN: `DE22 5003 1000 1069 4660 16` (BIC: `TRODDEF1XXX`)
* Bitcoin: `1C4GRNyuUFkp9dMDjUkV4TwDwdfxdgLzde`
* Ether: `0x2df49c1186f8b615c2059f29c3ed7f9f86d49552`
* Monero: `46j26ggSZNT9rN7VeFYXp2PsKEMyJSSYneBVKXY4xeemdfZfCpNg6tQEXQZpWiTTuGX3SbnDPwuh3167cCoYSrqN72H9jPk`

## License

[MPL-2.0](https://www.mozilla.org/MPL/2.0).

#### External libraries

* Color Picker (Taufik Nurrohman, https://github.com/taufik-nurrohman/color-picker, MIT License)
