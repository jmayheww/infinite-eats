import React from "react";
import { Link } from "react-router-dom";

function FeaturedItemsSection() {
  return (
    <section className="bg-secondary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl text-center mx-auto">
        <h1 className="text-5xl font-extrabold text-primary mb-6">
          Featured Items
        </h1>
        <p className="text-xl text-primary mb-8">
          Here are some of our most popular items:
        </p>
        {/* Include a list or a carousel of featured items */}
        {/* Include images and short descriptions if available */}
        <Link
          to="/items"
          className="py-3 px-6 mt-8 text-white bg-primary rounded-md hover:bg-tertiary transition-colors duration-300"
        >
          Browse All Items
        </Link>
      </div>
    </section>
  );
}

export default FeaturedItemsSection;
