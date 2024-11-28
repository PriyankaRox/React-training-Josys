import { authReducer } from '../authReducer';

type AuthState = {
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
};

type AuthAction =
  | { type: "LOGIN"; payload: { name: string; email: string } }
  | { type: "LOGOUT" };

describe("authReducer component", () => {
  // 1. Testing LOGIN action
  test("should handle LOGIN action", () => {
    const initialState: AuthState = { isAuthenticated: false, user: null };
    const action: AuthAction = {
      type: "LOGIN",
      payload: { name: "John Doe", email: "john@example.com" },
    };
    const newState: AuthState = authReducer(initialState, action);
    expect(newState).toEqual({
      isAuthenticated: true,
      user: { name: "John Doe", email: "john@example.com" },
    });
  });

  test("should handle LOGOUT action", () => {
    // 2. Testing LOGOUT action
    const initialState: AuthState = {
      isAuthenticated: true,
      user: { name: "John Doe", email: "john@example.com" },
    };
    const action: AuthAction = { type: "LOGOUT" };
    const newState = authReducer(initialState, action);
    expect(newState).toEqual({ isAuthenticated: false, user: null });
  });
});
