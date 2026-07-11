import type { Metadata } from "next";
import { AuthProvider } from "@/components/auth/auth-provider";
import { Header } from "@/components/layout/header";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://wiki.harness.dev";

export const metadata: Metadata = {
  title: {
    default: "Harness Wiki — Community Knowledge Base",
    template: "%s — Harness Wiki",
  },
  description:
    "LINE, X, Instagram Harness の使い方・Tips・プラグインをコミュニティで共有するナレッジベース",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "Harness Wiki",
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
                    "LINE, X, Instagram Harness の使い方・Tips・プラグインをコミュニティで共有するナレッジベース",
                  publisher: { "@id": `${SITE_URL}/#developer` },
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
                    "LINE Harness / IG Harness / X Harness（OSS マーケティングツール群）の開発者。AIエージェント株式会社 代表。",
                  worksFor: {
                    "@type": "Organization",
                    name: "AIエージェント株式会社",
                    url: "https://aiagent-inc.com",
                  },
                  sameAs: [
                    "https://github.com/Shudesu",
                    "https://x.com/ai_shunoda",
                    "https://aiagent-inc.com",
                  ],
                },
                {
                  "@type": "SoftwareApplication",
                  name: "LINE Harness",
                  applicationCategory: "BusinessApplication",
                  operatingSystem: "Cloudflare Workers",
                  offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
                  license: "https://opensource.org/licenses/MIT",
                  url: "https://github.com/Shudesu/line-harness-oss",
                  author: { "@id": `${SITE_URL}/#developer` },
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
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
