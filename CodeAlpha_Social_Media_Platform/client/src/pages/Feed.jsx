import { useEffect, useState } from "react";
import API from "../services/api";
import PostCard from "../components/PostCard";
import Loader from "../components/Loader";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadFeed = async () => {
      try {
        const res = await API.get("/posts/feed");
        if (mounted) setPosts(res.data);
      } catch (err) {
        setError("Failed to load feed");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadFeed();
    return () => (mounted = false);
  }, []);

  const handleDelete = (postId) => {
    setPosts((prev) => prev.filter((p) => p._id !== postId));
  };

  if (loading) {
    return <Loader text="Loading your feed..." />;
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto mt-10 bg-card p-6 rounded-xl text-center text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-6 space-y-6 px-2">
      {posts.length === 0 ? (
        <div className="bg-card p-6 rounded-xl text-center text-muted">
          <p className="text-lg font-semibold">Your feed is empty</p>
          <p className="text-sm mt-1">
            Follow users or create your first post.
          </p>
        </div>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}
