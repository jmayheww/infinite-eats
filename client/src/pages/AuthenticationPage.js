import { useContext } from "react";
import UserContext from "../context/userAuth";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

function AuthenticationPage() {
  const { showLogin, buttonClickResponseHandler } = useContext(UserContext);
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-8">Authentication Page</h1>

      {showLogin ? <LoginForm /> : <SignupForm />}

      <p className="text-red-600">
        {showLogin ? "Don't have an account? " : "Already have an account? "}
        <button
          className="text-blue-500 underline ml-1"
          onClick={() =>
            buttonClickResponseHandler(showLogin ? "signup" : "login")
          }
        >
          {showLogin ? "Sign Up" : "Log In"}
        </button>
      </p>
    </div>
  );
}

export default AuthenticationPage;
