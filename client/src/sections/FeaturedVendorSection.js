import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import VendorContext from "../context/vendor";
import VendorCard from "../components/VendorCard";

function FeaturedVendorSection() {
  const { vendors, fetchVendor } = useContext(VendorContext);

  useEffect(() => {
    fetchVendor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="bg-tertiary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-extrabold text-secondary mb-6 text-center">
          Featured Vendors
        </h1>
        <p className="text-xl text-secondary mb-8 text-center">
          We've partnered with top-notch vendors to provide you with the best
          products.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {vendors &&
            vendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link
            to="/vendors"
            className="py-3 px-6 bg-secondary text-white rounded-md hover:bg-accent hover:text-white border border-primary transition-all duration-300"
          >
            See All Vendors
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedVendorSection;
