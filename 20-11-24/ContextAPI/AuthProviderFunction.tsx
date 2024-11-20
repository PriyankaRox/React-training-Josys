import { ReactNode, useState } from "react";
import AuthContextFunction, { User } from "./AuthContextFunction";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProviderFunction: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Method to log in a user
  const login = (newUser: User) => {
    setUser(newUser);
  };

  // Method to log out a user
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContextFunction.Provider value={{ user, login, logout }}>
      {children}
    </AuthContextFunction.Provider>
  );
};

export default AuthProviderFunction;
