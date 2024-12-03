import React from "react";

import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const BASE_URL: string | undefined = process.env.REACT_APP_API_URL;

if (!BASE_URL) {
  throw new Error("API URL is not defined in the environment variables.");
}

interface RegisterProps {
  onRegisterSuccess: () => void;
}

type FormValues = {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
};

const Registration: React.FC<RegisterProps> = ({ onRegisterSuccess }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("Registering user with data:", data);
    try {
      await axios.post("http://localhost:5000/register", data);
      onRegisterSuccess();
      navigate("/login");
    } catch (err) {
      console.error("Error during registration:", err);
      console.log(`Making POST request to: ${BASE_URL}/register`);
    }
  };

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission when clicking on Register
    navigate("/login"); // Navigate to the register page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 bg-[url('https://img.freepik.com/premium-vector/background-with-colorful-shopping-bags-vector-illustration-sale-discount-concept_653240-59.jpg')] bg-cover bg-center h-full w-full">
      <div className="max-w-md w-full bg-white p-4 shadow-lg rounded-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-3">
          Register
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          {/* Username */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              className={`w-full p-2 border rounded-lg ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <span className="text-red-500 text-sm">
                {errors.username.message}
              </span>
            )}
          </div>
          <div>
            {/* First Name */}
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="first_name"
              >
                First Name
              </label>
              <input
                id="first_name"
                type="text"
                className={`w-full p-2 border rounded-lg ${
                  errors.first_name ? "border-red-500" : "border-gray-300"
                }`}
                {...register("first_name", {
                  required: "First name is required",
                })}
              />
              {errors.first_name && (
                <span className="text-red-500 text-sm">
                  {errors.first_name.message}
                </span>
              )}
            </div>

            {/* Last Name */}
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="last_name"
              >
                Last Name
              </label>
              <input
                id="last_name"
                type="text"
                className={`w-full p-2 border rounded-lg ${
                  errors.last_name ? "border-red-500" : "border-gray-300"
                }`}
                {...register("last_name", {
                  required: "Last name is required",
                })}
              />
              {errors.last_name && (
                <span className="text-red-500 text-sm">
                  {errors.last_name.message}
                </span>
              )}
            </div>
          </div>
          {/* Phone */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              id="phone"
              type="text"
              className={`w-full p-2 border rounded-lg ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              {...register("phone", { required: "Phone number is required" })}
            />
            {errors.phone && (
              <span className="text-red-500 text-sm">
                {errors.phone.message}
              </span>
            )}
          </div>

          {/* Address */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <input
              id="address"
              type="text"
              className={`w-full p-2 border rounded-lg ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
              {...register("address", { required: "Address is required" })}
            />
            {errors.address && (
              <span className="text-red-500 text-sm">
                {errors.address.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className={`w-full p-2 border rounded-lg ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className={`w-full p-2 border rounded-lg ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="confirm_password"
            >
              Confirm Password
            </label>
            <input
              id="confirm_password"
              type="password"
              className={`w-full p-2 border rounded-lg ${
                errors.confirm_password ? "border-red-500" : "border-gray-300"
              }`}
              {...register("confirm_password", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
            {errors.confirm_password && (
              <span className="text-red-500 text-sm">
                {errors.confirm_password.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Register
          </button>
          <p className="mt-4 text-sm text-gray-600">
            Existing User?{" "}
            <button
              className="text-blue-500 underline"
              onClick={handleLoginClick}
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registration;
