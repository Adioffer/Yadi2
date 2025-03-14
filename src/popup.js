'use strict';

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('go').addEventListener('click', onGoClicked);
});

function onGoClicked() {
    let daysCount = document.getElementById("days").value;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: "paintListings",
            daysCount: daysCount
        }, (response) => {
            console.log(response.status);
        });
    });
}