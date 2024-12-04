import 'react-toastify/dist/ReactToastify.min.css';

import React from 'react';

import axios from 'axios';
import bcrypt from 'bcryptjs';
import {
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  Flip,
  toast,
  ToastContainer,
} from 'react-toastify';

const BASE_URL: string | undefined = process.env.REACT_APP_API_URL;

if (!BASE_URL) {
  throw new Error("API URL is not defined in the environment variables.");
}

interface RegisterProps {
  onRegisterSuccess: () => void;
}

type FormValues = {
  role: string;
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
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("Registering user with data:", data);
    // Validate that the role is selected
    if (!data.role) {
      console.error("Role is required");
      return;
    }
    try {
      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);

      // Replacing the plain-text password with the hashed password
      const { confirm_password, ...payload } = {
        ...data,
        password: hashedPassword,
      };
      await axios
        .post(`${BASE_URL}/register`, payload)
        .then(function (response) {
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
          reset();
          onRegisterSuccess();
          setTimeout(() => {
            // history.push("/login");
            navigate("/login");
          }, 3000);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (err) {
      console.error("Error during registration:", err);
      console.log(`Making POST request to: ${BASE_URL}/register`);
    }
  };

  // const handleLoginClick = (e: React.MouseEvent) => {
  //   e.preventDefault(); // Prevent form submission when clicking on Register
  //   navigate("/login"); // Navigate to the register page
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 bg-[url('https://img.freepik.com/premium-vector/background-with-colorful-shopping-bags-vector-illustration-sale-discount-concept_653240-59.jpg')] bg-cover bg-center h-full w-full">
      <div className="max-w-md w-full bg-white p-4 m-10 shadow-lg rounded-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-3">
          Register
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mb-6">
          {/* Role */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="role"
            >
              Role
            </label>
            <select
              id="role"
              className={`w-full p-2 border rounded-lg ${
                errors.role ? "border-red-500" : "border-gray-300"
              }`}
              {...register("role", { required: "Role is required" })}
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            {errors.role && (
              <span className="text-red-500 text-sm">
                {errors.role.message}
              </span>
            )}
          </div>

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
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message:
                    "Invalid phone number. Must start with 6, 7, 8, or 9 and should be 10 digits.",
                },
              })}
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
                  value: 8,
                  message: "Minimum length is 8 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
                  message:
                    "Must include uppercase, lowercase, number, and special character",
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
          {/* <p className="mt-4 text-sm text-gray-600">
            Existing User?{" "}
            <button
              className="text-blue-500 underline"
              onClick={handleLoginClick}
            >
              Login
            </button>
            
          </p> */}
        </form>
      </div>
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

export default Registration;
