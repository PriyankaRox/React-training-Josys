//Book Club Management System using TypeScript Enums
//Create an enum called BookGenre with the following values
var BookGenre;
(function (BookGenre) {
    BookGenre["FICTION"] = "Fiction";
    BookGenre["NON_FICTION"] = "Non_Fiction";
    BookGenre["MYSTERY"] = "Mystery";
    BookGenre["SCIENCE_FICTION"] = "Science_Fiction";
    BookGenre["BIOGRAPHY"] = "Biography";
    BookGenre["FANTASY"] = "Fantasy";
})(BookGenre || (BookGenre = {}));
//Create another enum called MemberRole with the following values
var MemberRole;
(function (MemberRole) {
    MemberRole["ORGANIZER"] = "Organizer";
    MemberRole["MODERATOR"] = "Moderator";
    MemberRole["MEMBER"] = "Member";
    MemberRole["GUEST"] = "Guest";
})(MemberRole || (MemberRole = {}));
//function getBooksByGenre that accepts a list of Book objects and a BookGenre value. The function should return only the books that match the specified genre.
function getBooksByGenre(books, genres) {
    return books.filter(function (index) { return index.genre === genres; });
}
var books = [
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
var result1 = getBooksByGenre(books, BookGenre.NON_FICTION);
var result2 = getBooksByGenre(books, BookGenre.FICTION);
console.log("The books that match the specified genre are ", result1, result2);
//function getMembersByRole that accepts a list of Member objects and a MemberRole value. The function should return only the members who have the specified role.
function getMembersByRole(members, role) {
    return members.filter(function (index) { return index.role === role; });
}
var members = [
    { name: "Max", role: MemberRole.MODERATOR },
    { name: "Eve", role: MemberRole.GUEST },
    { name: "Sui", role: MemberRole.MODERATOR },
];
var roleResult = getMembersByRole(members, MemberRole.MODERATOR);
console.log("The members who have the specified role are", roleResult);
//function countBooksByGenre that takes a list of Book objects and returns an object summarizing the count of each genre.
function countBooksByGenre(books) {
    return books.reduce(function (acc, currentValue) {
        acc[currentValue.genre] = (acc[currentValue.genre] || 0) + 1;
        return acc;
    }, {});
}
var bookGenreCount = countBooksByGenre(books);
console.log("The count of each genre is", bookGenreCount);
