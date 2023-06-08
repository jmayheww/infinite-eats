import React from "react";
import { Link, useLocation } from "react-router-dom";

function MobileMenu({ closeMenu }) {
  const location = useLocation();
  const activeStyle = "border-b-2 border-accent text-accent";

  return (
    <div className="fixed top-0 right-0 h-full w-64 bg-tertiary z-40 overflow-y-auto transition-transform duration-200 ease-in-out transform translate-x-0">
      <button onClick={closeMenu} className="p-4">
        X
      </button>
      <Link
        onClick={closeMenu}
        to="/about"
        className={`block py-2 px-3 text-primary rounded hover:text-secondary transition-colors duration-300 ${
          location.pathname === "/about" ? activeStyle : ""
        }`}
      >
        About
      </Link>
      {/*...*/}
    </div>
  );
}

export default MobileMenu;
