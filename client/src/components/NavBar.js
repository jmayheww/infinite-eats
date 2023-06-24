import React, { useContext } from "react";
import UserContext from "../context/auth";
import LinkButton from "./LinkButton";
import { FaShoppingCart } from "react-icons/fa";

function NavBar() {
  const { user } = useContext(UserContext);

  return (
    <nav className="bg-accent fixed w-full z-50 shadow-md transition-all duration-300 ease-in-out">
      <div className="container mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between py-2">
          <div className="text-center sm:text-left">
            <LinkButton
              to="/"
              additionalStyles="font-lato text-2xl sm:text-3xl text-white hover:text-secondary hover:scale-105 transition-all duration-300 ease-in-out"
            >
              Infinite Eats
            </LinkButton>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4 lg:space-x-6 text-sm sm:text-base ml-auto">
            <LinkButton to="/">Home</LinkButton>
            <LinkButton to="/features">Features</LinkButton>

            {user && <LinkButton to="/myaccount">My Account</LinkButton>}

            <span className="border-l-2 border-white h-5 mx-1 sm:mx-2 md:mx-4"></span>

            {!user ? (
              <>
                <LinkButton to="/login">Log In</LinkButton>
                <LinkButton
                  to="/signup"
                  additionalStyles="bg-secondary rounded-md hover:bg-primary hover:text"
                >
                  Sign Up
                </LinkButton>
              </>
            ) : (
              <LinkButton
                to="/checkout"
                additionalStyles="bg-secondary rounded-md hover:bg-tertiary hover:text"
              >
                <FaShoppingCart />
              </LinkButton>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
