import styles from "./almanac.module.css";

// An unprinted slot for a value the owner hasn't supplied yet (spec §3.7.4).
// Never a link, never hidden: it says plainly what is coming.
export function DesignedBlank({ label, className = "" }: { label: string; className?: string }) {
  return (
    <span className={`${styles.blank} ${className}`}>
      <span className={styles.blankMark} aria-hidden="true" />
      {label}
    </span>
  );
}
