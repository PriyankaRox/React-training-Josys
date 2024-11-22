import React from 'react';

import { Outlet } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h3>Welcome to SPA using React JS</h3>
        <img
          src="/Images/Banner.jpg"
          width="90%"
          height="250"
          alt="Alternate text"
        />
      </div>

      <hr />
      {/* Nested routes will render here */}
      <Outlet />
    </>
  );
};
export default App;
