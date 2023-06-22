import React, { createContext, useState } from "react";

const ModalContext = createContext();

export default ModalContext;

export const ModalProvider = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <ModalContext.Provider value={{ modalOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
