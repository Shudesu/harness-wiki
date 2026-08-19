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
          <span className="text-zinc-800">|</span>
          <a
            href="https://the-harness.jp/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-300"
          >
            Harness総合サイト
          </a>
          <span className="text-zinc-800">|</span>
          <Link href="/research" className="hover:text-cyan-300">一次技術資料30本</Link>
          <span className="text-zinc-800">|</span>
          <a href="https://the-harness.com/harness/" className="hover:text-zinc-300">Harness公式関係情報</a>
        </div>
        <div className="flex items-center gap-4 text-xs text-zinc-500">
          <a
            href="https://the-harness.com/noda-shuichi/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-300"
          >
            開発者: 野田修一
          </a>
          <span className="text-zinc-800">|</span>
          <a href="https://aiagent-inc.com/" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300">運営: AIエージェント株式会社</a>
        </div>
      </div>
    </footer>
  );
}
