import React, {
  startTransition,
  useState,
} from 'react';

import axios from 'axios';

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
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // const response = await axios.get(
      //   `${BASE_URL}/username=${username}&password=${password}`
      // ); `${BASE_URL}/login`
      console.log("BASE_URL:", BASE_URL);
      const response = await axios.get(
        `http://localhost:5000/login?username=${username}&password=${password}`
      );
      console.log(response.data);
      if (response.data.length > 0) {
        onLoginSuccess();
        alert("Login Scuccessfull!");
      } else {
        setError("Invalid username or password");
        console.log("Login error", error);
        console.log(`Making POST request to: ${BASE_URL}/login`);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred while logging in");
      console.log(`Making POST request to: ${BASE_URL}/login`);
    }
  };
  // bg-[url('https://support.unicommerce.com/wp-content/uploads/2024/05/LM27052024_1.png')] bg-cover bg-center h-64 w-full
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
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
        {isRegistering ? (
          <p className="mt-4 text-sm text-gray-600">
            New here?{" "}
            <button
              className="text-blue-500 underline"
              onClick={
                () => startTransition(() => setIsRegistering(true)) //allows React to manage transitions smoothly and avoids the error.
              }
            >
              Register
            </button>
          </p>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default Login;
