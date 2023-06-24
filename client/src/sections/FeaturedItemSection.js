import React, { useContext } from "react";
import { Link } from "react-router-dom";
import VendorContext from "../context/vendor";
import VendorProductCard from "../components/VendorProductCard";

function FeaturedItemSection() {
  const { vendors } = useContext(VendorContext);

  // Access and aggregate all vendor products
  const vendorProducts = vendors
    ?.map((vendor) => vendor.vendors_products)
    ?.flat();

  const bestSellingProducts = vendorProducts
    ?.sort((a, b) => b.total_ordered_quantity - a.total_ordered_quantity)
    .slice(0, 4);

  return (
    <section className="bg-secondary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-extrabold text-primary mb-6 text-center">
            Best Sellers
          </h2>
          <p className="text-xl text-primary mb-8 text-center">
            See our most popular products
          </p>
        </div>

        {bestSellingProducts?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {bestSellingProducts?.map((product) => (
              <div
                className="bg-white rounded-lg p-6 shadow-lg"
                key={product.id}
              >
                <VendorProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <p className="text-secondary mb-4">
              No products found. Please search again.
            </p>
          </div>
        )}
        <div className="flex justify-center mt-8">
          <Link
            to="/vendors"
            className="py-3 px-6 bg-secondary text-white rounded-md hover:bg-primary hover:text-secondary border border-primary transition-colors duration-300"
          >
            See All Best Sellers &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedItemSection;
