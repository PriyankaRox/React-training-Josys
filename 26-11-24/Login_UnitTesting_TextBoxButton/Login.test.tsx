import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';

import Login from './Login';

describe("Login Component", () => {
  // 1. renders the component without crashing
  test("renders the component without crashing", () => {
    const { container } = render(<Login />);
    let inputElements = container.querySelectorAll("input");
    expect(inputElements.length).toBe(3);
  });

  // 2. Testing input elements --- user ID field initially empty
  test("user ID textbox should initially be empty", () => {
    const { container } = render(<Login />);
    let textElement = container.querySelector<HTMLInputElement>("#t1");
    expect(textElement?.value).toBe("");
  });

  // 3. Testing input elements --- set value to textbox
  test("should set the correct value to the user ID textbox", () => {
    const { container } = render(<Login />);
    let textElement = container.querySelector<HTMLInputElement>("#t1");
    fireEvent.change(textElement!, { target: { value: "Narasimha" } });
    expect(textElement?.value).toBe("Narasimha");
  });

  // 4. Check error message if user ID is not supplied
  test("should display an error if user ID is not supplied", () => {
    render(<Login />);
    const loginButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(loginButton);
    expect(screen.getByText("User ID is required.")).toBeInTheDocument();
  });

  // 5. Check error message if password is not supplied
  test("should display an error if password is not supplied", () => {
    render(<Login />);
    const loginButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(loginButton);
    expect(screen.getByText("Password is required.")).toBeInTheDocument();
  });

  // 6. Valid login credentials should display a success message
  test("should display a valid result message for correct credentials", () => {
    render(<Login />);
    const uidElement = screen.getByPlaceholderText("User ID");
    const pwdElement = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(uidElement, { target: { value: "admin" } });
    fireEvent.change(pwdElement, { target: { value: "admin123" } });
    fireEvent.click(loginButton);

    expect(screen.getByText("Welcome to Admin")).toBeInTheDocument();
  });

  // 7. Invalid login credentials should display an error message
  test("should display an invalid message for wrong credentials", () => {
    render(<Login />);
    const uidElement = screen.getByPlaceholderText("User ID");
    const pwdElement = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(uidElement, { target: { value: "wronguser" } });
    fireEvent.change(pwdElement, { target: { value: "wrongpass" } });
    fireEvent.click(loginButton);

    expect(screen.getByText("Invalid User ID or Password")).toBeInTheDocument();
  });

  // 8. Check if SignUp hyperlink exists
  test("should display the SignUp hyperlink", () => {
    render(<Login />);
    const signUpLink = screen.getByRole("link", { name: /signup/i });
    expect(signUpLink).toBeInTheDocument();
    expect(signUpLink).toHaveAttribute("href", "/signup");
  });
});
