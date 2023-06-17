import React from "react";
import { Link } from "react-router-dom";

function VendorCard({ vendor }) {
  return (
    <Link to={`/vendors/${vendor.id}`} key={vendor.id}>
      <div className="flex flex-col items-center justify-center px-4 mb-8 bg-white shadow-lg rounded-lg">
        <img
          src={vendor.logo_image_url}
          alt={vendor.name}
          className="w-64 h-64 object-contain mb-4 rounded-full"
        />
        <h2 className="text-2xl font-bold text-primary mb-2">{vendor.name}</h2>
        <p className="text-primary mb-4">{vendor.description}</p>
      </div>
    </Link>
  );
}

export default VendorCard;
