import type { Metadata } from "next";
import { ArticleList } from "@/components/article/article-list";
import { Sidebar } from "@/components/layout/sidebar";

export const metadata: Metadata = {
  title: "LINE Harness",
  description: "LINE Harness の使い方・Tips・プラグイン情報",
};

export default function LinePage() {
  return (
    <div className="flex gap-8">
      <Sidebar product="line" />
      <div className="min-w-0 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">LINE Harness</h1>
          <p className="mt-2 text-zinc-400">
            Lステップ/Utage代替のOSS。友だち管理・シナリオ配信・リッチメニュー。
          </p>
        </div>
        <ArticleList product="line" />
      </div>
    </div>
  );
}
