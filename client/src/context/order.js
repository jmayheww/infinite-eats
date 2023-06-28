import React, { createContext, useState } from "react";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [errors, setErrors] = useState([]);

  const fetchOrders = () => {
    fetch("/api/orders").then((r) => {
      if (r.ok) {
        r.json().then((data) => setOrders(data));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  };

  // help find the user's current order items
  const getUserOrderItems = (user) => user?.order_items;

  // help find a product in the order items array
  const findProductInOrderItems = (orderItems, productId) =>
    orderItems?.find((item) => item.vendors_product_id === productId);

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

    const orderItems = selectedProducts?.map((product) => ({
      vendors_product_id: product.id,
      quantity: product.quantity,
      price: product.price,
      name: product.name,
    }));

    const existingOrder = orders?.find(
      (order) =>
        order.vendor_id === parseInt(vendorId) && order.status === "pending"
    );

    if (existingOrder) {
      const existingOrderItems = existingOrder.order_items;
      const updatedOrderItems = [];

      selectedProducts.forEach((product) => {
        const existingItem = existingOrderItems.find(
          (item) => item.vendors_product_id === product.id
        );

        if (existingItem) {
          const updatedItem = {
            ...existingItem,
            quantity: product.quantity,
          };

          updatedOrderItems.push(updatedItem);
        } else {
          const newOrderItem = {
            vendors_product_id: product.id,
            quantity: product.quantity,
            price: product.price,
            name: product.name,
          };
          updatedOrderItems.push(newOrderItem);
        }
      });

      const updatedOrder = {
        ...existingOrder,
        user_id: existingOrder.user.id,
        order_items_attributes: updatedOrderItems,
      };

      fetch(`/api/orders/${existingOrder.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: updatedOrder }),
      })
        .then((r) => {
          if (r.ok) {
            return r.json().then((data) => {
              setSelectedProducts([]);
              setErrors([]);
              setOrders((prev) => {
                const updatedOrders = prev.map((order) => {
                  if (order.id === data.id) {
                    return data;
                  } else {
                    return order;
                  }
                });
                return updatedOrders;
              });
            });
          } else {
            return r.json().then((data) => {
              if (data.errors) {
                setErrors(data.errors);
              }
            });
          }
        })
        .catch((error) => {});
    } else {
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
        .catch((error) => {});
    }
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
        orders,
        getUserOrderItems,
        findProductInOrderItems,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
