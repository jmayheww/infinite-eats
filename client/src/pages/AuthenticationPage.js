import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import UserContext from "../context/userAuth";
import LoginSignupForm from "../components/LoginSignupForm";

function AuthenticationPage() {
  const { buttonClickResponseHandler } = useContext(UserContext);
  const { pathname } = useLocation();

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white shadow-lg rounded-lg p-10">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-primary">
            Sign in to your account
          </h2>
        </div>
        <LoginSignupForm />
        <div className="text-sm">
          <p className="font-medium text-center">
            {pathname === "/login"
              ? "Don't have an account?"
              : "Already have an account?"}
            <button
              onClick={() =>
                buttonClickResponseHandler(
                  pathname === "/login" ? "signup" : "login"
                )
              }
              className="text-yellow underline ml-2 hover:text-primary"
            >
              {pathname === "/login" ? "Sign Up" : "Log In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthenticationPage;
