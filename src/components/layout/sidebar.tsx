"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Article, Product } from "@/types";

interface SidebarProps {
  product: Product;
  currentSlug?: string;
}

export function Sidebar({ product, currentSlug }: SidebarProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    fetch(`/api/articles?product=${product}`)
      .then((r) => r.json() as Promise<{ articles: Article[] }>)
      .then((data) => setArticles(data.articles || []));
  }, [product]);

  const productLabel = { line: "LINE", x: "X", ig: "IG", all: "All" }[product];
  const productColor = {
    line: "text-green-400",
    x: "text-blue-400",
    ig: "text-pink-400",
    all: "text-zinc-400",
  }[product];

  // Sort: pinned first, then series #N ascending, then newest.
  const sortForSidebar = (items: Article[]) =>
    [...items].sort((a, b) => {
      if (a.status !== b.status) {
        if (a.status === "pinned") return -1;
        if (b.status === "pinned") return 1;
      }
      const sa = a.title.match(/#(\d+)/);
      const sb = b.title.match(/#(\d+)/);
      const na = sa ? Number(sa[1]) : Number.POSITIVE_INFINITY;
      const nb = sb ? Number(sb[1]) : Number.POSITIVE_INFINITY;
      if (na !== nb) return na - nb;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const grouped = {
    "getting-started": sortForSidebar(
      articles.filter((a) => a.category === "getting-started"),
    ),
    changelog: sortForSidebar(articles.filter((a) => a.category === "changelog")),
    other: sortForSidebar(
      articles.filter(
        (a) => a.category !== "getting-started" && a.category !== "changelog",
      ),
    ),
  };

  const categoryLabels: Record<string, string> = {
    "getting-started": "はじめに",
    changelog: "アップデート",
    other: "Tips & その他",
  };

  return (
    <aside className="hidden w-56 shrink-0 lg:block">
      <div className="sticky top-20 flex flex-col gap-5">
        <Link
          href={`/${product}`}
          className={`text-sm font-bold ${productColor}`}
        >
          {productLabel} Harness
        </Link>

        {(["getting-started", "changelog", "other"] as const).map((group) => {
          const items = grouped[group];
          if (items.length === 0) return null;
          return (
            <div key={group} className="flex flex-col gap-1">
              <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                {categoryLabels[group]}
              </span>
              {items.map((a) => {
                const active =
                  currentSlug === a.slug ||
                  pathname === `/article/${a.slug}`;
                return (
                  <Link
                    key={a.id}
                    href={`/article/${a.slug}`}
                    className={`rounded-lg px-2 py-1.5 text-[13px] leading-snug transition-colors ${
                      active
                        ? "bg-zinc-800 text-zinc-100 font-medium"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {a.title}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
