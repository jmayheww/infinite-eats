import React, { Suspense, useEffect, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import UserContext from "../context/auth";
import VendorContext from "../context/vendor";

import NavBar from "./NavBar";
import { PaymentProvider } from "../context/payment";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY || "");
console.log("stripePromise: ", stripePromise);

const AsyncLandingPage = React.lazy(() => import("../pages/LandingPage"));
const AsyncAuthPage = React.lazy(() => import("../pages/AuthenticationPage"));
const AsyncFeaturesPage = React.lazy(() => import("../pages/FeaturesPage"));
const AsyncVendorsList = React.lazy(() => import("../pages/VendorsListPage"));
const AsyncViewVendorPage = React.lazy(() => import("../pages/ViewVendorPage"));
const AsyncMyAccountPage = React.lazy(() => import("../pages/MyAccountPage"));

function App() {
  const { user, fetchCurrentUser } = useContext(UserContext);
  const { fetchVendors } = useContext(VendorContext);

  useEffect(() => {
    fetchCurrentUser();
    fetchVendors();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route exact path="/testing" element={<h1>Test Route</h1>} />
          {/* conditional check for user */}
          <Route
            exact
            path="/myaccount"
            element={
              user ? (
                <Elements stripe={stripePromise}>
                  <PaymentProvider>
                    <AsyncMyAccountPage />
                  </PaymentProvider>
                </Elements>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route exact path="/features" element={<AsyncFeaturesPage />} />

          <Route exact path="/vendors" element={<AsyncVendorsList />} />

          <Route
            exact
            path="/vendors/:vendorId"
            element={<AsyncViewVendorPage />}
          />

          {/* conditional routing for checkout */}
          <Route path="/checkout" element={<h1>Checkout</h1>} />

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
