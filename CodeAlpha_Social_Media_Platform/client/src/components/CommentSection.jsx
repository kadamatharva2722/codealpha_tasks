import { useEffect, useState } from "react";
import API from "../services/api";

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const res = await API.get(`/comments/${postId}`);
        setComments(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    loadComments();
  }, [postId]);

  const submitComment = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const res = await API.post(`/comments/${postId}`, {
        text,
      });
      setComments((prev) => [...prev, res.data]);
      setText("");
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <p className="text-sm text-muted mt-2">
        Loading comments...
      </p>
    );
  }

  return (
    <div className="mt-3 space-y-2">
      {comments.map((c) => (
        <p key={c._id} className="text-sm text-gray-200">
          <span className="font-semibold mr-1">
            {c.user.username}
          </span>
          {c.text}
        </p>
      ))}

      <form onSubmit={submitComment} className="flex gap-2 mt-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 bg-dark border border-gray-700 rounded px-3 py-1 text-sm"
        />
        <button className="text-primary text-sm font-semibold">
          Post
        </button>
      </form>
    </div>
  );
}
