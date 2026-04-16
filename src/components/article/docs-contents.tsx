"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Article, Product } from "@/types";

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

function seriesIndex(title: string): number {
  const m = title.match(/#(\d+)/);
  return m ? Number(m[1]) : Number.POSITIVE_INFINITY;
}

function sortArticles(items: Article[]): Article[] {
  return [...items].sort((a, b) => {
    if (a.status !== b.status) {
      if (a.status === "pinned") return -1;
      if (b.status === "pinned") return 1;
    }
    const sa = seriesIndex(a.title);
    const sb = seriesIndex(b.title);
    if (sa !== sb) return sa - sb;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

function excerpt(body: string): string {
  return body
    .replace(/#{1,6}\s/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/[*_~]/g, "")
    .replace(/\n+/g, " ")
    .trim()
    .slice(0, 100);
}

export function DocsContents({ product }: { product: Product }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/articles?product=${product}&limit=100`)
      .then((r) => r.json() as Promise<{ articles: Article[] }>)
      .then((data) => setArticles(data.articles || []))
      .finally(() => setLoading(false));
  }, [product]);

  if (loading) {
    return <div className="h-40 animate-pulse rounded-xl bg-zinc-900/50" />;
  }
  if (articles.length === 0) {
    return (
      <p className="py-12 text-center text-zinc-500">
        まだ記事がありません。
      </p>
    );
  }

  const byCategory = new Map<string, Article[]>();
  for (const a of articles) {
    const list = byCategory.get(a.category) ?? [];
    list.push(a);
    byCategory.set(a.category, list);
  }
  const knownSections = CATEGORY_ORDER.filter((c) => byCategory.has(c)).map(
    (c) => [c, sortArticles(byCategory.get(c) ?? [])] as const,
  );
  const unknownSections = [...byCategory.entries()]
    .filter(([c]) => !CATEGORY_ORDER.includes(c as (typeof CATEGORY_ORDER)[number]))
    .map(([c, items]) => [c, sortArticles(items)] as const);
  const sections = [...knownSections, ...unknownSections];

  return (
    <div className="flex flex-col gap-10">
      {sections.map(([category, items]) => (
        <section key={category}>
          <h2
            id={category}
            className="mb-1 text-xl font-bold text-zinc-100 border-b border-zinc-800 pb-2"
          >
            {CATEGORY_LABELS[category] ?? category}
          </h2>
          <ul className="mt-4 flex flex-col divide-y divide-zinc-800/60">
            {items.map((a) => (
              <li key={a.id} className="py-3">
                <Link
                  href={`/article/${a.slug}`}
                  className="group block"
                >
                  <div className="flex items-baseline gap-2">
                    <span className="text-[15px] font-medium text-zinc-200 group-hover:text-blue-400">
                      {a.title}
                    </span>
                    {a.status === "pinned" && (
                      <span className="rounded bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-medium text-amber-400">
                        PINNED
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-[13px] text-zinc-500 line-clamp-1">
                    {excerpt(a.body)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
