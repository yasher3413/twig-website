import { EntryHead } from "@/components/almanac/EntryHead";
import styles from "./page.module.css";

// The top of every inside page: an almanac row and a short lede.
export function PageIntro({ when, title, children }: { when: string; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <header className={styles.intro}>
      <div className="wrap">
        <EntryHead when={when} as="h1" size="lg">
          {title}
        </EntryHead>
        {children && <div className={styles.lede}>{children}</div>}
      </div>
    </header>
  );
}

export function PageSection({ title, id, children, tone = "paper" }: { title?: string; id?: string; children: React.ReactNode; tone?: "paper" | "strip" }) {
  return (
    <section id={id} className={`${styles.section} ${tone === "strip" ? styles.strip : ""}`} aria-labelledby={title && id ? `${id}-h` : undefined}>
      <div className={`wrap ${styles.sectionGrid}`}>
        {title && (
          <h2 id={id ? `${id}-h` : undefined} className={`${styles.sectionTitle} display-sm`}>
            {title}
          </h2>
        )}
        <div className={styles.sectionBody}>{children}</div>
      </div>
    </section>
  );
}
