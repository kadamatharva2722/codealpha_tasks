import { Link } from "react-router-dom";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-md shadow-sm w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Create Account
        </h1>

        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();

            const formData = {
              name: e.target.name.value,
              email: e.target.email.value,
              password: e.target.password.value,
            };

            try {
              const res = await api.post("/auth/register", formData);
              console.log("REGISTER SUCCESS:", res.data);
              alert("Registered successfully");
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("isAdmin", res.data.isAdmin);
              navigate("/");
            } catch (err) {
              alert(err.response?.data?.message || "Error");
            }
          }}
        >

          <input
            name="name"
            type="text"
            placeholder="Full Name"
            className="w-full border p-3 rounded"
          />
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
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
