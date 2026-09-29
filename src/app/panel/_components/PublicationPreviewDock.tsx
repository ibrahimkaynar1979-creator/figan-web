"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
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
  audioPreviewHref?: string;
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
  audioPreviewHref,
  sourceReady = false,
  onModeChange,
}: Props) {
  const [previewMode, setPreviewMode] = useState<"reader" | "audio">(activeMode);

  useEffect(() => {
    setPreviewMode(activeMode);
  }, [activeMode]);

  const changeMode = (mode: "reader" | "audio") => {
    setPreviewMode(mode);
    onModeChange?.(mode);
  };

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
          className={previewMode === "reader" ? styles.active : ""}
          onClick={() => changeMode("reader")}
        >
          22 Reader
        </button>
        <button
          type="button"
          className={previewMode === "audio" ? styles.active : ""}
          onClick={() => changeMode("audio")}
        >
          Sesli Kitap
        </button>
      </div>

      <div className={styles.deviceStage}>
        {previewMode === "reader" ? (
          sourceReady && publicationHref ? (
            <div className={styles.audioIframeShell}>
              <iframe
                className={styles.audioIframe}
                src={publicationHref}
                title="22 Reader canlı önizleme"
              />
            </div>
          ) : (
          <div className={styles.readerDevice}>
            <header>
              <Image src={BRAND_ASSETS.publisherLogo} alt="22 Yayınevi" width={300} height={190} />
              <span>⋮</span>
            </header>
            <div className={styles.readerBody}>
              <div className={styles.readerCover}>
                <img src={cover} alt="" />
              </div>
              <h2>{safeTitle}</h2>
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
          )
        ) : (
          <div className={styles.audioIframeShell}>
            <iframe
              className={styles.audioIframe}
              src={audioPreviewHref || "/dinle/bir-sifacinin-kanadi"}
              title="Sesli kitap canlı önizleme"
              allow="autoplay"
            />
          </div>
        )}
      </div>

      <div className={styles.checks}>
        <div><span>Kapak</span><b>{coverSrc ? "Hazır" : "Bekliyor"}</b></div>
        <div><span>Yazar</span><b>{author.trim() ? "Bağlı" : "Bekliyor"}</b></div>
        <div><span>{previewMode === "reader" ? "EPUB" : "MP3"}</span><b>{sourceReady ? "Hazır" : "Bekliyor"}</b></div>
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
          <div><dt>Format</dt><dd>{previewMode === "reader" ? "EPUB · 22 Reader" : "MP3 · Sesli Kitap"}</dd></div>
          <div><dt>İçerik</dt><dd>{previewMode === "reader" ? chapterLabel : audioDuration}</dd></div>
          <div><dt>Durum</dt><dd>{status}</dd></div>
        </dl>

        <div className={styles.readiness}>
          <div className={coverSrc ? styles.done : ""}><i>{coverSrc ? "✓" : "1"}</i><span>Kapak görseli</span><b>{coverSrc ? "Hazır" : "Eksik"}</b></div>
          <div className={author.trim() ? styles.done : ""}><i>{author.trim() ? "✓" : "2"}</i><span>Yazar bağlantısı</span><b>{author.trim() ? "Hazır" : "Eksik"}</b></div>
          <div className={sourceReady ? styles.done : ""}><i>{sourceReady ? "✓" : "3"}</i><span>{previewMode === "reader" ? "EPUB kaynağı" : "MP3 kaynağı"}</span><b>{sourceReady ? "Hazır" : "Eksik"}</b></div>
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
