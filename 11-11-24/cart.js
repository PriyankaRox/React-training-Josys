let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartList.innerHTML = "<p>Your cart is empty.</p>";
  }

  cart.forEach((book, index) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <h3>${book.title}</h3>
      <p>Price: $${book.price}</p>
      <div class="display">
      <button class="btn" onClick="decrementQuantity(${index})">-</button>
      <p>Quantity: ${book.quantity}</p>     
      <button class="btn" onClick="incrementQuantity(${index})">+</button>
      </div>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartList.appendChild(cartItem);
  });

  const clearCartButton = document.createElement("button");
  clearCartButton.innerText = "Clear Cart";
  clearCartButton.onclick = clearCart;
  clearCartButton.classList.add("clear-cart-btn");
  cartList.appendChild(clearCartButton);
  displaySubtotal();
}

function incrementQuantity(index) {
  cart[index].quantity += 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function decrementQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function removeFromCart(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

window.onload = displayCart;

function clearCart() {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function displaySubtotal() {
  const subtotal = cart.reduce(
    (total, book) => total + Number(book.price * book.quantity),
    0
  );
  const subtotalElement = document.getElementById("subtotal");
  if (subtotalElement) {
    subtotalElement.innerText = `Subtotal: $${subtotal.toFixed(2)}`;
  } else {
    console.error("Subtotal element not found in HTML.");
  }
}

displayCart();
