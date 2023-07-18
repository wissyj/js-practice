// this class is for all code that affects the book from the javascript side
class time {
  constructor(firstName, lastName, regNo, signedIn, signedOut) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.regNo = regNo;
    this.signedIn = signedIn;
    this.signedOut = signedOut;
  }
}
// this class affects the UI directly, DOM manipulation
class UI {
  addTimeToList(time) {
    const timeList = document.getElementById("book-list");
    const row = document.createElement("tr");
    row.id = "row1";
    // insert columns into rows
    row.innerHTML = `
        <td>${time.firstName}</td>
        <td>${time.lastName}</td>
        <td>${time.regNo}</td>
        <td >${time.signedIn}</td>
        <td >${time.signedOut}</td>
        <td><a class="delete" href="#">X<a></td>
        <td ><a id="signedOut" class="signedOut" href="#">Sign Out<a></td>
      `;
    timeList.appendChild(row);
  }

  showAlertOrError(message, className) {
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const bookForm = document.querySelector("#book-form");
    // the first parameter- conatiner is the place I am inserting the div while the second parameter- bookForm is where I am inserting div before
    container.insertBefore(div, bookForm);
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }
  removeBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }
  signedOut(target) {
    if (target.className === "signedOut") {
      // get time for signing in
      const currentTime = new Date();
      const currentHour = currentTime.getHours();
      const currentMinutes = currentTime.getMinutes();
      let signedOutValue = `${currentHour}:${currentMinutes}`;
      if (currentMinutes < 10) {
        signedOutValue = `${currentHour}:0${currentMinutes}`;
      }
      target.parentElement.previousElementSibling.previousElementSibling.textContent =
        signedOutValue;
      // Get the relevant data for the time entry
      const firstName =
        target.parentElement.parentElement.querySelector("td").textContent;
      const lastName =
        target.parentElement.parentElement.querySelector(
          "td:nth-child(2)"
        ).textContent;
      const regNo =
        target.parentElement.parentElement.querySelector(
          "td:nth-child(3)"
        ).textContent;
      const signedIn =
        target.parentElement.parentElement.querySelector(
          "td:nth-child(4)"
        ).textContent;

      // Create a new time entry object with updated "signedOut" value
      const updatedTimeEntry = new time(
        firstName,
        lastName,
        regNo,
        signedIn,
        signedOutValue
      );
      // Get all time entries from LS
      const times = storeinLS.getBooksFromLS();
      // Find the index of the time entry to be updated in the array
      const indexToUpdate = times.findIndex((time) => time.regNo === regNo);
      // Update the entry in the array
      times[indexToUpdate] = updatedTimeEntry;
      // Update the LS with the updated array
      localStorage.setItem("books", JSON.stringify(times));
    }
  }
  clearField() {
    document.getElementById("firstName").value = "";
    document.getElementById("surname").value = "";
    document.getElementById("regNo").value = "";
  }
}
// class to store books in LS
class storeinLS {
  // static helps us to not instantiate UI in this case
  static getBooksFromLS() {
    let books;
    if (localStorage.getItem("books") === null) {
      //  it simply means: since LS is empty, do NOTHING but to return [] as value
      books = [];
    } else {
      // it simply means: get the value of the books you find
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static displayBooksInUI() {
    // gets value of books from LS
    const books = storeinLS.getBooksFromLS();
    books.forEach(function (book) {
      // instantiate ui / call on ui class above
      const ui = new UI();
      // add the value of the book gotten from LS to the UI- book-list
      ui.addTimeToList(book);
    });
    const signedOut = document.querySelectorAll("td:nth-child(5)");

    // Loop through each "signedOut" cell
    signedOut.forEach((cell) => {
      const signedOutValue = cell.textContent.trim();

      // Check if the "signedOut" time is not empty
      if (signedOutValue !== "") {
        // Get the corresponding "Sign Out" link (last child of the row)
        const signedOutBtn = cell.parentElement.querySelector("td:last-child");

        // Remove the "Sign Out" link from the DOM
        signedOutBtn.remove();
      }
    });
  }
  static storeBooksInLS(book) {
    // gets value of books from ui- book-list
    const books = storeinLS.getBooksFromLS();
    // pushes the value to LS
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  static removeBooksInLS(regNo) {
    // we use regNo to search LS due to its uniqueness,it is only assigned to one staff
    // gets value of books from ui- book-list
    const books = storeinLS.getBooksFromLS();
    books.forEach(function (book, index) {
      if (book.regNo === regNo) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}
//  Event listener for DOM LOAD
document.addEventListener("DOMContentLoaded", storeinLS.displayBooksInUI);
// event listener for add book
document.getElementById("book-form").addEventListener("submit", function (e) {
  const firstName = document.getElementById("firstName").value;
  const surname = document.getElementById("surname").value;
  const regNo = document.getElementById("regNo").value;
  // get time for signing in
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();

  let signedOut = ``;
  let signedIn = `${currentHour}:${currentMinutes}`;
  if (currentMinutes < 10) {
    signedIn = `${currentHour}:0${currentMinutes}`;
  }

  const times = new time(firstName, surname, regNo, signedIn, signedOut);
  const ui = new UI();
  // VALIDATE ERROR OR SUCCESS
  if (firstName === "" || surname === "" || regNo === "") {
    ui.showAlertOrError("Please fill in all the fields", "error");
  } else {
    // show green alert box
    ui.showAlertOrError("Time Log ADDED Succesfully", "success");
    // add times to times list
    ui.addTimeToList(times);
    // clear input fields
    ui.clearField();
    // add times in LS
    storeinLS.storeBooksInLS(times);
  }
  e.preventDefault();
});
// event listener for removing time log
document.getElementById("book-list").addEventListener("click", function (e) {
  // removing time log
  if (e.target.className === "delete") {
    // instantiate ui
    const ui = new UI();
    // remove from UI - book list
    ui.removeBook(e.target);
    // remove from LS
    storeinLS.removeBooksInLS(
      e.target.parentElement.previousElementSibling.previousElementSibling
        .previousElementSibling.textContent
    );

    // show green alert box
    ui.showAlertOrError("Time Log REMOVED Succesfully", "success");
  }
  // signing out
  if (e.target.className === "signedOut") {
    // instantiate ui/ call ui
    const ui = new UI();
    // signout time added
    ui.signedOut(e.target);
    // show green alert box
    ui.showAlertOrError(
      "Signed out successfully. Thank you for your service.",
      "success"
    );
    if (
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent != ""
    ) {
      // since I can't disable the sign out button, let's remove it. It is not needed by the staff anymore
      e.target.parentElement.remove();
    }
  }
  // prevent default of the action
  e.preventDefault();
});
