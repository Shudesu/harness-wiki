import type { Metadata } from "next";
import Link from "next/link";
import { Rocket, BookOpen, MessageSquare } from "lucide-react";
import { SITE_URL } from "@/lib/research";

export const metadata: Metadata = {
  title: "はじめての方へ",
  description: "Harness を使い始めるための最初のステップ",
  alternates: { canonical: `${SITE_URL}/welcome` },
};

const paths = [
  {
    icon: Rocket,
    title: "自分でセットアップしたい",
    description: "5分でデプロイ。コマンド1つで完了する。",
    href: "/getting-started",
    color: "border-emerald-500/30 hover:border-emerald-500 text-emerald-400",
  },
  {
    icon: BookOpen,
    title: "まず何ができるか知りたい",
    description: "LINE・X・IG それぞれの活用例を見る。",
    href: "/use-cases",
    color: "border-amber-500/30 hover:border-amber-500 text-amber-400",
  },
  {
    icon: MessageSquare,
    title: "導入を相談したい",
    description: "セットアップ代行や運用サポートについて。",
    href: "https://x.com/ai_shunoda",
    color: "border-violet-500/30 hover:border-violet-500 text-violet-400",
  },
] as const;

export default function WelcomePage() {
  return (
    <div className="mx-auto flex max-w-2xl px-4 pb-20 flex-col items-center gap-10 py-12 sm:py-20">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          あなたはどのタイプ？
        </h1>
        <p className="mt-3 text-zinc-400">
          目的に合わせて最短ルートを案内します
        </p>
      </div>

      <div className="flex w-full flex-col gap-4">
        {paths.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className={`flex items-center gap-5 rounded-2xl border bg-zinc-900/30 p-6 transition-all hover:bg-zinc-900/60 ${p.color}`}
          >
            <p.icon size={28} className="shrink-0" />
            <div>
              <h2 className="text-lg font-semibold text-zinc-100">
                {p.title}
              </h2>
              <p className="mt-1 text-sm text-zinc-400">{p.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <p className="text-center text-sm text-zinc-500">
        全てオープンソース・無料で使えます。
        <br />
        Cloudflare の無料枠で動くので、サーバー代もかかりません。
      </p>
    </div>
  );
}
