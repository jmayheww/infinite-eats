// FeaturesPage.js
import React from "react";
import FridgeManagementSection from "../sections/FridgeManagementSection";
import FeaturedItemSection from "../sections/FeaturedItemSection";
import FeaturedVendorSection from "../sections/FeaturedVendorSection";

function FeaturesPage() {
  return (
    <div className="pt-16">
      <FridgeManagementSection />
      <FeaturedItemSection />
      <FeaturedVendorSection />
    </div>
  );
}

export default FeaturesPage;
