import { nanoid } from 'nanoid';
import { createContext, useEffect, useState } from 'react';
import { VibeContextType } from '@/types';

const defaults: VibeContextType = {
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  generatedId: nanoid(),
  setGeneratedId: () => {},
};

export const VibeContext = createContext<VibeContextType>(defaults);

const VibeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    localStorage.getItem('user_profile') ? true : false,
  );

  const [generatedId, setGeneratedId] = useState<string | null>(
    localStorage.getItem('generated_id'),
  );

  useEffect(() => {
    const generated_id = localStorage.getItem('generated_id');

    if (!generated_id) {
      localStorage.setItem('generated_id', nanoid());
    }

    setGeneratedId(String(generated_id));
  }, []);

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
