import React, { createContext, useState, useContext, useEffect } from "react";
import UserContext from "./user";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { userOrders, setUserOrders } = useContext(UserContext);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [errors, setErrors] = useState([]);

  const addProduct = (product, quantity) => {
    setSelectedProducts((prev) => {
      const productInList = prev.find((p) => p.id === product.id);
      if (productInList) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity, selected: true } : p
        );
      }
      return [...prev, { ...product, quantity, selected: true }];
    });
  };

  const removeProduct = (product) => {
    setSelectedProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, selected: false } : p))
    );
  };

  const updateQuantity = (product, quantity) => {
    setSelectedProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, quantity } : p))
    );
  };

  const addUpdateOrderItemsToCheckout = async (currentUser, vendorId) => {
    console.log("vendorId: ", vendorId);
    console.log("currentUser: ", currentUser);
    const userId = currentUser?.id;
    console.log("userId: ", userId);
    setErrors([]);

    const orderItems = selectedProducts?.map((product) => ({
      vendors_product_id: product.id,
      quantity: product.quantity,
      price: product.price,
      name: product.name,
    }));

    const orderData = {
      vendor_id: vendorId,
      status: "pending",
      order_items_attributes: orderItems,
    };

    console.log("orderData: ", orderData);

    try {
      const response = await fetch("/api/orders/create_or_update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: orderData }),
      });

      if (response.ok) {
        const updatedOrders = await response.json();

        setErrors([]);
        setSelectedProducts([]);
        setUserOrders(updatedOrders);
      } else {
        const data = await response.json();
        if (data.errors) {
          setErrors(data.errors);
        }
      }
    } catch (error) {
      // Handle the error
    }
  };

  return (
    <OrderContext.Provider
      value={{
        setUserOrders,
        selectedProducts,
        setSelectedProducts,
        addProduct,
        removeProduct,
        updateQuantity,
        addUpdateOrderItemsToCheckout,
        errors,
        setErrors,
        userOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
