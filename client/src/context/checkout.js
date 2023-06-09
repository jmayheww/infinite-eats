import React, { createContext, useState, useContext, useEffect } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import UserContext from "./user";

export const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const stripe = useStripe();
  const [errors, setErrors] = useState([]);
  const { user, userOrders, setUserOrders, setUserFridgeItems } =
    useContext(UserContext);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    if (userOrders && userOrders.length > 0) {
      let itemCount = 0;
      const pendingOrders = userOrders.filter(
        (order) => order.status === "pending"
      );
      pendingOrders.forEach((order) => {
        itemCount += order.order_items.length;
      });
      setCartItemsCount(itemCount);
    } else {
      setCartItemsCount(0);
    }
  }, [userOrders, user]);

  const updateOrderItem = async (orderItemId, quantity) => {
    const response = await fetch(`/api/order_items/${orderItemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order_item: { quantity } }),
    });

    if (response.ok) {
      setErrors([]);
      const { order, order_item } = await response.json();

      setUserOrders((prevOrders) => {
        const updatedOrders = prevOrders.map((prevOrder) => {
          if (prevOrder.id === order.id) {
            const updatedOrderItems = prevOrder.order_items.map(
              (prevOrderItem) => {
                if (prevOrderItem.id === order_item.id) {
                  return order_item;
                } else {
                  return prevOrderItem;
                }
              }
            );
            return {
              ...prevOrder,
              order_items: updatedOrderItems,
              total_price: order.total_price,
            };
          } else {
            return prevOrder;
          }
        });

        return updatedOrders;
      });

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
      setErrors([]);
    } else {
      const data = await response.json();
      if (data.errors) {
        setErrors(data.errors);
      }
    }
  };

  const createFridgeItems = async (orderItems) => {
    const eligibleItems = orderItems?.map((item) => {
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

      setErrors([]);
      return updatedUser;
    } else {
      const data = await response.json();
      if (data.errors) {
        throw Error(data.errors);
      }
    }
  };

  const processPayment = async (order, user) => {
    setErrors([]);
    try {
      const paymentAmount = order.total_price * 100;

      // Step 1: Initiate the payment process and create a PaymentIntent on the backend
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: paymentAmount,
        }),
      });

      const data = await response.json();

      // Step 2: Confirm the payment with the client secret
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: user.payment_method_id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          await updateOrderStatus(order.id, "completed");

          try {
            const updatedUser = await createFridgeItems(order.order_items);
            setUserFridgeItems(updatedUser?.fridge_items);
          } catch (error) {
            setErrors(
              "There was a problem adding your items to the fridge. Please try again."
            );
            throw error; // throw to stop the function from continuing
          }

          window.alert(
            "Payment succeeded! Your order status has been updated to 'completed' and your items have been added to the fridge."
          );
        }
      }
    } catch (error) {
      setErrors(
        "There was a problem processing your payment. Please confirm your payment method and try again."
      );
    }
  };

  return (
    <CheckoutContext.Provider
      value={{
        updateOrderItem,
        deleteOrderItem,
        deleteOrder,
        errors,
        setErrors,
        processPayment,
        cartItemsCount,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};
