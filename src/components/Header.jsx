import { Rocket } from "lucide-react";

export default function Header() {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-fuchsia-500/10 to-emerald-500/20 blur-3xl" />
      <div className="relative mx-auto max-w-5xl px-6 py-12">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30">
            <Rocket className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Vibe Blog
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Share your thoughts, stories, and ideas with the world.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
