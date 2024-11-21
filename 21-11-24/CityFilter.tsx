import './customerCRUD.css';

import React, {
  useEffect,
  useState,
} from 'react';

import {
  Customer,
} from './services/customerService'; // Assuming this type exists

type CityFilterProps = {
  customers: Customer[];
};

const CityFilter: React.FC<CityFilterProps> = ({ customers }) => {
  const [selectedCity, setSelectedCity] = useState<string>("All cities");
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);

  // Extract unique cities from customers
  const cities = Array.from(
    new Set(customers.map((customer) => customer.city))
  ).sort();

  // Add "All cities" option to the cities list
  const allCities = ["All cities", ...cities];

  // Filter customers based on selected city
  useEffect(() => {
    if (selectedCity === "All cities") {
      setFilteredCustomers(customers); // Show all customers if "All cities" is selected
    } else {
      setFilteredCustomers(
        customers.filter((customer) => customer.city === selectedCity)
      );
    }
  }, [selectedCity, customers]);

  // Handle city change
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div className="city-filter-container">
      <h2 className="filter-header">Filter Customers by City</h2>
      <div className="filter-dropdown">
        <label htmlFor="city">Select City:</label>
        <select
          id="city"
          name="city"
          value={selectedCity}
          onChange={handleCityChange}
          className="city-select"
        >
          {allCities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Displaying filtered customers */}
      <div className="customer-list">
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map((customer) => (
            <div key={customer.customerId} className="customer-card">
              <div className="customer-card-header">
                <img
                  src={customer.photo}
                  alt={customer.name}
                  className="customer-photo"
                />
                <div className="customer-info">
                  <h3 className="customer-name">{customer.name}</h3>
                  <p className="customer-city">{customer.city}</p>
                  <p className="customer-contact">
                    Contact: {customer.contactNumber}
                  </p>
                  <p className="customer-year">Year: {customer.year}</p>
                  <p className="customer-purchases">
                    Total Purchases:{" "}
                    <strong>${customer.totalPurchasesPerYear}</strong>
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No customers found for this city.</p>
        )}
      </div>
    </div>
  );
};

export default CityFilter;
