// The site's one leaf: the app icon's leaf, normalised to a 24px box.
// awake = vivid tab, asleep = pale and curled (spec §3.5).
export const LEAF_PATH = "M3 21 C 3.5 14, 8 6.5, 21 3 C 19.5 13.5, 12 19.5, 3 21 Z";
export const LEAF_CURLED = "M3 21 C 4.5 15.5, 8.5 10, 16 7.5 C 13.5 13.5, 9.5 18.5, 3 21 Z";
export const LEAF_VEIN = "M3 21 C 8 15, 12.5 10.5, 18 5.5";

export function Leaf({ state = "awake", size = 24, className }: { state?: "awake" | "asleep"; size?: number; className?: string }) {
  const asleep = state === "asleep";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d={asleep ? LEAF_CURLED : LEAF_PATH} fill={asleep ? "var(--leaf-asleep, #a9ad9c)" : "var(--leaf, #6f9a55)"} />
      {!asleep && <path d={LEAF_VEIN} fill="none" stroke="var(--twig-stem, #3f5b30)" strokeWidth="0.9" strokeLinecap="round" opacity="0.55" />}
    </svg>
  );
}
