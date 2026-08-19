import type { Metadata } from "next";
import { ArticleList } from "@/components/article/article-list";
import { SITE_URL } from "@/lib/research";

export const metadata: Metadata = {
  title: "プラグイン",
  description: "Harness プラグインカタログ。外部サービス連携を追加。",
  alternates: { canonical: `${SITE_URL}/plugins` },
};

export default function PluginsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-20 flex flex-col gap-8">
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
