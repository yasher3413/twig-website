"use client";

import { useState } from "react";
import styles from "./brand.module.css";

export function CopyToken({ name, value }: { name: string; value: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className={styles.token}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setDone(true);
          setTimeout(() => setDone(false), 1600);
        } catch {}
      }}
      aria-label={`Copy ${name}, ${value}`}
    >
      <span className={styles.swatch} style={{ background: value }} />
      <span className={styles.tokenName}>{name}</span>
      <span className={`${styles.tokenValue} tnum`} aria-live="polite">
        {done ? "Copied" : value}
      </span>
    </button>
  );
}
