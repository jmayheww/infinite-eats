import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VendorContext from "../context/vendor";
import { OrderContext } from "../context/order"; // import OrderContext
import { SearchContext } from "../context/search";
import VendorProductCard from "../components/VendorProductCard";

function VendorProductSection() {
  const { vendors } = useContext(VendorContext);
  const { selectedProducts } = useContext(OrderContext); // get selectedProducts from OrderContext
  const { submitQuery, handleReset } = useContext(SearchContext);
  const { vendorId } = useParams();
  const navigate = useNavigate();

  const selectedVendorProducts = vendors?.find(
    (vendor) => vendor.id === parseInt(vendorId)
  ).vendors_products;

  const filteredProducts = selectedVendorProducts?.filter((product) => {
    const productNameCase = product.name.toLowerCase();
    const productCategoryCase = product.category.toLowerCase();

    const queryInputCase = submitQuery.toLowerCase();

    return (
      productNameCase.includes(queryInputCase) ||
      productCategoryCase.includes(queryInputCase)
    );
  });

  const handleBrowseVendors = () => {
    navigate("/vendors");
  };

  const handleCheckout = () => {
    // Here you would add your functionality to add selected products to the checkout cart
    console.log("Add to checkout", selectedProducts);
  };

  return (
    <section className="bg-primary py-12 px-4 sm:px-6 lg:px-8">
      {filteredProducts?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4 justify-center">
          {filteredProducts?.map((product) => (
            <div key={product.id}>
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
      <div className="flex justify-center mt-6">
        <button
          className="bg-secondary text-white py-2 px-4 rounded-lg hover:bg-accent hover:text"
          onClick={handleBrowseVendors}
        >
          See Other Vendors
        </button>
        {submitQuery && (
          <button
            className="bg-secondary text-white py-2 px-4 rounded-lg text-sm ml-4 hover:bg-accent hover:text"
            type="button"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
        {selectedProducts?.length > 0 && ( // Show "Add All Selected to Checkout" button only when there are selected products
          <button
            className="bg-secondary text-white py-2 px-4 rounded-lg text-sm ml-4 hover:bg-accent hover:text"
            type="button"
            onClick={handleCheckout}
          >
            Add All Selected to Checkout
          </button>
        )}
      </div>
    </section>
  );
}

export default VendorProductSection;
