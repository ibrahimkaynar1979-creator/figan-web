"use client";

import Image from "next/image";
import styles from "./PublicationPreviewDock.module.css";
import { BRAND_ASSETS } from "../../../lib/brandAssets";

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
  publicationHref?: string;
  sourceReady?: boolean;
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
  publicationHref,
  sourceReady = false,
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
              <Image src={BRAND_ASSETS.publisherLogo} alt="22 Yayınevi" width={300} height={190} />
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
                <Image src={BRAND_ASSETS.readerLogo} alt="22 Reader" width={520} height={170} />
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.audioDeviceLocked}>
            <header className={styles.audioLockedTopbar}>
              <Image src={BRAND_ASSETS.publisherLogo} alt="22 Yayınevi" width={300} height={190} />
              <button type="button" aria-label="Bölümler">⋮</button>
            </header>

            <div className={styles.audioLockedContent}>
              <div className={styles.audioLockedCover}><img src={cover} alt="" /></div>

              <div className={styles.audioLockedListening}>
                <svg viewBox="0 0 28 22" aria-hidden="true">
                  <path d="M2 8v6M6 5v12M10 2v18M14 7v8M18 4v14M22 6v10M26 9v4" />
                </svg>
                <span>ŞİMDİ DİNLİYORSUNUZ</span>
              </div>

              <h3 className={styles.audioLockedTitle}>{safeTitle}</h3>
              <p className={styles.audioLockedMeta}>
                {safeAuthor}{voice ? ` · ${voice} sesi` : ""}{audioDuration !== "—" ? ` · ${audioDuration}` : ""}
              </p>

              <div className={styles.audioLockedDivider}><i>✦</i></div>

              <div className={styles.audioLockedNow}>
                <span>{safeTitle.toLocaleUpperCase("tr-TR")}</span>
                <strong>1. Bölüm — {subtitle || "Kitabın Tamamı"}</strong>
                <small>{audioDuration} · {safeAuthor}</small>
              </div>

              <div className={styles.audioLockedProgress}>
                <div><i /></div>
                <p><span>0:00</span><span>-{audioDuration}</span></p>
              </div>

              <div className={styles.audioLockedTransport}>
                <button type="button" aria-label="15 saniye geri">
                  <svg viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M15.6 10.6H8.9V3.9" /><path d="M9.6 11A16.8 16.8 0 1 1 7.9 31" />
                  </svg>
                  <small>15</small>
                </button>
                <button type="button" className={styles.audioLockedPlay} aria-label="Oynat">
                  <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M11 7.5 24 16 11 24.5Z" /></svg>
                </button>
                <button type="button" aria-label="15 saniye ileri">
                  <svg viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M32.4 10.6h6.7V3.9" /><path d="M38.4 11A16.8 16.8 0 1 0 40.1 31" />
                  </svg>
                  <small>15</small>
                </button>
              </div>

              <div className={styles.audioLockedTools}>
                <span><b>1x</b><small>Hız</small></span>
                <span>
                  <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M23.5 22.5A10.8 10.8 0 0 1 10 9a10 10 0 1 0 13.5 13.5Z" /></svg>
                  <small>Uyku</small>
                </span>
                <span>
                  <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M7 8.5h4.5M14.5 8.5H25M7 16h4.5M14.5 16H25M7 23.5h4.5M14.5 23.5H25" /></svg>
                  <small>Bölümler</small>
                </span>
              </div>

              <div className={styles.audioLockedChapter}>
                <div><span>BÖLÜM 1</span><strong>{subtitle || "Kitabın Tamamı"}</strong></div>
                <b>Tüm bölümler →</b>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.checks}>
        <div><span>Kapak</span><b>{coverSrc ? "Hazır" : "Bekliyor"}</b></div>
        <div><span>Yazar</span><b>{author.trim() ? "Bağlı" : "Bekliyor"}</b></div>
        <div><span>{activeMode === "reader" ? "EPUB" : "MP3"}</span><b>{sourceReady ? "Hazır" : "Bekliyor"}</b></div>
      </div>

      <section className={styles.detailPanel}>
        <div className={styles.detailHead}>
          <div>
            <span>YAYIN ÖZETİ</span>
            <strong>{safeTitle}</strong>
          </div>
          <b>{status}</b>
        </div>

        <dl className={styles.metaList}>
          <div><dt>Yazar</dt><dd>{safeAuthor}</dd></div>
          {subtitle ? <div><dt>Alt başlık</dt><dd>{subtitle}</dd></div> : null}
          <div><dt>Format</dt><dd>{activeMode === "reader" ? "EPUB · 22 Reader" : "MP3 · Sesli Kitap"}</dd></div>
          <div><dt>İçerik</dt><dd>{activeMode === "reader" ? chapterLabel : audioDuration}</dd></div>
          <div><dt>Durum</dt><dd>{status}</dd></div>
        </dl>

        <div className={styles.readiness}>
          <div className={coverSrc ? styles.done : ""}><i>{coverSrc ? "✓" : "1"}</i><span>Kapak görseli</span><b>{coverSrc ? "Hazır" : "Eksik"}</b></div>
          <div className={author.trim() ? styles.done : ""}><i>{author.trim() ? "✓" : "2"}</i><span>Yazar bağlantısı</span><b>{author.trim() ? "Hazır" : "Eksik"}</b></div>
          <div className={sourceReady ? styles.done : ""}><i>{sourceReady ? "✓" : "3"}</i><span>{activeMode === "reader" ? "EPUB kaynağı" : "MP3 kaynağı"}</span><b>{sourceReady ? "Hazır" : "Eksik"}</b></div>
        </div>

        {publicationHref ? (
          <a className={styles.openPublication} href={publicationHref} target="_blank" rel="noreferrer">
            <span><small>YAYIN ADRESİ</small><code>{publicationHref}</code></span>
            <b>Önizle ↗</b>
          </a>
        ) : null}
      </section>
    </aside>
  );
}
