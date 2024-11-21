import './topPurchasers.css';

import React from 'react';

import {
  Customer,
} from './services/customerService'; // Assuming you're importing the Customer interface

interface TopPurchasersProps {
  customers: Customer[];
}

const TopPurchasers: React.FC<TopPurchasersProps> = ({ customers }) => {
  // Sort and get the top 5 purchasers
  const topPurchasers = [...customers]
    .filter(
      (customer) =>
        customer.totalPurchasesPerYear && customer.totalPurchasesPerYear > 0
    )
    .sort(
      (a, b) => (b.totalPurchasesPerYear || 0) - (a.totalPurchasesPerYear || 0)
    )
    .slice(0, 5);

  return (
    <div className="top-purchasers">
      <h2>Top Purchasers</h2>
      <div
        className="cards-container"
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {topPurchasers.map((customer) => (
          <div key={customer.customerId} className="card" style={cardStyle}>
            <img src={customer.photo} alt={customer.name} style={imageStyle} />
            <div className="card-body" style={cardBodyStyle}>
              <h3>{customer.name}</h3>
              <p>{customer.city}</p>
              <p>Total Purchases: ${customer.totalPurchasesPerYear}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Defining the style type explicitly
const cardStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  margin: "10px",
  padding: "10px",
  width: "200px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  textAlign: "center", // Explicitly using 'center' which is a valid value for textAlign
};

const imageStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: "8px",
  marginBottom: "10px",
};

const cardBodyStyle: React.CSSProperties = {
  padding: "10px",
};

export default TopPurchasers;
