'use strict';

import { checkImgDateMatches, checkPriceTag, checkAgencies, paintListing } from "./common.js";

const LISTINGCLASS = "card_cardBox__";
const PRICECLASS = "price_price__";
const AGENCYCLASS = "price-and-extra_startFrom__";
const LISTINGCONTENTCLASS = "item-layout_itemContent__";


export function paintAllListingsOfDate(date, color) {
    alert("Searching for listings of " + date);

    let listings = document.querySelectorAll('[class^="' + LISTINGCLASS + '"]');
    alert("Found " + String(listings.length) + " listings in this page");

    for (let listing of listings) {
        try {
            // Date constraint
            let bDateMatches = checkImgDateMatches(listing, date);

            // Price constraint
            let bHasPriceTag = checkPriceTag(listing, PRICECLASS);

            // Agencies constraint
            let bContainsAgencies = checkAgencies(listing, AGENCYCLASS);

            if (bDateMatches && bHasPriceTag && !bContainsAgencies) {
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