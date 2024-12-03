import React, { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
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

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((response) => {
        console.log(response.data);
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
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
    navigate("/cart");
  };

  const handleBuyNow = () => {
    if (!product) {
      alert("Product not found!");
      return;
    }
    alert("Proceed to Buy Now!");
    navigate(`/product/${product?.id}`, { state: { product } });
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!product)
    return <div className="text-center py-10">Product not found!</div>;

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image Section */}
          <img
            src={product.image}
            alt={product.product_name}
            className="w-auto h-80 rounded-lg mx-40"
          />

          {/* Details Section */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.product_name}</h1>
            <p className="text-gray-500 mb-4">{product.description}</p>

            <div className="flex items-center mb-4">
              <span className="text-lg font-bold text-pink-600">
                ₹{product.price}
              </span>
              <span className="line-through ml-2 text-gray-500">
                ₹{product.mrp}
              </span>
              <span className="ml-4 text-green-600">
                {product.discount}% off
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              <strong>Details:</strong> {product.product_details}
            </p>

            <p className="text-sm text-gray-600 mb-6">
              <strong>Seller:</strong> {product.seller_details}
            </p>

            {/* Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
