import React, { useContext } from "react";
import VendorContext from "../context/vendor";

function FeaturedItemSection() {
  const { vendors, imageLoaded, handleImageError } = useContext(VendorContext);

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
            Featuring our top four best selling products
          </p>
        </div>

        {bestSellingProducts?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {bestSellingProducts?.map((product) => (
              <div
                className="bg-white rounded-lg overflow-hidden shadow-md border flex flex-col justify-between"
                key={product.id}
              >
                <div className="p-4">
                  <h2 className="text-lg font-bold text-secondary mb-2">
                    {product.name}
                  </h2>
                  <p className="text-sm text-secondary mb-4">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-secondary">
                      Price: ${product.price} per unit
                    </span>
                  </div>
                </div>
                <img
                  className="object-contain w-full h-auto max-h-32"
                  src={
                    imageLoaded
                      ? product.image_url
                      : "https://png.pngtree.com/element_our/png_detail/20181015/fridge-icon-design-vector-png_123657.jpg"
                  }
                  alt={product.name ? product.name : "stock fridge icon"}
                  title={product.name ? product.name : "stock fridge icon"}
                  onError={handleImageError}
                />
                {!imageLoaded && (
                  <div className="text-xs text-gray-500 p-2">
                    <a
                      href="https://pngtree.com/freepng/fridge-icon-design-vector_3659638.html?sol=downref&id=bef"
                      title="fridge icons"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Fridge icons PNG Designed By Syed Hassan from Pngtree.com
                    </a>
                  </div>
                )}
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
      </div>
    </section>
  );
}

export default FeaturedItemSection;
