# Contribution

The following is a set of guidelines for contributing to LocalCDN.

Pull requests are very welcome. Feel free to suggest changes to this or any other document in a pull request as well.


## Content
* [Guidelines](#guidelines)
* [Add new resources](#add-new-resources)
  * [Add bundled resources](#add-bundled-resources)
  * [Add simple resources](#add-simple-resources)
  * [Special cases](#special-cases)
* [Update Resource](#update-resource)
* [New CDNs](#new-cdns)
  * [CDN as a mirror](#cdn-as-a-mirror)
  * [CDN](#add-new-cdn)
* [Testing](#testing)

## Guidelines

* If possible please always use the minified version (`*.min.js` or `*.min.css`)
* File extension of the JavaScript resources must be changed from `*.min.js` to `*.min.jsm`
* For fonts only `*.woff` and `*.woff2` are necessary
* Follow the CDN structure (Primary CDN: `cdnjs.cloudflare.com`)

  ```
  [name]/[version]/[subdirectory]/[filename]
   or
  [name]/[version]/[filename]
  ```

  **Examples:**

  ```
  https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/js/bootstrap.min.js
                                                ↑            ↑    ↑      ↑   
  /resources/                            twitter-bootstrap/4.6.0/js/bootstrap.min.jsm
  ```
  ```
  https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/css/bootstrap.min.css
                                                ↑            ↑    ↑      ↑   
  /resources/                            twitter-bootstrap/4.6.0/css/bootstrap.min.css
  ```
  ```
  https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js
                                           ↑      ↑       ↑
  /resources/                            jquery/3.6.0/jquery.min.jsm
  ```

* Style guide

  Code formatting is mostly a matter of faith. Your code will probably work anyway, but readable code is very valuable. Regardless of what formatting is used, it is important that this is identical throughout the project. Therefore, please use the files located in the root directory for ESLint.

* Please do not add beta or any other test or pre-release. This is not allowed by Mozilla.

## Add new resources

### Difference between 'Simple' and 'Bundle'

If you want to add multiple files (more than 1x JavaScript and 1x Stylesheet), then integrate it as a bundle. This is easier than specifying all the files individually.

#### Add bundled resources

> Example: `highlight.js`
>
> Link: `https://cdnjs.com/libraries/highlight.js/10.7.1`
>
> CDN: `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.1/`

##### 1. Download all files to one directory: `/resources/highlight.js/10.7.1/`

Please note the file extensions. Only JavaScript files must be renamed to `*.jsm`. There is no need to rename `*.css`, `*.woff` and `*.woff2` files.

##### 2. Create resource in [`/core/resources.js`](https://codeberg.org/nobody/LocalCDN/src/commit/ad79ed13d5fee5e4892084d05d7a68e9d7c9f1aa/core/resources.js#L373-L376)

:warning: `{version}` is a placeholder and will be filled automatically by LocalCDN.

```javascript
var resources = {
   [...]
   // highlight.js (Bundle)
   'highlightJS': {
      'path': 'resources/highlight.js/{version}/'
   },
   [...]
};
```

##### 3. Specify bundle in [`/modules/internal/targets.js`](https://codeberg.org/nobody/LocalCDN/src/commit/d2506369ab5e7cf24633899a8887b1ae48840d75/modules/internal/targets.js#L40-L41)

```javascript
targets.determineBundle = function (path) {
   [...]
   } else if (path.startsWith('/highlight.js/')) {
      val = 'highlight.js';
   }
   [...]
};
```

##### 4. Specify version in [`/modules/internal/targets.js`](https://codeberg.org/nobody/LocalCDN/src/commit/d2506369ab5e7cf24633899a8887b1ae48840d75/modules/internal/targets.js#L264-L265)

```javascript
targets.setLastVersion = function (type, version) {
   [...]
   } else if (type.startsWith('/highlight.js/10.')) {
      return '10.7.1';
   }
   [...]
};
```

##### 5. Create mapping in [`/core/mappings.js`](https://codeberg.org/nobody/LocalCDN/src/commit/d2506369ab5e7cf24633899a8887b1ae48840d75/core/mappings.js#L280)

:warning: `{version}` is a placeholder and will be filled automatically by LocalCDN.

```javascript
mappings.cdn = {
   [...]
   // CDNJS (Cloudflare)
   'cdnjs.cloudflare.com': {
      '/ajax/libs/': {
         [...]
         'highlight.js/{version}/': resources.highlightJS,
         [...]
      }
   }
   [...]
};
```

##### 6. Run [`/audit/audit.sh`](https://codeberg.org/nobody/LocalCDN/src/branch/main/audit) (modify if necessary)
```
bash ./audit.sh -trd highlight.js
```

#### Add simple resources

> Example: `hls.js`
>
> Link: `https://cdnjs.com/libraries/hls.js/0.14.17`
>
> CDN: `https://cdnjs.cloudflare.com/ajax/libs/hls.js/0.14.17/hls.min.js`


##### 1. Download file (and rename if necessary) to: `/resources/hls.js/0.14.17/hls.min.jsm`

Please note the file extensions. Only JavaScript files must be renamed to `*.jsm`. There is no need to rename `*.css`, `*.woff` and `*.woff2` files.

##### 2. Create resource in [`/core/resources.js`](https://codeberg.org/nobody/LocalCDN/src/commit/ad79ed13d5fee5e4892084d05d7a68e9d7c9f1aa/core/resources.js#L381-L384)

:warning: `{version}` is a placeholder and will be filled automatically by LocalCDN.

```javascript
var resources = {
   [...]
   // hls.js
   'hlsJS': {
      'path': 'resources/hls.js/{version}/hls.min.jsm'
   },
   [...]
};
```

##### 3. Specify name in [`/modules/internal/targets.js`](https://codeberg.org/nobody/LocalCDN/src/commit/d2506369ab5e7cf24633899a8887b1ae48840d75/modules/internal/targets.js#L717)

```javascript
const ListOfFiles = {
   [...]
   'hls.min.jsm': 'hls.js',
   [...]
};
```

##### 4. Specify version in [`/modules/internal/targets.js`](https://codeberg.org/nobody/LocalCDN/src/commit/d2506369ab5e7cf24633899a8887b1ae48840d75/modules/internal/targets.js#L276-L277)

```javascript
targets.setLastVersion = function (type, version) {
   [...]
   } else if (type.startsWith('/hls.js/')) {
      return '0.14.17';
   }
   [...]
};
```

##### 5. Create mapping in [`/core/mappings.js`](https://codeberg.org/nobody/LocalCDN/src/commit/d2506369ab5e7cf24633899a8887b1ae48840d75/core/mappings.js#L489)

:warning: `{version}` is a placeholder and will be filled automatically by LocalCDN.

```javascript
mappings.cdn = {
   [...]
   // jsDelivr (Cloudflare)
   'cdn.jsdelivr.net': {
      '/npm/': {
         [...]
         'hls.js@{version}': resources.hlsJS,
         [...]
      }
   }
   [...]
};
```

##### 6. Run [`/audit/audit.sh`](https://codeberg.org/nobody/LocalCDN/src/branch/main/audit) (modify if necessary)
```
bash ./audit.sh -trd hls.js
```

#### Special cases

Sometimes it's necessary to define the mapping in [`/core/shorthands.js`](https://codeberg.org/nobody/LocalCDN/src/commit/d2506369ab5e7cf24633899a8887b1ae48840d75/core/shorthands.js). Mostly I do this when regular expressions are necessary.

A good example is **Google Material Icons**. These icons are fetched from the same domain as the regular fonts. So we have to use regular expressions to check all requests if the term `Material Icons` is present. The current regular expression is in [`/core/constants.js`](https://codeberg.org/nobody/LocalCDN/src/commit/d2506369ab5e7cf24633899a8887b1ae48840d75/core/constants.js#L203)

```javascript
const Regex = {
      [...]
      'GOOGLE_MATERIAL_ICONS': /fonts\.googleapis\.com\/(icon|css)\?family=.*Material\+Icons/,
      [...]
};
```
Usage in [`/core/shorthands.js`](https://codeberg.org/nobody/LocalCDN/src/commit/d2506369ab5e7cf24633899a8887b1ae48840d75/core/shorthands.js#L57-L64)
```javascript
shorthands.specialFiles = function (channelHost, channelPath, searchString) {
[...]
   } else if (Regex.GOOGLE_MATERIAL_ICONS.test(channelHost + channelPath + searchString)) {
      lastVersion = targets.setLastVersion('/google-material-design-icons/');
      return {
         'source': channelHost,
         'versionDelivered': lastVersion,
         'path': 'resources/google-material-design-icons/google-material-design-icons.css',
         'bundle': ''
      };
   }
};
```

#### Examples:

* Bulma v0.9.2 https://codeberg.org/nobody/LocalCDN/commit/0e91652ae3cd6c2bd046301d3df047817e438a3b
* GSAP (Bundle) https://codeberg.org/nobody/LocalCDN/commit/c47b926d30b8c186e064624c69b8796b804c6b6f

## Update Resource

If you want to update an existing resource, please follow these steps:

> Example: `Chart.js`
>
> Link: `https://cdnjs.com/libraries/Chart.js/3.0.1`
>
> CDN: `https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.0.1/chart.min.js`

##### 1. Create directory `/resources/Chart.js/3.0.1/`

##### 2. Download file and rename it.

The filename is not relevant, so I'll modify it to match the previous version. In this example, the filename has changed from `Chart.bundle.min.js` to `chart.min.js`. To keep code changes minimal, I just rename the file and leave a [note](https://codeberg.org/nobody/LocalCDN/src/commit/dfd53999855c604b48f9b24c60949d65eeb273fd/resources/Chart.js/3.0.1/note) in the directory.

##### 3. Declare version

Here it is important to distinguish whether an upgrade is possible and whether the framework is backward compatible. In this example there are some breaking changes from v2.x to v3.x, so in the `targets.js` file the following entry has been added:

```javascript
targets.setLastVersion = function (type, version) {
   [...]
   } else if (type.startsWith('/Chart.js/2.')) {
      return '2.9.4';
   } else if (type.startsWith('/Chart.js/3.')) {
      return '3.0.1';
   }
   [...]
};
```

If the simple version comparison is not enough, there is an helper method that compares two version numbers. You can see how to use it [here](https://codeberg.org/nobody/LocalCDN/src/commit/d2506369ab5e7cf24633899a8887b1ae48840d75/modules/internal/targets.js#L288-L293)

```javascript
} else if (type.startsWith('/jquery/1.')) {
   if (helpers.compareVersion('1.7.1', version)) return '1.7.1'; // <= v1.7.1
   else if (helpers.compareVersion('1.8.3', version)) return '1.8.3'; // > 1.7.1 to <= 1.8.3
   else if (helpers.compareVersion('1.11.2', version)) return '1.11.2'; // > 1.8.3 to <= 1.11.2
   else if (version === '1.11.3') return '1.11.3'; // = 1.11.3
   else return '1.12.4'; // > 1.11.3
}
```
##### 4. Run [`/audit/audit.sh`](https://codeberg.org/nobody/LocalCDN/src/branch/main/audit) (modify if necessary)
```
bash ./audit.sh -trd hls.js
```

#### Examples:
* Chart.js https://codeberg.org/nobody/LocalCDN/commit/dfd53999855c604b48f9b24c60949d65eeb273fd
* d3 v6.6.0 to v6.6.1 https://codeberg.org/nobody/LocalCDN/commit/8d79a24652ff024036bb2851fc0a6793f88e142f

## New CDNs

If you want to add a new CDN, check the structure and what frameworks are available. Please change [this date](https://codeberg.org/nobody/LocalCDN/src/commit/d2506369ab5e7cf24633899a8887b1ae48840d75/core/mappings.js#L29-L33) afterwards:

```javascript
mappings.lastMappingUpdate = '2021-02-10';
```
:warning: Please note that the date only needs to be changed when a new CDN is added. This does not affect subdirectories.

### CDN as a mirror

If one CDN is just a mirror of another, then it is very easy to add this CDN.

**Example:**
```javascript
mappings.cdn['unpkg.com'] = {
    '/': mappings.cdn['cdn.jsdelivr.net']['/npm/']
};
```

In this case all resources of UNPKG are identical with jsDelivr. The only difference is that these resources are not located in the subdirectory `npm`, but directly in the root directory.

### Add new CDN

If you want to add a normal CDN, the structure is `[domain]/[subdirectory(s)]/[version]/[filename]`.

:warning: `{version}` is a placeholder and will be filled automatically by LocalCDN.

```javascript
mappings.cdn = {
   [...]
   // Example
   'cdn.example.com': {
      '/libs/': {
         'jquery/{version}/jquery.': resources.jQuery
   }
   [...]
};
```

The complete URL for this resource is `cdn.example.com/libs/jquery/3.6.0/jquery.min.js`.

## Testing

The easiest way to test your resource or CDN is to include the extension as a temporary extension. Please use a different user profile (`about:profiles`) for this, because your previous settings will be deleted when you remove the temporary extension.

* start Firefox and create a new profile with `about:profiles`
* start the new Firefox profile and open `about:debugging`
* click `This Firefox` and `Load Temporary Add-on...`
* select `manifest.json`

After that open the website that needs this resource and check the network connections with the key F12 or via the menu:
* Web Developer
* Web Developer Tools
* Network

You can also call the original address of the resource directly, e.g. `https://code.jquery.com/jquery-2.2.4.js`. If everything is configured correctly, the browser will redirect you. An address like this should be in the address bar: `moz-extension://UUID/resources/jquery/2.2.4/jquery.min.jsm` (The UUID is a unique ID, see [Extensions and the add-on ID](https://extensionworkshop.com/documentation/develop/extensions-and-the-add-on-id/))
