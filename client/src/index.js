import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "../src/components/App";
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./context/auth";
import { VendorProvider } from "./context/vendor";
import { ModalProvider } from "./context/modal";
import { SearchProvider } from "./context/search";
import { OrderProvider } from "./context/order";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <UserProvider>
      <VendorProvider>
        <ModalProvider>
          <SearchProvider>
            <OrderProvider>
              <App />
            </OrderProvider>
          </SearchProvider>
        </ModalProvider>
      </VendorProvider>
    </UserProvider>
  </Router>
);

reportWebVitals();
