import React, { createContext, useState } from "react";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  console.log("orders: ", orders);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [errors, setErrors] = useState([]);

  const fetchOrders = () => {
    fetch("/api/orders").then((r) => {
      if (r.ok) {
        r.json().then((data) => setOrders(data));
      } else {
        r.json().then((err) => console.error(err));
      }
    });
  };

  const addProduct = (product, quantity) => {
    setSelectedProducts((prev) => {
      const productInList = prev.find((p) => p.id === product.id);
      if (productInList) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity, selected: true } : p
        );
      }
      return [...prev, { ...product, quantity, selected: true }];
    });
  };

  const removeProduct = (product) => {
    setSelectedProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, selected: false } : p))
    );
  };

  const updateQuantity = (product, quantity) => {
    setSelectedProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, quantity } : p))
    );
  };

  const submitOrderItemsToCheckout = (currentUser, vendorId) => {
    const userId = currentUser.id;
    setErrors([]);

    const orderItems = selectedProducts.map((product) => ({
      vendors_product_id: product.id,
      quantity: product.quantity,
      price: product.price,
    }));

    const orderData = {
      user_id: userId,
      vendor_id: vendorId,
      status: "pending",
      order_items_attributes: orderItems,
    };

    fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order: orderData }),
    })
      .then((r) => {
        if (r.ok) {
          return r.json().then((data) => {
            setSelectedProducts([]);
            setErrors([]);
          });
        } else {
          return r.json().then((data) => {
            if (data.errors) {
              setErrors(data.errors);
            }
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <OrderContext.Provider
      value={{
        selectedProducts,
        addProduct,
        removeProduct,
        updateQuantity,
        submitOrderItemsToCheckout,
        errors,
        setErrors,
        fetchOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
