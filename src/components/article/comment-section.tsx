"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { MarkdownRenderer } from "./markdown-renderer";
import type { Comment } from "@/types";

export function CommentSection({ articleId }: { articleId: string }) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/comments/${articleId}`)
      .then((r) => r.json() as Promise<{ comments: Comment[] }>)
      .then((data) => setComments(data.comments || []));
  }, [articleId]);

  const handleSubmit = async () => {
    if (!user || !body.trim()) return;
    setSubmitting(true);

    const res = await fetch(`/api/comments/${articleId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        body: body.trim(),
        authorId: user.uid,
        authorName: user.displayName,
        authorAvatar: user.avatarUrl,
      }),
    });

    if (res.ok) {
      const comment = (await res.json()) as Comment;
      setComments((prev) => [...prev, comment]);
    }

    setBody("");
    setSubmitting(false);
  };

  return (
    <section className="flex flex-col gap-4 border-t border-zinc-800 pt-6">
      <h2 className="text-lg font-semibold">コメント ({comments.length})</h2>

      <div className="flex flex-col gap-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="flex gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4"
          >
            <img
              src={comment.authorAvatar}
              alt=""
              className="h-8 w-8 shrink-0 rounded-full"
            />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium">{comment.authorName}</span>
                <span className="text-xs text-zinc-500">
                  {new Date(comment.createdAt).toLocaleDateString("ja-JP")}
                </span>
              </div>
              <div className="text-sm text-zinc-300">
                <MarkdownRenderer content={comment.body} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {user ? (
        <div className="flex flex-col gap-2">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="コメントを書く（Markdown対応）..."
            rows={3}
            className="w-full resize-y rounded-xl border border-zinc-800 bg-zinc-900 p-3 text-sm text-zinc-100 placeholder-zinc-600 focus:border-zinc-600 focus:outline-none"
          />
          <button
            onClick={handleSubmit}
            disabled={submitting || !body.trim()}
            className="self-end rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium hover:bg-zinc-700 disabled:opacity-50"
          >
            {submitting ? "送信中..." : "コメント"}
          </button>
        </div>
      ) : (
        <p className="text-sm text-zinc-500">
          コメントするにはログインしてください。
        </p>
      )}
    </section>
  );
}
