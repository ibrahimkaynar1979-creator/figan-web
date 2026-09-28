"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type TocItem = {
  label?: string;
  href?: string;
  subitems?: TocItem[];
};

type Props = {
  title: string;
  subtitle?: string | null;
  author?: string;
  coverUrl?: string | null;
  epubUrl: string;
  slug: string;
};

declare global {
  interface Window {
    ePub?: (source: string) => any;
  }
}

let epubLoader: Promise<void> | null = null;

function loadEpubJs() {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.ePub) return Promise.resolve();
  if (epubLoader) return epubLoader;

  epubLoader = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>("script[data-22-epubjs]");
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("EPUB motoru yüklenemedi.")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/epubjs@0.3.93/dist/epub.min.js";
    script.async = true;
    script.dataset["22Epubjs"] = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("EPUB motoru yüklenemedi."));
    document.head.appendChild(script);
  });

  return epubLoader;
}

function flattenToc(items: TocItem[]): TocItem[] {
  return items.flatMap(item => [item, ...(item.subitems ? flattenToc(item.subitems) : [])]);
}

export default function DatabaseEpubReader({
  title,
  subtitle,
  author,
  coverUrl,
  epubUrl,
  slug,
}: Props) {
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const bookRef = useRef<any>(null);
  const renditionRef = useRef<any>(null);
  const [toc, setToc] = useState<TocItem[]>([]);
  const [tocOpen, setTocOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [fontSize, setFontSize] = useState(100);

  const flatToc = useMemo(() => flattenToc(toc), [toc]);

  useEffect(() => {
    let cancelled = false;

    const start = async () => {
      try {
        await loadEpubJs();
        if (cancelled || !viewerRef.current || !window.ePub) return;

        const book = window.ePub(epubUrl);
        bookRef.current = book;

        const rendition = book.renderTo(viewerRef.current, {
          width: "100%",
          height: "100%",
          spread: "auto",
          flow: "paginated",
        });
        renditionRef.current = rendition;

        rendition.themes.default({
          body: {
            "font-family": "Georgia, 'Times New Roman', serif",
            color: "#2a211b",
            "line-height": "1.72",
            padding: "0 2%",
          },
          p: {
            "font-size": "1em",
          },
          h1: {
            "font-family": "Georgia, 'Times New Roman', serif",
          },
          h2: {
            "font-family": "Georgia, 'Times New Roman', serif",
          },
        });

        await rendition.display();

        const navigation = await book.loaded.navigation;
        if (!cancelled) setToc(navigation?.toc || []);

        try {
          await book.locations.generate(1200);
        } catch {}

        rendition.on("relocated", (location: any) => {
          const percentage = location?.start?.percentage;
          if (typeof percentage === "number") {
            setProgress(Math.max(0, Math.min(100, Math.round(percentage * 100))));
          }
        });

        if (!cancelled) setReady(true);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "EPUB açılamadı.");
        }
      }
    };

    void start();

    return () => {
      cancelled = true;
      try { renditionRef.current?.destroy?.(); } catch {}
      try { bookRef.current?.destroy?.(); } catch {}
      renditionRef.current = null;
      bookRef.current = null;
    };
  }, [epubUrl]);

  useEffect(() => {
    renditionRef.current?.themes?.fontSize?.(`${fontSize}%`);
  }, [fontSize]);

  const goTo = async (href?: string) => {
    if (!href) return;
    await renditionRef.current?.display?.(href);
    setTocOpen(false);
  };

  const previous = () => renditionRef.current?.prev?.();
  const next = () => renditionRef.current?.next?.();

  return (
    <main style={{ minHeight: "100vh", background: "#efe7dc", color: "#241a14", display: "grid", gridTemplateRows: "auto 1fr auto" }}>
      <header style={{ minHeight: 72, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18, padding: "12px 22px", borderBottom: "1px solid #d9ccbc", background: "rgba(250,247,242,.96)", position: "sticky", top: 0, zIndex: 30 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
          <button type="button" onClick={() => setTocOpen(value => !value)} style={{ border: "1px solid #d0c1b1", background: "#fffaf4", borderRadius: 999, width: 42, height: 42, cursor: "pointer" }} aria-label="İçindekiler">☰</button>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 10, letterSpacing: ".18em", color: "#9a6438", fontWeight: 800 }}>22 READER</div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 20, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "55vw" }}>{title}</div>
            <div style={{ fontSize: 11, color: "#76685d" }}>{author || "22 Yayınevi"}{subtitle ? ` · ${subtitle}` : ""}</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button type="button" onClick={() => setFontSize(value => Math.max(80, value - 10))} style={{ border: 0, background: "transparent", cursor: "pointer", fontSize: 17 }}>A−</button>
          <span style={{ fontSize: 11, minWidth: 36, textAlign: "center" }}>{fontSize}%</span>
          <button type="button" onClick={() => setFontSize(value => Math.min(150, value + 10))} style={{ border: 0, background: "transparent", cursor: "pointer", fontSize: 17 }}>A+</button>
        </div>
      </header>

      <section style={{ position: "relative", minHeight: 0 }}>
        {tocOpen && (
          <aside style={{ position: "absolute", inset: "0 auto 0 0", width: "min(360px, 86vw)", zIndex: 20, background: "#fbf7f1", borderRight: "1px solid #d6c8b8", padding: 22, overflowY: "auto", boxShadow: "18px 0 40px rgba(41,26,17,.08)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
              <strong style={{ fontFamily: "Georgia, serif", fontSize: 25 }}>İçindekiler</strong>
              <button type="button" onClick={() => setTocOpen(false)} style={{ border: 0, background: "transparent", fontSize: 22, cursor: "pointer" }}>×</button>
            </div>
            <div style={{ display: "grid", gap: 7 }}>
              {flatToc.length === 0 && <p style={{ color: "#7c6d62", fontSize: 12 }}>İçindekiler hazırlanıyor…</p>}
              {flatToc.map((item, index) => (
                <button key={`${item.href || "toc"}-${index}`} type="button" onClick={() => goTo(item.href)} style={{ textAlign: "left", padding: "11px 12px", borderRadius: 10, border: "1px solid #e0d5c8", background: "#fffaf5", cursor: "pointer", color: "#30231b" }}>
                  {item.label || `Bölüm ${index + 1}`}
                </button>
              ))}
            </div>
          </aside>
        )}

        <div style={{ height: "calc(100vh - 136px)", minHeight: 540, display: "grid", placeItems: "center", padding: "18px clamp(10px, 3vw, 42px)" }}>
          {coverUrl && !ready && !error && (
            <img src={coverUrl} alt={title} style={{ position: "absolute", width: 140, maxHeight: 210, objectFit: "contain", opacity: .24 }} />
          )}
          {!ready && !error && <div style={{ position: "absolute", zIndex: 2, marginTop: 250, fontSize: 12, color: "#75675d" }}>EPUB hazırlanıyor…</div>}
          {error && (
            <div style={{ maxWidth: 560, padding: 28, border: "1px solid #dbc9b6", background: "#fffaf5", borderRadius: 20 }}>
              <strong>Reader açılamadı.</strong>
              <p style={{ lineHeight: 1.6, color: "#74655a" }}>{error}</p>
              <a href={epubUrl} target="_blank" rel="noreferrer">EPUB dosyasını aç ↗</a>
            </div>
          )}
          <div ref={viewerRef} id={`epub-viewer-${slug}`} style={{ width: "min(920px, 100%)", height: "100%", background: "#fffdf9", borderRadius: 12, boxShadow: "0 14px 44px rgba(52,33,22,.08)", overflow: "hidden" }} />
        </div>
      </section>

      <footer style={{ minHeight: 64, borderTop: "1px solid #d9ccbc", background: "#faf7f2", padding: "10px 18px", display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: 12 }}>
        <div style={{ fontSize: 11, color: "#74655a" }}>{progress}% okundu</div>
        <div style={{ display: "flex", gap: 9 }}>
          <button type="button" onClick={previous} style={{ minWidth: 110, height: 40, borderRadius: 999, border: "1px solid #d3c4b4", background: "#fffaf4", cursor: "pointer" }}>← Önceki</button>
          <button type="button" onClick={next} style={{ minWidth: 110, height: 40, borderRadius: 999, border: 0, background: "#291a12", color: "#fff", cursor: "pointer" }}>Sonraki →</button>
        </div>
        <div style={{ textAlign: "right", fontSize: 10, color: "#9a6438", letterSpacing: ".12em" }}>22 YAYINEVİ</div>
      </footer>
    </main>
  );
}
