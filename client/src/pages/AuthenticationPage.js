import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import UserContext from "../context/userAuth";
import LoginSignupForm from "../components/LoginSignupForm";

function AuthenticationPage() {
  const { buttonClickResponseHandler } = useContext(UserContext);
  const { pathname } = useLocation();

  return (
    <div className="bg-teal-100 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-teal-700 mb-8 text-center">
          Authentication Page
        </h1>

        <LoginSignupForm />

        <p className="text-gray-600 text-center">
          {pathname === "/login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <button
            className="text-pink-500 underline ml-1 transition-colors duration-200 hover:text-pink-700"
            onClick={() =>
              buttonClickResponseHandler(
                pathname === "/login" ? "signup" : "login"
              )
            }
          >
            {pathname === "/login" ? "Sign Up" : "Log In"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthenticationPage;
