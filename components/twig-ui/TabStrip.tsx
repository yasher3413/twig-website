import { SiteMark } from "./SiteMark";
import { TwigIcon } from "./TwigIcon";
import type { TabModel } from "./types";

export function Tab({ tab, active, onSelect, describe }: { tab: TabModel; active: boolean; onSelect?: (id: string) => void; describe?: boolean }) {
  const asleep = tab.state === "asleep";
  const cls = ["tab", active && "active", asleep && "hibernated"].filter(Boolean).join(" ");
  const status = asleep ? "asleep" : tab.state === "busy" ? "busy, kept awake" : "awake";
  const content = (
    <>
      <span className="tab-icon">
        <SiteMark host={tab.host} mark={tab.mark} />
      </span>
      <span className="tab-dot" aria-hidden="true" />
      {tab.woke && <span className="tab-woke" aria-hidden="true" />}
      <span className="tab-title">{tab.title}</span>
      {active && (
        <span className="tab-actions" aria-hidden="true">
          <span className="tab-action">
            <TwigIcon name="split" size={13} />
          </span>
          <span className="tab-action">
            <TwigIcon name="moon" size={13} />
          </span>
          <span className="tab-action">
            <TwigIcon name="close" size={13} />
          </span>
        </span>
      )}
    </>
  );
  if (!onSelect) {
    return (
      <div className={cls} aria-label={describe ? `${tab.title}, ${status}` : undefined}>
        {content}
      </div>
    );
  }
  return (
    <button
      type="button"
      className={cls}
      onClick={() => onSelect(tab.id)}
      aria-pressed={active}
      aria-label={`${tab.title}, ${status}${active ? ", current tab" : ""}`}
    >
      {content}
    </button>
  );
}

export function TabStrip({
  tabs,
  activeId,
  onSelect,
  trailing,
  label = "Tabs",
}: {
  tabs: TabModel[];
  activeId?: string;
  onSelect?: (id: string) => void;
  trailing?: React.ReactNode;
  label?: string;
}) {
  return (
    <div className="tab-strip">
      <div className="tab-track" role={onSelect ? "group" : undefined} aria-label={onSelect ? label : undefined}>
        {tabs.map((t) => (
          <Tab key={t.id} tab={t} active={t.id === activeId} onSelect={onSelect} />
        ))}
        <div className="tab-tail" />
      </div>
      {trailing}
      <span className="tab-new" aria-hidden="true">
        <TwigIcon name="plus" size={15} />
      </span>
    </div>
  );
}
