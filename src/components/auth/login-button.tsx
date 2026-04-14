"use client";

import { useState } from "react";
import { useAuth } from "./auth-provider";
import {
  signInWithGitHub,
  signInWithEmail,
  signUpWithEmail,
  signOut,
} from "@/lib/auth";
import { LogIn, LogOut, Github, Mail, X } from "lucide-react";

export function LoginButton() {
  const { user, loading } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading)
    return (
      <div className="h-8 w-8 animate-pulse rounded-full bg-zinc-800" />
    );

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <img
          src={user.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${user.displayName}`}
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

  const handleEmailSubmit = async () => {
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
      setShowModal(false);
      setEmail("");
      setPassword("");
      setDisplayName("");
    } catch (e: unknown) {
      const msg = (e as { code?: string }).code || "";
      if (msg.includes("user-not-found") || msg.includes("invalid-credential")) {
        setError("メールアドレスまたはパスワードが間違っています");
      } else if (msg.includes("email-already-in-use")) {
        setError("このメールアドレスは既に登録されています");
      } else if (msg.includes("weak-password")) {
        setError("パスワードは6文字以上にしてください");
      } else {
        setError("ログインに失敗しました");
      }
    }
    setSubmitting(false);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium hover:bg-zinc-700"
      >
        <LogIn size={16} />
        <span>ログイン</span>
      </button>

      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div className="mx-4 w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold">
                {mode === "login" ? "ログイン" : "アカウント作成"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-1 text-zinc-500 hover:text-zinc-300"
              >
                <X size={18} />
              </button>
            </div>

            {/* GitHub */}
            <button
              onClick={async () => {
                try {
                  await signInWithGitHub();
                  setShowModal(false);
                } catch {
                  setError("GitHubログインに失敗しました");
                }
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-800 py-3 text-sm font-medium transition-colors hover:bg-zinc-700"
            >
              <Github size={18} />
              GitHubでログイン
            </button>

            <div className="my-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-zinc-800" />
              <span className="text-xs text-zinc-500">または</span>
              <div className="h-px flex-1 bg-zinc-800" />
            </div>

            {/* Email form */}
            <div className="flex flex-col gap-3">
              {mode === "signup" && (
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="名前"
                  className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:border-zinc-600 focus:outline-none"
                />
              )}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="メールアドレス"
                className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:border-zinc-600 focus:outline-none"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="パスワード"
                onKeyDown={(e) => e.key === "Enter" && handleEmailSubmit()}
                className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:border-zinc-600 focus:outline-none"
              />

              {error && (
                <p className="text-xs text-red-400">{error}</p>
              )}

              <button
                onClick={handleEmailSubmit}
                disabled={submitting || !email || !password}
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-500 disabled:opacity-50"
              >
                <Mail size={16} />
                {submitting
                  ? "処理中..."
                  : mode === "login"
                    ? "メールでログイン"
                    : "アカウント作成"}
              </button>
            </div>

            <p className="mt-4 text-center text-xs text-zinc-500">
              {mode === "login" ? (
                <>
                  アカウントがない方は
                  <button
                    onClick={() => { setMode("signup"); setError(""); }}
                    className="ml-1 text-blue-400 hover:underline"
                  >
                    新規登録
                  </button>
                </>
              ) : (
                <>
                  既にアカウントがある方は
                  <button
                    onClick={() => { setMode("login"); setError(""); }}
                    className="ml-1 text-blue-400 hover:underline"
                  >
                    ログイン
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
