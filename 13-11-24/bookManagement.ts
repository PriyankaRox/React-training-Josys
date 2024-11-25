//Book Club Management System using TypeScript Enums

//Create an enum called BookGenre with the following values
enum BookGenre {
  FICTION = "Fiction",
  NON_FICTION = "Non_Fiction",
  MYSTERY = "Mystery",
  SCIENCE_FICTION = "Science_Fiction",
  BIOGRAPHY = "Biography",
  FANTASY = "Fantasy",
}

//Create another enum called MemberRole with the following values
enum MemberRole {
  ORGANIZER = "Organizer",
  MODERATOR = "Moderator",
  MEMBER = "Member",
  GUEST = "Guest",
}

//Define a Book type that includes
type Book = {
  title: string;
  author: string;
  genre: BookGenre;
};

//Define a Member type that includes
type Member = {
  name: string;
  role: MemberRole;
};

//function getBooksByGenre that accepts a list of Book objects and a BookGenre value. The function should return only the books that match the specified genre.
function getBooksByGenre(books: Book[], genres: BookGenre): Book[] {
  return books.filter((index) => index.genre === genres);
}

const books: Book[] = [
  { title: "The Hunger Games", author: "Suzanne", genre: BookGenre.FICTION },
  {
    title: "Atomic Habits",
    author: "James Clear",
    genre: BookGenre.NON_FICTION,
  },
  {
    title: "The 5am Club",
    author: "Robin SHarma",
    genre: BookGenre.NON_FICTION,
  },
  {
    title: "MS Dhoni The Untold Story",
    author: "Gulu Ezekiel",
    genre: BookGenre.BIOGRAPHY,
  },
  {
    title: "A Journey To The Centre Of The Earth",
    author: "Jules Verne",
    genre: BookGenre.SCIENCE_FICTION,
  },
  {
    title: "A Game Of Thrones",
    author: "George RR Martin",
    genre: BookGenre.FANTASY,
  },
];

const result1 = getBooksByGenre(books, BookGenre.NON_FICTION);
const result2 = getBooksByGenre(books, BookGenre.FICTION);
console.log("The books that match the specified genre are ", result1, result2);

//function getMembersByRole that accepts a list of Member objects and a MemberRole value. The function should return only the members who have the specified role.
function getMembersByRole(members: Member[], role: MemberRole): Member[] {
  return members.filter((index) => index.role === role);
}

const members: Member[] = [
  { name: "Max", role: MemberRole.MODERATOR },
  { name: "Eve", role: MemberRole.GUEST },
  { name: "Sui", role: MemberRole.MODERATOR },
];

const roleResult = getMembersByRole(members, MemberRole.MODERATOR);

console.log("The members who have the specified role are", roleResult);

//function countBooksByGenre that takes a list of Book objects and returns an object summarizing the count of each genre.
function countBooksByGenre(books: Book[]): Record<BookGenre, number> {
  return books.reduce((acc, currentValue) => {
    acc[currentValue.genre] = (acc[currentValue.genre] || 0) + 1;
    return acc;
  }, {} as Record<BookGenre, number>);
}

const bookGenreCount = countBooksByGenre(books);
console.log("The count of each genre is", bookGenreCount);
