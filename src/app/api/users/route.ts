import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

interface UserRow {
  uid: string;
  display_name: string;
  avatar_url: string;
  github_username: string;
  role: string;
  article_count: number;
  joined_at: string;
}

function formatRow(row: UserRow) {
  return {
    uid: row.uid,
    displayName: row.display_name,
    avatarUrl: row.avatar_url,
    githubUsername: row.github_username,
    role: row.role,
    articleCount: row.article_count,
    joinedAt: row.joined_at,
  };
}

export async function POST(request: NextRequest) {
  let db: D1Database;
  try {
    db = getRequestContext().env.DB;
  } catch {
    return NextResponse.json({ error: "No database" }, { status: 503 });
  }

  const body = (await request.json()) as Record<string, string>;
  const { uid, displayName, avatarUrl, githubUsername } = body;

  const result = await db
    .prepare(
      `INSERT INTO users (uid, display_name, avatar_url, github_username)
     VALUES (?, ?, ?, ?)
     ON CONFLICT(uid) DO UPDATE SET
       display_name = excluded.display_name,
       avatar_url = excluded.avatar_url,
       github_username = excluded.github_username
     RETURNING *`
    )
    .bind(uid, displayName, avatarUrl, githubUsername)
    .first<UserRow>();

  if (!result) {
    return NextResponse.json({ error: "Upsert failed" }, { status: 500 });
  }

  return NextResponse.json(formatRow(result));
}
