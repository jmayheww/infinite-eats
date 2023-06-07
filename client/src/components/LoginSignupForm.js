import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import UserContext from "../context/userAuth";

function LoginSignupForm() {
  const { userAuthInput, handleUserAuthInput } = useContext(UserContext);
  const { pathname } = useLocation();

  return (
    <div className="auth-form">
      <form>
        <input
          type="text"
          name="email"
          value={userAuthInput.email}
          onChange={handleUserAuthInput}
        />
        <input
          type="text"
          name="password"
          value={userAuthInput.password}
          onChange={handleUserAuthInput}
        />
        {pathname === "/login" ? null : (
          <input
            type="text"
            name="password_confirmation"
            value={userAuthInput.password_confirmation}
            onChange={handleUserAuthInput}
          />
        )}
      </form>
    </div>
  );
}

export default LoginSignupForm;
