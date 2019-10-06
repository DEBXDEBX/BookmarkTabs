class StoreageLS {
  constructor() {
    this.file = "fileBookmark10062019DEBX";
  }

  //Method setArrayToFileName
  setArrayToFileName(array) {
    let myHomeJSON = JSON.stringify(array);
    localStorage.setItem(this.file, myHomeJSON);
  }

  // Method getArrayFromFile
  getArrayFromFile() {
    //Make a variable for array
    let array;
    // Read file
    let textFromFile = localStorage.getItem(this.file);

    if (textFromFile) {
      //parse file
      array = JSON.parse(textFromFile);
    } else {
      array = [];
    }
    // return array
    return array;
  } // End getArrayFromFile method
}
