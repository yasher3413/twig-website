// One authored icon set: 1.5px strokes on a 20px grid, round caps, so every
// glyph on the site shares a hand.
const PATHS = {
  search: <><circle cx="8.75" cy="8.75" r="5.25" /><path d="m12.75 12.75 4 4" /></>,
  menu: <><path d="M3.5 6.5h13" /><path d="M3.5 13.5h13" /></>,
  close: <><path d="m5 5 10 10" /><path d="M15 5 5 15" /></>,
  arrow: <><path d="M4 10h11.5" /><path d="m11 5.5 4.5 4.5-4.5 4.5" /></>,
  external: <><path d="M8 4.5H4.5v11h11V12" /><path d="M11 4.5h4.5V9" /><path d="m9 11 6.5-6.5" /></>,
  copy: <><rect x="7" y="7" width="9" height="9" rx="2" /><path d="M13 4.5H5.5a1 1 0 0 0-1 1V13" /></>,
  check: <path d="m4.5 10.5 3.5 3.5 7.5-8" />,
  down: <><path d="M10 3.5v11" /><path d="m5.5 10 4.5 4.5 4.5-4.5" /></>,
  moon: <path d="M15.5 12.5A6.5 6.5 0 0 1 7.5 4.5a6.5 6.5 0 1 0 8 8Z" />,
  chevron: <path d="m7.5 5 5 5-5 5" />,
} as const;

export type IconName = keyof typeof PATHS;

export function Icon({ name, size = 20, className, title }: { name: IconName; size?: number; className?: string; title?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title && <title>{title}</title>}
      {PATHS[name]}
    </svg>
  );
}
