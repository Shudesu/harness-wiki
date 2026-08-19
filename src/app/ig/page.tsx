import type { Metadata } from "next";
import { DocsContents } from "@/components/article/docs-contents";
import { Sidebar } from "@/components/layout/sidebar";

export const metadata: Metadata = {
  title: "IG Harness",
  description: "IG Harness の使い方・Tips・DM自動化情報",
  alternates: { canonical: "https://harness-wiki.pages.dev/ig" },
};

export default function IgPage() {
  return (
    <div className="mx-auto flex max-w-5xl gap-8 px-4 pb-20">
      <Sidebar product="ig" />
      <div className="min-w-0 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">IG Harness</h1>
          <p className="mt-2 text-zinc-400">
            Instagram DM自動化。コメントトリガー・エンゲージメントゲート。
          </p>
          <a href="https://ig-harness.jp/research/" className="mt-3 inline-block text-sm text-cyan-400 hover:text-cyan-300">実装を検証した一次技術資料を見る →</a>
        </div>
        <DocsContents product="ig" />
      </div>
    </div>
  );
}
