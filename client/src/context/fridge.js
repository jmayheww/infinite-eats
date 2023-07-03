import React, { createContext, useState, useContext } from "react";
import UserContext from "./user";

export const FridgeContext = createContext();

export const FridgeProvider = ({ children }) => {
  const { setUserFridgeItems } = useContext(UserContext);

  const [errors, setErrors] = useState([]);

  const updateFridgeItem = async (fridgeItemId, quantity) => {
    const response = await fetch(`/api/fridge_items/${fridgeItemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fridge_item: { quantity } }),
    });

    if (response.ok) {
      const updatedFridgeItem = await response.json();
      setUserFridgeItems((prevFridgeItems) => {
        return prevFridgeItems.map((item) =>
          item.id === updatedFridgeItem.id ? updatedFridgeItem : item
        );
      });
      setErrors([]);
    } else {
      const data = await response.json();
      if (data.errors) {
        setErrors(data.errors);
      }
    }
  };

  const deleteFridgeItem = async (fridgeItemId) => {
    const response = await fetch(`/api/fridge_items/${fridgeItemId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setUserFridgeItems((prevFridgeItems) => {
        return prevFridgeItems.filter((item) => item.id !== fridgeItemId);
      });

      setErrors([]);
    } else {
      const data = await response.json();
      if (data.errors) {
        setErrors(data.errors);
      }
    }
  };

  return (
    <FridgeContext.Provider
      value={{
        updateFridgeItem,
        deleteFridgeItem,
        errors,
        setErrors,
      }}
    >
      {children}
    </FridgeContext.Provider>
  );
};
