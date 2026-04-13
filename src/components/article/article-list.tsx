"use client";

import { useEffect, useState } from "react";
import { ArticleCard } from "./article-card";
import type { Article, Product, Category } from "@/types";

interface ArticleListProps {
  product?: Product;
  category?: Category;
  maxItems?: number;
}

export function ArticleList({ product, category, maxItems }: ArticleListProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (product) params.set("product", product);
    if (category) params.set("category", category);
    if (maxItems) params.set("limit", String(maxItems));

    fetch(`/api/articles?${params}`)
      .then((r) => r.json() as Promise<{ articles: Article[] }>)
      .then((data) => setArticles(data.articles || []))
      .finally(() => setLoading(false));
  }, [product, category, maxItems]);

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

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
