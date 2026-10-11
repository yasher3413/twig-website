// The app's letter-tile site mark (its favicon fallback). Demos use it for
// every site so the page never loads a third-party favicon service.
export function SiteMark({ host, size = 14, mark }: { host: string; size?: number; mark?: { bg: string; fg: string } }) {
  const letter = host.replace(/^www\./, "").charAt(0).toUpperCase();
  return (
    <span
      className="site-mark site-mark-letter"
      style={{ width: size, height: size, ...(mark ? ({ "--mark-bg": mark.bg, "--mark-fg": mark.fg } as React.CSSProperties) : null) }}
      aria-hidden="true"
    >
      {letter}
    </span>
  );
}
