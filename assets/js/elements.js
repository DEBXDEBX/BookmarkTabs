class Elements {
  constructor() {
    // select the lists
    this.catList = document.querySelector("#catList");
    this.bookmarkList = document.querySelector("#bookmarkList");
    // select headings
    this.catHeading = document.querySelector("#catHeading");
    this.bookmarkHeading = document.querySelector("#bookmarkHeading");

    // select forms
    this.catForm = document.querySelector("#catForm");
    this.bookmarkForm = document.querySelector("#bookmarkForm");
    // Form Reminder
    this.reminderForm = document.querySelector("#reminderForm");
    this.dateReminderForm = document.querySelector("#dateReminderForm");
    // select button's
    this.addCatBtn = document.querySelector("#catAddBtn");
    this.cancelCatBtn = document.querySelector("#catCancel");
    this.addBookmarkBtn = document.querySelector("#bookmarkAddBtn");
    this.cancelBookmarkBtn = document.querySelector("#bookmarkCancel");

    // select add show forms + / icon
    this.catAddIcon = document.querySelector("#catAddIcon");
    this.bookmarkAddIcon = document.querySelector("#bookmarkAddIcon");
    // select textName and and url
    this.catNameInput = document.querySelector("#catNameInput");
    this.bookmarkNameInput = document.querySelector("#bookmarkNameInput");
    this.urlInput = document.querySelector("#urlInput");
    // online offline status
    this.onLineStatus = document.querySelector("#status");
    // todays date
    this.todayDate = document.querySelector("#todayDate");
    // select message display
    this.messageDisplay = document.querySelector("#displayMessage");
    // select message border
    this.messageBorder = document.querySelector("#modalBorder");
    //  search input
    this.searchTextInput = document.querySelector("#searchTextInput");

    // Div container to hide and show
    this.remindersDiv = document.querySelector("#remindersDiv");
    // select the lists
    this.showReminderList = document.querySelector("#showReminderList");
    this.editReminderList = document.querySelector("#editReminderList");
    this.showDateReminderList = document.querySelector("#showDateReminderList");
    this.editDateReminderList = document.querySelector("#editDateReminderList");
    // select button's
    this.saveReminderBtn = document.querySelector("#saveReminderBtn");
    this.cancelReminderBtn = document.querySelector("#cancelReminderBtn");
    this.pieBtn = document.querySelector("#pieBtn");
    this.saveDateReminderBtn = document.querySelector("#saveDateReminderBtn");
    this.cancelDateReminderBtn = document.querySelector(
      "#cancelDateReminderBtn"
    );
    // select input's
    this.selectDayCodeInput = document.querySelector("#selectDayCodeInput");
    this.reminderTextInput = document.querySelector("#reminderTextInput");
    this.dateReminderDateInput = document.querySelector(
      "#dateReminderDateInput"
    );
    this.dateReminderTextInput = document.querySelector(
      "#dateReminderTextInput"
    );
    this.bookmarksTextareaInput = document.querySelector(
      "#bookmarksTextareaInput"
    );
    this.showJSONSubmitBtn = document.querySelector("#showJSONSubmitBtn");
    this.bookmarksClearTextAreaBtn = document.querySelector(
      "#bookmarksClearTextAreaBtn"
    );
    this.loadJSONBtn = document.querySelector("#loadJSONBtn");
    this.bookmarksTextareaCancelBtn = document.querySelector(
      "#bookmarksTextareaCancelBtn"
    );
    this.JSONForm = document.querySelector("#JSONForm");
    this.showJSONBtn = document.querySelector("#showJSONBtn");
  }
}
