import React, { useEffect, useContext } from "react";
import { CheckoutContext } from "../context/checkout";
import OrdersSection from "../sections/OrdersSection";

function OrderCheckoutPage() {
  const { errors, setErrors } = useContext(CheckoutContext);

  useEffect(() => {
    if (errors.length) {
      setErrors([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="checkout-page min-h-screen pt-16 bg-primary">
      <OrdersSection />
    </div>
  );
}

export default OrderCheckoutPage;
