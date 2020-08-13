# LocalCDN

[![Translate](https://www.localcdn.org/badges/translation.svg)](https://hosted.weblate.org/projects/localcdn/localcdn/) [![CDNs](https://www.localcdn.org/badges/cdn.svg)](https://codeberg.org/nobody/LocalCDN/src/branch/main/core/mappings.js) [![Frameworks](https://www.localcdn.org/badges/frameworks.svg)](https://codeberg.org/nobody/LocalCDN/src/branch/main/resources/)

A web browser extension (and a fork of Decentraleyes) that emulates Content Delivery Networks to improve your online privacy. It intercepts traffic, finds supported resources locally, and injects them into the environment. All of this happens automatically, so no prior configuration is required. Feel free to use the following [testing utility](https://www.localcdn.org/test/) to find out if you are properly protected. For more information, please read the [tutorial](https://www.localcdn.org/tutorial) or our [Wiki pages](https://codeberg.org/nobody/LocalCDN/wiki). You can also [download](https://addons.mozilla.org/en-US/firefox/addon/localcdn-fork-of-decentraleyes/) the extension directly from Mozilla and just try it.

## How does it work?
LocalCDN uses redirection for certain requests. There is a [mapping file](https://codeberg.org/nobody/LocalCDN/src/branch/main/core/mappings.js#L71) that lists the source (all CDNs and the path to the frameworks) and a [resource file](https://codeberg.org/nobody/LocalCDN/src/branch/main/core/resources.js#L328) that defines the destination.

Currently only JavaScript and CSS files are redirected. However, some CSS files internally refer to other files, e.g. Font Awesome. All requests are redirected to a local file, e.g. [jQuery](https://codeberg.org/nobody/LocalCDN/src/branch/main/resources/jquery). This is the reason why the extension is currently 10 MB in size. Only if LocalCDN cannot find a local resource (and the option is enabled), a request will be blocked.

An adblocker (uBlock Origin or uMatrix) decides which requests are allowed. Only if your adblocker allows a request, it will be intercepted by LocalCDN. LocalCDN catches the request after an adblocker and not before.

## Differences between LocalCDN and Decentraleyes

LocalCDN based on Decentraleyes. It includes more frameworks and more CDNs:

* Supports cloud storage by browsers sync feature (Firefox Sync or own Sync-Server) if enabled
* Removed integrity checks of embedded script and style elements (Firefox only)
* Font Awesome
* jQuery up to 3.5.1
* Bootstrap CSS (Delivered by StackPath, NetDNA and MaxCDN)
* Bootstrap JavaScript (Delivered by StackPath, NetDNA and MaxCDN)
* AngularJS, AngularJS-Animate, AngularJS-Sanitize, AngularJS-Cookies and AngularJS-Touch
* Prepared rules for uBlock/uMatrix

> **Note:** LocalCDN is no silver bullet, but it does prevent a lot of websites from making you send these kinds of requests. Ultimately, you can make LocalCDN block requests for any missing CDN resources, too.


## What is the different of LocalCDN in comparison to other CDN emulators?

![The Replacement of Libraries](screenshots/replacement.png?raw=true "The Replacement of Libraries")

**Advantages of LocalCDN:**

:thumbsup: more frameworks/libraries (> 100 :tada: :tada: :tada:)

:thumbsup: smaller size than other extensions

:thumbsup: remove crossorigin and integrity attributes of script and stylesheet tags to increase replacements (Firefox only)

:thumbsup: doesn't matter which version a website requested

:thumbsup: supports cloud storage if enabled


## We need you!

![We Need You!](pages/images/we-need-you.png?raw=true "We Need You!")

The whole Internet is full of different frameworks and CDNs that negatively affect your privacy. If you find a website that embeds another unsupported version of a framework, please report that website.


### :warning: **Important** :warning:

In some cases, it isn't possible to use our framework because the website sets up a strong "Same Origin Policy" (SOP). Please read [Broken JavaScript or CSS on some websites](https://codeberg.org/nobody/LocalCDN/wiki/Broken-JavaScript-or-CSS-on-some-websites) before opening an issue.

On behalf of everyone: Thank you!


## Screenshots

### Light
[<img src="screenshots/screenshot_light.png" alt="Light Theme" width="500"/>](screenshots/screenshot_light.png)

### Dark
[<img src="screenshots/screenshot_dark.png" alt="Dark Theme" width="500"/>](screenshots/screenshot_dark.png)

### Rule generator for uBlock/uMatrix (after an update)
[<img src="screenshots/screenshot_after_update.png" alt="Rule generator after an update" width="500"/>](screenshots/screenshot_after_update.png)

### Rule generator for uBlock/uMatrix (settings page)
[<img src="screenshots/screenshot_settings.png" alt="Rule generator on settings page" width="500"/>](screenshots/screenshot_settings.png)

### Internal statistics
[<img src="screenshots/screenshot_statistics_light.png" alt="Internal statistics" width="200"/>](screenshots/screenshot_statistics_light.png) [<img src="screenshots/screenshot_statistics_dark.png" alt="Internal statistics" width="200"/>](screenshots/screenshot_statistics_dark.png)

## Contributing Code

Suggestions in the form of **Issues**, and contributions in the form of **Merge Requests**, are highly welcome.

## Installation

* Mozilla Firefox *(63 or higher)*: [get it on addons.mozilla.org](https://addons.mozilla.org/en-US/firefox/addon/localcdn-fork-of-decentraleyes/)
* Chromium based browser: [Chrome Web Store (by Emanuel Bennici)](https://chrome.google.com/webstore/detail/localcdn-fork-from-decent/njdfdhgcmkocbgbhcioffdbicglldapd) :warning: **Please note this Wiki article [FAQ: Chromium incompatibilities](https://codeberg.org/nobody/LocalCDN/wiki/Chromium-incompatibilities)** :warning:

#### Running the Code as temporary extension

Please read this [guide](https://codeberg.org/nobody/LocalCDN/wiki/Running-the-code-as-temporary-extension) to run the extension from source.

> **Important:** All tagged commits are signed with GPG. It's likely best to ignore unsigned commits, unless you really know what you're doing. Please send an email if you have any questions or security concerns.

## Contact

Just open an issue with your question or write an [email](https://www.localcdn.org/contact/) (PGP possible!).

## Submitting Translations
The language you want is not completely translated or you are a language talent? Please help us by translating this add-on on [Weblate](https://hosted.weblate.org/projects/localcdn/).

## Donations

LocalCDN is free and open-source. If you like LocalCDN you can support continued development by making a donation. Any help would be greatly appreciated! Every way to donate can be found inside the extension (Just click on the heart). At the moment donations are possible with SEPA bank transfer, Bitcoin and Ether.

## License

[MPL-2.0](https://www.mozilla.org/MPL/2.0).
