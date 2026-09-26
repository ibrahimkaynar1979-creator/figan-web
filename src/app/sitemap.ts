import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.22yayinevi.com";
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/basili-kitap-yayini`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/e-kitap-yayini`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/sesli-kitap`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/yazar-sitesi`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/dijital-dagitim`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/yabanci-dil-ceviri`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/yayin-alanlarimiz`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/kurucu-yazar`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/yazarlar/ibrahim-kaynar`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/kitaplar/icimdeki-ibrahim`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/gizlilik`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/kvkk`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/kullanim-kosullari`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
