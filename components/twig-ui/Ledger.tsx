import { InPlace } from "@/components/motion/InPlace";

// Settings → Memory, the app's live readout. Values change in place.
export function Ledger({ inUse, awake, asleep, notSpent }: { inUse: string; awake: number; asleep: number; notSpent: string }) {
  return (
    <div className="ledger">
      <div className="ledger-cell">
        <span className="ledger-value">
          <InPlace value={inUse} />
        </span>
        <span className="ledger-label">in use</span>
      </div>
      <div className="ledger-cell">
        <span className="ledger-value">
          <InPlace value={awake} />
        </span>
        <span className="ledger-label">awake</span>
      </div>
      <div className="ledger-cell">
        <span className="ledger-value">
          <InPlace value={asleep} />
        </span>
        <span className="ledger-label">asleep</span>
      </div>
      <div className="ledger-cell accent">
        <span className="ledger-value">
          <InPlace value={`~${notSpent}`} />
        </span>
        <span className="ledger-label">not spent</span>
      </div>
    </div>
  );
}

export function Segmented<T extends string | number>({
  options,
  value,
  onChange,
  label,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div className="segmented" role="group" aria-label={label}>
      {options.map((o) => (
        <button key={String(o.value)} type="button" className="segment" aria-pressed={o.value === value} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}
