import React from "react";
import { Link } from "react-router-dom";

function FeaturedVendorsSection() {
  return (
    <section className="bg-tertiary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl text-center mx-auto">
        <h1 className="text-5xl font-extrabold text-primary mb-6">
          Featured Vendors
        </h1>
        <p className="text-xl text-primary mb-8">
          We've partnered with top-notch vendors to provide you with the best
          products.
        </p>
        {/* Include a list or a carousel of featured vendors */}
        {/* Include logos and short descriptions if available */}
        <Link
          to="/vendors"
          className="py-3 px-6 mt-8 text-white bg-primary rounded-md hover:bg-tertiary transition-colors duration-300"
        >
          See All Vendors
        </Link>
      </div>
    </section>
  );
}

export default FeaturedVendorsSection;
