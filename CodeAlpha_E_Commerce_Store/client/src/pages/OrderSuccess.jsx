import { Link } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";

export default function OrderSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-10 rounded-md shadow-sm text-center max-w-md w-full">
        
        <FiCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />

        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Order Placed Successfully
        </h1>

        <p className="text-gray-600 text-sm mb-6">
          Thank you for shopping with UrbanCart.  
          Your order will be delivered soon.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            to="/"
            className="bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition"
          >
            Continue Shopping
          </Link>

          <Link
            to="/orders"
            className="text-sm text-orange-500 hover:underline"
          >
            View My Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
