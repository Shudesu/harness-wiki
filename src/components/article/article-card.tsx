import Link from "next/link";
import { ArrowUp, Eye } from "lucide-react";
import type { Article } from "@/types";

const productColors: Record<string, string> = {
  line: "bg-green-500/10 text-green-400",
  x: "bg-blue-500/10 text-blue-400",
  ig: "bg-pink-500/10 text-pink-400",
  all: "bg-zinc-500/10 text-zinc-400",
};

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className="group flex flex-col gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition-colors hover:border-zinc-700 hover:bg-zinc-900"
    >
      {article.coverImage && (
        <img
          src={article.coverImage}
          alt={article.title}
          className="aspect-video w-full rounded-lg object-cover"
          loading="lazy"
        />
      )}
      <div className="flex items-center gap-2">
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${productColors[article.product]}`}
        >
          {article.product.toUpperCase()}
        </span>
        <span className="text-xs text-zinc-500">{article.category}</span>
      </div>
      <h3 className="font-semibold leading-snug group-hover:text-blue-400">
        {article.title}
      </h3>
      <div className="flex items-center gap-4 text-xs text-zinc-500">
        <div className="flex items-center gap-1">
          <img
            src={article.authorAvatar}
            alt=""
            className="h-4 w-4 rounded-full"
          />
          <span>{article.authorName}</span>
        </div>
        <div className="flex items-center gap-1">
          <ArrowUp size={12} />
          <span>{article.upvotes}</span>
        </div>
        <div className="flex items-center gap-1">
          <Eye size={12} />
          <span>{article.viewCount}</span>
        </div>
      </div>
    </Link>
  );
}
