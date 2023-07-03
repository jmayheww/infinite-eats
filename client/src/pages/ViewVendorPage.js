import React, { useEffect, useContext } from "react";
import { SearchContext } from "../context/search";
import { OrderContext } from "../context/order";
import SearchBar from "../components/SearchBar";
import ViewVendorDetailCard from "../components/ViewVendorDetailCard";
import VendorProductSection from "../sections/VendorProductSection";

function ViewVendorPage() {
  const { handleReset } = useContext(SearchContext);
  const { errors, setErrors, setSelectedProducts } = useContext(OrderContext);
  const errorMessages = errors.map((error) => error.error);

  useEffect(() => {
    // reset search query on mount
    handleReset();
    setSelectedProducts([]);
    setErrors([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="bg-primary min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-t-lg overflow-hidden shadow">
        <ViewVendorDetailCard />
      </div>
      <div className="bg-white p-6 rounded-md">
        <SearchBar />
      </div>
      {errorMessages.length > 0 && (
        <div className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4">
          {errorMessages.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
      <div>
        <VendorProductSection />
      </div>
    </main>
  );
}

export default ViewVendorPage;
