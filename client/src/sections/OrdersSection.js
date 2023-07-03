import React, { useContext } from "react";
import { OrderContext } from "../context/order";
import { CheckoutContext } from "../context/checkout";
import OrderCard from "../components/OrderCard";

function OrdersSection() {
  const { userOrders } = useContext(OrderContext);
  const { errors } = useContext(CheckoutContext);
  console.log("errors: ", errors);

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
        <div className="orders-section container mx-auto px-4 md:px-0 py-12 md:py-24">
          <h2 className="text-3xl font-bold text-center text-secondary mb-8">
            Pending Orders
          </h2>
          {errors && errors.length > 0 && (
            <div
              className="bg-red-600 text-white rounded-lg shadow-md text-center mx-auto mb-4 max-w-xl p-4"
              role="alert"
            >
              {errors[0]}
            </div>
          )}
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
