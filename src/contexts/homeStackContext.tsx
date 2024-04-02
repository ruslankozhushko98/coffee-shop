import React, {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';

type ContextOptions = {
  selectedOrderId: number | null;
  setSelectedOrderId: (selectedOrderId: number | null) => void;
  isOrderModalOpened: boolean;
  openOrderModal: () => void;
  closeOrderModal: () => void;
};

const HomeStackContext = createContext<ContextOptions | null>(null);

export const HomeStackContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [isOrderModalOpened, setIsOrderModalOpened] = useState<boolean>(false);

  const openOrderModal = (): void => setIsOrderModalOpened(true);

  const closeOrderModal = (): void => setIsOrderModalOpened(false);

  const value = {
    selectedOrderId,
    setSelectedOrderId,
    isOrderModalOpened,
    openOrderModal,
    closeOrderModal,
  };

  return (
    <HomeStackContext.Provider value={value}>
      {children}
    </HomeStackContext.Provider>
  );
};

export const useHomeStackContext = () => {
  const context = useContext(HomeStackContext);

  if (!context) {
    throw new Error(
      'useGlobalContext hook must be used only inside of GlobalContextProvider',
    );
  }

  return context;
};
