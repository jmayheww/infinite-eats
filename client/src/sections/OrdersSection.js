import React, { useContext } from "react";
import { OrderContext } from "../context/order";
import OrderCard from "../components/OrderCard";

function OrdersSection() {
  const { userOrders } = useContext(OrderContext);

  const renderOrders = () => {
    if (userOrders && userOrders.length > 0) {
      return userOrders.map((order) => (
        <div key={order.id} className="mb-6">
          <OrderCard order={order} />
        </div>
      ));
    }
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-xl">No pending orders</p>
      </div>
    );
  };

  return (
    <div className="orders-section container mx-auto py-16 flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold mb-8">Pending Orders</h2>
      {renderOrders()}
    </div>
  );
}

export default OrdersSection;
