import React from "react";
import FridgeManagementSection from "../sections/FridgeManagementSection";
import FeaturedItemSection from "../sections/FeaturedItemSection";
import FeaturedVendorSection from "../sections/FeaturedVendorSection";
import PaymentSecuritySection from "../sections/PaymentSecuritySection";

function FeaturesPage() {
  return (
    <main className="pt-16 bg-primary">
      <FridgeManagementSection />
      <PaymentSecuritySection />
      <FeaturedItemSection />
      <FeaturedVendorSection />
    </main>
  );
}

export default FeaturesPage;
