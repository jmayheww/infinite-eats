import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import UserContext from "../context/userAuth";

function ProtectedRoute({ element, ...props }) {
  const { user } = useContext(UserContext);

  return user ? (
    <Route {...props} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default ProtectedRoute;
