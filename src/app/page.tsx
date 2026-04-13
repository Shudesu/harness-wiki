import Link from "next/link";
import { MessageCircle, Repeat2, Send } from "lucide-react";

const products = [
  {
    name: "LINE",
    href: "/line",
    icon: MessageCircle,
    color: "border-green-500/30 hover:border-green-500 bg-green-500/5 hover:bg-green-500/10",
    iconColor: "text-green-400",
    tagline: "友だち管理 & 配信自動化",
    description: "Lステップ/Utageの代わり。シナリオ配信、タグ、リッチメニュー。",
  },
  {
    name: "X",
    href: "/x",
    icon: Repeat2,
    color: "border-blue-500/30 hover:border-blue-500 bg-blue-500/5 hover:bg-blue-500/10",
    iconColor: "text-blue-400",
    tagline: "エンゲージメントゲート",
    description: "いいね・RT・フォローでコンテンツ解放。フォロワー増加に。",
  },
  {
    name: "IG",
    href: "/ig",
    icon: Send,
    color: "border-pink-500/30 hover:border-pink-500 bg-pink-500/5 hover:bg-pink-500/10",
    iconColor: "text-pink-400",
    tagline: "DM自動化",
    description: "ManyChatの代わり。コメントでDM配信、フォロワー獲得。",
  },
] as const;

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-12 py-12 sm:py-20">
      {/* Hero */}
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
          あなたの自動化を始めよう
        </h1>
        <p className="max-w-md text-base text-zinc-400">
          LINE・X・Instagram の集客と配信を<br className="sm:hidden" />
          オープンソースで、無料で。
        </p>
      </div>

      {/* 3 Product Cards */}
      <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-3">
        {products.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className={`flex flex-col items-center gap-4 rounded-2xl border p-6 text-center transition-all sm:p-8 ${p.color}`}
          >
            <p.icon size={32} className={p.iconColor} />
            <div>
              <h2 className="text-lg font-bold">{p.name}</h2>
              <p className={`mt-1 text-sm font-medium ${p.iconColor}`}>
                {p.tagline}
              </p>
            </div>
            <p className="text-sm leading-relaxed text-zinc-400">
              {p.description}
            </p>
          </Link>
        ))}
      </div>

      {/* First-timer CTA */}
      <Link
        href="/welcome"
        className="rounded-full border border-zinc-700 bg-zinc-900 px-6 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100"
      >
        はじめての方はこちら →
      </Link>
    </div>
  );
}
