import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import ProductCard from "../pages/Products/ProductCard";
import Footer from "./Footer";
import Header from "./Header";

const SearchResults: React.FC = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";

  useEffect(() => {
    if (query) {
      fetchSearchResults(query);
    }
  }, [query]);

  const fetchSearchResults = async (query: string) => {
    setLoading(true);
    const products = await fetch(
      `http://localhost:5000/products?q=${query}`
    ).then((res) => res.json());
    setSearchResults(products);
    setLoading(false);
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">
          Search Results for "{query}"
        </h2>

        {loading ? (
          <div>Loading...</div>
        ) : searchResults.length === 0 ? (
          <div>No results found for "{query}"</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SearchResults;
