import { useState } from "react";
import Header from "./components/Header";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Header />
      <main className="relative">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_0%,rgba(99,102,241,0.15)_0%,rgba(255,255,255,0)_60%)] dark:bg-[radial-gradient(50%_50%_at_50%_0%,rgba(99,102,241,0.2)_0%,rgba(2,6,23,0)_60%)]" />
        <div className="relative mx-auto grid max-w-5xl gap-8 px-6 pb-16">
          <PostForm onCreated={() => setRefreshKey((k) => k + 1)} />
          <div className="grid gap-4">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Latest posts</h2>
            <PostList refreshKey={refreshKey} />
          </div>
        </div>
      </main>
      <footer className="border-t border-slate-200/70 py-8 text-center text-sm text-slate-500 dark:border-slate-800/70 dark:text-slate-400">
        Built with ❤️ using React, Tailwind and FastAPI
      </footer>
    </div>
  );
}

export default App;
