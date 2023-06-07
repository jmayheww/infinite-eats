import { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import UserContext from "../context/userAuth";

import AuthenticationPage from "../pages/AuthenticationPage";

function App() {
  const [count, setCount] = useState(0);
  const { user, setUser, fetchCurrentUser } = useContext(UserContext);

  useEffect(() => {
    fetch("/hello")
      .then((r) => r.json())
      .then((data) => setCount(data.count));
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<AuthenticationPage />} />
        <Route path="/signup" element={<AuthenticationPage />} />
        <Route path="/testing" element={<h1>Test Route</h1>} />
        <Route path="/" element={<h1>Page Count: {count}</h1>} />
      </Routes>
    </div>
  );
}

export default App;
