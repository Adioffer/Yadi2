var DEBUG = 1;

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
    
    var fls = document.getElementsByClassName("feeditem table");
    debuglog("Found " + String(fls.length) + " listings in this page");
    
    for (let fl of fls) {
        let crap = String(fl.getElementsByClassName("pic")[0].innerHTML);
        let dateMatches = (crap.search(date) != -1);

        let kaki = String(fl.getElementsByClassName("price")[0].innerHTML);
        let hasPriceTag = (kaki.search("לא צוין מחיר") == -1);

        if (dateMatches && hasPriceTag) {
            debuglog("Found a matching listing!");
			let haha = fl.getElementsByClassName("color_container")[0]
			if (! haha) {
				haha = fl.getElementsByClassName("container")[0]
			}
            haha.style.backgroundColor = color;
        }
        else {
            debuglog("Skipping");
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

