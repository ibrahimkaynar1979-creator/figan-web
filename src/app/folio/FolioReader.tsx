"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./folio.module.css";

type PdfDoc = {
  numPages: number;
  getPage: (pageNumber: number) => Promise<any>;
};

const PDF_URL = "/books/icimdeki-ibrahim.pdf";

function clamp(n:number,min:number,max:number){ return Math.max(min,Math.min(max,n)); }

export default function FolioReader(){
  const [pdf,setPdf]=useState<PdfDoc|null>(null);
  const [page,setPage]=useState(1);
  const [mobile,setMobile]=useState(false);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");
  const [anim,setAnim]=useState<"next"|"prev"|null>(null);
  const leftRef=useRef<HTMLCanvasElement>(null);
  const rightRef=useRef<HTMLCanvasElement>(null);
  const flipFrontRef=useRef<HTMLCanvasElement>(null);
  const flipBackRef=useRef<HTMLCanvasElement>(null);
  const touchStart=useRef<number|null>(null);

  useEffect(()=>{
    const media=window.matchMedia("(max-width: 720px)");
    const sync=()=>setMobile(media.matches);
    sync(); media.addEventListener("change",sync);
    return ()=>media.removeEventListener("change",sync);
  },[]);

  useEffect(()=>{
    let alive=true;
    (async()=>{
      try{
        const pdfjs=await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/build/pdf.worker.min.mjs",
          import.meta.url
        ).toString();
        const doc=await pdfjs.getDocument(PDF_URL).promise as unknown as PdfDoc;
        if(!alive) return;
        setPdf(doc);
        const saved=Number(localStorage.getItem("folio:lastPage")||"1");
        setPage(clamp(saved,1,doc.numPages));
      }catch(e:any){
        setError("PDF yüklenemedi. public/books/icimdeki-ibrahim.pdf dosyasını kontrol et.");
      }finally{
        if(alive) setLoading(false);
      }
    })();
    return()=>{alive=false};
  },[]);

  const renderInto=useCallback(async(canvas:HTMLCanvasElement|null,pageNo:number)=>{
    if(!pdf||!canvas||pageNo<1||pageNo>pdf.numPages) return;
    const p=await pdf.getPage(pageNo);
    const base=p.getViewport({scale:1});
    const target=Math.min(window.devicePixelRatio||1,2);
    const cssHeight=mobile?Math.min(window.innerHeight*.72,760):Math.min(window.innerHeight*.70,720);
    const scale=(cssHeight/base.height)*target;
    const viewport=p.getViewport({scale});
    const ctx=canvas.getContext("2d");
    if(!ctx) return;
    canvas.width=Math.floor(viewport.width);
    canvas.height=Math.floor(viewport.height);
    await p.render({canvasContext:ctx,viewport}).promise;
  },[pdf,mobile]);

  const visible=useMemo(()=>{
    if(!pdf) return [1,1] as const;
    if(mobile) return [page,page] as const;
    const left=page%2===0?page:Math.max(1,page-1);
    return [left,Math.min(left+1,pdf.numPages)] as const;
  },[page,pdf,mobile]);

  useEffect(()=>{
    if(!pdf) return;
    renderInto(leftRef.current,visible[0]);
    renderInto(rightRef.current,visible[1]);
    localStorage.setItem("folio:lastPage",String(page));
  },[pdf,visible,page,renderInto]);

  const jump=useCallback((next:number)=>{
    if(!pdf) return;
    setPage(clamp(next,1,pdf.numPages));
  },[pdf]);

  const turn=useCallback(async(dir:"next"|"prev")=>{
    if(!pdf||anim) return;
    const step=mobile?1:2;
    const target=dir==="next"?page+step:page-step;
    if(target<1||target>pdf.numPages) return;
    const current=dir==="next"?visible[1]:visible[0];
    const incoming=dir==="next"?Math.min(current+step,pdf.numPages):Math.max(current-step,1);
    await Promise.all([
      renderInto(flipFrontRef.current,current),
      renderInto(flipBackRef.current,incoming),
    ]);
    setAnim(dir);
    window.setTimeout(()=>{ jump(target); setAnim(null); },610);
  },[pdf,anim,mobile,page,visible,renderInto,jump]);

  const fullscreen=()=>{
    if(!document.fullscreenElement) document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
  };

  if(loading) return <main className={styles.shell}><div className={styles.stage}><div className={styles.loading}>Folio hazırlanıyor…</div></div></main>;
  if(error||!pdf) return <main className={styles.shell}><div className={styles.stage}><div className={styles.error}>{error}</div></div></main>;

  return <main className={styles.shell}
    onTouchStart={(e)=>{touchStart.current=e.touches[0]?.clientX??null}}
    onTouchEnd={(e)=>{if(touchStart.current===null)return; const dx=(e.changedTouches[0]?.clientX??touchStart.current)-touchStart.current; if(Math.abs(dx)>45) turn(dx<0?"next":"prev"); touchStart.current=null;}}>
    <header className={styles.topbar}>
      <div className={styles.brand}><strong>FOLIO</strong><span>Digital Book Experience</span></div>
      <div className={styles.actions}>
        <button className={styles.iconBtn} onClick={()=>jump(1)} title="Başa dön">⌂</button>
        <button className={styles.iconBtn} onClick={fullscreen} title="Tam ekran">⛶</button>
      </div>
    </header>

    <section className={styles.stage}>
      <div className={styles.bookWrap}>
        <div className={styles.book}>
          <div className={`${styles.page} ${mobile?styles.mobileActive:""}`}><canvas ref={leftRef}/></div>
          <div className={`${styles.page} ${mobile?"":""}`}><canvas ref={rightRef}/></div>
          <div className={styles.spine}/>
          <div className={`${styles.flipRight} ${anim==="next"?styles.animateNext:""}`}>
            <div className={styles.flipFace}><canvas ref={flipFrontRef}/></div>
            <div className={`${styles.flipFace} ${styles.flipBack}`}><canvas ref={flipBackRef}/></div>
          </div>
          <div className={`${styles.flipLeft} ${anim==="prev"?styles.animatePrev:""}`}>
            <div className={styles.flipFace}><canvas ref={flipFrontRef}/></div>
            <div className={`${styles.flipFace} ${styles.flipBack}`}><canvas ref={flipBackRef}/></div>
          </div>
        </div>
        <div className={styles.nav}>
          <button onClick={()=>turn("prev")} disabled={page<=1}>‹</button>
          <button onClick={()=>turn("next")} disabled={page>=pdf.numPages}>›</button>
        </div>
      </div>
      <div className={styles.mobileHint}>Parmağınla sağa / sola kaydır</div>
    </section>

    <div className={styles.toolbar}>
      <div className={styles.counter}>{mobile?page:visible[0]} / {pdf.numPages}</div>
      <input className={styles.range} type="range" min={1} max={pdf.numPages} value={page} onChange={(e)=>jump(Number(e.target.value))}/>
      <div className={styles.toolbarBtns}>
        <button className={styles.textBtn} onClick={()=>turn("prev")}>Geri</button>
        <button className={styles.textBtn} onClick={()=>turn("next")}>İleri</button>
        <button className={styles.textBtn} onClick={fullscreen}>Tam ekran</button>
      </div>
    </div>
  </main>;
}
