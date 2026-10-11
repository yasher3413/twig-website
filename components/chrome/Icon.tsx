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
  book: <><path d="M10 5.5c-1.6-1.2-3.6-1.6-6-1.5v10.5c2.4-.1 4.4.3 6 1.5 1.6-1.2 3.6-1.6 6-1.5V4c-2.4-.1-4.4.3-6 1.5Z" /><path d="M10 5.5V16" /></>,
  leaf: <><path d="M4.5 15.5C5 9.5 9 5 15.5 4.5 15 11 10.5 15 4.5 15.5Z" /><path d="M4.5 15.5 11 9" /></>,
  page: <><path d="M5.5 3.5h6l3 3v10h-9Z" /><path d="M11.5 3.5v3h3" /></>,
  command: <path d="M7 7V5.5A1.5 1.5 0 1 0 5.5 7H7Zm0 0h6m-6 0v6m6-6V5.5A1.5 1.5 0 1 1 14.5 7H13Zm0 0v6m0 0h1.5a1.5 1.5 0 1 1-1.5 1.5V13Zm0 0H7m0 0v1.5A1.5 1.5 0 1 1 5.5 13H7Z" />,
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
