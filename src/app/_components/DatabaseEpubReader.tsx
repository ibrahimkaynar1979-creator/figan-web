"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import styles from "./EbookReader.module.css";

type Theme = "light" | "cream" | "dark";
type Panel = "toc" | "appearance" | "notes" | null;
type TocItem = { label?: string; href?: string; subitems?: TocItem[] };

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
    const current = document.querySelector<HTMLScriptElement>("script[data-22-epubjs]");
    if (current) {
      current.addEventListener("load", () => resolve(), { once: true });
      current.addEventListener("error", () => reject(new Error("EPUB motoru yüklenemedi.")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/epubjs@0.3.93/dist/epub.min.js";
    script.async = true;
    script.setAttribute("data-22-epubjs", "true");
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("EPUB motoru yüklenemedi."));
    document.head.appendChild(script);
  });

  return epubLoader;
}

function flattenToc(items: TocItem[]): TocItem[] {
  return items.flatMap(item => [item, ...(item.subitems ? flattenToc(item.subitems) : [])]);
}

export default function DatabaseEpubReader({ title, subtitle, author, coverUrl, epubUrl, slug }: Props) {
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const bookRef = useRef<any>(null);
  const renditionRef = useRef<any>(null);
  const [started, setStarted] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [panel, setPanel] = useState<Panel>(null);
  const [theme, setTheme] = useState<Theme>("cream");
  const [fontSize, setFontSize] = useState(22);
  const [toc, setToc] = useState<TocItem[]>([]);
  const [chapterLabel, setChapterLabel] = useState("Başlangıç");
  const [progress, setProgress] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [note, setNote] = useState("");

  const storageKey = `22reader-dynamic-${slug}`;
  const flatToc = useMemo(() => flattenToc(toc), [toc]);

  useEffect(() => {
    document.body.classList.add("reader-route");
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
      if (["light", "cream", "dark"].includes(saved.theme)) setTheme(saved.theme);
      if (typeof saved.fontSize === "number") setFontSize(saved.fontSize);
      if (typeof saved.bookmarked === "boolean") setBookmarked(saved.bookmarked);
      if (typeof saved.note === "string") setNote(saved.note);
    } catch {}
    return () => document.body.classList.remove("reader-route");
  }, [storageKey]);

  useEffect(() => {
    if (!started) return;

    let cancelled = false;

    const boot = async () => {
      setError("");
      setReady(false);
      try {
        await loadEpubJs();
        if (cancelled || !viewerRef.current || !window.ePub) return;

        const book = window.ePub(epubUrl);
        bookRef.current = book;
        await book.ready;

        const navigation = await book.loaded.navigation;
        if (!cancelled) setToc(navigation?.toc || []);

        const rendition = book.renderTo(viewerRef.current, {
          width: "100%",
          height: "100%",
          spread: "none",
          flow: "paginated",
          manager: "default",
        });
        renditionRef.current = rendition;

        rendition.themes.default({
          body: {
            "font-family": "Georgia, 'Times New Roman', serif",
            color: "#171512",
            "line-height": "1.68",
            padding: "0 4%",
          },
          p: { "font-size": "1em" },
          h1: { "font-family": "Georgia, 'Times New Roman', serif" },
          h2: { "font-family": "Georgia, 'Times New Roman', serif" },
        });
        rendition.themes.fontSize(`${Math.round((fontSize / 22) * 100)}%`);

        const firstSection = book.spine?.first?.();
        await rendition.display(firstSection?.href);

        try { await book.locations.generate(1200); } catch {}

        rendition.on("relocated", (location: any) => {
          const percentage = location?.start?.percentage;
          if (typeof percentage === "number") {
            setProgress(Math.max(0, Math.min(100, Math.round(percentage * 100))));
          }
          const href = location?.start?.href;
          if (href && navigation?.toc) {
            const match = flattenToc(navigation.toc).find((item: TocItem) => item.href && href.includes(item.href.split("#")[0]));
            if (match?.label) setChapterLabel(match.label);
          }
        });

        if (!cancelled) setReady(true);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "EPUB açılamadı.");
      }
    };

    void boot();

    return () => {
      cancelled = true;
      try { renditionRef.current?.destroy?.(); } catch {}
      try { bookRef.current?.destroy?.(); } catch {}
      renditionRef.current = null;
      bookRef.current = null;
    };
  }, [started, epubUrl]);

  useEffect(() => {
    renditionRef.current?.themes?.fontSize?.(`${Math.round((fontSize / 22) * 100)}%`);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify({ theme, fontSize, bookmarked, note }));
  }, [storageKey, theme, fontSize, bookmarked, note]);

  const goTo = async (item: TocItem) => {
    if (!item.href || !renditionRef.current) return;
    await renditionRef.current.display(item.href);
    if (item.label) setChapterLabel(item.label);
    setPanel(null);
  };

  const previous = () => renditionRef.current?.prev?.();
  const next = () => renditionRef.current?.next?.();

  return (
    <main
      className={styles.reader}
      data-theme={theme}
      data-reading={started ? "true" : "false"}
      data-chrome="visible"
      style={{
        "--reader-font-size": fontSize + "px",
        "--reader-line-height": "1.68",
        "--reader-page-margin": "24px",
      } as CSSProperties}
    >
      <aside className={styles.sidebar}>
        <a href="/" className={styles.brand} style={{ textAlign: "center", fontSize: 18, letterSpacing: ".12em", color: "inherit", textDecoration: "none" }}>
          22 YAYINEVİ
        </a>
        {coverUrl && <div className={styles.cover}><img src={coverUrl} alt={title} /></div>}
        <h2>{title}</h2>
        <p>{author || "22 Yayınevi"}</p>
        <nav className={styles.sideNav}>
          <button onClick={() => setPanel(panel === "toc" ? null : "toc")}><span>☰</span> İçindekiler</button>
          <button onClick={() => setPanel(panel === "notes" ? null : "notes")}><span>▤</span> Notlarım</button>
          <button onClick={() => setBookmarked(value => !value)}><span>{bookmarked ? "★" : "☆"}</span> Yer İşareti</button>
          <button onClick={() => setPanel(panel === "appearance" ? null : "appearance")}><span>◐</span> Görünüm</button>
        </nav>
        <a className={styles.backToBook} href="/panel/reader">← Kitaplara dön</a>
      </aside>

      <section className={styles.stage}>
        <header className={styles.topbar}>
          {!started ? (
            <>
              <div className={styles.coverTopLogo} style={{ fontSize: 15, letterSpacing: ".14em" }}>22 YAYINEVİ</div>
              <button type="button" className={styles.coverMenuButton} onClick={() => setPanel("toc")}>☰</button>
            </>
          ) : (
            <>
              <div className={styles.chapterMini}>
                <a href="/panel/reader" aria-label="Kitaplara dön">←</a>
                <span>{chapterLabel}</span>
              </div>
              <div className={styles.tools}>
                <button onClick={() => setPanel(panel === "appearance" ? null : "appearance")} aria-label="Görünüm">Aa</button>
                <button onClick={() => setTheme(theme === "dark" ? "cream" : "dark")} aria-label="Tema değiştir">☼</button>
                <button onClick={() => setBookmarked(value => !value)} className={bookmarked ? styles.active : ""} aria-label="Yer işareti">{bookmarked ? "★" : "☆"}</button>
                <button onClick={() => setPanel(panel === "toc" ? null : "toc")} aria-label="İçindekiler">☰</button>
              </div>
            </>
          )}
        </header>

        <article className={styles.readingArea}>
          {!started ? (
            <div className={styles.dynamicCoverScreen}>
              {coverUrl && (
                <div className={styles.dynamicCoverHero}>
                  <img src={coverUrl} alt={title} />
                </div>
              )}
              <h1 className={styles.dynamicCoverAuthor}>{author || "22 Yayınevi"}</h1>
              <p className={styles.dynamicCoverPublisher}>22 Yayınevi</p>
              <button type="button" className={styles.dynamicCoverButton} onClick={() => setStarted(true)}>
                Okumaya Başla <span>→</span>
              </button>
              <div className={styles.dynamicCoverStats}>
                <span><i>▤</i><b>{flatToc.length || "—"} bölüm</b></span>
                <span><i>◷</i><b>~ EPUB</b></span>
                <span><i>▱</i><b>EPUB</b></span>
              </div>
              <div className={styles.dynamicReaderBrand}>22 Reader</div>
            </div>
          ) : (
            <>
              {!ready && !error && <div style={{ margin: "auto", color: "var(--muted)" }}>EPUB hazırlanıyor…</div>}
              {error && (
                <div style={{ margin: "auto", maxWidth: 560 }}>
                  <h2>Reader açılamadı.</h2>
                  <p>{error}</p>
                  <a href={epubUrl} target="_blank" rel="noreferrer">EPUB dosyasını aç ↗</a>
                </div>
              )}
              <div
                ref={viewerRef}
                style={{
                  width: "min(820px,100%)",
                  height: "calc(100svh - 185px)",
                  minHeight: 520,
                  margin: "0 auto",
                  background: "var(--surface)",
                  opacity: ready ? 1 : 0,
                }}
              />

              <button className={styles.prev} onClick={previous} disabled={!ready} aria-label="Önceki sayfa">‹</button>
              <button className={styles.next} onClick={next} disabled={!ready} aria-label="Sonraki sayfa">›</button>

              <footer className={styles.progressArea}>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  readOnly
                  aria-label="Okuma ilerlemesi"
                />
                <div className={styles.progressMeta}>
                  <span>% {progress}</span>
                  <span>{chapterLabel}</span>
                </div>
              </footer>
            </>
          )}
        </article>
      </section>

      {panel && (
        <>
          <button className={styles.backdrop} onClick={() => setPanel(null)} aria-label="Paneli kapat" />
          <aside className={styles.panel} data-panel={panel}>
            <div className={styles.panelHead}>
              <h3>{panel === "toc" ? "İçindekiler" : panel === "appearance" ? "Görünüm" : "Notlarım"}</h3>
              <button onClick={() => setPanel(null)}>×</button>
            </div>

            {panel === "toc" && (
              <div className={styles.toc}>
                <div className={styles.tocList}>
                  {flatToc.length === 0 && <p>İçindekiler EPUB’dan yükleniyor…</p>}
                  {flatToc.map((item, index) => (
                    <button key={`${item.href || "toc"}-${index}`} onClick={() => goTo(item)}>
                      <span>{item.label || `Bölüm ${index + 1}`}</span><b>{index + 1}</b>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {panel === "appearance" && (
              <div className={styles.appearance}>
                <label>Tema</label>
                <div className={styles.themeRow}>
                  <button className={theme === "light" ? styles.selected : ""} onClick={() => setTheme("light")}><i className={styles.lightSwatch}/>Açık</button>
                  <button className={theme === "cream" ? styles.selected : ""} onClick={() => setTheme("cream")}><i className={styles.creamSwatch}/>Krem</button>
                  <button className={theme === "dark" ? styles.selected : ""} onClick={() => setTheme("dark")}><i className={styles.darkSwatch}/>Koyu</button>
                </div>
                <label>Yazı Boyutu</label>
                <div className={styles.fontRow}>
                  <span>A</span>
                  <input type="range" min="17" max="30" value={fontSize} onChange={event => setFontSize(Number(event.target.value))} />
                  <span>A</span>
                </div>
              </div>
            )}

            {panel === "notes" && (
              <div className={styles.notes}>
                <p>Bu kitap için notunuz</p>
                <textarea value={note} onChange={event => setNote(event.target.value)} placeholder="Notunuzu yazın…" />
                <button className={styles.saveNote} onClick={() => setPanel(null)}>Notu Kaydet</button>
              </div>
            )}
          </aside>
        </>
      )}
    </main>
  );
}
