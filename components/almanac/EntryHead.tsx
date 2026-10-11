import styles from "./almanac.module.css";

// Literal class names so Tailwind can see them.
const SIZE = { xl: "display-xl", lg: "display-lg", md: "display-md" } as const;

// An almanac row: the "when" sits in its own date column, baseline-aligned
// with the heading on a shared rule. Not an eyebrow (spec §3.4, ruling T4).
export function EntryHead({
  when,
  children,
  as: Tag = "h2",
  id,
  size = "lg",
}: {
  when: string;
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  id?: string;
  size?: "xl" | "lg" | "md";
}) {
  return (
    <div className={styles.entry}>
      <p className={`${styles.when} tnum`} data-node-anchor>
        {when}
      </p>
      <Tag id={id} className={`${styles.entryTitle} ${SIZE[size]}`}>
        {children}
      </Tag>
    </div>
  );
}
