import "../globals.css";
import "./_styles/design-tokens.css";

export default function PanelLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="publishing-os" data-theme="light" data-tenant-theme="publisher">
      {children}
    </div>
  );
}
