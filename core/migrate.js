// ********************************************************************************
// TODO: Remove me in v2.4.1
chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
        chrome.storage.sync.get(null, function(items) {
            // Workaround for https://codeberg.org/nobody/LocalCDN/issues/102
            setTimeout(function() {
                chrome.storage.local.set(items, function() {
                    chrome.runtime.reload();
                });
            }, 5000);
        });
    }
});

chrome.storage.local.get('extensionReloaded', function(items) {
    if (!('extensionReloaded' in items)) {
        chrome.tabs.create({
            'url': chrome.extension.getURL('pages/updates/updates.html?mappingupdate=true'),
            'active': false
        });
        chrome.storage.local.set({'extensionReloaded': true});
    }
});
// ********************************************************************************
