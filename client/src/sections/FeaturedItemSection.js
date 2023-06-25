import React, { useContext } from "react";
import { Link } from "react-router-dom";
import VendorContext from "../context/vendor";

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
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-white mb-6">
            Best Sellers
          </h2>
          <p className="text-xl text-white mb-8">
            Discover our most popular products
          </p>
        </div>

        {bestSellingProducts?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {bestSellingProducts?.map((product) => (
              <div
                className="bg-white rounded-lg overflow-hidden shadow-md border"
                key={product.id}
              >
                <img
                  className="w-full h-48 object-cover"
                  src={product.image_url}
                  alt={product.name}
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold text-secondary mb-2">
                    {product.name}
                  </h2>
                  <p className="text-sm text-secondary mb-4">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-secondary">
                      Price: ${product.price}
                    </span>
                    {/* <Link
                      to={`/products`}
                      className="text-sm text-white bg-secondary hover:bg-primary-dark transition-colors duration-300 py-1 px-4 rounded-md"
                    >
                      View Details
                    </Link> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <p className="text-gray-300 mb-4">
              No products found. Please search again.
            </p>
          </div>
        )}

        <div className="flex justify-center mt-8">
          <Link
            to="/vendors"
            className="py-3 px-6 bg-primary text-secondary rounded-md hover:bg-secondary hover:border border-primary hover:text-white transition-colors duration-300"
          >
            See More Best Sellers &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedItemSection;
