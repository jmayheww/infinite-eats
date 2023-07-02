import React, { createContext, useState, useContext } from "react";

export const FridgeContext = createContext();

export const FridgeProvider = ({ children }) => {
  const [fridgeItems, setFridgeItems] = useState([]);

  const [errors, setErrors] = useState([]);

  const addFridgeItem = async (fridgeItem) => {
    const response = await fetch("/api/fridge_items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fridgeItem),
    });

    if (response.ok) {
      const updatedFridgeItems = await response.json();
      setFridgeItems(updatedFridgeItems);
      setErrors([]);
    } else {
      const data = await response.json();
      if (data.errors) {
        setErrors(data.errors);
      }
    }
  };

  const updateFridgeItem = async (fridgeItemId, quantity) => {
    const response = await fetch(`/api/fridge_items/${fridgeItemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fridge_item: { quantity } }),
    });

    if (response.ok) {
      const updatedFridgeItems = await response.json();
      setFridgeItems(updatedFridgeItems);
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
      const updatedFridgeItems = await response.json();

      setFridgeItems(updatedFridgeItems);

      console.log("updatedFridgeItems: ", updatedFridgeItems);

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
        fridgeItems,
        setFridgeItems,
        addFridgeItem,
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
