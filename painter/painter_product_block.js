'use strict';

import { checkImgDateMatches, paintListing } from "./common.js";

const LISTINGCLASS = "card_cardBox__";
const LISTINGCONTENTCLASS = "item-layout_itemContent__";


export function paintAllListingsOfDate(date, color) {
    alert("Searching for listings of " + date);

    let listings = document.querySelectorAll('[class^="' + LISTINGCLASS + '"]');
    alert("Found " + String(listings.length) + " listings in this page");

    for (let listing of listings) {
        try {
            // Date constraint
            let bDateMatches = checkImgDateMatches(listing, date);

            if (bDateMatches) {
                alert("Found a matching listing!");
                paintListing(listing, color, LISTINGCONTENTCLASS);
            }
            else {
                alert("Skipping unmatching listing.");
            }
        } catch (error) {
            // just skip this listing
            alert("Exception in handling listing. Error: " + error);
        }
    }
}