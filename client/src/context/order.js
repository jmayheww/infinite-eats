import React, { createContext, useState, useContext } from "react";
import UserContext from "./user";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { userOrders, setUserOrders } = useContext(UserContext);
  const [errors, setErrors] = useState([]);

  // selected products bridges the gap between the vendor and order context.
  // it is a list of products that the user has selected to add to their order
  const [selectedProducts, setSelectedProducts] = useState([]);

  //  logic to add, remove, and update quantity of products in the selected products list
  const manipulateProduct = (product, selected, quantity) => {
    setSelectedProducts((prev) => {
      const productInList = prev.find((p) => p.id === product.id);
      if (productInList) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity, selected } : p
        );
      } else {
        return [...prev, { ...product, quantity, selected }];
      }
    });
  };

  // adds a product to the selected products list
  const addProduct = (product, quantity) =>
    manipulateProduct(product, true, quantity);

  // removes a product from the selected products list
  const removeProduct = (product) =>
    manipulateProduct(product, false, product.quantity);

  // updates the quantity of a product in the selected products list and keeps it selected
  const updateQuantity = (product, quantity, isSelected) =>
    manipulateProduct(product, isSelected, quantity);

  // adds selected products to the user's order, or updates the quantity of products in the user's order

  const addUpdateOrderItemsToCheckout = async (vendorId) => {
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
      console.log(error);
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
