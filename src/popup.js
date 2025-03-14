'use strict';

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('go').addEventListener('click', onGoClicked);
});

function onGoClicked() {
    let pageType = document.querySelector('input[name="pageType"]:checked').value;
    let daysCount = document.getElementById("days").value;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: "paintListings",
            pageType: pageType,
            daysCount: daysCount
        }, (response) => {
            console.log(response.status);
        });
    });
}