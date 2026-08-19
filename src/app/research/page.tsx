import type { Metadata } from "next";
import { ArrowUpRight, Database, FileText } from "lucide-react";
import { HARNESS_BRAND_ID, researchArticles, researchCollections, SITE_URL } from "@/lib/research";

export const metadata: Metadata = {
  title: "Harness Research 横断索引",
  description: "L Harness、IG Harness、X Harnessの実装を固定Gitコミットから検証した一次技術資料30本の横断索引。",
  alternates: { canonical: `${SITE_URL}/research` },
};

export default function ResearchPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/research#collection`,
    name: "Harness Research 横断索引",
    url: `${SITE_URL}/research`,
    description: metadata.description,
    about: { "@id": HARNESS_BRAND_ID },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: researchArticles.length,
      itemListElement: researchArticles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: article.title,
        url: article.url,
      })),
    },
  };

  return (
    <div className="mx-auto max-w-5xl px-4 pb-24 pt-4">
      <header className="border-b border-zinc-800 pb-8">
        <p className="text-sm font-medium text-cyan-400">一次情報・技術検証</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Harness Research 横断索引</h1>
        <p className="mt-4 max-w-3xl leading-7 text-zinc-400">
          Wikiは操作方法と用語、各Researchサイトは固定Gitコミットに基づく技術検証を担当します。
          ここでは3製品・30本の一次技術資料を横断して探せます。
        </p>
      </header>

      <div className="mt-10 space-y-12">
        {researchCollections.map((collection) => (
          <section key={collection.product} aria-labelledby={collection.product.replace(" ", "-")}>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 id={collection.product.replace(" ", "-")} className="text-2xl font-bold">{collection.product}</h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">{collection.description}</p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2 text-xs">
                <a href={collection.hubUrl} className="inline-flex items-center gap-1 rounded-full border border-zinc-700 px-3 py-1.5 text-zinc-300 hover:border-cyan-500 hover:text-cyan-300">Research本体 <ArrowUpRight size={12} /></a>
                <a href={collection.catalogUrl} className="inline-flex items-center gap-1 rounded-full border border-zinc-800 px-3 py-1.5 text-zinc-400 hover:text-zinc-200"><Database size={12} /> JSON catalog</a>
                <a href={collection.fullTextUrl} className="inline-flex items-center gap-1 rounded-full border border-zinc-800 px-3 py-1.5 text-zinc-400 hover:text-zinc-200"><FileText size={12} /> AI全文</a>
              </div>
            </div>
            <ol className="mt-5 grid gap-3 sm:grid-cols-2">
              {collection.articles.map((article, index) => (
                <li key={article.url}>
                  <a href={article.url} className="group flex h-full gap-3 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 transition-colors hover:border-zinc-600">
                    <span className="mt-0.5 text-xs tabular-nums text-zinc-600">{String(index + 1).padStart(2, "0")}</span>
                    <span className="text-sm leading-6 text-zinc-300 group-hover:text-white">{article.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
