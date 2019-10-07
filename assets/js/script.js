"use strict";
//Global variable's
let arrayOfTabs = [];
let catIndex = -243;
let bookmarkIndex = -243;
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
  renderCategorys();
}

//*************************************************** */
// Helper functions
//*************************************************** */
// create a new array with only the items name
function mapNamesOut(array) {
  let mapedArray = array.map(item => {
    return item.name;
  });
  return mapedArray;
} // End mapNamesOut(array)

// Sort an array by it's name
function sortArrayByName(array) {
  array.sort(function(a, b) {
    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
    var nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // names must be eimagePathual
    return 0;
  }); //End sort function
} // End sortArrayByName(array)

function renderCategorys() {
  display.paintCategorys(mapNamesOut(arrayOfTabs));
}

function renderBookmarks() {
  display.paintBookmarks(arrayOfTabs[catIndex].arrayOfBookmarks);
}
// when You click on the +/icon in the cat  heading
el.addShowFormCat.addEventListener("click", e => {
  // clickAudio.play();
  display.showCatForm();
  display.displayNone(el.bookmarkList);
});
// when You click on the +/icon in the bookmark  heading
el.addShowFormBookmark.addEventListener("click", e => {
  // clickAudio.play();
  display.showBookmarkForm();
});

el.catList.addEventListener("click", e => {
  //check if control was down, if so delete
  if (e.ctrlKey) {
    // get the index from the html
    let index = e.target.dataset.index;
    index = parseInt(index);
    catIndex = index;
    arrayOfTabs.splice(catIndex, 1);
    // save
    let storageLs = new StoreageLS();
    storageLs.setArrayToFileName(arrayOfTabs);

    if (arrayOfTabs.length === 0) {
      startUp();
      return;
    }
    display.displayNone(el.bookmarkHeading);
    display.displayNone(el.bookmarkList);
    renderCategorys();
    return;
  }

  // event delegation
  if (e.target.classList.contains("cat")) {
    // set's the current target active
    e.target.classList.add("active");
    //The Next code is to set the current tab color white with the active class
    var el = document.querySelectorAll(".cat");
    for (let i = 0; i < el.length; i++) {
      el[i].onclick = function() {
        var c = 0;
        while (c < el.length) {
          el[c++].className = "cat";
        }
        el[i].className = "cat active";
      };
    } // End code to set the active class

    // get the index from the html
    let index = e.target.dataset.index;
    index = parseInt(index);
    catIndex = index;
    // tabAudio.play();
    renderBookmarks();
  }
});

el.addCatBtn.addEventListener("click", e => {
  e.preventDefault();
  // grab the text
  let catName = el.textCat.value.trim();
  // check if text is empty
  if (catName === "") {
    // warningEmptyAudio.play();
    display.showAlert("Please enter a name for the Categroy!", "error");
    return;
  }
  // create a tab
  let newTab = new Tab(catName);

  // check if the name already exists if it does alert and return and set current main folder to -243
  // make a variable to return
  let isTaken = false;
  arrayOfTabs.forEach(element => {
    if (catName === element.name) {
      isTaken = true;
    }
  });
  // check for taken name
  if (isTaken) {
    // warningNameTakenAudio.play();
    display.showAlert("That name is taken", "error");
    catIndex = -243;
  } else {
    // push newTab into the array
    arrayOfTabs.push(newTab);

    // sort array by name
    sortArrayByName(arrayOfTabs);
    // save
    let storageLs = new StoreageLS();
    storageLs.setArrayToFileName(arrayOfTabs);
    // addAudio.play();
    display.showAlert("A new category was added", "success", 1500);
    // hide form
    display.hideCatForm();
    // reset form
    el.catForm.reset();

    // send array to display
    renderCategorys();
  } // End else statement
});

// when You click on cancel btn on the cat form
el.cancelCatBtn.addEventListener("click", e => {
  // cancelAudio.play();
  // reset form
  el.catForm.reset();
  // hide form
  display.displayNone(el.catForm);
}); // End

el.addBookmarkBtn.addEventListener("click", e => {
  e.preventDefault();
  let bookmarkName = el.textBookmark.value.trim();
  let bookmarkURL = el.textURL.value.trim();
  if (!bookmarkName) {
    display.showAlert("Please enter a name for the bookmark!", "error");
    return;
  }
  if (!bookmarkURL) {
    display.showAlert("Please enter an address for the bookmark!", "error");
    return;
  }
  let newBookmark = new Bookmark(bookmarkName, bookmarkURL);
  arrayOfTabs[catIndex].arrayOfBookmarks.push(newBookmark);

  // save
  let storageLs = new StoreageLS();
  storageLs.setArrayToFileName(arrayOfTabs);
  el.bookmarkForm.reset();
  display.displayNone(el.bookmarkForm);
  renderBookmarks();
});

// when You click on cancel btn on the bookmark form
el.cancelBookmarkBtn.addEventListener("click", e => {
  // cancelAudio.play();
  // reset form
  el.bookmarkForm.reset();
  // hide form
  display.displayNone(el.bookmarkForm);
}); // End

el.bookmarkList.addEventListener("click", e => {
  //look for the span with a class of 'moveUp'
  if (e.target.classList.contains("moveUp")) {
    // moveUpDownAudio.play();
    // get the index from the html
    let index = e.target.parentElement.dataset.index;
    index = parseInt(index);
    //If index is zero. You can't move it any more so return
    if (index === 0) {
      return;
    }
    // get move to index
    let moveTo = index - 1;
    let arr = arrayOfTabs[catIndex].arrayOfBookmarks;

    // swap array elements
    [arr[index], arr[moveTo]] = [arr[moveTo], arr[index]];
    // btnAudio.play();
    // write to file
    // save
    let storageLs = new StoreageLS();
    storageLs.setArrayToFileName(arrayOfTabs);
    renderBookmarks();
  }
}); // End
