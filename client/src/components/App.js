import React, { Suspense, useState, useEffect, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UserContext from "../context/userAuth";

import NavBar from "./NavBar";

const AsyncLandingPage = React.lazy(() => import("../pages/LandingPage"));
const AsyncAuthPage = React.lazy(() => import("../pages/AuthenticationPage"));

function App() {
  const [count, setCount] = useState(0);
  const { user, fetchCurrentUser, isLoading } = useContext(UserContext);

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
          <Route exact path="/" element={<AsyncLandingPage />} />

          {!user && (
            <>
              <Route exact path="/login" element={<AsyncAuthPage />} />
              <Route exact path="/signup" element={<AsyncAuthPage />} />
            </>
          )}

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
