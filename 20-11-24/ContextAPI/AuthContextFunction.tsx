import { createContext } from "react";

// Define the type for the user object
export interface User {
  id: number;
  name: string;
}

// Define the type for the context state
export interface AuthContextState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

// Create the context with default values
const AuthContextFunction = createContext<AuthContextState>({
  user: null, // No user is logged in by default
  login: () => {}, // Placeholder login function
  logout: () => {}, // Placeholder logout function
});

export default AuthContextFunction;
