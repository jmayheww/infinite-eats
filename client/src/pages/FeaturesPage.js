import React from "react";
import FridgeManagementSection from "../sections/FridgeManagementSection";
import FeaturedItemSection from "../sections/FeaturedItemSection";
import FeaturedVendorSection from "../sections/FeaturedVendorSection";

function FeaturesPage() {
  return (
    <main className="pt-16 bg-primary">
      <FridgeManagementSection />
      <FeaturedItemSection />
      <FeaturedVendorSection />
    </main>
  );
}

export default FeaturesPage;
