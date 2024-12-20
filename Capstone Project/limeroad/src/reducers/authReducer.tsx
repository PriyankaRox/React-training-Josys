interface AuthState {
  isAuthenticated: boolean;
  user: null | { name: string; email: string };
}

type AuthAction =
  | { type: "LOGIN"; payload: { name: string; email: string } }
  | { type: "LOGOUT" };

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isAuthenticated: true, user: action.payload };
    case "LOGOUT":
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};
