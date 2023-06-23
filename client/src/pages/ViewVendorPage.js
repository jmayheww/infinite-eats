import React from "react";
import SearchBar from "../components/SearchBar";
import ViewVendorDetailCard from "../components/ViewVendorDetailCard";
import VendorProductSection from "../sections/VendorProductSection";

function ViewVendorPage() {
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
