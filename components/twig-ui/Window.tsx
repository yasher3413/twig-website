import "./twig-ui.css";

// A twig window: macOS frame with the overlay title bar, so the traffic
// lights sit inside the tab strip exactly as in the app.
export function Window({
  children,
  className = "",
  style,
  label = "A twig window (live demo)",
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  label?: string;
}) {
  return (
    <div className={`twig twig-window ${className}`} style={style} role="group" aria-label={label}>
      <div className="traffic" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      {children}
    </div>
  );
}

export function Viewport({ children, className = "", style }: { children?: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`twig-viewport ${className}`} style={style}>
      {children}
    </div>
  );
}
