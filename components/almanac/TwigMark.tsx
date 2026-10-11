// The app icon's twig (design/app-icon.svg), without its tile: one stem, a
// side shoot, three leaves and the bud. Flat fills so it sits on any ground.
export function TwigMark({ size = 28, className, label }: { size?: number; className?: string; label?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="200 180 640 620"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <g fill="none" stroke="var(--twig-stem, #3f5b30)" strokeLinecap="round" strokeLinejoin="round">
        <path d="M262 760 C 380 700, 470 600, 560 470 S 700 290, 770 250" strokeWidth="38" />
        <path d="M520 525 C 470 470, 450 410, 455 350" strokeWidth="28" />
      </g>
      <g fill="var(--twig-leaf, #6f9a55)">
        <path d="M455 352 C 395 330, 360 270, 372 205 C 438 222, 478 283, 455 352 Z" fill="var(--twig-leaf-light, #8fbb6e)" />
        <path d="M410 660 C 350 690, 275 680, 232 628 C 290 590, 370 605, 410 660 Z" />
        <path d="M606 418 C 660 470, 740 480, 800 445 C 755 385, 665 375, 606 418 Z" />
      </g>
      <circle cx="776" cy="246" r="34" fill="var(--twig-leaf-light, #8fbb6e)" />
    </svg>
  );
}
