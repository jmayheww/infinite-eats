import React, { useContext } from "react";
import { OrderContext } from "../context/order";
import { CheckoutContext } from "../context/checkout";
import OrderCard from "../components/OrderCard";

function OrdersSection() {
  const { userOrders } = useContext(OrderContext);
  const { errors } = useContext(CheckoutContext);

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

    const renderErrors = () => {
      if (Array.isArray(errors) && errors.length > 0) {
        return (
          <div className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        );
      } else if (typeof errors === "string") {
        return (
          <div className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4">
            <p>{errors}</p>
          </div>
        );
      }

      return null;
    };

    if (pendingOrders.length > 0) {
      return (
        <div className="orders-section container mx-auto px-4 md:px-0 py-12 md:py-24">
          <h2 className="text-3xl font-bold text-center text-secondary mb-8">
            Pending Orders
          </h2>
          <div className="flex justify-center">{renderErrors()}</div>
          <div className="max-w-3xl mx-auto">
            {pendingOrders?.map((order, index) => (
              <div
                key={order.id}
                className={`my-6 ${index === 0 ? "mt-8" : ""}`}
              >
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
