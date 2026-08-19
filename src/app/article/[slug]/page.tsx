import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { MarkdownRenderer } from "@/components/article/markdown-renderer";
import { VoteButton } from "@/components/article/vote-button";
import { CommentSection } from "@/components/article/comment-section";
import { CopyButton } from "@/components/article/copy-button";
import { Sidebar } from "@/components/layout/sidebar";
import { Toc } from "@/components/article/toc";
import Link from "next/link";
import type { Article, ArticleStatus, Category, Product } from "@/types";
import { SITE_URL } from "@/lib/research";

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

const productStyles: Record<string, { bg: string; label: string }> = {
  line: { bg: "bg-green-500/10 text-green-400 border-green-500/20", label: "L Harness" },
  x: { bg: "bg-blue-500/10 text-blue-400 border-blue-500/20", label: "X Harness" },
  ig: { bg: "bg-pink-500/10 text-pink-400 border-pink-500/20", label: "IG Harness" },
  all: { bg: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20", label: "All" },
};

const categoryLabels: Record<string, string> = {
  "getting-started": "はじめに",
  "use-cases": "活用事例",
  plugins: "プラグイン",
  tips: "Tips & 裏技",
  api: "APIリファレンス",
  changelog: "変更履歴",
};

function parseDate(value: string) {
  return new Date(value.includes("T") ? value : `${value.replace(" ", "T")}Z`);
}

async function getArticle(slug: string): Promise<Article | null> {
  try {
    const db = getRequestContext().env.DB;
    const row = await db
      .prepare("SELECT * FROM articles WHERE slug = ? AND status IN ('published', 'pinned') LIMIT 1")
      .bind(slug)
      .first<ArticleRow>();
    if (!row) return null;
    return {
      id: String(row.id),
      title: row.title,
      slug: row.slug,
      category: row.category as Category,
      product: row.product as Product,
      body: row.body,
      coverImage: row.cover_image,
      authorId: row.author_id,
      authorName: row.author_name,
      authorAvatar: row.author_avatar,
      tags: JSON.parse(row.tags || "[]") as string[],
      status: row.status as ArticleStatus,
      upvotes: row.upvotes,
      viewCount: row.view_count,
      createdAt: parseDate(row.created_at),
      updatedAt: parseDate(row.updated_at),
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "記事が見つかりません" };
  const description = article.body.replace(/[#>*_`\[\]()]/g, " ").replace(/\s+/g, " ").trim().slice(0, 155);
  return {
    title: article.title,
    description,
    alternates: { canonical: `${SITE_URL}/article/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description,
      url: `${SITE_URL}/article/${article.slug}`,
      publishedTime: article.createdAt.toISOString(),
      modifiedTime: article.updatedAt.toISOString(),
      authors: [article.authorName],
      tags: article.tags,
      images: article.coverImage ? [article.coverImage] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();
  const product = productStyles[article.product] || productStyles.all;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/article/${article.slug}#article`,
    headline: article.title,
    url: `${SITE_URL}/article/${article.slug}`,
    datePublished: article.createdAt.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    author: { "@type": "Person", name: article.authorName },
    publisher: { "@id": `${SITE_URL}/#organization` },
    articleSection: categoryLabels[article.category] || article.category,
    keywords: article.tags.join(", "),
    image: article.coverImage || undefined,
  };

  return (
    <div className="mx-auto flex max-w-7xl gap-8 px-4 pb-20">
      {article.product !== "all" && <Sidebar product={article.product} currentSlug={article.slug} />}
      <article className="flex min-w-0 max-w-3xl flex-1 flex-col py-8">
        <nav aria-label="パンくず" className="mb-4 flex flex-wrap items-center gap-1.5 text-[13px] text-zinc-500">
          <Link href="/" className="hover:text-zinc-300">Home</Link><span>/</span>
          {article.product !== "all" && <><Link href={`/${article.product}`} className="hover:text-zinc-300">{product.label}</Link><span>/</span></>}
          <span className="text-zinc-400">{categoryLabels[article.category] || article.category}</span><span>/</span>
          <span className="truncate text-zinc-300">{article.title}</span>
        </nav>

        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className={`rounded-full border px-3 py-1 text-xs font-medium ${product.bg}`}>{product.label}</span>
          <span className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-400">{categoryLabels[article.category] || article.category}</span>
          <span className="text-zinc-600">·</span>
          <time dateTime={article.createdAt.toISOString()} className="text-zinc-500">{article.createdAt.toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" })}</time>
        </div>

        <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{article.title}</h1>

        <div className="mt-5 flex items-center gap-3 border-b border-zinc-800 pb-6">
          {article.authorAvatar && <img src={article.authorAvatar} alt={`${article.authorName}のプロフィール画像`} className="h-10 w-10 rounded-full ring-2 ring-zinc-800" />}
          <div><p className="text-sm font-medium text-zinc-200">{article.authorName}</p><p className="text-xs text-zinc-500">Author</p></div>
          <div className="ml-auto"><CopyButton content={`# ${article.title}\n\n${article.body}`} /></div>
        </div>

        {article.coverImage && <img src={article.coverImage} alt={article.title} className="mt-8 w-full rounded-2xl border border-zinc-800 object-cover" />}
        <div className="mt-8"><MarkdownRenderer content={article.body} /></div>

        {article.tags.length > 0 && <div className="mt-10 flex flex-wrap gap-2 border-t border-zinc-800 pt-6">{article.tags.map((tag) => <span key={tag} className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-400">#{tag}</span>)}</div>}
        <div className="mt-6 flex items-center gap-4 border-t border-zinc-800 pt-6"><VoteButton articleSlug={article.slug} initialCount={article.upvotes} /><span className="text-sm text-zinc-500">この記事が役に立ったら投票してください</span></div>
        <div className="mt-8"><CommentSection articleId={article.id} /></div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </article>
      <Toc markdown={article.body} />
    </div>
  );
}
