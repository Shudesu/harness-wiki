import type { Metadata } from "next";
import Link from "next/link";
import {
  GitPullRequest,
  CircleDot,
  Tag,
  ExternalLink,
  CheckCircle2,
  ArrowRight,
  Wrench,
  AlertCircle,
  KeyRound,
  ShieldCheck,
} from "lucide-react";
import { SITE_URL } from "@/lib/research";

export const metadata: Metadata = {
  title: "L Harness のアップデート",
  description:
    "L Harness を最新版にアップデートする方法・トラブル時の対処・破壊的変更のポリシー",
  alternates: { canonical: `${SITE_URL}/updates` },
};

// Revalidate every hour (GitHub API rate limit friendly)
export const revalidate = 3600;

const REPOS = [
  {
    key: "line",
    owner: "Shudesu",
    name: "line-harness-oss",
    label: "L Harness",
    accent: "text-green-400",
    border: "border-green-500/30",
  },
  {
    key: "x",
    owner: "Shudesu",
    name: "x-harness",
    label: "X Harness",
    accent: "text-blue-400",
    border: "border-blue-500/30",
  },
  {
    key: "ig",
    owner: "Shudesu",
    name: "ig-harness",
    label: "IG Harness",
    accent: "text-pink-400",
    border: "border-pink-500/30",
  },
] as const;

type Release = {
  name: string | null;
  tag_name: string;
  html_url: string;
  published_at: string | null;
  body: string | null;
};

type Issue = {
  number: number;
  title: string;
  html_url: string;
  user: { login: string } | null;
  labels: { name: string; color: string }[];
  state: "open" | "closed";
  pull_request?: { url: string } | null;
  created_at: string;
  updated_at: string;
};

async function gh<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

async function loadRepoData(owner: string, name: string) {
  const [releases, openIssuesRaw, prsRaw] = await Promise.all([
    gh<Release[]>(
      `https://api.github.com/repos/${owner}/${name}/releases?per_page=3`,
    ),
    gh<Issue[]>(
      `https://api.github.com/repos/${owner}/${name}/issues?state=open&per_page=10&sort=updated`,
    ),
    gh<Issue[]>(
      `https://api.github.com/search/issues?q=repo:${owner}/${name}+type:pr&sort=updated&order=desc&per_page=10`,
    ).then(
      (r) => (r as unknown as { items?: Issue[] } | null)?.items ?? null,
    ),
  ]);
  const openIssues = (openIssuesRaw ?? []).filter((i) => !i.pull_request).slice(0, 5);
  const recentPrs = (prsRaw ?? []).slice(0, 5);
  return {
    latestRelease: releases?.[0] ?? null,
    openIssues,
    recentPrs,
  };
}

function formatDate(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
}

function truncate(s: string, max: number): string {
  if (s.length <= max) return s;
  return s.slice(0, max) + "…";
}

const SUB_PAGES = [
  {
    href: "/updates/manual",
    title: "手動アップデート",
    description:
      "改造 (fork) してる人向け。git pull → build → wrangler deploy の手順",
    icon: Wrench,
    color: "border-blue-500/30 hover:border-blue-500/60",
  },
  {
    href: "/updates/troubleshooting",
    title: "トラブルシューティング",
    description:
      "ボタンが押せない / 失敗した / 進捗が止まる、などのよくあるエラー",
    icon: AlertCircle,
    color: "border-amber-500/30 hover:border-amber-500/60",
  },
  {
    href: "/updates/api-token",
    title: "CF API トークンの作り方",
    description:
      "ダッシュボードからアップデートを実行するための Cloudflare API トークン",
    icon: KeyRound,
    color: "border-emerald-500/30 hover:border-emerald-500/60",
  },
  {
    href: "/updates/migration-policy",
    title: "破壊的変更のポリシー",
    description:
      "DB スキーマ変更は additive-only。破壊的変更は 3 リリースに分けて段階的に",
    icon: ShieldCheck,
    color: "border-purple-500/30 hover:border-purple-500/60",
  },
] as const;

export default async function UpdatesPage() {
  const data = await Promise.all(
    REPOS.map(async (r) => ({ ...r, ...(await loadRepoData(r.owner, r.name)) })),
  );

  return (
    <div className="mx-auto max-w-5xl px-4 pb-20">
      {/* Hero */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">L Harness のアップデート</h1>
        <p className="mt-3 text-zinc-400">
          line-harness は<strong className="text-zinc-200">1 クリックでアップデート</strong>
          できます。改造していない通常のインストールなら、管理画面のバナーから
          自動でアップデートが完了します。所要時間は 1〜3 分程度。
        </p>
      </div>

      {/* Section 1: 概要 */}
      <section className="mb-10 rounded-xl border border-zinc-800 bg-zinc-950/60 p-6">
        <h2 className="text-xl font-semibold text-zinc-100">概要</h2>
        <ul className="mt-4 space-y-2 text-sm text-zinc-300">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
            <span>新しいバージョンがリリースされると、管理画面の上部にバナーが表示されます。</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
            <span>
              改造していない (= <code className="rounded bg-zinc-800/80 px-1 py-0.5 text-[12px] text-emerald-400">~/.line-harness/</code>{" "}
              のコードを書き換えていない) 場合、自動でアップデートできます。
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
            <span>
              改造している場合は安全のため自動アップデートが無効化され、手動アップデートの案内が出ます。
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
            <span>
              失敗時は自動で前のバージョンに rollback されるので、サービスが止まる心配はほぼありません。
            </span>
          </li>
        </ul>
      </section>

      {/* Section 2: 手順 */}
      <section className="mb-10 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6">
        <h2 className="text-xl font-semibold text-zinc-100">
          手順 (普通の人向け)
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          管理画面にログインしているだけで完了します。技術知識は不要です。
        </p>
        <ol className="mt-4 space-y-3 text-sm text-zinc-200">
          <li className="flex gap-3">
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-semibold text-emerald-300">
              1
            </span>
            <span>
              管理画面 (Owner ロール) を開くと、上部に
              <code className="mx-1 rounded bg-zinc-800/80 px-1.5 py-0.5 text-[12px] text-emerald-400">
                v0.X.X にアップデート
              </code>
              バナーが表示されます。
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-semibold text-emerald-300">
              2
            </span>
            <span>バナーの「アップデート」ボタンを押します。</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-semibold text-emerald-300">
              3
            </span>
            <span>
              進捗バーが表示されます (build → migrate → deploy → health check)。
              1〜3 分でグリーンの「アップデート完了」が出れば終了です。
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-semibold text-emerald-300">
              4
            </span>
            <span>
              バージョンが上がっていることを <code className="rounded bg-zinc-800/80 px-1.5 py-0.5 text-[12px] text-emerald-400">/settings</code> で確認。
            </span>
          </li>
        </ol>
        <p className="mt-4 text-xs text-zinc-500">
          アップデート中も友だち管理・配信などの通常機能は動き続けます。Worker の切り替えは Cloudflare の atomic deploy で行われます。
        </p>
      </section>

      {/* Section 3: 失敗した時 */}
      <section className="mb-10 rounded-xl border border-amber-500/30 bg-amber-500/5 p-6">
        <h2 className="text-xl font-semibold text-zinc-100">失敗した時</h2>
        <p className="mt-2 text-sm text-zinc-300">
          アップデート中に何かが失敗した場合、line-harness は
          <strong className="text-zinc-100">自動で前のバージョンに戻ります</strong>
          。基本的にはサービスが止まらないので、慌てる必要はありません。
        </p>
        <ul className="mt-4 space-y-1.5 text-sm text-zinc-300">
          <li>・Worker は即座にロールバック</li>
          <li>・migration は additive-only なので原則戻す必要なし</li>
          <li>
            ・<code className="rounded bg-zinc-800/80 px-1.5 py-0.5 text-[12px] text-emerald-400">/updates</code>{" "}
            ページで失敗ログを確認できます
          </li>
        </ul>
        <Link
          href="/updates/troubleshooting"
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-amber-300 hover:text-amber-200"
        >
          詳しいトラブルシューティング <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      {/* Section 4: 関連ページ */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-zinc-100">関連ページ</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {SUB_PAGES.map((p) => {
            const Icon = p.icon;
            return (
              <Link
                key={p.href}
                href={p.href}
                className={`rounded-xl border bg-zinc-900/40 p-5 transition-colors ${p.color}`}
              >
                <div className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-zinc-400" />
                  <div>
                    <h3 className="font-semibold text-zinc-100">{p.title}</h3>
                    <p className="mt-1 text-xs text-zinc-400">{p.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* GitHub data (release info) — kept below the upgrade guide */}
      <div className="mb-6 border-t border-zinc-800 pt-10">
        <h2 className="text-2xl font-bold">リリース・Issue・PR</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Harness シリーズの最新リリース・Issue・PR。データは GitHub から 1 時間ごとに自動取得。
        </p>
      </div>

      <div className="space-y-12">
        {data.map((repo) => (
          <section
            key={repo.key}
            className={`rounded-xl border ${repo.border} bg-zinc-950/40 p-6`}
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className={`text-2xl font-bold ${repo.accent}`}>{repo.label}</h3>
              <a
                href={`https://github.com/${repo.owner}/${repo.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300"
              >
                GitHub <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {/* Latest Release */}
            <div className="mb-8">
              <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-300">
                <Tag className="h-4 w-4" /> 最新リリース
              </h4>
              {repo.latestRelease ? (
                <a
                  href={repo.latestRelease.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 transition-colors hover:border-zinc-700"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-semibold text-zinc-100">
                      {repo.latestRelease.tag_name}
                    </span>
                    <span className="text-xs text-zinc-500">
                      {formatDate(repo.latestRelease.published_at)}
                    </span>
                  </div>
                  {repo.latestRelease.name && (
                    <div className="mt-1 text-sm text-zinc-400">
                      {repo.latestRelease.name}
                    </div>
                  )}
                  {repo.latestRelease.body && (
                    <p className="mt-2 line-clamp-3 whitespace-pre-line text-xs text-zinc-500">
                      {truncate(repo.latestRelease.body, 300)}
                    </p>
                  )}
                </a>
              ) : (
                <p className="text-sm text-zinc-500">まだリリースがありません。</p>
              )}
            </div>

            {/* Open Issues */}
            <div className="mb-8">
              <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-300">
                <CircleDot className="h-4 w-4" /> オープン Issue
                <span className="text-xs font-normal text-zinc-500">
                  ({repo.openIssues.length})
                </span>
              </h4>
              {repo.openIssues.length > 0 ? (
                <ul className="space-y-2">
                  {repo.openIssues.map((issue) => (
                    <li key={issue.number}>
                      <a
                        href={issue.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-2 rounded-md border border-zinc-800/50 bg-zinc-900/30 p-3 text-sm transition-colors hover:border-zinc-700 hover:bg-zinc-900/60"
                      >
                        <CircleDot className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-zinc-200">
                            <span className="text-zinc-500">#{issue.number}</span>{" "}
                            {issue.title}
                          </div>
                          {issue.labels.length > 0 && (
                            <div className="mt-1 flex flex-wrap gap-1">
                              {issue.labels.map((l) => (
                                <span
                                  key={l.name}
                                  className="rounded px-1.5 py-0.5 text-[10px]"
                                  style={{
                                    backgroundColor: `#${l.color}33`,
                                    color: `#${l.color}`,
                                  }}
                                >
                                  {l.name}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-zinc-500">
                  オープンな Issue はありません 🎉
                </p>
              )}
            </div>

            {/* Recent PRs */}
            <div>
              <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-300">
                <GitPullRequest className="h-4 w-4" /> 最近の PR
              </h4>
              {repo.recentPrs.length > 0 ? (
                <ul className="space-y-2">
                  {repo.recentPrs.map((pr) => (
                    <li key={pr.number}>
                      <a
                        href={pr.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-2 rounded-md border border-zinc-800/50 bg-zinc-900/30 p-3 text-sm transition-colors hover:border-zinc-700 hover:bg-zinc-900/60"
                      >
                        {pr.state === "closed" ? (
                          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-purple-400" />
                        ) : (
                          <GitPullRequest className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-zinc-200">
                            <span className="text-zinc-500">#{pr.number}</span>{" "}
                            {pr.title}
                          </div>
                          <div className="mt-1 text-xs text-zinc-500">
                            {pr.user?.login ? `@${pr.user.login}` : ""} ·{" "}
                            {formatDate(pr.updated_at)}
                          </div>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-zinc-500">最近の PR はありません。</p>
              )}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12 rounded-lg border border-zinc-800 bg-zinc-900/30 p-4 text-xs text-zinc-500">
        <p>
          Issue や機能要望は各リポジトリで直接報告できます。コントリビュートも歓迎です。
          データは GitHub API から 1 時間ごとに更新されます。
        </p>
      </div>
    </div>
  );
}
