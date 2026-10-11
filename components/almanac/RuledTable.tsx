import styles from "./almanac.module.css";

// Almanac-style ruled rows with tabular figures. Real <table> semantics.
export function RuledTable({
  caption,
  head,
  rows,
  className = "",
}: {
  caption?: string;
  head?: React.ReactNode[];
  rows: React.ReactNode[][];
  className?: string;
}) {
  return (
    <table className={`${styles.table} tnum ${className}`}>
      {caption && <caption className={styles.caption}>{caption}</caption>}
      {head && (
        <thead>
          <tr>
            {head.map((h, i) => (
              <th key={i} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {r.map((c, j) =>
              j === 0 ? (
                <th key={j} scope="row">
                  {c}
                </th>
              ) : (
                <td key={j}>{c}</td>
              ),
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
