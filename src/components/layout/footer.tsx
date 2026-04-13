import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/50 bg-zinc-950">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-4 text-xs text-zinc-500">
          <span>&copy; {new Date().getFullYear()} Harness</span>
          <span className="text-zinc-800">|</span>
          <Link href="/article/wiki-article-guidelines" className="hover:text-zinc-300">
            記事ガイドライン
          </Link>
          <span className="text-zinc-800">|</span>
          <a
            href="https://github.com/Shudesu/harness-wiki"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-300"
          >
            GitHub
          </a>
        </div>
        <div className="flex items-center gap-4 text-xs text-zinc-500">
          <a
            href="https://x.com/ai_shunoda"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-300"
          >
            @ai_shunoda
          </a>
        </div>
      </div>
    </footer>
  );
}
