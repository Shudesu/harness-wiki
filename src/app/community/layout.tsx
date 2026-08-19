import type { Metadata } from "next";
import { SITE_URL } from "@/lib/research";

export const metadata: Metadata = {
  title: "掲示板",
  description: "Harness利用者の質問・相談・情報共有を掲載する公式コミュニティ。",
  alternates: { canonical: `${SITE_URL}/community` },
};

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
