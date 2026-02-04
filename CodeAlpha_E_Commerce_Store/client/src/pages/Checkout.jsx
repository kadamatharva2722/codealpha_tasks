import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-10">
      
      {/* LEFT */}
      <div className="md:col-span-2 space-y-8">

        {/* Shipping */}
        <div className="bg-white p-6 rounded-md shadow-sm">
          <h2 className="font-medium text-lg mb-4">Shipping Address</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="border p-2 rounded" placeholder="Full Name" />
            <input className="border p-2 rounded" placeholder="Phone Number" />
            <input className="border p-2 rounded md:col-span-2" placeholder="Address" />
            <input className="border p-2 rounded" placeholder="City" />
            <input className="border p-2 rounded" placeholder="Postal Code" />
          </div>
        </div>

        {/* Payment */}
        <div className="bg-white p-6 rounded-md shadow-sm">
          <h2 className="font-medium text-lg mb-4">Payment Method</h2>

          <label className="flex items-center gap-2 text-sm">
            <input type="radio" checked readOnly />
            Cash on Delivery
          </label>
        </div>
      </div>

      {/* RIGHT */}
      <div className="bg-white p-6 rounded-md shadow-sm h-fit">
        <h2 className="font-medium text-lg mb-4">Order Summary</h2>

        <div className="flex justify-between text-sm mb-2">
          <span>Subtotal</span>
          <span>₹{totalPrice}</span>
        </div>

        <div className="flex justify-between text-sm mb-2">
          <span>Shipping</span>
          <span>Free</span>
        </div>

        <div className="flex justify-between font-semibold text-lg mb-6">
          <span>Total</span>
          <span>₹{totalPrice}</span>
        </div>

        <button
          onClick={async () => {
            try {
              const token = localStorage.getItem("token");

              const orderData = {
                orderItems: cartItems.map((item) => ({
                  name: item.name,
                  qty: item.qty,
                  image: item.image,
                  price: item.price,
                  product: item._id,
                })),
                shippingAddress: {
                  address: "Pune",
                  city: "Pune",
                  postalCode: "411001",
                },
                paymentMethod: "COD",
                totalPrice,
              };

              await api.post("/orders", orderData, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

              clearCart();
              navigate("/order-success");
            } catch (err) {
              if(err.response?.data?.message=='Not authorized'){
                alert("Please login to place order");
                navigate('/login');
                return;
              }
              alert(err.response?.data?.message || "Order failed");
            }
          }}
          className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
