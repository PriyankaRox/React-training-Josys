// Library Object (Object Literal)
const Library = {
  books: [],

  addBook(book) {
    this.books.push(book);
  },

  listAvailableBooks() {
    return this.books.filter((book) => !book.isBorrowed);
  },
};

// Data
Library.addBook(createBook("Atomic Habits", "James Clear"));
Library.addBook(createBook("The 5am club", "Robin Sharma"));
Library.addBook(createBook("The guide", "R K Narayan"));
Library.addBook(createBook("Making India Awesome", "Chetan Bhagat"));
Library.addBook(createBook("Godan", "Prem Chand"));
Library.addBook(createBook("Halmet", "William SHakespeare"));

// Book Factory Function
function createBook(title, author) {
  return {
    title,
    author,
    isBorrowed: false,
  };
}

// User Constructor Function and Prototype Methods
function User(name, id) {
  this.name = name;
  this.id = id || "N/A";
  this.borrowedBooks = [];
}

User.prototype.borrowBook = function (bookTitle) {
  const book = Library.books.find(
    (b) => b.title === bookTitle && !b.isBorrowed
  );

  if (book) {
    book.isBorrowed = true;
    this.borrowedBooks.push(book);
    alert(`${this.name} borrowed "${book.title}"`);
  } else {
    alert(`Sorry, "${bookTitle}" is not available.`);
  }
};

User.prototype.returnBook = function (bookTitle) {
  const bookIndex = this.borrowedBooks.findIndex(
    (book) => book.title === bookTitle
  );

  if (bookIndex !== -1) {
    const book = this.borrowedBooks[bookIndex];
    book.isBorrowed = false;
    this.borrowedBooks.splice(bookIndex, 1);
    alert(`${this.name} returned "${book.title}"`);
  } else {
    alert(`You haven't borrowed "${bookTitle}".`);
  }
};

// LibraryMember Constructor and Prototype Inheritance
function LibraryMember(name, membershipId = "N/A") {
  User.call(this, name);
  this.membershipId = membershipId;
}

LibraryMember.prototype = Object.create(User.prototype);
LibraryMember.prototype.constructor = LibraryMember;

LibraryMember.prototype.getMembershipInfo = function () {
  return `Member: ${this.name}, ID: ${this.membershipId}`;
};

// Helper Functions for UI
function updateBookList() {
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = "";

  Library.listAvailableBooks().forEach((book) => {
    const bookItem = document.createElement("li");
    bookItem.textContent = `${book.title} by ${book.author}`;
    bookList.appendChild(bookItem);
  });

  updateAvailableBooksDropdown();
}

function updateAvailableBooksDropdown() {
  const dropdown = document.getElementById("available-books-dropdown");
  dropdown.innerHTML = "";

  Library.listAvailableBooks().forEach((book) => {
    const option = document.createElement("option");
    option.value = book.title;
    option.textContent = `${book.title} by ${book.author}`;
    dropdown.appendChild(option);
  });
}

function updateBorrowedBooksDropdown() {
  const dropdown = document.getElementById("borrowed-books-dropdown");
  dropdown.innerHTML = "";

  if (currentUser && currentUser.borrowedBooks.length > 0) {
    currentUser.borrowedBooks.forEach((book) => {
      const option = document.createElement("option");
      option.value = book.title;
      option.textContent = `${book.title}`;
      dropdown.appendChild(option);
    });
  } else {
    // If no books borrowed, show placeholder
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "No borrowed books";
    dropdown.appendChild(option);
  }
}

function updateUserDetails() {
  const userDetails = document.getElementById("user-details");
  userDetails.innerHTML = "";

  users.forEach((user) => {
    const userInfo = document.createElement("div");
    userInfo.className = "user-info";
    const borrowedBooks = user.borrowedBooks.length
      ? user.borrowedBooks.map((book) => book.title).join(", ")
      : "No books borrowed";

    userInfo.innerHTML = `
        <h3>${user.name}</h3>
        <div>Membership ID: ${user.membershipId || "N/A"}</div>
        <div>Borrowed Books: ${borrowedBooks}</div>
      `;

    userDetails.appendChild(userInfo);
  });
}

// Main Library and User Management
let currentUser = null;
const users = [];

function createUser() {
  const name = document.getElementById("user-name").value;
  const membershipId = document.getElementById("membership-id").value || "N/A";

  const newUser =
    membershipId !== "N/A"
      ? new LibraryMember(name, membershipId)
      : new User(name);
  users.push(newUser);

  updateUserDropdown();
  updateUserDetails();
  updateAvailableBooksDropdown();
  document.getElementById("user-name").value = "";
  document.getElementById("membership-id").value = "";
}

function updateUserDropdown() {
  const dropdown = document.getElementById("user-dropdown");
  dropdown.innerHTML = "";

  users.forEach((user) => {
    const option = document.createElement("option");
    option.value = user.name;
    option.textContent = `${user.name} (${user.membershipId || "N/A"})`;
    dropdown.appendChild(option);
  });

  // Automatically set the first user as selected after dropdown update
  setCurrentUser();

  // Add event listener to update currentUser and borrowed books dropdown on user change
  dropdown.addEventListener("change", () => {
    setCurrentUser();
    updateBorrowedBooksDropdown();
  });
}

function setCurrentUser() {
  const selectedUserName = document.getElementById("user-dropdown").value;
  currentUser = users.find((user) => user.name === selectedUserName);

  updateBorrowedBooksDropdown();
}

function borrowBook() {
  const bookTitle = document.getElementById("available-books-dropdown").value;
  setCurrentUser();

  if (currentUser) {
    currentUser.borrowBook(bookTitle);
    updateBookList();
    updateBorrowedBooksDropdown();
    updateUserDetails();
  }
}

function returnBook() {
  const bookTitle = document.getElementById("borrowed-books-dropdown").value;
  setCurrentUser();

  if (currentUser) {
    currentUser.returnBook(bookTitle);
    updateBookList();
    updateBorrowedBooksDropdown();
    updateUserDetails();
  }
}

// Function to add a new book
function addNewBookToLibrary() {
  const title = document.getElementById("new-book-title").value;
  const author = document.getElementById("new-book-author").value;

  if (title && author) {
    const newBook = createBook(title, author);
    Library.addBook(newBook);

    alert(`"${title}" by ${author} added to the library!`);

    // Clear input fields
    document.getElementById("new-book-title").value = "";
    document.getElementById("new-book-author").value = "";

    // Update the available books list and dropdown
    updateBookList();
  } else {
    alert("Please provide both title and author for the book.");
  }
}

// Event Listener for "Add Book" Button
document
  .getElementById("add-book-button")
  .addEventListener("click", addNewBookToLibrary);

updateBookList();
