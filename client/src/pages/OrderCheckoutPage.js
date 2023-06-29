import React, { useContext } from "react";
import { OrderContext } from "../context/order";
import OrdersSection from "../sections/OrdersSection";

function OrderCheckoutPage() {
  const { checkout } = useContext(OrderContext);

  return (
    <div className="checkout-page">
      <OrdersSection />
      <button className="pay-button" onClick={() => checkout()}>
        Pay
      </button>
    </div>
  );
}

export default OrderCheckoutPage;
