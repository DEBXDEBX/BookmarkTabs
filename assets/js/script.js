"use strict";
//Global variable's
let arrayOfTabs = [];
// create elements object
const el = new Elements();
// Pass elements to display
const display = new Display(el, $);
//This enables JQuery ToolTips
$(document).ready(function() {
  $('[data-toggle="tooltip"]').tooltip();
});
//The start of program exicution.
window.onload = function() {
  startUp();
};
//Start Up
function startUp() {
  let storageLs = new StoreageLS();
  // let array = storageLs.getArrayFromFile();
  // console.log(array);
  arrayOfTabs = storageLs.getArrayFromFile();
}
