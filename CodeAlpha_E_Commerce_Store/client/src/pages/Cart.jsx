import { FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const cartItems = [
    {
        _id: "1",
        name: "Wireless Headphones",
        price: 2999,
        qty: 1,
        image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80",
    },
    {
        _id: "2",
        name: "Smart Watch",
        price: 4999,
        qty: 1,
        image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30e?auto=format&fit=crop&w=200&q=80",
    },
];

export default function Cart() {
    const { cartItems, removeFromCart } = useCart();

    const total = cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
    );

    return (
        <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-10">

            {/* Cart Items */}
            <div className="md:col-span-2">
                <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>

                {cartItems.map((item) => (
                    <div
                        key={item._id}
                        className="flex items-center justify-between bg-white p-4 rounded-md shadow-sm mb-4"
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded"
                            />
                            <div>
                                <p className="font-medium text-gray-800">{item.name}</p>
                                <p className="text-gray-500 text-sm">₹{item.price}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <select className="border rounded px-2 py-1 text-sm">
                                {[1, 2, 3, 4].map((q) => (
                                    <option key={q}>{q}</option>
                                ))}
                            </select>

                            <button
                                onClick={() => removeFromCart(item._id)}
                                className="text-gray-400 hover:text-red-500"
                            >
                                <FiTrash2 />
                            </button>

                        </div>
                    </div>
                ))}
            </div>

            {/* Summary */}
            <div className="bg-white p-6 rounded-md shadow-sm h-fit">
                <h2 className="font-medium text-gray-900 mb-4">Order Summary</h2>

                <div className="flex justify-between text-sm mb-2">
                    <span>Subtotal</span>
                    <span>₹{total}</span>
                </div>

                <div className="flex justify-between text-sm mb-4">
                    <span>Shipping</span>
                    <span>Free</span>
                </div>

                <div className="flex justify-between font-semibold text-lg mb-6">
                    <span>Total</span>
                    <span>₹{total}</span>
                </div>

                <button className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition">
                    <Link to="/checkout">Proceed</Link>
                </button>
            </div>

        </div>
    );
}
