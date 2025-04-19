import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, total } = location.state || { cart: [], total: 0 };

  const [isPaying, setIsPaying] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    address: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({ ...prev, [name]: value }));
  };

  const handlePayment = () => {
    setIsPaying(true);
    setTimeout(() => {
      const order = {
        id: Date.now(),
        user: userDetails,
        items: cart,
        total,
        date: new Date().toLocaleString(),
      };

      const existingOrders = JSON.parse(localStorage.getItem("orderHistory")) || [];
      const updatedOrders = [order, ...existingOrders];
      localStorage.setItem("orderHistory", JSON.stringify(updatedOrders));

      alert("Payment Successful! Thank you.");
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-8" style={{ width: '80vw', height: '70vh', overflowY: 'auto' }}>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Checkout</h2>

        {/* User Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            name="name"
            value={userDetails.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="p-3 border rounded-md w-full"
          />
          <input
            type="email"
            name="email"
            value={userDetails.email}
            onChange={handleInputChange}
            placeholder="Email Address"
            className="p-3 border rounded-md w-full"
          />
          <textarea
            name="address"
            value={userDetails.address}
            onChange={handleInputChange}
            placeholder="Delivery Address"
            rows={3}
            className="p-3 border rounded-md w-full md:col-span-2 resize-none"
          />
        </div>

        {/* Cart Summary */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Order Summary</h3>
          <ul className="divide-y border rounded-md bg-gray-50 p-4 text-sm text-gray-700 max-h-40 overflow-y-auto">
            {cart.map((item, idx) => (
              <li key={idx} className="flex justify-between py-2">
                <span>{item.name} x{item.quantity}</span>
                <span>₹{item.quantity * item.price}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-bold text-lg mt-4 px-1">
            <span>Total:</span>
            <span>₹{total}</span>
          </div>
        </div>

        {/* Pay Now Button */}
        <button
          onClick={handlePayment}
          disabled={isPaying || !userDetails.name || !userDetails.email || !userDetails.address}
          className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-200 ${
            isPaying ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isPaying ? 'Processing Payment...' : 'Pay Now'}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
