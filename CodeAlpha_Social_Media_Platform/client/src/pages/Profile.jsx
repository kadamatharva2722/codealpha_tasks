import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
export default function Profile() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get(`/users/${id}`);
        setProfile(res.data);

        setIsFollowing(
          res.data.followers.some((f) => f._id === user.id)
        );

        const postRes = await API.get(`/users/${id}/posts`);
        setPosts(postRes.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, user.id]);

  const handleFollow = async () => {
    try {
      const res = await API.put(`/users/follow/${id}`);
      setIsFollowing(res.data.isFollowing);

      setProfile((prev) => ({
        ...prev,
        followers: isFollowing
          ? prev.followers.filter((f) => f._id !== user.id)
          : [...prev.followers, { _id: user.id }],
      }));
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <Loader text="Loading profile..." />;

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      {/* PROFILE HEADER */}
      <div className="flex items-center gap-6 mb-10">
        <div className="w-24 h-24 rounded-full bg-primary text-dark flex items-center justify-center text-3xl font-bold">
          {profile.username[0].toUpperCase()}
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            {profile.username}
          </h2>

          <p className="text-muted text-sm mt-1">
            {profile.bio || "No bio added"}
          </p>

          <div className="flex gap-6 mt-3 text-sm">
            <span>
              <b>{posts.length}</b> posts
            </span>
            <span>
              <b>{profile.followers.length}</b> followers
            </span>
            <span>
              <b>{profile.following.length}</b> following
            </span>
          </div>

          {user.id === id ? (
            <button
              onClick={() => navigate("/edit-profile")}
              className="mt-4 px-6 py-2 rounded bg-gray-700 hover:bg-gray-600"
            >
              Edit Profile
            </button>
          ) : (
            <button
              onClick={handleFollow}
              className={`mt-4 px-6 py-2 rounded font-medium ${isFollowing
                  ? "bg-gray-700"
                  : "bg-primary text-dark"
                }`}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
          )}

        </div>
      </div>

      {/* POSTS GRID */}
      <div className="grid grid-cols-3 gap-4">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-card rounded-lg overflow-hidden"
          >
            <img
              src={`http://localhost:5000${post.image}`}
              alt="post"
              className="aspect-square w-full object-cover"
            />

            <div className="p-2">
              <p className="text-sm text-gray-200 line-clamp-2">
                {post.caption}
              </p>
            </div>
          </div>
        ))}

        {posts.length === 0 && (
          <p className="text-muted col-span-3 text-center">
            No posts yet
          </p>
        )}
      </div>
    </div>
  );
}
