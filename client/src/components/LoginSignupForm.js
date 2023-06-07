import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import UserContext from "../context/userAuth";

function LoginSignupForm() {
  const { userAuthInput, handleUserAuthInput } = useContext(UserContext);
  const { pathname } = useLocation();

  return (
    <form className="mt-8 space-y-6">
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={`appearance-none ${
              pathname === "/signup" ? "rounded-t-md" : "rounded-t-md"
            } relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
            placeholder="Email address"
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className={`appearance-none ${
              pathname === "/signup" ? "rounded-none" : "rounded-b-md"
            } relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
            placeholder="Password"
          />
        </div>
        {pathname === "/login" ? null : (
          <div>
            <label htmlFor="password_confirmation" className="sr-only">
              Confirm Password
            </label>
            <input
              type="password"
              name="password_confirmation"
              id="password_confirmation"
              value={userAuthInput.password_confirmation}
              onChange={handleUserAuthInput}
              className={`appearance-none ${
                pathname === "/signup" ? "rounded-b-md" : "rounded-none"
              } relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
              placeholder="Confirm Password"
            />
          </div>
        )}
      </div>
    </form>
  );
}

export default LoginSignupForm;
