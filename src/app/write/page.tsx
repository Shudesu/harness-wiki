"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/auth-provider";
import { MarkdownEditor } from "@/components/editor/markdown-editor";
import type { Product, Category } from "@/types";

const products: { value: Product; label: string }[] = [
  { value: "line", label: "LINE Harness" },
  { value: "x", label: "X Harness" },
  { value: "ig", label: "IG Harness" },
  { value: "all", label: "全般" },
];

const categories: { value: Category; label: string }[] = [
  { value: "getting-started", label: "はじめに" },
  { value: "use-cases", label: "活用事例" },
  { value: "plugins", label: "プラグイン" },
  { value: "tips", label: "Tips & 裏技" },
  { value: "changelog", label: "変更履歴" },
];

function slugify(title: string): string {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 80) + `-${Date.now().toString(36)}`
  );
}

export default function WritePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [product, setProduct] = useState<Product>("all");
  const [category, setCategory] = useState<Category>("tips");
  const [tags, setTags] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!user) {
    return (
      <div className="flex flex-col items-center gap-4 py-20">
        <p className="text-zinc-400">投稿するにはログインしてください。</p>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!title.trim() || !body.trim()) return;
    setSubmitting(true);

    const slug = slugify(title);
    await fetch("/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title.trim(),
        slug,
        category,
        product,
        body,
        coverImage: null,
        authorId: user.uid,
        authorName: user.displayName,
        authorAvatar: user.avatarUrl,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        status: "published",
      }),
    });

    router.push(`/article/${slug}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">記事を投稿</h1>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="タイトル"
        className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-lg font-semibold text-zinc-100 placeholder-zinc-600 focus:border-zinc-600 focus:outline-none"
      />

      <div className="flex flex-wrap gap-3">
        <select
          value={product}
          onChange={(e) => setProduct(e.target.value as Product)}
          className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100"
        >
          {products.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100"
        >
          {categories.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="タグ（カンマ区切り）"
          className="flex-1 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600"
        />
      </div>

      <MarkdownEditor value={body} onChange={setBody} />

      <button
        onClick={handleSubmit}
        disabled={submitting || !title.trim() || !body.trim()}
        className="self-end rounded-xl bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-500 disabled:opacity-50"
      >
        {submitting ? "投稿中..." : "投稿する"}
      </button>
    </div>
  );
}
