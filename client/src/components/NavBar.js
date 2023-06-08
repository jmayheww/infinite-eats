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
    <div className="bg-tertiary fixed w-full border-b-2 border-primary py-2">
      <div className="px-4 md:px-8 lg:px-16 xl:px-20 mx-auto">
        <div className="flex flex-wrap justify-center md:justify-between items-center">
          <div>
            <Link
              to="/"
              className="font-lato text-3xl text-primary hover:text-secondary transition-colors duration-300"
            >
              Infinite Eats
            </Link>
          </div>

          <div className="flex items-center space-x-3 mt-4 md:mt-0 font-opensans">
            <Link
              to="/about"
              className="py-2 px-3 text-primary hover:bg-secondary hover:text-white transition-colors duration-300"
            >
              About
            </Link>
            <Link
              to="/inventory"
              className="py-2 px-3 text-primary hover:bg-secondary hover:text-white transition-colors duration-300"
            >
              View Inventory
            </Link>
            <span className="border-r-2 border-primary h-5 mx-4"></span>
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="py-2 px-3 text-primary hover:bg-secondary hover:text-white transition-colors duration-300"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="py-2 px-3 bg-accent text-white rounded-md hover:bg-secondary hover:text-white transition-colors duration-300"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <button onClick={handleLogout}>Logout</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
