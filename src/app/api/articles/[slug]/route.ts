import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

interface ArticleRow {
  id: number;
  title: string;
  slug: string;
  category: string;
  product: string;
  body: string;
  cover_image: string | null;
  author_id: string;
  author_name: string;
  author_avatar: string;
  tags: string;
  status: string;
  upvotes: number;
  view_count: number;
  created_at: string;
  updated_at: string;
}

function formatRow(row: ArticleRow) {
  return {
    id: String(row.id),
    title: row.title,
    slug: row.slug,
    category: row.category,
    product: row.product,
    body: row.body,
    coverImage: row.cover_image,
    authorId: row.author_id,
    authorName: row.author_name,
    authorAvatar: row.author_avatar,
    tags: JSON.parse(row.tags || "[]"),
    status: row.status,
    upvotes: row.upvotes,
    viewCount: row.view_count,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  let db: D1Database;
  try {
    db = getRequestContext().env.DB;
  } catch {
    return NextResponse.json({ article: null, demo: true });
  }

  const row = await db
    .prepare("SELECT * FROM articles WHERE slug = ? LIMIT 1")
    .bind(slug)
    .first<ArticleRow>();

  if (!row) {
    return NextResponse.json({ article: null }, { status: 404 });
  }

  await db
    .prepare("UPDATE articles SET view_count = view_count + 1 WHERE id = ?")
    .bind(row.id)
    .run();

  return NextResponse.json({ article: formatRow(row) });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  let db: D1Database;
  try {
    db = getRequestContext().env.DB;
  } catch {
    return NextResponse.json({ error: "No database" }, { status: 503 });
  }

  const body = (await request.json()) as { action?: string };

  if (body.action === "upvote") {
    await db
      .prepare("UPDATE articles SET upvotes = upvotes + 1 WHERE slug = ?")
      .bind(slug)
      .run();
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
