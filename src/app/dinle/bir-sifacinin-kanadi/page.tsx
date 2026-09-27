"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./player.module.css";

type Chapter = {
  id: number;
  title: string;
  duration: string;
  src: string;
};

const chapters: Chapter[] = [
  { id: 1, title: "Başlangıç", duration: "28:50", src: "/audio/bir-sifacinin-kanadi/01-baslangic.mp3" },
  { id: 2, title: "İlk Yaralar", duration: "32:17", src: "/audio/bir-sifacinin-kanadi/02-ilk-yaralar.mp3" },
  { id: 3, title: "Arayış", duration: "25:04", src: "/audio/bir-sifacinin-kanadi/03-arayis.mp3" },
  { id: 4, title: "Kırılma", duration: "29:11", src: "/audio/bir-sifacinin-kanadi/04-kirilma.mp3" },
  { id: 5, title: "İçsel Yolculuk", duration: "31:48", src: "/audio/bir-sifacinin-kanadi/05-icsel-yolculuk.mp3" },
  { id: 6, title: "Kabulleniş", duration: "27:36", src: "/audio/bir-sifacinin-kanadi/06-kabullenis.mp3" },
  { id: 7, title: "Dönüşüm", duration: "26:19", src: "/audio/bir-sifacinin-kanadi/07-donusum.mp3" },
  { id: 8, title: "Kanat", duration: "28:12", src: "/audio/bir-sifacinin-kanadi/08-kanat.mp3" },
];

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export default function BirSifacininKanadiPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [chapterIndex, setChapterIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rate, setRate] = useState(1);
  const [chaptersOpen, setChaptersOpen] = useState(false);
  const [sleepMinutes, setSleepMinutes] = useState<number | null>(null);
  const [sleepLeft, setSleepLeft] = useState<number | null>(null);
  const [audioError, setAudioError] = useState(false);

  const chapter = chapters[chapterIndex];

  useEffect(() => {
    const saved = window.localStorage.getItem("22y-bir-sifacinin-kanadi-progress");
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved) as { chapterIndex?: number; currentTime?: number };
      if (typeof parsed.chapterIndex === "number" && parsed.chapterIndex >= 0 && parsed.chapterIndex < chapters.length) {
        setChapterIndex(parsed.chapterIndex);
      }
      if (typeof parsed.currentTime === "number" && parsed.currentTime > 0) {
        setCurrentTime(parsed.currentTime);
      }
    } catch {
      // Eski/bozuk kayıt varsa sessizce sıfırdan başla.
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setAudioError(false);
    audio.pause();
    audio.src = chapter.src;
    audio.load();

    const restore = () => {
      if (currentTime > 0 && currentTime < audio.duration) {
        audio.currentTime = currentTime;
      }
    };
    audio.addEventListener("loadedmetadata", restore, { once: true });
    return () => audio.removeEventListener("loadedmetadata", restore);
    // chapter değişiminde yeni kaynağı yükle
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapterIndex]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      window.localStorage.setItem(
        "22y-bir-sifacinin-kanadi-progress",
        JSON.stringify({ chapterIndex, currentTime })
      );
    }, 4000);
    return () => window.clearInterval(interval);
  }, [chapterIndex, currentTime]);

  useEffect(() => {
    if (!sleepMinutes) {
      setSleepLeft(null);
      return;
    }
    const endAt = Date.now() + sleepMinutes * 60 * 1000;
    setSleepLeft(sleepMinutes * 60);

    const timer = window.setInterval(() => {
      const remaining = Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
      setSleepLeft(remaining);
      if (remaining <= 0) {
        audioRef.current?.pause();
        setPlaying(false);
        setSleepMinutes(null);
      }
    }, 1000);

    return () => window.clearInterval(timer);
  }, [sleepMinutes]);

  const progress = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  const sleepLabel = useMemo(() => {
    if (sleepLeft === null) return "Uyku";
    const min = Math.floor(sleepLeft / 60);
    const sec = sleepLeft % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  }, [sleepLeft]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    setAudioError(false);
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setAudioError(true);
      setPlaying(false);
    }
  };

  const seekBy = (amount: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(audio.duration || Infinity, audio.currentTime + amount));
  };

  const changeRate = () => {
    const order = [1, 1.25, 1.5, 1.75, 2, 0.75];
    const next = order[(order.indexOf(rate) + 1) % order.length];
    setRate(next);
    if (audioRef.current) audioRef.current.playbackRate = next;
  };

  const selectChapter = (index: number) => {
    setPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setChapterIndex(index);
    setChaptersOpen(false);
    window.setTimeout(() => {
      void audioRef.current?.play().then(() => setPlaying(true)).catch(() => setAudioError(true));
    }, 120);
  };

  const nextChapter = () => {
    if (chapterIndex >= chapters.length - 1) {
      setPlaying(false);
      return;
    }
    setCurrentTime(0);
    setDuration(0);
    setChapterIndex((i) => i + 1);
    window.setTimeout(() => {
      void audioRef.current?.play().then(() => setPlaying(true)).catch(() => setAudioError(true));
    }, 120);
  };

  const cycleSleep = () => {
    const order: Array<number | null> = [15, 30, 45, 60, null];
    const current = order.indexOf(sleepMinutes);
    setSleepMinutes(order[(current + 1) % order.length]);
  };

  return (
    <main className={styles.page}>
      <audio
        ref={audioRef}
        preload="metadata"
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => {
          setDuration(e.currentTarget.duration || 0);
          e.currentTarget.playbackRate = rate;
        }}
        onEnded={nextChapter}
        onError={() => {
          setAudioError(true);
          setPlaying(false);
        }}
      />

      <header className={styles.topbar}>
        <a className={styles.brand} href="/" aria-label="22 Yayınevi ana sayfa">
          <span className={styles.brand22}>22</span>
          <span>YAYINEVİ</span>
        </a>
        <div className={styles.bookMetaTop}>
          <span>SESLİ KİTAP</span>
          <b>Bir Şifacının Kanadı</b>
        </div>
        <a className={styles.closeLink} href="/sesli-kitap" aria-label="Sesli kitap sayfasına dön">×</a>
      </header>

      <section className={styles.shell}>
        <div className={styles.coverPanel}>
          <div className={styles.cover}>
            <span className={styles.coverAuthor}>FATMA NİLDA KOÇAK</span>
            <div className={styles.wingMark}>✦</div>
            <h1>Bir<br/>Şifacının<br/>Kanadı</h1>
            <p>İnsanın Kendine<br/>Dönüş Yolculuğu</p>
            <span className={styles.coverPublisher}>22 YAYINEVİ</span>
          </div>
          <div className={styles.desktopBookInfo}>
            <p>Şimdi dinliyorsunuz</p>
            <h2>Bir Şifacının Kanadı</h2>
            <span>Fatma Nilda Koçak</span>
          </div>
        </div>

        <div className={styles.playerPanel}>
          <div className={styles.nowPlaying}>
            <span className={styles.kicker}>BİR ŞİFACININ KANADI</span>
            <h2>{chapter.id}. Bölüm — {chapter.title}</h2>
            <p>İnsanın Kendine Dönüş Yolculuğu</p>
          </div>

          <div className={styles.progressWrap}>
            <input
              className={styles.range}
              aria-label="Dinleme konumu"
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={Math.min(currentTime, duration || 0)}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (audioRef.current) audioRef.current.currentTime = value;
                setCurrentTime(value);
              }}
              style={{ "--progress": `${progress}%` } as React.CSSProperties}
            />
            <div className={styles.timeRow}>
              <span>{formatTime(currentTime)}</span>
              <span>-{formatTime(Math.max(0, duration - currentTime))}</span>
            </div>
          </div>

          <div className={styles.transport}>
            <button onClick={() => seekBy(-15)} aria-label="15 saniye geri">
              <span className={styles.jump}>↶</span>
              <small>15</small>
            </button>
            <button className={styles.play} onClick={togglePlay} aria-label={playing ? "Duraklat" : "Oynat"}>
              {playing ? "Ⅱ" : "▶"}
            </button>
            <button onClick={() => seekBy(15)} aria-label="15 saniye ileri">
              <span className={styles.jump}>↷</span>
              <small>15</small>
            </button>
          </div>

          {audioError && (
            <div className={styles.audioNotice}>
              Player hazır. Bu bölümün MP3 dosyası repo içine eklendiğinde burada doğrudan çalacak.
            </div>
          )}

          <div className={styles.tools}>
            <button onClick={changeRate}><b>{rate}x</b><span>Hız</span></button>
            <button onClick={cycleSleep}><b>☾</b><span>{sleepLabel}</span></button>
            <button onClick={() => setChaptersOpen(true)}><b>☷</b><span>Bölümler</span></button>
            <a href={chapter.src} download><b>⇩</b><span>İndir</span></a>
          </div>

          <div className={styles.chapterStrip}>
            <div>
              <span>BÖLÜM {chapter.id}</span>
              <strong>{chapter.title}</strong>
            </div>
            <button onClick={() => setChaptersOpen(true)}>Tüm bölümler <span>→</span></button>
          </div>
        </div>
      </section>

      <aside className={`${styles.drawer} ${chaptersOpen ? styles.drawerOpen : ""}`} aria-hidden={!chaptersOpen}>
        <button className={styles.drawerBackdrop} aria-label="Bölümleri kapat" onClick={() => setChaptersOpen(false)} />
        <div className={styles.drawerPanel}>
          <div className={styles.drawerHead}>
            <div>
              <span>22 YAYINEVİ</span>
              <h2>Bölümler</h2>
            </div>
            <button onClick={() => setChaptersOpen(false)} aria-label="Kapat">×</button>
          </div>
          <div className={styles.drawerBook}>
            <div className={styles.miniCover}>22</div>
            <div>
              <strong>Bir Şifacının Kanadı</strong>
              <span>Fatma Nilda Koçak</span>
              <small>{chapters.length} bölüm · Sesli kitap</small>
            </div>
          </div>
          <div className={styles.chapterList}>
            {chapters.map((item, index) => (
              <button
                key={item.id}
                className={index === chapterIndex ? styles.activeChapter : ""}
                onClick={() => selectChapter(index)}
              >
                <span className={styles.chapterNo}>{item.id.toString().padStart(2, "0")}</span>
                <span className={styles.chapterText}>
                  <strong>{item.title}</strong>
                  <small>{item.duration}</small>
                </span>
                <span className={styles.chapterPlay}>{index === chapterIndex && playing ? "Ⅱ" : "▶"}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>
    </main>
  );
}
