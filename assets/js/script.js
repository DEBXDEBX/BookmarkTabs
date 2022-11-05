"use strict";
//Global variable's
let arrayOfTabs;
let catIndex = -243;
let bookmarkIndex = -243;
// weekly reminder array
let arrayWeeklyReminder;
// date reminder array
let arrayDateReminder;
let today = new Date();
let todaysDayCode = today.getDay();
let currentDate = today.getDate();
let currentYear = today.getFullYear();
let currentMonth = 1 + today.getMonth();
const BOOKMARK_STORAGE_KEY = "fileBookmark10062019DEBX";
const REMINDER_STORAGE_KEY = "reminderApril262020DEBX";
const DATE_REMINDER_STORAGE_KEY = "dateReminderApril272020debx";
// //Select audio files
// const addBookmarkAudio = document.querySelector("#addBookmarkAudio");
// const addTabAudio = document.querySelector("#addTabAudio");
// const btnAudio = document.querySelector("#btnAudio");
// const cancelAudio = document.querySelector("#cancelAudio");
// const clickAudio = document.querySelector("#clickAudio");
// const deleteAudio = document.querySelector("#deleteAudio");
// const tabAudio = document.querySelector("#tabAudio");
// const warning1Audio = document.querySelector("#warning1Audio");
// const warning2Audio = document.querySelector("#warning2Audio");

// create elements object
const el = new Elements();
// create audio object
const sound = new Audio();
// Pass elements to display
const display = new Display(el, $);
//*********************************** */
// create storage
const bookmarkStorage = new ArrayStorageLS(BOOKMARK_STORAGE_KEY);
const reminderStorage = new ArrayStorageLS(REMINDER_STORAGE_KEY);
const dateReminderStorage = new ArrayStorageLS(DATE_REMINDER_STORAGE_KEY);
//************************************** */
//This enables JQuery ToolTips
$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
});
//The start of program execution.
window.onload = function () {
  startUp();
};
//Start Up
function startUp() {
  bookmarkStartUp();
  getAndShowDate();
  weeklyReminderStartUp();
  reminderDateStartUp();
}
function bookmarkStartUp() {
  arrayOfTabs = bookmarkStorage.getArrayFromLS();
  if (arrayOfTabs.length === 0) {
    const homeTab = new Tab("Home");
    const amazonBM = new Bookmark("Amazon", "https://www.amazon.com/");
    const googleBM = new Bookmark("Google", "https://www.google.com/");
    homeTab.arrayOfBookmarks.push(amazonBM, googleBM);
    arrayOfTabs.push(homeTab);
  }
  renderCategorys();
  // If you have Home category display it's bookmarks
  HomeList();
}
function weeklyReminderStartUp() {
  // grad array from file an set to arrayWeeklyReminder
  arrayWeeklyReminder = reminderStorage.getArrayFromLS();
  // send to display
  display.renderEditReminders(arrayWeeklyReminder);

  display.renderShowReminders(filterWeeklyArray(arrayWeeklyReminder));
}

function reminderDateStartUp() {
  // grad array from file an set to arrayWeeklyReminder
  arrayDateReminder = dateReminderStorage.getArrayFromLS();
  // **************************************************
  // delete old date reminders
  let deleteIndexs = [];
  // push delete indexs into a array
  for (let i = 0; i < arrayDateReminder.length; i++) {
    if (arrayDateReminder[i].year < currentYear) {
      deleteIndexs.push(i);
      continue;
    }
    if (
      arrayDateReminder[i].year === currentYear &&
      arrayDateReminder[i].month < currentMonth
    ) {
      deleteIndexs.push(i);
      continue;
    }
    if (
      arrayDateReminder[i].year === currentYear &&
      arrayDateReminder[i].month === currentMonth &&
      arrayDateReminder[i].day < currentDate
    ) {
      deleteIndexs.push(i);
      continue;
    }
  }
  // reverse array
  deleteIndexs.reverse();
  // delete all old reminders
  for (let i of deleteIndexs) {
    arrayDateReminder.splice(i, 1);
  }
  saveDateReminders();
  // *****************************************************

  // send to display
  display.renderEditDateReminders(arrayDateReminder);
  // check list for year and month | show if year and month are current
  display.renderShowDateReminders(filterDateArray(arrayDateReminder));
}
//*************************************************** */
// Helper functions
//*************************************************** */
const filterWeeklyArray = (arrayWeeklyReminder) => {
  return arrayWeeklyReminder.filter((item) => {
    return item.dayCode === todaysDayCode;
  });
  return;
};
const filterDateArray = (arrayDateReminder) => {
  let showArray = arrayDateReminder.filter((item) => {
    return currentYear === item.year && currentMonth === item.month;
  });
  if (currentMonth !== 12) {
    let nextMonthArray = arrayDateReminder.filter((item) => {
      return currentYear === item.year && currentMonth + 1 === item.month;
    });
    return [...showArray, ...nextMonthArray];
  } else {
    let nextJanuaryArray = arrayDateReminder.filter((item) => {
      return currentYear + 1 === item.year && 1 === item.month;
    });
    return [...showArray, ...nextJanuaryArray];
  }
};
const getAndShowDate = () => {
  let date = new Date();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  el.todayDate.textContent = date.toLocaleDateString(undefined, options);
};
const HomeList = () => {
  // grab all the category's
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

function saveBookmarks() {
  bookmarkStorage.saveArrayToLS(arrayOfTabs);
}
function saveWeeklyReminders() {
  reminderStorage.saveArrayToLS(arrayWeeklyReminder);
}
function saveDateReminders() {
  dateReminderStorage.saveArrayToLS(arrayDateReminder);
}

// create a new array with only the items name
function mapNamesOut(array) {
  let mappedArray = array.map((item) => {
    return item.name;
  });
  return mappedArray;
} // End mapNamesOut(array)

// Sort an array by it's name
function sortArrayByName(array) {
  array.sort(function (a, b) {
    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
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
el.catAddIcon.addEventListener("click", (e) => {
  sound.clickAudio.play();
  display.showCatForm();
  display.displayNone(el.bookmarkList);
  el.catNameInput.focus();
});
// when You click on the +/icon in the bookmark  heading
el.bookmarkAddIcon.addEventListener("click", (e) => {
  sound.clickAudio.play();
  display.showBookmarkForm();
  el.bookmarkNameInput.focus();
});

el.catList.addEventListener("click", (e) => {
  //check if control was down, if so delete
  if (e.ctrlKey) {
    // get the index from the html

    let index = e.target.dataset.index;
    index = parseInt(index);
    if (isNaN(index)) {
      return;
    }
    catIndex = index;
    arrayOfTabs.splice(catIndex, 1);
    sound.deleteAudio.play();
    display.showAlert("A category tab was deleted", "success", 1500);
    // save
    saveBookmarks();

    if (arrayOfTabs.length === 0) {
      startUp();
      return;
    }
    saveBookmarks();
    renderCategorys();
    return;
  }

  // event delegation
  if (e.target.classList.contains("cat")) {
    const element = document.querySelector(".cat.active");
    if (element) {
      element.classList.remove("active");
    }
    // add active class
    e.target.classList.add("active");

    // get the index from the html
    let index = e.target.dataset.index;
    index = parseInt(index);
    if (isNaN(index)) {
      return;
    }
    catIndex = index;
    sound.tabAudio.play();
    renderBookmarks();
  }
});

el.addCatBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // grab the text
  let catName = el.catNameInput.value.trim();
  // check if text is empty
  if (!catName) {
    sound.warning1Audio.play();
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
    sound.warning2Audio.play();
    display.showAlert("That name is taken", "error");
    catIndex = -243;
  } else {
    // push newTab into the array
    arrayOfTabs.push(newTab);
    sound.addBookmarkAudio.play();
    // sort array by name
    sortArrayByName(arrayOfTabs);
    // save
    saveBookmarks();
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
  sound.cancelAudio.play();
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
  let bookmarkName = el.bookmarkNameInput.value.trim();
  let bookmarkURL = el.urlInput.value.trim();
  if (!bookmarkName) {
    sound.warning1Audio.play();
    display.showAlert("Please enter a name for the bookmark!", "error");
    return;
  }
  if (!bookmarkURL) {
    sound.warning2Audio.play();
    display.showAlert("Please enter an address for the bookmark!", "error");
    return;
  }
  let newBookmark = new Bookmark(bookmarkName, bookmarkURL);
  arrayOfTabs[catIndex].arrayOfBookmarks.push(newBookmark);
  sound.addBookmarkAudio.play();

  // save
  saveBookmarks();
  el.bookmarkForm.reset();
  display.displayNone(el.bookmarkForm);
  display.showAlert("A new bookmark was added", "success", 1500);
  renderBookmarks();
});

// when You click on cancel btn on the bookmark form
el.cancelBookmarkBtn.addEventListener("click", (e) => {
  sound.cancelAudio.play();
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
    sound.btnAudio.play();
    // save
    saveBookmarks();
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
    sound.btnAudio.play();
    // save
    saveBookmarks();
    renderBookmarks();
    return;
  }

  if (e.target.classList.contains("delete-item")) {
    if (!e.ctrlKey) {
      sound.warning1Audio.play();
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
    sound.deleteAudio.play();
    // save
    saveBookmarks();
    display.showAlert("A bookmark was deleted", "success", 1500);
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
  sound.clickAudio.play();
  let searchTerm = el.searchTextInput.value;
  //search google
  window.open("http://google.com/search?q=" + searchTerm);
});

document.querySelector("#mdnBtn").addEventListener("click", (e) => {
  e.preventDefault();
  sound.clickAudio.play();
  let searchTerm = el.searchTextInput.value;
  // search MDN
  window.open("https://developer.mozilla.org/en-US/search?q=" + searchTerm);
});
document.querySelector("#youTubeBtn").addEventListener("click", (e) => {
  e.preventDefault();
  souclickAudio.play();
  let searchTerm = el.searchTextInput.value;
  // search Youtube
  window.open("https://www.youtube.com/results?search_query=" + searchTerm);
});
document.querySelector("#stackOverflowBtn").addEventListener("click", (e) => {
  e.preventDefault();
  clickAudio.play();
  let searchTerm = el.searchTextInput.value;
  // search stack overflow
  window.open("https://stackoverflow.com/search?q=" + searchTerm);
});

// ******************************* date reminder code **************
el.saveDateReminderBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let dateToSet = el.dateReminderDateInput.value;
  if (!dateToSet) {
    sound.warning1Audio.play();
    display.showAlert("Please choose a date!", "error");
    return;
  }

  let text = el.dateReminderTextInput.value.trim();
  if (!text) {
    sound.warning1Audio.play();
    display.showAlert(
      "Please enter a message for your date reminder!",
      "error"
    );
    return;
  }

  let dateReminder = new DateReminder(dateToSet, text);
  arrayDateReminder.push(dateReminder);
  display.showAlert("A date reminder was saved", "success", 1500);
  sound.addTabAudio.play();
  el.dateReminderForm.reset();
  dateReminderStorage.saveArrayToLS(arrayDateReminder);
  display.renderEditDateReminders(arrayDateReminder);

  display.renderShowDateReminders(filterDateArray(arrayDateReminder));
});

el.cancelDateReminderBtn.addEventListener("click", (e) => {
  e.preventDefault();
  clickAudio.play();
  display.displayNone(el.remindersDiv);
  el.dateReminderForm.reset();
});

el.editDateReminderList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-date-reminder")) {
    if (!e.ctrlKey) {
      sound.warning1Audio.play();
      display.showAlert(
        "Please hold down the control key and click the trash can to make a deletion!",
        "error"
      );
      return;
    }
    let deleteIndex = e.target.parentElement.dataset.index;

    arrayDateReminder.splice(deleteIndex, 1);
    display.showAlert("A date reminder was deleted", "success", 1500);
    sound.deleteAudio.play();
    // save to  local storage
    dateReminderStorage.saveArrayToLS(arrayDateReminder);
    // redisplay
    display.renderEditDateReminders(arrayDateReminder);
    display.renderShowDateReminders(filterDateArray(arrayDateReminder));
  }
});

el.dateReminderDateInput.addEventListener("change", (e) => {
  sound.tabAudio.play();
});
// *********************************** End Date reminder code ************

//************************************** Weekly reminder code **************************************************** */
el.saveReminderBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // get Input
  let tempDay = selectDayCodeInput.value;

  let tempReminder = reminderTextInput.value.trim();
  if (!tempReminder) {
    sound.warning1Audio.play();
    display.showAlert(
      "Please enter a message for your weekly reminder!",
      "error"
    );
    return;
  }
  // create reminder
  let reminder = new Reminder(tempDay, tempReminder);
  // push reminder
  arrayWeeklyReminder.push(reminder);
  sound.addTabAudio.play();
  display.showAlert("A weekly reminder was saved", "success", 1500);
  el.reminderForm.reset();
  // save to  local storage
  saveWeeklyReminders();
  // redisplay
  display.renderEditReminders(arrayWeeklyReminder);
  display.renderShowReminders(filterWeeklyArray(arrayWeeklyReminder));
});
el.cancelReminderBtn.addEventListener("click", (e) => {
  e.preventDefault();
  clickAudio.play();
  display.displayNone(el.remindersDiv);
  el.reminderForm.reset();
});

el.editReminderList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-reminder")) {
    if (!e.ctrlKey) {
      sound.warning1Audio.play();
      display.showAlert(
        "Please hold down the control key and click the trash can to make a deletion!",
        "error"
      );
      return;
    }

    let deleteIndex = e.target.parentElement.dataset.index;
    display.showAlert("A weekly reminder was deleted", "success", 1500);
    arrayWeeklyReminder.splice(deleteIndex, 1);
    sound.deleteAudio.play();
    // save to  local storage
    saveWeeklyReminders();
    // redisplay
    display.renderEditReminders(arrayWeeklyReminder);
    display.renderShowReminders(filterWeeklyArray(arrayWeeklyReminder));
  }
});

el.pieBtn.addEventListener("click", (e) => {
  if (e.ctrlKey && e.shiftKey) {
    clickAudio.play();
    display.displayBlock(el.remindersDiv);
  }
});
el.selectDayCodeInput.addEventListener("change", (e) => {
  sound.tabAudio.play();
});
//  load and show JSON
el.showJSONSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  sound.tabAudio.play();
  const dataObj = {
    type: "bookmarkJSON",
    arrayOfTabs,
    arrayWeeklyReminder,
    arrayDateReminder,
  };
  el.bookmarksTextareaInput.value = JSON.stringify(dataObj);
});
el.loadJSONBtn.addEventListener("click", (e) => {
  e.preventDefault();
  sound.tabAudio.play();
  const data = el.bookmarksTextareaInput.value.trim();

  if (!data) {
    sound.warning1Audio.play();
    display.showAlert("Please enter JSON in the textarea!", "error");
    return;
  }
  const dataObj = JSON.parse(data);
  if (dataObj.type !== "bookmarkJSON") {
    sound.warning1Audio.play();
    display.showAlert("This is not a valid JSON bookmark type!", "error");
    return;
  }
  if (
    Array.isArray(dataObj.arrayOfTabs) &&
    Array.isArray(dataObj.arrayWeeklyReminder) &&
    Array.isArray(dataObj.arrayDateReminder)
  ) {
    arrayOfTabs = dataObj.arrayOfTabs;
    arrayWeeklyReminder = dataObj.arrayWeeklyReminder;
    arrayDateReminder = dataObj.arrayDateReminder;
    display.displayNone(el.JSONForm);
    saveBookmarks();
    saveWeeklyReminders();
    saveDateReminders();
    el.bookmarksTextareaInput.value = "";
    startUp();
  }
});
el.bookmarksClearTextAreaBtn.addEventListener("click", (e) => {
  el.bookmarksTextareaInput.value = "";
});
el.bookmarksTextareaCancelBtn.addEventListener("click", (e) => {
  clickAudio.play();
  el.bookmarksTextareaInput.value = "";
  display.displayNone(el.JSONForm);
});
el.showJSONBtn.addEventListener("click", (e) => {
  if (e.ctrlKey && e.shiftKey) {
    clickAudio.play();
    display.displayBlock(el.JSONForm);
  }
});
