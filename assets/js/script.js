"use strict";
//Global variable's
let arrayOfTabs = [];
let catIndex = -243;
let bookmarkIndex = -243;
//Select audio files
let addBookmarkAudio = document.querySelector("#addBookmarkAudio");
let addTabAudio = document.querySelector("#addTabAudio");
let btnAudio = document.querySelector("#btnAudio");
let cancelAudio = document.querySelector("#cancelAudio");
let clickAudio = document.querySelector("#clickAudio");
let deleteAudio = document.querySelector("#deleteAudio");
let tabAudio = document.querySelector("#tabAudio");
let warning1Audio = document.querySelector("#warning1Audio");
let warning2Audio = document.querySelector("#warning2Audio");
// time insert
let timeH1 = document.querySelector("#todayTime");
// create elements object
const el = new Elements();
// Pass elements to display
const display = new Display(el, $);
// declair date

//This enables JQuery ToolTips
$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
});
//The start of program exicution.
window.onload = function () {
  startUp();
};
//Start Up
function startUp() {
  let storageLs = new StoreageLS();
  arrayOfTabs = storageLs.getArrayFromFile();
  renderCategorys();
  // If you have Home catogory display it's bookmarks
  HomeList();
  // show the date
  getAndShowDate();
  // call once so you can see time on load of page
  displayTime();
}

//*************************************************** */
// Helper functions
//*************************************************** */
const getAndShowDate = () => {
  el.todayDate.textContent = new Date().toDateString();
};
const HomeList = () => {
  // grab all the catorgory's
  let tabList = document.getElementsByClassName("cat");
  // create an array from an array like object
  let newArray = Array.from(tabList);
  // Check for Home
  let index = -243;
  newArray.forEach((item) => {
    if (item.textContent === "Home") {
      // get index form Html
      index = parseInt(item.dataset.index);
    }
  });
  //  if you found Home display it's bookmarks and and active class
  if (index >= 0) {
    newArray[index].classList.add("active");
    catIndex = index;
    renderBookmarks();
  }
};

function save() {
  // save
  let storageLs = new StoreageLS();
  storageLs.setArrayToFileName(arrayOfTabs);
}

// create a new array with only the items name
function mapNamesOut(array) {
  let mapedArray = array.map((item) => {
    return item.name;
  });
  return mapedArray;
} // End mapNamesOut(array)

// Sort an array by it's name
function sortArrayByName(array) {
  array.sort(function (a, b) {
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
  // tabAudio.play();
  display.paintCategorys(mapNamesOut(arrayOfTabs));
}

function renderBookmarks() {
  // tabAudio.play();
  display.paintBookmarks(arrayOfTabs[catIndex].arrayOfBookmarks);
}
// when You click on the +/icon in the cat  heading
el.addShowFormCat.addEventListener("click", (e) => {
  clickAudio.play();
  display.showCatForm();
  display.displayNone(el.bookmarkList);
  this.textCat.focus();
});
// when You click on the +/icon in the bookmark  heading
el.addShowFormBookmark.addEventListener("click", (e) => {
  clickAudio.play();
  display.showBookmarkForm();
  this.textBookmark.focus();
});

el.catList.addEventListener("click", (e) => {
  //check if control was down, if so delete
  if (e.ctrlKey) {
    // get the index from the html

    let index = e.target.dataset.index;
    index = parseInt(index);
    catIndex = index;
    arrayOfTabs.splice(catIndex, 1);
    deleteAudio.play();
    // save
    save();

    if (arrayOfTabs.length === 0) {
      startUp();
      return;
    }

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
      el[i].onclick = function () {
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
    tabAudio.play();
    renderBookmarks();
  }
});

el.addCatBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // grab the text
  let catName = el.textCat.value.trim();
  // check if text is empty
  if (catName === "") {
    warning1Audio.play();
    display.showAlert("Please enter a name for the Categroy!", "error");
    return;
  }
  // create a tab
  let newTab = new Tab(catName);

  // check if the name already exists if it does alert and return and set current main folder to -243
  // make a variable to return
  let isTaken = false;
  arrayOfTabs.forEach((element) => {
    if (catName === element.name) {
      isTaken = true;
    }
  });
  // check for taken name
  if (isTaken) {
    warning2Audio.play();
    display.showAlert("That name is taken", "error");
    catIndex = -243;
  } else {
    // push newTab into the array
    arrayOfTabs.push(newTab);
    addBookmarkAudio.play();
    // sort array by name
    sortArrayByName(arrayOfTabs);
    // save
    save();
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
el.cancelCatBtn.addEventListener("click", (e) => {
  cancelAudio.play();
  // reset form
  el.catForm.reset();
  // hide form
  display.displayNone(el.catForm);
  // get rid of active class
  let activeTabList = document.getElementsByClassName("cat active");
  if (activeTabList) {
    let newArray = Array.from(activeTabList);
    for (let item of newArray) {
      item.classList.remove("active");
    }
  }
}); // End

el.addBookmarkBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let bookmarkName = el.textBookmark.value.trim();
  let bookmarkURL = el.textURL.value.trim();
  if (!bookmarkName) {
    warning1Audio.play();
    display.showAlert("Please enter a name for the bookmark!", "error");
    return;
  }
  if (!bookmarkURL) {
    warning2Audio.play();
    display.showAlert("Please enter an address for the bookmark!", "error");
    return;
  }
  let newBookmark = new Bookmark(bookmarkName, bookmarkURL);
  arrayOfTabs[catIndex].arrayOfBookmarks.push(newBookmark);
  addBookmarkAudio.play();

  // save
  save();
  el.bookmarkForm.reset();
  display.displayNone(el.bookmarkForm);
  renderBookmarks();
});

// when You click on cancel btn on the bookmark form
el.cancelBookmarkBtn.addEventListener("click", (e) => {
  cancelAudio.play();
  // reset form
  el.bookmarkForm.reset();
  // hide form
  display.displayNone(el.bookmarkForm);
}); // End

el.bookmarkList.addEventListener("click", (e) => {
  //look for the span with a class of 'moveUp'
  if (e.target.classList.contains("moveUp")) {
    // get the index from the html
    let index = e.target.dataset.index;
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
    btnAudio.play();
    // save
    save();
    renderBookmarks();
    return;
  }

  if (e.target.classList.contains("moveDown")) {
    // get the index from the html
    let index = e.target.dataset.index;
    index = parseInt(index);

    let arr = arrayOfTabs[catIndex].arrayOfBookmarks;

    //If index is equal to length - 1. You can't move it any more so return
    if (index === arr.length - 1) {
      return;
    }
    // get move to index
    let moveTo = index + 1;

    // swap array elements
    [arr[index], arr[moveTo]] = [arr[moveTo], arr[index]];
    btnAudio.play();
    // save
    save();
    renderBookmarks();
    return;
  }

  if (e.target.classList.contains("delete-item")) {
    if (!e.ctrlKey) {
      warning1Audio.play();
      display.showAlert(
        "You have to hold down ctrl key to make a deletion",
        "error"
      );
      return;
    }
    // get the index from the html
    let deleteIndex = e.target.parentElement.dataset.index;
    deleteIndex = parseInt(deleteIndex);
    arrayOfTabs[catIndex].arrayOfBookmarks.splice(deleteIndex, 1);
    deleteAudio.play();
    // save
    save();
    renderBookmarks();
    return;
  }
}); // End

// check if on or off line
if (navigator.onLine) {
  display.onlineMessage();
} else {
  display.offlineMessage();
}
// listen for events on or off line
window.addEventListener("online", (e) => display.onlineMessage());
window.addEventListener("offline", (e) => display.offlineMessage());

// Search box
document.querySelector("#googleBtn").addEventListener("click", (e) => {
  e.preventDefault();
  clickAudio.play();
  let inputBox = document.querySelector("#googleSearchInput");
  let searchTerm = inputBox.value;

  inputBox.value = "";
  //search google
  window.open("http://google.com/search?q=" + searchTerm);
});

document.querySelector("#mdnBtn").addEventListener("click", (e) => {
  e.preventDefault();
  clickAudio.play();
  let inputBox = document.querySelector("#googleSearchInput");
  let searchTerm = inputBox.value;
  inputBox.value = "";
  // search MDN
  window.open("https://developer.mozilla.org/en-US/search?q=" + searchTerm);
});
document.querySelector("#youTubeBtn").addEventListener("click", (e) => {
  e.preventDefault();
  clickAudio.play();
  let inputBox = document.querySelector("#googleSearchInput");
  let searchTerm = inputBox.value;
  inputBox.value = "";
  // search Youtube
  window.open("https://www.youtube.com/results?search_query=" + searchTerm);
});
document.querySelector("#stackOverflowBtn").addEventListener("click", (e) => {
  e.preventDefault();
  clickAudio.play();
  let inputBox = document.querySelector("#googleSearchInput");
  let searchTerm = inputBox.value;
  inputBox.value = "";
  // search stack overflow
  window.open("https://stackoverflow.com/search?q=" + searchTerm);
});

//  code for the time display
// ****************************************************
function displayTime() {
  let today = new Date();
  let hoursFromDate = today.getHours();

  let hours = hoursFromDate > 12 ? hoursFromDate - 12 : hoursFromDate;

  let minutes =
    today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes();
  let time = `${hours}:${minutes} ${hoursFromDate < 12 ? "AM" : "PM"}`;
  // insert time
  timeH1.textContent = time;
}
// call every 30 seconds
setInterval(displayTime, 20000);
// end of code for the time display
