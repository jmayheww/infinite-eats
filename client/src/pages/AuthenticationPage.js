import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import UserContext from "../context/userAuth";
import LoginSignupForm from "../components/LoginSignupForm";

function AuthenticationPage() {
  const { buttonClickResponseHandler } = useContext(UserContext);
  const { pathname } = useLocation();

  return (
    <div className="bg-tertiary min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-10">
        <h2 className="text-3xl font-extrabold text-primary text-center mb-6">
          Sign in to your account
        </h2>
        <LoginSignupForm />
        <div className="mt-4 flex justify-center">
          <p className="text-sm">
            {pathname === "/login"
              ? "Don't have an account?"
              : "Already have an account?"}
            <button
              onClick={() =>
                buttonClickResponseHandler(
                  pathname === "/login" ? "signup" : "login"
                )
              }
              className="text-white bg-primary hover:bg-secondary rounded-full py-2 px-4 ml-2"
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
