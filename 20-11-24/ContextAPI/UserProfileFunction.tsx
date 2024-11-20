import React, { useContext } from "react";
import AuthContextFunction from "./AuthContextFunction";

const UserProfileFunction: React.FC = () => {
  const { user, login, logout } = useContext(AuthContextFunction);

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc" }}>
      {user ? (
        <div>
          <h2>Logged In</h2>
          <h2>Welcome, {user.name}!</h2>
          <button onClick={logout}>Log Out</button>
        </div>
      ) : (
        <div>
          <h2>You are not logged in.</h2>
          <button
            onClick={
              () => login({ id: 1, name: "Max Steve" }) // Simulating a login
            }
          >
            Log In
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfileFunction;
