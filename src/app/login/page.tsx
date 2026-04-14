"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/auth-provider";
import {
  signInWithGitHub,
  signInWithEmail,
  signUpWithEmail,
} from "@/lib/auth";
import { Github, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Already logged in
  if (user) {
    return (
      <div className="mx-auto flex max-w-sm flex-col items-center gap-6 px-4 py-20 text-center">
        <img
          src={
            user.avatarUrl ||
            `https://api.dicebear.com/7.x/initials/svg?seed=${user.displayName}`
          }
          alt=""
          className="h-16 w-16 rounded-full ring-2 ring-zinc-800"
        />
        <div>
          <p className="text-lg font-bold">{user.displayName}</p>
          <p className="text-sm text-zinc-500">ログイン中</p>
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200"
        >
          <ArrowLeft size={14} />
          トップに戻る
        </Link>
      </div>
    );
  }

  const handleEmail = async () => {
    setError("");
    setSubmitting(true);
    try {
      if (mode === "signup") {
        if (!displayName.trim()) {
          setError("名前を入力してください");
          setSubmitting(false);
          return;
        }
        await signUpWithEmail(email, password, displayName.trim());
      } else {
        await signInWithEmail(email, password);
      }
      router.push("/");
    } catch (e: unknown) {
      const code = (e as { code?: string }).code || "";
      if (code.includes("user-not-found") || code.includes("invalid-credential")) {
        setError("メールアドレスまたはパスワードが間違っています");
      } else if (code.includes("email-already-in-use")) {
        setError("このメールアドレスは既に登録されています。ログインしてください。");
        setMode("login");
      } else if (code.includes("weak-password")) {
        setError("パスワードは6文字以上にしてください");
      } else if (code.includes("invalid-email")) {
        setError("メールアドレスの形式が正しくありません");
      } else {
        setError("エラーが発生しました。もう一度お試しください。");
      }
    }
    setSubmitting(false);
  };

  const handleGitHub = async () => {
    setError("");
    try {
      await signInWithGitHub();
      router.push("/");
    } catch {
      setError("GitHubログインに失敗しました。ドメインが承認されているか確認してください。");
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-5rem)] max-w-sm flex-col items-center justify-center gap-8 px-4">
      {/* Header */}
      <div className="flex flex-col items-center gap-2 text-center">
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Harness
          <span className="ml-1 text-zinc-500">Wiki</span>
        </Link>
        <p className="text-sm text-zinc-500">
          {mode === "login"
            ? "ログインして掲示板に参加しよう"
            : "アカウントを作成して始めよう"}
        </p>
      </div>

      {/* Form card */}
      <div className="flex w-full flex-col gap-5 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm">
        {/* GitHub */}
        <button
          onClick={handleGitHub}
          className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-zinc-100 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-white"
        >
          <Github size={18} />
          GitHubで{mode === "login" ? "ログイン" : "登録"}
        </button>

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-zinc-800" />
          <span className="text-[11px] text-zinc-600">または</span>
          <div className="h-px flex-1 bg-zinc-800" />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-3">
          {mode === "signup" && (
            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                名前
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="表示される名前"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:border-zinc-600 focus:outline-none"
              />
            </div>
          )}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-400">
              メールアドレス
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:border-zinc-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-400">
              パスワード
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="6文字以上"
              onKeyDown={(e) => e.key === "Enter" && handleEmail()}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:border-zinc-600 focus:outline-none"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-400">
              {error}
            </p>
          )}

          <button
            onClick={handleEmail}
            disabled={submitting || !email || !password}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500 disabled:opacity-50"
          >
            <Mail size={16} />
            {submitting
              ? "処理中..."
              : mode === "login"
                ? "メールでログイン"
                : "アカウントを作成"}
          </button>
        </div>
      </div>

      {/* Switch mode */}
      <p className="text-sm text-zinc-500">
        {mode === "login" ? (
          <>
            アカウントがない方は
            <button
              onClick={() => {
                setMode("signup");
                setError("");
              }}
              className="ml-1 font-medium text-blue-400 hover:underline"
            >
              新規登録
            </button>
          </>
        ) : (
          <>
            既にアカウントがある方は
            <button
              onClick={() => {
                setMode("login");
                setError("");
              }}
              className="ml-1 font-medium text-blue-400 hover:underline"
            >
              ログイン
            </button>
          </>
        )}
      </p>
    </div>
  );
}
