import React from "react";
import ReactDOM from "react-dom/client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./index.css";
import App from "../src/components/App";
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./context/auth";
import { VendorProvider } from "./context/vendor";
import { ModalProvider } from "./context/modal";
import { SearchProvider } from "./context/search";
import { OrderProvider } from "./context/order";
import { PaymentProvider } from "./context/payment";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY || "");
console.log("stripePromise: ", stripePromise);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <UserProvider>
      <VendorProvider>
        <ModalProvider>
          <SearchProvider>
            <OrderProvider>
              <Elements stripe={stripePromise}>
                <PaymentProvider>
                  <App />
                </PaymentProvider>
              </Elements>
            </OrderProvider>
          </SearchProvider>
        </ModalProvider>
      </VendorProvider>
    </UserProvider>
  </Router>
);

reportWebVitals();
