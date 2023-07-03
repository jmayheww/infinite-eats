import React, { useContext } from "react";
import { OrderContext } from "../context/order";
import OrderCard from "../components/OrderCard";

function OrdersSection() {
  const { userOrders } = useContext(OrderContext);
  console.log("userOrders: ", userOrders);

  if (!userOrders || userOrders.length === 0) {
    return (
      <h2 className="text-secondary text-lg font-semibold text-center mt-16">
        No pending Orders
      </h2>
    );
  }

  const renderOrders = () => {
    const pendingOrders = userOrders?.filter(
      (order) => order.status === "pending"
    );

    if (pendingOrders.length > 0) {
      return (
        <div className="orders-section container mx-auto px-4 md:px-0 py-20 md:py-32">
          <h2 className="text-3xl font-bold text-center text-secondary mb-8">
            Pending Orders
          </h2>
          <div className="max-w-3xl mx-auto">
            {pendingOrders?.map((order) => (
              <div key={order.id} className="my-6">
                <OrderCard order={order} />
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <h2 className="text-secondary text-lg font-semibold text-center mt-16">
          No pending orders
        </h2>
      );
    }
  };

  return (
    <div className="bg-primary-100 min-h-screen pt-16">{renderOrders()}</div>
  );
}

export default OrdersSection;
