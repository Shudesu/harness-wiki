"use client";

import { useState } from "react";
import { ArticleCard } from "@/components/article/article-card";
import { Search } from "lucide-react";
import type { Article } from "@/types";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<Article[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setSearched(true);

    const res = await fetch(
      `/api/articles?q=${encodeURIComponent(searchQuery)}`
    );
    const data = (await res.json()) as { articles: Article[] };
    setResults(data.articles || []);
    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 pb-20 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">検索</h1>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="記事を検索..."
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-3 pl-10 pr-4 text-zinc-100 placeholder-zinc-600 focus:border-zinc-600 focus:outline-none"
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={loading}
          className="rounded-xl bg-zinc-800 px-6 font-medium hover:bg-zinc-700 disabled:opacity-50"
        >
          検索
        </button>
      </div>

      {loading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-48 animate-pulse rounded-xl border border-zinc-800 bg-zinc-900/50"
            />
          ))}
        </div>
      )}

      {searched && !loading && (
        <>
          <p className="text-sm text-zinc-400">{results.length}件の結果</p>
          {results.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <p className="py-12 text-center text-zinc-500">
              該当する記事が見つかりませんでした。
            </p>
          )}
        </>
      )}
    </div>
  );
}
