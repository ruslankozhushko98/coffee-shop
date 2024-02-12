import React, {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';

import { User } from 'modules/auth/models';

type ContextOptions = {
  user: User | null;
  setUser(user: User | null): void;
};

const GlobalContext = createContext<ContextOptions | null>(null);

export const GlobalContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const value = {
    user,
    setUser,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error(
      'useGlobalContext hook must be used only inside of GlobalContextProvider',
    );
  }

  return context;
};
