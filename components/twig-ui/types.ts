export type TabState = "awake" | "asleep" | "busy";

export type TabModel = {
  id: string;
  title: string;
  /** Host shown in the omnibox and used for the site mark letter. */
  host: string;
  state: TabState;
  /** Shows the moss "back from snooze" dot. */
  woke?: boolean;
  /** Letter-tile colours for the site mark. */
  mark?: { bg: string; fg: string };
};
