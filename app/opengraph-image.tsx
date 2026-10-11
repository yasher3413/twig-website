import { renderOg, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "twig: every other browser forgets. twig remembers.";

export default function Image() {
  return renderOg({ title: "Every other browser forgets. twig remembers." });
}
