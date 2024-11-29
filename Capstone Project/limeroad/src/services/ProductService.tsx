import axios from 'axios';

const BASE_URL: string | undefined = process.env.REACT_APP_API_URL;

if (!BASE_URL) {
  throw new Error("API URL is not defined in the environment variables.");
}

export interface Product {
  id: number;
  category_id: number;
  category_name: string;
  product_name: string;
  rating: number | null;
  image: string;
  size: string;
  quantity: number | null;
  mrp: number | null;
  price: number | null;
  discount: number | null;
  description: string;
  product_details: string;
  seller_details: string;
}

// Read All Products

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>(
      `${BASE_URL}/products?_sort=id`
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching products:", error);
    throw error;
  }
};

//Get a Products by ID

export const getProductsById = async (id: number): Promise<Product> => {
  //check whether customerId has to be passed....
  try {
    const response = await axios.get<Product>(`${BASE_URL}/products${id}`);
    return response.data;
  } catch (error) {
    console.log("Error fetching product id:", error);
    throw error;
  }
};

//Create new Product

export const createProduct = async (product: Product): Promise<Product> => {
  try {
    const response = await axios.post<Product>(`${BASE_URL}/products`, product);
    return response.data;
  } catch (error) {
    console.log("Error creating product:", error);
    throw error;
  }
};

//Update Product

export const updateProduct = async (product: Product): Promise<Product> => {
  try {
    const response = await axios.put<Product>(
      `${BASE_URL}/products/${product.id}`,
      product
    );
    return response.data;
  } catch (error) {
    console.log("Error updating product:", error);
    throw error;
  }
};

//Delete Product

export const deleteProduct = async (id: number): Promise<void> => {
  try {
    const response = await axios.delete(`${BASE_URL}/products/${id}`);
    console.log(response);
  } catch (error) {
    console.log(`Error deleting product ${id}:`, error);
    throw error;
  }
};

export const customerService = {
  getAllProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
};
