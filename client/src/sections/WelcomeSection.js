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
        {/* Features section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-6">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 border rounded-lg shadow-lg h-full">
              <h3 className="text-xl font-semibold text-primary mb-4">
                Track Inventory
              </h3>
              <p className="text-secondary">
                Know what you have in your fridge. Track and manage your
                inventory in real-time.
              </p>
            </div>
            <div className="p-8 border rounded-lg shadow-lg h-full">
              <h3 className="text-xl font-semibold text-primary mb-4">
                Access Vendors
              </h3>
              <p className="text-secondary">
                Access a wide selection of high-quality products from reputable,
                big-name vendors. Easily add stock to your fridge with
                confidence.
              </p>
            </div>
            <div className="p-8 border rounded-lg shadow-lg h-full">
              <h3 className="text-xl font-semibold text-primary mb-4">
                Restock Fridge
              </h3>
              <p className="text-secondary">
                Never run out of your favorite foods again! Customize your
                restocking preferences and let Infinite Eats handle the rest.
              </p>
            </div>
          </div>
        </section>
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
