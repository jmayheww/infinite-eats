import React, { createContext, useState, useContext } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import UserContext from "./user";

export const PaymentContext = createContext();

export function PaymentProvider({ children }) {
  const stripe = useStripe();
  const elements = useElements();
  const { user, setUser } = useContext(UserContext);
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
          throw result.error;
        }

        if (!result.paymentMethod) {
          throw new Error("No paymentMethod returned from Stripe");
        }

        return result.paymentMethod;
      })
      .catch((error) => {
        setLoading(false);
        throw error;
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
      setUser({ ...user, payment_method_id: paymentMethod.id });
      setLoading(false);
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
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
}
