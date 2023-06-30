import React, { useContext } from "react";
import { CheckoutContext } from "../context/checkout";
import OrderItemCard from "./OrderItemCard";

function OrderCard({ order }) {
  console.log("total_price: ", order.total_price);
  const { deleteOrder, processPayment, errors } = useContext(CheckoutContext);

  const handleRemoveOrder = () => {
    deleteOrder(order.id);
  };

  const handleApproveOrder = () => {
    console.log("approved order:", order);
    processPayment(order, order.user);
  };

  const totalPrice = parseFloat(order.total_price);

  return (
    <div className="border border-gray-300 rounded-lg p-6 m-6 shadow-lg max-w-sm bg-white">
      <p className="text-gray-800 font-semibold text-lg">{order.vendor.name}</p>
      <p className="text-gray-600 text-sm">Status: {order.status}</p>
      <ul className="mt-4 space-y-4">
        {order.order_items && order.order_items.length ? (
          order.order_items.map((item) => (
            <OrderItemCard key={item.id} item={item} />
          ))
        ) : (
          <p>No items in this checkout order yet.</p>
        )}
      </ul>
      <div className="mt-6">
        <p className="text-gray-800 font-semibold">
          Total Price: ${order.total_price}
        </p>
        <div className="flex justify-end mt-4">
          <button
            className="text-red-500 hover:text-red-700 mr-4"
            onClick={handleRemoveOrder}
          >
            Delete Order
          </button>
          {totalPrice > 0 && (
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-200"
              onClick={handleApproveOrder}
            >
              Approve
            </button>
          )}
        </div>
      </div>
      {errors && errors.length > 0 && (
        <div className="mt-4 text-red-500">{errors[0]}</div>
      )}
    </div>
  );
}

export default OrderCard;
