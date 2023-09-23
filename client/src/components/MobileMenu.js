import React from "react";
import LinkButton from "./LinkButton";
import { FaShoppingCart, FaTimes } from "react-icons/fa";

function MobileMenu({ onClose, user, isAdmin, cartItemsCount }) {
  return (
    <>
      <div
        className="fixed inset-0 z-30 bg-black opacity-50"
        onClick={onClose}
      ></div>

      <div className="fixed top-0 right-0 z-40 flex flex-col bg-gradient-to-t from-accent to-secondary h-full w-4/5 max-w-md px-5 py-4 overflow-y-auto">
        <div className="flex items-start justify-between">
          <LinkButton to="/checkout" onClick={onClose} className="mt-1">
            <div className="mt-1">
              <div className="relative">
                <FaShoppingCart className="text-white text-2xl" />
                {cartItemsCount > 0 && (
                  <span className="bg-red-500 text-white text-xs px-1 rounded-full ml-2 mt-1 absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
                    {cartItemsCount}
                  </span>
                )}
              </div>
            </div>
          </LinkButton>

          <button
            onClick={onClose}
            className="text-white text-2xl hover:text-opacity-70 transition ease-in-out duration-150 mt-1"
          >
            <FaTimes />
          </button>
        </div>

        <div className="flex-grow space-y-4 mt-6">
          <LinkButton
            to="/home"
            onClick={onClose}
            additionalStyles="text-xl hover:bg-opacity-50 hover:bg-white hover:text-accent rounded px-3 py-2 transition transform hover:scale-105 block"
          >
            Home
          </LinkButton>

          <LinkButton
            to="/features"
            onClick={onClose}
            additionalStyles="text-xl hover:bg-opacity-50 hover:bg-white hover:text-accent rounded px-3 py-2 transition transform hover:scale-105 block"
          >
            Features
          </LinkButton>

          {user && (
            <>
              <LinkButton
                to="/fridge"
                onClick={onClose}
                additionalStyles="text-xl hover:bg-opacity-50 hover:bg-white hover:text-accent rounded px-3 py-2 transition transform hover:scale-105 block"
              >
                Fridge
              </LinkButton>

              <LinkButton
                to="/myaccount"
                onClick={onClose}
                additionalStyles="text-xl hover:bg-opacity-50 hover:bg-white hover:text-accent rounded px-3 py-2 transition transform hover:scale-105 block"
              >
                My Account
              </LinkButton>
            </>
          )}

          {user && isAdmin && (
            <LinkButton
              to="/admin"
              onClick={onClose}
              additionalStyles="text-xl hover:bg-opacity-50 hover:bg-white hover:text-accent rounded px-3 py-2 transition transform hover:scale-105 block"
            >
              Admin
            </LinkButton>
          )}
        </div>

        <div className="mt-4 py-2 border-t border-white">
          {!user ? (
            <>
              <LinkButton
                to="/login"
                onClick={onClose}
                additionalStyles="text-xl hover:bg-opacity-50 hover:bg-white hover:text-accent rounded px-3 py-2 transition transform hover:scale-105 block"
              >
                Log In
              </LinkButton>

              <LinkButton
                to="/signup"
                onClick={onClose}
                additionalStyles="text-xl hover:bg-opacity-50 hover:bg-white hover:text-accent rounded px-3 py-2 transition transform hover:scale-105 block"
              >
                Sign Up
              </LinkButton>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default MobileMenu;
