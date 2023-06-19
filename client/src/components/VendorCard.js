import React from "react";
import { Link } from "react-router-dom";

function FeaturedVendorCard({ vendor }) {
  return (
    <div className="flex flex-col items-center p-8 border rounded-lg shadow-lg h-full bg-secondary text-white">
      <a href={vendor.website}>
        <div className="bg-white rounded-full p-1 mb-4">
          <img
            src={vendor.logo_image_url}
            alt={vendor.name}
            className="w-32 h-32 object-contain rounded-full"
          />
        </div>
      </a>

      <p className="text-primary mb-4">{vendor.description}</p>
      <Link
        to={`/vendors/${vendor.id}`}
        className="py-2 px-6 bg-secondary text-white rounded-md hover:bg-primary hover:text-accent border border-primary transition-all duration-300"
      >
        Browse Items
      </Link>
    </div>
  );
}

export default FeaturedVendorCard;
