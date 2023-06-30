import React, { useContext } from "react";
import { OrderContext } from "../context/order";

import OrderCard from "../components/OrderCard";

function OrdersSection() {
  const { userOrders } = useContext(OrderContext);

  const renderOrders = () => {
    if (userOrders && userOrders.length > 0) {
      return userOrders.map((order) => (
        <div key={order.id}>
          <OrderCard order={order} />
        </div>
      ));
    }
  };

  return (
    <div className="orders-section">
      <h2>Pending Orders</h2>
      {renderOrders()}
    </div>
  );
}

export default OrdersSection;
