import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { OrderContext } from "../context/order";
import UserContext from "../context/user";
import Checkbox from "./Checkbox";
import OrderControls from "./OrderControls";

function VendorProductCard({ product }) {
  const {
    addProduct,
    removeProduct,
    updateQuantity,
    selectedProducts,
    setErrors,
    userOrders,
  } = useContext(OrderContext);

  const { user } = useContext(UserContext);
  const { vendorId } = useParams();

  const isSelected = selectedProducts?.some(
    (p) => p.id === product.id && p.selected
  );
  const displayControls = user && isSelected;

  const [orderQuantity, setOrderQuantity] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    if (userOrders) {
      const pendingOrder = userOrders.find(
        (order) =>
          order.vendor_id === parseInt(vendorId) && order.status === "pending"
      );

      const productData = pendingOrder?.order_items?.find(
        (item) => item.vendors_product_id === product.id
      );

      const initialQuantity = productData?.quantity || 0;
      setOrderQuantity(initialQuantity);
    }
  }, [userOrders, vendorId, product.id]);

  const incrementQuantity = () => {
    if (isSelected) {
      const newQuantity = orderQuantity + 1;
      setOrderQuantity(newQuantity);
      updateQuantity(product, newQuantity, isSelected);
    }
  };

  const decrementQuantity = () => {
    if (isSelected && orderQuantity > 0) {
      const newQuantity = orderQuantity - 1;
      setOrderQuantity(newQuantity);
      updateQuantity(product, newQuantity, isSelected);
    }
  };

  const resetQuantity = () => {
    setOrderQuantity(0);
    updateQuantity(product, 0, isSelected);
  };

  const toggleSelection = () => {
    if (isSelected) {
      removeProduct(product);
      setErrors([]);
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
            src={
              imageLoaded
                ? product.image_url
                : "https://png.pngtree.com/element_our/png_detail/20181015/fridge-icon-design-vector-png_123657.jpg"
            }
            alt={product.name ? product.name : "stock fridge icon"}
            title={product.name ? product.name : "stock fridge icon"}
            onError={handleImageError}
          />
          {!imageLoaded && (
            <div className="text-xs text-gray-500 mt-2">
              <a
                href="https://pngtree.com/freepng/fridge-icon-design-vector_3659638.html?sol=downref&id=bef"
                title="fridge icons"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fridge icons PNG Designed By Syed Hassan from Pngtree.com
              </a>
            </div>
          )}
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
        {/* Quantity reflects message */}
        {user && isSelected && (
          <div className="mt-3 mb-3 bg-blue-100 text-blue-800 p-2 rounded">
            <p className="text-xs">
              <span className="font-bold">Note:</span> Quantity shown reflects
              the number of items you have currently added in checkout and not
              the number of items in stock. Add or reduce the quantity to update
              amount in checkout as needed. If reset after adding to cart, the
              item will not be removed from your cart. You must visit your cart
              to remove the item.
            </p>
          </div>
        )}
        {/* Order controls */}
        <div className="flex items-center mt-3 justify-between">
          {displayControls && (
            <OrderControls
              isSelected={isSelected}
              orderQuantity={orderQuantity}
              decrementQuantity={decrementQuantity}
              incrementQuantity={incrementQuantity}
              resetQuantity={resetQuantity}
            />
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
