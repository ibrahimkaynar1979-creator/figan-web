"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
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
type Panel = "toc" | "appearance" | "notes" | null;
type Section = { title: string; paragraphs: readonly string[] };

const sections: Section[] = [
  ...p00, ...p01, ...p02, ...p03, ...p04, ...p05, ...p06,
  ...p07, ...p08, ...p09, ...p10, ...p11, ...p12,
  ...p13, ...p14, ...p15, ...p16,
].filter(section => !["DEĞİŞİM", "ERDEM YOLCULUĞU"].includes(section.title))
 .map(section => section.title === "KAZANMAK DA VAR KAYBETMEK DE." ? { ...section, title: "KAZANMAK DA VAR KAYBETMEK" } : section);

const STORAGE = "22reader-bir-sifacinin-kanadi";

export default function BirSifacininKanadiReader() {
  const [index, setIndex] = useState(-1);
  const [theme, setTheme] = useState<Theme>("cream");
  const [fontSize, setFontSize] = useState(22);
  const [panel, setPanel] = useState<Panel>(null);
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [draft, setDraft] = useState("");
  const [chromeVisible, setChromeVisible] = useState(true);
  const [lineHeight, setLineHeight] = useState(1.68);
  const [pageMargin, setPageMargin] = useState(24);

  useEffect(() => {
    document.body.classList.add("reader-route");
    return () => document.body.classList.remove("reader-route");
  }, []);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE);
    if (!raw) return;
    try {
      const saved = JSON.parse(raw);
      if (typeof saved.index === "number" && saved.index >= -1 && saved.index < sections.length) setIndex(saved.index);
      if (["light","cream","dark"].includes(saved.theme)) setTheme(saved.theme);
      if (typeof saved.fontSize === "number") setFontSize(saved.fontSize);
      if (typeof saved.lineHeight === "number") setLineHeight(saved.lineHeight);
      if (typeof saved.pageMargin === "number") setPageMargin(saved.pageMargin);
      if (Array.isArray(saved.bookmarks)) setBookmarks(saved.bookmarks);
      if (saved.notes && typeof saved.notes === "object") setNotes(saved.notes);
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE, JSON.stringify({ index, theme, fontSize, lineHeight, pageMargin, bookmarks, notes }));
    setDraft(index >= 0 ? notes[index] || "" : "");
  }, [index, theme, fontSize, lineHeight, pageMargin, bookmarks, notes]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setIndex(v => Math.min(sections.length - 1, v + 1));
      if (e.key === "ArrowLeft") setIndex(v => Math.max(-1, v - 1));
      if (e.key === "Escape") setPanel(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (index < 0 || panel) return;
    const t = window.setTimeout(() => setChromeVisible(false), 2600);
    return () => window.clearTimeout(t);
  }, [index, panel, chromeVisible]);

  const current = index >= 0 ? sections[index] : null;
  const progress = useMemo(() => index < 0 ? 0 : Math.round(((index + 1) / sections.length) * 100), [index]);
  const bookmarked = index >= 0 && bookmarks.includes(index);

  const go = (next: number) => {
    setIndex(Math.max(-1, Math.min(sections.length - 1, next)));
    setPanel(null);
    setChromeVisible(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  const revealChrome = () => {
    if (index >= 0) setChromeVisible(v => !v);
  };

  return (
    <main
      className={styles.reader}
      data-theme={theme}
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
              <div className={styles.coverReaderBrand}><strong>22</strong><span>Reader</span></div>
            </div>
          ) : (
            <div className={styles.textWrap}>
              <p className={styles.chapter}>BİR ŞİFACININ KANADI</p>
              <h1>{current?.title}</h1>
              <div className={styles.rule} />
              <div className={styles.prose}>
                {current?.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
          )}

          {index >= 0 && <>
            <button className={styles.prev} onClick={(e) => { e.stopPropagation(); go(index - 1); }} aria-label="Önceki">‹</button>
            <button className={styles.next} onClick={(e) => { e.stopPropagation(); go(index + 1); }} disabled={index === sections.length - 1} aria-label="Sonraki">›</button>

            <footer className={styles.progressArea} onClick={e => e.stopPropagation()}>
              <input type="range" min="0" max={sections.length - 1} value={index} onChange={e => go(Number(e.target.value))} aria-label="Okuma ilerlemesi" />
              <div className={styles.progressMeta}>
                <span>{index + 1} / {sections.length}</span>
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
              <label>Yazı Tipi</label>
              <div className={styles.fontFamilyRow}>
                <button className={styles.selected}>Aa<span>Serif</span></button>
                <button>Aa<span>Sans</span></button>
                <button>Aa<span>Modern</span></button>
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
