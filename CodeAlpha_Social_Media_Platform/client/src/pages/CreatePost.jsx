import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function CreatePost() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please select an image");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);

    try {
      setLoading(true);
      await API.post("/posts", formData);
      navigate("/");
    } catch (error) {
      alert("Post upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-card p-6 rounded-xl shadow-card">
      <h2 className="text-xl font-bold mb-4">Create Post</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="rounded-lg max-h-80 object-cover w-full"
          />
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full text-sm"
        />

        <textarea
          placeholder="Write a caption..."
          className="w-full bg-dark border border-gray-700 rounded p-3 resize-none"
          rows={3}
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full bg-primary py-3 rounded font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Posting..." : "Post"}
        </button>

      </form>
    </div>
  );
}
