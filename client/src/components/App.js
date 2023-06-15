import React, { Suspense, useState, useEffect, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UserContext from "../context/userAuth";

import NavBar from "./NavBar";

const AsyncLandingPage = React.lazy(() => import("../pages/LandingPage"));
const AsyncAuthPage = React.lazy(() => import("../pages/AuthenticationPage"));

function App() {
  const [count, setCount] = useState(0);
  const { user, fetchCurrentUser, isLoading } = useContext(UserContext);
  console.log("user: ", user);

  useEffect(() => {
    fetch("/hello")
      .then((r) => r.json())
      .then((data) => setCount(data.count));

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
          <Route exact path="/about" element={<h1>About Page</h1>} />
          <Route exact path="/myaccount" element={<h1>My Account Page</h1>} />
          <Route exact path="/home" element={<AsyncHomePage />} />
          <Route exact path="/" element={<Navigate to="/home" replace />} />

          {!user && (
            <>
              <Route exact path="/login" element={<AsyncAuthPage />} />
              <Route exact path="/signup" element={<AsyncAuthPage />} />
            </>
          )}

          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
