import LegendItem from "entities/LegendItem.js";

var legendItems = [
  new LegendItem(
    "10,000 +",
    "#741f1f",
    // "#8b0000",
    (cases) => cases >= 10000,
    "white"
  ),

  new LegendItem(
    "5,000 - 9,999",
    // "#741f1f",
    "#9c2929",
    (cases) => cases >= 5000 && cases <10000,
    "White"
  ),

  new LegendItem(
    "1,000 - 4,999",
    "#c57f7f",
    (cases) => cases >= 1000 && cases < 5000
  ),

  new LegendItem(
    "500 - 999",
    "#d8aaaa",
    (cases) => cases >= 500 && cases < 1000
  ),

  new LegendItem(
    "0 - 500",
    "#ebd4d4",
    (cases) => cases > 0 && cases < 500
  ),

  new LegendItem("No Data", "#ffffff", (cases) => true),
];

export default legendItems;

/**
 * 7 > 1 million                        #8b0000
 * 6 >= 500 thousand < 1 million        #9e2a2a
 * 5 >= 200 thousand < 500 thousand     #b15555
 * 4 >= 100 thousand  < 200 Thousand    #c57f7f
 * 3 > 50 thousand < 100 thousand       #d8aaaa
 * 2 >= 0 < 50 thousand                 #ebd4d4
 * 1 NO DATA                            #ffffff
 */

/*

#741f1f // Really red
#9c2929 // more red
#c57f7f // red
#d8aaaa //more pink
#ebd4d4 //pink
#ffffff //white
*/