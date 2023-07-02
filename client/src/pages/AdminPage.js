import React, { useEffect, useState } from "react";

function AdminPage() {
  const [allUserOrderItems, setAllUserOrderItems] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      const response = await fetch("/api/admin");
      const data = await response.json();
      setAllUserOrderItems(data);
    };
    fetchAdminData();
  }, []);

  return (
    <div className="bg-primary min-h-screen py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-semibold mb-4 text-secondary">Admin</h1>
        <div>
          {allUserOrderItems &&
            allUserOrderItems.map((user) => (
              <div key={user.id} className="bg-white rounded-md p-4 mb-4">
                <h2 className="text-xl font-semibold mb-2 text-secondary">
                  {user.first_name} {user.last_name}
                </h2>
                <h2 className="text-xl font-semibold mb-2 text-secondary">
                  {user.email}
                </h2>
                <h2 className="text-xl font-semibold mb-2 text-secondary">
                  Purchase List:
                </h2>
                <div>
                  {user.order_items.map((orderItem) => (
                    <div key={orderItem.id} className="ml-4">
                      <h3 className="text-lg font-semibold mb-2">
                        {orderItem.name}
                      </h3>
                      <p className="mb-1">Quantity: {orderItem.quantity}</p>
                      <p className="mb-1">Price: ${orderItem.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
