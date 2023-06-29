import React, { createContext, useState, useContext } from "react";
import { OrderContext } from "./order";

export const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const [errors, setErrors] = useState([]);
  const { userOrders, setUserOrders } = useContext(OrderContext);
  console.log("userOrders: ", userOrders);

  const updateOrderItem = async (orderItemId, quantity) => {
    const response = await fetch(`/api/order_items/${orderItemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }),
    });

    if (response.ok) {
      const updatedOrderItem = await response.json();
      console.log("data", updatedOrderItem);

      setUserOrders((prevOrders) =>
        prevOrders.map((order) => ({
          ...order,
          order_items: order.order_items.map((item) =>
            item.id === updatedOrderItem.id ? updatedOrderItem : item
          ),
        }))
      );

      setErrors([]);
    } else {
      const data = await response.json();
      if (data.errors) {
        setErrors(data.errors);
      }
    }
  };

  return (
    <CheckoutContext.Provider value={{ updateOrderItem, errors }}>
      {children}
    </CheckoutContext.Provider>
  );
};
