import React, { createContext, useState } from "react";

const VendorContext = createContext(null);

export default VendorContext;

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const VendorProvider = ({ children }) => {
  const [vendors, setVendors] = useState(null);
  console.log("vendor: ", vendors);
  const [errors, setErrors] = useState([]);

  const fetchVendor = () => {
    fetch("/api/vendors", { headers: headers }).then((r) => {
      if (r.ok) {
        r.json().then((vendors) => setVendors(vendors));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  };

  return (
    <VendorContext.Provider
      value={{
        vendors,
        setVendors,
        fetchVendor,
        errors,
        setErrors,
      }}
    >
      {children}
    </VendorContext.Provider>
  );
};
