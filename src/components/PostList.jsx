import { useEffect, useState } from "react";
import PostCard from "./PostCard";

export default function PostList({ refreshKey }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${backendUrl}/posts`);
        if (!res.ok) throw new Error("Failed to load posts");
        const data = await res.json();
        if (mounted) setPosts(data);
      } catch (err) {
        if (mounted) setError(err.message || "Something went wrong");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [backendUrl, refreshKey]);

  if (loading) {
    return (
      <div className="grid gap-4">
        <div className="h-28 animate-pulse rounded-2xl bg-slate-200/70 dark:bg-slate-800/70" />
        <div className="h-28 animate-pulse rounded-2xl bg-slate-200/70 dark:bg-slate-800/70" />
        <div className="h-28 animate-pulse rounded-2xl bg-slate-200/70 dark:bg-slate-800/70" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/50 dark:text-amber-300">
        {error}
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white/70 p-6 text-center text-slate-500 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-400">
        No posts yet. Be the first to share something!
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {posts.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </div>
  );
}
