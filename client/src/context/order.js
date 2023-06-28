import React, { createContext, useState, useContext, useEffect } from "react";
import UserContext from "./user";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { userOrders, setUserOrders } = useContext(UserContext);
  console.log("userOrders: ", userOrders);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setUserOrders(userOrders);
  }, [userOrders, setUserOrders]);

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
    const userId = currentUser?.id;
    setErrors([]);

    const orderItems = selectedProducts?.map((product) => {
      if (!product) {
        return;
      }
      return {
        vendors_product_id: product.id,
        quantity: product.quantity,
        price: product.price,
        name: product.name,
      };
    });

    const existingOrder = userOrders?.find(
      (order) =>
        order.vendor_id === parseInt(vendorId) && order.status === "pending"
    );

    console.log("existingOrder", existingOrder);
    if (existingOrder) {
      const existingOrderItems = existingOrder.order_items;
      console.log("existingOrderItems: ", existingOrderItems);

      const updatedOrderItems = [];

      selectedProducts.forEach((product) => {
        const existingItem = existingOrderItems?.find(
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
        id: existingOrder.id,
        status: existingOrder.status,
        vendor_id: existingOrder.vendor_id,
        user_id: existingOrder.user_id,
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

              // Update userOrders in the UserContext
              setUserOrders((prevOrders) => {
                const updatedOrders = prevOrders.map((order) => {
                  if (order.id === data.id) {
                    return data;
                  }
                  return order;
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
              console.log(data);
              // Update userOrders in the UserContext

              setUserOrders((prevOrders) => [...prevOrders, data]);
              console.log(userOrders);
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
        userOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
