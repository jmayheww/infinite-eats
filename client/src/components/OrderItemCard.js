import React, { useContext, useState } from "react";
import { CheckoutContext } from "../context/checkout";

function OrderItemCard({ item }) {
  const { updateOrderItem, deleteOrderItem } = useContext(CheckoutContext);

  const [isEditing, setIsEditing] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity);

  const isValidQuantity = quantity > 0;

  const handleEditOrderItem = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setQuantity(item.quantity);
    setIsEditing(false);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(isNaN(newQuantity) ? 0 : newQuantity);
  };

  const handleOrderItemUpdate = () => {
    if (isValidQuantity) {
      updateOrderItem(item.id, quantity);
      setIsEditing(false);
    }
  };

  const handleRemoveOrderItem = () => {
    deleteOrderItem(item.id);
    setIsEditing(false);
  };

  return (
    <li className="flex flex-col md:flex-row justify-between items-start md:items-center border-t border-gray-200 pt-4 pb-4 md:pb-0">
      <div className="mb-4 md:mb-0">
        <p className="text-gray-900 font-semibold">{item.name}</p>
        <p className="text-gray-700 text-sm md:text-base">
          Unit Price: ${item.price}
        </p>
      </div>
      {isEditing ? (
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
          <label
            htmlFor={`item-quantity-${item.id}`}
            className="text-gray-600 self-start"
          >
            Quantity:
          </label>
          <input
            id={`item-quantity-${item.id}`}
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            className="border border-gray-300 rounded w-16 text-center mb-2 md:mb-0"
          />
          {!isValidQuantity && (
            <span className="text-red-500 text-sm">
              Quantity must be greater than 0
            </span>
          )}
          <div className="flex space-x-2">
            <button
              disabled={!isValidQuantity}
              className={`text-blue-500 ${
                isValidQuantity ? "hover:text-blue-700" : "opacity-50"
              } px-2 py-1 md:px-3 md:py-2`}
              onClick={handleOrderItemUpdate}
            >
              Update
            </button>
            <button
              onClick={handleCancelEdit}
              className="text-red-500 hover:text-red-700 px-2 py-1 md:px-3 md:py-2"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <p className="text-gray-700 text-sm md:text-base">
            Quantity: {quantity}
          </p>
          <button
            onClick={handleEditOrderItem}
            className="text-blue-500 hover:text-blue-700 px-2 py-1 md:px-3 md:py-2"
          >
            Edit
          </button>
          <button
            onClick={handleRemoveOrderItem}
            className="text-red-500 hover:text-red-700 px-2 py-1 md:px-3 md:py-2"
          >
            Remove
          </button>
        </div>
      )}
    </li>
  );
}

export default OrderItemCard;
