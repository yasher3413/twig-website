import styles from "./lifescale.module.css";

// A tab's life, printed as an almanac scale. Every mark is a real default:
// asleep after 10 minutes, a sweep suggested after 3 weeks untouched.
const MARKS = [
  { at: "0", label: "You open a tab", sub: "awake" },
  { at: "10 min", label: "You look away", sub: "it falls asleep" },
  { at: "Any time", label: "You click it", sub: "it wakes where you left it" },
  { at: "3 weeks", label: "Still untouched", sub: "twig suggests a sweep" },
  { at: "After", label: "You close it", sub: "Recall still finds it" },
];

export function LifeScale() {
  return (
    <figure className={styles.scale} aria-label="The life of a tab in twig">
      <ol className={styles.marks}>
        {MARKS.map((m) => (
          <li key={m.label} className={styles.mark}>
            <span className={`${styles.at} tnum`}>{m.at}</span>
            <span className={styles.label}>{m.label}</span>
            <span className={styles.sub}>{m.sub}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
