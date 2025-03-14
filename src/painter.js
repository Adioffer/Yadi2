'use strict';

export function paintListing(listing, htmlListingContentClass, color) {
    let listingContent = listing.querySelectorAll('[class^="' + htmlListingContentClass + '"]')[0];
    listingContent.style.backgroundColor = color;
}
