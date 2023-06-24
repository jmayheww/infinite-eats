import React from "react";
import { FaRegCheckCircle, FaChartPie, FaShoppingCart } from "react-icons/fa";
import FridgeFeatureCard from "../components/FridgeFeatureCard";

function FridgeManagementSection() {
  return (
    <section className="bg-primary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl text-center mx-auto">
        <h2 className="text-4xl font-extrabold text-secondary mb-6">
          Fridge Management
        </h2>
        <p className="text-xl text-secondary mb-8">
          Gain full control over your fridge inventory. With our streamlined
          fridge management tool, you can update your stock in real time and set
          up automated or custom orders. Never run out of your favorite items
          again.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <FridgeFeatureCard
            icon={
              <FaRegCheckCircle
                className="text-3xl mb-4 text-secondary"
                aria-hidden="true"
              />
            }
            title="Real-time Updates"
            description="Update and monitor your fridge inventory in real time. Always know what you have and what you need."
          />
          <FridgeFeatureCard
            icon={
              <FaChartPie
                className="text-3xl mb-4 text-secondary"
                aria-hidden="true"
              />
            }
            title="Customizable Orders"
            description="Customize your orders according to your needs. Whether you want to try something new or stock up on favorites, we've got you covered."
          />
          <FridgeFeatureCard
            icon={
              <FaShoppingCart
                className="text-3xl mb-4 text-secondary"
                aria-hidden="true"
              />
            }
            title="Automated Restocking"
            description="Let Infinite Eats handle the rest. We'll restock your fridge based on your settings."
          />
        </div>
      </div>
    </section>
  );
}

export default FridgeManagementSection;
