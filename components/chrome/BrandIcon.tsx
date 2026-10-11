import { BRAND_PATHS, type BrandKey } from "./brand-icons";

export function BrandIcon({ name, size = 18 }: { name: BrandKey; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={BRAND_PATHS[name]} />
    </svg>
  );
}
