'use strict';

import { NadlanListingFinder, GalleryListingFinder } from './listing_finder.js';
import { paintListing } from './painter.js';

function my_print(message) {
    // alert(message);
    console.log(message);
}

function dateOfXDaysAgo(daysAgo) {
    let date = new Date();
    date.setDate(date.getDate() + daysAgo);
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let yyyy = date.getFullYear();

    return yyyy + mm + dd;
}

function paintListingsOfDate(listingFinder, date, color) {
    my_print("Searching for listings of " + date);

    let listings = document.querySelectorAll('[class^="' + listingFinder.listingClass + '"]');
    my_print("Found " + String(listings.length) + " listings in this page");

    let matches = 0;
    for (let listing of listings) {
        try {
            let listing_matches = listingFinder.validateListingCriteria(listing, date);

            if (listing_matches) {
                my_print("Found a matching listing!");
                paintListing(listing, listingFinder.listingContentClass, color);
                matches++;
            }
        } catch (error) {
            // just skip this listing
            my_print("Exception in handling listing. Error: " + error);
        }
    }

    return matches;
}

function paintListingsOfDateRange(listingFinder, daysCount) {
    // Clear all existing paintings
    paintListingsOfDate(listingFinder, 0, "white"); // This is a scam but it works

    // Paint listings of the last `daysCount` days
    let matches = 0;
    for (let i = 0; i < daysCount; i++) {
        matches += paintListingsOfDate(listingFinder, dateOfXDaysAgo(-i), "green");
    }

    return matches;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "paintListings") {
        const { daysCount } = request;

        // Paint listings using both listing finders
        // It causes a lot of errors to be printed to console, but at least it works
        let matches = 0;
        matches += paintListingsOfDateRange(new NadlanListingFinder(), daysCount);
        matches += paintListingsOfDateRange(new GalleryListingFinder(), daysCount);

        sendResponse({ status: "done", matches: matches });
    }
});
