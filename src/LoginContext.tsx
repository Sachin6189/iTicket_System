import React, { createContext, useState } from 'react';

interface User {
  user_id: number | null;
  user_name: string | null;
  user_email: string | null;
  location: string | null;
  comp_name: string | null;
}

interface LoginContextValue {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const LoginContext = createContext<LoginContextValue>({
  user: {
    user_id: null,
    user_name: null,
    user_email: null,
    location: null,
    comp_name: null,
  },
  setUser: () => {},
});

export const LoginProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({
    user_id: null,
    user_name: null,
    user_email: null,
    location: null,
    comp_name: null,
  });

  return <LoginContext.Provider value={{ user, setUser }}>{children}</LoginContext.Provider>;
};