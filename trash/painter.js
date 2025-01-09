'use strict';

import { LISTINGCLASS, PRICECLASS, AGENCYCLASS, LISTINGCONTENTCLASS } from './consts_cardbox.js';


function checkImgDateMatches(listing, date) {
    // Date constraint
    let images = listing.getElementsByTagName("img")
    let firstImageSrc = String(images[0].src);
    let dateMatches = (firstImageSrc.search(date) != -1);
    return dateMatches;
}

function checkPriceTag(listing) {
    let kaki = String(listing.querySelectorAll('[class^="' + PRICECLASS + '"]')[0].innerHTML);
    let hasPriceTag = !(kaki.search("לא צוין מחיר") != -1);
    return hasPriceTag;
}

function checkAngencies(listing) {
    let agencies = listing.querySelectorAll('[class^="' + AGENCYCLASS + '"]');
    return agencies.length > 0;
}

function paintListing(listing, color) {
    let haha = listing.querySelectorAll('[class^="' + LISTINGCONTENTCLASS + '"]')[0];
    haha.style.backgroundColor = color;
}

function paintAllListingsOfDate(date, color) {
    console.log("Searching for listings of " + date);

    let listings = document.querySelectorAll('[class^="' + LISTINGCLASS + '"]');
    console.log("Found " + String(listings.length) + " listings in this page");

    for (let listing of listings) {
        try {
            // Date constraint
            let bDateMatches = checkImgDateMatches(listing, date);

            // Price constraint
            let bHasPriceTag = checkPriceTag(listing);

            // Agencies constraint
            let bContainsAgencies = checkAngencies(listing);

            if (bDateMatches && bHasPriceTag && !bContainsAgencies) {
                console.log("Found a matching listing!");
                paintListing(listing, color);
            }
            else {
                console.log("Skipping unmatching listing.");
            }
        } catch (error) {
            // just skip this listing
            console.log("Exception in handling listing. Error: " + error);
        }
    }
}
