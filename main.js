var DEBUG = 1;
var LISTINGCLASS = "card_cardBox__esd43 card-8_card8__MqKlp";
var PRICECLASS = "price_price__Y8TeC";
var LISTINGCONTENTCLASS = "item-layout_itemContent__yxESb";
var AGENCYCLASS = "price-and-extra_startFrom__rBYth desktop-only";

function debuglog(str) {
    if (DEBUG) {
        console.log(str);
    }
}

function myGetDate(daysBehind) {
    var date = new Date();
    date.setDate(date.getDate() + daysBehind);
    var dd            = String(date.getDate()).padStart(2, '0');
    var mm            = String(date.getMonth() + 1).padStart(2, '0');
    var yyyy          = date.getFullYear();

    return yyyy + mm + dd;
}

function paintListingsOf(date, color) {
    debuglog("Searching for listings of " + date);
    
    var fls = document.getElementsByClassName(LISTINGCLASS);
    debuglog("Found " + String(fls.length) + " listings in this page");
    
    for (let fl of fls) {
        images = fl.getElementsByTagName("img")
        try {
            // Date constraint
            firstImageSrc = String(images[0].src);
            let dateMatches = (firstImageSrc.search(date) != -1);
    
            // Price constraint
            let kaki = String(fl.getElementsByClassName(PRICECLASS)[0].innerHTML);
            let hasPriceTag = ! (kaki.search("לא צוין מחיר") != -1);
    
            // Agencies constraint
            let fuckers = fl.getElementsByClassName(AGENCYCLASS);

            if (fuckers.length==0 && dateMatches && hasPriceTag) {
                debuglog("Found a matching listing!");
                let haha = fl.getElementsByClassName("item-layout_itemContent__yxESb")[0];
                haha.style.backgroundColor = color;
                debuglog("Patched with " + color + " !");
            }
            else {
                debuglog("Skipping");
            }
        } catch (error) {
            // just skip this listing
            debuglog("Skipping listing. Error: " + error);
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

