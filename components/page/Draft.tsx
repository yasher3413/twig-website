import styles from "./prose.module.css";

export function Draft({ children }: { children: React.ReactNode }) {
  return (
    <p className={styles.draft} role="note">
      <strong>Draft.</strong>
      <span>{children}</span>
    </p>
  );
}
