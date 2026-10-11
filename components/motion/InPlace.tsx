import styles from "./motion.module.css";

// A fixed cell whose value changes in place: the old value fades out as the
// new one fades in, and the layout never moves (spec §3.7.1). Reserve width
// with `ch` so numbers never push their neighbours.
export function InPlace({ value, width, className = "" }: { value: React.ReactNode; width?: string; className?: string }) {
  return (
    <span className={`${styles.inPlace} tnum ${className}`} style={width ? { minWidth: width } : undefined}>
      <span key={String(value)} className={styles.inPlaceValue}>
        {value}
      </span>
    </span>
  );
}
