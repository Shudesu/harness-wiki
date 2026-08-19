import type { MetadataRoute } from "next";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { SITE_URL } from "@/lib/research";

export const runtime = "edge";

const BASE_URL = SITE_URL;

const STATIC_PAGES: MetadataRoute.Sitemap = [
  { url: BASE_URL, changeFrequency: "daily", priority: 1 },
  { url: `${BASE_URL}/line`, changeFrequency: "daily", priority: 0.8 },
  { url: `${BASE_URL}/x`, changeFrequency: "daily", priority: 0.8 },
  { url: `${BASE_URL}/ig`, changeFrequency: "daily", priority: 0.8 },
  { url: `${BASE_URL}/research`, changeFrequency: "weekly", priority: 0.9 },
  { url: `${BASE_URL}/welcome`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/updates`, changeFrequency: "weekly", priority: 0.7 },
  { url: `${BASE_URL}/search`, changeFrequency: "weekly", priority: 0.5 },
  {
    url: `${BASE_URL}/getting-started`,
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/plugins`,
    changeFrequency: "weekly",
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/use-cases`,
    changeFrequency: "weekly",
    priority: 0.8,
  },
];

// 記事ページは D1 から動的に列挙する。個別記事が sitemap に載っていないと
// 検索エンジン / AI クローラーからの発見性を丸ごと失う。
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let articlePages: MetadataRoute.Sitemap = [];
  try {
    const db = getRequestContext().env.DB;
    const { results } = await db
      .prepare(
        "SELECT slug, updated_at FROM articles WHERE status IN ('published', 'pinned') AND (type = 'article' OR type IS NULL) ORDER BY updated_at DESC"
      )
      .all<{ slug: string; updated_at: string }>();
    articlePages = (results ?? []).map((row) => ({
      url: `${BASE_URL}/article/${row.slug}`,
      lastModified: new Date(row.updated_at.replace(" ", "T") + "Z"),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    // D1 に到達できない場合も静的ページだけは返す（sitemap 全体を落とさない）
  }
  return [...STATIC_PAGES, ...articlePages];
}
