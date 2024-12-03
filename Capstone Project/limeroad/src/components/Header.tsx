import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    console.log("logout", isLoggedIn, localStorage.removeItem("user"));
    navigate("/login");
  };

  useEffect(() => {
    console.log("Login state changed:", isLoggedIn);
  }, [isLoggedIn]);

  const addCart = () => {
    navigate(`/cart`);
  };

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${searchQuery}`); // Navigate to search results
    setSearchQuery(""); // Clear the search query
    setIsSearchOpen(false); // Close the search input
  };

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold text-gray-900">
        <span className="italic">
          <a href="/" className="text-lime-400 font-logo">
            LimeRoad
          </a>
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex space-x-6 text-sm font-medium text-gray-700">
        <a href="/product-display" className="hover:text-black">
          WOMEN
        </a>
        <a href="/product-display" className="hover:text-black">
          MEN
        </a>
        <a href="/product-display" className="hover:text-black">
          KIDS
        </a>
        <a href="/" className="hover:text-black">
          HOME
        </a>
        <a href="/product-display" className="text-red-500 hover:text-red-700">
          OFFERS
        </a>
        <a href="/product-display" className="text-red-500 hover:text-red-700">
          VMART
        </a>
        <a href="/product/crud" className="hover:text-black">
          Admin
        </a>
      </nav>

      {/* Action Icons */}
      <div className="flex items-center space-x-6">
        {/* Search Icon */}
        <div
          className="flex items-center space-x-1 cursor-pointer "
          onClick={handleSearchClick}
        >
          <span className="material-icons">search</span>
          <span className="text-sm font-medium text-gray-700">SEARCH</span>
        </div>

        {/* Search Input */}
        {isSearchOpen && (
          <form onSubmit={handleSearchSubmit} className="flex space-x-2 ml-4">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search for products..."
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Search
            </button>
          </form>
        )}

        {/* Cart Icon */}
        <div className="relative flex items-center space-x-1 cursor-pointer">
          <span className="material-icons">shopping_cart</span>
          <button
            onClick={addCart}
            className="text-sm font-medium text-gray-700"
          >
            CART
          </button>
          {/* <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">
            2
          </span> */}
        </div>

        {/* Profile Icon */}
        <div className="flex items-center space-x-6">
          {/* Profile Icon and Dropdown */}
          <div className="relative group">
            <button
              className="flex items-center space-x-1 cursor-pointer"
              type="button"
            >
              <span className="material-icons text-gray-700">
                account_circle
              </span>
              <span className="text-sm font-medium text-gray-700">PROFILE</span>
            </button>

            {/* Dropdown menu */}
            <div className="z-10 absolute -right-5 hidden group-hover:block bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-white">
              <div className="p-4 text-gray-700">
                <p className="font-medium">Welcome!</p>
                <p className="text-sm">To view account details</p>
              </div>
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-700"
                aria-labelledby="dropdownHoverButton"
              >
                <li>
                  <a
                    href="/login"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Login
                  </a>
                </li>
                <li>
                  <a
                    href="/order-details"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    My Orders
                  </a>
                </li>
                <li>
                  <a
                    href="/return-replacement"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Return Replacement
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleLogout} // Replace with your logout logic
                    className="w-100 bg-red-500 m-3 px-4 py-2 text-white text-sm rounded hover:bg-red-600"
                  >
                    Sign out
                  </button>
                </li>
                <li>
                  <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200">
                    <span className="text-sm text-gray-700">हिन्दी</span>
                    <button className="px-4 py-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600">
                      Change
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
