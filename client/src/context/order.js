import React, { createContext, useState } from "react";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [orderQuantity, setOrderQuantity] = useState(0);

  const addProduct = (product, quantity) => {
    setSelectedProducts([...selectedProducts, { ...product, quantity }]);
    setOrderQuantity(quantity);
  };

  const removeProduct = (product) => {
    setSelectedProducts(
      selectedProducts.filter(
        (selectedProduct) => selectedProduct.id !== product.id
      )
    );
    setOrderQuantity(0);
  };

  const updateQuantity = (product, quantity) => {
    setSelectedProducts(
      selectedProducts.map((selectedProduct) =>
        selectedProduct.id === product.id
          ? { ...selectedProduct, quantity }
          : selectedProduct
      )
    );
    setOrderQuantity(quantity);
  };

  const submitOrder = async () => {
    // Here you would make the POST request
  };

  return (
    <OrderContext.Provider
      value={{
        selectedProducts,
        orderQuantity,
        addProduct,
        removeProduct,
        updateQuantity,
        submitOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
