import { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import UserContext from "../context/userAuth";

import NavBar from "./NavBar";
import AuthenticationPage from "../pages/AuthenticationPage";

function App() {
  const [count, setCount] = useState(0);
  const { user, logoutUser, fetchCurrentUser } = useContext(UserContext);
  console.log("user: ", user);

  useEffect(() => {
    fetch("/hello")
      .then((r) => r.json())
      .then((data) => setCount(data.count));

    // check for existing user
    fetchCurrentUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/login" element={<AuthenticationPage />} />
        <Route path="/signup" element={<AuthenticationPage />} />
        <Route path="/testing" element={<h1>Test Route</h1>} />
        <Route path="/home" element={<h1>Page Count: {count}</h1>} />
      </Routes>
    </div>
  );
}

export default App;
