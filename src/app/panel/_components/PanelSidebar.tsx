"use client";

import Image from "next/image";
import { ReactNode } from "react";
import styles from "./PanelSidebar.module.css";
import { BRAND_ASSETS } from "../../../lib/brandAssets";

type IconName = "projects"|"new"|"authors"|"audio"|"production"|"distribution"|"analytics"|"reader";

type Props = {
  active?: IconName;
  footer?: ReactNode;
};

function Icon({ name }: { name: IconName }) {
  const common = { width: 19, height: 19, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "projects") return <svg {...common}><rect x="3.5" y="4" width="17" height="16" rx="2.5"/><path d="M7.5 8.5h9M7.5 12h9M7.5 15.5h5.5"/></svg>;
  if (name === "new") return <svg {...common}><path d="M12 5v14M5 12h14"/><circle cx="12" cy="12" r="9"/></svg>;
  if (name === "authors") return <svg {...common}><circle cx="12" cy="8" r="3.5"/><path d="M5.5 20c.7-4 3-6 6.5-6s5.8 2 6.5 6"/></svg>;
  if (name === "audio") return <svg {...common}><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="13" width="4" height="7" rx="2"/><rect x="17" y="13" width="4" height="7" rx="2"/></svg>;
  if (name === "production") return <svg {...common}><path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3Z"/><path d="m18 13 .7 2.3L21 16l-2.3.7L18 19l-.7-2.3L15 16l2.3-.7L18 13Z"/><path d="m6 14 .7 2.3L9 17l-2.3.7L6 20l-.7-2.3L3 17l2.3-.7L6 14Z"/></svg>;
  if (name === "distribution") return <svg {...common}><circle cx="6" cy="12" r="2.2"/><circle cx="18" cy="6" r="2.2"/><circle cx="18" cy="18" r="2.2"/><path d="m8 11 7.8-4M8 13l7.8 4"/></svg>;
  if (name === "analytics") return <svg {...common}><path d="M4 19V9M10 19V5M16 19v-7M22 19V3"/></svg>;
  return <svg {...common}><path d="M4 5.5c3-1.2 5.7-.9 8 1v13c-2.3-1.9-5-2.2-8-1V5.5Z"/><path d="M20 5.5c-3-1.2-5.7-.9-8 1v13c2.3-1.9 5-2.2 8-1V5.5Z"/></svg>;
}

const Item = ({ href, icon, label, active, badge }: { href:string; icon:IconName; label:string; active?:boolean; badge?:string }) => (
  <a href={href} className={active ? styles.active : ""}>
    <span className={styles.icon}><Icon name={icon}/></span>
    <span>{label}</span>
    {badge ? <small>{badge}</small> : null}
  </a>
);

export default function PanelSidebar({ active="projects", footer }: Props) {
  return (
    <aside className={styles.sidebar}>
      <a href="/panel/reader" className={styles.brand}>
        <Image src={BRAND_ASSETS.publisherLogo} alt="22 Yayınevi" width={330} height={210} priority />
      </a>
      <div className={styles.readerMark}>
        <Image src={BRAND_ASSETS.readerLogo} alt="22 Reader" width={360} height={118} priority />
      </div>

      <nav aria-label="Publishing OS menüsü">
        <span className={styles.group}>YAYIN MERKEZİ</span>
        <Item href="/panel/reader" icon="projects" label="Yayın Projeleri" active={active==="projects"} />
        <Item href="/panel/reader/yeni" icon="new" label="Yeni Yayın Projesi" active={active==="new"} />
        <Item href="/panel/yazarlar" icon="authors" label="Yazarlar" active={active==="authors"} />
        <Item href="/panel/sesli-kitap" icon="audio" label="Sesli Kitaplar" active={active==="audio"} />

        <span className={styles.group}>ÜRETİM</span>
        <Item href="/panel/reader/yeni#uretim" icon="production" label="Üretim Merkezi" badge="Yakında" active={active==="production"} />
        <Item href="/panel/reader/yeni#dagitim" icon="distribution" label="Dijital Dağıtım" badge="Yakında" active={active==="distribution"} />
        <Item href="/panel/reader/yeni#analitik" icon="analytics" label="Analitik" badge="Yakında" active={active==="analytics"} />
      </nav>

      <div className={styles.footer}>
        {footer ?? <>
          <div><i className={styles.online}/> <span>Sistem çevrimiçi</span></div>
          <small>22 Publishing OS</small>
        </>}
      </div>
    </aside>
  );
}
