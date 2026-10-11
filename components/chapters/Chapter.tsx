import Link from "next/link";
import { EntryHead } from "@/components/almanac/EntryHead";
import { Icon } from "@/components/chrome/Icon";
import styles from "./chapter.module.css";

export type Field = "paper" | "strip" | "moss" | "ocean" | "clay" | "honey" | "plum" | "slate" | "forest";

const FIELD_VARS: Record<Field, React.CSSProperties> = {
  paper: { "--chapter-bg": "var(--paper)", "--on": "var(--ink)", "--on-muted": "var(--muted)", "--mark": "var(--moss)" } as React.CSSProperties,
  strip: { "--chapter-bg": "var(--strip)", "--on": "var(--ink)", "--on-muted": "var(--muted)", "--mark": "var(--moss)" } as React.CSSProperties,
  forest: { "--chapter-bg": "var(--forest)", "--on": "var(--forest-ink)", "--on-muted": "var(--forest-muted)", "--mark": "#a9cd8c" } as React.CSSProperties,
  moss: fieldVars("moss"),
  ocean: fieldVars("ocean"),
  clay: fieldVars("clay"),
  honey: fieldVars("honey"),
  plum: fieldVars("plum"),
  slate: fieldVars("slate"),
};

function fieldVars(f: string): React.CSSProperties {
  return {
    "--chapter-bg": `var(--f-${f})`,
    "--on": `var(--on-${f})`,
    "--on-muted": `color-mix(in srgb, var(--on-${f}) 80%, var(--f-${f}))`,
    "--mark": `var(--mark-${f})`,
  } as React.CSSProperties;
}

// One home chapter: an almanac row (when + headline), a short text column
// and a live demo, with a provenance link to where the claim is documented.
export function Chapter({
  id,
  field,
  when,
  title,
  node = "leaf",
  layout = "split",
  intro,
  demo,
  lead,
  source,
  children,
}: {
  id: string;
  field: Field;
  when: string;
  title: React.ReactNode;
  node?: "leaf" | "bud" | "fork";
  layout?: "split" | "wide" | "split-reverse";
  intro: React.ReactNode;
  demo?: React.ReactNode;
  /** An almanac device between the heading and the body. */
  lead?: React.ReactNode;
  source?: { href: string; label: string };
  children?: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`${styles.chapter} ${field !== "paper" && field !== "strip" ? styles.onField : ""}`}
      style={FIELD_VARS[field]}
      data-chapter={id}
      data-node={node}
      aria-labelledby={`${id}-title`}
    >
      <div className="wrap branch-room">
        <EntryHead when={when} id={`${id}-title`}>
          {title}
        </EntryHead>
        {lead}
        <div className={`${styles.body} ${styles[layout]}`}>
          <div className={styles.text}>
            {intro}
            {source && (
              <p className={styles.source}>
                <Link href={source.href}>
                  {source.label}
                  <Icon name="arrow" size={16} />
                </Link>
              </p>
            )}
          </div>
          {demo && <div className={styles.demo}>{demo}</div>}
        </div>
        {children}
      </div>
    </section>
  );
}
