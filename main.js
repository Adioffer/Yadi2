'use strict';


export function dateOfXDaysAgo(daysAgo) {
    let date = new Date();
    date.setDate(date.getDate() + daysAgo);
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let yyyy = date.getFullYear();

    return yyyy + mm + dd;
}


console.log("yadi2 started.");

// // Clear all existing paintings
// paintAllListingsOfDate(0, "white"); // This is a scam but it works

// // Paint all listings of today
// paintAllListingsOfDate(dateOfXDaysAgo(0), "green");

// // Paint all listings of yesterday
// paintAllListingsOfDate(dateOfXDaysAgo(-1), "yellow");

// // Paint all listings of the day before yesterday
// paintAllListingsOfDate(dateOfXDaysAgo(-2), "orange");
