import React, { createContext, useState, useContext } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import UserContext from "./user";

export const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const [errors, setErrors] = useState([]);

  const { setUser, setUserOrders, setUserFridgeItems } =
    useContext(UserContext);
  const stripe = useStripe();

  const updateOrderItem = async (orderItemId, quantity) => {
    const response = await fetch(`/api/order_items/${orderItemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order_item: { quantity } }),
    });

    if (response.ok) {
      const updatedUserOrders = await response.json();
      setUserOrders(updatedUserOrders);
      setErrors([]);
    } else {
      const data = await response.json();
      if (data.errors) {
        setErrors(data.errors);
      }
    }
  };

  const deleteOrderItem = async (orderItemId) => {
    const response = await fetch(`/api/order_items/${orderItemId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      const updatedUserOrders = await response.json();

      setUserOrders(updatedUserOrders);

      console.log("updatedUserOrders: ", updatedUserOrders);

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
      const updatedUserOrders = await response.json();
      console.log("Order successfully deleted!");
      setUserOrders(updatedUserOrders);
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
      const updatedUserOrders = await response.json();
      setUserOrders(updatedUserOrders);
    } else {
      const data = await response.json();
      if (data.errors) {
        setErrors(data.errors);
      }
    }
  };

  const createFridgeItems = async (orderItems) => {
    const eligibleItems = orderItems?.map((item) => {
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
      const updatedUser = await response.json();
      console.log("updatedUser: ", updatedUser);
      setErrors([]);
      return updatedUser; // return the updated user
    } else {
      const data = await response.json();
      if (data.errors) {
        setErrors(data.errors);
        console.log("errors: ", errors);
        // Display an error notification to the user
        window.alert("Error creating fridge items: " + data.errors.join(", "));
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
        const updatedUser = await createFridgeItems(order.order_items);
        setUserFridgeItems(updatedUser?.fridge_items);
        window.alert(
          "Payment succeeded! Your order status has been updated to 'completed' and your items have been added to the fridge."
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
