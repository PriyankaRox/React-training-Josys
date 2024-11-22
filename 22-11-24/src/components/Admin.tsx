import React from 'react';

import {
  Link,
  Outlet,
} from 'react-router-dom';

const Admin: React.FC = () => {
  return (
    <div style={{ border: "2px solid blue", margin: "2px", padding: "20px" }}>
      <h2>This is Admin Component</h2>
      {/* Add navigation for Admin sub-routes */}
      <nav>
        <Link to="home">Admin Home</Link> | <Link to="projects">Projects</Link>{" "}
        | <Link to="customers">Customers</Link>
      </nav>
      <hr />
      {/* Render child components dynamically */}
      <Outlet />
    </div>
  );
};

export default Admin;
