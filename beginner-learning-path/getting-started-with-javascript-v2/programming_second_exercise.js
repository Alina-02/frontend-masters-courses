class Bookshelf {
  constructor() {
    this.favoriteBooks = [];
  }

  // TODO: define methods `addFavoriteBook(..)`
  // and `printFavoriteBooks()`

  addFavoriteBook(bookName) {
    if (!bookName.includes("Great")) {
      this.favoriteBooks.push(bookName);
    }
  }

  printFavoriteBooks() {
    console.log(`Favorite Books: ${String(this.favoriteBooks.length)}`);
    for (let i = 0; i < this.favoriteBooks.length; i++) {
      console.log(this.favoriteBooks[i]);
    }
  }
}

function loadBooks(bookshelf) {
  // TODO: call fakeAjax( .. );
  fakeAjax(BOOK_API, function onBooks(bookNames) {
    bookNames.map(function addBook(b) {
      bookshelf.addFavoriteBook(b);
    });
    bookshelf.printFavoriteBooks();
  });
}

var BOOK_API = "https://some.url/api";

var bookshelf = new Bookshelf();
loadBooks(bookshelf);

// ***********************

// NOTE: don't modify this function at all
function fakeAjax(url, cb) {
  setTimeout(function fakeLoadingDelay() {
    cb([
      "A Song of Ice and Fire",
      "The Great Gatsby",
      "Crime & Punishment",
      "Great Expectations",
      "You Don't Know JS",
    ]);
  }, 500);
}
