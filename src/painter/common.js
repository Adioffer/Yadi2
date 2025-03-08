'use strict';

export function checkImgDateMatches(listing, date) {
    // Date constraint
    let images = listing.getElementsByTagName("img")
    let firstImageSrc = String(images[0].src);
    let dateMatches = (firstImageSrc.search(date) != -1);
    return dateMatches;
}

export function checkPriceTag(listing, htmlPriceClass) {
    let kaki = String(listing.querySelectorAll('[class^="' + htmlPriceClass + '"]')[0].innerHTML);
    let hasPriceTag = !(kaki.search("לא צוין מחיר") != -1);
    return hasPriceTag;
}

export function checkAgencies(listing, htmlAgencyClass) {
    let agencies = listing.querySelectorAll('[class^="' + htmlAgencyClass + '"]');
    return agencies.length > 0;
}

export function paintListing(listing, color, htmlListingContentClass) {
    let listingContent = listing.querySelectorAll('[class^="' + htmlListingContentClass + '"]')[0];
    listingContent.style.backgroundColor = color;
}
