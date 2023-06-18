import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/auth";

function WelcomeSection() {
  const { user } = useContext(UserContext);

  return (
    <div className="bg-primary min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl text-center mt-20">
        <h1 className="text-5xl font-extrabold text-secondary mb-6">
          {user?.username
            ? `Welcome, ${user?.username}!`
            : "Welcome to Infinite Eats!"}
        </h1>
        <p className="text-xl text-secondary mb-8">
          Your fridge, your way. Infinite Eats is the ultimate fridge management
          app.
        </p>
        {/* Call-to-action section */}
        {!user && (
          <section>
            <div className="flex items-center justify-center">
              <Link
                to="/signup"
                className="py-2 px-6 text-white bg-secondary border border-secondary shadow-md hover:border-accent hover:opacity-80 transition-all duration-300"
              >
                Get Started
              </Link>
              <Link
                to="/features"
                className="py-2 px-6 text-white bg-accent border border-accent shadow-md hover:border-secondary hover:opacity-80 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default WelcomeSection;
