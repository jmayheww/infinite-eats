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
      const data = await response.json();
      console.log("data", data);

      const updatedItem = userOrders
        ?.find((order) => order.id === data.order_id)
        ?.order_items.find((item) => item.id === data.id);

      setUserOrders((prev) =>
        prev.map((order) => {
          if (order.id === data.order_id) {
            order.order_items = order.order_items.map((item) =>
              item.id === data.id ? updatedItem : item
            );
          }
          return order;
        })
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
