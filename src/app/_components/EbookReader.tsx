"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import styles from "./EbookReader.module.css";

type ReaderTheme = "light" | "cream" | "dark";
type Panel = "toc" | "appearance" | "notes" | null;

type ReaderPage = {
  chapter: string;
  title: string;
  paragraphs: string[];
};

const pages: ReaderPage[] = [
  {
    chapter: "1. BÖLÜM",
    title: "Bir Adamı Aramak",
    paragraphs: [
      "Bazı yolculuklar, varılacak bir yer için değil, insanın kendine ulaşması için başlar. Benimki de öyleydi. Âsaf Hâlet Çelebi’nin izini sürerken, aslında kendi içimde saklı kalmış soruların peşine düştüm…",
      "İstanbul, her zamanki gibi sisliydi. Ama bu kez sis, şehrin üstünde değil, benim içimdeydi.",
      "Bir şairi aramak bazen onun dizelerinden çok, insanda bıraktığı sessizliği aramaktır. Ben o sessizliğin kapısını aralıyordum."
    ]
  },
  {
    chapter: "1. BÖLÜM",
    title: "Bir Adamı Aramak",
    paragraphs: [
      "Elimde notlar, eski baskılar ve yıllardır zihnimde biriken sorular vardı. Fakat aradığım şey yalnızca bilgi değildi.",
      "Bir insanın başka bir insanı yıllar sonra kendine bu kadar yaklaştırabilmesinin sebebini anlamak istiyordum.",
      "Belki de insan, bazı yazarlara onları okumak için değil; kendini onların aynasında görmek için döner."
    ]
  },
  {
    chapter: "2. BÖLÜM",
    title: "İlk İzler",
    paragraphs: [
      "İlk izler her zaman açık değildir. Bazen bir cümlenin kıyısında, bazen unutulmuş bir kitabın arasında belirir.",
      "Âsaf Hâlet’in dünyasına yaklaştıkça şiirin yalnızca sözcüklerden kurulmadığını, sessizliğin de o yapının bir parçası olduğunu daha iyi görüyordum.",
      "Aradığım adam, sayfalardan çıkıp İstanbul’un sokaklarına karışmaya başlamıştı."
    ]
  },
  {
    chapter: "3. BÖLÜM",
    title: "Şehrin İçinden",
    paragraphs: [
      "Şehir yürüdükçe değişiyordu. Aynı sokaklar başka bir zamana açılıyor, tanıdığım binalar birer hatıraya dönüşüyordu.",
      "Bir edebiyatçının izini sürmek, geçmişin haritasını bugünün üzerine koymaya benziyor.",
      "Bazı yerler kaybolmuştu; bazılarıysa yalnızca isim değiştirmişti. Fakat hikâyeler hâlâ oradaydı."
    ]
  },
  {
    chapter: "4. BÖLÜM",
    title: "Kendime Dönüş",
    paragraphs: [
      "Bir süre sonra aradığım kişinin yalnızca Âsaf Hâlet olmadığını fark ettim.",
      "Her not, her şiir ve her sokak beni biraz daha kendi geçmişime götürüyordu.",
      "Belki bütün arayışların sonunda insan, başladığı yere başka biri olarak dönüyordu."
    ]
  }
];

const chapterStarts = [
  { label: "1. Bölüm — Bir Adamı Aramak", page: 0 },
  { label: "2. Bölüm — İlk İzler", page: 2 },
  { label: "3. Bölüm — Şehrin İçinden", page: 3 },
  { label: "4. Bölüm — Kendime Dönüş", page: 4 }
];

export default function EbookReader() {
  const [page, setPage] = useState(0);
  const [theme, setTheme] = useState<ReaderTheme>("cream");
  const [fontSize, setFontSize] = useState(22);
  const [panel, setPanel] = useState<Panel>(null);
  const [bookmarked, setBookmarked] = useState<number[]>([]);
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [draft, setDraft] = useState("");

  useEffect(() => {
    const savedPage = Number(localStorage.getItem("reader-icimdeki-ibrahim-page") || "0");
    const savedTheme = (localStorage.getItem("reader-icimdeki-ibrahim-theme") || "cream") as ReaderTheme;
    const savedFont = Number(localStorage.getItem("reader-icimdeki-ibrahim-font") || "22");
    const savedBookmarks = JSON.parse(localStorage.getItem("reader-icimdeki-ibrahim-bookmarks") || "[]");
    const savedNotes = JSON.parse(localStorage.getItem("reader-icimdeki-ibrahim-notes") || "{}");
    if (savedPage >= 0 && savedPage < pages.length) setPage(savedPage);
    if (["light","cream","dark"].includes(savedTheme)) setTheme(savedTheme);
    if (savedFont >= 17 && savedFont <= 30) setFontSize(savedFont);
    setBookmarked(savedBookmarks);
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem("reader-icimdeki-ibrahim-page", String(page));
    setDraft(notes[page] || "");
  }, [page, notes]);

  useEffect(() => {
    localStorage.setItem("reader-icimdeki-ibrahim-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("reader-icimdeki-ibrahim-font", String(fontSize));
  }, [fontSize]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") setPage((value) => Math.max(0, value - 1));
      if (event.key === "ArrowRight") setPage((value) => Math.min(pages.length - 1, value + 1));
      if (event.key === "Escape") setPanel(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const current = pages[page];
  const progress = useMemo(() => Math.round(((page + 1) / pages.length) * 100), [page]);
  const isBookmarked = bookmarked.includes(page);

  const go = (next: number) => {
    setPage(Math.max(0, Math.min(pages.length - 1, next)));
    setPanel(null);
  };

  const toggleBookmark = () => {
    const next = isBookmarked ? bookmarked.filter((value) => value !== page) : [...bookmarked, page];
    setBookmarked(next);
    localStorage.setItem("reader-icimdeki-ibrahim-bookmarks", JSON.stringify(next));
  };

  const saveNote = () => {
    const next = { ...notes, [page]: draft.trim() };
    if (!draft.trim()) delete next[page];
    setNotes(next);
    localStorage.setItem("reader-icimdeki-ibrahim-notes", JSON.stringify(next));
  };

  return (
    <main className={styles.reader} data-theme={theme} style={{ "--reader-font-size": fontSize + "px" } as CSSProperties}>
      <aside className={styles.sidebar}>
        <a href="/" className={styles.brand} aria-label="22 Yayınevi ana sayfa">
          <Image src="/22_yayinevi_logo_1.png" alt="22 Yayınevi" width={360} height={236} priority />
        </a>
        <div className={styles.cover}>
          <Image src="/icimdeki-ibrahim.webp" alt="İçimdeki İbrahim kitap kapağı" width={320} height={440} priority />
        </div>
        <h2>İçimdeki İbrahim</h2>
        <p>İbrahim Kaynar</p>
        <nav className={styles.sideNav}>
          <button onClick={() => setPanel(panel === "toc" ? null : "toc")}><span>☰</span> İçindekiler</button>
          <button onClick={() => setPanel(panel === "notes" ? null : "notes")}><span>▤</span> Notlarım</button>
          <button onClick={toggleBookmark}><span>{isBookmarked ? "★" : "☆"}</span> Yer İşareti</button>
          <button onClick={() => setPanel(panel === "appearance" ? null : "appearance")}><span>◐</span> Görünüm</button>
        </nav>
        <a className={styles.backToBook} href="/kitaplar/icimdeki-ibrahim">← Kitaba dön</a>
      </aside>

      <section className={styles.stage}>
        <header className={styles.topbar}>
          <div className={styles.mobileBrand}>
            <Image src="/22_yayinevi_logo_1.png" alt="22 Yayınevi" width={240} height={158} priority />
          </div>
          <div className={styles.chapterMini}>
            <a href="/kitaplar/icimdeki-ibrahim" aria-label="Kitaba dön">←</a>
            <span>{current.chapter} — {current.title}</span>
          </div>
          <div className={styles.tools}>
            <button onClick={() => setPanel(panel === "appearance" ? null : "appearance")} aria-label="Yazı ve görünüm ayarları">Aa</button>
            <button onClick={() => setTheme(theme === "dark" ? "cream" : "dark")} aria-label="Tema değiştir">☼</button>
            <button onClick={toggleBookmark} className={isBookmarked ? styles.active : ""} aria-label="Yer işareti">{isBookmarked ? "★" : "☆"}</button>
            <button onClick={() => setPanel(panel === "toc" ? null : "toc")} aria-label="İçindekiler">☰</button>
          </div>
        </header>

        <article className={styles.readingArea}>
          <div className={styles.textWrap}>
            <p className={styles.chapter}>{current.chapter}</p>
            <h1>{current.title}</h1>
            <div className={styles.rule} />
            <div className={styles.prose}>
              {current.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>
          </div>

          <button className={styles.prev} onClick={() => go(page - 1)} disabled={page === 0} aria-label="Önceki sayfa">‹</button>
          <button className={styles.next} onClick={() => go(page + 1)} disabled={page === pages.length - 1} aria-label="Sonraki sayfa">›</button>

          <footer className={styles.progressArea}>
            <input
              type="range"
              min="0"
              max={pages.length - 1}
              value={page}
              onChange={(event) => go(Number(event.target.value))}
              aria-label="Okuma ilerlemesi"
            />
            <div className={styles.progressMeta}>
              <span>{page + 1} / {pages.length}</span>
              <span>% {progress} <i /> Yaklaşık {Math.max(1, pages.length - page - 1)} dk kaldı</span>
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

            {panel === "toc" && (
              <div className={styles.toc}>
                {chapterStarts.map((item) => (
                  <button key={item.page} className={page === item.page ? styles.currentToc : ""} onClick={() => go(item.page)}>
                    <span>{item.label}</span><b>{item.page + 1}</b>
                  </button>
                ))}
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
                <label htmlFor="font-size">Yazı Boyutu</label>
                <div className={styles.fontRow}>
                  <span>A</span>
                  <input id="font-size" type="range" min="17" max="30" value={fontSize} onChange={(event) => setFontSize(Number(event.target.value))} />
                  <span>A</span>
                </div>
              </div>
            )}

            {panel === "notes" && (
              <div className={styles.notes}>
                <p>{page + 1}. ekran için not</p>
                <textarea value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Bu bölümle ilgili notunuzu yazın…" />
                <button className={styles.saveNote} onClick={saveNote}>Notu Kaydet</button>
                <div className={styles.savedNotes}>
                  {Object.entries(notes).filter(([, value]) => value.trim()).map(([key, value]) => (
                    <button key={key} onClick={() => go(Number(key))}>
                      <b>{Number(key) + 1}. ekran</b><span>{value}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </>
      )}
    </main>
  );
}
