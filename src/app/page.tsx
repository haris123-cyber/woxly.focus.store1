"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { catalog } from "@/data/catalog";

const money = (value: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

export default function Home() {
  return (
    <main className="min-h-screen bg-paper text-ink pb-24">
      {/* 1. Hero Section (Mobile) */}
      <section className="relative w-full max-w-[1200px] mx-auto bg-[#e6e2db] md:hidden">
        <Image
          src="/images/image.png"
          alt="Sol Lamp Hero Banner"
          width={1080}
          height={1920}
          className="w-full h-auto block"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-paper to-transparent pointer-events-none"></div>
      </section>

      {/* 1. Hero Section (Desktop) */}
      <section className="hidden md:flex relative flex-col justify-between min-h-[600px] lg:min-h-[700px] overflow-hidden bg-[#e6e2db] max-w-[1200px] mx-auto w-full">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/image cop1y.png"
            alt="Sol Lamp"
            fill
            className="w-full h-full block"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#e6e2db]/30 via-[#e6e2db]/20 to-transparent"></div>
        </div>





      </section>


      {/* 2. Category Blocks */}
      <section className="max-w-[1200px] mx-auto py-24 px-6 md:px-12">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-amber text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">Browse by Category</span>
            <h2 className="text-4xl md:text-5xl font-serif text-ink">Find your ritual.</h2>
          </div>
          <Link href="/store" className="text-muted text-sm hover:text-ink transition-colors hidden md:block">
            All categories &rarr;
          </Link>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] h-[500px] md:h-[600px] border-t border-l border-line">
          <Link href="/store" className="relative flex-none w-[65vw] sm:w-full md:w-1/3 snap-center group overflow-hidden border-r border-b border-line">
            <Image src="/images/sol-hero.png" alt="Precision" fill sizes="(max-width: 800px) 100vw, 33vw" className="object-cover  opacity-100 group-hover:opacity-90 transition-opacity duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-paper/0 via-paper/20 to-transparent"></div>
            <div className="absolute bottom-8 left-8">
              <span className="text-amber text-[10px] font-bold tracking-widest uppercase mb-2 block">Precision Lighting</span>
              <h3 className="text-3xl font-serif text-ink">Desk Lamps</h3>
            </div>
          </Link>
          <Link href="/store" className="relative flex-none w-[65vw] sm:w-full md:w-1/3 snap-center group overflow-hidden border-r border-b border-line">
            <Image src="/images/sol-lifestyle.png" alt="Ambient" fill sizes="(max-width: 800px) 100vw, 33vw" className="object-cover opacity-100 group-hover:opacity-90 transition-opacity duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-paper/0 via-paper/20 to-transparent"></div>
            <div className="absolute bottom-8 left-8">
              <span className="text-amber text-[10px] font-bold tracking-widest uppercase mb-2 block">Signature Moods</span>
              <h3 className="text-3xl font-serif text-ink">Ambient</h3>
            </div>
          </Link>
          <Link href="/store" className="relative flex-none w-[65vw] sm:w-full md:w-1/3 snap-center group overflow-hidden border-r border-b border-line">
            <Image src="/images/sol-detail.png" alt="Accessories" fill sizes="(max-width: 800px) 100vw, 33vw" className="object-cover opacity-100 group-hover:opacity-90 transition-opacity duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-paper/0 via-paper/20 to-transparent"></div>
            <div className="absolute bottom-8 left-8">
              <span className="text-amber text-[10px] font-bold tracking-widest uppercase mb-2 block">Targeted Care</span>
              <h3 className="text-3xl font-serif text-ink">Accessories</h3>
            </div>
          </Link>
        </div>
      </section>
      {/* 3. Collection Grid */}
      <section className="max-w-[1200px] mx-auto py-24 px-6 md:px-12 border-t border-line">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div>
            <span className="text-amber text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">The Collection</span>
            <h2 className="text-5xl md:text-6xl font-serif text-ink mb-2 leading-tight">Every formula, <br /><i className="text-amber">intentional.</i></h2>
          </div>
          <div className="relative w-full lg:w-auto max-w-full">
            <div className="flex gap-1 overflow-x-auto pb-2 max-w-full scrollbar-none pr-10">

              <button className="bg-amber text-ink px-6 py-2 text-xs font-bold uppercase tracking-widest shrink-0">
                All
              </button>

              <button className="border border-line text-muted hover:text-ink px-6 py-2 text-xs font-bold uppercase tracking-widest shrink-0">
                Lamps
              </button>

              <button className="border border-line text-muted hover:text-ink px-6 py-2 text-xs font-bold uppercase tracking-widest shrink-0">
                Bulbs
              </button>

              <button className="border border-line text-muted hover:text-ink px-6 py-2 text-xs font-bold uppercase tracking-widest shrink-0">
                Accessories
              </button>

            </div>

            {/* Scroll indicator */}
            <div className="absolute right-0 sm:hidden  top-0 bottom-2 flex items-center pl-5 pr-5 bg-gradient-to-l from-white via-white/90 to-transparent pointer-events-none">

            </div>
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

                <Image src={item.image} alt={item.name} fill sizes="(max-width: 800px) 100vw, 33vw" className="object-cover drop-shadow-sm group-hover:scale-105 transition-transform duration-700" />
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
                    <s className="text-black/60 text-sm">{money(item.compareAt)}</s>
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
