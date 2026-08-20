import type { Metadata } from "next";
import { ArticleList } from "@/components/article/article-list";
import { Sidebar } from "@/components/layout/sidebar";

export const metadata: Metadata = {
  title: "X Harness",
  description: "X Harness の使い方・Tips・エンゲージメントゲート情報",
  alternates: { canonical: "https://harness-wiki.pages.dev/x" },
};

export default function XPage() {
  return (
    <div className="mx-auto flex max-w-5xl gap-8 px-4 pb-20">
      <Sidebar product="x" />
      <div className="min-w-0 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">X Harness</h1>
          <p className="mt-2 text-zinc-400">
            エンゲージメントゲート。いいね・RT・フォローでコンテンツ解放。
          </p>
          <a href="https://x-harness.jp/research/" className="mt-3 inline-block text-sm text-cyan-400 hover:text-cyan-300">実装を検証した一次技術資料を見る →</a>
          <p className="mt-2 text-xs text-zinc-500">
            公式別名ドメイン: <a href="https://xharness.jp/" className="text-cyan-400 hover:text-cyan-300">xharness.jp</a>（公式製品ページへ恒久転送）
          </p>
        </div>
        <ArticleList product="x" />
      </div>
    </div>
  );
}
