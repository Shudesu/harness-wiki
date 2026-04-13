"use client";

export const runtime = "edge";

import { useEffect, useState, use } from "react";
import { MarkdownRenderer } from "@/components/article/markdown-renderer";
import { VoteButton } from "@/components/article/vote-button";
import { CommentSection } from "@/components/article/comment-section";
import type { Article } from "@/types";

export default function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/articles/${slug}`)
      .then((r) => r.json() as Promise<{ article: Article | null }>)
      .then((data) => setArticle(data.article))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="h-8 w-2/3 animate-pulse rounded bg-zinc-800" />
        <div className="h-64 animate-pulse rounded-xl bg-zinc-900" />
      </div>
    );
  }

  if (!article) {
    return (
      <p className="py-20 text-center text-zinc-500">
        記事が見つかりません。
      </p>
    );
  }

  const productLabel = { line: "LINE", x: "X", ig: "IG", all: "All" }[
    article.product
  ];

  return (
    <article className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs font-medium">
            {productLabel}
          </span>
          <span>{article.category}</span>
          <span>·</span>
          <span>
            {new Date(article.createdAt).toLocaleDateString("ja-JP")}
          </span>
        </div>
        <h1 className="text-3xl font-bold sm:text-4xl">{article.title}</h1>
        <div className="flex items-center gap-3">
          <img
            src={article.authorAvatar}
            alt=""
            className="h-8 w-8 rounded-full"
          />
          <span className="text-sm text-zinc-300">{article.authorName}</span>
        </div>
      </div>

      {article.coverImage && (
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full rounded-xl object-cover"
        />
      )}

      <MarkdownRenderer content={article.body} />

      {article.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-400"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="border-t border-zinc-800 pt-4">
        <VoteButton articleSlug={article.slug} initialCount={article.upvotes} />
      </div>

      <CommentSection articleId={article.id} />
    </article>
  );
}
