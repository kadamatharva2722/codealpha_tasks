import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t bg-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-gray-600">

        {/* Brand */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">
            UrbanCart
          </h3>
          <p className="text-gray-500">
            Smart shopping for modern living.  
            Quality products, trusted delivery.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Shop</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/products" className="hover:text-orange-500">
                All Products
              </Link>
            </li>
            <li>
              <Link to="/category/electronics" className="hover:text-orange-500">
                Electronics
              </Link>
            </li>
            <li>
              <Link to="/category/fashion" className="hover:text-orange-500">
                Fashion
              </Link>
            </li>
            <li>
              <Link to="/category/home" className="hover:text-orange-500">
                Home
              </Link>
            </li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Account</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/profile" className="hover:text-orange-500">
                My Profile
              </Link>
            </li>
            <li>
              <Link to="/orders" className="hover:text-orange-500">
                My Orders
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-orange-500">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/checkout" className="hover:text-orange-500">
                Checkout
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Support</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-orange-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-orange-500">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-orange-500">
                Register
              </Link>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t text-center text-xs text-gray-500 py-4">
        © {new Date().getFullYear()} UrbanCart. All rights reserved.
      </div>
    </footer>
  );
}
