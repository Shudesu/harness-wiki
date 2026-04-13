"use client";

export const runtime = "edge";

import { useEffect, useState, use } from "react";
import { ArticleCard } from "@/components/article/article-card";
import type { WikiUser, Article } from "@/types";

export default function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [profile, setProfile] = useState<WikiUser | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      // Fetch user's articles (which includes author info)
      const res = await fetch("/api/articles");
      const data = (await res.json()) as { articles: Article[] };
      const userArticles = (data.articles || []).filter(
        (a: Article) => a.authorId === id
      );
      setArticles(userArticles);

      // Build profile from first article or default
      if (userArticles.length > 0) {
        setProfile({
          uid: id,
          displayName: userArticles[0].authorName,
          avatarUrl: userArticles[0].authorAvatar,
          githubUsername: "",
          role: "member",
          articleCount: userArticles.length,
          joinedAt: new Date(),
        });
      }
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return <div className="h-48 animate-pulse rounded-xl bg-zinc-900" />;
  }

  if (!profile) {
    return (
      <p className="py-12 text-center text-zinc-500">
        ユーザーが見つかりません。
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <img
          src={profile.avatarUrl}
          alt={profile.displayName}
          className="h-16 w-16 rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold">{profile.displayName}</h1>
          <p className="text-sm text-zinc-400">
            {articles.length}件の投稿
          </p>
        </div>
      </div>

      <section>
        <h2 className="mb-4 text-lg font-semibold">投稿した記事</h2>
        {articles.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <p className="text-zinc-500">まだ記事を投稿していません。</p>
        )}
      </section>
    </div>
  );
}
