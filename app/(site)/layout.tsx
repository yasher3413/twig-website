import { Header } from "@/components/chrome/Header";
import { Footer } from "@/components/chrome/Footer";
import { getLatest } from "@/lib/github";
import { CommandK } from "@/components/chrome/CommandK";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const latest = await getLatest();
  return (
    <>
      <Header version={latest.version} />
      <div id="main" tabIndex={-1}>
        {children}
      </div>
      <Footer version={latest.version} date={latest.date} />
      <CommandK />
    </>
  );
}
