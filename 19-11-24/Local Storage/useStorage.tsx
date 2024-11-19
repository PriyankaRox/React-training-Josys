import { useState } from "react";

// Custom hook to manage localStorage operations
function useStorage<T>(key: string) {
  // Helper function to get data from localStorage
  const getFromLocalStorage = () => {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      return JSON.parse(storedData) as T;
    }
    return null;
  };

  // Initialize state from localStorage
  const [storedValue, setStoredValue] = useState<T | null>(getFromLocalStorage);

  const add = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
    setStoredValue(value);
  };

  const remove = () => {
    localStorage.removeItem(key);
    setStoredValue(null);
  };

  const get = () => storedValue;

  return {
    add,
    remove,
    get,
  };
}

export default useStorage;
