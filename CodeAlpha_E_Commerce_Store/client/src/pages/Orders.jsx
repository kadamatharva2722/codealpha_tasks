import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);

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
        alert("Failed to load orders");
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-md shadow-sm p-6"
            >
              {/* Order Header */}
              <div className="flex flex-wrap justify-between mb-4 text-sm">
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
                  <p className="text-gray-700 font-semibold">
                    ₹{order.totalPrice}
                  </p>
                </div>
              </div>

              {/* Products */}
              <div className="space-y-4">
                {order.orderItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 border rounded-md p-3"
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
                        Quantity: {item.qty}
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
                <p>
                  <span className="font-medium">Shipping:</span>{" "}
                  {order.shippingAddress.address},{" "}
                  {order.shippingAddress.city} –{" "}
                  {order.shippingAddress.postalCode}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
