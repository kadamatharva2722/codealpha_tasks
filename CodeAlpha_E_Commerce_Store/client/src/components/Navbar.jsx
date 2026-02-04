import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiSearch, FiShoppingCart, FiUser, FiLogOut } from "react-icons/fi";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // ❌ Hide Navbar on auth pages
  if (
    location.pathname === "/login" ||
    location.pathname === "/register"
  ) {
    return null;
  }

  // 🔑 Auth state (always read fresh)
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-xl font-semibold text-gray-900">
          UrbanCart
        </Link>

        {/* Search */}
        <div className="hidden md:flex items-center border rounded-md px-3 py-1 w-96">
          <FiSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search products"
            className="w-full outline-none text-sm"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">

          {/* Cart */}
          <Link to="/cart" className="relative">
            <FiShoppingCart size={20} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-orange-500 text-white rounded-full px-1">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Auth */}
          {token ? (
            <div className="flex items-center gap-4">

              {/* Admin */}
              {isAdmin && (
                <Link
                  to="/admin/add-product"
                  className="text-sm font-medium text-orange-500 hover:underline"
                >
                  Admin
                </Link>
              )}

              {/* Profile */}
              <Link
                to="/profile"
                className="text-sm font-medium text-gray-700 hover:text-orange-500"
              >
                Profile
              </Link>

              {/* Logout */}
              <button
                onClick={logoutHandler}
                className="text-gray-500 hover:text-red-500"
                title="Logout"
              >
                <FiLogOut size={18} />
              </button>
            </div>
          ) : (
            <Link to="/login" title="Login">
              <FiUser size={20} />
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
}
