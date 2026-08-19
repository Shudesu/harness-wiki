import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/research";

export default function robots(): MetadataRoute.Robots {
  const crawlers = [
    "Googlebot", "GoogleOther", "Google-Extended", "Bingbot",
    "OAI-SearchBot", "GPTBot", "ChatGPT-User", "ClaudeBot",
    "Claude-SearchBot", "PerplexityBot", "Applebot", "Amazonbot",
  ];
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...crawlers.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
