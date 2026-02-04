import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";

export default function EditProfile() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: user.username,
    bio: user.bio || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await API.put("/users/me", form);

      setUser((prev) => ({
        ...prev,
        username: res.data.user.username,
        bio: res.data.user.bio,
      }));

      navigate(`/profile/${user.id}`);
    } catch (err) {
      console.log(err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-card p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full bg-dark border border-gray-700 rounded px-4 py-2"
        />

        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          placeholder="Bio"
          rows="3"
          className="w-full bg-dark border border-gray-700 rounded px-4 py-2"
        />

        <button
          disabled={loading}
          className="w-full bg-primary text-dark font-semibold py-2 rounded hover:opacity-90"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
