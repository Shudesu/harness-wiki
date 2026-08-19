import type { Metadata } from "next";
import { SITE_URL } from "@/lib/research";

export const metadata: Metadata = {
  title: "検索",
  description: "Harness Wikiの記事を検索します。",
  alternates: { canonical: `${SITE_URL}/search` },
  robots: { index: false, follow: true },
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
