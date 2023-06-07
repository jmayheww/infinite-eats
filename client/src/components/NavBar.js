import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/userAuth";

function NavBar() {
  const { logoutUser } = useContext(UserContext);
  const navigate = useNavigate();

  function handleLogout() {
    logoutUser();
  }

  return (
    <div>
      <nav className="bg-tertiary border-b-2 border-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link
                  to="/"
                  className="text-primary font-bold text-lg hover:text-secondary"
                >
                  Infinite Eats
                </Link>
              </div>
              <div className="flex space-x-4">
                <Link to="/about" className="text-primary hover:text-secondary">
                  About
                </Link>
                <Link
                  to="/inventory"
                  className="text-primary hover:text-secondary"
                >
                  View Inventory
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="bg-primary text-white rounded-md px-4 py-2 hover:bg-secondary transition-colors duration-300"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="bg-accent text-white rounded-md px-4 py-2 hover:bg-yellow-500 transition-colors duration-300"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
