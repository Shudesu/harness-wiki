import Link from "next/link";
import { MessageCircle, Repeat2, Send, ArrowRight, Zap } from "lucide-react";

const products = [
  {
    name: "LINE",
    href: "/line",
    icon: MessageCircle,
    accent: "from-green-400 to-emerald-600",
    glow: "group-hover:shadow-green-500/20",
    border: "hover:border-green-500/40",
    iconColor: "text-green-400",
    tagline: "友だち管理 & 配信自動化",
    description: "Lステップ/Utageの代わり。シナリオ配信、タグ管理、リッチメニュー。",
    stat: "無料〜5,000友だち",
  },
  {
    name: "X",
    href: "/x",
    icon: Repeat2,
    accent: "from-blue-400 to-indigo-600",
    glow: "group-hover:shadow-blue-500/20",
    border: "hover:border-blue-500/40",
    iconColor: "text-blue-400",
    tagline: "エンゲージメントゲート",
    description: "いいね・RT・フォローを条件にコンテンツ解放。自動でフォロワー増加。",
    stat: "月$3〜",
  },
  {
    name: "IG",
    href: "/ig",
    icon: Send,
    accent: "from-pink-400 to-rose-600",
    glow: "group-hover:shadow-pink-500/20",
    border: "hover:border-pink-500/40",
    iconColor: "text-pink-400",
    tagline: "DM自動化",
    description: "ManyChatの代わり。コメントキーワードでDM配信、フォロワー獲得。",
    stat: "Meta API無料",
  },
] as const;

export default function Home() {
  return (
    <div className="noise-bg gradient-mesh relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-16 px-4 py-16">
      {/* Badge */}
      <div className="animate-reveal animate-reveal-1 flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-1.5 backdrop-blur-sm">
        <Zap size={12} className="text-amber-400" />
        <span className="text-xs font-medium text-zinc-400">
          100% オープンソース — サーバー代ゼロ
        </span>
      </div>

      {/* Hero */}
      <div className="animate-reveal animate-reveal-2 flex max-w-2xl flex-col items-center gap-6 text-center">
        <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-7xl">
          <span className="text-zinc-100">集客を、</span>
          <br />
          <span className="bg-gradient-to-r from-green-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
            自動化しよう
          </span>
        </h1>
        <p className="max-w-md text-lg leading-relaxed text-zinc-400">
          LINE・X・Instagram。3つのプラットフォームの
          集客と配信をオープンソースで。
        </p>
      </div>

      {/* Product Cards */}
      <div className="animate-reveal animate-reveal-3 grid w-full max-w-4xl gap-4 sm:grid-cols-3">
        {products.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className={`group relative flex flex-col gap-6 overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl ${p.glow} ${p.border}`}
          >
            {/* Top glow line */}
            <div
              className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${p.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
            />

            <div className="flex items-start justify-between">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br ${p.accent} bg-opacity-10`}
              >
                <p.icon size={20} className="text-white" />
              </div>
              <span className="rounded-md bg-zinc-800/80 px-2 py-1 text-[10px] font-medium text-zinc-500">
                {p.stat}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold tracking-tight">
                {p.name}
                <span className="ml-1.5 text-zinc-600">Harness</span>
              </h2>
              <p className={`text-sm font-semibold ${p.iconColor}`}>
                {p.tagline}
              </p>
            </div>

            <p className="text-[13px] leading-relaxed text-zinc-500">
              {p.description}
            </p>

            <div
              className={`mt-auto flex items-center gap-1.5 text-sm font-medium ${p.iconColor} translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100`}
            >
              はじめる
              <ArrowRight size={14} />
            </div>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="animate-reveal animate-reveal-4 flex flex-col items-center gap-4">
        <Link
          href="/welcome"
          className="group flex items-center gap-2.5 rounded-full bg-zinc-100 px-7 py-3.5 text-sm font-semibold text-zinc-900 transition-all hover:bg-white hover:shadow-lg hover:shadow-zinc-100/10"
        >
          はじめての方はこちら
          <ArrowRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
        <p className="text-[11px] text-zinc-600">
          Cloudflare 無料枠で動作 — クレジットカード不要
        </p>
      </div>
    </div>
  );
}
