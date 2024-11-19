import { createContext } from "react";

export interface UserInfo {
  id: number;
  name: string;
  email: string;
}

// Declare and export the context
export const contextObjs = createContext<UserInfo | null>(null);
