import Image from "next/image";
import styles from "./AuthorPlatform.module.css";
import type { AuthorBook, AuthorProfile } from "../../_data/authors";

export default function AudioShowcase({ author, book }: { author: AuthorProfile; book: AuthorBook }) {
  return (
    <section className={styles.audioSection}>
      <div className={styles.devicePanel}>
        <div className={styles.productHeader}><a href="/">22 <span>YAYINEVİ</span></a><b>•••</b></div>
        <div className={styles.audioCover}><Image src={book.cover} alt={book.title} width={900} height={1100} /></div>
        <p className={styles.nowPlaying}>⌁ ŞİMDİ DİNLİYORSUNUZ</p>
        <h2>{book.title}</h2>
        <p className={styles.audioMeta}>{author.name} · {book.audio?.narrator || "Seslendiren"} sesi · {book.audio?.duration || "—"}</p>
        <div className={styles.chapterBlock}>
          <small>{book.title}</small>
          <h3>1. Bölüm — Arayışın Yolculuğu</h3>
          <p>1:10 · {author.name}</p>
        </div>
        <div className={styles.progress}><i /><span>0:00</span><span>-{book.audio?.duration || "—"}</span></div>
        <div className={styles.transport}>
          <button aria-label="15 saniye geri">↶<small>15</small></button>
          <button className={styles.playButton} aria-label="Oynat">▶</button>
          <button aria-label="15 saniye ileri">↷<small>15</small></button>
        </div>
        <div className={styles.audioTools}>
          <span><b>1X</b>Hız</span><span><b>☾</b>Uyku</span><span><b>☷</b>Bölümler</span><span><b>⇩</b>İndir</span>
        </div>
        <a className={styles.chapterFooter} href={book.audioUrl || "#"}>
          <span><small>BÖLÜM 1 / {book.audio?.chapters || "—"}</small><b>ARAYIŞIN YOLCULUĞU</b></span><strong>Tüm bölümler →</strong>
        </a>
      </div>
    </section>
  );
}
