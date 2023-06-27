import React, { useContext, useEffect, useState } from "react";
import { OrderContext } from "../context/order";
import UserContext from "../context/auth";
import Checkbox from "./Checkbox";

function VendorProductCard({ product }) {
  const { addProduct, removeProduct, updateQuantity, selectedProducts } =
    useContext(OrderContext);
  const { user } = useContext(UserContext);
  console.log("user: ", user);

  const isSelected = selectedProducts?.some(
    (p) => p.id === product.id && p.selected
  );

  const productData = selectedProducts?.find((p) => p.id === product.id);
  console.log("productData: ", productData);

  const [orderQuantity, setOrderQuantity] = useState(
    isSelected ? productData?.quantity : 0
  );

  useEffect(() => {
    // refresh local state and reset local orderQuantity state to 0 following successful order submission resets selectedProduct array to empty
    console.log("productData?.quantity", productData?.quantity);
    setOrderQuantity(productData?.quantity || 0);
  }, [productData]);

  const incrementQuantity = () => {
    if (!isSelected) {
      const newQuantity = orderQuantity + 1;
      setOrderQuantity(newQuantity);
      updateQuantity(product, newQuantity);
    }
  };

  const decrementQuantity = () => {
    if (!isSelected && orderQuantity > 0) {
      const newQuantity = orderQuantity - 1;
      setOrderQuantity(newQuantity);
      updateQuantity(product, newQuantity);
    }
  };

  const resetQuantity = () => {
    setOrderQuantity(0);
  };

  const toggleSelection = () => {
    if (isSelected) {
      removeProduct(product);
    } else {
      addProduct(product, orderQuantity);
    }
  };

  const cardStyles = isSelected
    ? "bg-green-100 border-green-500"
    : "bg-white border-gray-200";

  // Conditional rendering of order button and quantities
  const OrderControls = () => {
    if (user) {
      return (
        <div className="flex items-center">
          <span className="text-md font-semibold text-secondary">
            Quantity:
          </span>
          <div className="flex items-center ml-3">
            <button
              className="text-secondary focus:outline-none text-md border border-secondary rounded-full w-8 h-8 ml-1 hover:border-secondary hover:bg-secondary hover:text-white transition-colors duration-300"
              onClick={decrementQuantity}
              disabled={!orderQuantity}
            >
              -
            </button>
            <span className="text-secondary font-semibold text-lg mx-2">
              {orderQuantity}
            </span>
            <button
              className="text-secondary focus:outline-none text-md border border-secondary rounded-full w-8 h-8 ml-1 hover:border-secondary hover:bg-secondary hover:text-white transition-colors duration-300"
              onClick={incrementQuantity}
            >
              +
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <p>Please log in to place orders.</p>
        </div>
      );
    }
  };

  return (
    <div
      className={`rounded-lg overflow-hidden shadow-lg border ${cardStyles}`}
    >
      <div className="flex justify-start items-center p-6">
        {user && (
          <Checkbox
            checked={isSelected}
            onChange={toggleSelection}
            className="text-primary mr-20 flex-shrink-0"
          />
        )}
        <div className="aspect-w-3 aspect-h-2 flex-grow flex justify-center items-center">
          <img
            className="object-contain w-auto h-auto max-w-full max-h-32"
            src={product.image_url}
            alt={product.name}
          />
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-bold text-secondary mb-2">
          {product.name}
        </h2>
        <p className="text-sm text-gray-700 mb-4">{product.description}</p>
        <p className="text-xs text-gray-500">
          <span className="font-medium">Category:</span> {product.category}
        </p>
        <p className="text-xs text-gray-500">
          <span className="font-medium">Brand:</span> {product.brand}
        </p>
        <p className="text-xs text-gray-500">
          <span className="font-medium">Size:</span> {product.size}
        </p>
        <div className="flex items-center mt-3 justify-between">
          <OrderControls />
          {!isSelected && user && (
            <button
              className="text-secondary focus:outline-none text-sm ml-4 border border-secondary hover:border-secondary hover:bg-secondary hover:text-white transition-colors duration-300 rounded-md px-4 py-1"
              onClick={resetQuantity}
            >
              Reset
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center bg-secondary py-2 px-4">
        <span className="text-sm font-semibold text-white">
          Price: ${product.price}
        </span>
        <div className="ml-auto">
          <span
            className={`text-sm ${
              isSelected ? "text-green-600" : "text-gray-500"
            }`}
          >
            {isSelected ? "Selected for Purchase" : ""}
          </span>
        </div>
      </div>
    </div>
  );
}

export default VendorProductCard;
