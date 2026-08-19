import type { Metadata } from "next";
import Link from "next/link";
import { ArticleList } from "@/components/article/article-list";

export const metadata: Metadata = {
  title: "はじめに",
  description: "LINE, X, IG Harness の導入ガイド。5分でセットアップ。",
};

const products = [
  {
    name: "L Harness",
    href: "/line",
    description:
      "Lステップ/Utage代替。シナリオ配信・タグ管理・リッチメニュー。",
    color: "border-green-500/30 hover:border-green-500/60",
  },
  {
    name: "X Harness",
    href: "/x",
    description:
      "エンゲージメントゲート。いいね/RT/フォローでコンテンツ解放。",
    color: "border-blue-500/30 hover:border-blue-500/60",
  },
  {
    name: "IG Harness",
    href: "/ig",
    description:
      "Instagram DM自動化。コメントトリガー・エンゲージメントゲート。",
    color: "border-pink-500/30 hover:border-pink-500/60",
  },
] as const;

export default function GettingStartedPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-20 flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold">はじめに</h1>
        <p className="mt-2 text-zinc-400">どのHarnessから始めますか？</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {products.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className={`rounded-xl border bg-zinc-900/50 p-6 transition-colors ${p.color}`}
          >
            <h2 className="text-lg font-semibold">{p.name}</h2>
            <p className="mt-2 text-sm text-zinc-400">{p.description}</p>
          </Link>
        ))}
      </div>

      <section>
        <h2 className="mb-4 text-xl font-semibold">セットアップガイド</h2>
        <ArticleList category="getting-started" />
      </section>
    </div>
  );
}
