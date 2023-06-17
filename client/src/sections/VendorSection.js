import React from "react";
import { Link } from "react-router-dom";

function VendorSection() {
  return (
    <section className="bg-primary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl text-center mt-20 mx-auto">
        <h1 className="text-5xl font-extrabold text-white mb-6">
          Featured Vendors
        </h1>
        <p className="text-xl text-white mb-8">
          Here are some of our most popular vendors:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-8 border rounded-lg shadow-lg h-full">
            <h3 className="text-xl font-semibold text-white mb-4">
              Vendor Name 1
            </h3>
            <p className="text-white">Short description about vendor 1.</p>
          </div>
          <div className="p-8 border rounded-lg shadow-lg h-full">
            <h3 className="text-xl font-semibold text-white mb-4">
              Vendor Name 2
            </h3>
            <p className="text-white">Short description about vendor 2.</p>
          </div>
          <div className="p-8 border rounded-lg shadow-lg h-full">
            <h3 className="text-xl font-semibold text-white mb-4">
              Vendor Name 3
            </h3>
            <p className="text-white">Short description about vendor 3.</p>
          </div>
        </div>

        <Link
          to="/vendors"
          className="py-3 px-6 mt-8 text-white bg-secondary rounded-md hover:bg-tertiary transition-colors duration-300"
        >
          View All Vendors
        </Link>
      </div>
    </section>
  );
}

export default VendorSection;
