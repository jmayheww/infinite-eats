import React from "react";
import { Link as RouterLink } from "react-router-dom";

function LinkButton({ to, children, additionalStyles = "", onClick }) {
  return (
    <RouterLink
      to={to}
      className={`py-1 px-2 sm:py-2 sm:px-3 text-white hover:text-secondary hover:scale-105 transition-all duration-300 ease-in-out ${additionalStyles}`}
      aria-label={children}
      onClick={onClick}
    >
      {children}
    </RouterLink>
  );
}

export default LinkButton;
