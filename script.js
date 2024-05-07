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
    const discardBtn = document.createElement("button");
    const checkbox = document.createElement("input");
    const titleP = document.createElement("p");
    const authorP = document.createElement("p");
    const pagesP = document.createElement("p");
    const readingStatusP = document.createElement("p");

    titleP.innerText = `Title: ${book.title}`;
    authorP.innerText = `Author: ${book.author}`;
    pagesP.innerText = `Pages: ${book.pages}`;
    readingStatusP.innerText = `Status: ${book.status}`;

    checkbox.type = "checkbox";
    checkbox.checked = book.haveRead;
    checkbox.addEventListener("click", () => {
      console.log("checkbox toggled");
      book.toggleReadStatus();
    });

    // add click event to each button
    addDiscardListener(discardBtn);

    bookDiv.dataset.bookIndex = index;
    discardBtn.innerText = "Discard";

    //bookDiv.innerText = book.info();
    bookDiv.appendChild(checkbox);
    bookDiv.appendChild(discardBtn);
    bookDiv.appendChild(titleP);
    bookDiv.appendChild(authorP);
    bookDiv.appendChild(pagesP);
    bookDiv.appendChild(readingStatusP);
    bookDiv.classList.add("book");
    bookContainer.appendChild(bookDiv);
  });
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
    const currentBookElem = discardBtn.parentElement;
    myLibrary.splice(currentBookElem.dataset.bookIndex, 1);

    // remove old books from dom and repopulate with current library
    removeBooks();
    createBooks();
  });
}
