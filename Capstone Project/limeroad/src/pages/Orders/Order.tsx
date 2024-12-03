import React, { Component } from 'react';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import ConfirmationModal from './ConfirmationModal';

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

interface OrderProps {
  navigate: any;
  location: any;
  params: any;
}

interface OrderState {
  product: Product | null;
  orderPlaced: boolean;
  isModalOpen: boolean;
}

class Order extends Component<OrderProps, OrderState> {
  constructor(props: OrderProps) {
    super(props);
    this.state = {
      product: this.props.location.state?.product || null,
      orderPlaced: false,
      isModalOpen: false,
    };
  }

  handleOrderPlacement = () => {
    this.setState({ isModalOpen: false, orderPlaced: true }, () => {
      alert("Order placed successfully!");
      this.props.navigate("/");
    });
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { product, isModalOpen, orderPlaced } = this.state;

    if (!product) {
      return <div className="text-center py-10">Product not found!</div>;
    }

    return (
      <div>
        <Header />
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex justify-center">
              <img
                src={product.image}
                alt={product.product_name}
                className="w-96 h-auto rounded-lg shadow-md"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{product.product_name}</h1>
              <p className="text-sm text-gray-500 mt-2">
                {product.description}
              </p>
              <p className="text-gray-600 mt-4">
                <span className="font-semibold">Category:</span>{" "}
                {product.category_name}
              </p>
              <div className="flex items-center mt-4">
                <span className="text-pink-600 text-2xl font-bold">
                  ₹{product.price}
                </span>
                <span className="line-through text-gray-400 ml-4">
                  ₹{product.mrp}
                </span>
                <span className="ml-4 text-green-500 text-sm">
                  ({product.discount}% off)
                </span>
              </div>
              <div className="mt-6">
                <h2 className="text-lg font-semibold">Order & Payment</h2>
                <button
                  onClick={this.openModal}
                  className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                >
                  Place Order
                </button>
                {orderPlaced && (
                  <div className="text-center mt-4 text-green-600">
                    Order placed successfully!
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Confirmation Modal */}
          <ConfirmationModal
            isOpen={isModalOpen}
            onConfirm={this.handleOrderPlacement}
            onCancel={this.closeModal}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Order;
