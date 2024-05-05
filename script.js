let book = new Book("Can't Hurt Me", "David Goggins", 300, "read");

const myLibrary = [book];

function Book(title, author, pages, haveRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages}, ${this.haveRead}`;
};

function addBookToLibrary() {
  let title = prompt("Enter a title");
  let author = prompt("Enter author");
  let pages = prompt("Enter amount of pages");
  let haveRead = prompt("Read: Yes or No");

  let book = new Book(title, author, pages, haveRead);
  myLibrary.push(book);
}

function displayBooks() {
  myLibrary.forEach((book) => {
    console.log(book.info());
  });
}
displayBooks();
