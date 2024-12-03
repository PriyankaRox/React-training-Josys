import React, { useEffect, useState } from "react";

import axios from "axios";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ProductCard from "./ProductCard";

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

const ProductDisplay: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  // States for filtering
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null
  );

  useEffect(() => {
    // Fetch data using Axios
    axios
      .get("http://localhost:5000/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  // Filter logic
  useEffect(() => {
    let filtered = products;

    if (selectedBrand) {
      filtered = filtered.filter(
        (product) => product.seller_details === selectedBrand
      );
    }

    if (selectedSubcategory) {
      filtered = filtered.filter(
        (product) => product.subcategory === selectedSubcategory
      );
    }
    setFilteredProducts(filtered);
  }, [selectedBrand, selectedSubcategory, products]);

  // Extract unique brands and subcategories
  const brands = Array.from(
    new Set(products.map((product) => product.seller_details))
  );
  const subcategories = Array.from(
    new Set(products.map((product) => product.subcategory))
  );

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div>
      <Header />
      <div className="flex ">
        {/* Sidebar */}
        <div className="w-1/6 m-2 p-4 border-r border rounded-lg shadow-md overflow-hidden bg-white ">
          <h2 className="text-lg font-semibold mb-4">Filter By</h2>

          {/* Brand Filter */}
          <div className="mb-6">
            <h3 className="text-md font-bold mb-2">Brands</h3>
            <ul>
              {brands.map((brand, index) => (
                <li
                  key={index}
                  onClick={() => setSelectedBrand(brand)}
                  className={`cursor-pointer text-sm py-1 ${
                    selectedBrand === brand ? "text-pink-600 font-semibold" : ""
                  }`}
                >
                  {brand}
                </li>
              ))}
            </ul>
          </div>

          {/* Subcategory Filter */}
          <div>
            <h3 className="text-md font-bold mb-2">Subcategories</h3>
            <ul>
              {subcategories.map((subcategory, index) => (
                <li
                  key={index}
                  onClick={() => setSelectedSubcategory(subcategory)}
                  className={`cursor-pointer text-sm py-1 ${
                    selectedSubcategory === subcategory
                      ? "text-pink-600 font-semibold"
                      : ""
                  }`}
                >
                  {subcategory}
                </li>
              ))}
            </ul>
          </div>

          {/* Clear Filters */}
          <button
            onClick={() => {
              setSelectedBrand(null);
              setSelectedSubcategory(null);
            }}
            className="mt-4 text-sm text-blue-500 underline"
          >
            Clear Filters
          </button>
        </div>
        {/* Main Content */}
        <div className="w-4/5 p-4">
          <h1 className="text-2xl font-body mb-6">A LOOK OF GLAM!</h1>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">No products found.</div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDisplay;
