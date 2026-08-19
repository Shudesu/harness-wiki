import type { Metadata } from "next";
import { ArticleList } from "@/components/article/article-list";
import { Sidebar } from "@/components/layout/sidebar";

export const metadata: Metadata = {
  title: "L Harness（LINE運用）",
  description: "L Harnessの使い方・Tips・プラグイン情報。GitHubリポジトリ名はline-harnessを継続します。",
  alternates: { canonical: "https://harness-wiki.pages.dev/line" },
};

export default function LinePage() {
  return (
    <div className="mx-auto flex max-w-5xl gap-8 px-4 pb-20">
      <Sidebar product="line" />
      <div className="min-w-0 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">L Harness</h1>
          <p className="mt-2 text-zinc-400">
            Lステップ/Utage代替のOSS。友だち管理・シナリオ配信・リッチメニュー。
          </p>
          <a href="https://line-harness.jp/research/" className="mt-3 inline-block text-sm text-cyan-400 hover:text-cyan-300">実装を検証した一次技術資料を見る →</a>
          <p className="mt-3 text-xs text-zinc-500">
            公式別名ドメイン: <a href="https://l-harness.jp/" className="text-cyan-400 hover:text-cyan-300">l-harness.jp</a> /{" "}
            <a href="https://l-harness.com/" className="text-cyan-400 hover:text-cyan-300">l-harness.com</a> /{" "}
            <a href="https://lharness.cloud/" className="text-cyan-400 hover:text-cyan-300">lharness.cloud</a>（正規製品ページへ恒久転送）
          </p>
        </div>
        <ArticleList product="line" />
      </div>
    </div>
  );
}
