import React from "react";
import { useNavigate } from "react-router-dom";

function FridgeSection() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>My Fridge</h1>
      <button
        className="py-2 px-4 bg-primary text-white rounded-md hover:bg-accent hover:opacity-80 transition-all duration-300"
        onClick={() => navigate("/fridge")}
      >
        Manage Fridge Stock
      </button>
    </div>
  );
}

export default FridgeSection;
