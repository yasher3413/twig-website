import localFont from "next/font/local";

// Young Serif is the app's own wordmark face (SIL OFL), copied from the twig
// repo. Public Sans carries the Franklin lineage with real tabular figures.
export const youngSerif = localFont({
  src: "../public/fonts/YoungSerif-Regular.woff2",
  variable: "--font-young-serif",
  weight: "400",
  display: "swap",
  preload: true,
});

export const publicSans = localFont({
  src: "../public/fonts/PublicSans-var.woff2",
  variable: "--font-public-sans",
  weight: "100 900",
  display: "swap",
  preload: true,
});
