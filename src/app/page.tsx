import Link from "next/link";
import { MessageCircle, Repeat2, Send, ArrowRight } from "lucide-react";

const products = [
  {
    name: "LINE",
    href: "/line",
    icon: MessageCircle,
    gradient: "from-green-500/20 to-green-500/0",
    border: "border-green-500/20 hover:border-green-500/50",
    iconBg: "bg-green-500/10",
    iconColor: "text-green-400",
    tagline: "友だち管理 & 配信自動化",
    description: "Lステップ/Utageの代わり。シナリオ配信、タグ管理、リッチメニューを無料で。",
    badge: "OSS CRM",
  },
  {
    name: "X",
    href: "/x",
    icon: Repeat2,
    gradient: "from-blue-500/20 to-blue-500/0",
    border: "border-blue-500/20 hover:border-blue-500/50",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
    tagline: "エンゲージメントゲート",
    description: "いいね・RT・フォローでコンテンツ解放。月$3〜でフォロワー増加。",
    badge: "Growth Tool",
  },
  {
    name: "IG",
    href: "/ig",
    icon: Send,
    gradient: "from-pink-500/20 to-pink-500/0",
    border: "border-pink-500/20 hover:border-pink-500/50",
    iconBg: "bg-pink-500/10",
    iconColor: "text-pink-400",
    tagline: "DM自動化",
    description: "ManyChatの代わり。コメントでDM配信、フォロワー獲得を自動化。",
    badge: "DM Bot",
  },
] as const;

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-16 py-16 sm:py-24">
      {/* Hero */}
      <div className="flex flex-col items-center gap-5 text-center">
        <div className="rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1.5 text-xs font-medium text-zinc-400">
          100% オープンソース・無料
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          あなたの自動化を
          <br />
          <span className="bg-gradient-to-r from-green-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
            始めよう
          </span>
        </h1>
        <p className="max-w-lg text-lg leading-relaxed text-zinc-400">
          LINE・X・Instagram の集客と配信を
          <br className="sm:hidden" />
          オープンソースで。サーバー代ゼロ。
        </p>
      </div>

      {/* 3 Product Cards */}
      <div className="grid w-full max-w-4xl gap-5 sm:grid-cols-3">
        {products.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className={`group relative flex flex-col gap-5 overflow-hidden rounded-2xl border bg-zinc-900/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-900/50 sm:p-7 ${p.border}`}
          >
            {/* Gradient glow */}
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${p.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
            />

            {/* Content */}
            <div className="relative flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${p.iconBg}`}
                >
                  <p.icon size={24} className={p.iconColor} />
                </div>
                <span className="rounded-full border border-zinc-800 px-2.5 py-0.5 text-[10px] font-medium text-zinc-500">
                  {p.badge}
                </span>
              </div>

              <div>
                <h2 className="text-xl font-bold">{p.name} Harness</h2>
                <p className={`mt-1 text-sm font-medium ${p.iconColor}`}>
                  {p.tagline}
                </p>
              </div>

              <p className="text-sm leading-relaxed text-zinc-400">
                {p.description}
              </p>

              <div
                className={`flex items-center gap-1 text-sm font-medium ${p.iconColor} opacity-0 transition-opacity group-hover:opacity-100`}
              >
                <span>詳しく見る</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* First-timer CTA */}
      <div className="flex flex-col items-center gap-3">
        <Link
          href="/welcome"
          className="group flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-7 py-3.5 text-sm font-medium text-zinc-200 transition-all hover:border-zinc-500 hover:bg-zinc-800"
        >
          はじめての方はこちら
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
        <p className="text-xs text-zinc-600">
          Cloudflare 無料枠で動く。クレカ不要。
        </p>
      </div>
    </div>
  );
}
