import React from "react";
import { Element } from "react-scroll";

import WelcomeSection from "../sections/WelcomeSection";

function LandingPage() {
  return (
    <div className="pt-16">
      <Element name="welcome">
        <WelcomeSection />
      </Element>
    </div>
  );
}

export default LandingPage;
