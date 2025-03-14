'use strict';

class ListingFinder {
    constructor(listingClass, listingContentClass) {
        this.listingClass = listingClass;
        this.listingContentClass = listingContentClass;
    }

    static checkImgDateMatches(listing, date) {
        // Date constraint
        let images = listing.getElementsByTagName("img")
        let firstImageSrc = String(images[0].src);
        let dateMatches = (firstImageSrc.search(date) != -1);
        return dateMatches;
    }

}

export class CardboxListingFinder extends ListingFinder {
    constructor() {
        super("card_cardBox__", "item-data-content_heading");
        this.priceClass = "price_price__";
        this.agencyClass = "price-and-extra_startFrom__";
    }

    checkPriceTag(listing) {
        let htmlPrice = String(listing.querySelectorAll('[class^="' + this.priceClass + '"]')[0].innerHTML);
        let hasPriceTag = (htmlPrice.search("לא צוין מחיר") == -1);
        return hasPriceTag;
    }

    checkNoAgencies(listing) {
        let agencies = listing.querySelectorAll('[class^="' + this.agencyClass + '"]');
        return agencies.length == 0;
    }

    validateListingCriteria(listing, date) {
        // Date constraint
        let bDateMatches = ListingFinder.checkImgDateMatches(listing, date);

        // Price constraint
        let bHasPriceTag = this.checkPriceTag(listing);

        // Agencies constraint
        let bContainsAgencies = !this.checkNoAgencies(listing);

        return (bDateMatches && bHasPriceTag && !bContainsAgencies)
    }
}

export class ProductBlockListingFinder extends ListingFinder {
    constructor() {
        super("product-block", "card__title");
    }

    validateListingCriteria(listing, date) {
        // Date constraint
        let bDateMatches = ListingFinder.checkImgDateMatches(listing, date);

        return bDateMatches;
    }
}
