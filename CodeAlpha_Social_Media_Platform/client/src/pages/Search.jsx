import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }
      try {
        setLoading(true);
        const res = await API.get(`/users/search?q=${query}`);
        setResults(res.data);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400); // debounce

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="max-w-xl mx-auto mt-6 px-4">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search users..."
        className="w-full bg-card border border-gray-700 rounded-lg px-4 py-3"
      />

      <div className="mt-4 space-y-3">
        {loading && (
          <p className="text-muted text-sm">Searching...</p>
        )}

        {!loading && query && results.length === 0 && (
          <p className="text-muted text-sm">No users found</p>
        )}

        {results.map((u) => (
          <Link
            key={u._id}
            to={`/profile/${u._id}`}
            className="flex items-center gap-3 bg-card p-3 rounded-lg hover:bg-gray-800"
          >
            <div className="w-9 h-9 rounded-full bg-primary text-dark flex items-center justify-center font-bold">
              {u.username[0].toUpperCase()}
            </div>
            <span className="font-medium">{u.username}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
