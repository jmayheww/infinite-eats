import React from "react";
import { Element } from "react-scroll";

import HomeSection from "../sections/HomeSection";
import AboutSection from "../sections/AboutSection";
import VendorSection from "../sections/VendorSection";

function LandingPage() {
  return (
    <div>
      <Element name="home">
        <HomeSection />
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
