import type { Metadata } from "next";
import { ArticleList } from "@/components/article/article-list";

export const metadata: Metadata = {
  title: "プラグイン",
  description: "Harness プラグインカタログ。外部サービス連携を追加。",
};

export default function PluginsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold">プラグイン</h1>
        <p className="mt-2 text-zinc-400">
          外部サービスとHarnessを繋ぐプラグイン。コミュニティが作って共有。
        </p>
      </div>

      <ArticleList category="plugins" />
    </div>
  );
}
