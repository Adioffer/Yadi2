var LISTINGCLASS = "card_cardBox__";
var LISTINGCONTENTCLASS = "item-layout_itemContent__";
var PRICECLASS = "price_price__";
var AGENCYCLASS = "price-and-extra_startFrom__";

function myGetDate(daysBehind) {
    var date = new Date();
    date.setDate(date.getDate() + daysBehind);
    var dd            = String(date.getDate()).padStart(2, '0');
    var mm            = String(date.getMonth() + 1).padStart(2, '0');
    var yyyy          = date.getFullYear();

    return yyyy + mm + dd;
}

function paintListingsOf(date, color) {
    console.log("Searching for listings of " + date);
    
    var fls = document.querySelectorAll('[class^="' + LISTINGCLASS + '"]');
    console.log("Found " + String(fls.length) + " listings in this page");
    
    for (let fl of fls) {
        images = fl.getElementsByTagName("img")
        try {
            // Date constraint
            firstImageSrc = String(images[0].src);
            let dateMatches = (firstImageSrc.search(date) != -1);
    
            // Price constraint
            let kaki = String(fl.querySelectorAll('[class^="' + PRICECLASS + '"]')[0].innerHTML);
            let hasPriceTag = ! (kaki.search("לא צוין מחיר") != -1);
    
            // Agencies constraint
            let fuckers = fl.querySelectorAll('[class^="' + AGENCYCLASS + '"]');

            if (fuckers.length==0 && dateMatches && hasPriceTag) {
                console.log("Found a matching listing!");
                let haha = fl.querySelectorAll('[class^="' + LISTINGCONTENTCLASS + '"]')[0];
                haha.style.backgroundColor = color;
                console.log("Patched with " + color + " !");
            }
            else {
                console.log("Skipping");
            }
        } catch (error) {
            // just skip this listing
            console.log("Skipping listing. Error: " + error);
        }        
    }
}

function clearAllPaintings() {
    // This is a scam but it works
    paintListingsOf(0, "white");
}

console.log("yadi2 started.");
clearAllPaintings();

var today = myGetDate(0);
paintListingsOf(today, "green");

var yesterday = myGetDate(-1);
paintListingsOf(yesterday, "yellow");

var yester2 = myGetDate(-2);
paintListingsOf(yester2, "orange");

