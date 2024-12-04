import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';

import Login from '../Login';

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  BrowserRouter: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Login Component", () => {
  const onLoginSuccessMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderLoginComponent = () =>
    render(
      <Router>
        <Login onLoginSuccess={onLoginSuccessMock} />
        <ToastContainer />
      </Router>
    );

  test("renders login form", () => {
    renderLoginComponent();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("validates required fields", async () => {
    renderLoginComponent();

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(
      await screen.findByText("Username is required!")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Password is required!")
    ).toBeInTheDocument();
  });

  test("submits form with valid input and displays success message", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        success: true,
        message: "Login successful",
        token: "mocked-token",
      },
    });

    renderLoginComponent();

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(mockedAxios.post).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}/login`,
      { username: "testuser", password: "password123" }
    );

    expect(await screen.findByText("Login successful")).toBeInTheDocument();
    expect(onLoginSuccessMock).toHaveBeenCalled();
  });

  test("displays error for invalid credentials", async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: { data: { message: "Invalid username or password" } },
    });

    renderLoginComponent();

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "wronguser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(
      await screen.findByText("Invalid username or password")
    ).toBeInTheDocument();
  });

  test("handles unexpected API error", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("Network Error"));

    renderLoginComponent();

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(
      await screen.findByText(
        "An error occurred while logging in. Please try again."
      )
    ).toBeInTheDocument();
  });
});
