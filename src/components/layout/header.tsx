"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LoginButton } from "@/components/auth/login-button";

const productTabs = [
  { label: "All", href: "/" },
  { label: "LINE", href: "/line" },
  { label: "X", href: "/x" },
  { label: "IG", href: "/ig" },
] as const;

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-lg font-bold tracking-tight">
            Harness Wiki
          </Link>
          <nav className="hidden items-center gap-1 sm:flex">
            {productTabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  pathname === tab.href
                    ? "bg-zinc-800 text-zinc-100"
                    : "text-zinc-400 hover:text-zinc-100"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>
        <LoginButton />
      </div>
    </header>
  );
}
