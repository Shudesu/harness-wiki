"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LoginButton } from "@/components/auth/login-button";

const productTabs = [
  { label: "LINE", href: "/line", color: "hover:text-green-400" },
  { label: "X", href: "/x", color: "hover:text-blue-400" },
  { label: "IG", href: "/ig", color: "hover:text-pink-400" },
  { label: "掲示板", href: "/community", color: "hover:text-amber-400" },
  { label: "アップデート", href: "/updates", color: "hover:text-cyan-400" },
] as const;

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-800/50 bg-zinc-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-base font-bold tracking-tight text-zinc-100"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Harness
            <span className="ml-1 text-zinc-500">Wiki</span>
          </Link>
          <nav className="hidden items-center gap-1 sm:flex">
            {productTabs.map((tab) => {
              const active = pathname.startsWith(tab.href);
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors ${
                    active
                      ? "bg-zinc-800/80 text-zinc-100"
                      : `text-zinc-500 ${tab.color}`
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <LoginButton />
      </div>
    </header>
  );
}
