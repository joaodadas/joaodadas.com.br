import { posts } from "#site/content";
import type { MetadataRoute } from "next";

const BASE = "https://joaodadas.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [
    { url: BASE, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/blog`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/gallery`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/guestbook`, changeFrequency: "monthly", priority: 0.5 },
    ...postEntries,
  ];
}
