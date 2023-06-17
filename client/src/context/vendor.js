import React, { createContext, useState } from "react";

const VendorContext = createContext(null);

export default VendorContext;

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const VendorProvider = ({ children }) => {
  const [vendor, setVendor] = useState(null);
  const [errors, setErrors] = useState([]);

  const fetchVendor = () => {
    fetch("/api/vendors", { headers: headers }).then((r) => {
      if (r.ok) {
        r.json().then((vendor) => setVendor(vendor));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  };

  return (
    <VendorContext.Provider
      value={{
        vendor,
        setVendor,
        fetchVendor,
        errors,
        setErrors,
      }}
    >
      {children}
    </VendorContext.Provider>
  );
};
