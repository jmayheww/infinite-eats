import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import UserContext from "../context/userAuth";

function LoginSignupForm() {
  const { userAuthInput, handleUserAuthInput } = useContext(UserContext);
  const { pathname } = useLocation();

  function handleFormSubmission(e) {
    e.preventDefault();
    console.log("form submitted");
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={handleFormSubmission}>
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
            onChange={handleUserAuthInput}
            className={`appearance-none ${
              pathname === "/signup" ? "rounded-t-md" : "rounded-t-md"
            } relative block w-full px-3 py-2 border border-primary placeholder-primary text-primary focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent focus:z-10 sm:text-sm font-opensans`}
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
            onChange={handleUserAuthInput}
            className={
              "relative block w-full px-3 py-2 border border-primary placeholder-primary text-primary focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent focus:z-10 sm:text-sm font-opensans"
            }
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
              className={
                "relative block w-full px-3 py-2 border border-primary placeholder-primary text-primary focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent focus:z-10 sm:text-sm font-opensans"
              }
              placeholder="Confirm Password"
            />
          </div>
        )}
        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-primary rounded-b-md text-sm font-opensans text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
          >
            {pathname === "/login" ? "Log In" : "Sign Up"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default LoginSignupForm;
