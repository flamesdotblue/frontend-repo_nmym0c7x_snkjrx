import { useState } from "react";
import { Plus } from "lucide-react";

export default function PostForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!title.trim() || !author.trim() || !content.trim()) {
      setError("Please fill in title, author and content.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          author: author.trim(),
          content: content.trim(),
          tags: tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        }),
      });
      if (!res.ok) throw new Error((await res.json()).detail || "Failed to create post");
      setTitle("");
      setAuthor("");
      setContent("");
      setTags("");
      onCreated?.();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid gap-2 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">Title</label>
            <input
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-indigo-500/20 focus:ring-4 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="A catchy blog title"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">Author</label>
            <input
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-indigo-500/20 focus:ring-4 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your name"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">Content</label>
          <textarea
            className="min-h-[120px] w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-indigo-500/20 focus:ring-4 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your story..."
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">Tags</label>
          <input
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none ring-indigo-500/20 focus:ring-4 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. design, react, tips"
          />
          <p className="mt-1 text-xs text-slate-500">Separate tags with commas.</p>
        </div>
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/50 dark:text-red-300">
            {error}
          </div>
        )}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 font-medium text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 disabled:opacity-60"
          >
            <Plus className="h-4 w-4" />
            {loading ? "Publishing..." : "Publish Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
