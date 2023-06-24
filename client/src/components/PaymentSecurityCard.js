import React from "react";

function PaymentSecurityCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center p-8 border rounded-lg shadow-lg h-full bg-primary">
      {icon}
      <span className="sr-only">{title} Icon</span>
      <h3 className="text-xl font-semibold text-secondary mb-4">{title}</h3>
      <p className="text-secondary">{description}</p>
    </div>
  );
}

export default PaymentSecurityCard;
