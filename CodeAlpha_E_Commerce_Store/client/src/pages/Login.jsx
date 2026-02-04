import { Link } from "react-router-dom";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-md shadow-sm w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Login to UrbanCart
        </h1>

        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();

            const formData = {
              email: e.target.email.value,
              password: e.target.password.value,
            };

            try {
              const res = await api.post("/auth/login", formData);
              localStorage.setItem("token", res.data.token);
              alert("Login successful");
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("isAdmin", res.data.isAdmin);
              localStorage.setItem("userEmail", res.data.email);
              navigate("/");

            } catch (err) {
              alert(err.response?.data?.message || "Error");
            }
          }}
        >

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded"
          />

          <button className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition">
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-orange-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
