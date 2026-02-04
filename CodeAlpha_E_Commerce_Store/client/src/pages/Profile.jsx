import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Profile() {
  const [orders, setOrders] = useState([]);
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await api.get("/orders/myorders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">

      {/* Profile Info */}
      <div className="bg-white p-6 rounded-md shadow-sm">
        <h1 className="text-2xl font-semibold mb-2">My Profile</h1>
        <p className="text-gray-600">
          <span className="font-medium">Email:</span> {userEmail}
        </p>
      </div>

      {/* Order History */}
      <div className="bg-white p-6 rounded-md shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Order History</h2>

        {orders.length === 0 ? (
          <p className="text-gray-500">No orders placed yet.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border rounded-md p-4"
              >
                {/* Order Meta */}
                <div className="flex flex-wrap justify-between text-sm mb-4">
                  <div>
                    <p className="font-medium">Order ID</p>
                    <p className="text-gray-500">{order._id}</p>
                  </div>

                  <div>
                    <p className="font-medium">Payment</p>
                    <p className="text-gray-500">
                      {order.isPaid ? "Paid" : "Cash on Delivery"}
                    </p>
                  </div>

                  <div>
                    <p className="font-medium">Total</p>
                    <p className="font-semibold text-gray-800">
                      ₹{order.totalPrice}
                    </p>
                  </div>
                </div>

                {/* Products */}
                <div className="space-y-3">
                  {order.orderItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 border p-3 rounded-md"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />

                      <div className="flex-1">
                        <p className="font-medium text-gray-800">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.qty}
                        </p>
                      </div>

                      <div className="text-sm font-medium text-gray-700">
                        ₹{item.price * item.qty}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping */}
                <div className="mt-4 text-sm text-gray-600">
                  <span className="font-medium">Shipping:</span>{" "}
                  {order.shippingAddress.address},{" "}
                  {order.shippingAddress.city} –{" "}
                  {order.shippingAddress.postalCode}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
