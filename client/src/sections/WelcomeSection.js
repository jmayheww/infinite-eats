import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function WelcomeSection() {
  const { user } = useContext(UserContext);

  return (
    <div className="bg-primary min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-opensans">
      <div className="max-w-3xl text-center mt-20 space-y-8 z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-secondary mb-6">
          {user?.username
            ? `Welcome, ${user?.username}!`
            : "Welcome to Infinite Eats!"}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-accent">
          Your fridge, your way. Infinite Eats is the ultimate fridge management
          app.
        </p>

        {!user && (
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center justify-center mt-6">
            <Link
              to="/signup"
              className="w-full sm:w-auto py-3 px-8 text-center text-white bg-gradient-to-r from-secondary to-secondaryDark border border-secondary rounded-lg hover:from-accent hover:to-complement hover:shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
            >
              Get Started
            </Link>
            <Link
              to="/features"
              className="w-full sm:w-auto py-3 px-8 text-center text-white bg-gradient-to-r from-accent to-complement border border-accent rounded-lg hover:from-secondary hover:to-secondaryDark hover:shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
            >
              Learn More{" "}
              <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default WelcomeSection;
