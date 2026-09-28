"use client";

import Image from "next/image";
import styles from "./LockedReader.module.css";

export default function LockedReaderBlank() {
  return (
    <main
      className={styles.reader}
      data-theme="cream"
      data-reading="false"
      data-chrome="visible"
      style={{
        "--reader-font-size": "22px",
        "--reader-line-height": "1.68",
        "--reader-page-margin": "24px",
      } as React.CSSProperties}
    >
      <aside className={styles.sidebar} aria-hidden="true">
        <a href="/" className={styles.brand}>
          <Image src="/22_yayinevi_logo_1.webp" alt="22 Yayınevi" width={360} height={236} priority />
        </a>
        <div className={styles.cover} style={{ aspectRatio: "3 / 4", background: "#f4ecdf" }} />
        <h2 style={{ minHeight: 24 }} />
        <p style={{ minHeight: 18 }} />
      </aside>

      <section className={styles.stage}>
        <header className={styles.topbar}>
          <div className={styles.coverTopLogo}>
            <Image src="/22_yayinevi_logo_1.webp" alt="22 Yayınevi" width={300} height={190} priority />
          </div>
          <button className={styles.coverMenuButton} type="button" aria-label="Menü">⋮</button>
        </header>

        <article className={styles.readingArea}>
          <div className={styles.coverScreen}>
            <div
              className={styles.coverHero}
              aria-label="Kitap kapağı alanı"
              style={{
                aspectRatio: "3 / 4",
                background: "linear-gradient(180deg,#f8f1e7 0%,#efe2d2 100%)",
                borderRadius: 6,
              }}
            />
            <div className={styles.coverAuthor} style={{ minHeight: "1em" }}>&nbsp;</div>
            <div className={styles.coverPublisher}>22 Yayınevi</div>
            <button type="button" className={styles.startButton} disabled>
              Okumaya Başla <span>→</span>
            </button>

            <div className={styles.coverStats}>
              <span>
                <i aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M3.5 5.5c2.8-.7 5.5-.2 8 1.5v12c-2.5-1.7-5.2-2.2-8-1.5z"/><path d="M20.5 5.5c-2.8-.7-5.5-.2-8 1.5v12c2.5-1.7 5.2-2.2 8-1.5z"/></svg>
                </i>
                <b>0 bölüm</b>
              </span>
              <span>
                <i aria-hidden="true">
                  <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5l3.5 2"/></svg>
                </i>
                <b>~ 0 dk</b>
              </span>
              <span>
                <i aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M6.5 3.5h7l4 4v13h-11z"/><path d="M13.5 3.5v4h4"/><path d="M9 12h6M9 15h6"/></svg>
                </i>
                <b>EPUB</b>
              </span>
            </div>

            <div className={styles.coverReaderBrand}>
              <Image src="/22_reader_logo.webp" alt="22 Reader" width={520} height={170} priority />
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
