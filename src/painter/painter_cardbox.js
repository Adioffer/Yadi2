'use strict';

import { checkImgDateMatches, checkPriceTag, checkAgencies, paintListing } from "./common.js";

const LISTINGCLASS = "card_cardBox__";
const PRICECLASS = "price_price__";
const AGENCYCLASS = "price-and-extra_startFrom__";
const LISTINGCONTENTCLASS = "item-layout_itemContent__";


function my_print(message) {
    // alert(message);
    console.log(message);
}


function validate_listing_criteria(listing, date) {
    // Date constraint
    let bDateMatches = checkImgDateMatches(listing, date);

    // Price constraint
    let bHasPriceTag = checkPriceTag(listing, PRICECLASS);

    // Agencies constraint
    let bContainsAgencies = checkAgencies(listing, AGENCYCLASS);

    return (bDateMatches && bHasPriceTag && !bContainsAgencies)
}

export function paintAllListingsOfDate(date, color) {
    my_print("Searching for listings of " + date);

    let listings = document.querySelectorAll('[class^="' + LISTINGCLASS + '"]');
    
    my_print("Found " + String(listings.length) + " listings in this page");

    for (let listing of listings) {
        try {
            let listing_matches = validate_listing_criteria(listing, date);
            
            if (listing_matches) {
                my_print("Found a matching listing!");
                paintListing(listing, color, LISTINGCONTENTCLASS);
            }
            else {
                my_print("Skipping unmatching listing.");
            }
        } catch (error) {
            // just skip this listing
            my_print("Exception in handling listing. Error: " + error);
        }
    }
}