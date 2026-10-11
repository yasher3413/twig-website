import type { Metadata } from "next";
import { LegalPage } from "@/components/page/LegalPage";
import { REPO_URL } from "@/lib/links";

export const metadata: Metadata = { title: "Licence", description: "twig is released under the MIT licence.", alternates: { canonical: "/legal/license" } };

export default function LicensePage() {
  return (
    <LegalPage title="Licence" when="MIT" draft={false}>
      <p>
        twig is released under the MIT licence. This is the licence text from <a href={`${REPO_URL}/blob/main/LICENSE`}>the repository</a>:
      </p>
      <pre style={{ whiteSpace: "pre-wrap", fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace", fontSize: 14, lineHeight: 1.6, padding: 20, borderRadius: 12, background: "var(--strip)" }}>
        {`MIT License

Copyright (c) 2026 yasher3413

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`}
      </pre>
    </LegalPage>
  );
}
