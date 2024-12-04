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
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import SearchResults from './components/SearchResults';
import { CartProvider } from './context/CartContext';
import { withRouter } from './HOC/withRouter';
import Cart from './pages/Cart/Cart';
import ProtectedRoute from './pages/Login/ProtectedRoute';
import Order from './pages/Orders/Order';
import OrderDetails from './pages/Orders/OrderDetails';
import ProductDetails from './pages/Products/ProductDetails';
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
const About = lazy(() => import("./pages/About/About"));
const Loader = lazy(() => import("./pages/Loader/Loader"));
const ProductDisplay = lazy(() => import("./pages/Products/ProductDisplay"));
const ProductCRUD = lazy(() => import("./pages/Products/ProductCRUD"));

// Root Element
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const MainApp: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  // const navigate = useNavigate();

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
    // navigate("/login");
    console.log("logout", localStorage.removeItem("user"));
  };

  // Wrap the Order component
  const OrderWithRouter = withRouter(Order);

  return (
    // <AuthProvider>
    <CartProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-100">
          {isLoggedIn ? (
            <>
              <nav>
                {/* <button
                  onClick={handleLogout}
                  className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                >
                  Logout
                </button> */}
                <Navigate to="/" />
                <div>
                  <Link to="/"></Link>
                  <Link to="/product/crud"></Link>
                  <Link to="/about"></Link>
                  <Link to="/login"></Link>
                  <Link to="/register"></Link>
                  <Link to="/product-display"></Link>
                  {/* User Dashboard component */}
                  <Suspense fallback={<Loader />}>
                    <Routes>
                      <Route path="/" element={<App />} />

                      {/* Protected Routes */}
                      <Route
                        path="/product/crud"
                        element={
                          <ProtectedRoute returnUrl="/" requiredRole="admin">
                            <ProductCRUD />
                          </ProtectedRoute>
                        }
                      />
                      {/* <Route path="/product/crud" element={<ProductCRUD />} /> */}
                      <Route path="/about" element={<About />} />
                      <Route
                        path="/login"
                        element={<Login onLoginSuccess={handleLoginSuccess} />}
                      />

                      <Route
                        path="/register"
                        element={
                          <Register onRegisterSuccess={handleRegisterSuccess} />
                        }
                      />

                      <Route
                        path="/product-display"
                        element={<ProductDisplay />}
                      />
                      <Route
                        path="/product/:id"
                        element={<OrderWithRouter />}
                      />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/order-details" element={<OrderDetails />} />
                      <Route
                        path="/product-details/:id"
                        element={<ProductDetails />}
                      />
                      <Route path="/search" element={<SearchResults />} />
                    </Routes>
                  </Suspense>
                </div>
              </nav>

              {/* Suspense code  */}
            </>
          ) : (
            <div>
              {!isRegistering ? (
                <div>
                  <Login onLoginSuccess={handleLoginSuccess} />
                  <p className=" text-sm text-gray-600 ml-[620px] mt-[-194px] relative z-[1]">
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
                  <p className="text-sm text-gray-600 ml-[588px] mt-[-70px] relative z-[1]">
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
    </CartProvider>
    // </AuthProvider>
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
