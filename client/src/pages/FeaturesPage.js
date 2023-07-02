import React from "react";
import FridgeFeatureSection from "../sections/FridgeFeatureSection";
import FeaturedItemSection from "../sections/FeaturedItemSection";
import FeaturedVendorSection from "../sections/FeaturedVendorSection";
import PaymentSecuritySection from "../sections/PaymentSecuritySection";

function FeaturesPage() {
  return (
    <main className="pt-16 bg-primary">
      <FridgeFeatureSection />
      <PaymentSecuritySection />
      <FeaturedItemSection />
      <FeaturedVendorSection />
    </main>
  );
}

export default FeaturesPage;
