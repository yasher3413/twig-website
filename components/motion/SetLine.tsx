import { Fragment } from "react";
import styles from "./motion.module.css";

// A headline set word by word: each word rises out of its own clip, like type
// being set (technique adapted from 21st.dev's Vertical Cut Reveal by
// danielpetho). Pure CSS, so it runs before hydration and never delays the
// paint; screen readers get the sentence whole.
export function SetLine({ text, delay = 0, stagger = 55, className = "" }: { text: string; delay?: number; stagger?: number; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={`${styles.setLine} ${className}`}>
      <span className={styles.srOnly}>{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <Fragment key={i}>
            <span className={styles.word}>
              <span className={styles.wordInner} style={{ animationDelay: `${delay + i * stagger}ms` }}>
                {w}
              </span>
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </span>
  );
}
