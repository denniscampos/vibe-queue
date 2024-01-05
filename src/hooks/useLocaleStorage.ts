import { useState } from 'react';

export function useLocalStorage(
  key: string,
  initialValue: string,
): [string, (value: string) => void] {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      return window.localStorage.getItem(key) || initialValue;
    } catch (error) {
      console.error({ error });
      return initialValue;
    }
  });

  const setValue = (value: string) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, value);
    } catch (error) {
      console.error({ error });
    }
  };

  return [storedValue, setValue];
}
