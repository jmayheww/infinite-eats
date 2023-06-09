import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import VendorContext from "../context/vendor";
import { OrderContext } from "../context/order";
import { SearchContext } from "../context/search";
import VendorProductCard from "../components/VendorProductCard";

function VendorProductSection() {
  const { vendors } = useContext(VendorContext);
  const { selectedProducts, addUpdateOrderItemsToCheckout, userOrders } =
    useContext(OrderContext);

  const { submitQuery, handleReset } = useContext(SearchContext);

  const { vendorId } = useParams();

  const selectedVendorProducts = vendors?.find(
    (vendor) => vendor.id === parseInt(vendorId)
  )?.vendors_products;

  const filteredProducts = selectedVendorProducts?.filter((product) => {
    const productNameCase = product?.name.toLowerCase();
    const productCategoryCase = product?.category.toLowerCase();

    const queryInputCase = submitQuery.toLowerCase();

    return (
      productNameCase.includes(queryInputCase) ||
      productCategoryCase.includes(queryInputCase)
    );
  });

  const existingCheckoutOrder = userOrders?.some((order) => {
    return order.vendor_id === parseInt(vendorId) && order.status === "pending";
  });

  const handleCheckout = () => {
    addUpdateOrderItemsToCheckout(vendorId);
  };

  return (
    <section className="bg-primary py-12 px-4 sm:px-6 lg:px-8">
      {selectedProducts?.some((p) => p.selected) && (
        <div className="flex justify-center mb-4">
          <button
            className={`py-2 px-4 rounded-lg text-sm hover:bg-accent hover:text ${
              existingCheckoutOrder
                ? "bg-yellow-400 text-black"
                : "bg-blue-500 text-white"
            }`}
            type="button"
            onClick={handleCheckout}
          >
            {existingCheckoutOrder
              ? "Update Existing Cart Selections or Add New Selections to Checkout"
              : "Add Selections to Checkout"}
          </button>
        </div>
      )}
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
      {submitQuery && (
        <div className="flex justify-center mt-6">
          <button
            className="bg-secondary text-white py-2 px-4 rounded-lg text-sm hover:bg-accent hover:text"
            type="button"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      )}
    </section>
  );
}

export default VendorProductSection;
