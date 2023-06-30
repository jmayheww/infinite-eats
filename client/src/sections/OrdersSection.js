import React, { useContext } from "react";
import { OrderContext } from "../context/order";
import OrderCard from "../components/OrderCard";

function OrdersSection() {
  const { userOrders } = useContext(OrderContext);
  console.log("userOrders: ", userOrders);

  const renderOrders = () => {
    const pendingOrders = userOrders.filter(
      (order) => order.status === "pending"
    );

    console.log(pendingOrders);

    if (pendingOrders.length > 0) {
      return pendingOrders.map((order) => (
        <div key={order.id} className="mb-6">
          <OrderCard order={order} />
        </div>
      ));
    } else {
      return <p>No pending orders</p>;
    }
  };

  return (
    <div className="orders-section container mx-auto py-16 flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold mb-8">Pending Orders</h2>
      {renderOrders()}
    </div>
  );
}

export default OrdersSection;
