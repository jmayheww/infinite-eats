import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

function PaymentMethodForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      const response = await fetch("/users/save_payment_method", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pm_id: paymentMethod.id }),
      });

      const data = await response.json();
      console.log("[data]", data);
      console.log("[PaymentMethod]", paymentMethod);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <label
            htmlFor="card-element"
            className="block text-gray-700 font-bold mb-2"
          >
            Save Payment Method
          </label>
          <CardElement
            id="card-element"
            className="border border-gray-400 p-2 rounded"
          />
        </div>
      </form>
    </div>
  );
}

export default PaymentMethodForm;
