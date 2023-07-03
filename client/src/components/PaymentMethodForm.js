import React, { useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentContext } from "../context/payment";
import UserContext from "../context/user";

function PaymentMethodForm() {
  const {
    showCardInput,
    setShowCardInput,
    createPaymentMethod,
    handleSavePaymentMethod,
    loading,
    setLoading,
    error,
    setError,
  } = useContext(PaymentContext);

  const { user } = useContext(UserContext);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!showCardInput || !stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    try {
      const paymentMethod = await createPaymentMethod(cardElement);
      await handleSavePaymentMethod(paymentMethod);
      setLoading(false);
      setShowCardInput(false);
      cardElement.clear();
    } catch (error) {
      setError(error);
    }
  };

  const cardInputElement = (
    <div className={`mt-4 ${showCardInput ? "" : "hidden"}`}>
      <label
        htmlFor="card-element"
        className="block text-sm font-medium text-secondary mb-2"
      >
        Save Payment Method
      </label>
      {error && error?.message && (
        <div className="mt-2 text-red-600">{error.message}</div>
      )}
      <CardElement
        id="card-element"
        className="border border-gray-400 p-2 rounded w-full h-15"
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <div className="flex justify-start mt-4">
        <button
          disabled={loading}
          onClick={(e) => {
            e.preventDefault();
            setShowCardInput(false);
          }}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-accent hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark mr-2"
        >
          Cancel
        </button>
        <button
          disabled={loading}
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-accent hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark ml-2"
        >
          {loading ? "Saving..." : "Save Payment Method"}
        </button>
      </div>
    </div>
  );

  const addPaymentButton = !showCardInput && (
    <button
      disabled={loading}
      onClick={(e) => {
        e.preventDefault();
        setShowCardInput(true);
      }}
      className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-accent hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark"
    >
      {loading
        ? "Loading..."
        : user && user.payment_method_id
        ? "Replace Payment Method"
        : "Add Payment"}
    </button>
  );

  const formContent = () => {
    return (
      <div>
        <h2 className="text-lg font-bold mb-2 text-secondary">
          {user && user.payment_method_id
            ? "My Payment Methods"
            : "Add your payment method with Stripe and start stocking your fridge!"}
        </h2>
        <p className="text-secondary">
          {user && user.payment_method_id ? "Card ending in ****" : ""}
        </p>
        {addPaymentButton}
        {cardInputElement}
      </div>
    );
  };

  return (
    <div className="bg-primary shadow-lg rounded-md p-6">
      <form onSubmit={handleSubmit}>{formContent()}</form>
    </div>
  );
}

export default PaymentMethodForm;
