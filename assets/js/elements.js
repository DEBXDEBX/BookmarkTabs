class Elements {
  constructor() {
    // select the lists
    this.catagoryList = document.querySelector("#catList");
    this.bookmarkList = document.querySelector("#boomarkList");
    // select headings
    this.catHeading = document.querySelector("#catHeading");
    this.bookmarkHeading = document.querySelector("#bookmarkHeading");

    // select forms
    this.catForm = document.querySelector("#catForm");
    this.bookmarkForm = document.querySelector("#bookmarkForm");
    // select add show forms + / icon
    this.addShowFormMain = document.querySelector("#catAdd");
    this.addShowFormSub = document.querySelector("#boomarkAdd");
    // select textName and and url
    this.textCat = document.querySelector("#textCat");
    this.textBookmark = document.querySelector("#textBookmark");
    this.textURL = document.querySelector("#textURL");
  }
}
