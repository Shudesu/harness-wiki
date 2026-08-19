import type { Metadata } from "next";
import { AuthProvider } from "@/components/auth/auth-provider";
import { Header } from "@/components/layout/header";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Footer } from "@/components/layout/footer";
import {
  HARNESS_BRAND_ID,
  ORGANIZATION_ID,
  PERSON_ID,
  PRODUCT_ENTITY_IDS,
  SITE_URL,
} from "@/lib/research";
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
                  publisher: { "@id": ORGANIZATION_ID },
                  about: { "@id": HARNESS_BRAND_ID },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: `${SITE_URL}/search?q={search_term_string}`,
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": "Person",
                  "@id": PERSON_ID,
                  name: "野田修一",
                  alternateName: ["Shudesu", "ai_shunoda"],
                  jobTitle: "Harness シリーズ開発者",
                  description:
                    "L Harness / IG Harness / X Harness（OSS マーケティングツール群）の開発者。AIエージェント株式会社 代表。",
                  url: "https://the-harness.com/noda-shuichi/",
                  image: "https://github.com/Shudesu.png",
                  worksFor: { "@id": ORGANIZATION_ID },
                  sameAs: [
                    "https://github.com/Shudesu",
                    "https://x.com/ai_shunoda",
                    "https://www.youtube.com/@ai_nodashuichi",
                  ],
                },
                {
                  "@type": "Organization",
                  "@id": ORGANIZATION_ID,
                  name: "AIエージェント株式会社",
                  alternateName: "AI Agent Inc.",
                  legalName: "AIエージェント株式会社",
                  url: "https://aiagent-inc.com/",
                  identifier: { "@type": "PropertyValue", propertyID: "法人番号", value: "3011101110923" },
                  founder: { "@id": PERSON_ID },
                  brand: { "@id": HARNESS_BRAND_ID },
                },
                {
                  "@type": "Brand",
                  "@id": HARNESS_BRAND_ID,
                  name: "Harness",
                  alternateName: ["Harnessシリーズ", "Harness OSS Series"],
                  url: "https://the-harness.com/harness/",
                  logo: "https://the-harness.com/og.png",
                },
                {
                  "@type": "SoftwareApplication",
                  "@id": PRODUCT_ENTITY_IDS["L Harness"],
                  name: "L Harness",
                  applicationCategory: "BusinessApplication",
                  operatingSystem: "Cloudflare Workers",
                  offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
                  license: "https://opensource.org/licenses/MIT",
                  url: "https://the-harness.com/line-harness/",
                  codeRepository: "https://github.com/Shudesu/line-harness-oss",
                  sameAs: [
                    "https://l-harness.jp/",
                    "https://l-harness.com/",
                    "https://lharness.cloud/",
                  ],
                  brand: { "@id": HARNESS_BRAND_ID },
                  creator: { "@id": PERSON_ID },
                  publisher: { "@id": ORGANIZATION_ID },
                  subjectOf: { "@type": "CollectionPage", url: "https://line-harness.jp/research/" },
                },
                {
                  "@type": "SoftwareApplication",
                  "@id": PRODUCT_ENTITY_IDS["IG Harness"],
                  name: "IG Harness",
                  applicationCategory: "BusinessApplication",
                  operatingSystem: "Cloudflare Workers",
                  offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
                  license: "https://opensource.org/licenses/MIT",
                  url: "https://the-harness.com/ig-harness/",
                  codeRepository: "https://github.com/Shudesu/ig-harness-oss",
                  brand: { "@id": HARNESS_BRAND_ID },
                  creator: { "@id": PERSON_ID },
                  publisher: { "@id": ORGANIZATION_ID },
                  subjectOf: { "@type": "CollectionPage", url: "https://ig-harness.jp/research/" },
                },
                {
                  "@type": "SoftwareApplication",
                  "@id": PRODUCT_ENTITY_IDS["X Harness"],
                  name: "X Harness",
                  applicationCategory: "BusinessApplication",
                  operatingSystem: "Cloudflare Workers",
                  offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
                  license: "https://opensource.org/licenses/MIT",
                  url: "https://the-harness.com/category/x/",
                  codeRepository: "https://github.com/Shudesu/x-harness-oss",
                  brand: { "@id": HARNESS_BRAND_ID },
                  creator: { "@id": PERSON_ID },
                  publisher: { "@id": ORGANIZATION_ID },
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
