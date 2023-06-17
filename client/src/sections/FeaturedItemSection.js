import React from "react";
import { Link } from "react-router-dom";

function FeaturedItemSection() {
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
        <div className="flex justify-center mt-8">
          <Link
            to="/vendors"
            className="py-3 px-6 bg-white text-primary font-bold rounded-md hover:bg-primary hover:text-white transition-colors duration-300"
          >
            Browse All Items
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedItemSection;
