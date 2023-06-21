import React, { Suspense, useEffect, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import UserContext from "../context/auth";
import VendorContext from "../context/vendor";

import NavBar from "./NavBar";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  String(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
);

const AsyncLandingPage = React.lazy(() => import("../pages/LandingPage"));
const AsyncAuthPage = React.lazy(() => import("../pages/AuthenticationPage"));
const AsyncFeaturesPage = React.lazy(() => import("../pages/FeaturesPage"));
const AsyncVendorsList = React.lazy(() => import("../pages/VendorsList"));
const AsyncViewVendorPage = React.lazy(() => import("../pages/ViewVendorPage"));

function App() {
  const { user, fetchCurrentUser } = useContext(UserContext);
  const { fetchVendors } = useContext(VendorContext);

  useEffect(() => {
    // check for existing user
    fetchCurrentUser();

    // fetch vendors
    fetchVendors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route exact path="/testing" element={<h1>Test Route</h1>} />
          <Route exact path="/myaccount" element={<h1>My Account Page</h1>} />
          <Route exact path="/features" element={<AsyncFeaturesPage />} />

          <Route exact path="/vendors" element={<AsyncVendorsList />} />

          <Route
            exact
            path="/vendors/:vendorId"
            element={<AsyncViewVendorPage />}
          />

          {/* test out stripe sdk */}
          <Route
            path="/checkout"
            element={
              <Elements stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            }
          />

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
