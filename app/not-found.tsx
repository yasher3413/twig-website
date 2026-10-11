import Link from "next/link";
import { Header } from "@/components/chrome/Header";
import { Footer } from "@/components/chrome/Footer";
import { CommandK } from "@/components/chrome/CommandK";
import { PaletteTrigger } from "@/components/chrome/PaletteTrigger";
import { getLatest } from "@/lib/github";
import styles from "./not-found.module.css";

export default async function NotFound() {
  const latest = await getLatest();
  return (
    <>
      <Header version={latest.version} />
      <main className={styles.main} id="main">
        <svg className={styles.leaf} width="120" height="120" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 21 C 4.5 15.5, 8.5 10, 16 7.5 C 13.5 13.5, 9.5 18.5, 3 21 Z" />
          <path d="M3 21 C 7 16, 10.5 12, 14.5 8.6" className={styles.vein} />
        </svg>
        <div className="wrap">
          <p className={`${styles.code} tnum`}>404</p>
          <h1 className={`${styles.title} display-lg`}>This page fell off the branch.</h1>
          <p className={styles.lede}>It may have moved, or the address may be mistyped. Nothing else is lost.</p>
          <div className={styles.actions}>
            <Link href="/" className={styles.home}>
              Back to the home page
            </Link>
            <PaletteTrigger />
          </div>
        </div>
      </main>
      <Footer version={latest.version} date={latest.date} />
      <CommandK />
    </>
  );
}
