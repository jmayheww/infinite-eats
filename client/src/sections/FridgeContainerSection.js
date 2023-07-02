import React, { useContext } from "react";
import UserContext from "../context/user";
import FridgeItemCard from "../components/FridgeItemCard";

function FridgeContainerSection() {
  const { userFridgeItems } = useContext(UserContext);
  const renderFridgeItems = () => {
    return userFridgeItems?.map((item) => (
      <FridgeItemCard key={item.id} item={item} />
    ));
  };

  return (
    <section className="container mx-auto px-6 py-20">
      <h2 className="text-4xl font-bold text-center text-secondaryDark mb-8">
        Manage Your Fridge
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {renderFridgeItems()}
      </div>
    </section>
  );
}

export default FridgeContainerSection;
