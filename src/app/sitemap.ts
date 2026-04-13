import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://wiki.harness.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/line`, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/x`, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/ig`, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/search`, changeFrequency: "weekly", priority: 0.5 },
    {
      url: `${BASE_URL}/getting-started`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/plugins`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];
}
