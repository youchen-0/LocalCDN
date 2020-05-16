LocalCDN (forked from Decentraleyes)
=============

A web browser extension that emulates Content Delivery Networks to improve your online privacy. It intercepts traffic, finds supported resources locally, and injects them into the environment. All of this happens automatically, so no prior configuration is required. Feel free to use the following [testing utility](https://localcdn.de/test/) to find out if you are properly protected. For more information, please read this [basic introduction from Decentraleyes](https://git.synz.io/Synzvato/decentraleyes/wikis/Simple-Introduction) or our [Wiki pages](https://gitlab.com/nobody42/localcdn/-/wikis/home).

## Differences between LocalCDN and Decentraleyes

LocalCDN based on Decentraleyes. It includes more frameworks and more CDNs:

* **NEW: Removed integrity checks of embedded script and style elements** :tada: :tada: :tada:
* Font Awesome
* jQuery up to 3.4.1
* Bootstrap CSS (Delivered by StackPath, NetDNA and MaxCDN)
* Bootstrap JavaScript (Delivered by StackPath, NetDNA and MaxCDN)
* AngularJS, AngularJS-Animate, AngularJS-Sanitize, AngularJS-Cookies and AngularJS-Touch
* Prepared rules for uBlock/uMatrix

> **Note:** LocalCDN is no silver bullet, but it does prevent a lot of websites from making you send these kinds of requests. Ultimately, you can make LocalCDN block requests for any missing CDN resources, too.

## What is the different of LocalCDN in comparison to other CDN emulators?

<img src="//screenshots/replacement.png?raw=true" alt="Replacement of Libraries" width="400px">

## We need you!

![We Need You!](/pages/welcome/we-need-you.png?raw=true "We Need You!")

The whole Internet is full of different frameworks and CDNs that negatively affect your privacy. If you find a website that embeds another unsupported version of a framework, please report that website.


### :warning: **Important** :warning:

In some cases, it isn't possible to use our framework because the website sets up a strong "Same Origin Policy" (SOP). Please read [Broken JavaScript or CSS on some websites](https://gitlab.com/nobody42/localcdn/-/wikis/faq/Broken-JavaScript-or-CSS-on-some-websites) before opening an issue.

On behalf of everyone: Thank you!

## Screenshots

### Light
<img src="/screenshots/screenshot01_light.png?raw=true" alt="Counter for locally injected resources (enabled)" width="200px">
<img src="/screenshots/screenshot02_light.png?raw=true" alt="Counter for locally injected resources (disabled)" width="200px">
<img src="/screenshots/screenshot03_light.png?raw=true" alt="Successfully intercepted requests" width="200px">
<img src="/screenshots/screenshot04_light.png?raw=true" alt="Successfully intercepted requests" width="200px">

### Dark
<img src="/screenshots/screenshot01_dark.png?raw=true" alt="Counter for locally injected resources (enabled)" width="200px">
<img src="/screenshots/screenshot02_dark.png?raw=true" alt="Counter for locally injected resources (disabled)" width="200px">
<img src="/screenshots/screenshot03_dark.png?raw=true" alt="Successfully intercepted requests" width="200px">
<img src="/screenshots/screenshot04_dark.png?raw=true" alt="Successfully intercepted requests" width="200px">

### Rule generator for uBlock/uMatrix
<img src="/screenshots/screenshot06.png?raw=true" alt="Release notes and uBlock/uMatrix rule generator" width="200px">
<img src="/screenshots/screenshot07.png?raw=true" alt="Release notes and uBlock/uMatrix rule generator" width="200px">
<img src="/screenshots/screenshot08.png?raw=true" alt="Preferences page and uBlock/uMatrix rule generator" width="200px">
<img src="/screenshots/screenshot09.png?raw=true" alt="Preferences page and uBlock/uMatrix rule generator" width="200px">

## Contributing Code

Suggestions in the form of **Issues**, and contributions in the form of **Merge Requests**, are highly welcome.

#### Installation

* Mozilla Firefox *(63 or higher)*: [get it on addons.mozilla.org](https://addons.mozilla.org/en-US/firefox/addon/localcdn-fork-of-decentraleyes/)
* Chromium based browser: [Chrome Web Store (by Emanuel Bennici :+1:)](https://chrome.google.com/webstore/detail/localcdn-fork-from-decent/njdfdhgcmkocbgbhcioffdbicglldapd)

#### Running the Code

Please read this [developer guide](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Your_first_WebExtension#Trying_it_out) for information on how to run the extension from source.

> **Important:** All tagged commits are signed with GPG. It's likely best to ignore unsigned commits, unless you really know what you're doing. Please send an email if you have any questions or security concerns.

## Contact

Just open an issue with your question or write an email. The address and a PGP key can be found [here](https://localcdn.de/contact/).


## Donations

LocalCDN is free, open-source and based on Decentraleyes. If you like LocalCDN and/or Decentraleyes you can support continued development by making a donation. Any help would be greatly appreciated!
* [Donate to LocalCDN](https://localcdn.de/donate/)
* [Donate to Decentraleyes](https://decentraleyes.org/donate)

## License

[MPL-2.0](https://www.mozilla.org/MPL/2.0).
