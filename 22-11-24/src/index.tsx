import './index.css';

import React, {
  lazy,
  Suspense,
} from 'react';

import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
} from 'react-router-dom';

import PaginatedList from './components/PaginationList';
import reportWebVitals from './reportWebVitals';

const App = lazy(() => import("./App"));
const About = lazy(() => import("./components/About"));
const Admin = lazy(() => import("./components/Admin"));
const AdminHome = lazy(() => import("./components/AdminHome"));
const Contact = lazy(() => import("./components/Contact"));
const Customers = lazy(() => import("./components/Customers"));
const Depts = lazy(() => import("./components/Depts"));
const Details = lazy(() => import("./components/Details"));
const Emps = lazy(() => import("./components/Emps"));
const Login = lazy(() => import("./components/Login"));
const NotFound = lazy(() => import("./components/NotFound"));
const Projects = lazy(() => import("./components/Projects"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));
// const PaginatedList = lazy(() => import("./components/PaginationList"));

const router = (
  <Router>
    <h3 style={{ textAlign: "center" }}>
      Routing Implementation in React Applications
    </h3>
    <hr />

    <div style={{ textAlign: "center" }}>
      <Link to="/">Home</Link> |<Link to="/Emps">Employees</Link> |
      <Link to="/Depts">Departments</Link> |<Link to="/About">About Us</Link> |
      <Link to="/Contact">Contact Us</Link> |<Link to="/Hello">Invalid</Link> |
      <Link to="/Login">Login</Link> |<Link to="/admin">Admin</Link> |{" "}
      <Link to="/employees">Pagination</Link>
    </div>
    <hr />

    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<App />} />
        {/* Nested route for Admin */}
        <Route path="admin" element={<Admin />}>
          {/* Nested routes inside Admin */}
          <Route path="home" element={<AdminHome />} />
          <Route path="projects" element={<Projects />} />
          <Route path="customers" element={<Customers />} />
          {/* Default route inside Admin */}
          <Route index element={<AdminHome />} />
        </Route>

        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/employees" element={<PaginatedList />} />

        <Route
          path="/Emps"
          element={
            <ProtectedRoute returnUrl="/Emps" requiredRole="admin">
              <Emps />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Depts"
          element={
            <ProtectedRoute returnUrl="/Depts" requiredRole="User">
              <Depts />
            </ProtectedRoute>
          }
        />

        <Route path="/Login" element={<Login />} />
        <Route path="/Details/:id" element={<Details />} />

        {/*  Route for non-matching urls   */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </Router>
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(router);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
