import { useContext } from "react";
import { useLocation } from "react-router-dom";
import UserContext from "../context/userAuth";
import LoginSignupForm from "../components/LoginSignupForm";

function AuthenticationPage() {
  const { buttonClickResponseHandler } = useContext(UserContext);
  const { pathname } = useLocation();

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-8">Authentication Page</h1>

      <LoginSignupForm />

      <p className="text-red-600">
        {pathname === "/login"
          ? "Don't have an account? "
          : "Already have an account? "}
        <button
          className="text-blue-500 underline ml-1"
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
  );
}

export default AuthenticationPage;
