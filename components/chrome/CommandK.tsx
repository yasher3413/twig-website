"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { isPaletteHotkey } from "@/lib/hotkey";

// Tiny, always-loaded listener; the palette itself loads on first open.
const PaletteDialog = dynamic(() => import("./PaletteDialog").then((m) => m.PaletteDialog), { ssr: false });

export function CommandK() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // In the keyboard demo's practice area, ⌘K lights a key instead.
      if ((e.target as Element | null)?.closest?.("[data-keyboard-practice]")) return;
      if (isPaletteHotkey(e)) {
        e.preventDefault();
        setLoaded(true);
        setOpen((o) => !o);
      }
    };
    const onOpen = () => {
      setLoaded(true);
      setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("twig:open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("twig:open-palette", onOpen);
    };
  }, []);

  return loaded ? <PaletteDialog open={open} onOpenChange={setOpen} /> : null;
}
