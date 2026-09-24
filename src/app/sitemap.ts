import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.fiyayinevi.com";
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/gizlilik`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/kvkk`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/kullanim-kosullari`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
