"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import styles from "./EbookReader.module.css";
import p00 from "../_data/bskPlain/p00";
import p01 from "../_data/bskPlain/p01";
import p02 from "../_data/bskPlain/p02";
import p03 from "../_data/bskPlain/p03";
import p04 from "../_data/bskPlain/p04";
import p05 from "../_data/bskPlain/p05";
import p06 from "../_data/bskPlain/p06";
import p07 from "../_data/bskPlain/p07";
import p08 from "../_data/bskPlain/p08";
import p09 from "../_data/bskPlain/p09";
import p10 from "../_data/bskPlain/p10";
import p11 from "../_data/bskPlain/p11";
import p12 from "../_data/bskPlain/p12";
import p13 from "../_data/bskPlain/p13";
import p14 from "../_data/bskPlain/p14";
import p15 from "../_data/bskPlain/p15";
import p16 from "../_data/bskPlain/p16";

type Theme = "light" | "cream" | "dark";
type ReaderFont = "serif" | "sans" | "modern";
type Panel = "toc" | "appearance" | "notes" | null;
type Section = { title: string; paragraphs: readonly string[] };

const sections: Section[] = [
  ...p00, ...p01, ...p02, ...p03, ...p04, ...p05, ...p06,
  ...p07, ...p08, ...p09, ...p10, ...p11, ...p12,
  ...p13, ...p14, ...p15, ...p16,
].filter(section => !["DEĞİŞİM", "ERDEM YOLCULUĞU"].includes(section.title))
 .map(section => section.title === "KAZANMAK DA VAR KAYBETMEK DE." ? { ...section, title: "KAZANMAK DA VAR KAYBETMEK" } : section);

const STORAGE = "22reader-bir-sifacinin-kanadi";
const READER_FONTS: Record<ReaderFont, string> = {
  serif: 'Georgia, "Times New Roman", serif',
  sans: 'Arial, Helvetica, sans-serif',
  modern: '"Segoe UI", system-ui, -apple-system, Roboto, Arial, sans-serif',
};

export default function BirSifacininKanadiReader() {
  const [index, setIndex] = useState(-1);
  const [theme, setTheme] = useState<Theme>("cream");
  const [fontSize, setFontSize] = useState(22);
  const [readerFont, setReaderFont] = useState<ReaderFont>("serif");
  const [panel, setPanel] = useState<Panel>(null);
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [draft, setDraft] = useState("");
  const [chromeVisible, setChromeVisible] = useState(true);
  const [lineHeight, setLineHeight] = useState(1.68);
  const [pageMargin, setPageMargin] = useState(24);
  const [readerPage, setReaderPage] = useState(0);
  const [readerPageCount, setReaderPageCount] = useState(1);
  const [storageReady, setStorageReady] = useState(false);
  const textWrapRef = useRef<HTMLDivElement | null>(null);
  const pendingReaderEdge = useRef<"start" | "end" | null>(null);
  const pendingReaderPage = useRef<number | null>(null);
  const readerPageRef = useRef(0);

  useEffect(() => {
    document.body.classList.add("reader-route");
    return () => document.body.classList.remove("reader-route");
  }, []);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE);
    if (!raw) {
      setStorageReady(true);
      return;
    }
    try {
      const saved = JSON.parse(raw);
      const savedIndex =
        typeof saved.lastReadingIndex === "number"
          ? saved.lastReadingIndex
          : saved.index;
      const savedPage =
        typeof saved.lastReaderPage === "number"
          ? saved.lastReaderPage
          : saved.readerPage;

      if (typeof savedIndex === "number" && savedIndex >= 0 && savedIndex < sections.length) {
        setIndex(savedIndex);
      }
      if (typeof savedPage === "number" && savedPage >= 0) {
        const restoredPage = Math.floor(savedPage);
        pendingReaderPage.current = restoredPage;
        readerPageRef.current = restoredPage;
        setReaderPage(restoredPage);
      }
      if (["light","cream","dark"].includes(saved.theme)) setTheme(saved.theme);
      if (typeof saved.fontSize === "number") setFontSize(saved.fontSize);
      if (["serif","sans","modern"].includes(saved.readerFont)) setReaderFont(saved.readerFont);
      if (typeof saved.lineHeight === "number") setLineHeight(saved.lineHeight);
      if (typeof saved.pageMargin === "number") setPageMargin(saved.pageMargin);
      if (Array.isArray(saved.bookmarks)) setBookmarks(saved.bookmarks);
      if (saved.notes && typeof saved.notes === "object") setNotes(saved.notes);
    } catch {}
    setStorageReady(true);
  }, []);

  useEffect(() => {
    readerPageRef.current = readerPage;
  }, [readerPage]);

  useEffect(() => {
    if (!storageReady) return;

    let previous: Record<string, unknown> = {};
    try {
      previous = JSON.parse(localStorage.getItem(STORAGE) || "{}");
    } catch {}

    const next = {
      ...previous,
      index,
      readerPage,
      theme,
      fontSize,
      readerFont,
      lineHeight,
      pageMargin,
      bookmarks,
      notes,
      ...(index >= 0
        ? { lastReadingIndex: index, lastReaderPage: readerPage }
        : {}),
    };

    localStorage.setItem(STORAGE, JSON.stringify(next));
    setDraft(index >= 0 ? notes[index] || "" : "");
  }, [storageReady, index, readerPage, theme, fontSize, readerFont, lineHeight, pageMargin, bookmarks, notes]);

  useEffect(() => {
    if (!storageReady) return;

    const saveExactPosition = () => {
      let previous: Record<string, unknown> = {};
      try {
        previous = JSON.parse(localStorage.getItem(STORAGE) || "{}");
      } catch {}

      const exactPage = readerPageRef.current;
      const next = {
        ...previous,
        index,
        readerPage: exactPage,
        ...(index >= 0
          ? { lastReadingIndex: index, lastReaderPage: exactPage }
          : {}),
      };
      localStorage.setItem(STORAGE, JSON.stringify(next));
    };

    window.addEventListener("pagehide", saveExactPosition);
    window.addEventListener("beforeunload", saveExactPosition);
    return () => {
      window.removeEventListener("pagehide", saveExactPosition);
      window.removeEventListener("beforeunload", saveExactPosition);
    };
  }, [storageReady, index]);

  useEffect(() => {
    if (index < 0 || panel) return;
    const t = window.setTimeout(() => setChromeVisible(false), 2600);
    return () => window.clearTimeout(t);
  }, [index, panel, chromeVisible]);

  const current = index >= 0 ? sections[index] : null;
  const progress = useMemo(() => {
    if (index < 0) return 0;
    const withinSection = readerPageCount > 0 ? (readerPage + 1) / readerPageCount : 1;
    return Math.min(100, Math.round(((index + withinSection) / sections.length) * 100));
  }, [index, readerPage, readerPageCount]);
  const bookmarked = index >= 0 && bookmarks.includes(index);

  const go = (next: number) => {
    const target = Math.max(-1, Math.min(sections.length - 1, next));
    if (target !== index && pendingReaderEdge.current === null) pendingReaderPage.current = 0;
    setIndex(target);
    setPanel(null);
    setChromeVisible(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (index < 0) return;
    const el = textWrapRef.current;
    if (!el) return;

    const measure = () => {
      const width = Math.max(1, el.clientWidth);
      const pages = Math.max(1, Math.ceil(el.scrollWidth / width));
      setReaderPageCount(pages);

      if (pendingReaderEdge.current === "end") {
        const lastPage = pages - 1;
        el.scrollLeft = lastPage * width;
        setReaderPage(lastPage);
        readerPageRef.current = lastPage;
        pendingReaderEdge.current = null;
        pendingReaderPage.current = null;
        return;
      }

      if (pendingReaderEdge.current === "start") {
        el.scrollLeft = 0;
        setReaderPage(0);
        readerPageRef.current = 0;
        pendingReaderEdge.current = null;
        pendingReaderPage.current = null;
        return;
      }

      const requestedPage = pendingReaderPage.current ?? readerPageRef.current;
      const targetPage = Math.min(pages - 1, Math.max(0, requestedPage));
      el.scrollLeft = targetPage * width;
      setReaderPage(targetPage);
      readerPageRef.current = targetPage;
      pendingReaderPage.current = null;
    };
    const raf = requestAnimationFrame(measure);
    const ro = new ResizeObserver(() => requestAnimationFrame(measure));
    ro.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [index, fontSize, lineHeight, pageMargin]);

  const turnReaderPage = (direction: -1 | 1) => {
    const el = textWrapRef.current;
    if (!el || index < 0) return;
    const width = Math.max(1, el.clientWidth);
    const page = Math.min(readerPageCount - 1, Math.max(0, Math.round(el.scrollLeft / width)));

    if (direction === 1) {
      if (page < readerPageCount - 1) {
        const nextPage = page + 1;
        el.scrollTo({ left: nextPage * width, behavior: "smooth" });
        setReaderPage(nextPage);
        setChromeVisible(false);
        return;
      }
      if (index < sections.length - 1) {
        pendingReaderEdge.current = "start";
        go(index + 1);
        window.setTimeout(() => setChromeVisible(false), 0);
      }
      return;
    }

    if (page > 0) {
      const prevPage = page - 1;
      el.scrollTo({ left: prevPage * width, behavior: "smooth" });
      setReaderPage(prevPage);
      setChromeVisible(false);
      return;
    }
    if (index > 0) {
      pendingReaderEdge.current = "end";
      go(index - 1);
      window.setTimeout(() => setChromeVisible(false), 0);
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if (e.key === "Escape") {
        setPanel(null);
        return;
      }

      if (isTyping || panel || index < 0) return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        turnReaderPage(1);
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        turnReaderPage(-1);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, panel, readerPage, readerPageCount]);

  const toggleBookmark = () => {
    if (index < 0) return;
    setBookmarks(prev => bookmarked ? prev.filter(v => v !== index) : [...prev, index]);
  };

  const saveNote = () => {
    if (index < 0) return;
    setNotes(prev => {
      const next = { ...prev };
      if (draft.trim()) next[index] = draft.trim();
      else delete next[index];
      return next;
    });
  };

  const selectReaderFont = (font: ReaderFont) => {
    setReaderFont(font);
  };

  const revealChrome = () => {
    if (index >= 0) setChromeVisible(v => !v);
  };

  return (
    <main
      className={styles.reader}
      data-theme={theme}
      data-font={readerFont}
      data-reading={index >= 0 ? "true" : "false"}
      data-chrome={chromeVisible ? "visible" : "hidden"}
      style={{
        "--reader-font-size": fontSize + "px",
        "--reader-line-height": String(lineHeight),
        "--reader-page-margin": pageMargin + "px",
      } as CSSProperties}
    >
      <aside className={styles.sidebar}>
        <a href="/" className={styles.brand} aria-label="22 Yayınevi ana sayfa">
          <Image src="/22_yayinevi_logo_1.png" alt="22 Yayınevi" width={360} height={236} priority />
        </a>
        <div className={styles.cover}>
          <Image src="/bir_sifaci_png.png" alt="Bir Şifacının Kanadı - Figen Yavuz" width={320} height={440} priority />
        </div>
        <h2>Bir Şifacının Kanadı</h2>
        <p>Figen Yavuz</p>
        <nav className={styles.sideNav}>
          <button onClick={() => setPanel(panel === "toc" ? null : "toc")}><span>☰</span> İçindekiler</button>
          <button onClick={() => setPanel(panel === "notes" ? null : "notes")}><span>▤</span> Notlarım</button>
          <button onClick={toggleBookmark} disabled={index < 0}><span>{bookmarked ? "★" : "☆"}</span> Yer İşareti</button>
          <button onClick={() => setPanel(panel === "appearance" ? null : "appearance")}><span>◐</span> Görünüm</button>
        </nav>
        <a className={styles.backToBook} href="/yazarlar/figen-yavuz">← Figen Yavuz sayfasına dön</a>
      </aside>

      <section className={styles.stage} onClick={revealChrome}>
        <header className={styles.topbar} onClick={e => e.stopPropagation()}>
          {index === -1 ? (
            <>
              <div className={styles.coverTopLogo}>
                <Image src="/22_yayinevi_logo_1.png" alt="22 Yayınevi" width={300} height={190} priority />
              </div>
              <button className={styles.coverMenuButton} onClick={() => setPanel("toc")} aria-label="Menü">⋮</button>
            </>
          ) : (
            <>
              <div className={styles.mobileBrand}>
                <Image src="/22_yayinevi_logo_1.png" alt="22 Yayınevi" width={240} height={158} priority />
              </div>
              <div className={styles.chapterMini}>
                <a href="/yazarlar/figen-yavuz" aria-label="Figen Yavuz sayfasına dön">←</a>
                <span>{current?.title}</span>
              </div>
              <div className={styles.tools}>
                <button onClick={() => setPanel(panel === "appearance" ? null : "appearance")} aria-label="Yazı ve görünüm">Aa</button>
                <button onClick={() => setTheme(theme === "dark" ? "cream" : "dark")} aria-label="Tema değiştir">☼</button>
                <button onClick={toggleBookmark} className={bookmarked ? styles.active : ""} aria-label="Yer işareti">{bookmarked ? "★" : "☆"}</button>
                <button onClick={() => setPanel(panel === "toc" ? null : "toc")} aria-label="İçindekiler">☰</button>
              </div>
            </>
          )}
        </header>

        <article className={styles.readingArea}>
          {index === -1 ? (
            <div className={styles.coverScreen}>
              <div className={styles.coverHero}>
                <Image
                  src="/bir_sifaci_png.png"
                  alt="Bir Şifacının Kanadı - Figen Yavuz"
                  width={720}
                  height={900}
                  sizes="(max-width: 900px) 86vw, 520px"
                  priority
                />
              </div>
              <div className={styles.coverAuthor}>Figen Yavuz</div>
              <div className={styles.coverPublisher}>22 Yayınevi</div>
              <button onClick={(e) => { e.stopPropagation(); go(0); }} className={styles.startButton}>Okumaya Başla <span>→</span></button>
              <div className={styles.coverStats}>
                <span>
                  <i aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path d="M3.5 5.5c2.8-.7 5.5-.2 8 1.5v12c-2.5-1.7-5.2-2.2-8-1.5z"/><path d="M20.5 5.5c-2.8-.7-5.5-.2-8 1.5v12c2.5-1.7 5.2-2.2 8-1.5z"/></svg>
                  </i>
                  <b>{sections.length} bölüm</b>
                </span>
                <span>
                  <i aria-hidden="true">
                    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5l3.5 2"/></svg>
                  </i>
                  <b>~ 5 saat</b>
                </span>
                <span>
                  <i aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path d="M6.5 3.5h7l4 4v13h-11z"/><path d="M13.5 3.5v4h4"/><path d="M9 12h6M9 15h6"/></svg>
                  </i>
                  <b>EPUB</b>
                </span>
              </div>
              <div className={styles.coverReaderBrand}><Image src="/22_reader_logo.png" alt="22 Reader" width={520} height={170} priority /></div>
            </div>
          ) : (
            <div
              ref={textWrapRef}
              className={styles.textWrap}
              onScroll={(e) => {
                const el = e.currentTarget;
                const width = Math.max(1, el.clientWidth);
                setReaderPage(Math.min(readerPageCount - 1, Math.max(0, Math.round(el.scrollLeft / width))));
              }}
              style={{ columnWidth: textWrapRef.current?.clientWidth ? textWrapRef.current.clientWidth + "px" : undefined }}
            >
              <p className={styles.chapter}>BİR ŞİFACININ KANADI</p>
              <h1>{current?.title}</h1>
              <div className={styles.rule} />
              <div className={styles.prose} style={{ fontFamily: READER_FONTS[readerFont] }}>
                {current?.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
          )}

          {index >= 0 && <>
            <button className={styles.prev} onClick={(e) => { e.stopPropagation(); turnReaderPage(-1); }} aria-label="Önceki sayfa">‹</button>
            <button className={styles.next} onClick={(e) => { e.stopPropagation(); turnReaderPage(1); }} disabled={index === sections.length - 1 && readerPage === readerPageCount - 1} aria-label="Sonraki sayfa">›</button>

            <footer className={styles.progressArea} onClick={e => e.stopPropagation()}>
              <input type="range" min="0" max={sections.length - 1} value={index} onChange={e => go(Number(e.target.value))} aria-label="Okuma ilerlemesi" />
              <div className={styles.progressMeta}>
                <span>{index + 1} / {sections.length} <i /> Sayfa {readerPage + 1}/{readerPageCount}</span>
                <span>% {progress} <i /> 22 Reader</span>
              </div>
            </footer>
          </>}
        </article>

        {index >= 0 && <nav className={styles.mobileNav} onClick={e => e.stopPropagation()}>
          <button onClick={() => setPanel(panel === "toc" ? null : "toc")}><span>☰</span>İçindekiler</button>
          <button onClick={() => setPanel(panel === "appearance" ? null : "appearance")}><span>☼</span>Görünüm</button>
          <button onClick={() => setPanel(panel === "notes" ? null : "notes")}><span>▤</span>Notlarım</button>
        </nav>}
      </section>

      {panel && (
        <>
          <button className={styles.backdrop} onClick={() => setPanel(null)} aria-label="Paneli kapat" />
          <aside className={styles.panel}>
            <div className={styles.panelHead}>
              <h3>{panel === "toc" ? "İçindekiler" : panel === "appearance" ? "Görünüm" : "Notlarım"}</h3>
              <button onClick={() => setPanel(null)}>×</button>
            </div>
            {panel === "toc" && <div className={styles.toc}>
              <button onClick={() => go(-1)}><span>Kapak</span><b>00</b></button>
              {sections.map((s, i) => <button key={s.title + i} className={index === i ? styles.currentToc : ""} onClick={() => go(i)}><span>{s.title}</span><b>{String(i + 1).padStart(2,"0")}</b></button>)}
            </div>}
            {panel === "appearance" && <div className={styles.appearance}>
              <label>Tema</label>
              <div className={styles.themeRow}>
                <button className={theme === "light" ? styles.selected : ""} onClick={() => setTheme("light")}><i className={styles.lightSwatch}/>Açık</button>
                <button className={theme === "cream" ? styles.selected : ""} onClick={() => setTheme("cream")}><i className={styles.creamSwatch}/>Krem</button>
                <button className={theme === "dark" ? styles.selected : ""} onClick={() => setTheme("dark")}><i className={styles.darkSwatch}/>Koyu</button>
              </div>
              <label>Yazı Tipi <strong style={{ marginLeft: 8, color: "var(--accent)", fontWeight: 500 }}>({readerFont === "serif" ? "Serif" : readerFont === "sans" ? "Sans" : "Modern"})</strong></label>
              <div className={styles.fontFamilyRow}>
                <button
                  type="button"
                  className={readerFont === "serif" ? styles.selected : ""}
                  data-selected={readerFont === "serif" ? "true" : "false"}
                  onPointerDown={(e) => { e.stopPropagation(); selectReaderFont("serif"); }}
                  onClick={(e) => { e.stopPropagation(); selectReaderFont("serif"); }}
                  aria-pressed={readerFont === "serif"}
                >
                  Aa<span>Serif</span>
                </button>
                <button
                  type="button"
                  className={readerFont === "sans" ? styles.selected : ""}
                  data-selected={readerFont === "sans" ? "true" : "false"}
                  onPointerDown={(e) => { e.stopPropagation(); selectReaderFont("sans"); }}
                  onClick={(e) => { e.stopPropagation(); selectReaderFont("sans"); }}
                  aria-pressed={readerFont === "sans"}
                >
                  Aa<span>Sans</span>
                </button>
                <button
                  type="button"
                  className={readerFont === "modern" ? styles.selected : ""}
                  data-selected={readerFont === "modern" ? "true" : "false"}
                  onPointerDown={(e) => { e.stopPropagation(); selectReaderFont("modern"); }}
                  onClick={(e) => { e.stopPropagation(); selectReaderFont("modern"); }}
                  aria-pressed={readerFont === "modern"}
                >
                  Aa<span>Modern</span>
                </button>
              </div>
              <label htmlFor="bsk-font">Yazı Boyutu</label>
              <div className={styles.fontRow}><span>A</span><input id="bsk-font" type="range" min="17" max="30" value={fontSize} onChange={e => setFontSize(Number(e.target.value))}/><span>A</span></div>
              <label>Satır Aralığı</label>
              <div className={styles.fontRow}><span>−</span><input type="range" min="1.45" max="1.95" step="0.05" value={lineHeight} onChange={e => setLineHeight(Number(e.target.value))}/><span>+</span></div>
              <label>Kenar Boşluğu</label>
              <div className={styles.fontRow}><span>−</span><input type="range" min="16" max="44" step="2" value={pageMargin} onChange={e => setPageMargin(Number(e.target.value))}/><span>+</span></div>
            </div>}
            {panel === "notes" && <div className={styles.notes}>
              {index < 0 ? <p>Not eklemek için bir bölüme geçin.</p> : <>
                <p>{index + 1}. bölüm için not</p>
                <textarea value={draft} onChange={e => setDraft(e.target.value)} placeholder="Bu bölümle ilgili notunuzu yazın…" />
                <button className={styles.saveNote} onClick={saveNote}>Notu Kaydet</button>
                <div className={styles.savedNotes}>
                  {Object.entries(notes).filter(([,v]) => v.trim()).map(([k,v]) => <button key={k} onClick={() => go(Number(k))}><b>{Number(k)+1}. bölüm</b><span>{v}</span></button>)}
                </div>
              </>}
            </div>}
          </aside>
        </>
      )}
    </main>
  );
}
