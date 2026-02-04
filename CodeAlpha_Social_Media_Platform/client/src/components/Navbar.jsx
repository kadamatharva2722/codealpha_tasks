import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-card border-b border-gray-800 px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-primary">
        Socially
      </Link>

      {/* Right section */}
      <div className="flex items-center gap-6">
        <Link to="/search" className="hover:text-primary">
          Search
        </Link>

        {user ? (
          <>
            <Link
              to="/create"
              className="text-sm font-medium hover:text-primary"
            >
              Create
            </Link>

            <Link
              to={`/profile/${user.id}`}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-full bg-primary text-dark flex items-center justify-center font-bold">
                {user.username[0].toUpperCase()}
              </div>
              <span className="hidden sm:block text-sm">
                {user.username}
              </span>
            </Link>

            <button
              onClick={handleLogout}
              className="text-sm text-muted hover:text-red-400"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-sm text-muted hover:text-white"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-sm text-muted hover:text-white"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
