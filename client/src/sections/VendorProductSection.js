import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VendorContext from "../context/vendor";
import VendorProductCard from "../components/VendorProductCard";

function VendorProductSection() {
  const { vendors } = useContext(VendorContext);
  const { vendorId } = useParams();
  const navigate = useNavigate();

  const selectedVendorProducts = vendors?.find(
    (vendor) => vendor.id === parseInt(vendorId)
  ).vendors_products;

  const handleBrowseVendors = () => {
    navigate("/vendors");
  };

  return (
    <section className="bg-primary py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4">
        {selectedVendorProducts?.map((product) => (
          <div className="bg-white rounded-lg p-6 shadow-lg" key={product.id}>
            <VendorProductCard product={product} />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button
          className="bg-secondary text-white py-2 px-4 rounded-lg hover:bg-accent hover:text"
          onClick={handleBrowseVendors}
        >
          Other Vendors
        </button>
      </div>
    </section>
  );
}

export default VendorProductSection;
