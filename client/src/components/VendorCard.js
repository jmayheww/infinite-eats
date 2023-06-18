import React from "react";
import { Link } from "react-router-dom";

function VendorCard({ vendor }) {
  return (
    <div className="flex flex-col items-center p-8 border rounded-lg shadow-lg h-full bg-secondary text-white">
      <Link to={`/vendors/${vendor.id}`}>
        <div className="bg-white rounded-full p-1 mb-4">
          <img
            src={vendor.logo_image_url}
            alt={vendor.name}
            className="w-32 h-32 object-contain rounded-full"
          />
        </div>
      </Link>
      <h3 className="text-xl font-semibold mb-2">{vendor.name}</h3>
      <p className="text-primary mb-4">{vendor.description}</p>
      <a
        href={vendor.website}
        target="_blank"
        rel="noopener noreferrer"
        className="py-2 px-6 bg-secondary text-white rounded-md hover:bg-accent hover:text-white border border-primary transition-all duration-300"
      >
        Visit Website
      </a>
    </div>
  );
}

export default VendorCard;
