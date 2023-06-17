import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/userAuth";

function WelcomeSection() {
  const { user } = useContext(UserContext);

  return (
    <div className="bg-tertiary min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl text-center mt-20">
        <h1 className="text-5xl font-extrabold text-primary mb-6">
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
            <h2 className="text-3xl font-bold text-primary mb-4">
              Get Started Today
            </h2>
            <div className="flex items-center justify-center space-x-4">
              <Link
                to="/signup"
                className="py-3 px-6 text-white bg-primary rounded-md hover:bg-secondary transition-colors duration-300"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="py-3 px-6 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors duration-300"
              >
                Log In
              </Link>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default WelcomeSection;
