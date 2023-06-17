import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "../src/components/App";
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./context/auth";
import { VendorProvider } from "./context/vendor";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <UserProvider>
      <VendorProvider>
        <App />
      </VendorProvider>
    </UserProvider>
  </Router>
);

reportWebVitals();
