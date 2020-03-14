LocalCDN (forked from Decentraleyes)
=============

A web browser extension that emulates Content Delivery Networks to improve your online privacy. It intercepts traffic, finds supported resources locally, and injects them into the environment. All of this happens automatically, so no prior configuration is required. Feel free to use the following [testing utility](https://decentraleyes.org/test/) to find out if you are properly protected. For more information, please read this [basic introduction from Decentraleyes](https://git.synz.io/Synzvato/decentraleyes/wikis/Simple-Introduction) or our [Wiki pages](https://gitlab.com/nobody42/localcdn/-/wikis/home).

## Differences between LocalCDN and Decentraleyes

LocalCDN based on Decentraleyes. It includes more frameworks and more CDNs:

* **New: Font Awesome v4.7.0 and v5.7.2** :tada: :tada: :tada:
* jQuery up to 3.4.1
* Bootstrap CSS (Delivered by StackPath, NetDNA and MaxCDN)
* Bootstrap JavaScript (Delivered by StackPath, NetDNA and MaxCDN)
* AngularJS, AngularJS-Animate, AngularJS-Sanitize, AngularJS-Cookies and AngularJS-Touch
* Prepared rules for uBlock/uMatrix

> **Note:** LocalCDN is no silver bullet, but it does prevent a lot of websites from making you send these kinds of requests. Ultimately, you can make LocalCDN block requests for any missing CDN resources, too.

## We need you!

![We Need You!](/pages/welcome/we-need-you.png?raw=true "We Need You!")

The whole Internet is full of different frameworks and CDNs that negatively affect your privacy. If you find a website that embeds another unsupported version of a framework, please report that website.


### :warning: **Important** :warning:

In some cases, it isn't possible to use our framework because the website sets up a strong "Same Origin Policy" (SOP). Please read [Broken JavaScript or CSS on some websites](https://gitlab.com/nobody42/localcdn/-/wikis/Broken-JavaScript-or-CSS-on-some-websites) before opening an issue.

On behalf of everyone: Thank you!

## Screenshots
<img src="/screenshots/screenshot01.png?raw=true" alt="Counter for locally injected resources" width="200px">
<img src="/screenshots/screenshot02.png?raw=true" alt="Successfully intercepted requests" width="200px">
<img src="/screenshots/screenshot03.png?raw=true" alt="Successfully intercepted requests" width="200px">
<img src="/screenshots/screenshot04.png?raw=true" alt="Release notes and uBlock/uMatrix rule generator" width="200px">
<img src="/screenshots/screenshot05.png?raw=true" alt="Release notes and uBlock/uMatrix rule generator" width="200px">
<img src="/screenshots/screenshot06.png?raw=true" alt="Preferences page and uBlock/uMatrix rule generator" width="200px">
<img src="/screenshots/screenshot07.png?raw=true" alt="Preferences page and uBlock/uMatrix rule generator" width="200px">

## Contributing Code

Suggestions in the form of **Issues**, and contributions in the form of **Merge Requests**, are highly welcome.

#### Installation

* Mozilla Firefox *(63 or higher)*: [get it on addons.mozilla.org](https://addons.mozilla.org/en-US/firefox/addon/localcdn-fork-of-decentraleyes/)
* Chromium based browser: [check out the Wiki page](https://gitlab.com/nobody42/localcdn/-/wikis/Install-on-Chromium-based-browsers)

#### Running the Code

Please read this [developer guide](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Your_first_WebExtension#Trying_it_out) for information on how to run the extension from source.

> **Important:** All tagged commits are signed with GPG. It's likely best to ignore unsigned commits, unless you really know what you're doing. Please send an email if you have any questions or security concerns.

## License

[MPL-2.0](https://www.mozilla.org/MPL/2.0).
