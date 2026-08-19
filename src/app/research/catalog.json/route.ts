import { NextResponse } from "next/server";
import { researchArticles, researchCollections, SITE_URL } from "@/lib/research";

export const runtime = "edge";

export function GET() {
  return NextResponse.json(
    {
      "@context": "https://schema.org",
      "@type": "DataCatalog",
      "@id": `${SITE_URL}/research/catalog.json#catalog`,
      name: "Harness Research 横断カタログ",
      url: `${SITE_URL}/research/`,
      description: "L Harness、IG Harness、X Harnessの一次技術資料30本を発見するための横断カタログ。本文の正本は各.jpドメインにあります。",
      numberOfItems: researchArticles.length,
      dataset: researchCollections.map((collection) => ({
        "@type": "Dataset",
        name: `${collection.product} Research`,
        description: collection.description,
        url: collection.hubUrl,
        distribution: [
          { "@type": "DataDownload", encodingFormat: "application/ld+json", contentUrl: collection.catalogUrl },
          { "@type": "DataDownload", encodingFormat: "text/plain", contentUrl: collection.fullTextUrl },
        ],
        hasPart: collection.articles.map((article) => ({ "@type": "TechArticle", headline: article.title, url: article.url })),
      })),
    },
    { headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" } }
  );
}
