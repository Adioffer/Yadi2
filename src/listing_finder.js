'use strict';

import { NADLAN_LISTING_CLASS, NADLAN_LISTING_CONTENT_CLASS, NADLAN_PRICE_CLASS, NADLAN_AGENCY_CLASS, GALLERY_LISTING_CLASS, GALLERY_LISTING_CONTENT_CLASS } from './consts.js';

class BasicListingFinder {
    constructor(listingClass, listingContentClass) {
        this.listingClass = listingClass;
        this.listingContentClass = listingContentClass;
    }

    // Date constraint validator
    static checkImgDateMatches(listing, date) {
        let images = listing.getElementsByTagName("img")
        let firstImageSrc = String(images[0].src);
        let dateMatches = (firstImageSrc.search(date) != -1);
        return dateMatches;
    }

    validateListingCriteria(listing, date) {
        // Date constraint
        if (!BasicListingFinder.checkImgDateMatches(listing, date)) {
            return false;
        }

        return true;
    }

}

export class NadlanListingFinder extends BasicListingFinder {
    /* The NadlanListingFinder is used for a "List" type of listing.
    It also checks for the following constraints:
    1. Price tag exists
    2. No agencies
    */

    constructor() {
        super(NADLAN_LISTING_CLASS, NADLAN_LISTING_CONTENT_CLASS);
        this.priceClass = NADLAN_PRICE_CLASS;
        this.agencyClass = NADLAN_AGENCY_CLASS;
    }

    // Price constraint validator
    checkPriceTag(listing) {
        let htmlPrice = String(listing.querySelectorAll('[class^="' + this.priceClass + '"]')[0].innerHTML);
        let hasPriceTag = (htmlPrice.search("לא צוין מחיר") == -1);
        return hasPriceTag;
    }

    // Agencies constraint validator
    checkNoAgencies(listing) {
        let agencies = listing.querySelectorAll('[class^="' + this.agencyClass + '"]');
        return agencies.length == 0;
    }

    validateListingCriteria(listing, date) {
        // Basic validations:
        if (! super.validateListingCriteria(listing, date)) {
            return false;
        }

        // Additional validations:
        // Price constraint
        if (!this.checkPriceTag(listing)) {
            return false;
        }

        // Agencies constraint
        if (!this.checkNoAgencies(listing)) {
            return false;
        }

        return true;
    }
}

export class GalleryListingFinder extends BasicListingFinder {
    /* The ProductBlockListingFinder is used for a "Gallery" type of listing.
    */

    constructor() {
        super(GALLERY_LISTING_CLASS, GALLERY_LISTING_CONTENT_CLASS);
    }

}
