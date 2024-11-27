import React, { useState } from 'react';

const Product: React.FC = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState<number | undefined>();
  const [qty, setQty] = useState<number | undefined>();
  const [totalAmount, setTotalAmount] = useState<number | null>(null);

  const calculateTotal = () => {
    if (price !== undefined && qty !== undefined) {
      setTotalAmount(price * qty);
    }
  };

  return (
    <div>
      <h3>Product Details</h3>
      <div>
        <label>
          Product Name:{" "}
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
          />
        </label>
      </div>
      <div>
        <label>
          Price:{" "}
          <input
            type="number"
            value={price !== undefined ? price : ""}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="Enter price"
          />
        </label>
      </div>
      <div>
        <label>
          Quantity:{" "}
          <input
            type="number"
            value={qty !== undefined ? qty : ""}
            onChange={(e) => setQty(Number(e.target.value))}
            placeholder="Enter quantity"
          />
        </label>
      </div>
      <div>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            calculateTotal();
          }}
        >
          Get Total Amount
        </a>
      </div>
      {totalAmount !== null && (
        <p data-testid="total-amount">Total Amount: {totalAmount}</p>
      )}
    </div>
  );
};

export default Product;
