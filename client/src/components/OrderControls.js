import React, { useContext } from "react";
import UserContext from "../context/user";

function OrderControls({
  isSelected,
  orderQuantity,
  decrementQuantity,
  incrementQuantity,
  resetQuantity,
}) {
  const { user } = useContext(UserContext);

  if (!user || !isSelected) {
    return null;
  }

  return (
    <div className="flex items-center">
      <span className="text-md font-semibold text-secondary">Quantity:</span>
      <div className="flex items-center ml-3">
        <button
          className="text-secondary focus:outline-none text-md border border-secondary rounded-full w-8 h-8 ml-1 hover:border-secondary hover:bg-secondary hover:text-white transition-colors duration-300"
          onClick={decrementQuantity}
          disabled={!isSelected || !orderQuantity}
        >
          -
        </button>
        <span className="text-secondary font-semibold text-lg mx-2">
          {orderQuantity}
        </span>
        <button
          className="text-secondary focus:outline-none text-md border border-secondary rounded-full w-8 h-8 ml-1 hover:border-secondary hover:bg-secondary hover:text-white transition-colors duration-300"
          onClick={incrementQuantity}
          disabled={!isSelected}
        >
          +
        </button>
        <button
          className="text-secondary focus:outline-none text-sm ml-4 border border-secondary hover:border-secondary hover:bg-secondary hover:text-white transition-colors duration-300 rounded-md px-4 py-1"
          onClick={resetQuantity}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default OrderControls;
