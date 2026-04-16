import type { Metadata } from "next";
import Link from "next/link";
import { GitPullRequest, CircleDot, Tag, ExternalLink, CheckCircle2, XCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "アップデート",
  description: "Harness シリーズの最新リリース、Issue、PR の一覧",
};

// Revalidate every hour (GitHub API rate limit friendly)
export const revalidate = 3600;

const REPOS = [
  { key: "line", owner: "Shudesu", name: "line-harness-oss", label: "LINE Harness", accent: "text-green-400", border: "border-green-500/30" },
  { key: "x", owner: "Shudesu", name: "x-harness", label: "X Harness", accent: "text-blue-400", border: "border-blue-500/30" },
  { key: "ig", owner: "Shudesu", name: "ig-harness", label: "IG Harness", accent: "text-pink-400", border: "border-pink-500/30" },
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
  // Use dedicated endpoints so open-issue and PR lists don't compete for the same page window
  const [releases, openIssuesRaw, prsRaw] = await Promise.all([
    gh<Release[]>(`https://api.github.com/repos/${owner}/${name}/releases?per_page=3`),
    gh<Issue[]>(`https://api.github.com/repos/${owner}/${name}/issues?state=open&per_page=10&sort=updated`),
    gh<Issue[]>(`https://api.github.com/search/issues?q=repo:${owner}/${name}+type:pr&sort=updated&order=desc&per_page=10`).then(
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

export default async function UpdatesPage() {
  const data = await Promise.all(REPOS.map(async (r) => ({ ...r, ...(await loadRepoData(r.owner, r.name)) })));

  return (
    <div className="mx-auto max-w-5xl px-4 pb-20">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">アップデート</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Harness シリーズの最新リリース・Issue・PR。データは GitHub から1時間ごとに自動取得。
        </p>
      </div>

      <div className="space-y-12">
        {data.map((repo) => (
          <section key={repo.key} className={`rounded-xl border ${repo.border} bg-zinc-950/40 p-6`}>
            <div className="mb-6 flex items-center justify-between">
              <h2 className={`text-2xl font-bold ${repo.accent}`}>{repo.label}</h2>
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
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-300">
                <Tag className="h-4 w-4" /> 最新リリース
              </h3>
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
                    <span className="text-xs text-zinc-500">{formatDate(repo.latestRelease.published_at)}</span>
                  </div>
                  {repo.latestRelease.name && (
                    <div className="mt-1 text-sm text-zinc-400">{repo.latestRelease.name}</div>
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
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-300">
                <CircleDot className="h-4 w-4" /> オープン Issue
                <span className="text-xs font-normal text-zinc-500">({repo.openIssues.length})</span>
              </h3>
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
                            <span className="text-zinc-500">#{issue.number}</span> {issue.title}
                          </div>
                          {issue.labels.length > 0 && (
                            <div className="mt-1 flex flex-wrap gap-1">
                              {issue.labels.map((l) => (
                                <span
                                  key={l.name}
                                  className="rounded px-1.5 py-0.5 text-[10px]"
                                  style={{ backgroundColor: `#${l.color}33`, color: `#${l.color}` }}
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
                <p className="text-sm text-zinc-500">オープンな Issue はありません 🎉</p>
              )}
            </div>

            {/* Recent PRs */}
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-300">
                <GitPullRequest className="h-4 w-4" /> 最近の PR
              </h3>
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
                            <span className="text-zinc-500">#{pr.number}</span> {pr.title}
                          </div>
                          <div className="mt-1 text-xs text-zinc-500">
                            {pr.user?.login ? `@${pr.user.login}` : ""} · {formatDate(pr.updated_at)}
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
