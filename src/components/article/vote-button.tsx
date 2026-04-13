"use client";

import { useState } from "react";
import { ArrowUp } from "lucide-react";
import { useAuth } from "@/components/auth/auth-provider";

export function VoteButton({
  articleSlug,
  initialCount,
}: {
  articleSlug: string;
  initialCount: number;
}) {
  const { user } = useAuth();
  const [count, setCount] = useState(initialCount);
  const [voted, setVoted] = useState(false);

  const handleVote = async () => {
    if (!user || voted) return;
    setVoted(true);
    setCount((c) => c + 1);
    await fetch(`/api/articles/${articleSlug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "upvote" }),
    });
  };

  return (
    <button
      onClick={handleVote}
      disabled={!user || voted}
      className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        voted
          ? "bg-blue-500/10 text-blue-400"
          : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100"
      } disabled:cursor-not-allowed`}
    >
      <ArrowUp size={16} />
      <span>{count}</span>
    </button>
  );
}
