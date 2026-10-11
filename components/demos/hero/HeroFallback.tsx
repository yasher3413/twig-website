import { Window, Viewport, TabStrip, Toolbar } from "@/components/twig-ui";
import { DEMO_TABS } from "@/content/demo-data/tabs";
import styles from "./hero.module.css";

// The first frame, server-rendered, so the window is there before any script.
export function HeroFallback() {
  const tabs = DEMO_TABS.slice(0, 4).map((t) => ({ ...t, state: "awake" as const }));
  const page = DEMO_TABS[3];
  return (
    <div className={styles.stage}>
      <Window className={styles.window} label="A twig window">
        <TabStrip tabs={tabs} activeId={page.id} />
        <Toolbar host={page.host} path={page.path} />
        <Viewport className={styles.viewport}>
          <article className={styles.page}>
            <p className={styles.pageKicker}>{page.page.kicker}</p>
            <p className={styles.pageTitle}>{page.page.title}</p>
            <p className={styles.pageLede}>{page.page.lede}</p>
          </article>
        </Viewport>
      </Window>
      <div className={styles.rulerPlaceholder} />
    </div>
  );
}
