import React, { useContext, useState, useEffect } from "react";
import { FridgeContext } from "../context/fridge";

function FridgeItemCard({ item }) {
  const { updateFridgeItem, deleteFridgeItem, errors } =
    useContext(FridgeContext);

  const [isEditing, setIsEditing] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity);
  const [isOutOfStock, setIsOutOfStock] = useState(item.quantity === 0);

  useEffect(() => {
    setIsOutOfStock(quantity === 0);
  }, [quantity]);

  const handleEditFridgeItem = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setQuantity(item.quantity);
    setIsEditing(false);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (isNaN(newQuantity) || newQuantity < 0) {
      setQuantity(0);
    } else {
      setQuantity(newQuantity);
    }
  };

  const handleFridgeItemUpdate = () => {
    updateFridgeItem(item.id, quantity);
    setIsEditing(false);
  };

  const handleRemoveFridgeItem = () => {
    deleteFridgeItem(item.id);
    setIsEditing(false);
  };

  //   const cardStyles = isOutOfStock
  //     ? "rounded shadow-lg p-6 mb-4 bg-red-500 flex flex-col items-center overflow-auto"
  //     : "rounded shadow-lg p-6 mb-4 bg-white flex flex-col items-center overflow-auto";

  return (
    <div
      className={`transform transition-transform duration-500 hover:scale-105 rounded-lg shadow-lg p-6 mb-4 text-center ${
        isOutOfStock ? "bg-accent text-white" : "bg-tertiary text-secondaryDark"
      }`}
      style={{ minHeight: "18rem" }}
    >
      <p className="text-2xl font-bold mb-4">{item.name}</p>
      <img
        className="object-cover w-48 h-48 mx-auto rounded-lg mb-4"
        src={item.image}
        alt={item.name}
      />
      {isEditing ? (
        <div className="mt-4 space-x-2">
          <label htmlFor={`item-quantity-${item.id}`} className="text-gray-600">
            Quantity:
          </label>
          <input
            id={`item-quantity-${item.id}`}
            type="number"
            min="0"
            value={quantity}
            onChange={handleQuantityChange}
            className="border border-gray-300 rounded w-16 text-center ml-2"
          />
          {errors.length > 0 && (
            <div className="text-red-500 text-sm">{errors.join(", ")}</div>
          )}
          <button
            className="text-white bg-secondary hover:bg-secondaryDark p-1 px-4 rounded ml-2"
            onClick={handleFridgeItemUpdate}
          >
            Update
          </button>
          <button
            onClick={handleCancelEdit}
            className="text-red-500 hover:text-red-700 ml-2"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="mt-4 space-x-2">
          <p className="text-lg mb-4">
            <span className="text-secondary font-montserrat">Quantity: </span>
            <span className="text-black bg-primary px-2 py-1 rounded">
              {quantity}
            </span>
          </p>
          <button
            onClick={handleEditFridgeItem}
            className="text-white bg-secondary hover:bg-secondaryDark p-1 px-4 rounded"
          >
            Edit
          </button>
          <button
            onClick={handleRemoveFridgeItem}
            className="text-red-500 hover:text-red-700 ml-2"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}

export default FridgeItemCard;
