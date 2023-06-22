import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext(null);

export default UserContext;

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState([]);

  const initialUserAuthInput = {
    email: "",
    password: "",
    password_confirmation: "",
  };

  const [userAuthInput, setUserAuthInput] = useState(initialUserAuthInput);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const resetErrors = () => setErrors([]);

  const fetchCurrentUser = () => {
    setIsLoading(true);
    fetch("/api/me").then(currentUserResp);
  };

  const loginUser = (formData) => {
    setIsLoading(true);
    fetch("/api/login", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(formData),
    }).then(authResponseHandler);
  };

  const signupUser = (formData) => {
    setIsLoading(true);
    fetch("/api/signup", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(formData),
    }).then(authResponseHandler);
  };

  const logoutUser = () => {
    resetErrors();
    fetch("/api/logout", { method: "DELETE" }).then(() => {
      setUser(null);
      navigate("/login");
    });
  };

  const currentUserResp = (r) => {
    if (r.ok) {
      r.json().then((user) => {
        setUser(user);
      });
    } else {
      setUser(null);
    }
    setIsLoading(false);
  };

  const authResponseHandler = (r) => {
    if (r.ok) {
      r.json().then((user) => {
        setUser(user);
        setUserAuthInput(initialUserAuthInput);
        navigate("/landing");
      });
    } else {
      r.json().then((data) => {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors([data.error]);
        }
      });
    }
    setIsLoading(false);
  };

  const buttonClickResponseHandler = (buttonType) => {
    resetErrors();
    setUserAuthInput(initialUserAuthInput);
    navigate(buttonType === "login" ? "/login" : "/signup");
  };

  const handleUserAuthInput = (e) => {
    setUserAuthInput({
      ...userAuthInput,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        fetchCurrentUser,
        loginUser,
        signupUser,
        logoutUser,
        buttonClickResponseHandler,
        headers,
        errors,
        setErrors,
        resetErrors,
        navigate,
        isLoading,
        setIsLoading,
        userAuthInput,
        handleUserAuthInput,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
