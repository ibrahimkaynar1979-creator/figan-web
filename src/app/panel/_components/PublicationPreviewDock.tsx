"use client";

import Image from "next/image";
import styles from "./PublicationPreviewDock.module.css";

type Props = {
  activeMode?: "reader" | "audio";
  title: string;
  subtitle?: string;
  author: string;
  coverSrc?: string;
  chapterLabel?: string;
  readingTimeLabel?: string;
  voice?: string;
  audioDuration?: string;
  status?: string;
  onModeChange?: (mode: "reader" | "audio") => void;
};

export default function PublicationPreviewDock({
  activeMode = "reader",
  title,
  subtitle,
  author,
  coverSrc,
  chapterLabel = "… bölüm",
  readingTimeLabel = "…",
  voice,
  audioDuration = "—",
  status = "Taslak",
  onModeChange,
}: Props) {
  const safeTitle = title.trim() || "Kitap adı";
  const safeAuthor = author.trim() || "Yazar adı";
  const cover = coverSrc || "/bir_sifaci_png.png";

  return (
    <aside className={styles.dock} aria-label="Yayın önizleme alanı">
      <div className={styles.dockHead}>
        <div>
          <span>CANLI ÖNİZLEME</span>
          <strong>Yayın nasıl görünecek?</strong>
        </div>
        <b>{status}</b>
      </div>

      <div className={styles.tabs}>
        <button
          type="button"
          className={activeMode === "reader" ? styles.active : ""}
          onClick={() => onModeChange?.("reader")}
        >
          22 Reader
        </button>
        <button
          type="button"
          className={activeMode === "audio" ? styles.active : ""}
          onClick={() => onModeChange?.("audio")}
        >
          Sesli Kitap
        </button>
      </div>

      <div className={styles.deviceStage}>
        {activeMode === "reader" ? (
          <div className={styles.readerDevice}>
            <header>
              <Image src="/22_yayinevi_logo_1.png" alt="22 Yayınevi" width={300} height={190} />
              <span>⋮</span>
            </header>
            <div className={styles.readerBody}>
              <div className={styles.readerCover}>
                <img src={cover} alt="" />
              </div>
              <h3>{safeAuthor}</h3>
              <p>22 Yayınevi</p>
              <button type="button">Okumaya Başla <span>→</span></button>
              <div className={styles.readerStats}>
                <span>▣ {chapterLabel}</span>
                <span>◷ {readingTimeLabel}</span>
                <span>▤ EPUB</span>
              </div>
              <div className={styles.readerBrand}>
                <Image src="/22_reader_logo.png" alt="22 Reader" width={520} height={170} />
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.audioDevice}>
            <header>
              <Image src="/22_yayinevi_logo_1.png" alt="22 Yayınevi" width={300} height={190} />
              <span>•••</span>
            </header>
            <div className={styles.audioBody}>
              <div className={styles.audioCover}><img src={cover} alt="" /></div>
              <small>ŞİMDİ DİNLİYORSUNUZ</small>
              <h3>{safeTitle}</h3>
              <p>{safeAuthor}{voice ? ` · ${voice} sesi` : ""}</p>
              <div className={styles.chapterCard}>
                <span>{subtitle || safeTitle}</span>
                <b>1. Bölüm</b>
                <small>{audioDuration}</small>
              </div>
              <div className={styles.progress}><i /><span>0:00</span><span>-{audioDuration}</span></div>
              <div className={styles.transport}>
                <button type="button">↶<small>15</small></button>
                <button type="button" className={styles.play}>▶</button>
                <button type="button">↷<small>15</small></button>
              </div>
              <div className={styles.audioTools}>
                <span><b>1X</b>Hız</span><span><b>☾</b>Uyku</span><span><b>☷</b>Bölümler</span><span><b>⇩</b>İndir</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.checks}>
        <div><span>Kapak</span><b>{coverSrc ? "Hazır" : "Bekliyor"}</b></div>
        <div><span>Yazar</span><b>{author.trim() ? "Bağlı" : "Bekliyor"}</b></div>
        <div><span>{activeMode === "reader" ? "EPUB" : "MP3"}</span><b>Önizleme</b></div>
      </div>
    </aside>
  );
}
