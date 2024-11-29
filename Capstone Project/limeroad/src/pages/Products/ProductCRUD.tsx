import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Pagination from '../../components/Pagination';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  Product,
  updateProduct,
} from '../../services/ProductService';

const ProductCRUD: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    category_id: 0,
    category_name: "",
    product_name: "",
    rating: null,
    image: "https://via.placeholder.com/150",
    size: "",
    quantity: null,
    mrp: null,
    price: null,
    discount: null,
    description: "",
    product_details: "",
    seller_details: "",
  });
  const [errors, setErrors] = useState<any>({});
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (page: number) => {
    console.log("Selected Page:", page);
    setCurrentPage(page);
  };

  // Get the products for the current page
  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Fetch products
  useEffect(() => {
    getAllProducts()
      .then((response) => {
        if (Array.isArray(response)) {
          setProducts(response);
          console.log("pro", products);
        } else {
          console.error("API did not return an array:", response);
          setProducts([]);
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value === "" ? undefined : value });
  };

  // Handle file input change for image
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewProduct({ ...newProduct, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form validation
  const validateProduct = () => {
    const errors: any = {};
    if (!newProduct.category_name)
      errors.category_name = "Category name is required";
    if (!newProduct.product_name)
      errors.product_name = "Product name is required";
    if (!newProduct.rating) errors.rating = "Rating must be between 0 and 5";
    if (!newProduct.image) errors.image = "Image is required";
    if (!newProduct.size) errors.size = "Size is required";
    if (!newProduct.quantity) errors.quantity = "Quantity is required";
    if (!newProduct.mrp) errors.mrp = "MRP is required";
    if (!newProduct.price) errors.price = "Price is required";
    if (!newProduct.discount) errors.discount = "Discount is required";
    if (!newProduct.description) errors.description = "Description is required";
    if (!newProduct.product_details)
      errors.product_details = "Product details is required";
    if (!newProduct.seller_details)
      errors.seller_details = "Seller details is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateOrUpdate = async () => {
    if (!validateProduct()) return;

    if (isUpdateMode) {
      // Update existing customer
      updateProduct(newProduct)
        .then((updatedProduct) => {
          setProducts(
            products.map((p) =>
              p.id === updatedProduct.id ? updatedProduct : p
            )
          );
          setNewProduct({
            id: 0,
            category_id: 0,
            category_name: "",
            product_name: "",
            rating: null,
            image: "https://via.placeholder.com/150",
            size: "",
            quantity: null,
            mrp: null,
            price: null,
            discount: null,
            description: "",
            product_details: "",
            seller_details: "",
          });
          setIsUpdateMode(false); // Reset to Create Mode
        })
        .catch((error) => console.error("Error updating customer:", error));
    } else {
      // Create new customer
      createProduct(newProduct)
        .then((product) => {
          setProducts([...products, product]);
          setNewProduct({
            id: 0,
            category_id: 0,
            category_name: "",
            product_name: "",
            rating: null,
            image: "https://via.placeholder.com/150",
            size: "",
            quantity: null,
            mrp: null,
            price: null,
            discount: null,
            description: "",
            product_details: "",
            seller_details: "",
          });
        })
        .catch((error) => console.error("Error creating customer:", error));
    }
  };

  const handleUpdate = (product: Product) => {
    if (window.confirm("Do you want to update this product?")) {
      setNewProduct(product);
      setIsUpdateMode(true);
      if (!product.id) {
        console.error("Invalid product_id");
        return;
      }
      if (product.id) {
        setNewProduct({
          id: product.id,
          category_id: product.category_id,
          category_name: product.category_name,
          product_name: product.product_name,
          rating: product.rating,
          image: product.image,
          size: product.size,
          quantity: product.quantity,
          mrp: product.mrp,
          price: product.price,
          discount: product.discount,
          description: product.description,
          product_details: product.product_details,
          seller_details: product.seller_details,
        });
      }
    }
  };

  const handleDelete = (productId: number) => {
    if (window.confirm("Do you want to delete this product?") === false) {
      return;
    } else {
      deleteProduct(productId)
        .then(() => {
          alert(`Product-${productId} was deleted successfully.`);
          setProducts(products.filter((p) => p.id !== productId));
        })
        .catch((error) => console.error("Error deleting product:", error));
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-6">
          Limeroad Products
        </h1>

        {/* Flex container for the form and product list */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Form Section */}
          <div className="flex-1 dark:bg-gray-800 text-sm font-normal text-gray-500 dark:text-gray-400 shadow-lg rounded p-6">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">
              {isUpdateMode ? "Update Product" : "Create Product"}
            </h2>
            <form className="grid grid-cols-2 gap-4 ">
              <div>
                <label className="block text-sm font-medium">
                  Category Name
                </label>
                <input
                  type="text"
                  name="category_name"
                  value={newProduct.category_name}
                  onChange={handleChange}
                  placeholder="Enter Category Name"
                  className="w-full p-2 border rounded dark:bg-gray-300"
                />
                {errors.category_name && (
                  <p className="text-red-500 text-sm">{errors.category_name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Product Name
                </label>
                <input
                  type="text"
                  name="product_name"
                  value={newProduct.product_name}
                  onChange={handleChange}
                  placeholder="Enter Product Name"
                  className="w-full p-2 border rounded dark:bg-gray-300"
                />
                {errors.product_name && (
                  <p className="text-red-500 text-sm">{errors.product_name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium">Rating</label>
                <input
                  type="number"
                  name="rating"
                  value={newProduct.rating ?? ""}
                  onChange={handleChange}
                  placeholder="Enter Rating"
                  className="w-full p-2 border rounded dark:bg-gray-300"
                />
                {errors.rating && (
                  <p className="text-red-500 text-sm">{errors.rating}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium">Size</label>
                <input
                  type="text"
                  name="size"
                  value={newProduct.size}
                  onChange={handleChange}
                  placeholder="Enter size"
                  className="w-full p-2 border rounded dark:bg-gray-300"
                />
                {errors.size && (
                  <p className="text-red-500 text-sm">{errors.size}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={newProduct.quantity ?? ""}
                  onChange={handleChange}
                  placeholder="Enter quantity"
                  className="w-full p-2 border rounded dark:bg-gray-300"
                />
                {errors.quantity && (
                  <p className="text-red-500 text-sm">{errors.quantity}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium">MRP</label>
                <input
                  type="number"
                  name="mrp"
                  value={newProduct.mrp ?? ""}
                  onChange={handleChange}
                  placeholder="Enter MRP"
                  className="w-full p-2 border rounded dark:bg-gray-300"
                />
                {errors.mrp && (
                  <p className="text-red-500 text-sm">{errors.mrp}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium">Price</label>
                <input
                  type="number"
                  name="price"
                  value={newProduct.price ?? ""}
                  onChange={handleChange}
                  placeholder="Enter price"
                  className="w-full p-2 border rounded dark:bg-gray-300"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium">Discount</label>
                <input
                  type="number"
                  name="discount"
                  value={newProduct.discount ?? ""}
                  onChange={handleChange}
                  placeholder="Enter Discount"
                  className="w-full p-2 border rounded dark:bg-gray-300"
                />
                {errors.discount && (
                  <p className="text-red-500 text-sm">{errors.discount}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium">Description</label>
                <input
                  type="text"
                  name="description"
                  value={newProduct.description ?? ""}
                  onChange={handleChange}
                  placeholder="Enter desccription"
                  className="w-full p-2 border rounded dark:bg-gray-300"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">{errors.description}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Product Details
                </label>
                <input
                  type="text"
                  name="product_details"
                  value={newProduct.product_details ?? ""}
                  onChange={handleChange}
                  placeholder="Enter size"
                  className="w-full p-2 border rounded dark:bg-gray-300"
                />
                {errors.product_details && (
                  <p className="text-red-500 text-sm">
                    {errors.product_details}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Seller Details
                </label>
                <input
                  type="text"
                  name="seller_details"
                  value={newProduct.seller_details ?? ""}
                  onChange={handleChange}
                  placeholder="Enter size"
                  className="w-full p-2 border rounded dark:bg-gray-300"
                />
                {errors.seller_details && (
                  <p className="text-red-500 text-sm">
                    {errors.seller_details}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Product Image
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="block w-full p-2 border rounded dark:bg-gray-300"
                />
                {newProduct.image && (
                  <img
                    src={newProduct.image}
                    alt="Preview"
                    className="mt-2 w-32 h-32 rounded"
                  />
                )}
              </div>
              <button
                type="button"
                onClick={handleCreateOrUpdate}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
                {isUpdateMode ? "Update Product" : "Create Product"}
              </button>
            </form>
          </div>

          {/* Product List Section */}
          <div className="flex-1">
            {Array.isArray(products) &&
            currentProducts.length > 0 &&
            products.length > 0 ? (
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <caption className="p-5 text-xl font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                    Our products
                    <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                      Browse a list of Limeroad products designed to help you
                      work and play, stay organized, get answers, keep in touch,
                      grow your business, and more.
                    </p>
                  </caption>
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Image
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Product Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Size
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Discount
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentProducts.map((product) => (
                      <tr
                        key={product.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <img
                            src={product.image}
                            alt={product.product_name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        </th>
                        <td className="px-6 py-4">{product.category_name}</td>
                        <td className="px-6 py-4">{product.product_name}</td>
                        <td className="px-6 py-4">{product.quantity}</td>
                        <td className="px-6 py-4">{product.size}</td>
                        <td className="px-6 py-4">{product.price}</td>
                        <td className="px-6 py-4">{product.discount}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleUpdate(product)}
                              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Pagination Component */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
                <br />
              </div>
            ) : (
              <p>No products available</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductCRUD;
