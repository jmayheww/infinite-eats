import React, { useContext, useState } from "react";
import UserContext from "../context/auth";

function UserProfileSection() {
  const { user, updateUser } = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    updateUser(formData);
    setEditMode(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white shadow sm:rounded-lg w-full max-w-md p-6">
      {editMode ? (
        <>
          {[
            "username",
            "email",
            "first_name",
            "last_name",
            "street_address",
            "city",
            "state",
            "postal_code",
            "phone_number",
          ].map((field) => (
            // iterate over the fields array and create an input for each field, adjust the label text to be more readable
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700">
                {field
                  .split("_")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          ))}
          <button
            onClick={handleSave}
            className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center text-center">
          <img
            className="w-24 h-24 rounded-full object-cover mb-4"
            src="/default-user-image.png"
            alt="User profile"
          />
          <h2 className="text-2xl font-bold">
            {user.first_name} {user.last_name}
          </h2>
          <p className="text-gray-500">{user.email}</p>
          <div className="mt-4 text-left">
            <p>
              <strong>Address:</strong> {user.street_address}, {user.city},{" "}
              {user.state}, {user.postal_code}
            </p>
            <p>
              <strong>Phone Number:</strong> {user.phone_number}
            </p>
          </div>
          <button
            onClick={handleEdit}
            className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}

export default UserProfileSection;
