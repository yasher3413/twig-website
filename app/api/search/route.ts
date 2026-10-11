import { createFromSource } from "fumadocs-core/search/server";
import { source } from "@/lib/source";

// Local search over the docs, built from the same source: no external
// search service.
export const { GET } = createFromSource(source, { language: "english" });
