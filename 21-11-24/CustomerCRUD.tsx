import './customerCRUD.css';

import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import CityFilter from './CityFilter';
import {
  createCustomer,
  Customer,
  deleteCustomer,
  getAllCustomers,
  updateCustomer,
} from './services/customerService';
import TopPurchasers from './TopPurchasers';

// json-server --watch db_customer.json --id customerId --port 3200

const CustomerCRUD = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [newCustomer, setNewCustomer] = useState<Customer>({
    customerId: 0,
    name: "",
    city: "",
    contactNumber: "",
    year: new Date().getFullYear(),
    photo: "https://via.placeholder.com/150",
    totalPurchasesPerYear: null,
  });
  const [errors, setErrors] = useState<any>({});
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  // Fetch customers
  useEffect(() => {
    getAllCustomers()
      .then(setCustomers)
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCustomer({
      ...newCustomer,
      [name]: value === "" ? undefined : value,
    });
  };

  // Handle form validation
  const validateCustomer = () => {
    const errors: any = {};
    if (!newCustomer.name) errors.Name = "Name is required";
    if (!newCustomer.city) errors.City = "City is required";
    if (
      !newCustomer.contactNumber ||
      !/^\d{10}$/.test(newCustomer.contactNumber)
    )
      errors.contactNumber = "Valid Contact Number is required";
    if (!newCustomer.year || isNaN(newCustomer.year))
      errors.year = "Year is required";
    if (!newCustomer.photo) errors.photo = "Valid Photo is required";
    if (
      newCustomer.totalPurchasesPerYear == null ||
      newCustomer.totalPurchasesPerYear <= 0
    )
      errors.totalPurchasesPerYear = "Total Purchases should be greater than 0";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle file input change for photo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setNewCustomer({ ...newCustomer, photo: reader.result.toString() });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  //Handle Update& create handler
  const handleCreateOrUpdate = () => {
    if (!validateCustomer()) return;

    if (isUpdateMode) {
      // Update existing customer
      updateCustomer(newCustomer)
        .then((updatedCustomer) => {
          setCustomers(
            customers.map((c) =>
              c.customerId === updatedCustomer.customerId ? updatedCustomer : c
            )
          );
          setNewCustomer({
            customerId: 0,
            name: "",
            city: "",
            contactNumber: "",
            year: new Date().getFullYear(),
            photo: "https://via.placeholder.com/150",
            totalPurchasesPerYear: null,
          });
          setIsUpdateMode(false); // Reset to Create Mode
        })
        .catch((error) => console.error("Error updating customer:", error));
    } else {
      // Create new customer
      createCustomer(newCustomer)
        .then((customer) => {
          setCustomers([...customers, customer]);
          setNewCustomer({
            customerId: 0,
            name: "",
            city: "",
            contactNumber: "",
            year: new Date().getFullYear(),
            photo: "https://via.placeholder.com/150",
            totalPurchasesPerYear: null,
          });
        })
        .catch((error) => console.error("Error creating customer:", error));
    }
  };

  // Handle customer update click
  const handleUpdate = (customer: Customer) => {
    setIsUpdateMode(true);
    if (!customer.customerId) {
      console.error("Invalid customerId");
      return;
    }
    if (customer.customerId) {
      setNewCustomer({
        customerId: customer.customerId,
        name: customer.name,
        city: customer.city,
        contactNumber: customer.contactNumber,
        year: customer.year,
        photo: customer.photo,
        totalPurchasesPerYear: customer.totalPurchasesPerYear,
      });
    }
  };

  // Handle delete customer
  const handleDelete = (customerId: number) => {
    if (window.confirm("Do you want to delete this customer?") === false) {
      return;
    }
    deleteCustomer(customerId)
      .then(() => {
        alert(`Customer-${customerId} was deleted successfully.`);
        setCustomers(customers.filter((c) => c.customerId !== customerId));
      })
      .catch((error) => console.error("Error deleting customer:", error));
  };

  return (
    <div>
      <h2 className="customer-header">Customer CRUD Operations</h2>
      <div className="customer-form-container">
        <h2 className="form-header">
          {/* {newCustomer.customerId === 0
            ? "Create"
            : newCustomer.customerId
            ? "Update"
            : "Create"}{" "}
          Customer */}
          {isUpdateMode ? "Update" : "Create"} Customer
        </h2>
        <form className="customer-form">
          <div className="form-group">
            <label htmlFor="customerId">Customer ID:</label>
            <input
              type="number"
              id="customerId"
              name="customerId"
              value={newCustomer.customerId === 0 ? "" : newCustomer.customerId}
              onChange={handleChange}
              placeholder="Enter Customer ID"
              // readOnly={newCustomer.customerId !== 0}
              readOnly={isUpdateMode}
              className="input-field"
            />
            {errors.customerId && (
              <p className="error-text">{errors.customerId}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newCustomer.name}
              onChange={handleChange}
              placeholder="Enter Customer Name"
              className="input-field"
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={newCustomer.city}
              onChange={handleChange}
              placeholder="Enter Customer City"
              className="input-field"
            />
            {errors.city && <p className="error-text">{errors.city}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="contactNumber">Contact Number:</label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={newCustomer.contactNumber}
              onChange={handleChange}
              placeholder="Enter Customer Number"
              className="input-field"
            />
            {errors.contactNumber && (
              <p className="error-text">{errors.contactNumber}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="year">Year:</label>
            <input
              type="number"
              id="year"
              name="year"
              value={newCustomer.year}
              onChange={handleChange}
              placeholder="Enter Customer Year"
              className="input-field"
            />
            {errors.year && <p className="error-text">{errors.year}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="photo">Photo:</label>
            <input
              type="file"
              id="photo"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="file-input"
            />
            {errors.photo && <p className="error-text">{errors.photo}</p>}
            {newCustomer.photo && (
              <img
                src={newCustomer.photo}
                alt="Customer Preview"
                className="image-preview"
              />
            )}
          </div>

          <div className="form-group">
            <label htmlFor="totalPurchasesPerYear">
              Total Purchases Per Year:
            </label>
            <input
              type="number"
              id="totalPurchasesPerYear"
              name="totalPurchasesPerYear"
              value={newCustomer.totalPurchasesPerYear ?? ""}
              onChange={handleChange}
              placeholder="Enter Customer Total Purchases Per Year"
              className="input-field"
            />
            {errors.totalPurchasesPerYear && (
              <p className="error-text">{errors.totalPurchasesPerYear}</p>
            )}
          </div>

          <button onClick={handleCreateOrUpdate} className="submit-button">
            {/* {newCustomer.customerId === 0
              ? "Create Customer"
              : "Update Customer"} */}{" "}
            {isUpdateMode ? "Update" : "Create"}
          </button>
        </form>
      </div>
      {/* Customer List */}
      <div className="customer-list-container">
        <h2 className="customer-list-header">Customer List</h2>

        <div className="customer-list">
          {customers.map((customer) => (
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
              <div className="customer-card-footer">
                <button
                  onClick={() => handleUpdate(customer)}
                  className="edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(customer.customerId)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <TopPurchasers customers={customers} />
      </div>
      <div>
        <h2>Customer List</h2>
        <CityFilter customers={customers} />
      </div>
    </div>
  );
};

export default CustomerCRUD;
