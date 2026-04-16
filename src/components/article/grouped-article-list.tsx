"use client";

import { useEffect, useState } from "react";
import { ArticleCard } from "./article-card";
import type { Article, Product } from "@/types";

interface GroupedArticleListProps {
  product: Product;
}

// Display order for categories. Unknown categories are appended last.
const CATEGORY_ORDER = [
  "getting-started",
  "use-cases",
  "tips",
  "plugins",
  "api",
  "changelog",
] as const;

const CATEGORY_LABELS: Record<string, string> = {
  "getting-started": "はじめに / セットアップ",
  "use-cases": "活用事例",
  tips: "Tips & 裏技",
  plugins: "プラグイン",
  api: "API リファレンス",
  changelog: "更新履歴",
};

// Pull "#N" out of titles like "... セットアップ編 #1" for series sorting.
function seriesIndex(title: string): number {
  const m = title.match(/#(\d+)/);
  return m ? Number(m[1]) : Number.POSITIVE_INFINITY;
}

function sortArticles(items: Article[]): Article[] {
  return [...items].sort((a, b) => {
    // pinned first
    if (a.status !== b.status) {
      if (a.status === "pinned") return -1;
      if (b.status === "pinned") return 1;
    }
    // series #N ascending
    const sa = seriesIndex(a.title);
    const sb = seriesIndex(b.title);
    if (sa !== sb) return sa - sb;
    // fallback: newest first
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

function groupByCategory(items: Article[]): Array<[string, Article[]]> {
  const map = new Map<string, Article[]>();
  for (const a of items) {
    const list = map.get(a.category) ?? [];
    list.push(a);
    map.set(a.category, list);
  }
  const known = CATEGORY_ORDER.filter((c) => map.has(c)).map(
    (c) => [c, sortArticles(map.get(c) ?? [])] as [string, Article[]],
  );
  const unknown = [...map.keys()]
    .filter((c) => !CATEGORY_ORDER.includes(c as (typeof CATEGORY_ORDER)[number]))
    .map((c) => [c, sortArticles(map.get(c) ?? [])] as [string, Article[]]);
  return [...known, ...unknown];
}

export function GroupedArticleList({ product }: GroupedArticleListProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/articles?product=${product}&limit=100`)
      .then((r) => r.json() as Promise<{ articles: Article[] }>)
      .then((data) => setArticles(data.articles || []))
      .finally(() => setLoading(false));
  }, [product]);

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-48 animate-pulse rounded-xl border border-zinc-800 bg-zinc-900/50"
          />
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <p className="py-12 text-center text-zinc-500">
        まだ記事がありません。最初の記事を投稿しましょう！
      </p>
    );
  }

  const groups = groupByCategory(articles);

  return (
    <div className="flex flex-col gap-10">
      {groups.map(([category, items]) => (
        <section key={category}>
          <div className="mb-4 flex items-baseline justify-between border-b border-zinc-800 pb-2">
            <h2 className="text-lg font-semibold text-zinc-100">
              {CATEGORY_LABELS[category] ?? category}
            </h2>
            <span className="text-xs text-zinc-500">{items.length} 件</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
