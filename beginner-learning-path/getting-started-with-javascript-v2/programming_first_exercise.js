// TODO: define addFavoriteBook(..) function

const addFavoriteBook = (book) => {
  if (!book.includes("Great")) addFavoriteBooks.push(book);
};

//TODO: define printFavoriteBooks() function

const printFavoriteBooks = (books) => {
  console.log("My favorite books are:");
  for (i = 0; i < books.length; i++) {
    console.log(books[i]);
  }
};

var addFavoriteBooks = [];

addFavoriteBook("A Song of Ice and Fire");
addFavoriteBook("The Great Gatsby");
addFavoriteBook("Crime & Punishment");
addFavoriteBook("Great Expectations");
addFavoriteBook("You Don't Know JS");

// TODO: print out favorite books

printFavoriteBooks(addFavoriteBooks);
