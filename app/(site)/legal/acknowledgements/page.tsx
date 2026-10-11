import type { Metadata } from "next";
import { LegalPage } from "@/components/page/LegalPage";
import { RuledTable } from "@/components/almanac/RuledTable";

export const metadata: Metadata = { title: "Acknowledgements", description: "The open-source software and fonts twig and this website are built with.", alternates: { canonical: "/legal/acknowledgements" } };

const APP = [
  ["Tauri 2", "App shell and native webviews", "MIT / Apache-2.0"],
  ["tauri-plugin-sql", "SQLite access", "MIT / Apache-2.0"],
  ["tauri-plugin-opener", "Opening links and files", "MIT / Apache-2.0"],
  ["serde, serde_json", "Data serialisation (Rust)", "MIT / Apache-2.0"],
  ["url", "URL parsing (Rust)", "MIT / Apache-2.0"],
  ["base64", "Encoding (Rust)", "MIT / Apache-2.0"],
  ["React", "The browser chrome", "MIT"],
  ["Zustand", "State management", "MIT"],
  ["jsdiff (diff)", "Changes since you last read", "BSD-3-Clause"],
  ["SQLite (FTS5)", "History and the full-text index", "Public domain"],
  ["WebKit", "macOS's web engine", "LGPL / BSD (part of macOS)"],
  ["Young Serif", "The wordmark", "SIL Open Font License 1.1"],
];

const SITE = [
  ["Next.js", "The website", "MIT"],
  ["Tailwind CSS", "Styling", "MIT"],
  ["Motion", "Animation", "MIT"],
  ["Fumadocs", "Documentation", "MIT"],
  ["cmdk", "The command palette", "MIT"],
  ["marked", "Release notes", "MIT"],
  ["Public Sans", "Text face (from Libre Franklin)", "SIL Open Font License 1.1"],
  ["Young Serif", "Display face", "SIL Open Font License 1.1"],
  ["Simple Icons", "Brand marks in the footer", "CC0 1.0"],
  ["21st.dev components", "Starting points for the text reveal, magnetic button and key caps, rewritten for twig", "Per component"],
];

export default function AckPage() {
  return (
    <LegalPage title={"Acknowledge\u00adments"} when="With thanks" draft={false}>
      <p>twig and this website stand on a lot of other people&apos;s open-source work. Thank you.</p>
      <h2>The twig app</h2>
      <RuledTable head={["Project", "Used for", "Licence"]} rows={APP} />
      <h2>This website</h2>
      <RuledTable head={["Project", "Used for", "Licence"]} rows={SITE} />
    </LegalPage>
  );
}
