import React from 'react';

const OrderHistory = () => {
  const orders = JSON.parse(localStorage.getItem("orderHistory")) || [];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">📜 Your Order History</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow p-4 border">
              <div className="mb-2 text-gray-700 font-semibold">Ordered on: {order.date}</div>
              <div className="mb-2 text-sm text-gray-500">
                Name: {order.user.name}, Email: {order.user.email}
              </div>
              <ul className="divide-y text-gray-800 text-sm">
                {order.items.map((item, idx) => (
                  <li key={idx} className="flex justify-between py-1">
                    <span>{item.name} × {item.quantity}</span>
                    <span>₹{item.quantity * item.price}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-2 font-bold text-right">Total: ₹{order.total}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
