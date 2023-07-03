import React, { useContext, useState } from "react";
import { CheckoutContext } from "../context/checkout";

function OrderItemCard({ item }) {
  const { updateOrderItem, deleteOrderItem } = useContext(CheckoutContext);

  const [isEditing, setIsEditing] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity);

  const handleEditOrderItem = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setQuantity(item.quantity);
    setIsEditing(false);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (isNaN(newQuantity) || newQuantity < 1) {
      setQuantity(1);
    } else {
      setQuantity(newQuantity);
    }
  };

  const handleOrderItemUpdate = () => {
    updateOrderItem(item.id, quantity);
    setIsEditing(false);
  };

  const handleRemoveOrderItem = () => {
    deleteOrderItem(item.id);
    setIsEditing(false);
  };

  return (
    <li className="flex justify-between items-center border-t border-gray-200 pt-4">
      <div>
        <p className="text-gray-900 font-semibold">{item.name}</p>
        <p className="text-gray-700 text-sm">Unit Price: ${item.price}</p>
      </div>
      {isEditing ? (
        <div className="flex items-center space-x-2">
          <label htmlFor={`item-quantity-${item.id}`} className="text-gray-600">
            Quantity:
          </label>
          <input
            id={`item-quantity-${item.id}`}
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="border border-gray-300 rounded w-16 text-center"
          />
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={handleOrderItemUpdate}
          >
            Update
          </button>
          <button
            onClick={handleCancelEdit}
            className="text-red-500 hover:text-red-700"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <p className="text-gray-700 text-sm">Quantity: {quantity}</p>
          <button
            onClick={handleEditOrderItem}
            className="text-blue-500 hover:text-blue-700"
          >
            Edit
          </button>
          <button
            onClick={handleRemoveOrderItem}
            className="text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      )}
    </li>
  );
}

export default OrderItemCard;
