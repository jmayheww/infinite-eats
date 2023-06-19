import React, { useContext } from "react";
import VendorContext from "../context/vendor";
import VendorCard from "../components/VendorCard";

function VendorsList() {
  const { vendors } = useContext(VendorContext);

  return (
    <main className="pt-24 bg-primary min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {" "}
      {/* Increased padding-top */}
      <div className="max-w-7xl text-center mx-auto">
        <h1 className="text-5xl font-extrabold text-secondary mb-6">
          Our Vendors
        </h1>
        <p className="text-xl text-secondary mb-8">
          Browse our range of vendors and their products.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {vendors &&
            vendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
        </div>
      </div>
    </main>
  );
}

export default VendorsList;
