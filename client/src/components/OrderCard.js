import React, { useState, useContext } from "react";
import { CheckoutContext } from "../context/checkout";
import OrderItemCard from "./OrderItemCard";

function OrderCard({ order }) {
  const { deleteOrder, processPayment } = useContext(CheckoutContext);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRemoveOrder = () => {
    deleteOrder(order.id);
  };

  const handleApproveOrder = () => {
    setIsProcessing(true);

    processPayment(order, order.user).finally(() => {
      setIsProcessing(false);
    });
  };

  console.log(order.user);

  const totalPrice = parseFloat(order.total_price).toFixed(2);

  return (
    <div className="border border-gray-300 rounded-lg p-8 shadow-lg bg-white space-y-8 max-w-2xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-secondary font-semibold text-xl">
            {order.vendor.name}
          </p>
          <p className="text-secondary text-sm">Status: {order.status}</p>
        </div>
        {totalPrice > 0 && (
          <button
            className="bg-accent text-white py-2 px-4 rounded hover:bg-secondary transition-colors duration-200"
            onClick={handleApproveOrder}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Approve Order"}
          </button>
        )}
      </div>
      <ul className="space-y-4">
        {order.order_items && order.order_items.length ? (
          order.order_items.map((item) => (
            <OrderItemCard key={item.id} item={item} />
          ))
        ) : (
          <p>No items in this checkout order yet.</p>
        )}
      </ul>
      <div>
        <p className="text-secondary font-semibold text-xl">
          Total Price: ${totalPrice}
        </p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          className="text-red-500 hover:text-red-700"
          onClick={handleRemoveOrder}
        >
          Delete Order
        </button>
      </div>
    </div>
  );
}

export default OrderCard;
