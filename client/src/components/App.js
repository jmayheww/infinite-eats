import React, { Suspense, useEffect, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import UserContext from "../context/user";
import VendorContext from "../context/vendor";
import { PaymentProvider } from "../context/payment";
import NavBar from "./NavBar";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY || "");

const AsyncLandingPage = React.lazy(() => import("../pages/LandingPage"));
const AsyncAuthPage = React.lazy(() => import("../pages/AuthenticationPage"));
const AsyncFeaturesPage = React.lazy(() => import("../pages/FeaturesPage"));
const AsyncVendorsList = React.lazy(() => import("../pages/VendorsListPage"));
const AsyncViewVendorPage = React.lazy(() => import("../pages/ViewVendorPage"));
const AsyncMyAccountPage = React.lazy(() => import("../pages/MyAccountPage"));
const AsyncOrderCheckoutPage = React.lazy(() =>
  import("../pages/OrderCheckoutPage")
);
const AsyncFridgePage = React.lazy(() => import("../pages/ManageFridgePage"));
const AsyncAdminPage = React.lazy(() => import("../pages/AdminPage"));

function App() {
  const { user, fetchCurrentUser, isAdmin } = useContext(UserContext);
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
          <Route path="/home" element={<AsyncLandingPage />} />
          <Route exact path="/" element={<Navigate to="/home" replace />} />
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
                <Navigate to="/home" replace />
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

          {user && isAdmin && (
            <Route path="/admin" element={<AsyncAdminPage />} />
          )}

          {user && (
            <>
              <Route
                path="/checkout"
                element={
                  <Elements stripe={stripePromise}>
                    <AsyncOrderCheckoutPage />
                  </Elements>
                }
              />

              <Route path="/fridge" element={<AsyncFridgePage />} />
            </>
          )}
          {!user && (
            <>
              <Route exact path="/login" element={<AsyncAuthPage />} />
              <Route exact path="/signup" element={<AsyncAuthPage />} />
            </>
          )}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
