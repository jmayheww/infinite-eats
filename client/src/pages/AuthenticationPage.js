import { useContext } from "react";
import UserContext from "../context/userAuth";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

function AuthenticationPage() {
  const { showLogin, buttonClickResponseHandler } = useContext(UserContext);
  return (
    <div className="Auth">
      <h1>Authentication Page</h1>

      {showLogin ? (
        <>
          <LoginForm />

          <p>
            Don't have an account? &nbsp;
            <button onClick={() => buttonClickResponseHandler("signup")}>
              Sign Up
            </button>
          </p>
        </>
      ) : (
        <>
          <SignupForm />
          <p>
            Already have an account? &nbsp;
            <button onClick={() => buttonClickResponseHandler("login")}>
              Log In
            </button>
          </p>
        </>
      )}
    </div>
  );
}

export default AuthenticationPage;
