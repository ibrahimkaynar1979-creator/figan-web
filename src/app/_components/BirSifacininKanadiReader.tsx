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

type Theme = "light" | "cream" | "dark";
type Panel = "toc" | "appearance" | "notes" | null;
type Section = { title: string; paragraphs: readonly string[] };

const sections: Section[] = [
  ...p00, ...p01, ...p02, ...p03, ...p04, ...p05, ...p06,
  ...p07, ...p08, ...p09, ...p10, ...p11, ...p12,
];

const STORAGE = "22reader-bir-sifacinin-kanadi";

export default function BirSifacininKanadiReader() {
  const [index, setIndex] = useState(-1);
  const [theme, setTheme] = useState<Theme>("cream");
  const [fontSize, setFontSize] = useState(22);
  const [panel, setPanel] = useState<Panel>(null);
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [draft, setDraft] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE);
    if (!raw) return;
    try {
      const saved = JSON.parse(raw);
      if (typeof saved.index === "number" && saved.index >= -1 && saved.index < sections.length) setIndex(saved.index);
      if (["light","cream","dark"].includes(saved.theme)) setTheme(saved.theme);
      if (typeof saved.fontSize === "number") setFontSize(saved.fontSize);
      if (Array.isArray(saved.bookmarks)) setBookmarks(saved.bookmarks);
      if (saved.notes && typeof saved.notes === "object") setNotes(saved.notes);
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE, JSON.stringify({ index, theme, fontSize, bookmarks, notes }));
    setDraft(index >= 0 ? notes[index] || "" : "");
  }, [index, theme, fontSize, bookmarks, notes]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setIndex(v => Math.min(sections.length - 1, v + 1));
      if (e.key === "ArrowLeft") setIndex(v => Math.max(-1, v - 1));
      if (e.key === "Escape") setPanel(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const current = index >= 0 ? sections[index] : null;
  const progress = useMemo(() => index < 0 ? 0 : Math.round(((index + 1) / sections.length) * 100), [index]);
  const bookmarked = index >= 0 && bookmarks.includes(index);

  const go = (next: number) => {
    setIndex(Math.max(-1, Math.min(sections.length - 1, next)));
    setPanel(null);
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

  return (
    <main className={styles.reader} data-theme={theme} style={{ "--reader-font-size": fontSize + "px" } as CSSProperties}>
      <aside className={styles.sidebar}>
        <a href="/" className={styles.brand} aria-label="22 Yayınevi ana sayfa">
          <Image src="/22_yayinevi_logo_1.png" alt="22 Yayınevi" width={360} height={236} priority />
        </a>
        <div className={styles.cover}>
          <Image src="/figen-yavuz-arayisin-yolculugu-mockup.webp" alt="Bir Şifacının Kanadı - Figen Yavuz" width={320} height={440} priority />
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

      <section className={styles.stage}>
        <header className={styles.topbar}>
          <div className={styles.mobileBrand}>
            <Image src="/22_yayinevi_logo_1.png" alt="22 Yayınevi" width={240} height={158} priority />
          </div>
          <div className={styles.chapterMini}>
            <a href="/yazarlar/figen-yavuz" aria-label="Figen Yavuz sayfasına dön">←</a>
            <span>{current ? current.title : "Bir Şifacının Kanadı — Figen Yavuz"}</span>
          </div>
          <div className={styles.tools}>
            <button onClick={() => setPanel(panel === "appearance" ? null : "appearance")} aria-label="Yazı ve görünüm">Aa</button>
            <button onClick={() => setTheme(theme === "dark" ? "cream" : "dark")} aria-label="Tema değiştir">☼</button>
            <button onClick={toggleBookmark} disabled={index < 0} className={bookmarked ? styles.active : ""} aria-label="Yer işareti">{bookmarked ? "★" : "☆"}</button>
            <button onClick={() => setPanel(panel === "toc" ? null : "toc")} aria-label="İçindekiler">☰</button>
          </div>
        </header>

        <article className={styles.readingArea}>
          {index === -1 ? (
            <div className={styles.textWrap} style={{ alignItems:"center" }}>
              <Image
                src="/figen-yavuz-arayisin-yolculugu-mockup.webp"
                alt="Bir Şifacının Kanadı - Figen Yavuz"
                width={720}
                height={900}
                sizes="(max-width: 900px) 76vw, 520px"
                priority
                style={{ width:"min(520px,80vw)", height:"auto", objectFit:"contain" }}
              />
              <h1 style={{ marginTop:28 }}>Bir Şifacının Kanadı</h1>
              <p style={{ color:"var(--muted)", marginTop:8 }}>Figen Yavuz · 22 Yayınevi</p>
              <button onClick={() => go(0)} style={{ marginTop:18, border:0, borderRadius:999, padding:"12px 22px", background:"var(--text)", color:"var(--surface)", cursor:"pointer", font:"inherit" }}>Okumaya Başla →</button>
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

          <button className={styles.prev} onClick={() => go(index - 1)} disabled={index === -1} aria-label="Önceki">‹</button>
          <button className={styles.next} onClick={() => go(index + 1)} disabled={index === sections.length - 1} aria-label="Sonraki">›</button>

          <footer className={styles.progressArea}>
            <input type="range" min="-1" max={sections.length - 1} value={index} onChange={e => go(Number(e.target.value))} aria-label="Okuma ilerlemesi" />
            <div className={styles.progressMeta}>
              <span>{index < 0 ? "Kapak" : (index + 1) + " / " + sections.length}</span>
              <span>% {progress} <i /> 22 Reader</span>
            </div>
          </footer>
        </article>

        <nav className={styles.mobileNav}>
          <button onClick={() => setPanel(panel === "toc" ? null : "toc")}><span>☰</span>İçindekiler</button>
          <button onClick={() => setPanel(panel === "appearance" ? null : "appearance")}><span>☼</span>Görünüm</button>
          <button onClick={() => setPanel(panel === "notes" ? null : "notes")}><span>▤</span>Notlarım</button>
        </nav>
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
              <label htmlFor="bsk-font">Yazı Boyutu</label>
              <div className={styles.fontRow}><span>A</span><input id="bsk-font" type="range" min="17" max="30" value={fontSize} onChange={e => setFontSize(Number(e.target.value))}/><span>A</span></div>
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
