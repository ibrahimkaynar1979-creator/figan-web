import "../globals.css";
import "./_styles/design-tokens.css";
import PanelThemeRoot from "./_components/PanelThemeRoot";

export default function PanelLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <PanelThemeRoot>{children}</PanelThemeRoot>;
}
