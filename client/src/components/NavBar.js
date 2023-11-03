import React, { useState, useContext } from "react";
import UserContext from "../context/user";
import { CheckoutContext } from "../context/checkout";
import LinkButton from "./LinkButton";
import MobileMenu from "./MobileMenu";
import { FaShoppingCart, FaBars } from "react-icons/fa";

function NavBar() {
  const { user, isAdmin } = useContext(UserContext);
  const { cartItemsCount } = useContext(CheckoutContext);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const isMobile = window.innerWidth < 768;

  return (
    <nav className="bg-accent fixed w-full z-50 shadow-md transition-all duration-300 ease-in-out">
      <div className="flex items-center justify-between py-2">
        <div className="py-2 pl-2 text-center sm:text-left">
          <LinkButton
            to="/home"
            additionalStyles="font-lato text-2xl sm:text-3xl text-white hover:text-secondary hover:scale-105 transition-all duration-300 ease-in-out"
          >
            {isMobile ? "iEats" : "Infinite Eats"}
          </LinkButton>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center space-x-1 sm:space-x-2 md:space-x-4 lg:space-x-6 text-sm sm:text-base ml-auto">
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
              <LinkButton to="/signup">Sign Up</LinkButton>
            </>
          ) : (
            <div className="relative inline-block hover:scale-105 transition-transform duration-200">
              <LinkButton to="/checkout">
                <FaShoppingCart className="text-white mr-2" />
                {cartItemsCount > 0 && (
                  <span className="absolute top-5 left-5 transform translate-x-[-50%] -translate-y-[50%] bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {cartItemsCount}
                  </span>
                )}
              </LinkButton>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden py-2 pr-2 w-10 h-10 flex items-center justify-center">
          <button onClick={() => setMenuOpen(true)}>
            <FaBars size={24} className="text-white" />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <MobileMenu
          onClose={() => setMenuOpen(false)}
          user={user}
          isAdmin={isAdmin}
          cartItemsCount={cartItemsCount}
        />
      )}
    </nav>
  );
}

export default NavBar;
