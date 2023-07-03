import React, { useContext } from "react";
import UserContext from "../context/user";
import { CheckoutContext } from "../context/checkout";
import LinkButton from "./LinkButton";
import { FaShoppingCart } from "react-icons/fa";

function NavBar() {
  const { user, isAdmin } = useContext(UserContext);
  const { cartItemsCount } = useContext(CheckoutContext);

  return (
    <nav className="bg-accent fixed w-full z-50 shadow-md transition-all duration-300 ease-in-out">
      <div className="container mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between py-2">
          <div className="text-center sm:text-left">
            <LinkButton
              to="/home"
              additionalStyles="font-lato text-2xl sm:text-3xl text-white hover:text-secondary hover:scale-105 transition-all duration-300 ease-in-out"
            >
              Infinite Eats
            </LinkButton>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4 lg:space-x-6 text-sm sm:text-base ml-auto">
            <LinkButton to="/home">Home</LinkButton>
            <LinkButton to="/features">Features</LinkButton>

            {user && (
              <>
                <LinkButton to="/fridge">Fridge</LinkButton>
                <LinkButton to="/myaccount">My Account</LinkButton>
              </>
            )}

            {user && isAdmin && <LinkButton to="/admin">Admin</LinkButton>}

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
                additionalStyles="bg-secondary relative rounded-md hover:bg-tertiary hover:text"
              >
                <FaShoppingCart />
                {cartItemsCount > 0 && (
                  <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs px-1 rounded-full">
                    {cartItemsCount}
                  </span>
                )}
              </LinkButton>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
