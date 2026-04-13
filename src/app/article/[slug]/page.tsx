"use client";

export const runtime = "edge";

import { useEffect, useState, use } from "react";
import { MarkdownRenderer } from "@/components/article/markdown-renderer";
import { VoteButton } from "@/components/article/vote-button";
import { CommentSection } from "@/components/article/comment-section";
import { CopyButton } from "@/components/article/copy-button";
import { Sidebar } from "@/components/layout/sidebar";
import type { Article, Product } from "@/types";

const productStyles: Record<string, { bg: string; label: string }> = {
  line: { bg: "bg-green-500/10 text-green-400 border-green-500/20", label: "LINE Harness" },
  x: { bg: "bg-blue-500/10 text-blue-400 border-blue-500/20", label: "X Harness" },
  ig: { bg: "bg-pink-500/10 text-pink-400 border-pink-500/20", label: "IG Harness" },
  all: { bg: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20", label: "All" },
};

const categoryLabels: Record<string, string> = {
  "getting-started": "はじめに",
  "use-cases": "活用事例",
  plugins: "プラグイン",
  tips: "Tips & 裏技",
  api: "APIリファレンス",
  changelog: "変更履歴",
};

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
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col gap-6 py-8">
          <div className="h-6 w-32 animate-pulse rounded bg-zinc-800" />
          <div className="h-10 w-3/4 animate-pulse rounded bg-zinc-800" />
          <div className="h-4 w-48 animate-pulse rounded bg-zinc-800" />
          <div className="mt-8 space-y-4">
            <div className="h-4 w-full animate-pulse rounded bg-zinc-900" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-zinc-900" />
            <div className="h-4 w-4/6 animate-pulse rounded bg-zinc-900" />
          </div>
        </div>
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

  const product = productStyles[article.product] || productStyles.all;

  return (
    <div className="flex gap-8">
      {article.product !== "all" && (
        <Sidebar product={article.product as Product} currentSlug={article.slug} />
      )}
      <article className="mx-auto min-w-0 max-w-3xl flex-1 py-8 flex flex-col">
        {/* Meta bar */}
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span
            className={`rounded-full border px-3 py-1 text-xs font-medium ${product.bg}`}
          >
            {product.label}
          </span>
          <span className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-400">
            {categoryLabels[article.category] || article.category}
          </span>
          <span className="text-zinc-600">·</span>
          <time className="text-zinc-500">
            {new Date(article.createdAt).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>

        {/* Title */}
        <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          {article.title}
        </h1>

        {/* Author */}
        <div className="mt-5 flex items-center gap-3 border-b border-zinc-800 pb-6">
          <img
            src={article.authorAvatar}
            alt=""
            className="h-10 w-10 rounded-full ring-2 ring-zinc-800"
          />
          <div>
            <p className="text-sm font-medium text-zinc-200">
              {article.authorName}
            </p>
            <p className="text-xs text-zinc-500">Author</p>
          </div>
          <div className="ml-auto">
            <CopyButton content={`# ${article.title}\n\n${article.body}`} />
          </div>
        </div>

        {/* Cover */}
        {article.coverImage && (
          <img
            src={article.coverImage}
            alt={article.title}
            className="mt-8 w-full rounded-2xl border border-zinc-800 object-cover"
          />
        )}

        {/* Body */}
        <div className="mt-8">
          <MarkdownRenderer content={article.body} />
        </div>

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2 border-t border-zinc-800 pt-6">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Vote */}
        <div className="mt-6 flex items-center gap-4 border-t border-zinc-800 pt-6">
          <VoteButton
            articleSlug={article.slug}
            initialCount={article.upvotes}
          />
          <span className="text-sm text-zinc-500">
            この記事が役に立ったら投票してください
          </span>
        </div>

        {/* Comments */}
        <div className="mt-8">
          <CommentSection articleId={article.id} />
        </div>
      </article>
    </div>
  );
}
