import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-8 border-t border-gray-300">
      <div className="container mx-auto px-6 md:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">About Us</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>
              <a href="/about" className="hover:text-gray-800">
                Our Story
              </a>
            </li>
            <li>
              <a href="/team" className="hover:text-gray-800">
                Team
              </a>
            </li>
            <li>
              <a href="/careers" className="hover:text-gray-800">
                Careers
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-gray-800">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Support</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>
              <a href="/faq" className="hover:text-gray-800">
                FAQ
              </a>
            </li>
            <li>
              <a href="/help" className="hover:text-gray-800">
                Help Center
              </a>
            </li>
            <li>
              <a href="/return" className="hover:text-gray-800">
                Return Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-gray-800">
                Terms of Use
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Services</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>
              <a href="/orders" className="hover:text-gray-800">
                Orders
              </a>
            </li>
            <li>
              <a href="/cart" className="hover:text-gray-800">
                Shopping Cart
              </a>
            </li>
            <li>
              <a href="/gift" className="hover:text-gray-800">
                Gift Cards
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-gray-800">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Stay Connected
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Follow us on social media
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="https://www.facebook.com/LimeRoadForMen/"
              className="text-gray-600 hover:text-gray-800"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://x.com/limeroadonline?lang=en"
              className="text-gray-600 hover:text-gray-800"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://www.instagram.com/limeroad/?hl=en"
              className="text-gray-600 hover:text-gray-800"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.linkedin.com/company/limeroadcom/"
              className="text-gray-600 hover:text-gray-800"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-300 mt-8 pt-6 text-center text-sm text-gray-600">
        <p>Copyright © 2024 LimeRoad. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
