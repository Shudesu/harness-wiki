import type { Metadata } from "next";
import { DocsContents } from "@/components/article/docs-contents";
import { Sidebar } from "@/components/layout/sidebar";

export const metadata: Metadata = {
  title: "IG Harness",
  description: "IG Harness の使い方・Tips・DM自動化情報",
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
        </div>
        <DocsContents product="ig" />
      </div>
    </div>
  );
}
