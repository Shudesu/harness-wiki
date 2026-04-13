import Link from "next/link";
import { ArrowUp, Eye } from "lucide-react";
import type { Article } from "@/types";

const productColors: Record<string, string> = {
  line: "bg-green-500/10 text-green-400 border-green-500/20",
  x: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  ig: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  all: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
};

const categoryLabels: Record<string, string> = {
  "getting-started": "はじめに",
  "use-cases": "活用事例",
  plugins: "プラグイン",
  tips: "Tips & 裏技",
  api: "API",
  changelog: "更新",
};

export function ArticleCard({ article }: { article: Article }) {
  const excerpt = article.body
    .replace(/#{1,6}\s/g, "")
    .replace(/\[.*?\]\(.*?\)/g, "")
    .replace(/[*_`~]/g, "")
    .replace(/\n+/g, " ")
    .slice(0, 120);

  return (
    <Link
      href={`/article/${article.slug}`}
      className="group flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5 transition-all hover:border-zinc-700 hover:bg-zinc-900/60 hover:shadow-lg hover:shadow-zinc-900/50"
    >
      {article.coverImage && (
        <img
          src={article.coverImage}
          alt={article.title}
          className="aspect-video w-full rounded-xl border border-zinc-800 object-cover"
          loading="lazy"
        />
      )}
      <div className="flex items-center gap-2">
        <span
          className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${productColors[article.product]}`}
        >
          {article.product.toUpperCase()}
        </span>
        <span className="text-[11px] text-zinc-500">
          {categoryLabels[article.category] || article.category}
        </span>
      </div>
      <h3 className="text-base font-semibold leading-snug text-zinc-100 group-hover:text-blue-400">
        {article.title}
      </h3>
      <p className="line-clamp-2 text-sm leading-relaxed text-zinc-500">
        {excerpt}...
      </p>
      <div className="mt-auto flex items-center gap-4 pt-2 text-xs text-zinc-500">
        <div className="flex items-center gap-1.5">
          <img
            src={article.authorAvatar}
            alt=""
            className="h-5 w-5 rounded-full"
          />
          <span>{article.authorName}</span>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <div className="flex items-center gap-1">
            <ArrowUp size={12} />
            <span>{article.upvotes}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye size={12} />
            <span>{article.viewCount}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
