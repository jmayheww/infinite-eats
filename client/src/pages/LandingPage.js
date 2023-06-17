import React from "react";
import { Element } from "react-scroll";

import WelcomeSection from "../sections/WelcomeSection";
import FridgeManagementSection from "../sections/FridgeManagementSection";
import FeaturedItemSection from "../sections/FeaturedItemSection";
import FeaturedVendorSection from "../sections/FeaturedVendorSection";

function LandingPage() {
  return (
    <div className="pt-16">
      <Element name="welcome">
        <WelcomeSection />
      </Element>
      <Element name="fridge-management">
        <FridgeManagementSection />
      </Element>
      <Element name="featured-items">
        <FeaturedItemSection />
      </Element>
      <Element name="featured-vendors">
        <FeaturedVendorSection />
      </Element>
    </div>
  );
}

export default LandingPage;
