import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "../src/components/App";
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./context/auth";
import { VendorProvider } from "./context/vendor";
import { ModalProvider } from "./context/modal";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <UserProvider>
      <VendorProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </VendorProvider>
    </UserProvider>
  </Router>
);

reportWebVitals();
