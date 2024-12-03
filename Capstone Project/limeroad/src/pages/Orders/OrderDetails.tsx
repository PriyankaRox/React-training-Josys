import React, { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import Footer from "../../components/Footer";
import Header from "../../components/Header";

const OrderDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialOrderDetails = location.state?.orderDetails || [];
  const [orderDetails, setOrderDetails] = useState(initialOrderDetails);

  const handleCancelItem = (itemId: number) => {
    const updatedOrderDetails = orderDetails.filter(
      (item: any) => item.id !== itemId
    );

    setOrderDetails(updatedOrderDetails);

    if (updatedOrderDetails.length === 0) {
      alert("All items canceled. Returning to home.");
      navigate("/");
    }
  };

  const handleCancelAll = () => {
    alert("Order canceled successfully!");
    navigate("/");
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Order Details</h1>
        {orderDetails.length === 0 ? (
          <p>Your order is empty!</p>
        ) : (
          orderDetails.map((item: any) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded"
              />
              <div>
                <h2 className="text-lg font-bold">{item.name}</h2>
                <p>₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <button
                onClick={() => handleCancelItem(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Cancel Item
              </button>
            </div>
          ))
        )}
        {orderDetails.length > 0 && (
          <div className="flex justify-end mt-6">
            <button
              onClick={handleCancelAll}
              className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600"
            >
              Cancel Entire Order
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default OrderDetails;
