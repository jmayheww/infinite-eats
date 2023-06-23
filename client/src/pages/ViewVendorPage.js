import React, { useEffect, useContext } from "react";
import { SearchContext } from "../context/search";
import SearchBar from "../components/SearchBar";
import ViewVendorDetailCard from "../components/ViewVendorDetailCard";
import VendorProductSection from "../sections/VendorProductSection";

function ViewVendorPage() {
  const { handleReset } = useContext(SearchContext);

  useEffect(() => {
    // reset search query on mount
    handleReset();
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
      <div>
        <VendorProductSection />
      </div>
    </main>
  );
}

export default ViewVendorPage;
