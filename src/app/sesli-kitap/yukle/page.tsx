"use client";

import { FormEvent, useEffect, useState } from "react";
import { uploadPresigned } from "@vercel/blob/client";
import styles from "./upload.module.css";

const TARGET_PATH = "audiobooks/bir-sifacinin-kanadi/master.mp3";

export default function AudiobookUploadPage() {
  const [file,setFile] = useState<File | null>(null);
  const [progress,setProgress] = useState(0);
  const [status,setStatus] = useState<"idle"|"uploading"|"done"|"error">("idle");
  const [message,setMessage] = useState("");
  const [url,setUrl] = useState("");
  const [authChecked,setAuthChecked] = useState(false);
  const [authenticated,setAuthenticated] = useState(false);
  const [pin,setPin] = useState("");
  const [authMessage,setAuthMessage] = useState("");
  const [verified,setVerified] = useState(false);

  useEffect(()=>{
    void fetch("/api/sesli-kitap/auth",{cache:"no-store"})
      .then((response)=>response.json())
      .then((data)=>{
        setAuthenticated(Boolean(data?.authenticated));
        setAuthChecked(true);
      })
      .catch(()=>{
        setAuthenticated(false);
        setAuthChecked(true);
      });
  },[]);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthMessage("");
    const response=await fetch("/api/sesli-kitap/auth",{
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify({pin}),
    });
    const data=await response.json().catch(()=>null);
    if(!response.ok){
      setAuthMessage(data?.error || "Giriş yapılamadı.");
      return;
    }
    setAuthenticated(true);
    setPin("");
  }

  async function verifyPublishedAudio(expectedUrl:string) {
    try{
      const response=await fetch("/api/sesli-kitap/current",{cache:"no-store"});
      const data=await response.json();
      const ok=Boolean(
        response.ok &&
        data?.ready &&
        typeof data.url==="string" &&
        data.url &&
        (data.pathname==="audiobooks/bir-sifacinin-kanadi/master.mp3" || data.url===expectedUrl)
      );
      setVerified(ok);
      return ok;
    }catch{
      setVerified(false);
      return false;
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) return;

    if (file.type && !["audio/mpeg","audio/mp3"].includes(file.type)) {
      setStatus("error");
      setMessage("Lütfen MP3 dosyasını seçin.");
      return;
    }

    setStatus("uploading");
    setProgress(0);
    setMessage("");
    setUrl("");
    setVerified(false);

    try {
      const blob = await uploadPresigned(TARGET_PATH,file,{
        access:"public",
        handleUploadUrl:"/api/sesli-kitap/upload",
        multipart:true,
        onUploadProgress:(event)=>setProgress(Math.round(event.percentage)),
      });

      setUrl(blob.url);
      const ok=await verifyPublishedAudio(blob.url);
      setStatus("done");
      setMessage(
        ok
          ? "Master ses dosyası yüklendi ve player kaynağı doğrulandı."
          : "Dosya yüklendi; player kaynağı henüz doğrulanamadı."
      );
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Yükleme sırasında hata oluştu.");
    }
  }

  const size = file ? (file.size / 1024 / 1024).toFixed(1) : null;

  if(!authChecked){
    return <main className={styles.page}><section className={styles.card}><div className={styles.authBox}>Yönetim paneli hazırlanıyor…</div></section></main>;
  }

  if(!authenticated){
    return (
      <main className={styles.page}>
        <section className={styles.card}>
          <div className={styles.authBox}>
            <span>22 YAYINEVİ</span>
            <h1>Sesli Kitap Yönetimi</h1>
            <p>Master ses dosyasını değiştirmek için yönetici girişi gereklidir.</p>
            <form onSubmit={login}>
              <input
                type="password"
                inputMode="numeric"
                autoComplete="current-password"
                placeholder="Yönetici PIN"
                value={pin}
                onChange={(event)=>setPin(event.target.value)}
              />
              <button type="submit">Giriş Yap</button>
            </form>
            {authMessage && <small>{authMessage}</small>}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <a href="/" className={styles.brand} aria-label="22 Yayınevi ana sayfa">
          <span>22</span>
          <small>YAYINEVİ</small>
        </a>

        <div className={styles.heading}>
          <p>SESLİ KİTAP YÖNETİMİ</p>
          <h1>Bir Şifacının Kanadı</h1>
          <span>Figen Yavuz · Master MP3 yükleme</span>
        </div>

        <div className={styles.bookRow}>
          <div className={styles.cover}>
            <small>FİGEN YAVUZ</small>
            <strong>Bir<br/>Şifacının<br/>Kanadı</strong>
            <span>22 YAYINEVİ</span>
          </div>
          <div>
            <b>Hedef dosya</b>
            <code>{TARGET_PATH}</code>
            <p>Web player tek master MP3 kullanır. Bölüm geçişleri dosyanın içindeki zaman işaretlerinden yapılır.</p>
          </div>
        </div>

        <form onSubmit={onSubmit} className={styles.form}>
          <label className={styles.drop}>
            <input
              type="file"
              accept=".mp3,audio/mpeg"
              onChange={(event)=>{
                const next=event.target.files?.[0] ?? null;
                setFile(next);
                setStatus("idle");
                setProgress(0);
                setMessage("");
              }}
            />
            <span className={styles.uploadIcon}>↑</span>
            <strong>{file ? file.name : "Master MP3 dosyasını seçin"}</strong>
            <small>{file ? `${size} MB` : "MP3 · en fazla 120 MB"}</small>
          </label>

          {status === "uploading" && (
            <div className={styles.progressArea}>
              <div className={styles.progressTop}><span>Yükleniyor</span><b>{progress}%</b></div>
              <div className={styles.progress}><i style={{width:`${progress}%`}} /></div>
              <small>Tarayıcıyı kapatmayın. Dosya doğrudan Vercel Blob'a yükleniyor.</small>
            </div>
          )}

          {message && <div className={status === "done" ? styles.success : styles.error}>{message}</div>}

          {url && (
            <div className={styles.result}>
              <span>YAYIN DURUMU</span>
              <b>{verified ? "✓ Player kaynağı doğrulandı" : "Kontrol bekliyor"}</b>
            </div>
          )}

          <button type="submit" disabled={!file || status === "uploading"}>
            {status === "uploading" ? "Yükleniyor…" : "Ses Dosyasını Yükle"}
          </button>
        </form>

        <div className={styles.footer}>
          <span>2:21:17</span>
          <span>85 bölüm</span>
          <span>64 kbps</span>
          <span>Web master</span>
        </div>
      </section>
    </main>
  );
}
