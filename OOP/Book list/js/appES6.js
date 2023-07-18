// this class is for all code that affects the book from the javascript side
class books {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
// this class affects the UI directly, DOM manipulation
class UI {
  addBooktoContainer(book) {
    const bookList = document.getElementById("book-list");
    const row = document.createElement("tr");
    // insert columns into rows
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a class="delete" href="#">X<a></td>
    `;
    console.log(book);
    bookList.appendChild(row);
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
  clearField() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
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
      ui.addBooktoContainer(book);
    });
  }
  static storeBooksInLS(book) {
    // gets value of books from ui- book-list
    const books = storeinLS.getBooksFromLS();
    // pushes the value to LS
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  static removeBooksInLS(isbn) {
    // we use isbn because it is unique to every book, no two identical numbers
    // gets value of books from ui- book-list
    const books = storeinLS.getBooksFromLS();
    books.forEach(function (book, index) {
      if (book.isbn === isbn) {
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
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;
  const book = new books(title, author, isbn);
  const ui = new UI();
  // console.log(book);
  // VALIDATE ERROR OR SUCCESS
  if (title === "" || author === "" || isbn === "") {
    ui.showAlertOrError("Please fill in the fields", "error");
  } else {
    // show green alert box
    ui.showAlertOrError("Book ADDED Succesfully", "success");
    // add book to book list
    ui.addBooktoContainer(book);
    // clear input fields
    ui.clearField();
    // add book in LS
    storeinLS.storeBooksInLS(book);
  }
  e.preventDefault();
});
// event listener for removing book
document.getElementById("book-list").addEventListener("click", function (e) {
  // instantiate ui
  const ui = new UI();
  // remove from UI - book list
  ui.removeBook(e.target);
  // remove from LS
  storeinLS.removeBooksInLS(
    e.target.parentElement.previousElementSibling.textContent
  );
  // show green alert box
  ui.showAlertOrError("Book REMOVED Succesfully", "success");
  // prevent default of the action
  e.preventDefault();
});
