import React from "react";
import { useNavigate } from "react-router-dom";

function FridgeSection() {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-800 text-white rounded-md p-6">
      <h2 className="text-xl font-bold mb-4">My Fridge</h2>
      <button
        className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-700 transition-all duration-300"
        onClick={() => navigate("/fridge")}
      >
        Manage Fridge Stock
      </button>
    </div>
  );
}

export default FridgeSection;
