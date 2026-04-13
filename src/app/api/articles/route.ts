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

export async function GET(request: NextRequest) {
  let db: D1Database;
  try {
    db = getRequestContext().env.DB;
  } catch {
    return NextResponse.json({ articles: [], demo: true });
  }

  const url = new URL(request.url);
  const product = url.searchParams.get("product");
  const category = url.searchParams.get("category");
  const type = url.searchParams.get("type");
  const limit = url.searchParams.get("limit") || "50";
  const search = url.searchParams.get("q");

  let sql = "SELECT * FROM articles WHERE status IN ('published', 'pinned')";
  const params: string[] = [];

  if (type) {
    sql += " AND type = ?";
    params.push(type);
  } else {
    sql += " AND (type = 'article' OR type IS NULL)";
  }

  if (product) {
    sql += " AND product = ?";
    params.push(product);
  }
  if (category) {
    sql += " AND category = ?";
    params.push(category);
  }
  if (search) {
    sql += " AND (title LIKE ? OR body LIKE ? OR tags LIKE ?)";
    const q = `%${search}%`;
    params.push(q, q, q);
  }

  sql += " ORDER BY created_at DESC LIMIT ?";
  params.push(limit);

  const result = await db.prepare(sql).bind(...params).all<ArticleRow>();

  return NextResponse.json({
    articles: (result.results || []).map(formatRow),
  });
}

export async function POST(request: NextRequest) {
  let db: D1Database;
  try {
    db = getRequestContext().env.DB;
  } catch {
    return NextResponse.json({ error: "No database" }, { status: 503 });
  }

  const body = (await request.json()) as Record<string, unknown>;
  const title = body.title as string;
  const slug = body.slug as string;
  const category = body.category as string;
  const product = body.product as string;
  const articleBody = body.body as string;
  const coverImage = body.coverImage as string | null;
  const authorId = body.authorId as string;
  const authorName = body.authorName as string;
  const authorAvatar = body.authorAvatar as string;
  const tags = body.tags as string[];
  const status = body.status as string;
  const type = (body.type as string) || "article";

  const result = await db
    .prepare(
      `INSERT INTO articles (title, slug, category, product, body, cover_image, author_id, author_name, author_avatar, tags, status, type)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     RETURNING *`
    )
    .bind(
      title,
      slug,
      category,
      product,
      articleBody,
      coverImage || null,
      authorId,
      authorName,
      authorAvatar,
      JSON.stringify(tags || []),
      status || "published",
      type
    )
    .first<ArticleRow>();

  if (!result) {
    return NextResponse.json({ error: "Insert failed" }, { status: 500 });
  }

  return NextResponse.json(formatRow(result));
}
