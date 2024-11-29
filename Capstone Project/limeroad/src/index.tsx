import './index.css';

import React, {
  lazy,
  ReactNode,
  startTransition,
  Suspense,
  useEffect,
  useState,
} from 'react';

import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
} from 'react-router-dom';

import Loader from './pages/Loader/Loader';
import ProductCRUD from './pages/Products/ProductCRUD';
import reportWebVitals from './reportWebVitals';

//error occurs inside the Suspense component, it might crash the application. Adding an Error Boundary for better error handling
interface ErrorBoundaryProps {
  children: ReactNode; // Define children as a prop
}
const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  try {
    return <>{children}</>;
  } catch (error) {
    return <div>An error occurred: {String(error)}</div>;
  }
};

// Lazy-loaded components
const App = lazy(() => import("./App"));
const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));

// Root Element
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const MainApp: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  // Check login status on initial render
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem("user", "loggedIn");
  };

  const handleRegisterSuccess = () => {
    setIsRegistering(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("user");
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
        {isLoggedIn ? (
          <>
            <nav>
              <div>
                <Link to="/"></Link>
                <Link to="/product/crud"></Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            </nav>
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/product/crud" element={<ProductCRUD />} />
                {/* <Route path="/login" /> */}
                {/* element={<Navigate to="/" replace />} */}
                {/* <Route
                  path="/register"
                  element={<Navigate to="/login" replace />}
                /> */}
              </Routes>
            </Suspense>
          </>
        ) : (
          <div>
            {!isRegistering ? (
              <div>
                <Login onLoginSuccess={handleLoginSuccess} />
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
              </div>
            ) : (
              <div>
                <Register onRegisterSuccess={handleRegisterSuccess} />
                <p className="mt-4 text-sm text-gray-600">
                  Already have an account ?{" "}
                  <button
                    className="text-blue-500 underline"
                    onClick={() => setIsLoggedIn(true)}
                  >
                    Login
                  </button>
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </Router>
  );
};

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <MainApp />
    </ErrorBoundary>
  </React.StrictMode>
);

reportWebVitals();
