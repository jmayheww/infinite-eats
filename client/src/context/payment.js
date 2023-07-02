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
  const [error, setError] = useState(null);

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
          return Promise.reject(result.error);
        }
        return result.paymentMethod;
      })
      .catch((error) => {
        setLoading(false);

        return Promise.reject(error);
      });
  };

  const handleSavePaymentMethod = async (paymentMethod) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("api/users/save_payment_method", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pm_id: paymentMethod.id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      setLoading(false);
      setUser(data);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  return (
    <PaymentContext.Provider
      value={{
        showCardInput,
        setShowCardInput,
        createPaymentMethod,
        handleSavePaymentMethod,
        loading,
        error,
        setError,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
}
