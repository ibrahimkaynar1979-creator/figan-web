"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./PublicationPreviewDock.module.css";
import { BRAND_ASSETS } from "../../../lib/brandAssets";
import LockedManagedReader from "../../_components/LockedManagedReader";

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
  audioPublicationHref?: string;
  audioPreviewHref?: string;
  readerPreviewEpubUrl?: string;
  readerPreviewFile?: File | null;
  sourceReady?: boolean;
  audioSourceReady?: boolean;
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
  audioPublicationHref,
  audioPreviewHref,
  readerPreviewEpubUrl,
  readerPreviewFile,
  sourceReady = false,
  audioSourceReady = false,
  onModeChange,
}: Props) {
  const [previewMode, setPreviewMode] = useState<"reader" | "audio">(activeMode);
  const [readerOpen, setReaderOpen] = useState(false);
  const [localReaderEpubUrl, setLocalReaderEpubUrl] = useState("");
  const readerFrameHostRef = useRef<HTMLDivElement | null>(null);
  const dockRef = useRef<HTMLElement | null>(null);
  const [readerScale, setReaderScale] = useState(1);
  const [readerStats, setReaderStats] = useState<{ chapterCount: number; readingMinutes: number }>({ chapterCount: 0, readingMinutes: 0 });

  useEffect(() => {
    setPreviewMode(activeMode);
  }, [activeMode]);

  const changeMode = (mode: "reader" | "audio") => {
    setPreviewMode(mode);
    onModeChange?.(mode);
  };

  const activePublicationHref = previewMode === "audio" ? audioPublicationHref : publicationHref;
  const activeSourceReady = previewMode === "audio" ? audioSourceReady : sourceReady;
  const safeTitle = title.trim() || "Kitap adı";
  const safeAuthor = author.trim() || "Yazar adı";
  const cover = coverSrc || "/bir_sifaci_png.png";
  useEffect(() => {
    if (!readerPreviewFile) {
      setLocalReaderEpubUrl("");
      return;
    }

    const url = URL.createObjectURL(readerPreviewFile);
    setLocalReaderEpubUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [readerPreviewFile]);

  const readerSource = localReaderEpubUrl || readerPreviewEpubUrl || "";

  const handleReaderStats = useCallback((stats: { chapterCount: number; readingMinutes: number }) => {
    setReaderStats(current =>
      current.chapterCount === stats.chapterCount && current.readingMinutes === stats.readingMinutes
        ? current
        : stats
    );
  }, []);

  useEffect(() => {
    if (!readerSource) {
      setReaderStats({ chapterCount: 0, readingMinutes: 0 });
      return;
    }
  }, [readerSource]);

  useEffect(() => {
    if (!readerOpen) return;
    const host = readerFrameHostRef.current;
    if (!host) return;

    const updateScale = () => {
      const width = host.clientWidth;
      setReaderScale(width > 0 ? Math.min(1, width / 489) : 1);
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(host);
    return () => observer.disconnect();
  }, [readerOpen]);

  const openReaderPreview = () => {
    if (!readerSource) return;
    setReaderOpen(true);
    window.requestAnimationFrame(() => {
      dockRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  const closeReaderPreview = () => {
    setReaderOpen(false);
    window.requestAnimationFrame(() => {
      dockRef.current?.scrollTo({ top: 0, behavior: "auto" });
    });
  };

  const effectiveChapterLabel = readerStats.chapterCount > 0
    ? `${readerStats.chapterCount} bölüm`
    : chapterLabel;
  const effectiveReadingTimeLabel = readerStats.readingMinutes > 0
    ? readerStats.readingMinutes >= 60
      ? `~ ${Math.floor(readerStats.readingMinutes / 60)} sa ${readerStats.readingMinutes % 60} dk`
      : `~ ${readerStats.readingMinutes} dk`
    : readingTimeLabel;


  return (
    <aside ref={dockRef} className={styles.dock} aria-label="Yayın önizleme alanı">
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
          <>
            {readerSource ? (
              <div className={`${styles.readerIframeShell} ${readerOpen ? "" : styles.readerPreviewHidden}`}>
                <div className={styles.readerInlineBar}>
                  <button type="button" onClick={closeReaderPreview}>← Kapağa dön</button>
                  <span>22 Reader · EPUB Önizleme</span>
                </div>
                <div
                  ref={readerFrameHostRef}
                  className={styles.readerFrameHost}
                  style={{ height: 828 * readerScale }}
                >
                  <div
                    className={styles.readerEmbedCanvas}
                    style={{ transform: `scale(${readerScale})` }}
                  >
                    <LockedManagedReader
                      embedded
                      autoStart
                      onStats={handleReaderStats}
                      book={{
                        slug: "panel-canli-onizleme",
                        title: safeTitle,
                        author: safeAuthor,
                        authorHref: "#",
                        coverUrl: cover,
                        epubUrl: readerPreviewEpubUrl || "",
                        epubFile: readerPreviewFile || undefined,
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : null}

            {!readerOpen ? (
              <div className={styles.readerDevice}>
                <header>
                  <Image src={BRAND_ASSETS.publisherLogo} alt="22 Yayınevi" width={300} height={190} />
                  <span>⋮</span>
                </header>
                <div className={styles.readerBody}>
                  <div className={styles.readerCover}>
                    <img src={cover} alt="" />
                  </div>
                  <h2 className={styles.readerTitle}>{safeTitle}</h2>
                  <h3>{safeAuthor}</h3>
                  <p>22 Yayınevi</p>
                  <button
                    type="button"
                    disabled={!readerSource}
                    onClick={openReaderPreview}
                  >
                    Okumaya Başla <span>→</span>
                  </button>
                  <div className={styles.readerStats}>
                    <span>▣ {readerSource ? effectiveChapterLabel : "EPUB bekleniyor"}</span>
                    <span>◷ {readerSource ? effectiveReadingTimeLabel : "bekliyor"}</span>
                    <span>▤ EPUB</span>
                  </div>
                  <div className={styles.readerBrand}>
                    <Image src={BRAND_ASSETS.readerLogo} alt="22 Reader" width={520} height={170} />
                  </div>
                </div>
              </div>
            ) : null}
          </>
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
        <div><span>{previewMode === "reader" ? "EPUB" : "MP3"}</span><b>{activeSourceReady ? "Hazır" : "Bekliyor"}</b></div>
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
          <div><dt>İçerik</dt><dd>{previewMode === "reader" ? `${effectiveChapterLabel} · ${effectiveReadingTimeLabel}` : audioDuration}</dd></div>
          <div><dt>Durum</dt><dd>{status}</dd></div>
        </dl>

        <div className={styles.readiness}>
          <div className={coverSrc ? styles.done : ""}><i>{coverSrc ? "✓" : "1"}</i><span>Kapak görseli</span><b>{coverSrc ? "Hazır" : "Eksik"}</b></div>
          <div className={author.trim() ? styles.done : ""}><i>{author.trim() ? "✓" : "2"}</i><span>Yazar bağlantısı</span><b>{author.trim() ? "Hazır" : "Eksik"}</b></div>
          <div className={activeSourceReady ? styles.done : ""}><i>{activeSourceReady ? "✓" : "3"}</i><span>{previewMode === "reader" ? "EPUB kaynağı" : "MP3 kaynağı"}</span><b>{activeSourceReady ? "Hazır" : "Eksik"}</b></div>
        </div>

        {activePublicationHref ? (
          <a className={styles.openPublication} href={activePublicationHref} target="_blank" rel="noreferrer">
            <span><small>YAYIN ADRESİ</small><code>{activePublicationHref}</code></span>
            <b>Önizle ↗</b>
          </a>
        ) : null}
      </section>
    </aside>
  );
}
