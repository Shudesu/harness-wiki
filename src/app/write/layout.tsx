import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "記事を書く",
  robots: { index: false, follow: false },
};

export default function WriteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
