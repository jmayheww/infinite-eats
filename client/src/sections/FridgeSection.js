import React from "react";
import { useNavigate } from "react-router-dom";

function FridgeSection() {
  const navigate = useNavigate();
  return (
    <div className="bg-secondary text-white rounded-md p-6">
      <h2 className="text-xl font-bold mb-4">My Fridge</h2>
      <button
        className="py-2 px-4 bg-accent text-white rounded-md hover:bg-primary hover:opacity-80 transition-all duration-300"
        onClick={() => navigate("/fridge")}
      >
        Manage Fridge Stock
      </button>
    </div>
  );
}

export default FridgeSection;
