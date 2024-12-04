import 'react-toastify/dist/ReactToastify.min.css';

import React, { useState } from 'react';

import axios from 'axios';
import { useForm } from 'react-hook-form';
import {
  useLocation,
  useNavigate,
} from 'react-router-dom';
import {
  Flip,
  toast,
  ToastContainer,
} from 'react-toastify';

import { setToken } from '../../utils/auth';

// import { useAuth } from "src/context/AuthContext";

const BASE_URL: string | undefined = process.env.REACT_APP_API_URL;

if (!BASE_URL) {
  throw new Error("API URL is not defined in the environment variables.");
}

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  // const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const login = async (data: any) => {
    let params = {
      username: data.username,
      password: data.password,
    };

    try {
      console.log("BASE_URL:", BASE_URL);

      const queryString = location.search;
      let returnUrl: string | null = new URLSearchParams(queryString).get(
        "returnUrl"
      );
      if (!returnUrl) returnUrl = "/";

      // API call to login
      let response = await axios.post(`${BASE_URL}/login`, params);
      setToken(data.token);
      navigate("/");
      console.log("Login params:", params);
      // IF EMAIL ALREADY EXISTS
      if (response.data.success === false) {
        toast.error(response.data.error, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: 0,
          toastId: "my_toast",
        });
      } else {
        console.log(response.data);
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: 0,
          toastId: "my_toast",
        });

        localStorage.setItem("auth", response.data.token);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }

      console.log("Response data:", response);
      console.log("Response token:", response.data.token);

      // Validate response
      if (response.data) {
        const user = response.data; // Ensure the API returns a `user` object
        let token = "ASJDFJF87ADF8745LK4598SAD7FAJSDF45JSDLFKAS";
        // let token = response.data.token;
        sessionStorage.setItem("AUTH_TOKEN", token);

        // Save token and role in sessionStorage
        sessionStorage.setItem("AUTH_TOKEN", "admin-auth-token"); // Save token if provided
        sessionStorage.setItem("USER_ROLE", user.role || "user"); // Save role, default to "user"
        // navigate("/");
        onLoginSuccess();
        navigate(returnUrl);
      } else {
        // Handle invalid credentials or missing data
        setError(response.data?.message || "Invalid username or password");
      }
      if (!response.data.user || !response.data.token) {
        setError("Invalid login response. Please try again.");
      }
    } catch (err: any) {
      console.error("Login error:", err);

      // Display backend error message if available
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred while logging in. Please try again.");
      }
    }
  };

  // const handleRegisterClick = (e: React.MouseEvent) => {
  //   e.preventDefault(); // Prevent form submission when clicking on Register
  //   navigate("/register"); // Navigate to the register page
  // };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-[url('https://img.freepik.com/premium-vector/background-with-colorful-shopping-bags-vector-illustration-sale-discount-concept_653240-59.jpg')] bg-cover bg-center h-64 w-full">
      <form
        autoComplete="off"
        onSubmit={handleSubmit(login)}
        className="w-full max-w-sm bg-white rounded-lg shadow-lg p-8"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            {...register("username", { required: "Username is required!" })}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required!",
            })}
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
        {/* <p className="mt-4 text-sm text-gray-600">
          New here?{" "}
          <button
            className="text-blue-500 underline"
            onClick={handleRegisterClick}
          >
            Register
          </button>
         
        </p> */}
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        limit={1}
        transition={Flip}
      />
    </div>
  );
};

export default Login;
