import React, { createContext, useState, useContext } from 'react';

// Створіть контекст
const ModalContext = createContext();

// Провайдер контексту
export const ModalProvider = ({ children }) => {
  const [createIsOpen, setCreateIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openCreate = () => setCreateIsOpen(true);
  const closeCreate = () => setCreateIsOpen(false);

  const openEdit = (product) => {
    setSelectedProduct(product);
    setEditIsOpen(true);
  };
  const closeEdit = () => {
    setSelectedProduct(null);
    setEditIsOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        createIsOpen,
        openCreate,
        closeCreate,
        editIsOpen,
        openEdit,
        closeEdit,
        selectedProduct,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

// Хук для використання контексту
export const useModal = () => useContext(ModalContext);