import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';

import ProductDetails from './Product';

describe("ProductDetails Component", () => {
  test("renders without crashing", () => {
    render(<ProductDetails />);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "Product Details"
    );
  });

  test("allows the user to input product name, price, and quantity", () => {
    render(<ProductDetails />);
    const productNameInput = screen.getByPlaceholderText("Enter product name");
    const priceInput = screen.getByPlaceholderText("Enter price");
    const qtyInput = screen.getByPlaceholderText("Enter quantity");

    fireEvent.change(productNameInput, { target: { value: "Sample Product" } });
    fireEvent.change(priceInput, { target: { value: "10" } });
    fireEvent.change(qtyInput, { target: { value: "5" } });

    expect((productNameInput as HTMLInputElement).value).toBe("Sample Product");
    expect((priceInput as HTMLInputElement).value).toBe("10");
    expect((qtyInput as HTMLInputElement).value).toBe("5");
  });

  test("calculates and displays the total amount on link click", () => {
    render(<ProductDetails />);
    const priceInput = screen.getByPlaceholderText("Enter price");
    const qtyInput = screen.getByPlaceholderText("Enter quantity");
    const link = screen.getByRole("link", { name: /get total amount/i });

    fireEvent.change(priceInput, { target: { value: "20" } });
    fireEvent.change(qtyInput, { target: { value: "3" } });
    fireEvent.click(link);

    expect(screen.getByTestId("total-amount")).toHaveTextContent(
      "Total Amount: 60"
    );
  });

  test("does not calculate total if price or quantity is missing", () => {
    render(<ProductDetails />);
    const link = screen.getByRole("link", { name: /get total amount/i });

    fireEvent.click(link);

    expect(screen.queryByTestId("total-amount")).not.toBeInTheDocument();
  });
});
