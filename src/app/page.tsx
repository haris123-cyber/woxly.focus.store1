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
      {/* Hero Carousel Section */}
      <section className="relative w-full h-[80vh] min-h-[500px] md:h-auto md:min-h-0 md:aspect-[3/1] 2xl:max-h-[640px] overflow-hidden group">

        {/* Scrollable Container */}
        <div className="flex w-full h-full overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

          {/* Slide 1 */}
          <div className="relative flex-none w-full h-full snap-center bg-[#e6e2db] flex items-end">
            <Image
              src="/images/mobile-hero-lamp.jpg"
              alt="Hero Banner Mobile"
              fill
              className="w-full h-full object-cover object-center md:hidden"
              priority
              sizes="100vw"
            />
            <Image
              src="/images/image cop1y.png"
              alt="Hero Banner Desktop"
              fill
              className="hidden md:block w-full h-full object-cover object-center"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />
            <div className="relative z-20 w-full p-6 pb-10 md:p-16 md:pb-16 flex flex-col justify-end">
              <div className="max-w-2xl text-white">
                <span className="text-[10px] md:text-sm font-bold tracking-[0.15em] uppercase mb-2 md:mb-4 block drop-shadow-md">
                  ALL NEW DASHER NZ COLLECTION
                </span>
                <h1 className="text-[32px] md:text-6xl font-bold mb-6 md:mb-10 leading-[1.1] drop-shadow-lg">
                  Wildly Comfortable. <br /> Super Natural.
                </h1>
                <div className="flex flex-row gap-3 md:gap-4">
                  <Link href="/shop" className="flex-1 sm:flex-none bg-white text-ink px-4 py-3 md:px-8 md:py-4 rounded-full font-bold text-[11px] md:text-[13px] tracking-wider uppercase hover:bg-gray-100 transition-colors text-center shadow-lg">
                    SHOP MEN
                  </Link>
                  <Link href="/shop" className="flex-1 sm:flex-none bg-white text-ink px-4 py-3 md:px-8 md:py-4 rounded-full font-bold text-[11px] md:text-[13px] tracking-wider uppercase hover:bg-gray-100 transition-colors text-center shadow-lg">
                    SHOP WOMEN
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="relative flex-none w-full h-full snap-center bg-black flex items-end">
            <Image
              src="/images/ambient_banner.jpg"
              alt="Ambient Collection"
              fill
              className="w-full h-full object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
            <div className="relative z-20 w-full p-6 pb-10 md:p-16 md:pb-16 flex flex-col justify-end">
              <div className="max-w-2xl text-white">
                <span className="text-[10px] md:text-sm font-bold tracking-[0.15em] uppercase mb-2 md:mb-4 block drop-shadow-md">
                  THE EVERYDAY CLASSIC
                </span>
                <h2 className="text-[32px] md:text-6xl font-bold mb-6 md:mb-10 leading-[1.1] drop-shadow-lg">
                  Elevate Your <br /> Daily Routine.
                </h2>
                <div className="flex flex-row gap-3 md:gap-4">
                  <Link href="/shop" className="flex-1 sm:flex-none bg-white text-ink px-4 py-3 md:px-8 md:py-4 rounded-full font-bold text-[11px] md:text-[13px] tracking-wider uppercase hover:bg-gray-100 transition-colors text-center shadow-lg">
                    SHOP COLLECTION
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="relative flex-none w-full h-full snap-center bg-forest flex items-end">
            <Image
              src="/images/workspace_banner.jpg"
              alt="Sustainable Collection"
              fill
              className="w-full h-full object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
            <div className="relative z-20 w-full p-6 pb-10 md:p-16 md:pb-16 flex flex-col justify-end">
              <div className="max-w-2xl text-white">
                <span className="text-[10px] md:text-sm font-bold tracking-[0.15em] uppercase mb-2 md:mb-4 block drop-shadow-md">
                  SUSTAINABLE BY DESIGN
                </span>
                <h2 className="text-[32px] md:text-6xl font-bold mb-6 md:mb-10 leading-[1.1] drop-shadow-lg">
                  Tread Lighter. <br /> Go Further.
                </h2>
                <div className="flex flex-row gap-3 md:gap-4">
                  <Link href="/about" className="flex-1 sm:flex-none bg-white text-ink px-4 py-3 md:px-8 md:py-4 rounded-full font-bold text-[11px] md:text-[13px] tracking-wider uppercase hover:bg-gray-100 transition-colors text-center shadow-lg">
                    LEARN MORE
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Swipe indicator (optional visible hint for mobile) */}
        <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center gap-2 md:hidden pointer-events-none">
          <div className="w-1.5 h-1.5 rounded-full bg-white opacity-100"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-white opacity-40"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-white opacity-40"></div>
        </div>
      </section>


      {/* 2. Category Blocks */}
      <section className="max-w-[1200px] mx-auto py-12 px-6 md:px-12">
        <div className="flex justify-between items-end mb-8 md:mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-serif text-ink">Shop by Collection</h2>
          </div>
          <Link href="/shop" className="text-ink font-medium text-sm hover:opacity-70 transition-opacity hidden md:block underline underline-offset-4">
            View All
          </Link>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-2 md:gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] h-[350px] md:h-[650px] pb-4">

          {/* Card 1 */}
          <div className="relative flex-none w-[55vw] md:flex-1 snap-center group overflow-hidden rounded-[24px]">
            <Image src="/images/sol-hero.png" alt="Precision Lighting" fill sizes="(max-width: 800px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/20 transition-colors duration-500"></div>

            <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white text-center leading-[1.1] drop-shadow-md">Precision<br />Lighting</h3>
            </div>

            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 px-6">
              <Link href="/shop?category=desk" className="border border-white/80 text-white px-6 py-2.5 rounded-full font-medium text-[11px] md:text-xs tracking-widest uppercase hover:bg-white hover:text-ink transition-colors backdrop-blur-sm">
                SHOP DESK LAMPS
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative flex-none w-[55vw] md:flex-1 snap-center group overflow-hidden rounded-[24px]">
            <Image src="/images/sol-lifestyle.png" alt="Ambient Collection" fill sizes="(max-width: 800px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/20 transition-colors duration-500"></div>

            <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white text-center leading-[1.1] drop-shadow-md">Ambient<br />Glow</h3>
            </div>

            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 px-6">

              <Link href="/shop?category=table" className="border border-white/80 text-white px-6 py-2.5 rounded-full font-medium text-[11px] md:text-xs tracking-widest uppercase hover:bg-white hover:text-ink transition-colors backdrop-blur-sm">
                SHOP TABLE
              </Link>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative flex-none w-[55vw] md:flex-1 snap-center group overflow-hidden rounded-[24px]">
            <Image src="/images/sol-detail.png" alt="Accessories" fill sizes="(max-width: 800px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/20 transition-colors duration-500"></div>

            <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white text-center leading-[1.1] drop-shadow-md">Essential<br />Accessories</h3>
            </div>

            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 px-6">
              <Link href="/shop?category=accessories" className="border border-white/80 text-white px-6 py-2.5 rounded-full font-medium text-[11px] md:text-xs tracking-widest uppercase hover:bg-white hover:text-ink transition-colors backdrop-blur-sm">
                SHOP ACCESSORIES
              </Link>
            </div>
          </div>
          {/* Card 4 */}
          <div className="relative flex-none w-[55vw] md:flex-1 snap-center group overflow-hidden rounded-[24px]">
            <Image src="/images/sol-detail.png" alt="Accessories" fill sizes="(max-width: 800px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/20 transition-colors duration-500"></div>

            <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white text-center leading-[1.1] drop-shadow-md">Essential<br />Accessories</h3>
            </div>

            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 px-6">
              <Link href="/shop?category=accessories" className="border border-white/80 text-white px-6 py-2.5 rounded-full font-medium text-[11px] md:text-xs tracking-widest uppercase hover:bg-white hover:text-ink transition-colors backdrop-blur-sm">
                SHOP ACCESSORIES
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Banner 1: Product Promotion */}
      <section className="max-w-[1200px] mx-auto w-full px-0 md:px-12 py-5 md:py-24">
        <div className="relative w-full aspect-square md:aspect-[21/9] bg-line/20 overflow-hidden group rounded-none md:rounded-[32px]">
          <Image src="/images/lamp banner.png" alt="Sol Focus Lamp Details" fill sizes="100vw" className="object-cover group-hover:scale-105 transition-transform duration-1000" />

        </div>
      </section>

      {/* Highlights / Collections (New Arrivals, Trending, Offers) */}
      <section className="max-w-[1200px] mx-auto py-12 px-6 md:px-12">
        <div className="flex justify-between items-end mb-8 md:mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-serif text-ink">Discover What's New</h2>
          </div>
        </div>

        <div className="flex gap-4 md:gap-6">

          {/* Left Column */}
          <div className="flex flex-col gap-4 md:gap-6 flex-1">
            {/* Card 1: Tall */}
            <div className="relative group overflow-hidden rounded-[14px] aspect-[5/8]">
              <Image src="/images/grid2.png" alt="New Arrivals" fill sizes="(max-width: 800px) 50vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>

            {/* Card 3: Square */}
            <div className="relative group overflow-hidden rounded-[14px] aspect-square">
              <Image src="/images/grid1.png" alt="Special Offers" fill sizes="(max-width: 800px) 50vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4 md:gap-6 flex-1">
            {/* Card 2: Square */}
            <div className="relative group overflow-hidden rounded-[14px] aspect-square">
              <Image src="/images/grid3.png" alt="Trending" fill sizes="(max-width: 800px) 50vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>

            {/* Card 4: Tall */}
            <div className="relative group overflow-hidden rounded-[14px] aspect-[5/8]">
              <Image src="/images/grid4.png" alt="Best Sellers" fill sizes="(max-width: 800px) 50vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
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
          {filteredCatalog.slice(0, 4).map((item, i) => (
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
                    <span className="bg-[#7a2e2e] text-amber px-2 py-1 text-[10px] font-bold tracking-widest uppercase shadow-sm">
                      Offer
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

        <div className="mt-6 flex justify-center">
          <Link href="/shop" className="border border-ink text-ink hover:bg-ink hover:text-white px-4 py-1 rounded-full font-medium text-[9px] md:text-xs transition-colors uppercase tracking-[0.15em]">
            View All Products
          </Link>
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
        <Image src="/images/lamp banner2.png" alt="Ambient Lighting Nook" fill sizes="100vw" className="object-cover" />

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
