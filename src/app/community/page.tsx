"use client";

export const runtime = "edge";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/auth/auth-provider";
import { MessageSquare, ArrowUp, Clock, PenSquare } from "lucide-react";
import type { Article } from "@/types";

const tabs = [
  { key: "all", label: "すべて" },
  { key: "line", label: "LINE" },
  { key: "x", label: "X" },
  { key: "ig", label: "IG" },
] as const;

function TimeAgo({ date }: { date: string }) {
  const diff = Date.now() - new Date(date).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 60) return <span>{min}分前</span>;
  const hr = Math.floor(min / 60);
  if (hr < 24) return <span>{hr}時間前</span>;
  const day = Math.floor(hr / 24);
  return <span>{day}日前</span>;
}

export default function CommunityPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("all");
  const [threads, setThreads] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // New thread form
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [product, setProduct] = useState("all");
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("type", "thread");
    if (activeTab !== "all") params.set("product", activeTab);

    fetch(`/api/articles?${params}`)
      .then((r) => r.json() as Promise<{ articles: Article[] }>)
      .then((data) => setThreads(data.articles || []))
      .finally(() => setLoading(false));
  }, [activeTab]);

  const handlePost = async () => {
    if (!user || !title.trim() || !body.trim()) return;
    setPosting(true);

    const slug =
      title
        .toLowerCase()
        .replace(/[^a-z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 60) + `-${Date.now().toString(36)}`;

    const res = await fetch("/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title.trim(),
        slug,
        category: "tips",
        product,
        body: body.trim(),
        coverImage: null,
        authorId: user.uid,
        authorName: user.displayName,
        authorAvatar: user.avatarUrl,
        tags: [],
        status: "published",
        type: "thread",
      }),
    });

    if (res.ok) {
      const thread = (await res.json()) as Article;
      setThreads((prev) => [thread, ...prev]);
      setTitle("");
      setBody("");
      setShowForm(false);
    }
    setPosting(false);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between py-6">
        <div>
          <h1 className="text-2xl font-bold">掲示板</h1>
          <p className="mt-1 text-sm text-zinc-500">
            質問・相談・情報共有。気軽に書き込んでください。
          </p>
        </div>
        {user && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 rounded-lg bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-900 transition-colors hover:bg-white"
          >
            <PenSquare size={14} />
            書き込む
          </button>
        )}
      </div>

      {/* New thread form */}
      {showForm && user && (
        <div className="mb-6 flex flex-col gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="タイトル"
            className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-sm font-semibold text-zinc-100 placeholder-zinc-600 focus:border-zinc-600 focus:outline-none"
          />
          <div className="flex gap-2">
            {tabs.slice(1).map((t) => (
              <button
                key={t.key}
                onClick={() => setProduct(t.key)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  product === t.key
                    ? "bg-zinc-700 text-zinc-100"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {t.label}
              </button>
            ))}
            <button
              onClick={() => setProduct("all")}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                product === "all"
                  ? "bg-zinc-700 text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              全般
            </button>
          </div>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="本文（Markdown対応）"
            rows={4}
            className="resize-y rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:border-zinc-600 focus:outline-none"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowForm(false)}
              className="rounded-lg px-4 py-2 text-sm text-zinc-500 hover:text-zinc-300"
            >
              キャンセル
            </button>
            <button
              onClick={handlePost}
              disabled={posting || !title.trim() || !body.trim()}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-50"
            >
              {posting ? "投稿中..." : "投稿する"}
            </button>
          </div>
        </div>
      )}

      {!user && (
        <div className="mb-6 rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 text-center text-sm text-zinc-500">
          書き込むには
          <span className="mx-1 font-medium text-zinc-300">
            GitHubでログイン
          </span>
          してください
        </div>
      )}

      {/* Tabs */}
      <div className="mb-4 flex gap-1 border-b border-zinc-800 pb-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              activeTab === t.key
                ? "bg-zinc-800 text-zinc-100"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Thread list */}
      {loading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-20 animate-pulse rounded-xl border border-zinc-800 bg-zinc-900/30"
            />
          ))}
        </div>
      ) : threads.length === 0 ? (
        <p className="py-16 text-center text-zinc-500">
          まだ書き込みがありません。最初の質問を投稿してみましょう！
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {threads.map((thread) => {
            const productColor = {
              line: "text-green-400",
              x: "text-blue-400",
              ig: "text-pink-400",
              all: "text-zinc-400",
            }[thread.product];

            return (
              <Link
                key={thread.id}
                href={`/article/${thread.slug}`}
                className="group flex gap-4 rounded-xl border border-zinc-800/50 bg-zinc-900/30 p-4 transition-colors hover:border-zinc-700 hover:bg-zinc-900/60"
              >
                {/* Vote count */}
                <div className="flex flex-col items-center gap-0.5 pt-0.5">
                  <ArrowUp size={14} className="text-zinc-600" />
                  <span className="text-xs font-medium text-zinc-500">
                    {thread.upvotes}
                  </span>
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold leading-snug group-hover:text-blue-400">
                    {thread.title}
                  </h3>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[11px] text-zinc-500">
                    <span className={`font-medium ${productColor}`}>
                      {thread.product.toUpperCase()}
                    </span>
                    <span>·</span>
                    <img
                      src={thread.authorAvatar}
                      alt=""
                      className="h-3.5 w-3.5 rounded-full"
                    />
                    <span>{thread.authorName}</span>
                    <span>·</span>
                    <Clock size={10} />
                    <TimeAgo date={thread.createdAt as unknown as string} />
                    <span>·</span>
                    <MessageSquare size={10} />
                    <span>{thread.viewCount} 閲覧</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
