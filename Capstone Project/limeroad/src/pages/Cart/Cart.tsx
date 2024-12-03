import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useCart } from "../../context/CartContext";

const Cart: React.FC = () => {
  const { cart, removeFromCart, addToCart, clearCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Calculate subtotal
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Calculate total discount
  const totalDiscount = cart.reduce(
    (acc, item) => acc + (item.mrp - item.price) * item.quantity,
    0
  );

  // Increment quantity
  const incrementQuantity = (item: (typeof cart)[0]) => {
    addToCart({ ...item, quantity: 1 });
  };

  // Decrement quantity
  const decrementQuantity = (item: (typeof cart)[0]) => {
    if (item.quantity > 1) {
      addToCart({ ...item, quantity: -1 });
    } else {
      removeFromCart(item.id);
    }
  };

  //To handle order
  const handleOrderNow = () => {
    setShowModal(true);
  };

  const confirmOrder = () => {
    setShowModal(false);
    clearCart(); // Clear the cart
    const orderDetails = [...cart]; // Save the current cart details
    alert("Order placed successfully!");
    navigate("/order-details", { state: { orderDetails } });
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty!</p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded"
                />
                <div className="flex-1 px-4">
                  <h2 className="text-lg font-bold">{item.name}</h2>
                  <p>
                    ₹{item.price} x {item.quantity}
                  </p>
                  <p className="text-sm text-gray-500">
                    Discount: ₹{(item.mrp - item.price) * item.quantity}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <button
                      onClick={() => decrementQuantity(item)}
                      className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                    >
                      -
                    </button>
                    <span className="px-3 py-1">{item.quantity}</span>
                    <button
                      onClick={() => incrementQuantity(item)}
                      className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-bold mb-2">Summary</h2>
              <p className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{subtotal}</span>
              </p>
              <p className="flex justify-between text-green-600">
                <span>Total Discount:</span>
                <span>-₹{totalDiscount}</span>
              </p>
              <hr className="my-2" />
              <p className="flex justify-between font-bold">
                <span>Grand Total:</span>
                <span>₹{subtotal}</span>
              </p>
              <button
                className="w-40 ml-[66em] bg-blue-600 text-white py-2 mt-4 rounded hover:bg-blue-700"
                onClick={handleOrderNow}
              >
                Order Now
              </button>
            </div>
          </>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Confirm Your Order</h2>
            <p className="mb-4">Are you sure you want to place this order?</p>
            <div className="flex space-x-4">
              <button
                onClick={confirmOrder}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Yes
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Cart;
