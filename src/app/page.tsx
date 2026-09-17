"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { catalog } from "@/data/catalog";

const money = (value: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

export default function Home() {
  return (
    <main className="min-h-screen bg-paper text-ink pb-24">
      {/* 1. Hero Section */}
      <section className="relative flex items-center min-h-[90vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/sol-hero.png"
            alt="Sol Lamp"
            fill
            className="object-cover object-left lg:object-center opacity-100"
            priority
            sizes="100vw"
          />
          {/* Gradient overlay to ensure text is readable */}
          <div className="absolute inset-0 bg-gradient-to-b from-paper/20 via-paper/20 to-transparent lg:bg-gradient-to-r lg:from-paper lg:via-paper/50 lg:to-transparent"></div>
          {/* Bottom fade gradient to blend into the next section */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-paper to-transparent pointer-events-none"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-24 py-20">
          <div className="text-left mb-16 mt-12 max-w-2xl">
            <span className="text-sm font-semibold tracking-widest uppercase text-muted mb-4 block">Our Collection</span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-ink leading-tight mb-4" style={{ letterSpacing: "-0.02em" }}>Curated for your space.</h1>
            <p className="mt-4 text-muted max-w-xl text-sm">Considered objects that bring calm, clear light to your everyday routines.</p>
          </div>

          <div className="flex flex-wrap items-center justify-start gap-6 mb-16 max-w-2xl">
            <Link
              href="/store"
              className="bg-amber text-ink px-8 py-4 text-sm font-bold tracking-wider hover:bg-ink hover:text-paper transition-colors"
            >
              EXPLORE COLLECTION
            </Link>
            <Link
              href="/store#details"
              className="border border-line text-ink px-8 py-4 text-sm font-bold tracking-wider hover:border-ink transition-colors bg-paper/50 backdrop-blur-sm"
            >
              OUR STORY
            </Link>
          </div>

          <div className="flex items-center justify-start gap-4 max-w-2xl">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-paper bg-sage flex items-center justify-center overflow-hidden relative">
                  <Image src={`/images/sol-detail.png`} alt="avatar" fill className="object-cover opacity-50" />
                </div>
              ))}
            </div>
            <div>
              <div className="flex text-amber text-sm mb-1">★★★★★ <span className="text-ink font-medium ml-2">4.9</span></div>
              <div className="text-xs text-ink/80 font-medium">Trusted by 12,400+ customers</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category Blocks */}
      <section className="py-24 px-8 md:px-16 lg:px-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-amber text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">Browse by Category</span>
            <h2 className="text-4xl md:text-5xl font-serif text-ink">Find your ritual.</h2>
          </div>
          <Link href="/store" className="text-muted text-sm hover:text-ink transition-colors hidden md:block">
            All categories &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 h-[600px] border-t border-l border-line">
          <Link href="/store" className="relative group overflow-hidden border-r border-b border-line">
            <Image src="/images/sol-hero.png" alt="Precision" fill className="object-cover  opacity-100 group-hover:opacity-90 transition-opacity duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-paper/0 via-paper/20 to-transparent"></div>
            <div className="absolute bottom-8 left-8">
              <span className="text-amber text-[10px] font-bold tracking-widest uppercase mb-2 block">Precision Lighting</span>
              <h3 className="text-3xl font-serif text-ink">Desk Lamps</h3>
            </div>
          </Link>
          <Link href="/store" className="relative group overflow-hidden border-r border-b border-line">
            <Image src="/images/sol-lifestyle.png" alt="Ambient" fill className="object-cover opacity-100 group-hover:opacity-90 transition-opacity duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-paper/0 via-paper/20 to-transparent"></div>
            <div className="absolute bottom-8 left-8">
              <span className="text-amber text-[10px] font-bold tracking-widest uppercase mb-2 block">Signature Moods</span>
              <h3 className="text-3xl font-serif text-ink">Ambient</h3>
            </div>
          </Link>
          <Link href="/store" className="relative group overflow-hidden border-r border-b border-line">
            <Image src="/images/sol-detail.png" alt="Accessories" fill className="object-cover opacity-100 group-hover:opacity-90 transition-opacity duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-paper/0 via-paper/20 to-transparent"></div>
            <div className="absolute bottom-8 left-8">
              <span className="text-amber text-[10px] font-bold tracking-widest uppercase mb-2 block">Targeted Care</span>
              <h3 className="text-3xl font-serif text-ink">Accessories</h3>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. Collection Grid */}
      <section className="py-24 px-8 md:px-16 lg:px-24 border-t border-line">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div>
            <span className="text-amber text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">The Collection</span>
            <h2 className="text-5xl md:text-6xl font-serif text-ink mb-2 leading-tight">Every formula, <br /><i className="text-amber">intentional.</i></h2>
          </div>
          <div className="flex gap-1 overflow-x-auto pb-2 max-w-full scrollbar-hide w-full lg:w-auto">
            <button className="bg-amber text-ink px-6 py-2 text-xs font-bold uppercase tracking-widest shrink-0">All</button>
            <button className="border border-line text-muted hover:text-ink px-6 py-2 text-xs font-bold uppercase tracking-widest shrink-0">Lamps</button>
            <button className="border border-line text-muted hover:text-ink px-6 py-2 text-xs font-bold uppercase tracking-widest shrink-0">Bulbs</button>
            <button className="border border-line text-muted hover:text-ink px-6 py-2 text-xs font-bold uppercase tracking-widest shrink-0">Accessories</button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-8">
          {catalog.map((item, i) => (
            <div key={item.slug} className="group">
              {/* White Card Box (Paper Mockup) */}
              <Link href={`/store/${item.slug}`} className="block relative bg-sage/10 aspect-[4/5] p-6 md:p-8 mb-6 shadow-sm border border-line">
                {item.badge && (
                  <span className={`absolute top-6 left-6 z-20 px-2 py-1 text-[10px] font-bold tracking-widest uppercase ${i === 0 ? 'bg-[#7a2e2e] text-white text-amber' : i === 1 ? 'bg-[#7a2e2e] text-white text-amber' : 'bg-[#7a2e2e] text-white'}`}>
                    {item.badge === "Most popular" ? "Bestseller" : item.badge === "Best value" ? "Sale" : "New"}
                  </span>
                )}


                {/* Main Content Area */}

                <Image src={item.image} alt={item.name} fill className="object-cover drop-shadow-sm group-hover:scale-105 transition-transform duration-700" />
              </Link>

              {/* Details below card */}
              <div className="px-2">
                <span className="text-muted text-[10px] font-bold tracking-widest uppercase block mb-2">{item.category}</span>
                <h3 className="text-ink text-lg font-serif mb-3 hover:text-amber transition-colors"><Link href="/store">{item.name}</Link></h3>
                <p className="text-muted text-xs leading-relaxed mb-4 line-clamp-2">
                  Pure, glare-free illumination balanced to match natural daylight. Visibly improves focus and reduces eye strain within hours.
                </p>
                <div className="flex items-center gap-3">
                  <strong className="text-amber font-semibold">{money(item.price)}</strong>
                  {item.compareAt && (
                    <s className="text-muted/60 text-sm">{money(item.compareAt)}</s>
                  )}
                </div>
              </div>
            </div>

          ))}

        </div>


      </section>
      <div className="px-6 py-4 max-w-[1200px] mx-auto center">
        <h3 className="font-medium text-ink mb-2">Stay in the light</h3>
        <p className="text-muted mb-6">Notes on better spaces, sent occasionally.</p>
        <form onSubmit={(event) => event.preventDefault()} className="relative">
          <input type="email" required placeholder="Email address" aria-label="Email address" className="w-full bg-paper border border-line rounded-full px-5 py-3 outline-none focus:border-ink transition-colors" />
          <button aria-label="Subscribe" className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-ink text-paper rounded-full flex items-center justify-center hover:bg-forest transition-colors"><ArrowRight size={16} /></button>
        </form>
      </div>

    </main>

  );
}
