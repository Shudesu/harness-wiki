import Link from "next/link";
import type { Metadata } from "next";
import { MessageCircle, Repeat2, Send, ArrowRight, Zap, Microscope } from "lucide-react";
import { SITE_URL } from "@/lib/research";

export const metadata: Metadata = {
  alternates: { canonical: SITE_URL },
};

const products = [
  {
    name: "L",
    href: "/line",
    icon: MessageCircle,
    accent: "from-green-400 to-emerald-600",
    glow: "group-hover:shadow-green-500/20",
    border: "hover:border-green-500/40",
    iconColor: "text-green-400",
    tag: "友だち管理 & 配信",
    desc: "Lステップの代わり",
  },
  {
    name: "X",
    href: "/x",
    icon: Repeat2,
    accent: "from-blue-400 to-indigo-600",
    glow: "group-hover:shadow-blue-500/20",
    border: "hover:border-blue-500/40",
    iconColor: "text-blue-400",
    tag: "エンゲージメントゲート",
    desc: "フォロワー自動増加",
  },
  {
    name: "IG",
    href: "/ig",
    icon: Send,
    accent: "from-pink-400 to-rose-600",
    glow: "group-hover:shadow-pink-500/20",
    border: "hover:border-pink-500/40",
    iconColor: "text-pink-400",
    tag: "DM自動化",
    desc: "ManyChatの代わり",
  },
] as const;

export default function Home() {
  return (
    <div className="noise-bg gradient-mesh relative -mt-20 flex min-h-dvh flex-col items-center justify-center gap-8 px-4 py-24">
      {/* Hero — 1行 */}
      <div className="animate-reveal animate-reveal-1 flex flex-col items-center gap-3 text-center">
        <h1 className="whitespace-nowrap text-4xl font-extrabold tracking-tight sm:text-6xl">
          <span className="bg-gradient-to-r from-green-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
            集客を、自動化しよう
          </span>
        </h1>
        <p className="text-sm text-zinc-400 sm:text-base">
          LINE・X・Instagramの運用をオープンソースで。実装根拠まで公開。
        </p>
      </div>

      <Link
        href="/research"
        className="animate-reveal animate-reveal-4 group flex w-full max-w-2xl items-center justify-between rounded-xl border border-cyan-500/20 bg-cyan-500/5 px-5 py-4 transition-colors hover:border-cyan-400/50"
      >
        <span className="flex items-center gap-3">
          <Microscope size={18} className="text-cyan-400" />
          <span><span className="block text-sm font-bold text-zinc-100">一次技術資料30本</span><span className="text-xs text-zinc-500">固定Gitコミットから検証したResearch横断索引</span></span>
        </span>
        <ArrowRight size={15} className="text-cyan-400 transition-transform group-hover:translate-x-1" />
      </Link>

      {/* はじめての方 — 最も目立つ位置 */}
      <Link
        href="/welcome"
        className="animate-reveal animate-reveal-2 group flex items-center gap-2.5 rounded-full bg-zinc-100 px-8 py-3.5 text-sm font-bold text-zinc-900 transition-all hover:bg-white hover:shadow-lg hover:shadow-zinc-100/10"
      >
        はじめての方はこちら
        <ArrowRight
          size={14}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>

      {/* 3 Product Cards — コンパクト横並び */}
      <div className="animate-reveal animate-reveal-3 grid w-full max-w-2xl gap-3 sm:grid-cols-3">
        {products.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className={`group relative flex items-center gap-4 overflow-hidden rounded-xl border border-zinc-800/60 bg-zinc-900/50 px-4 py-3.5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl ${p.glow} ${p.border} sm:flex-col sm:items-start sm:gap-3 sm:p-5`}
          >
            <div
              className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${p.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
            />
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${p.accent}`}
            >
              <p.icon size={16} className="text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold">{p.name} Harness</p>
              <p className={`text-xs ${p.iconColor}`}>{p.tag}</p>
              <p className="mt-0.5 text-[11px] text-zinc-500 sm:mt-1">
                {p.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer badge */}
      <div className="animate-reveal flex items-center gap-1.5 text-[11px] text-zinc-600">
        <Zap size={10} className="text-amber-500" />
        100% オープンソース — Cloudflare無料枠で動作
      </div>
    </div>
  );
}
