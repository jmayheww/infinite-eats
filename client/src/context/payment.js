import React, { createContext, useState, useContext } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import UserContext from "./user";

export const PaymentContext = createContext();

export function PaymentProvider({ children }) {
  const { setUser } = useContext(UserContext); // Access setUser from UserContext
  const stripe = useStripe();
  const elements = useElements();
  const [showCardInput, setShowCardInput] = useState(false);
  const [loading, setLoading] = useState(false);

  const createPaymentMethod = (cardElement) => {
    if (!stripe || !elements) return Promise.reject("Stripe is not available");

    setLoading(true);

    return stripe
      .createPaymentMethod({
        type: "card",
        card: cardElement,
      })
      .then((result) => {
        setLoading(false);

        if (result.error) {
          console.log("[error]", result.error);
          return Promise.reject(result.error);
        }
        return result.paymentMethod;
      })
      .catch((error) => {
        setLoading(false);
        console.log("[error]", error);
        return Promise.reject(error);
      });
  };

  const handleSavePaymentMethod = (paymentMethod) => {
    setLoading(true);

    return fetch("api/users/save_payment_method", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pm_id: paymentMethod.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        console.log("[data]", data);
        console.log("[PaymentMethod]", paymentMethod);
        setUser(data); // Update the user state
      })
      .catch((error) => {
        setLoading(false);
        console.log("[error]", error);
      });
  };

  return (
    <PaymentContext.Provider
      value={{
        showCardInput,
        setShowCardInput,
        createPaymentMethod,
        handleSavePaymentMethod,
        loading,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
}
