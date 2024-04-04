import React, {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';

type ContextOptions = {
  isLanguageChanging: boolean;
  setIsLanguageChanging: (isLanguageChanging: boolean) => void;
};

const GlobalContext = createContext<ContextOptions | null>(null);

export const GlobalContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLanguageChanging, setIsLanguageChanging] = useState<boolean>(false);

  const value = {
    isLanguageChanging,
    setIsLanguageChanging,
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
