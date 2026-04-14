"use client";

import Link from "next/link";
import { useAuth } from "./auth-provider";
import { signOut } from "@/lib/auth";
import { LogIn, LogOut } from "lucide-react";

export function LoginButton() {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="h-8 w-20 animate-pulse rounded-lg bg-zinc-800" />
    );

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <img
          src={
            user.avatarUrl ||
            `https://api.dicebear.com/7.x/initials/svg?seed=${user.displayName}`
          }
          alt={user.displayName}
          className="h-8 w-8 rounded-full"
        />
        <span className="hidden text-sm sm:inline">{user.displayName}</span>
        <button
          onClick={() => signOut()}
          className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
        >
          <LogOut size={16} />
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className="flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium hover:bg-zinc-700"
    >
      <LogIn size={16} />
      <span>ログイン</span>
    </Link>
  );
}
