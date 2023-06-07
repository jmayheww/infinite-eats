import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/userAuth";

function NavBar() {
  const { logoutUser } = useContext(UserContext);

  function handleLogout() {
    logoutUser();
  }

  return (
    <header id="header" className="bg-tertiary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-primary font-semibold">
              Infinite Eats
            </Link>
            <Link
              to="/about"
              className="ml-4 text-primary font-semibold hover:text-secondary"
            >
              About
            </Link>
            <Link
              to="/inventory"
              className="ml-4 text-primary font-semibold hover:text-secondary"
            >
              View Inventory
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              to="/login"
              className="text-primary font-semibold hover:text-secondary"
            >
              Log In
            </Link>
            <Link to="/signup" className="ml-4 btn btn--primary btn--s">
              Sign Up
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
