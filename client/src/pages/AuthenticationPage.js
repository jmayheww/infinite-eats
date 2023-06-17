import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import UserContext from "../context/userAuth";
import LoginSignupForm from "../components/LoginSignupForm";
import ErrorMessage from "../components/ErrorMessage";

function AuthenticationPage() {
  const {
    buttonClickResponseHandler,
    errors,
    resetErrors,
    isLoading,
    setIsLoading,
  } = useContext(UserContext);

  const { pathname } = useLocation();

  useEffect(() => {
    // update loading state to page loaded and reset errors
    setIsLoading(false);
    resetErrors();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div className="bg-tertiary min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-10">
        <h2 className="text-3xl font-extrabold text-primary text-center mb-6">
          {pathname === "/login" ? "Welcome Back!" : "Join Infinite Eats!"}
        </h2>
        <p className="text-center text-secondary mb-6">
          {pathname === "/login"
            ? "Access your saved inventories and continue tracking your fridge."
            : "Sign up and enjoy personalized fridge tracking, automatic inventory restocking and much more!"}
        </p>
        <LoginSignupForm />
        <div className="mt-4 flex flex-col items-center justify-center">
          <p className="text-sm text-center mb-2">
            {pathname === "/login"
              ? "New to Infinite Eats? Sign up for amazing benefits!"
              : "Already with us? Welcome back!"}
          </p>
          <button
            disabled={isLoading}
            onClick={() =>
              buttonClickResponseHandler(
                pathname === "/login" ? "signup" : "login"
              )
            }
            className="text-white bg-primary hover:bg-secondary rounded-full py-2 px-4"
          >
            {isLoading
              ? "Loading..."
              : pathname === "/login"
              ? "Sign Up"
              : "Log In"}
          </button>
        </div>
        {errors && errors.length > 0 && <ErrorMessage />}
      </div>
    </div>
  );
}

export default AuthenticationPage;
