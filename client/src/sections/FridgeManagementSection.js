import React from "react";
import { FaRegCheckCircle, FaChartPie, FaShoppingCart } from "react-icons/fa";

function FridgeManagementSection() {
  return (
    <section className="bg-primary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl text-center mx-auto">
        <h1 className="text-5xl font-extrabold text-secondary mb-6">
          Fridge Management
        </h1>
        <p className="text-xl text-secondary mb-8">
          Gain full control over your fridge inventory. With our streamlined
          fridge management tool, you can update your stock in real time and set
          up automated or custom orders. Never run out of your favorite items
          again.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex flex-col items-center p-8 border rounded-lg shadow-lg h-full bg-tertiary">
            <FaRegCheckCircle className="text-3xl mb-4 text-secondary" />
            <h3 className="text-xl font-semibold text-secondary mb-4">
              Real-time Updates
            </h3>
            <p className="text-secondary">
              Update and monitor your fridge inventory in real time. Always know
              what you have and what you need.
            </p>
          </div>
          <div className="flex flex-col items-center p-8 border rounded-lg shadow-lg h-full bg-tertiary">
            <FaChartPie className="text-3xl mb-4 text-secondary" />
            <h3 className="text-xl font-semibold text-secondary mb-4">
              Customizable Orders
            </h3>
            <p className="text-secondary">
              Customize your orders according to your needs. Whether you want to
              try something new or stock up on favorites, we've got you covered.
            </p>
          </div>
          <div className="flex flex-col items-center p-8 border rounded-lg shadow-lg h-full bg-tertiary">
            <FaShoppingCart className="text-3xl mb-4 text-secondary" />
            <h3 className="text-xl font-semibold text-secondary mb-4">
              Automated Restocking
            </h3>
            <p className="text-secondary">
              Let Infinite Eats handle the rest. We'll restock your fridge based
              on your settings.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FridgeManagementSection;
