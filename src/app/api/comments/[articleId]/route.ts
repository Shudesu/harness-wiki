import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

interface CommentRow {
  id: number;
  article_id: number;
  body: string;
  author_id: string;
  author_name: string;
  author_avatar: string;
  upvotes: number;
  created_at: string;
}

function formatRow(row: CommentRow) {
  return {
    id: String(row.id),
    articleId: String(row.article_id),
    body: row.body,
    authorId: row.author_id,
    authorName: row.author_name,
    authorAvatar: row.author_avatar,
    upvotes: row.upvotes,
    createdAt: row.created_at,
  };
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ articleId: string }> }
) {
  const { articleId } = await params;
  let db: D1Database;
  try {
    db = getRequestContext().env.DB;
  } catch {
    return NextResponse.json({ comments: [], demo: true });
  }

  const result = await db
    .prepare(
      "SELECT * FROM comments WHERE article_id = ? ORDER BY created_at ASC"
    )
    .bind(articleId)
    .all<CommentRow>();

  return NextResponse.json({
    comments: (result.results || []).map(formatRow),
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ articleId: string }> }
) {
  const { articleId } = await params;
  let db: D1Database;
  try {
    db = getRequestContext().env.DB;
  } catch {
    return NextResponse.json({ error: "No database" }, { status: 503 });
  }

  const body = (await request.json()) as Record<string, string>;
  const commentBody = body.body;
  const authorId = body.authorId;
  const authorName = body.authorName;
  const authorAvatar = body.authorAvatar;

  const result = await db
    .prepare(
      `INSERT INTO comments (article_id, body, author_id, author_name, author_avatar)
     VALUES (?, ?, ?, ?, ?)
     RETURNING *`
    )
    .bind(articleId, commentBody, authorId, authorName, authorAvatar)
    .first<CommentRow>();

  if (!result) {
    return NextResponse.json({ error: "Insert failed" }, { status: 500 });
  }

  return NextResponse.json(formatRow(result));
}
