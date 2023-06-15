import React, { useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import UserContext from "../context/userAuth";

function Home() {
  return (
    <div className="bg-tertiary min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl font-extrabold text-primary mb-6">
          Welcome to Infinite Eats!
        </h1>
        <p className="text-2xl text-secondary mb-8">
          The ultimate solution for managing your fridge inventory and
          automating restocking.
        </p>
        {/* Features section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Features</h2>
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
              <h3 className="text-xl font-semibold text-primary mb-2">
                Inventory Tracking
              </h3>
              <p className="text-secondary">
                Keep track of your fridge items and easily manage your inventory
                with our intuitive tracking system.
              </p>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
              <h3 className="text-xl font-semibold text-primary mb-2">
                Automated Restocking
              </h3>
              <p className="text-secondary">
                Set up custom or automated orders to ensure your fridge is
                always stocked based on your preferences and needs.
              </p>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
              <h3 className="text-xl font-semibold text-primary mb-2">
                Meal Planning
              </h3>
              <p className="text-secondary">
                Plan your meals ahead by creating customized meal plans based on
                your available ingredients.
              </p>
            </div>
            {/* Add more feature cards as needed */}
          </div>
        </section>
        {/* Call-to-action section */}
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
      </div>
    </div>
  );
}

export default Home;
