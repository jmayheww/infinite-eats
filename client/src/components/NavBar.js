import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import UserContext from "../context/auth";

function NavBar() {
  const { user, logoutUser } = useContext(UserContext);

  function handleLogout() {
    logoutUser();
  }

  return (
    <nav className="bg-tertiary fixed w-full border-b-2 border-primary pb-2 z-50 shadow-md">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-2">
          <div>
            <RouterLink
              to="/"
              className="font-lato text-3xl text-primary hover:text-secondary transition-all duration-300 ease-in-out"
              aria-label="Landing"
            >
              Infinite Eats
            </RouterLink>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4 lg:space-x-6 mt-4 md:mt-0 font-opensans">
            <RouterLink
              to="/"
              className="py-2 px-3 text-primary hover:bg-secondary hover:text-white transition-all duration-300 ease-in-out rounded text-sm md:text-base font-medium"
              aria-label="Home"
            >
              Home
            </RouterLink>
            <RouterLink
              to="/features"
              className="py-2 px-3 text-primary hover:bg-secondary hover:text-white transition-all duration-300 ease-in-out rounded text-sm md:text-base font-medium"
              aria-label="Features"
            >
              Features
            </RouterLink>

            <span className="border-r-2 border-primary h-5 mx-2 md:mx-4"></span>

            {!user ? (
              <>
                <RouterLink
                  to="/login"
                  className="py-2 px-3 text-primary hover:bg-secondary hover:text-white transition-all duration-300 ease-in-out rounded text-sm md:text-base font-medium"
                  aria-label="Log In"
                >
                  Log In
                </RouterLink>
                <RouterLink
                  to="/signup"
                  className="py-2 px-3 bg-accent text-white rounded-md hover:bg-secondary hover:text-white transition-all duration-300 ease-in-out text-sm md:text-base font-medium"
                  aria-label="Sign Up"
                >
                  Sign Up
                </RouterLink>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="py-2 px-3 bg-accent text-white rounded-md hover:bg-secondary hover:text-white transition-all duration-300 ease-in-out text-sm md:text-base font-medium"
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
