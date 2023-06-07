import React, { useState, useContext } from "react";
import UserContext from "../context/userAuth";

function LoginForm() {
  const { showLogin } = useContext(UserContext);

  const initialValue = {
    email: "",
    password: "",
    password_confirmation: "",
  };

  const [userInput, setUserInput] = useState(initialValue);

  function handleInput(e) {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  }

  return (
    <div className="auth-form">
      <form>
        <input
          type="text"
          name="email"
          value={userInput.email}
          onChange={handleInput}
        />
        <input
          type="text"
          name="password"
          value={userInput.password}
          onChange={handleInput}
        />
        {showLogin ? null : (
          <input
            type="text"
            name="password_confirmation"
            value={userInput.password_confirmation}
            onChange={handleInput}
          />
        )}
      </form>
    </div>
  );
}

export default LoginForm;
