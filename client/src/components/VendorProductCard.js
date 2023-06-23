import React from "react";

function VendorProductCard({ product }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="aspect-w-3 aspect-h-2">
        <img
          className="object-cover w-full h-full"
          src={product.image_url}
          alt={product.name}
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-bold text-secondary">{product.name}</h2>
        <p className="text-sm text-gray-700">{product.description}</p>
        <p className="text-xs text-gray-500 mt-2">
          Category: {product.category}
        </p>
        <p className="text-xs text-gray-500">Brand: {product.brand}</p>
        <p className="text-xs text-gray-500">Size: {product.size}</p>
      </div>
      <div className="flex justify-between items-center bg-accent py-2 px-4">
        <span className="text-sm font-semibold text-white">
          Price: ${product.price}
        </span>
        <span className="text-sm font-semibold text-white">
          Quantity: {product.quantity}
        </span>
      </div>
    </div>
  );
}

export default VendorProductCard;
