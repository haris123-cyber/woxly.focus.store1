"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { catalog } from "@/data/catalog";
import { SiteShell, PageHero } from "@/components/site-shell";
import { ProductCard } from "@/components/product-card";

export function SearchClient() {
  const [query, setQuery] = useState("lamp");
  const results = catalog.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
  
  return (
    <SiteShell>
      <PageHero eyebrow="Find what you need" title="Search Woxly" />
      
      <section className="max-w-3xl mx-auto px-6 w-full mb-12 mt-4">
        <div className="relative flex items-center w-full">
          <Search className="w-6 h-6 text-muted absolute left-5 pointer-events-none" />
          <input 
            aria-label="Search products" 
            value={query} 
            onChange={e => setQuery(e.target.value)} 
            placeholder="Search products, guides and stories" 
            className="w-full pl-14 pr-32 py-5 bg-white border border-line rounded-full text-lg focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-all shadow-sm text-ink placeholder:text-muted"
          />
          <button className="absolute right-2 px-6 py-3 bg-ink text-paper font-medium rounded-full hover:bg-forest transition-colors">
            Search
          </button>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 w-full mb-12 text-center md:text-left border-b border-line/60 pb-6">
        <p className="text-lg font-serif text-ink">{results.length} results for “{query || "all products"}”</p>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12 mb-24 min-h-[300px]">
        {results.map(item => <ProductCard key={item.slug} product={item} />)}
        {results.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center text-center py-24 bg-white/50 rounded-2xl border border-line border-dashed">
            <Search className="w-12 h-12 text-muted mb-4" />
            <h2 className="text-2xl font-bold font-serif text-ink mb-2">No results yet</h2>
            <p className="text-muted mb-6">Try a broader search or explore the complete collection.</p>
            <Link href="/shop" className="text-ink font-semibold border-b border-ink pb-0.5 hover:text-muted hover:border-muted transition-colors">
              Browse all products
            </Link>
          </div>
        )}
      </section>
    </SiteShell>
  );
}
