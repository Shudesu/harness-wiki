import type { Metadata } from "next";
import { ArticleList } from "@/components/article/article-list";

export const metadata: Metadata = {
  title: "IG Harness",
  description: "IG Harness の使い方・Tips・DM自動化情報",
};

export default function IgPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">IG Harness</h1>
        <p className="mt-2 text-zinc-400">
          Instagram DM自動化。コメントトリガー・エンゲージメントゲート・LINE連携。
        </p>
      </div>
      <ArticleList product="ig" />
    </div>
  );
}
