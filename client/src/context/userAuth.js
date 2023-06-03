import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext({
  user: null,
  signupUser: null,
  loginUser: null,
  logoutUser: null,
  errors: null,
  showLogin: null,
});

export default UserContext;

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [errors, setErrors] = useState([]);
  const [showLogin, setShowLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        headers,
        errors,
        setErrors,
        showLogin,
        setShowLogin,
        navigate,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
