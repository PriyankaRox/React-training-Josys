import { jwtDecode } from 'jwt-decode';

export const setToken = (token: string) => {
  sessionStorage.setItem("authToken", token);
};

export const getToken = (): string | null => {
  return sessionStorage.getItem("authToken");
};

export const removeToken = () => {
  sessionStorage.removeItem("authToken");
};

export const isAuthenticated = (): boolean => {
  const token = getToken();
  if (!token) return false;

  try {
    const { exp } = jwtDecode<{ exp: number }>(token);
    if (exp * 1000 < Date.now()) {
      removeToken();
      return false;
    }
    return true;
  } catch (error) {
    removeToken();
    return false;
  }
};
