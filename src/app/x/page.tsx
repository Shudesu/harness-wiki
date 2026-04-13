import type { Metadata } from "next";
import { ArticleList } from "@/components/article/article-list";
import { Sidebar } from "@/components/layout/sidebar";

export const metadata: Metadata = {
  title: "X Harness",
  description: "X Harness の使い方・Tips・エンゲージメントゲート情報",
};

export default function XPage() {
  return (
    <div className="flex gap-8">
      <Sidebar product="x" />
      <div className="min-w-0 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">X Harness</h1>
          <p className="mt-2 text-zinc-400">
            エンゲージメントゲート。いいね・RT・フォローでコンテンツ解放。
          </p>
        </div>
        <ArticleList product="x" />
      </div>
    </div>
  );
}
