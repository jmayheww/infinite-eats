import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext(null);

export default UserContext;

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);

  const initialUserAuthInput = {
    email: "",
    password: "",
    password_confirmation: "",
  };

  const [userAuthInput, setUserAuthInput] = useState(initialUserAuthInput);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCurrentUser = () => {
    fetch("/api/me").then(currentUserResp);
  };

  const loginUser = (formData) => {
    fetch("/api/login", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(formData),
    }).then(authResponseHandler);
  };

  const signupUser = (formData) => {
    fetch("/api/signup", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(formData),
    }).then(authResponseHandler);
  };

  const logoutUser = () => {
    setErrors([]);
    fetch("/api/logout", { method: "DELETE" }).then(() => {
      setUser(null);
      navigate("/login");
    });
  };

  const currentUserResp = (r) => {
    if (r.ok) {
      r.json().then((user) => {
        console.log("user: ", user);
        setUser(user);
      });
    } else {
      setUser(null);
      navigate("/login");
    }
  };

  const authResponseHandler = (r) => {
    setIsLoading(false);
    if (r.ok) {
      r.json().then((user) => {
        console.log("user: ", user);
        setUser(user);
        setUserAuthInput(initialUserAuthInput);
        navigate("/home");
      });
    } else {
      r.json().then((data) => {
        console.log("data: ", data);
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors([data.error]);
        }
      });
    }
  };

  const buttonClickResponseHandler = (buttonType) => {
    if (buttonType === "login") {
      setErrors([]);
      navigate("/login");
    } else {
      setErrors([]);
      navigate("/signup");
    }
  };

  const handleUserAuthInput = (e) => {
    setUserAuthInput({
      ...userAuthInput,
      [e.target.name]: e.target.value,
    });
  };

  console.log(userAuthInput);

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
