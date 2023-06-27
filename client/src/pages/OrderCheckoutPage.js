function OrderCheckoutPage() {
  <h1>Checkout</h1>;
}

export default OrderCheckoutPage;

// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import UserContext from "../context/auth";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";

// import { OrderContext } from "../context/order";

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

// function CheckoutPage() {
//   const { orders, updateOrder, removeOrder, checkout } =
//     useContext(OrderContext);
//   const { user } = useContext(UserContext); // Get user context
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const paymentMethodId = user.payment_method_id; // Get saved payment method id

//     if (paymentMethodId) {
//       checkout(paymentMethodId);
//       navigate("/confirmation");
//     } else {
//       // Handle situation when user doesn't have saved payment method
//     }
//   };

//   const handleRemoveOrder = (orderId) => {
//     removeOrder(orderId);
//   };

//   const handleUpdateOrder = (orderId, newQuantity) => {
//     updateOrder(orderId, newQuantity);
//   };

//   return (
//     <Elements stripe={stripePromise}>
//       <div className="checkout-page">
//         <h2>Checkout</h2>
//         <form onSubmit={handleSubmit}>
//           {orders.map((order) => (
//             <div key={order.id}>
//               <p>
//                 {order.item.name} ({order.quantity})
//               </p>
//               <button onClick={() => handleRemoveOrder(order.id)}>
//                 Remove
//               </button>
//               <input
//                 type="number"
//                 min="1"
//                 value={order.quantity}
//                 onChange={(e) => handleUpdateOrder(order.id, e.target.value)}
//               />
//             </div>
//           ))}
//           <button type="submit">Pay</button>
//         </form>
//       </div>
//     </Elements>
//   );
// }

// export default CheckoutPage;
