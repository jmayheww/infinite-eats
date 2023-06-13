import React, { useContext } from "react";
import UserContext from "../context/userAuth";

function ErrorMessage() {
  const { errors } = useContext(UserContext);

  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
      role="alert"
    >
      <ul className="list-disc list-inside">
        {errors.map((error, index) => (
          <li key={index} className="mb-1">
            {error}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ErrorMessage;
