import { nanoid } from 'nanoid';
import { createContext, useEffect } from 'react';
import { VibeContextType } from '@/types';
import { useLocalStorage } from '@/hooks/useLocaleStorage';

const defaults: VibeContextType = {
  isLoggedIn: 'false',
  setIsLoggedIn: () => {},
  generatedId: nanoid(),
  setGeneratedId: () => {},
};

export const VibeContext = createContext<VibeContextType>(defaults);

const VibeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [generatedId, setGeneratedId] = useLocalStorage(
    'generated_id',
    nanoid(),
  );

  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('user_profile', 'false');

  useEffect(() => {
    setGeneratedId(String(generatedId));
  }, [setGeneratedId, generatedId]);

  return (
    <VibeContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        generatedId,
        setGeneratedId,
      }}
    >
      {children}
    </VibeContext.Provider>
  );
};

export { VibeContextProvider };
