export default function PostCard({ post }) {
  const date = post.created_at ? new Date(post.created_at) : null;
  const dateText = date ? date.toLocaleString() : "";

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm transition hover:shadow-md backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
          {post.title}
        </h3>
        {post.tags?.length ? (
          <div className="hidden shrink-0 gap-1 sm:flex">
            {post.tags.slice(0, 3).map((t) => (
              <span key={t} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">By {post.author}{dateText ? ` • ${dateText}` : ""}</p>
      <p className="mt-4 whitespace-pre-wrap text-slate-700 dark:text-slate-200">
        {post.content}
      </p>
      {post.tags?.length ? (
        <div className="mt-4 flex flex-wrap gap-2 sm:hidden">
          {post.tags.map((t) => (
            <span key={t} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {t}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}
