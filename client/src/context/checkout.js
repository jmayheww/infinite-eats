import React, { createContext, useState, useContext } from "react";
import { OrderContext } from "./order";

export const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const [errors, setErrors] = useState([]);
  const { userOrders, setUserOrders } = useContext(OrderContext);

  const calculateTotalPrice = (orderItems) => {
    return orderItems.reduce(
      (total, item) => total + Number(item.price) * item.quantity,
      0
    );
  };

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
        prevOrders.map((order) => {
          if (order.id === updatedOrderItem.order_id) {
            const updatedOrderItems = order.order_items.map((item) =>
              item.id === updatedOrderItem.id ? updatedOrderItem : item
            );
            const updatedTotalPrice = calculateTotalPrice(updatedOrderItems);

            return {
              ...order,
              total_price: updatedTotalPrice,
              order_items: updatedOrderItems,
            };
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

  const deleteOrderItem = async (orderItemId) => {
    const itemToDelete = userOrders.find((order) =>
      order.order_items.some((item) => item.id === orderItemId)
    );

    console.log("itemToDelete: ", itemToDelete);
    const response = await fetch(`/api/order_items/${orderItemId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      const deletedOrderItem = await response.json();
      console.log("deleted", deletedOrderItem);

      setUserOrders((prevOrders) =>
        prevOrders.map((order) => {
          if (order.id === itemToDelete.id) {
            const updatedOrderItems = order.order_items.filter(
              (item) => item.id !== orderItemId
            );
            const updatedTotalPrice = calculateTotalPrice(updatedOrderItems);

            return {
              ...order,
              total_price: updatedTotalPrice,
              order_items: updatedOrderItems,
            };
          }
          return order;
        })
      );

      console.log("updatedUserOrders: ", userOrders);

      setErrors([]);
    } else {
      const data = await response.json();
      if (data.errors) {
        setErrors(data.errors);
      }
    }
  };

  return (
    <CheckoutContext.Provider
      value={{ updateOrderItem, deleteOrderItem, errors }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};
