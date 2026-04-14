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
          <main className="pt-16">{children}</main>
          <Footer />
          <BottomNav />
        </AuthProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Harness Wiki",
              url: SITE_URL,
              description:
                "LINE, X, Instagram Harness の使い方・Tips・プラグインをコミュニティで共有するナレッジベース",
              potentialAction: {
                "@type": "SearchAction",
                target: `${SITE_URL}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
