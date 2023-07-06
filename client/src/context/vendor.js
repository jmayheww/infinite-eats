import React, { createContext, useState } from "react";

const VendorContext = createContext(null);

export default VendorContext;

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
export const VendorProvider = ({ children }) => {
  const [vendors, setVendors] = useState(null);

  const [selectVendor, setSelectVendor] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [errors, setErrors] = useState([]);

  const fetchVendors = () => {
    fetch("/api/vendors", { headers: headers }).then((r) => {
      if (r.ok) {
        r.json().then((vendors) => setVendors(vendors));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  };

  const findVendor = (vendorId) => {
    fetch(`/api/vendors/${vendorId}`, { headers: headers }).then((r) => {
      if (r.ok) {
        r.json().then((vendor) => setSelectVendor(vendor));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  };

  const handleImageError = () => {
    setImageLoaded(true);
  };

  return (
    <VendorContext.Provider
      value={{
        vendors,
        setVendors,
        findVendor,
        selectVendor,
        fetchVendors,
        errors,
        setErrors,
        imageLoaded,
        handleImageError,
      }}
    >
      {children}
    </VendorContext.Provider>
  );
};
