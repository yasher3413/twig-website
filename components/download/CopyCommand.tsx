"use client";

import { useState } from "react";
import { Icon } from "@/components/chrome/Icon";
import styles from "./download.module.css";

export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState<"idle" | "ok" | "fail">("idle");
  return (
    <div className={styles.command}>
      <code className={styles.code}>{command}</code>
      <button
        type="button"
        className={styles.copy}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(command);
            setCopied("ok");
          } catch {
            setCopied("fail");
          }
          setTimeout(() => setCopied("idle"), 2200);
        }}
      >
        <Icon name={copied === "ok" ? "check" : "copy"} size={16} />
        <span aria-live="polite">{copied === "ok" ? "Copied" : copied === "fail" ? "Select and copy" : "Copy"}</span>
      </button>
    </div>
  );
}
