const myLibrary = [];

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages}, ${this.status}`;
};

Book.prototype.toggleReadStatus = function () {
  this.status ? (this.status = false) : (this.status = true);
};

function addBookToLibrary(book) {
  myLibrary.push(book);
}

const bookContainer = document.querySelector(".books-container");

// populates DOM with library books
function createBooks() {
  myLibrary.forEach((book, index) => {
    const bookDiv = document.createElement("div");
    const bookContent = document.createElement("div");
    const bookCover = document.createElement("div");
    bookCover.id = "book-cover";

    // populate content div with fields
    createBookContent(book, bookContent);
    bookContent.id = "book-content";

    bookDiv.dataset.bookIndex = index;
    console.log(bookDiv);

    bookDiv.appendChild(bookCover);
    bookDiv.appendChild(bookContent);
    bookDiv.classList.add("book");
    bookContainer.appendChild(bookDiv);
  });
}

// populate div with book fields
// I hope react has a better way to do this.
function createBookContent(book, bookContent) {
  const titleP = document.createElement("p");
  const authorP = document.createElement("p");
  const pagesP = document.createElement("p");
  const readingStatusDiv = document.createElement("div");
  const readingStatusP = document.createElement("span");
  const checkbox = document.createElement("input");
  const discardBtn = document.createElement("button");

  addDiscardListener(discardBtn);
  addCheckboxListener(book, checkbox);

  titleP.innerText = `${book.title}`;
  authorP.innerText = `By ${book.author}`;
  pagesP.innerText =
    book.pages === "" ? "Unknown Pages" : `${book.pages} Pages`;

  discardBtn.innerText = "Discard";
  readingStatusP.innerText = `Read `;
  readingStatusDiv.classList.add("reading-status");

  titleP.classList.add("bold-label");

  readingStatusDiv.appendChild(readingStatusP);
  readingStatusDiv.appendChild(checkbox);

  bookContent.appendChild(titleP);
  bookContent.appendChild(authorP);
  bookContent.appendChild(pagesP);
  bookContent.appendChild(readingStatusDiv);
  bookContent.appendChild(discardBtn);
}

function removeBooks() {
  const books = document.querySelectorAll(".books-container > .book");
  books.forEach((book) => {
    bookContainer.removeChild(book);
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
  const readCheckbox = document.querySelector("#read");

  if (form.reportValidity()) {
    let book = new Book(
      title.value,
      author.value,
      pages.value,
      readCheckbox.checked
    );

    removeBooks();
    addBookToLibrary(book);
    createBooks();
    clearInputFields();
    dialog.close();
  }
});

cancelBtn.addEventListener("click", () => {
  dialog.close();
});

function addDiscardListener(discardBtn) {
  // remove book library array
  discardBtn.addEventListener("click", () => {
    const currentBookElem = discardBtn.parentElement.parentElement;
    myLibrary.splice(currentBookElem.dataset.bookIndex, 1);

    // remove old books from dom and repopulate with current library
    removeBooks();
    createBooks();
  });
}

function addCheckboxListener(book, checkbox) {
  checkbox.type = "checkbox";
  checkbox.checked = book.status;
  checkbox.addEventListener("click", () => {
    book.toggleReadStatus();
  });
}
