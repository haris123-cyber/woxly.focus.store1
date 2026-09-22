import { ChevronDown } from "lucide-react";
import { faqs } from "@/data/store";
import { PageHero, SiteShell } from "@/components/site-shell";

export const metadata = { title: "FAQ | Woxly" };

export default function FAQPage() {
  return (
    <SiteShell>
      <PageHero 
        eyebrow="Help centre" 
        title="Questions, answered." 
        copy="Everything you need to know about products, delivery, returns and care." 
      />
      <section className="max-w-5xl mx-auto px-6 pb-24 flex flex-col md:flex-row gap-12 md:gap-20 font-sans w-full items-start">
        <aside className="w-full md:w-64 shrink-0 relative md:sticky md:top-32">
          <nav className="flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-muted mb-2 block">Categories</span>
            <a href="#products" className="text-ink font-medium hover:text-muted transition-colors">Products</a>
            <a href="#orders" className="text-ink font-medium hover:text-muted transition-colors">Orders & delivery</a>
          </nav>
        </aside>

        <div className="flex-1 w-full max-w-2xl">
          <div className="mb-12">
            <h2 id="products" className="text-2xl font-bold font-serif text-ink mb-6 scroll-mt-32">Products</h2>
            <div className="flex flex-col gap-4">
              {faqs.slice(0, 3).map((f) => (
                <details key={f.question} className="group bg-white border border-line rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden shadow-sm">
                  <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none font-medium text-ink select-none hover:bg-zinc-50 transition-colors">
                    <span className="pr-4">{f.question}</span>
                    <ChevronDown className="w-5 h-5 text-muted shrink-0 transition-transform duration-300 group-open:-rotate-180" />
                  </summary>
                  <div className="px-6 pb-6 text-muted leading-relaxed border-t border-line/50 mt-2 pt-4">
                    <p>{f.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>

          <div>
            <h2 id="orders" className="text-2xl font-bold font-serif text-ink mb-6 scroll-mt-32">Orders & delivery</h2>
            <div className="flex flex-col gap-4">
              {faqs.slice(3).map((f) => (
                <details key={f.question} className="group bg-white border border-line rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden shadow-sm">
                  <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none font-medium text-ink select-none hover:bg-zinc-50 transition-colors">
                    <span className="pr-4">{f.question}</span>
                    <ChevronDown className="w-5 h-5 text-muted shrink-0 transition-transform duration-300 group-open:-rotate-180" />
                  </summary>
                  <div className="px-6 pb-6 text-muted leading-relaxed border-t border-line/50 mt-2 pt-4">
                    <p>{f.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
