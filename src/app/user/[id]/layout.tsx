import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ユーザープロフィール",
  robots: { index: false, follow: true },
};

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return children;
}
