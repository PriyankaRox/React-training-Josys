import React, { useState } from "react";

import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

// import { useAuth } from "src/context/AuthContext";

const BASE_URL: string | undefined = process.env.REACT_APP_API_URL;

if (!BASE_URL) {
  throw new Error("API URL is not defined in the environment variables.");
}

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  // const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("BASE_URL:", BASE_URL);
      const queryString = location.search;
      let returnUrl: string | null = new URLSearchParams(queryString).get(
        "returnUrl"
      );
      if (!returnUrl) returnUrl = "/";

      const response = await axios.get(
        `http://localhost:5000/login?username=${username}&password=${password}`
      );
      console.log(response.data);

      if (response.data.length > 0) {
        const user = response.data[0]; // Assuming the API response includes user details
        const token = "ASJDFJF87ADF8745LK4598SAD7FAJSDF45JSDLFKAS";
        sessionStorage.setItem("AUTH_TOKEN", token);

        if (user.role === "admin") {
          sessionStorage.setItem("USER_ROLE", "admin");
        } else {
          sessionStorage.setItem("USER_ROLE", "user");
        }
        onLoginSuccess();

        navigate(returnUrl);
      } else {
        setError("Invalid username or password");
        console.log("Login error", error);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred while logging in");
    }
  };

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission when clicking on Register
    navigate("/register"); // Navigate to the register page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-[url('https://img.freepik.com/premium-vector/background-with-colorful-shopping-bags-vector-illustration-sale-discount-concept_653240-59.jpg')] bg-cover bg-center h-64 w-full">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Login
        </button>
        {/* {!isRegistering ? ( */}
        <p className="mt-4 text-sm text-gray-600">
          New here?{" "}
          <button
            className="text-blue-500 underline"
            onClick={handleRegisterClick}
          >
            Register
          </button>
        </p>
        {/* ) : (
        ""
      )} */}
      </form>
    </div>
  );
};

export default Login;
