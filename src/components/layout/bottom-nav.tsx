"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, PenSquare, User } from "lucide-react";
import { useAuth } from "@/components/auth/auth-provider";

export function BottomNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  const items = [
    { icon: Home, label: "ホーム", href: "/" },
    { icon: Search, label: "検索", href: "/search" },
    { icon: PenSquare, label: "投稿", href: "/write" },
    {
      icon: User,
      label: "マイページ",
      href: user ? `/user/${user.uid}` : "/write",
    },
  ] as const;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-800 bg-zinc-950/90 backdrop-blur-md sm:hidden">
      <div className="flex items-center justify-around py-2">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 ${
                active ? "text-blue-400" : "text-zinc-500"
              }`}
            >
              <item.icon size={20} />
              <span className="text-[10px]">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
