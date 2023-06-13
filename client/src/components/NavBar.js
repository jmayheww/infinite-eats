import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/userAuth";

function NavBar() {
  const { user, logoutUser } = useContext(UserContext);
  const navigate = useNavigate();

  function handleLogout() {
    logoutUser();
    navigate("/");
  }

  return (
    <nav className="bg-tertiary fixed w-full border-b-2 border-primary pb-2 z-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-2">
          <div>
            <Link
              to="/"
              className="font-lato text-3xl text-primary hover:text-secondary transition-colors duration-300"
              aria-label="Home"
            >
              Infinite Eats
            </Link>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4 lg:space-x-6 mt-4 md:mt-0 font-opensans">
            <Link
              to="/about"
              className="py-2 px-3 text-primary hover:bg-secondary hover:text-white transition-colors duration-300"
              aria-label="About"
            >
              About
            </Link>
            <Link
              to="/inventory"
              className="py-2 px-3 text-primary hover:bg-secondary hover:text-white transition-colors duration-300"
              aria-label="View Inventory"
            >
              View Inventory
            </Link>
            <span className="border-r-2 border-primary h-5 mx-2 md:mx-4"></span>
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="py-2 px-3 text-primary hover:bg-secondary hover:text-white transition-colors duration-300"
                  aria-label="Log In"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="py-2 px-3 bg-accent text-white rounded-md hover:bg-secondary hover:text-white transition-colors duration-300"
                  aria-label="Sign Up"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="py-2 px-3 bg-accent text-white rounded-md hover:bg-secondary hover:text-white transition-colors duration-300"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
