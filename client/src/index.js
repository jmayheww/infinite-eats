import React from "react";
import ReactDOM from "react-dom/client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./index.css";
import App from "../src/components/App";
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./context/user";
import { VendorProvider } from "./context/vendor";
import { ModalProvider } from "./context/modal";
import { SearchProvider } from "./context/search";
import { OrderProvider } from "./context/order";
import { PaymentProvider } from "./context/payment";
import { CheckoutProvider } from "./context/checkout";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY || "");

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
                  <CheckoutProvider>
                    <App />
                  </CheckoutProvider>
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
