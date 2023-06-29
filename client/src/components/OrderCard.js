import React from "react";

function OrderCard({ order, onRemove, onUpdate }) {
  console.log("order: ", order);
  const handleRemoveOrder = () => {
    onRemove(order.id);
  };

  const handleUpdateQuantity = (event, itemId) => {
    const newQuantity = parseInt(event.target.value);
    onUpdate(order.id, itemId, newQuantity);
  };

  return (
    <div className="border border-gray-300 rounded-lg p-6 m-6 shadow-lg max-w-sm">
      <p className="text-secondaryDark font-semibold text-lg">
        {order.vendor.name}
      </p>
      <p className="text-accent text-sm">Status: {order.status}</p>
      <ul className="mt-4 space-y-4">
        {order.items.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center border-t border-gray-200 pt-4"
          >
            <div>
              <p className="text-primary font-semibold">{item.name}</p>
              <p className="text-accent text-sm">{item.price}</p>
            </div>
            <div className="flex items-center">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(event) => handleUpdateQuantity(event, item.id)}
                className="border border-gray-300 rounded w-16 text-center"
              />
              <button
                onClick={() => onRemove(item.id)}
                className="ml-4 text-red-500 hover:text-red-700 transition-colors duration-200"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <button
          onClick={handleRemoveOrder}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors duration-200"
        >
          Remove Order
        </button>
      </div>
    </div>
  );
}

export default OrderCard;
