import React, { useContext } from "react";
import { CheckoutContext } from "../context/checkout";
import OrderItemCard from "./OrderItemCard";

function OrderCard({ order }) {
  const { deleteOrder, processPayment, errors } = useContext(CheckoutContext);

  const handleRemoveOrder = () => {
    deleteOrder(order.id);
  };

  const handleApproveOrder = () => {
    processPayment(order, order.user);
  };

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
          >
            Approve
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
      {errors && errors.length > 0 && (
        <div className="mt-4 text-red-500">{errors}</div>
      )}
    </div>
  );
}

export default OrderCard;
