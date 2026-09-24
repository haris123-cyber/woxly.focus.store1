"use client";

import { useState } from "react";
import { ChevronDown, Check, MoreHorizontal } from "lucide-react";
import { catalog } from "@/data/catalog";
import { SiteShell, PageHero } from "@/components/site-shell";
import { ProductCard } from "@/components/product-card";

export function ShopClient() {
  const [sort, setSort] = useState("Featured");
  const [category, setCategory] = useState("All");
  const [isFeatureMenuOpen, setIsFeatureMenuOpen] = useState(false);
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

      {/* Sticky Top Bar */}
      <div className="sticky top-18 pt-5 md:top-14 mt-5 z-40 max-w-[1200px] bg-paper mx-auto px-2 py-2 w-full mb-6 ">
        <div className="flex items-center justify-between gap-4">

          {/* Categories (Outside) */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none flex-1 pr-2">
            {["All", "Lighting", "bulbs", "Accessories"].map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors shrink-0 shadow-sm ${category === cat ? "bg-ink text-paper" : "bg-white text-ink border border-line hover:border-ink/30"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sticky Sort Menu Button */}
          <div className="relative shrink-0">
            <button
              onClick={() => setIsFeatureMenuOpen(!isFeatureMenuOpen)}
              className="w-12 h-12 bg-white border border-line rounded-full flex items-center justify-center shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all"
              aria-label="Sort menu"
            >
              <MoreHorizontal className="w-5 h-5 text-ink" />
            </button>

            {isFeatureMenuOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setIsFeatureMenuOpen(false)} />
                <div className="absolute right-0 top-full mt-3 w-[200px] bg-white border border-line rounded-2xl shadow-2xl z-40 p-4 animate-in fade-in slide-in-from-top-2 duration-200">

                  {/* Sort */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-3">Sort by</h3>
                    <div className="flex flex-col gap-1">
                      {sortOptions.map(option => (
                        <button
                          key={option}
                          onClick={() => { setSort(option); setIsFeatureMenuOpen(false); }}
                          className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-colors flex items-center justify-between ${sort === option ? 'bg-sage/30 text-forest font-semibold' : 'text-ink hover:bg-line/30 font-medium'}`}
                        >
                          {option}
                          {sort === option && <Check className="w-4 h-4 text-forest" />}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <section className="max-w-[1200px] mx-auto px-6 w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12 mb-24 min-h-[400px]">

        {sortedCatalog.length > 0 ? (
          sortedCatalog.map(item => <ProductCard key={item.slug} product={item} />)
        ) : (
          <div className="col-span-full py-12 text-center text-muted">No products found in this category.</div>
        )}
      </section>


    </SiteShell>
  );
}
