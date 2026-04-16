"use client";

import { useMemo, useEffect, useState } from "react";
import GithubSlugger from "github-slugger";

interface TocItem {
  depth: 2 | 3;
  text: string;
  id: string;
}

function extractToc(markdown: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  let inFence = false;
  for (const line of markdown.split("\n")) {
    if (line.startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = line.match(/^(#{2,3})\s+(.+?)\s*$/);
    if (!m) continue;
    const depth = m[1].length as 2 | 3;
    const text = m[2]
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .trim();
    items.push({ depth, text, id: slugger.slug(text) });
  }
  return items;
}

export function Toc({ markdown }: { markdown: string }) {
  const items = useMemo(() => extractToc(markdown), [markdown]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "0px 0px -70% 0px", threshold: 0 },
    );
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <aside className="hidden xl:block w-56 shrink-0">
      <div className="sticky top-20 flex flex-col gap-2">
        <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
          Contents
        </span>
        <nav className="flex flex-col gap-0.5 text-[13px] leading-snug">
          {items.map((item) => {
            const active = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`rounded px-2 py-1 transition-colors ${
                  item.depth === 3 ? "pl-5" : ""
                } ${
                  active
                    ? "bg-zinc-800 text-zinc-100"
                    : "text-zinc-500 hover:text-zinc-200"
                }`}
              >
                {item.text}
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
