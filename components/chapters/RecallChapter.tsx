import { Chapter } from "./Chapter";
import { LazyRecall } from "@/components/demos/lazy";

export function RecallChapter() {
  return (
    <Chapter
      id="recall"
      field="ocean"
      when="Whenever you remember a phrase"
      title="Find a page by the words inside it."
      layout="wide"
      intro={
        <>
          <p>
            twig keeps a dated, plain-text reading copy of the pages you actually read, and indexes it on your Mac. Search for a phrase you half
            remember, narrow it by space and date, and read the saved copy even if the site has changed or gone.
          </p>
          <p className="muted">Up to 2,000 copies of 40,000 characters each. Private windows, forms and anything you type are never captured. Try it:</p>
        </>
      }
      demo={<LazyRecall />}
      source={{ href: "/docs/recall", label: "What Recall keeps, and for how long" }}
    />
  );
}
