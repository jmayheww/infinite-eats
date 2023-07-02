import React, { useContext, useEffect } from "react";
import UserContext from "../context/user";

function ManageFridgePage() {
  const { userFridgeItems, setUserFridgeItems, isLoading } =
    useContext(UserContext);
  console.log("userFridgeItems: ", userFridgeItems);
  console.log("isLoading: ", isLoading);

  useEffect(() => {
    console.log(userFridgeItems);

    console.log("context: ", UserContext);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userFridgeItems]);

  const renderFrigeItems = () => {
    return userFridgeItems?.map((item) => (
      <div
        key={item.id}
        className="p-6 bg-white rounded-xl shadow-md flex items-start space-x-4"
      >
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h2 className="font-opensans text-2xl text-secondary">
              {item.name}
            </h2>
          </div>
        </div>
      </div>
    ));
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="min-h-screen bg-primary py-10 px-5 md:px-10">
      <h1 className="font-montserrat text-4xl md:text-5xl text-secondaryDark mb-10">
        Manage Fridge
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {renderFrigeItems()}
      </div>
    </div>
  );
}

export default ManageFridgePage;
