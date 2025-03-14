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
            if (response && response.status === "done" && response.matches > 0) {
                document.getElementById('matchesCount').innerText = `Matches found: ${response.matches}`;
            } else {
                document.getElementById('matchesCount').innerText = 'No matches found.';
            }
        });
    });
}