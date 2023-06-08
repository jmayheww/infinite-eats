import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import UserContext from "../context/userAuth";
import MobileMenu from "./MobileMenu";

function NavBar() {
  const { logoutUser } = useContext(UserContext);
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function handleLogout() {
    logoutUser();
  }

  const activeStyle = "border-b-2 border-accent text-accent";

  return (
    <div>
      <nav className="fixed top-0 w-full bg-tertiary border-b-2 border-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link
                  to="/"
                  className={`text-primary font-bold text-lg hover:text-secondary transition-colors duration-300 ${
                    location.pathname === "/" ? activeStyle : ""
                  }`}
                >
                  Infinite Eats
                </Link>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-end space-x-4">
              {/* Other links and buttons */}
            </div>
            <div className="md:hidden flex items-center">
              <div
                className="px-3 py-2 border rounded text-white border-white cursor-pointer"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                🍔
              </div>
            </div>
          </div>
        </div>
        {mobileMenuOpen && <MobileMenu />}
      </nav>
    </div>
  );
}

export default NavBar;
