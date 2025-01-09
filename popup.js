'use strict';

import { paintAllListingsOfDate as paintCardboxListings} from './painter/painter_cardbox.js';
import { paintAllListingsOfDate as paintProductBlockListings} from './painter/painter_product_block.js';
import { dateOfXDaysAgo } from './main.js';

alert("test1");
console.log("yadi2 - popup.js loaded.");


function onGoClicked() {
    alert("test3");

    let pageType = document.querySelector('input[name="pageType"]:checked').value;
    let daysCount = document.getElementById("days").value;

    console.log("GO! Page type: " + pageType + ", Days count: " + daysCount);

    let paintFunction;

    if (pageType == "cardbox") {
        paintFunction = paintCardboxListings;
    }
    else if (pageType == "product_block") {
        paintFunction = paintProductBlockListings;
    }
    else {
        console.log("Unknown page type: " + pageType);
        return;
    }

    alert("test4");

    // Clear all existing paintings
    paintFunction(0, "white"); // This is a scam but it works

    for (let i = 0; i < daysCount; i++) {
        paintFunction(dateOfXDaysAgo(-i), "green");
    }

    alert("test5");

}

document.getElementById('go').addEventListener('click', onGoClicked);
alert("test2");
