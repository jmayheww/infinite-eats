import React, { useContext } from "react";
import UserContext from "../context/auth";

function UserProfileSection() {
  const {
    user,
    errors,
    editMode,
    handleProfileChange,
    handleProfileSubmit,
    handleCancel,
    updatedUser,
    handleProfileEdit,
  } = useContext(UserContext);

  return (
    <div className="bg-white shadow sm:rounded-lg w-full max-w-md p-6">
      {errors && errors.length > 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mb-4 rounded">
          {errors.map((error, i) => (
            <p key={i}>{error}</p>
          ))}
        </div>
      )}

      {editMode ? (
        <form onSubmit={handleProfileSubmit}>
          {[
            "username",
            "email",
            "user_image",
            "first_name",
            "last_name",
            "street_address",
            "city",
            "state",
            "postal_code",
            "phone_number",
          ].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-secondary">
                {field
                  .split("_")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </label>
              <input
                type="text"
                name={field}
                value={updatedUser[field] || ""}
                onChange={handleProfileChange}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          ))}
          <button
            type="submit"
            className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-secondary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="mt-4 ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-accent hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Cancel
          </button>
        </form>
      ) : (
        <div className="flex flex-col items-center text-center">
          <img
            className="w-24 h-24 rounded-full object-cover mb-4"
            src={user.user_image || "https://via.placeholder.com/150"}
            alt="User profile"
          />
          <h2 className="text-2xl font-bold text-primary">
            {user.first_name} {user.last_name}
          </h2>
          <p className="text-gray-500">{user.email}</p>
          <div className="mt-4 text-left w-full">
            <p className="font-semibold">
              <span className="mr-2">Address:</span>
              {user.street_address}, {user.city}, {user.state},{" "}
              {user.postal_code}
            </p>
            <p className="font-semibold">
              <span className="mr-2">Phone Number:</span>
              {user.phone_number}
            </p>
          </div>
          <button
            onClick={handleProfileEdit}
            className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}

export default UserProfileSection;
