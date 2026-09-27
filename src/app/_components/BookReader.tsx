"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import styles from "./EbookReader.module.css";

type ReaderTheme = "light" | "cream" | "dark";
type Panel = "toc" | "appearance" | "notes" | null;
type Section = { title: string; paragraphs: readonly string[] };

export default function BookReader({
  slug,title,author,coverSrc,backHref,sections
}:{
  slug:string; title:string; author:string; coverSrc:string; backHref:string; sections:Section[];
}) {
  const pages = sections.map((section,index)=>({chapter:`${index+1}. BÖLÜM`,title:section.title,paragraphs:[...section.paragraphs]}));
  const [page,setPage]=useState(0);
  const [theme,setTheme]=useState<ReaderTheme>("cream");
  const [fontSize,setFontSize]=useState(22);
  const [panel,setPanel]=useState<Panel>(null);
  const [bookmarked,setBookmarked]=useState<number[]>([]);
  const [notes,setNotes]=useState<Record<number,string>>({});
  const [draft,setDraft]=useState("");
  const key=`reader-${slug}`;

  useEffect(()=>{
    const savedPage=Number(localStorage.getItem(key+"-page")||"0");
    const savedTheme=(localStorage.getItem(key+"-theme")||"cream") as ReaderTheme;
    const savedFont=Number(localStorage.getItem(key+"-font")||"22");
    const savedBookmarks=JSON.parse(localStorage.getItem(key+"-bookmarks")||"[]");
    const savedNotes=JSON.parse(localStorage.getItem(key+"-notes")||"{}");
    if(savedPage>=0&&savedPage<pages.length)setPage(savedPage);
    if(["light","cream","dark"].includes(savedTheme))setTheme(savedTheme);
    if(savedFont>=17&&savedFont<=30)setFontSize(savedFont);
    setBookmarked(savedBookmarks); setNotes(savedNotes);
  },[key,pages.length]);

  useEffect(()=>{localStorage.setItem(key+"-page",String(page));setDraft(notes[page]||"");},[page,notes,key]);
  useEffect(()=>{localStorage.setItem(key+"-theme",theme)},[theme,key]);
  useEffect(()=>{localStorage.setItem(key+"-font",String(fontSize))},[fontSize,key]);
  useEffect(()=>{
    const onKey=(e:KeyboardEvent)=>{
      if(e.key==="ArrowLeft")setPage(v=>Math.max(0,v-1));
      if(e.key==="ArrowRight")setPage(v=>Math.min(pages.length-1,v+1));
      if(e.key==="Escape")setPanel(null);
    };
    window.addEventListener("keydown",onKey); return()=>window.removeEventListener("keydown",onKey);
  },[pages.length]);

  if(!pages.length)return null;
  const current=pages[page];
  const progress=Math.round(((page+1)/pages.length)*100);
  const isBookmarked=bookmarked.includes(page);
  const go=(next:number)=>{setPage(Math.max(0,Math.min(pages.length-1,next)));setPanel(null)};
  const toggleBookmark=()=>{
    const next=isBookmarked?bookmarked.filter(v=>v!==page):[...bookmarked,page];
    setBookmarked(next);localStorage.setItem(key+"-bookmarks",JSON.stringify(next));
  };
  const saveNote=()=>{
    const next={...notes,[page]:draft.trim()}; if(!draft.trim())delete next[page];
    setNotes(next);localStorage.setItem(key+"-notes",JSON.stringify(next));
  };
  return <main className={styles.reader} data-theme={theme} style={{"--reader-font-size":fontSize+"px"} as CSSProperties}>
    <aside className={styles.sidebar}>
      <a href="/" className={styles.brand} aria-label="22 Yayınevi ana sayfa"><Image src="/22_yayinevi_logo_1.png" alt="22 Yayınevi" width={360} height={236} priority /></a>
      <div className={styles.cover}><Image src={coverSrc} alt={title+" kitap kapağı"} width={320} height={440} priority /></div>
      <h2>{title}</h2><p>{author}</p>
      <nav className={styles.sideNav}>
        <button onClick={()=>setPanel(panel==="toc"?null:"toc")}><span>☰</span> İçindekiler</button>
        <button onClick={()=>setPanel(panel==="notes"?null:"notes")}><span>▤</span> Notlarım</button>
        <button onClick={toggleBookmark}><span>{isBookmarked?"★":"☆"}</span> Yer İşareti</button>
        <button onClick={()=>setPanel(panel==="appearance"?null:"appearance")}><span>◐</span> Görünüm</button>
      </nav>
      <a className={styles.backToBook} href={backHref}>← Kitaba dön</a>
    </aside>

    <section className={styles.stage}>
      <header className={styles.topbar}>
        <div className={styles.mobileBrand}><Image src="/22_yayinevi_logo_1.png" alt="22 Yayınevi" width={240} height={158} priority /></div>
        <div className={styles.chapterMini}><a href={backHref}>←</a><span>{current.title}</span></div>
        <div className={styles.tools}>
          <button onClick={()=>setPanel(panel==="appearance"?null:"appearance")}>Aa</button>
          <button onClick={()=>setTheme(theme==="dark"?"cream":"dark")}>☼</button>
          <button onClick={toggleBookmark} className={isBookmarked?styles.active:""}>{isBookmarked?"★":"☆"}</button>
          <button onClick={()=>setPanel(panel==="toc"?null:"toc")}>☰</button>
        </div>
      </header>
      <article className={styles.readingArea}>
        <div className={styles.textWrap}>
          <p className={styles.chapter}>{current.chapter}</p><h1>{current.title}</h1><div className={styles.rule}/>
          <div className={styles.prose}>{current.paragraphs.map((p,i)=><p key={i}>{p}</p>)}</div>
        </div>
        <button className={styles.prev} onClick={()=>go(page-1)} disabled={page===0}>‹</button>
        <button className={styles.next} onClick={()=>go(page+1)} disabled={page===pages.length-1}>›</button>
        <footer className={styles.progressArea}>
          <input type="range" min="0" max={pages.length-1} value={page} onChange={e=>go(Number(e.target.value))}/>
          <div className={styles.progressMeta}><span>{page+1} / {pages.length}</span><span>% {progress}</span></div>
        </footer>
      </article>
      <nav className={styles.mobileNav}>
        <button onClick={()=>setPanel(panel==="toc"?null:"toc")}><span>☰</span>İçindekiler</button>
        <button onClick={()=>setPanel(panel==="appearance"?null:"appearance")}><span>☼</span>Görünüm</button>
        <button onClick={()=>setPanel(panel==="notes"?null:"notes")}><span>▤</span>Notlarım</button>
      </nav>
    </section>

    {panel&&<><button className={styles.backdrop} onClick={()=>setPanel(null)}/><aside className={styles.panel}>
      <div className={styles.panelHead}><h3>{panel==="toc"?"İçindekiler":panel==="appearance"?"Görünüm":"Notlarım"}</h3><button onClick={()=>setPanel(null)}>×</button></div>
      {panel==="toc"&&<div className={styles.toc}>{pages.map((item,i)=><button key={i} className={page===i?styles.currentToc:""} onClick={()=>go(i)}><span>{item.title}</span><b>{i+1}</b></button>)}</div>}
      {panel==="appearance"&&<div className={styles.appearance}>
        <label>Tema</label><div className={styles.themeRow}>
          <button className={theme==="light"?styles.selected:""} onClick={()=>setTheme("light")}><i className={styles.lightSwatch}/>Açık</button>
          <button className={theme==="cream"?styles.selected:""} onClick={()=>setTheme("cream")}><i className={styles.creamSwatch}/>Krem</button>
          <button className={theme==="dark"?styles.selected:""} onClick={()=>setTheme("dark")}><i className={styles.darkSwatch}/>Koyu</button>
        </div><label>Yazı Boyutu</label><div className={styles.fontRow}><span>A</span><input type="range" min="17" max="30" value={fontSize} onChange={e=>setFontSize(Number(e.target.value))}/><span>A</span></div>
      </div>}
      {panel==="notes"&&<div className={styles.notes}><p>{page+1}. bölüm için not</p><textarea value={draft} onChange={e=>setDraft(e.target.value)} placeholder="Bu bölümle ilgili notunuzu yazın…"/><button className={styles.saveNote} onClick={saveNote}>Notu Kaydet</button></div>}
    </aside></>}
  </main>
}
