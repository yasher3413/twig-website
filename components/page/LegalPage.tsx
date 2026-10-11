import { PageIntro } from "./PageIntro";
import { Draft } from "./Draft";
import prose from "./prose.module.css";

export function LegalPage({ title, when, children, draft = true }: { title: string; when: string; children: React.ReactNode; draft?: boolean }) {
  return (
    <main>
      <PageIntro when={when} title={title} />
      <div className="wrap" style={{ paddingBottom: "clamp(72px, 9vw, 128px)" }}>
        <div className="legal-body">
          {draft && <Draft>This page is pending the owner&apos;s review. It describes how twig works today, but it isn&apos;t legal advice.</Draft>}
          <div className={prose.prose}>{children}</div>
        </div>
      </div>
    </main>
  );
}
