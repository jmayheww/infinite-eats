import React from "react";
import { Link } from "react-router-dom";
import { Element } from "react-scroll";

import WelcomeSection from "../sections/WelcomeSection";
import VendorSection from "../sections/VendorSection";

function LandingPage() {
  return (
    <div className="pt-16">
      <Element name="welcome">
        <WelcomeSection />
      </Element>
      <div className="text-center mt-8">
        <Link
          to="/vendors"
          className="text-lg text-primary hover:text-secondary"
        >
          Browse Vendors
        </Link>
      </div>
      <Element name="vendors">
        <VendorSection />
      </Element>
      <div className="text-center mt-8">
        <Link to="/items" className="text-lg text-primary hover:text-secondary">
          Browse Items
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
