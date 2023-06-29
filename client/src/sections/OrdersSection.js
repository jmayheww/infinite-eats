import React, { useContext } from "react";
import { OrderContext } from "../context/order";

import OrderCard from "../components/OrderCard";

function OrdersSection() {
  const { userOrders } = useContext(OrderContext);

  const renderOrders = () => {
    if (userOrders && userOrders.length > 0) {
      return userOrders
        .filter((order) => order.order_items && order.order_items.length > 0)
        .map((order) => <OrderCard key={order.id} order={order} />);
    }
    return null;
  };

  return (
    <div className="orders-section">
      <h2>Pending Orders</h2>
      {renderOrders()}
    </div>
  );
}

export default OrdersSection;
