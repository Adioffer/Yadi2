'use strict';

import { paintAllListingsOfDate as paintCardboxListings } from './painter/painter_cardbox.js';
import { paintAllListingsOfDate as paintProductBlockListings } from './painter/painter_product_block.js';

function dateOfXDaysAgo(daysAgo) {
    let date = new Date();
    date.setDate(date.getDate() + daysAgo);
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let yyyy = date.getFullYear();

    return yyyy + mm + dd;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "paintListings") {
        const { pageType, daysCount } = request;
        let paintFunction;

        if (pageType === "cardbox") {
            paintFunction = paintCardboxListings;
        } else if (pageType === "product_block") {
            paintFunction = paintProductBlockListings;
        } else {
            console.log("Unknown page type: " + pageType);
            return;
        }

        // Clear all existing paintings
        paintFunction(0, "white"); // This is a scam but it works

        for (let i = 0; i < daysCount; i++) {
            paintFunction(dateOfXDaysAgo(-i), "green");
        }

        sendResponse({ status: "done" });
    }
});