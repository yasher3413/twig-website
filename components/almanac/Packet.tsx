import styles from "./packet.module.css";

// A demo framed as a seed packet: a printed band, a tear line, the contents.
export function Packet({ band, children }: { band: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className={styles.packet}>
      <p className={`${styles.band} tnum`}>{band}</p>
      <div className={styles.contents}>{children}</div>
    </div>
  );
}
