import React from "react";

import { useNavigate } from "react-router-dom";

import { useCart } from "../../context/CartContext";

interface Product {
  id: number;
  category_id: number;
  category_name: string;
  subcategory: string;
  product_name: string;
  image: string;
  rating: number;
  size: number;
  quantity: number;
  mrp: number;
  price: number;
  discount: number;
  description: string;
  product_details: string;
  seller_details: string;
}

interface CardProps {
  product: Product;
}

const ProductCard: React.FC<CardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleBuyNow = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent the parent div's onClick from being triggered
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const handleAddToCart = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent the parent div's onClick from being triggered
    if (!product) return;
    addToCart({
      id: product.id,
      name: product.product_name,
      mrp: product.mrp,
      price: product.price,
      image: product.image,
      quantity: product.quantity,
    });
    alert(`${product.product_name} has been added to the cart!`);
  };

  if (!product) {
    return <div className="text-center py-10">Product not found!</div>;
  }

  return (
    <div
      className="border rounded-lg shadow-md overflow-hidden cursor-pointer"
      onClick={() => navigate(`/product-details/${product.id}`)}
    >
      <img
        src={product.image}
        alt={product.product_name}
        className="w-full h-66 object-cover"
      />
      <div className="p-4">
        <h2 className="font-semibold text-lg">{product.product_name}</h2>
        <p className="text-sm text-gray-500">
          {product.category_name} - {product.subcategory}{" "}
          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
            {product.rating}★
          </span>
        </p>

        <div className="flex flex-row items-center space-x-4 mt-3 text-lg">
          <span className="font-bold text-pink-600">₹{product.price}</span>
          <span className="line-through  text-gray-400">₹{product.mrp}</span>
          <span className=" text-green-600 ml-2">{product.discount}% off</span>
        </div>
        <div className="flex align-middle items-center mt-2 space-x-2">
          <button
            type="button"
            onClick={handleAddToCart}
            className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-3 py-2.5"
          >
            Add to cart
          </button>

          <button
            type="button"
            onClick={handleBuyNow}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-3.5 h-3.5 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 21"
            >
              <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
            </svg>
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
