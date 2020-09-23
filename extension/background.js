"use strict";

function onMessageReceived(message) {
    console.debug("Received message from the content script")
    if(message === null) {
        console.warn("No link received from the content script.");
        return
    }

    console.debug(`Starting download of ${message}`)
    browser.downloads.download({
        "url": message["download_url"]
    }).then(() => {
        console.info("Download complete!")
    })
}

function onBrowserAction() {
    console.debug("Browser action clicked")

    browser.tabs.query({
        currentWindow: true,
        active: true
    }).then((tabs) => {
        for(const tab of tabs) {
            browser.tabs.sendMessage(tab.id, {"download": true})
        }
    })

}

browser.pageAction.onClicked.addListener(onBrowserAction);
browser.runtime.onMessage.addListener(onMessageReceived);
console.debug("bbdl-background was loaded successfully!")