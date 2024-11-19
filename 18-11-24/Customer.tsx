// Create a react component to display customer details with below url:

// 		https://www.w3schools.com/angular/customers.php

// 		a.  In page load it should display all customers
// 		b.  Provide drop-down that shows Country names
// 		c.  Data should update if the user change the country

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./customer.css";

interface CustomerDetails {
  id: number;
  Name: string;
  City: string;
  Country: string;
}

const Customer: React.FC = () => {
  const [data, setData] = useState<CustomerDetails[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [filteredData, setFilteredData] = useState<CustomerDetails[]>([]);

  useEffect(() => {
    const URL = "https://www.w3schools.com/angular/customers.php";
    axios.get(URL).then((resData) => {
      const customers = resData.data.records;
      setData(customers);
      setFilteredData(customers);

      const myCountries = Array.from(
        new Set<string>(
          customers.map((customer: CustomerDetails) => customer.Country)
        )
      );
      setCountries(myCountries);
    });
  }, []);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = e.target.value;
    setSelectedCountry(country);

    const updatedData =
      country === ""
        ? data
        : data.filter((customer) => customer.Country === country);
    setFilteredData(updatedData);
  };

  return (
    <div className="container">
      <h2>Customer Details</h2>
      <div className="drop-down">
        <label htmlFor="country-select">Filter by Country:</label>
        <select
          id="country-select"
          value={selectedCountry}
          onChange={handleCountryChange}
        >
          <option value="">All Countries</option>
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.Name}</td>
              <td>{item.City}</td>
              <td>{item.Country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customer;
