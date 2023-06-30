import React, { createContext, useState, useContext } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { OrderContext } from "./order";
import UserContext from "./user";

export const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const [errors, setErrors] = useState([]);
  const { userOrders, setUserOrders } = useContext(OrderContext);
  const { setUser } = useContext(UserContext);
  const stripe = useStripe();

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

  const deleteOrder = async (orderId) => {
    const response = await fetch(`/api/orders/${orderId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setUserOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      );
    } else {
      const data = await response.json();
      if (data.errors) {
        setErrors(data.errors);
      }
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    const response = await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (response.ok) {
      const updatedOrder = await response.json();
      setUserOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === orderId ? updatedOrder : order))
      );
    } else {
      const data = await response.json();
      if (data.errors) {
        setErrors(data.errors);
      }
    }
  };

  const createFridgeItems = async (order) => {
    console.log("order: ", order);
    const eligibleItems = order?.map((item) => {
      console.log("item: ", item.vendors_product_id);
      return {
        name: item.name,
        quantity: item.quantity,
        vendors_product_id: item.vendors_product_id,
      };
    });

    const response = await fetch(`/api/fridge_items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fridge_items: eligibleItems }),
    });

    if (response.ok) {
      const newFridgeItems = await response.json();
      console.log("newFridgeItems: ", newFridgeItems);

      setErrors([]);
      setUser((p) => ({
        ...p,
        fridge_items: [...p.fridge_items, ...newFridgeItems],
      }));
    } else {
      const data = await response.json();
      if (data.errors) {
        setErrors(data.errors);
        console.log("errors: ", errors);
      }
    }
  };

  const processPayment = async (order, user) => {
    // You may want to disable the button until the request finishes
    // Convert order total price to the smallest currency unit (e.g., cents)
    const paymentAmount = order.total_price * 100;

    // Step 1: Initiate the payment process and create a PaymentIntent on the backend
    const response = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: paymentAmount,
        // Add any other necessary data
      }),
    });

    const data = await response.json();
    console.log("data: ", data);

    // Step 2: Confirm the payment with the client secret
    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: user.payment_method_id,
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
      setErrors([result.error.message]);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        console.log("Payment succeeded!");
        await updateOrderStatus(order.id, "completed");
        await createFridgeItems(order.order_items);
        window.alert(
          "Payment succeeded! Your order status has been updated to 'completed'."
        );
      }
    }
  };

  return (
    <CheckoutContext.Provider
      value={{
        updateOrderItem,
        deleteOrderItem,
        deleteOrder,
        errors,
        processPayment,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};
