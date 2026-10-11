export function formatBytes(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}\u00a0MB`;
  return `${Math.round(n / 1000)}\u00a0KB`;
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso));
}

export function versionAnchor(version: string): string {
  return `v${version.replace(/\./g, "-")}`;
}
