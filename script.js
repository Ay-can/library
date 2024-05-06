let book = new Book("aa", "bb", 12, true);

const myLibrary = [
  book,
  book,
  book,
  book,
  book,
  book,
  book,
  book,
  book,
  book,
  book,
  book,
  book,
  book,
  book,
  book,
  book,
];

function Book(title, author, pages, haveRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages}, ${this.haveRead}`;
};

function addBookToLibrary(book) {
  myLibrary.push(book);
  const bookDiv = document.createElement("div");

  bookDiv.innerText = book.info();
  bookDiv.classList.add("book");
  bookContainer.appendChild(bookDiv);
}

const bookContainer = document.querySelector(".books-container");

function displayBooks() {
  myLibrary.forEach((book) => {
    const bookDiv = document.createElement("div");
    bookDiv.innerText = book.info();
    bookDiv.classList.add("book");
    bookContainer.appendChild(bookDiv);
  });
}

const dialog = document.querySelector("dialog");
const addBookBtn = document.querySelector("dialog + button");
const confirmBtn = document.querySelector("#confirm-btn");
const cancelBtn = document.querySelector("#cancel-btn");
const allFields = document.querySelectorAll("input");
const form = document.querySelector("form");

function clearInputFields() {
  allFields.forEach((field) => {
    field.value = "";
  });
}

addBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

confirmBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const title = document.querySelector("#title");
  const author = document.querySelector("#author");
  const pages = document.querySelector("#pages");
  const read = document.querySelector("#read");

  if (form.reportValidity()) {
    let book = new Book(title.value, author.value, pages.value, read.value);
    addBookToLibrary(book);
    clearInputFields();
    dialog.close();
  }
});

cancelBtn.addEventListener("click", () => {
  dialog.close();
});

displayBooks();
