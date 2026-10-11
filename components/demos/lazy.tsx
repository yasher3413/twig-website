"use client";

import dynamic from "next/dynamic";
import { Near } from "./Near";

const SleepingDemo = dynamic(() => import("./sleeping/SleepingDemo").then((m) => m.SleepingDemo), { ssr: false });
const SixtyTabs = dynamic(() => import("./sleeping/SixtyTabs").then((m) => m.SixtyTabs), { ssr: false });
const RecallDemo = dynamic(() => import("./recall/RecallDemo").then((m) => m.RecallDemo), { ssr: false });
const ChangesDemo = dynamic(() => import("./changes/ChangesDemo").then((m) => m.ChangesDemo), { ssr: false });

export const LazySleeping = () => (
  <Near minHeight="clamp(460px, 40vw, 560px)" label="Sleeping tabs demo loading">
    <SleepingDemo />
  </Near>
);
export const LazySixty = () => (
  <Near minHeight="260px" label="Sixty tabs demo loading">
    <SixtyTabs />
  </Near>
);
export const LazyRecall = () => (
  <Near minHeight="clamp(560px, 46vw, 640px)" label="Recall demo loading">
    <RecallDemo />
  </Near>
);
export const LazyChanges = () => (
  <Near minHeight="clamp(500px, 44vw, 600px)" label="Changes demo loading">
    <ChangesDemo />
  </Near>
);
