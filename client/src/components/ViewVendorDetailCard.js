import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { FiMail, FiPhone, FiMapPin, FiClock, FiStar } from "react-icons/fi";
import VendorContext from "../context/vendor";

function ViewVendorDetailCard() {
  const { vendorId } = useParams();
  const { vendors } = useContext(VendorContext);

  const selectedVendor = vendors?.find((v) => v.id === parseInt(vendorId));

  if (!selectedVendor) {
    return <h1>Vendor not found!</h1>;
  }

  return (
    <header className="bg-secondary text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8 shadow-md">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        <div className="flex justify-center md:justify-start">
          <div className="bg-white rounded-full p-1 mb-4 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 flex items-center justify-center">
            <a href={selectedVendor?.website}>
              <img
                src={selectedVendor?.logo_image_url}
                alt={selectedVendor?.name}
                className="w-full h-full object-contain rounded-full bg-white"
              />
            </a>
          </div>
        </div>
        <div>
          <h1 className="text-5xl font-extrabold">{selectedVendor?.name}</h1>
          <p className="text-xl mt-2">{selectedVendor?.description}</p>
          <div className="mt-8 space-y-4">
            <div className="flex items-center">
              <FiMail className="mr-2" />
              <span className="font-bold">Email:</span>{" "}
              <span className="ml-1">{selectedVendor?.email}</span>
            </div>
            <div className="flex items-center">
              <FiPhone className="mr-2" />
              <span className="font-bold">Phone:</span>{" "}
              <span className="ml-1">{selectedVendor?.phone_number}</span>
            </div>
            <div className="flex items-center">
              <FiMapPin className="mr-2" />
              <span className="font-bold">Address:</span>{" "}
              <span className="ml-1">{`${selectedVendor?.address}, ${selectedVendor?.city}, ${selectedVendor?.state} ${selectedVendor?.zip_code}`}</span>
            </div>
            <div className="flex items-center">
              <FiClock className="mr-2" />
              <span className="font-bold">Delivery Schedule:</span>{" "}
              <span className="ml-1">{selectedVendor?.delivery_schedule}</span>
            </div>
            <div className="flex items-center">
              <FiStar className="mr-2" />
              <span className="font-bold">Average Rating:</span>{" "}
              <span className="ml-1">{selectedVendor?.average_rating}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default ViewVendorDetailCard;
