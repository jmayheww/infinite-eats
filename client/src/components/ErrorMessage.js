import React, { useContext } from "react";
import UserContext from "../context/userAuth";

function ErrorMessage() {
  const { errors } = useContext(UserContext);

  return (
    <div>
      {errors.map((error, index) => (
        <div
          key={index}
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      ))}
    </div>
  );
}

export default ErrorMessage;
