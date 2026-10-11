import { TwigIcon } from "./TwigIcon";

// The address bar: back, forward, reload, and the omnibox, which is the one
// element allowed to dominate it. `typed` + `fill` renders inline autofill
// the way the app shows it: the completion selected after the caret.
export function Toolbar({
  host,
  path = "",
  typed,
  fill,
  focused = false,
  noStrip = false,
  trailing,
  space = "Space 1",
}: {
  host: string;
  path?: string;
  typed?: string;
  fill?: string;
  focused?: boolean;
  noStrip?: boolean;
  trailing?: React.ReactNode;
  space?: string;
}) {
  return (
    <div className={noStrip ? "address-bar no-strip" : "address-bar"}>
      <span className="wordmark" aria-hidden="true">
        twig
      </span>
      <div className="nav-group" aria-hidden="true">
        <span className="nav-button">
          <TwigIcon name="back" />
        </span>
        <span className="nav-button">
          <TwigIcon name="forward" />
        </span>
        <span className="nav-button">
          <TwigIcon name="reload" />
        </span>
      </div>
      <div className={focused ? "omnibox focused" : "omnibox"}>
        <span className="omnibox-lead" aria-hidden="true">
          <TwigIcon name={focused ? "search" : "lock"} size={13} />
        </span>
        <span className="omnibox-text">
          {typed !== undefined ? (
            <>
              <span className="omnibox-host">{typed}</span>
              {fill ? <span className="omnibox-fill">{fill}</span> : <span className="omnibox-caret" aria-hidden="true" />}
            </>
          ) : (
            <>
              <span className="omnibox-path">https://</span>
              <span className="omnibox-host">{host}</span>
              {path && <span className="omnibox-path">{path}</span>}
            </>
          )}
        </span>
        {trailing}
        <span className="omnibox-star" aria-hidden="true">
          <TwigIcon name="star" size={14} />
        </span>
      </div>
      <span className="space-switch" aria-hidden="true">
        {space}
        <TwigIcon name="chevron-down" size={12} />
      </span>
      <div className="toolbar-tools" aria-hidden="true">
        <span className="nav-button">
          <TwigIcon name="recall" />
        </span>
        <span className="nav-button">
          <TwigIcon name="history" />
        </span>
        <span className="nav-button">
          <TwigIcon name="settings" />
        </span>
        <span className="nav-button">
          <TwigIcon name="package" />
        </span>
      </div>
    </div>
  );
}
