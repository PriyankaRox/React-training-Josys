const books = [
  {
    id: 1,
    title: "Ikigai",
    price: "200",
    image: "https://images.meesho.com/images/products/186033703/5tx7l_512.webp",
  },
  {
    id: 2,
    title: "Atomic Habits",
    price: "179",
    image:
      "https://99bookstores.com/cdn/shop/files/91bYsX41DVL._SL1500.jpg?v=1698414556&width=1920",
  },
  {
    id: 3,
    title: "Panchatantra",
    price: "299",
    image:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTx7HtqQpZ57SxOwyHcl0O_XmEYJ8Ak5RHDk3X56aLrP8hacNXLqAALambGYV-IA209JsFJsbTTDDFafUEulRJqvnWbpmGb3XOHlbqvx2aoPDPDYaZGQ1B1",
  },
  {
    id: 4,
    title: "The Silent Patient",
    price: "150",
    image:
      "https://www.bookishadda.com/cdn/shop/files/76_592835a2-8ead-4ebe-abcf-e6f2e3e6323b.png?v=1701858739&width=1920",
  },
  {
    id: 5,
    title: "Dopamine Detox",
    price: "230",
    image:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTCXnzw0M9PExDszkR_cVlrmVt6767rZjzz8vt_PVXIGKeL_TPisMPObrM6j_YLvcKZxa49MCuAaW8-wIF456BUuYTajQPfENfzvjLziN37xmhrfM54XML-gA",
  },
  {
    id: 6,
    title: "The Psychology of Money",
    price: "160",
    image: "https://images.meesho.com/images/products/317604408/lhy6z_1200.jpg",
  },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayBooks() {
  const bookList = document.getElementById("book-list");
  books.forEach((book) => {
    const bookItem = document.createElement("div");
    bookItem.className = "book";
    bookItem.innerHTML = `
          <img src="${book.image}" alt="${book.title}" class="book-image">
          <h3>${book.title}</h3>
          <p>Price: $${book.price}</p>
          <button onclick="addToCart(${book.id})">Add to Cart</button>
        `;
    bookList.appendChild(bookItem);
  });
}

function addToCart(id) {
  const book = books.find((b) => b.id === id);
  const existingBook = cart.find((item) => item.id === id);

  if (existingBook) {
    existingBook.quantity += 1;
  } else {
    cart.push({ ...book, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${book.title} added to cart`);
}

displayBooks();
