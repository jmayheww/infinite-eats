import React, { Suspense, useEffect, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UserContext from "../context/userAuth";

import NavBar from "./NavBar";

const AsyncLandingPage = React.lazy(() => import("../pages/LandingPage"));
const AsyncAuthPage = React.lazy(() => import("../pages/AuthenticationPage"));

function App() {
  const { user, fetchCurrentUser, isLoading } = useContext(UserContext);
  console.log("user: ", user);

  useEffect(() => {
    // check for existing user
    fetchCurrentUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="App">
      <NavBar />
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route exact path="/testing" element={<h1>Test Route</h1>} />
          <Route exact path="/myaccount" element={<h1>My Account Page</h1>} />
          <Route path="/landing" element={<AsyncLandingPage />} />
          <Route exact path="/" element={<Navigate to="/landing" replace />} />

          {!user && (
            <>
              <Route exact path="/login" element={<AsyncAuthPage />} />
              <Route exact path="/signup" element={<AsyncAuthPage />} />
            </>
          )}

          <Route path="*" element={<Navigate to="/landing" />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
