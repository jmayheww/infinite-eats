import React, { useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentContext } from "../context/payment";
import UserContext from "../context/auth";

function PaymentMethodForm() {
  const {
    showCardInput,
    setShowCardInput,
    createPaymentMethod,
    handleSavePaymentMethod,
    loading,
  } = useContext(PaymentContext);

  const { user } = useContext(UserContext);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!showCardInput || !stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    createPaymentMethod(cardElement)
      .then((paymentMethod) => {
        handleSavePaymentMethod(paymentMethod);
      })
      .catch((error) => {
        console.log("[error]", error);
      });
  };

  const cardInputElement = (
    <div className={`mt-4 ${showCardInput ? "" : "hidden"}`}>
      <label
        htmlFor="card-element"
        className="block text-gray-700 font-bold mb-2"
      >
        Save Payment Method
      </label>
      <CardElement
        id="card-element"
        className="border border-gray-400 p-2 rounded w-full h-15"
      />
      <div className="flex justify-start mt-4">
        <button
          onClick={(e) => {
            e.preventDefault();
            setShowCardInput(false);
          }}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ml-2"
        >
          Save
        </button>
      </div>
    </div>
  );

  const addPaymentButton = !showCardInput && (
    <button
      onClick={(e) => {
        e.preventDefault();
        setShowCardInput(true);
      }}
      className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      {loading
        ? "Loading..."
        : user.payment_method_id
        ? "Replace Payment Method"
        : "Add Payment"}
    </button>
  );

  const formContent = user.payment_method_id ? (
    <div>
      <h2 className="text-lg font-bold mb-2">My Payment Methods</h2>
      <p>Visa ending in ****</p>
      {addPaymentButton}
      {cardInputElement}
    </div>
  ) : (
    <div>
      <h2 className="text-lg font-bold mb-2">
        Add payment to Stripe to start stocking your fridge!
      </h2>
      {addPaymentButton}
      {cardInputElement}
    </div>
  );

  return (
    <div className="bg-white shadow sm:rounded-lg max-w-md p-8 m-4 w-full">
      <form onSubmit={handleSubmit}>{formContent}</form>
    </div>
  );
}

export default PaymentMethodForm;
