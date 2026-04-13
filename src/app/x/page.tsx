import type { Metadata } from "next";
import { ArticleList } from "@/components/article/article-list";

export const metadata: Metadata = {
  title: "X Harness",
  description: "X Harness の使い方・Tips・エンゲージメントゲート情報",
};

export default function XPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">X Harness</h1>
        <p className="mt-2 text-zinc-400">
          X（Twitter）エンゲージメントゲート。いいね/RT/フォローでコンテンツ解放。
        </p>
      </div>
      <ArticleList product="x" />
    </div>
  );
}
