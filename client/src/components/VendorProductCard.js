import React, { useContext, useState } from "react";
import { OrderContext } from "../context/order";
import Checkbox from "./Checkbox";

function VendorProductCard({ product }) {
  const { addProduct, removeProduct, updateQuantity, selectedProducts } =
    useContext(OrderContext);

  const isSelected = selectedProducts?.some((p) => p.id === product.id);
  const productData = selectedProducts?.find((p) => p.id === product.id);
  const initialQuantity = productData ? productData.orderQuantity : 0;
  const [orderQuantity, setOrderQuantity] = useState(initialQuantity);

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

  return (
    <div
      className={`rounded-lg overflow-hidden shadow-lg border ${cardStyles}`}
    >
      <div className="aspect-w-3 aspect-h-2">
        <img
          className="object-cover w-full h-full"
          src={product.image_url}
          alt={product.name}
        />
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
      </div>
      <div className="flex flex-col items-center bg-secondary py-2 px-4">
        <span className="text-sm font-semibold text-white">
          Price: ${product.price}
        </span>
        <div className="flex items-center mt-3">
          <span className="text-sm text-primary font-semibold">Quantity:</span>
          <div className="flex items-center ml-3">
            <button
              className="text-primary focus:outline-none text-sm border border-primary rounded-full w-8 h-8 ml-1"
              onClick={decrementQuantity}
              disabled={!orderQuantity}
            >
              -
            </button>
            <span className="text-primary font-semibold text-lg mx-2">
              {orderQuantity}
            </span>
            <button
              className="text-primary focus:outline-none text-sm border border-primary rounded-full w-8 h-8"
              onClick={incrementQuantity}
            >
              +
            </button>
          </div>
        </div>
        <div className="flex items-center mt-3">
          <Checkbox
            checked={isSelected}
            onChange={toggleSelection}
            className="text-primary"
          />
          <span className="ml-2 text-sm text-primary">
            {isSelected ? "Deselect Product" : "Select for Purchase"}
          </span>
          {!isSelected && (
            <button
              className="text-primary focus:outline-none text-sm ml-4 hover:bg-primary hover:text-secondary transition-colors duration-300 hover:border-primary border border-primary rounded-md px-4 py-1"
              onClick={resetQuantity}
            >
              Reset
            </button>
          )}
        </div>
        <div className="mt-2">
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
