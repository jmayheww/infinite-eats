import React from "react";
import { Element } from "react-scroll";

import WelcomeSection from "../sections/WelcomeSection";
import AboutSection from "../sections/AboutSection";
import VendorSection from "../sections/VendorSection";

function LandingPage() {
  return (
    <div className="pt-16">
      <Element name="welcome">
        <WelcomeSection />
      </Element>
      <Element name="about">
        <AboutSection />
      </Element>
      <Element name="vendors">
        <VendorSection />
      </Element>
    </div>
  );
}

export default LandingPage;
