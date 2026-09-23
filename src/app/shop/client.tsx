"use client";

import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { catalog } from "@/data/catalog";
import { SiteShell, PageHero } from "@/components/site-shell";
import { ProductCard } from "@/components/product-card";

export function ShopClient() {
  const [sort, setSort] = useState("Featured");
  const [category, setCategory] = useState("All");
  const [sortOpen, setSortOpen] = useState(false);
  const sortOptions = ["Featured", "Price: low to high", "Newest"];

  const filteredCatalog = catalog.filter((item) => {
    if (category === "All") return true;
    return item.category === category;
  });

  const sortedCatalog = [...filteredCatalog].sort((a, b) => {
    if (sort === "Price: low to high") return a.price - b.price;
    if (sort === "Newest") return a.badge === "New" ? -1 : 1;
    return 0;
  });

  return (
    <SiteShell>
      <PageHero eyebrow="The collection" title="Fewer things. Better chosen." copy="Thoughtfully designed objects that make everyday focus feel calmer." />

      <section className="max-w-[1200px] mx-auto px-6 w-full py-4 md:py-6 border-b border-line/60 mb-8 md:mb-12">
        <div className="flex flex-wrap md:flex-nowrap items-center gap-y-4 md:gap-6 w-full">
          
          {/* 1. Count (Mobile: Bottom Left, Desktop: Far Left) */}
          <span className="order-2 md:order-1 text-muted text-sm font-medium mr-auto">
            {sortedCatalog.length} products
          </span>
          
          {/* 2. Categories (Mobile: Top Full Width, Desktop: Right aligned) */}
          <div className="order-1 md:order-2 w-full md:w-auto flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {["All", "Lighting", "Accessories"].map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors shrink-0 ${category === cat ? "bg-ink text-paper" : "hover:bg-line/30 text-ink border border-transparent hover:border-line/50"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Divider (Desktop Only) */}
          <div className="order-none md:order-3 h-6 w-px bg-line hidden md:block mx-2"></div>

          {/* 3. Sort (Mobile: Bottom Right, Desktop: Far Right) */}
          <div className="order-3 md:order-4 flex items-center justify-end gap-3 text-sm text-muted font-medium relative z-30">
            <span className="hidden sm:inline">Sort by</span>
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 appearance-none bg-white border border-line rounded-full pl-5 pr-3 py-2 text-ink focus:outline-none cursor-pointer hover:border-ink/50 transition-colors shadow-sm font-medium min-w-[140px] justify-between"
              >
                {sort}
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 text-muted ${sortOpen ? 'rotate-180' : ''}`} />
              </button>

              {sortOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setSortOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-line rounded-2xl shadow-xl overflow-hidden z-50 py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                    {sortOptions.map(option => (
                      <button
                        key={option}
                        onClick={() => { setSort(option); setSortOpen(false); }}
                        className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center justify-between ${sort === option ? 'bg-sage/20 text-forest font-semibold' : 'text-ink hover:bg-line/30 font-medium'}`}
                      >
                        {option}
                        {sort === option && <Check className="w-4 h-4 text-forest" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12 mb-24 min-h-[400px]">

        {sortedCatalog.length > 0 ? (
          sortedCatalog.map(item => <ProductCard key={item.slug} product={item} />)
        ) : (
          <div className="col-span-full py-12 text-center text-muted">No products found in this category.</div>
        )}
      </section>

      <section className="bg-sage/20 py-24 px-6 mt-12">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-forest mb-4 block">Our approach</span>
          <h2 className="text-3xl md:text-4xl font-serif text-ink mb-6">We make room for the things that earn it.</h2>
          <p className="text-forest/80 text-lg leading-relaxed">Every Woxly object begins with a small everyday frustration and ends only when the solution feels useful, durable and quietly beautiful.</p>
        </div>
      </section>
    </SiteShell>
  );
}
