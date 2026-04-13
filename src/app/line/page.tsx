import type { Metadata } from "next";
import { ArticleList } from "@/components/article/article-list";

export const metadata: Metadata = {
  title: "LINE Harness",
  description: "LINE Harness の使い方・Tips・プラグイン情報",
};

export default function LinePage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">LINE Harness</h1>
        <p className="mt-2 text-zinc-400">
          Lステップ/Utage代替のOSS CRM。シナリオ配信・タグ管理・リッチメニュー。
        </p>
      </div>
      <ArticleList product="line" />
    </div>
  );
}
