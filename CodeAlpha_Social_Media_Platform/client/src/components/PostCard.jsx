import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import CommentSection from "./CommentSection";
import API, { BASE_URL } from "../services/api";

export default function PostCard({ post, onDelete }) {
  const { user } = useAuth();

  const [likes, setLikes] = useState(post.likes.length);
  const [liked, setLiked] = useState(
    post.likes.includes(user?.id)
  );
  const [showComments, setShowComments] = useState(false);

  const handleLike = async () => {
    try {
      const res = await API.put(`/posts/like/${post._id}`);
      setLikes(res.data.likes);
      setLiked(!liked);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await API.delete(`/posts/${post._id}`);
      onDelete?.(post._id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-card overflow-hidden">
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary text-dark flex items-center justify-center font-bold">
            {post.user.username[0].toUpperCase()}
          </div>
          <span className="font-semibold text-sm">
            {post.user.username}
          </span>
        </div>

        {user?.id === post.user._id && (
          <button
            onClick={handleDelete}
            className="text-xs text-red-400 hover:text-red-500"
          >
            Delete
          </button>
        )}
      </div>

      {/* IMAGE */}
      <img
        src={`http://localhost:5000${post.image}`}
        alt="post"
        className="w-full max-h-[450px] object-cover"
      />


      {/* ACTIONS */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className={`text-sm font-semibold ${liked ? "text-red-400" : "text-gray-300"
              }`}
          >
            ❤️ {likes}
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="text-sm text-muted hover:text-white"
          >
            💬 Comments
          </button>
        </div>

        {/* CAPTION */}
        {post.caption && (
          <p className="mt-2 text-sm text-gray-200">
            <span className="font-semibold mr-1">
              {post.user.username}
            </span>
            {post.caption}
          </p>
        )}

        {/* COMMENTS */}
        {showComments && (
          <CommentSection postId={post._id} />
        )}
      </div>
    </div>
  );
}
