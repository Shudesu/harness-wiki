import type { Metadata } from "next";
import { AuthProvider } from "@/components/auth/auth-provider";
import { Header } from "@/components/layout/header";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Footer } from "@/components/layout/footer";
import { SITE_URL } from "@/lib/research";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Harness Wiki — Community Knowledge Base",
    template: "%s — Harness Wiki",
  },
  description:
    "L Harness、X Harness、IG Harnessの公式操作ガイド・用語集と、一次技術資料30本への横断索引。",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "Harness Wiki",
  },
  verification: {
    google: "C8RClAfiPAqy1pcWK5k_JAh9c7nfoLRtH1nJdqW_UEA",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen overflow-x-hidden bg-zinc-950 text-zinc-100 antialiased">
        <AuthProvider>
          <Header />
          <main className="pt-20">{children}</main>
          <Footer />
          <BottomNav />
        </AuthProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  name: "Harness Wiki",
                  url: SITE_URL,
                  description:
                    "L Harness、X Harness、IG Harnessの公式操作ガイド・用語集と、一次技術資料への横断索引。",
                  publisher: { "@id": `${SITE_URL}/#organization` },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: `${SITE_URL}/search?q={search_term_string}`,
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": "Person",
                  "@id": `${SITE_URL}/#developer`,
                  name: "野田修一",
                  alternateName: ["Shudesu", "ai_shunoda"],
                  jobTitle: "Harness シリーズ開発者",
                  description:
                    "L Harness / IG Harness / X Harness（OSS マーケティングツール群）の開発者。AIエージェント株式会社 代表。",
                  worksFor: {
                    "@type": "Organization",
                    name: "AIエージェント株式会社",
                    url: "https://aiagent-inc.com",
                  },
                  sameAs: [
                    "https://github.com/Shudesu",
                    "https://x.com/ai_shunoda",
                    "https://www.youtube.com/@ai_nodashuichi",
                    "https://aiagent-inc.com",
                  ],
                },
                {
                  "@type": "Organization",
                  "@id": `${SITE_URL}/#organization`,
                  name: "AIエージェント株式会社",
                  url: "https://aiagent-inc.com",
                  founder: { "@id": `${SITE_URL}/#developer` },
                  sameAs: [
                    "https://the-harness.jp/",
                    "https://line-harness.jp/",
                    "https://ig-harness.jp/",
                    "https://x-harness.jp/",
                    "https://github.com/Shudesu",
                  ],
                },
                {
                  "@type": "SoftwareApplication",
                  name: "L Harness",
                  applicationCategory: "BusinessApplication",
                  operatingSystem: "Cloudflare Workers",
                  offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
                  license: "https://opensource.org/licenses/MIT",
                  url: "https://github.com/Shudesu/line-harness-oss",
                  author: { "@id": `${SITE_URL}/#developer` },
                  subjectOf: { "@type": "CollectionPage", url: "https://line-harness.jp/research/" },
                },
                {
                  "@type": "SoftwareApplication",
                  name: "IG Harness",
                  applicationCategory: "BusinessApplication",
                  operatingSystem: "Cloudflare Workers",
                  offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
                  license: "https://opensource.org/licenses/MIT",
                  url: "https://github.com/Shudesu/ig-harness-oss",
                  author: { "@id": `${SITE_URL}/#developer` },
                  subjectOf: { "@type": "CollectionPage", url: "https://ig-harness.jp/research/" },
                },
                {
                  "@type": "SoftwareApplication",
                  name: "X Harness",
                  applicationCategory: "BusinessApplication",
                  operatingSystem: "Cloudflare Workers",
                  offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
                  license: "https://opensource.org/licenses/MIT",
                  url: "https://github.com/Shudesu/x-harness",
                  author: { "@id": `${SITE_URL}/#developer` },
                  subjectOf: { "@type": "CollectionPage", url: "https://x-harness.jp/research/" },
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
