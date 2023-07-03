import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/user";
import FridgeItemCard from "../components/FridgeItemCard";

function FridgeContainerSection() {
  const { userFridgeItems, isLoading } = useContext(UserContext);
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Fetching your fridge!...</div>;
  }

  const renderFridgeItems = () => {
    if (!userFridgeItems || userFridgeItems.length === 0) {
      return (
        <div className="col-span-full text-center text-3xl font-semibold text-gray-500 p-5">
          <span>No items in your fridge</span>
        </div>
      );
    }
    return userFridgeItems.map((item) => (
      <FridgeItemCard key={item.id} item={item} />
    ));
  };

  return (
    <section className="bg-primary min-h-screen">
      <div className="container mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-4">
          Manage Your Fridge
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
          {renderFridgeItems()}
        </div>
        <div className="flex justify-center mt-6">
          <button
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-2 px-5 rounded-lg shadow-md hover:from-green-500 hover:to-blue-600 transition duration-300 ease-in-out"
            onClick={() => navigate("/vendors")}
          >
            Stock Your Fridge
          </button>
        </div>
      </div>
    </section>
  );
}

export default FridgeContainerSection;
