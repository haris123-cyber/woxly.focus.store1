"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Check, ShoppingBag } from "lucide-react";
import { catalog } from "@/data/catalog";
import { useCart } from "@/context/CartContext";

const money = (value: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

export default function Home() {
  const { addToCart, setCartOpen } = useCart();
  const [filter, setFilter] = useState("All");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterStatus !== "idle") return;

    setNewsletterStatus("submitting");
    setTimeout(() => {
      setNewsletterStatus("success");
      setTimeout(() => setNewsletterStatus("idle"), 3000);
    }, 800);
  };

  const filteredCatalog = catalog.filter((item) => {
    if (filter === "All") return true;
    if (filter === "Lamps") return item.category === "Lighting";
    if (filter === "bulbs") return item.category === "bulbs";
    if (filter === "Accessories") return item.category === "Accessories";
    return true;
  });

  return (
    <main className="min-h-screen bg-paper text-ink pb-1">
      {/* 1. Hero Section (Mobile) */}
      <section className="relative w-full bg-[#e6e2db] md:hidden">
        <Image
          src="/images/mobile-hero-lamp.jpg"
          alt="Sol Lamp Hero Banner"
          width={1080}
          height={1920}
          className="w-full h-auto block"
          priority
          sizes="100vw"
        />
      </section>

      {/* 1. Hero Section (Desktop) */}
      <section className="hidden md:flex relative flex-col justify-between min-h-[600px] lg:min-h-[700px] xl:min-h-[700px] overflow-hidden bg-[#e6e2db] w-full max-w-[1200px] mx-auto md:mt-6 md:rounded-3xl">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/image cop1y.png"
            alt="Sol Lamp"
            fill
            className="w-full h-full block object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>
      </section>


      {/* 2. Category Blocks */}
      <section className="max-w-[1200px] mx-auto py-10 px-6 md:px-12">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-amber text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">Browse by Category</span>
            <h2 className="text-4xl md:text-5xl font-serif text-ink">Find your ritual.</h2>
          </div>
          <Link href="/shop" className="text-muted text-sm hover:text-ink transition-colors hidden md:block">
            All categories &rarr;
          </Link>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] h-[500px] md:h-[600px] border-t border-l border-line">
          <Link href="/shop" className="relative flex-none w-[65vw] sm:w-full md:w-1/3 snap-center group overflow-hidden border-r border-b border-line">
            <Image src="/images/sol-hero.png" alt="Precision" fill sizes="(max-width: 800px) 100vw, 33vw" className="object-cover  opacity-100 group-hover:opacity-90 transition-opacity duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-paper/0 via-paper/20 to-transparent"></div>
            <div className="absolute bottom-8 left-8">
              <span className="text-amber text-[10px] font-bold tracking-widest uppercase mb-2 block">Precision Lighting</span>
              <h3 className="text-3xl font-serif text-ink">Desk Lamps</h3>
            </div>
          </Link>
          <Link href="/shop" className="relative flex-none w-[65vw] sm:w-full md:w-1/3 snap-center group overflow-hidden border-r border-b border-line">
            <Image src="/images/sol-lifestyle.png" alt="Ambient" fill sizes="(max-width: 800px) 100vw, 33vw" className="object-cover opacity-100 group-hover:opacity-90 transition-opacity duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-paper/0 via-paper/20 to-transparent"></div>
            <div className="absolute bottom-8 left-8">
              <span className="text-amber text-[10px] font-bold tracking-widest uppercase mb-2 block">Signature Moods</span>
              <h3 className="text-3xl font-serif text-ink">Ambient</h3>
            </div>
          </Link>
          <Link href="/shop" className="relative flex-none w-[65vw] sm:w-full md:w-1/3 snap-center group overflow-hidden border-r border-b border-line">
            <Image src="/images/sol-detail.png" alt="Accessories" fill sizes="(max-width: 800px) 100vw, 33vw" className="object-cover opacity-100 group-hover:opacity-90 transition-opacity duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-paper/0 via-paper/20 to-transparent"></div>
            <div className="absolute bottom-8 left-8">
              <span className="text-amber text-[10px] font-bold tracking-widest uppercase mb-2 block">Targeted Care</span>
              <h3 className="text-3xl font-serif text-ink">Accessories</h3>
            </div>
          </Link>
        </div>
      </section>

      {/* Banner 1: Workspace */}
      <section className="max-w-[1200px] mx-auto w-full px-0 md:px-12 py-5 md:py-24">
        <div className="relative w-full aspect-square md:aspect-[21/9] bg-line/20 overflow-hidden group">
          <Image src="/images/workspace_banner.jpg" alt="The Workspace Collection" fill sizes="100vw" className="object-cover group-hover:scale-105 transition-transform duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-8 left-8 md:bottom-16 md:left-16 text-white max-w-lg pr-8">
            <span className="text-amber text-xs font-bold tracking-[0.2em] uppercase mb-4 block drop-shadow-md">The Workspace Collection</span>
            <h2 className="text-3xl md:text-5xl font-serif mb-4 leading-tight drop-shadow-lg">Where focus finds its form.</h2>
            <p className="text-white/90 text-sm md:text-base leading-relaxed mb-8 drop-shadow-md">Carefully considered lighting that reduces eye strain and creates a quiet atmosphere for deep work.</p>
            <Link href="/shop" className="bg-white text-ink px-8 py-3 font-medium text-sm hover:bg-amber hover:text-ink transition-colors drop-shadow-md inline-flex items-center gap-2">
              Explore the collection <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Collection Grid */}
      <section className="max-w-[1200px] mx-auto py-4 px-6 md:px-12 ">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div>
            <span className="text-amber text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">The Collection</span>
            <h2 className="text-5xl md:text-6xl font-serif text-ink mb-2 leading-tight">Every formula, <br /><i className="text-amber">intentional.</i></h2>
          </div>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-8">
          {filteredCatalog.map((item, i) => (
            <div key={item.slug} className="group">
              {/* Image Container with Hover Group */}
              <div className="relative mb-2 aspect-[4/5] bg-sage/10 shadow-sm border border-line group overflow-hidden block">
                <Link href={`/store/${item.slug}`} className="absolute inset-0 z-10">
                  {/* The link covers the entire image area */}
                </Link>

                <div className="absolute top-4 md:top-6 left-4 md:left-6 z-20 flex flex-col gap-2 items-start pointer-events-none">
                  {item.badge && (
                    <span className={`px-2 py-1 text-[10px] font-bold tracking-widest uppercase ${i === 0 || i === 1 ? 'bg-[#7a2e2e] text-amber' : 'bg-[#7a2e2e] text-white'}`}>
                      {item.badge === "Most popular" ? "Bestseller" : item.badge === "Best value" ? "Sale" : "New"}
                    </span>
                  )}
                  {item.compareAt && item.compareAt > item.price && (
                    <span className="bg-[green] text-white px-2 py-1 text-[10px] font-bold tracking-widest uppercase">
                      OFF
                    </span>
                  )}
                </div>

                {/* Main Content Area */}
                <Image src={item.image} alt={item.name} fill sizes="(max-width: 800px) 100vw, 33vw" className="object-cover drop-shadow-sm group-hover:scale-105 transition-transform duration-700 pointer-events-none" />

                {/* Animated Bag Button (Always visible on mobile, animated on desktop) */}
                <div className="absolute bottom-3 block md:hidden right-3 md:bottom-4 md:left-4 md:right-4 z-30 flex justify-center opacity-100 translate-y-0 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300 ease-out">
                  <button
                    onClick={(e) => { 
                      e.preventDefault(); 
                      e.stopPropagation(); 
                      addToCart({
                        id: `${item.slug}-default`,
                        slug: item.slug,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        quantity: 1,
                        category: item.category,
                        variant: "Standard",
                        bundleLabel: "One item",
                      });
                      setCartOpen(true);
                    }}
                    className="bg-paper text-ink w-[60px] py-2 p-1 md:py-3 rounded-full font-medium text-xs md:text-sm flex items-center justify-center gap-1.5 md:gap-2 shadow-xl hover:scale-[1.02] active:scale-95 transition-transform cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 md:w-[18px] md:h-[18px]" strokeWidth={2} />
                  </button>
                </div>
                <div className="absolute bottom-3 hidden md:block right-3 md:bottom-4 md:left-4 md:right-4 z-30 flex justify-center opacity-100 translate-y-0 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300 ease-out">
                  <button
                    onClick={(e) => { 
                      e.preventDefault(); 
                      e.stopPropagation(); 
                      addToCart({
                        id: `${item.slug}-default`,
                        slug: item.slug,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        quantity: 1,
                        category: item.category,
                        variant: "Standard",
                        bundleLabel: "One item",
                      });
                      setCartOpen(true);
                    }}
                    className="bg-paper text-ink w-full py-2 p-1 md:py-3 rounded-full font-medium text-xs md:text-sm flex items-center justify-center gap-1.5 md:gap-2 shadow-xl hover:scale-[1.02] active:scale-95 transition-transform cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 md:w-[18px] md:h-[18px]" strokeWidth={2} />add to bag
                  </button>
                </div>
              </div>

              {/* Details below card */}
              <div className="px-0">
                <span className="text-muted text-[10px] font-bold tracking-widest uppercase block mb-0">{item.category}</span>
                <h3 className="text-ink text-lg font-serif mb-0 hover:text-amber transition-colors"><Link href="/store">{item.name}</Link></h3>

                <div className="flex items-center gap-2">
                  <strong className="text-black font-semibold">{money(item.price)}</strong>
                  {item.compareAt && (
                    <>
                      <s className="text-black/60 text-xs">{money(item.compareAt)}</s>

                      <span className="text-[13px] font-bold -ml-2 text-green-600 px-1.5 py-0.5 rounded-sm shrink-0 flex items-center">
                        <ArrowDown size={12} color="currentColor" className="mr-0.5" />
                        {Math.round(((item.compareAt - item.price) / item.compareAt) * 100)}%
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

          ))}

        </div>


      </section>

      {/* Banner 2: Sustainability Split */}
      <section className="bg-sage/10 py-12 md:py-24">
        <div className="max-w-[1200px] mx-auto w-full px-6 md:px-12 flex flex-col md:flex-row items-center gap-12 md:gap-24">
          <div className="w-full md:w-1/2 relative aspect-square md:aspect-[4/5] overflow-hidden rounded-tr-[4rem] rounded-bl-[4rem]">
            <Image src="/images/sustainability_banner.jpg" alt="Sustainable Materials" fill sizes="(max-width: 800px) 100vw, 50vw" className="object-cover" />
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-start text-left">
            <span className="text-forest text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Sustainable by Design</span>
            <h2 className="text-3xl md:text-5xl font-serif text-ink mb-6 leading-tight">Built to last a lifetime.</h2>
            <p className="text-muted text-base md:text-lg leading-relaxed mb-8">We use only solid, repairable materials like brushed steel and ethically sourced oak. Our modular design means every part can be replaced, ensuring your lamp never ends up in a landfill.</p>
            <Link href="/about" className="text-ink font-bold uppercase tracking-widest text-xs border-b-2 border-ink pb-1 hover:text-forest hover:border-forest transition-colors">
              Our Material Philosophy
            </Link>
          </div>
        </div>
      </section>

      {/* Banner 3: Ambient Full Width */}
      <section className="relative w-full min-h-[500px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
        <Image src="/images/ambient_banner.jpg" alt="Ambient Lighting Nook" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-ink/40 pointer-events-none" />
        <div className="relative z-10 text-center px-6 max-w-2xl">
          <span className="text-amber text-xs font-bold tracking-[0.2em] uppercase mb-4 block drop-shadow-md">The Evening Ritual</span>
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight drop-shadow-lg">Slow down your space.</h2>
          <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-10 drop-shadow-md">Warm, diffused light that signals the end of the workday and the beginning of your time.</p>
          <Link href="/shop" className="bg-amber text-ink px-8 py-4 font-medium text-sm hover:bg-white hover:text-ink transition-colors drop-shadow-md inline-block">
            Shop Ambient Lamps
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <div className="px-0 py-24 max-w-[1200px] mx-auto text-center flex flex-col items-center -mt-15 -mb-15">
        <span className="text-amber text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Newsletter</span>
        <h3 className="text-4xl font-serif text-ink mb-4">Stay in the light.</h3>
        <p className="text-muted mb-6">Notes on better spaces, sent occasionally.</p>
        <form onSubmit={handleSubscribe} className="relative w-[70%] md:w-96">
          <input type="email" required placeholder="Email address" aria-label="Email address" className="w-full bg-paper border border-line rounded-full px-5 py-3 outline-none focus:border-ink transition-colors disabled:opacity-70" disabled={newsletterStatus !== "idle"} />
          <button aria-label="Subscribe" className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 text-paper rounded-full flex items-center justify-center transition-colors disabled:cursor-not-allowed ${newsletterStatus === "success" ? "bg-forest" : "bg-ink hover:bg-forest"}`} disabled={newsletterStatus !== "idle"}>
            {newsletterStatus === "submitting" ? (
              <span className="w-4 h-4 border-2 border-paper/30 border-t-paper rounded-full animate-spin"></span>
            ) : newsletterStatus === "success" ? (
              <Check size={16} />
            ) : (
              <ArrowRight size={16} />
            )}
          </button>
        </form>
      </div>

    </main>

  );
}
