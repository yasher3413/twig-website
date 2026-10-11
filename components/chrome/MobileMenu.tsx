"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Icon } from "./Icon";
import styles from "./chrome.module.css";

export function MobileMenu({ links }: { links: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <>
      <button type="button" className={styles.iconButton} aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
        <Icon name="menu" />
      </button>
      <dialog ref={dialog} className={styles.sheet} onClose={() => setOpen(false)} aria-label="Menu">
        <div className={styles.sheetHead}>
          <span className={styles.sheetTitle}>twig</span>
          <button type="button" className={styles.iconButton} aria-label="Close menu" onClick={() => setOpen(false)}>
            <Icon name="close" />
          </button>
        </div>
        <nav aria-label="Mobile">
          <ul className={styles.sheetList}>
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={styles.sheetLink}>
                  {l.label}
                  <Icon name="chevron" size={18} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </dialog>
    </>
  );
}
