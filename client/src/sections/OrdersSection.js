import React, { useContext } from "react";
import { OrderContext } from "../context/order";
import OrderCard from "../components/OrderCard";

function OrdersSection() {
  const { userOrders } = useContext(OrderContext);
  console.log("userOrders: ", userOrders);

  const renderOrders = () => {
    return userOrders?.map((order) => (
      <OrderCard key={order.id} order={order} />
    ));
  };

  return (
    <div className="orders-section">
      <h2>Pending Orders</h2>
      {renderOrders()}
    </div>
  );
}

export default OrdersSection;
