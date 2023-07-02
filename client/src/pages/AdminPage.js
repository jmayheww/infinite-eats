import React, { useEffect, useState } from "react";

function AdminPage() {
  const [allVendorsProducts, setAllVendorsProducts] = useState([]);

  useEffect(() => {
    const fetchAdminData = async () => {
      const response = await fetch("/api/admin");
      const data = await response.json();
      setAllVendorsProducts(data);
    };
    fetchAdminData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold text-secondary mb-4">
        Admin Page
      </h1>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl font-extrabold text-secondary mb-4">
          All Available Products from All Vendors and Their Users
        </h2>

        <ol className="list-decimal pl-8">
          {allVendorsProducts.map((vendorsProduct) => (
            <li
              key={vendorsProduct.id}
              className="flex flex-col items-start mb-8"
            >
              <h3 className="text-xl font-bold text-secondary mb-4">
                {vendorsProduct.name}
              </h3>
              <ol className="list-decimal pl-8">
                {vendorsProduct.users.map((user, index) => (
                  <li
                    key={`${vendorsProduct.id}-${user.id}-${index}`} // Generate a unique key using vendorsProduct.id, user.id, and index
                    className="flex flex-col items-start mb-4"
                  >
                    <p className="text-secondary mb-1">
                      Name: {user.first_name} {user.last_name}
                    </p>
                    <p className="text-secondary mb-1">Email: {user.email}</p>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default AdminPage;
