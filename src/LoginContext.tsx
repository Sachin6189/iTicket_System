import React, { createContext, useState } from 'react';

interface LoginContextValue {
  user: {
    user_id: number | null;
    user_name: string | null;
  };
  setUser: React.Dispatch<React.SetStateAction<{
    user_id: number | null;
    user_name: string | null;
  }>>;
}

export const LoginContext = createContext<LoginContextValue>({
  user: {
    user_id: null,
    user_name: null,
  },
  setUser: () => {},
});

export const LoginProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ user_id: number | null; user_name: string | null }>({
    user_id: null,
    user_name: null,
  });

  return <LoginContext.Provider value={{ user, setUser }}>{children}</LoginContext.Provider>;
};

