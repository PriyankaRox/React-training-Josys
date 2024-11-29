import React, {
  useEffect,
  useState,
} from 'react';

import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("user");
  };
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold text-gray-900">
        <span className="italic">LimeRoad</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex space-x-6 text-sm font-medium text-gray-700">
        <a href="/women" className="hover:text-black">
          WOMEN
        </a>
        <a href="/men" className="hover:text-black">
          MEN
        </a>
        <a href="/kids" className="hover:text-black">
          KIDS
        </a>
        <a href="/home" className="hover:text-black">
          HOME
        </a>
        <a href="/offers" className="text-red-500 hover:text-red-700">
          OFFERS
        </a>
        <a href="/vmart" className="text-red-500 hover:text-red-700">
          VMART
        </a>
        <a href="/product/crud" className="hover:text-black">
          Admin
        </a>
      </nav>

      {/* Action Icons */}
      <div className="flex items-center space-x-6">
        {/* Search Icon */}
        <div className="flex items-center space-x-1 cursor-pointer">
          <span className="material-icons">search</span>
          <span className="text-sm font-medium text-gray-700">SEARCH</span>
        </div>

        {/* Cart Icon */}
        <div className="relative flex items-center space-x-1 cursor-pointer">
          <span className="material-icons">shopping_cart</span>
          <span className="text-sm font-medium text-gray-700">CART</span>
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">
            2
          </span>
        </div>

        {/* Profile Icon */}

        <div className="relative group">
          {/* Profile Icon and Label */}
          <div className="flex items-center space-x-1 cursor-pointer">
            <span className="material-icons text-gray-700">account_circle</span>
            <span className="text-sm font-medium text-gray-700">PROFILE</span>
          </div>

          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-10 hidden group-hover:block">
            <div className="p-4 text-gray-700">
              <p className="font-medium">Welcome!</p>
              <p className="text-sm">To view account details</p>
            </div>
            <div className="border-t border-gray-200">
              <ul className="py-2">
                <li>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/return-replacement"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Return Replacement
                  </Link>
                </li>
                <li>
                  <Link
                    to="/lr-credits"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    LR Credits
                  </Link>
                </li>
                <li>
                  <Link
                    to="/customer-support"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Customer Support
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq-help"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    FAQ & Help
                  </Link>
                </li>
              </ul>
              <button
                onClick={() => handleLogout} // Replace with your logout logic
                className="w-full bg-red-500 px-4 py-2 text-white text-sm rounded hover:bg-red-600"
              >
                Logout
              </button>
              <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200">
                <span className="text-sm text-gray-700">हिन्दी</span>
                <button className="px-4 py-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600">
                  Change
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex items-center space-x-1 cursor-pointer">
          <span className="material-icons">account_circle</span>
          <span className="text-sm font-medium text-gray-700">PROFILE</span>
        </div> */}
      </div>
    </header>
  );
};

export default Header;
