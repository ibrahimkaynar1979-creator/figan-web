"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";
import styles from "./NewAuthor.module.css";
import { saveManagedAuthor, type ManagedAuthor } from "../../_lib/managedStore";

const slugify = (value: string) =>
  value.toLocaleLowerCase("tr-TR")
    .replace(/ı/g,"i").replace(/ğ/g,"g").replace(/ü/g,"u")
    .replace(/ş/g,"s").replace(/ö/g,"o").replace(/ç/g,"c")
    .replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");

export default function NewAuthorPage() {
  const [name,setName] = useState("");
  const [slug,setSlug] = useState("");
  const [role,setRole] = useState("Yazar");
  const [bio,setBio] = useState("");
  const [domain,setDomain] = useState("");
  const [status,setStatus] = useState<"Taslak"|"Yayında">("Taslak");
  const [instagram,setInstagram] = useState("");
  const [website,setWebsite] = useState("");
  const [photoName,setPhotoName] = useState("");
  const [saved,setSaved] = useState(false);

  useEffect(()=>{
    document.body.classList.add("reader-admin-route");
    return ()=>document.body.classList.remove("reader-admin-route");
  },[]);

  const href = useMemo(()=>`/yazarlar/${slug || "yazar-slug"}`,[slug]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const item: ManagedAuthor = {
      name, slug, href, role, bio, domain, status, instagram, website, photoName, source: "panel"
    };
    saveManagedAuthor(item);
    setSaved(true);
    window.setTimeout(()=>setSaved(false),2500);
  };

  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <a href="/panel/yazarlar" className={styles.brand}><Image src="/22_yayinevi_logo_1.png" alt="22 Yayınevi" width={330} height={210} priority /></a>
        <div className={styles.readerMark}><Image src="/22_reader_logo.png" alt="22 Reader" width={360} height={118} priority /></div>
        <nav><a href="/panel/reader">▦ Kitaplar</a><a href="/panel/yazarlar">✒ Yazarlar</a><a className={styles.active} href="/panel/yazarlar/yeni">＋ Yeni Yazar</a></nav>
      </aside>

      <section className={styles.workspace}>
        <header className={styles.topbar}>
          <div><span>22 READER · YAZAR YÖNETİMİ</span><h1>Yeni Yazar</h1></div>
          <a href="/panel/yazarlar">Kapat ×</a>
        </header>

        <form className={styles.form} onSubmit={submit}>
          <section className={styles.card}>
            <div className={styles.sectionTitle}><span>01</span><div><b>YAZAR KİMLİĞİ</b><h2>Profil bilgileri</h2></div></div>
            <div className={styles.fields}>
              <label><span>Yazar Adı</span><input required value={name} onChange={e=>{setName(e.target.value);setSlug(slugify(e.target.value));}} placeholder="Ad Soyad" /></label>
              <label><span>Rol</span><input value={role} onChange={e=>setRole(e.target.value)} placeholder="Yazar" /></label>
              <label><span>Slug</span><input required value={slug} onChange={e=>setSlug(slugify(e.target.value))} placeholder="ad-soyad" /><small>Profil adresi: <code>{href}</code></small></label>
              <label><span>Alan Adı</span><input value={domain} onChange={e=>setDomain(e.target.value)} placeholder="ornek.com" /></label>
              <label className={styles.wide}><span>Kısa Biyografi</span><textarea value={bio} onChange={e=>setBio(e.target.value)} placeholder="Yazarın kısa biyografisi..." /></label>
              <label><span>Yayın Durumu</span><select value={status} onChange={e=>setStatus(e.target.value as "Taslak"|"Yayında")}><option>Taslak</option><option>Yayında</option></select></label>
              <label><span>Profil Fotoğrafı</span><input type="file" accept="image/png,image/jpeg,image/webp" onChange={e=>setPhotoName(e.target.files?.[0]?.name || "")} /><small>{photoName || "Henüz dosya seçilmedi"}</small></label>
            </div>
          </section>

          <section className={styles.card}>
            <div className={styles.sectionTitle}><span>02</span><div><b>BAĞLANTILAR</b><h2>Dijital adresler</h2></div></div>
            <div className={styles.fields}>
              <label><span>Web Sitesi</span><input value={website} onChange={e=>setWebsite(e.target.value)} placeholder="https://..." /></label>
              <label><span>Instagram</span><input value={instagram} onChange={e=>setInstagram(e.target.value)} placeholder="https://instagram.com/..." /></label>
            </div>
            <div className={styles.preview}><span>Profil URL</span><code>{href}</code><b>Otomatik</b></div>
          </section>

          <footer className={styles.actions}><a href="/panel/yazarlar">Vazgeç</a><button type="submit">{saved ? "Kaydedildi ✓" : "Yazarı Kaydet"}</button></footer>
        </form>
      </section>
    </main>
  );
}
