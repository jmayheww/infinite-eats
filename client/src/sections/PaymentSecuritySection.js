import React from "react";
import { FaLock, FaCcStripe } from "react-icons/fa";
import PaymentSecurityCard from "../components/PaymentSecurityCard";

function PaymentSecuritySection() {
  return (
    <section className="bg-accent py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl text-center mx-auto">
        <h2 className="text-4xl font-extrabold text-primary mb-6">
          Secure Payments
        </h2>
        <p className="text-xl text-primary mb-8">
          We value your trust and privacy. Our platform uses Stripe API, a
          world-class online payment processing system, to ensure all
          transactions are secured and encrypted.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <PaymentSecurityCard
            icon={
              <FaLock
                className="text-3xl mb-4 text-secondary"
                aria-hidden="true"
              />
            }
            title="Secured Transactions"
            description="All transactions are secured using the highest level of encryption. Your data is safe with us."
          />
          <PaymentSecurityCard
            icon={
              <FaCcStripe
                className="text-3xl mb-4 text-secondary"
                aria-hidden="true"
              />
            }
            title="Powered by Stripe"
            description="We use Stripe, a global leader in online payments, to handle all transactions. This ensures a smooth and secure shopping experience."
          />
        </div>
      </div>
    </section>
  );
}

export default PaymentSecuritySection;
