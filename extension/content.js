"use strict";

function onMessageReceived(_) {
    console.debug("Received message from the background script")

    const videoElement = document.querySelector("video")
    if(videoElement === null) {
        console.error("No video element found on the page.")
        return;
    }

    const videoLink = videoElement.getAttribute("src")
    if(videoLink === null) {
        console.error("No src found for the video element.")
        return;
    }

    console.debug(`Found video link: ${videoLink}`)
    browser.runtime.sendMessage({"download_url": videoLink})
}

browser.runtime.onMessage.addListener(onMessageReceived);
console.debug("bbdl-content was loaded successfully!")