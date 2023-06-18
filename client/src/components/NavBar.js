import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import UserContext from "../context/auth";

function NavBar() {
  const { user, logoutUser } = useContext(UserContext);

  function handleLogout() {
    logoutUser();
  }

  return (
    <nav className="bg-accent fixed w-full z-50 shadow-md transition-all duration-300 ease-in-out">
      <div className="container mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between py-2">
          <div className="text-center sm:text-left">
            <RouterLink
              to="/"
              className="font-lato text-2xl sm:text-3xl text-primary hover:text-secondary hover:scale-105 transition-all duration-300 ease-in-out"
              aria-label="Landing"
            >
              Infinite Eats
            </RouterLink>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4 lg:space-x-6 text-sm sm:text-base">
            <RouterLink
              to="/"
              className="py-1 px-2 sm:py-2 sm:px-3 text-primary hover:text-secondary hover:scale-105 transition-all duration-300 ease-in-out"
              aria-label="Home"
            >
              Home
            </RouterLink>
            <RouterLink
              to="/features"
              className="py-1 px-2 sm:py-2 sm:px-3 text-primary hover:text-secondary hover:scale-105 transition-all duration-300 ease-in-out"
              aria-label="Features"
            >
              Features
            </RouterLink>

            <span className="border-l-2 border-primary h-5 mx-1 sm:mx-2 md:mx-4"></span>

            {!user ? (
              <>
                <RouterLink
                  to="/login"
                  className="py-1 px-2 sm:py-2 sm:px-3 text-primary hover:text-secondary hover:scale-105 transition-all duration-300 ease-in-out"
                  aria-label="Log In"
                >
                  Log In
                </RouterLink>
                <RouterLink
                  to="/signup"
                  className="py-1 px-2 sm:py-2 sm:px-3 text-white bg-secondary rounded-md hover:scale-105 transition-all duration-300 ease-in-out"
                  aria-label="Sign Up"
                >
                  Sign Up
                </RouterLink>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="py-1 px-2 sm:py-2 sm:px-3 text-white bg-accent hover:opacity-60 transition-all duration-300 ease-in-out rounded font-medium"
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
