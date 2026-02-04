import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate("/");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-card p-8 rounded-xl shadow-card w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6">Register</h2>

        <input
          placeholder="Username"
          className="w-full mb-4 p-3 rounded bg-dark border border-gray-700"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 rounded bg-dark border border-gray-700"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 rounded bg-dark border border-gray-700"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-primary py-3 rounded font-semibold">
          Register
        </button>

        <p className="text-muted mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-primary">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
