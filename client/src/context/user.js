import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext(null);

export default UserContext;

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const UserProvider = ({ children }) => {
  const initialUserAuthInput = {
    email: "",
    password: "",
    password_confirmation: "",
  };

  const [user, setUser] = useState({});
  const [userOrders, setUserOrders] = useState([]);
  const [userFridgeItems, setUserFridgeItems] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userAuthInput, setUserAuthInput] = useState(initialUserAuthInput);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ ...user });

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

  const updateUser = (updatedUserData) => {
    setIsLoading(true);
    fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify(updatedUserData),
    }).then(updateResponseHandler);
  };

  const deleteUser = () => {
    setIsLoading(true);
    fetch(`/api/users/${user.id}`, { method: "DELETE" }).then(() => {
      setUser(null);
      navigate("/login");
    });
  };

  const currentUserResp = (r) => {
    if (r.ok) {
      r.json().then((user) => {
        setUser(user);
        setUserOrders(user?.orders);
        setUserFridgeItems(user?.fridge_items);
        setUpdatedUser(user);

        // test inverse users - vendors db relationship
        user.email === "joshsmayhew@gmail.com"
          ? setIsAdmin(true)
          : setIsAdmin(false);
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
        setUserOrders(user?.orders);
        setUserFridgeItems(user?.fridge_items);

        // test inverse users - vendors db relationship
        user.email === "joshsmayhew@gmail.com"
          ? setIsAdmin(true)
          : setIsAdmin(false);

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

  const updateResponseHandler = (r) => {
    if (r.ok) {
      r.json().then((user) => {
        setUser(user);
        setEditMode(false);
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

  const handleProfileEdit = () => {
    resetErrors();
    setUpdatedUser({ ...user });
    setEditMode(true);
  };

  const handleCancel = () => {
    resetErrors();
    setEditMode(false);
  };

  const handleSave = () => {
    resetErrors();
    updateUser(updatedUser);
  };

  const handleProfileChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    handleSave();
  };

  return (
    <UserContext.Provider
      value={{
        user,
        userOrders,
        userFridgeItems,
        setUserFridgeItems,
        setUserOrders,
        setUser,
        isAdmin,
        fetchCurrentUser,
        loginUser,
        signupUser,
        logoutUser,
        updateUser,
        deleteUser,
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
        editMode,
        setEditMode,
        handleProfileEdit,
        handleCancel,
        handleSave,
        handleProfileChange,
        handleProfileSubmit,
        updatedUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
