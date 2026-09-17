"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, use } from "react";
import { ArrowDown, ArrowRight, BatteryCharging, Check, ChevronDown, CircleCheck, Eye, Headphones, Leaf, Menu, Minus, PackageCheck, Plus, Quote, ShieldCheck, ShoppingBag, SlidersHorizontal, Sparkles, Truck, X, Zap } from "lucide-react";
import { bundles, faqs, product as defaultProduct, reviews } from "@/data/store";
import { catalog } from "@/data/catalog";
import { useCart } from "@/context/CartContext";
import { Logo } from "@/components/logo";

const money = (value: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

export default function Storefront({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const catalogItem = catalog.find((c) => c.slug === resolvedParams.slug) || catalog[0];
  const product = {
    ...defaultProduct,
    name: catalogItem.name,
    price: catalogItem.price,
    compareAtPrice: catalogItem.compareAt || defaultProduct.compareAtPrice,
    images: [
      { src: catalogItem.image, alt: catalogItem.name },
      ...defaultProduct.images.slice(1)
    ]
  };

  const { setVariant, setCartQuantity, setCartOpen, variant, bundle, setBundle } = useCart();
  
  const dynamicBundles = useMemo(() => [
    { quantity: 1, label: "One item", caption: "For your desk", price: product.price },
    { quantity: 2, label: "Pair of items", caption: "Save ₹999", price: product.price * 2 - 999, badge: "Most popular" },
    { quantity: 3, label: "Studio set", caption: "Save ₹2,498", price: product.price * 3 - 2498, badge: "Best value" },
  ], [product.price]);

  const currentBundle = dynamicBundles.find(b => b.quantity === bundle.quantity) || dynamicBundles[0];

  const [activeImage, setActiveImage] = useState(0);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [pincode, setPincode] = useState("");
  const [delivery, setDelivery] = useState<"idle" | "valid" | "invalid">("idle");
  const heroActionRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const node = heroActionRef.current;
      if (node) {
        // Show sticky CTA only after scrolling past the normal CTA
        const triggerPoint = node.offsetTop + node.offsetHeight;
        setStickyVisible(window.scrollY > triggerPoint);
      }
    };
    // Initial check
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const savings = useMemo(() => product.compareAtPrice - product.price, []);
  const addToCart = () => {
    setCartQuantity((quantity) => quantity + bundle.quantity);
    setCartOpen(true);
  };
  const checkDelivery = () => setDelivery(/^\d{6}$/.test(pincode) ? "valid" : "invalid");

  return (
    <main id="top" className="bg-paper min-h-screen text-ink pb-24">
      {/* Hero Section */}
      <section className="max-w-[1200px] mx-auto px-6 pt-8 md:pt-16 pb-16 md:pb-24 flex flex-col lg:flex-row gap-12 lg:gap-20" aria-labelledby="hero-title">

        {/* Product Gallery */}
        <div className="flex-1 max-w-[640px] w-full mx-auto">
          <div className="relative aspect-square md:aspect-[4/5] bg-sage/30 rounded-3xl overflow-hidden mb-4 border border-line">
            <span className="absolute top-6 left-6 z-20 px-2 py-1 text-[10px] font-bold tracking-widest uppercase bg-[#7a2e2e] text-white pointer-events-none">
              Bestseller
            </span>

            <div 
              ref={galleryRef}
              className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth"
              onScroll={(e) => {
                const container = e.currentTarget;
                const scrollPosition = container.scrollLeft;
                const width = container.clientWidth;
                const newIndex = Math.round(scrollPosition / width);
                if (newIndex !== activeImage && newIndex >= 0 && newIndex < product.images.length) {
                  setActiveImage(newIndex);
                }
              }}
            >
              {product.images.map((image, index) => (
                <div key={image.src} className="relative w-full h-full shrink-0 snap-center">
                  <Image src={image.src} alt={image.alt} fill priority={index === 0} sizes="(max-width: 800px) 100vw, 58vw" className="object-cover pointer-events-none" />
                </div>
              ))}
            </div>

            <div className="absolute bottom-4 md:bottom-6 right-4 md:right-6 z-10 bg-ink/70 backdrop-blur-md text-paper px-3 py-1.5 rounded-full text-xs font-medium tracking-widest pointer-events-none">
              0{activeImage + 1} / 0{product.images.length}
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto snap-x pb-2 scrollbar-hide" aria-label="Product images">
            {product.images.map((image, index) => (
              <button key={image.src} className={`relative shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden snap-start transition-all duration-300 border-2 ${activeImage === index ? "border-ink scale-95" : "border-transparent opacity-60 hover:opacity-100 bg-sage/30"}`} onClick={() => { setActiveImage(index); galleryRef.current?.scrollTo({ left: index * galleryRef.current.clientWidth, behavior: "smooth" }); }} aria-label={`Show image ${index + 1}`}>
                <Image src={image.src} alt="" fill sizes="88px" className="object-cover" />
              </button>
            ))}
          </div>
          <p className="flex justify-end items-center gap-2 text-sm text-muted mt-8 mb-2 font-medium"><CircleCheck size={16} className="text-forest" /> In stock · Ships in 24 hours</p>


        </div>

        {/* Hero Copy & Form */}
        <div className="flex-1 flex flex-col justify-center max-w-[480px] mx-auto lg:mx-0">
          <div className="text-sm font-semibold tracking-widest uppercase text-muted mb-4">{product.eyebrow}</div>
          <h1 id="hero-title" className="text-4xl md:text-5xl font-serif text-ink mb-4 leading-tight tracking-tight">{product.headline}</h1>
          <p className="text-muted text-lg leading-relaxed mb-6">{product.description}</p>
          <a className="flex items-center gap-2 text-sm font-medium hover:text-muted transition-colors w-fit mb-10" href="#reviews">
            <span className="text-amber text-lg tracking-widest">★★★★★</span> <strong className="text-ink">{product.rating}</strong> <em className="text-muted not-italic">({product.reviewCount} reviews)</em>
          </a>

          <div className="flex items-end gap-3 mb-0 pb-10 border-b border-line">
            <strong className="text-3xl font-serif text-ink">{money(currentBundle.price)}</strong>
            {currentBundle.quantity === 1 && (
              <div className="flex flex-col text-sm pb-1">
                <s className="text-muted">{money(product.compareAtPrice)}</s>
                <span className="text-amber font-semibold">Save {money(product.compareAtPrice - product.price)}</span>
              </div>
            )}
          </div>

          <div className="mb-10">

            <div className="flex justify-between items-end mb-4 mt-6">
              <span className="text-sm font-semibold tracking-widest uppercase text-muted">Colour</span>
              <strong className="text-sm font-medium text-ink">{variant.name}</strong>
            </div>
            <div className="flex gap-4">
              {product.variants.map((item) => (
                <button key={item.id} onClick={() => setVariant(item)} className={`w-12 h-12 rounded-full border-2 p-1 transition-transform ${variant.id === item.id ? "border-ink scale-110" : "border-transparent hover:scale-105"}`} aria-label={`Choose ${item.name}`} aria-pressed={variant.id === item.id}>
                  <i className="block w-full h-full rounded-full shadow-inner flex items-center justify-center text-ink/70" style={{ background: item.swatch }}>
                    {variant.id === item.id && <Check size={16} />}
                  </i>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <div className="flex justify-between items-end mb-4">
              <span className="text-sm font-semibold tracking-widest uppercase text-muted">Choose your set</span>
              <small className="text-muted text-xs font-medium">Better together, less per lamp</small>
            </div>
            <div className="flex flex-col gap-4">
              {dynamicBundles.map((item) => (
                <button key={item.quantity} className={`relative flex items-center justify-between p-4 rounded-2xl border-2 text-left transition-colors ${currentBundle.quantity === item.quantity ? "border-ink bg-sage/10" : "border-line bg-paper hover:border-muted"}`} onClick={() => setBundle(item)}>
                  {item.badge && <b className="absolute -top-3 left-4 bg-ink text-paper text-[10px] uppercase tracking-widest px-2 py-1 rounded-full">{item.badge}</b>}
                  <div>
                    <span className="block font-medium text-ink text-lg">{item.label}</span>
                    <span className="text-muted text-sm block">{item.caption}</span>
                  </div>
                  <strong className="text-ink font-serif text-xl">{money(item.price)}</strong>

                </button>
              ))}
            </div>
          </div>

          <div className="mb-8" ref={heroActionRef}>
            <button className="w-full bg-ink text-paper py-5 rounded-full font-medium flex justify-center items-center gap-3 text-lg hover:bg-forest hover:-translate-y-0.5 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]" onClick={addToCart}>
              Add to bag <span className="opacity-70 font-normal">·</span> <span>{money(currentBundle.price)}</span>
            </button>
          </div>
          <div className="flex justify-center items-center gap-4 text-xs font-semibold uppercase tracking-wider text-muted flex-wrap">
            <span className="flex items-center gap-1.5"><Truck size={14} /> Free shipping</span>
            <span className="flex items-center gap-1.5"><ShieldCheck size={14} /> 2-year warranty</span>
            <span className="flex items-center gap-1.5"><PackageCheck size={14} /> Easy returns</span>
          </div>
        </div>
      </section>


      {/* Intro */}
      <section className="max-w-[800px] mx-auto px-6 py-24 md:py-32 text-center" id="benefits">
        <span className="text-sm font-semibold tracking-widest uppercase text-muted mb-6 block">Your space, in a better light</span>
        <h2 className="text-4xl md:text-5xl font-serif text-ink leading-tight mb-8">Focus without the fluorescent feeling.</h2>
        <p className="text-lg md:text-xl text-muted leading-relaxed max-w-[600px] mx-auto">Sol brings crisp, comfortable task light to your desk in a form that feels more like furniture than equipment.</p>
      </section>

      {/* Benefits Grid */}
      <section className="max-w-[1200px] mx-auto px-6 pb-24 md:pb-32 grid grid-cols-1 md:grid-cols-3 gap-6">
        <article className="bg-ink text-paper rounded-[32px] p-8 md:p-10 flex flex-col justify-between min-h-[280px] md:min-h-[400px] group">
          <span className="text-xs font-semibold tracking-widest opacity-60 ml-1">01</span>
          <div className="text-paper opacity-80 mt-6 mb-6 md:mt-12 md:mb-8 transform group-hover:scale-110 transition-transform origin-left"><Eye size={38} strokeWidth={1.5} /></div>
          <div className="mt-auto">
            <h3 className="text-2xl font-serif mb-3">Comfort for your eyes</h3>
            <p className="text-paper/70 leading-relaxed mb-6">A recessed diffuser softens every setting, keeping glare and flicker out of your line of sight.</p>
            <a href="#details" className="inline-flex items-center gap-2 font-medium border-b border-paper/30 pb-1 hover:border-paper transition-colors">See the difference <ArrowRight size={16} /></a>
          </div>
        </article>
        <article className="bg-sage/40 text-ink rounded-[32px] p-8 md:p-10 flex flex-col justify-between min-h-[280px] md:min-h-[400px] group border border-line/50">
          <span className="text-xs font-semibold tracking-widest text-muted">02</span>
          <div className="text-forest opacity-80 mt-6 mb-6 md:mt-12 md:mb-8 transform group-hover:scale-110 transition-transform origin-left"><BatteryCharging size={38} strokeWidth={1.5} /></div>
          <div className="mt-auto">
            <h3 className="text-2xl font-serif mb-3">Work, wire-free</h3>
            <p className="text-muted leading-relaxed mb-6">Up to 18 hours of cordless light. Move from desk to table without reaching for an outlet.</p>
            <strong className="text-3xl font-serif block">18<small className="text-base text-muted font-sans font-normal ml-1">hrs</small></strong>
          </div>
        </article>
        <article className="bg-amber/10 text-ink rounded-[32px] p-8 md:p-10 flex flex-col justify-between min-h-[280px] md:min-h-[400px] group border border-amber/20">
          <span className="text-xs font-semibold tracking-widest text-amber/80">03</span>
          <div className="text-amber opacity-80 mt-6 mb-6 md:mt-12 md:mb-8 transform group-hover:scale-110 transition-transform origin-left"><SlidersHorizontal size={38} strokeWidth={1.5} /></div>
          <div className="mt-auto">
            <h3 className="text-2xl font-serif mb-3 text-amber">Three moods. One dial.</h3>
            <p className="text-ink/70 leading-relaxed">From a warm evening glow to clear daylight. Tap to change tone, turn to dim.</p>
          </div>
        </article>
      </section>

      {/* Story Section */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-6 pb-24 md:pb-32 flex flex-row gap-4 md:gap-12 lg:gap-24 items-stretch md:items-center" id="details">
        <div className="flex-1 w-full relative rounded-[16px] md:rounded-[32px] overflow-hidden md:aspect-[4/3] min-h-[200px]">
          <Image src="/images/sol-lifestyle.png" alt="Sol lamp on a considered home desk" fill sizes="(max-width: 800px) 50vw, 58vw" className="object-cover" />
        </div>
        <div className="flex-1">
          <span className="text-[10px] md:text-sm font-semibold tracking-widest uppercase text-muted mb-2 md:mb-6 block">Made for real routines</span>
          <h2 className="text-[18px] md:text-4xl lg:text-5xl font-serif text-ink leading-tight mb-2 md:mb-6">From first idea to last edit.</h2>
          <p className="text-[12px] md:text-lg text-muted leading-relaxed mb-4 md:mb-8">Start with clean daylight for deep work. Wind down with a warm glow. Sol stays flexible when the day does not.</p>
          <ul className="flex flex-col gap-1.5 md:gap-4 mb-4 md:mb-10">
            {["Touch-and-turn control", "2700K · 4000K · 5000K", "USB-C fast charging", "Memory for your last setting"].map(item => (
              <li key={item} className="flex items-center gap-1.5 md:gap-3 text-[10px] md:text-base text-ink font-medium"><Check className="text-forest w-3 h-3 md:w-5 md:h-5" /> {item}</li>
            ))}
          </ul>
          <a className="inline-flex items-center gap-1 md:gap-2 font-medium text-ink border-b border-ink/30 pb-0.5 md:pb-1 hover:border-ink transition-colors text-[9px] md:text-base" href="#specs">Explore the details <ArrowDown className="w-3 h-3 md:w-4 md:h-4" /></a>
        </div>
      </section>

      {/* Detail Section */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-6 pb-24 md:pb-32 flex flex-row gap-4 md:gap-12 lg:gap-24 items-stretch md:items-center" id="specs">
        <div className="flex-1">
          <span className="text-[10px] md:text-sm font-semibold tracking-widest uppercase text-muted mb-2 md:mb-6 block">Quietly considered</span>
          <h2 className="text-[18px] md:text-4xl lg:text-5xl font-serif text-ink leading-tight mb-2 md:mb-6">Everything you need. Nothing you don’t.</h2>
          <p className="text-[12px] md:text-lg text-muted leading-relaxed mb-4 md:mb-10">A weighty, non-slip base. A tactile precision dial. A slim silhouette that leaves your desk feeling open.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6 pt-3 md:pt-8 border-t border-line">
            <div><strong className="block text-sm md:text-3xl font-serif text-ink mb-0.5 md:mb-1">720</strong><small className="text-muted text-[6px] md:text-sm font-medium uppercase tracking-wider block">lumens</small></div>
            <div><strong className="block text-sm md:text-3xl font-serif text-ink mb-0.5 md:mb-1">18h</strong><small className="text-muted text-[6px] md:text-sm font-medium uppercase tracking-wider block">battery</small></div>
            <div className="col-span-2 md:col-span-1"><strong className="block text-sm md:text-3xl font-serif text-ink mb-0.5 md:mb-1">95+</strong><small className="text-muted text-[6px] md:text-sm font-medium uppercase tracking-wider block">colour accuracy</small></div>
          </div>
        </div>
        <div className="flex-1 w-full relative rounded-[16px] md:rounded-[32px] overflow-hidden bg-sage/20 border border-line md:aspect-[4/3] min-h-[200px]">
          <Image src="/images/sol-detail.png" alt="Precision brightness dial on the Sol Lamp" fill sizes="(max-width: 800px) 50vw, 52vw" className="object-cover" />
        </div>
      </section>

      {/* Reviews */}
      <section className="max-w-[1200px] mx-auto px-6 pb-24 md:pb-32" id="reviews">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[10px] md:text-sm font-semibold tracking-widest uppercase text-muted mb-4 md:mb-6 block">Loved in the everyday</span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif text-ink leading-tight mb-6 md:mb-8">“The light my desk was missing.”</h2>
          <div className="inline-flex items-center gap-3 md:gap-4 bg-paper border border-line px-5 md:px-6 py-3 md:py-4 rounded-full">
            <strong className="text-2xl md:text-3xl font-serif text-ink">{product.rating}</strong>
            <div className="flex flex-col text-left">
              <span className="text-amber text-base md:text-lg tracking-widest leading-none mb-1">★★★★★</span>
              <small className="text-muted text-[10px] md:text-xs font-medium">Based on {product.reviewCount} verified reviews</small>
            </div>
          </div>
        </div>

        {/* Mobile Carousel View */}
        <div className="relative md:hidden h-[280px] w-full mb-8">
          {reviews.map((review, index) => (
            <article key={review.name} className={`absolute inset-0 bg-paper border border-line rounded-[24px] p-6 flex flex-col transition-opacity duration-700 ease-in-out ${activeReviewIndex === index ? 'opacity-100 pointer-events-auto z-10' : 'opacity-0 pointer-events-none z-0'}`}>
              <Quote className="text-muted opacity-30 mb-4" size={24} />
              <div className="text-amber tracking-widest mb-3 text-xs">★★★★★</div>
              <blockquote className="text-base text-ink font-serif leading-relaxed mb-6 flex-1">“{review.quote}”</blockquote>
              <div>
                <strong className="block font-medium text-ink text-sm">{review.name}</strong>
                <small className="text-muted text-xs">{review.meta}</small>
              </div>
            </article>
          ))}
          {/* Carousel Indicators */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {reviews.map((_, index) => (
              <button key={index} onClick={() => setActiveReviewIndex(index)} className={`w-2 h-2 rounded-full transition-colors ${activeReviewIndex === index ? 'bg-ink' : 'bg-line hover:bg-line/70'}`} aria-label={`Go to review ${index + 1}`} />
            ))}
          </div>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <article key={review.name} className="bg-paper border border-line rounded-[32px] p-8 flex flex-col">
              <Quote className="text-muted opacity-30 mb-6" size={32} />
              <div className="text-amber tracking-widest mb-4 text-sm">★★★★★</div>
              <blockquote className="text-lg text-ink font-serif leading-relaxed mb-8 flex-1">“{review.quote}”</blockquote>
              <div>
                <strong className="block font-medium text-ink">{review.name}</strong>
                <small className="text-muted text-sm">{review.meta}</small>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[800px] mx-auto px-6 pb-24 md:pb-32" id="faq">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold tracking-widest uppercase text-muted mb-6 block">Good to know</span>
          <h2 className="text-4xl md:text-5xl font-serif text-ink leading-tight mb-6">Questions, answered.</h2>
          <p className="text-lg text-muted mb-8">Still deciding? We are happy to help.</p>
          <a href="mailto:hello@woxly.com" className="inline-flex items-center gap-2 font-medium text-forest bg-sage/30 hover:bg-sage/50 transition-colors px-6 py-3 rounded-full"><Headphones size={18} /> Talk to our product team</a>
        </div>
        <div className="border-t border-line">
          {faqs.map((faq, index) => (
            <details key={faq.question} className="group border-b border-line [&_summary::-webkit-details-marker]:hidden" open={index === 0}>
              <summary className="flex justify-between items-center cursor-pointer py-6 font-serif text-lg md:text-2xl text-ink list-none">
                {faq.question}
                <ChevronDown className="text-muted transition-transform group-open:rotate-180" />
              </summary>
              <p className="pb-6 text-muted text-sm leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Sticky CTA */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 w-[70%] max-w-[420px] md:w-auto bg-paper/95 backdrop-blur-md border border-line p-2 rounded-full shadow-2xl flex items-center justify-between gap-4 z-[90] transition-all duration-300 ${stickyVisible ? "translate-y-0 opacity-100 visible" : "translate-y-10 opacity-0 invisible"}`}>
        <div className="flex flex-col pl-3 md:pl-5 shrink-0">
          <small className="text-muted text-[10px] md:text-xs font-semibold uppercase tracking-wider">{product.name}</small>
          <strong className="text-ink font-serif text-lg md:text-xl leading-none mt-1">{money(currentBundle.price)}</strong>
        </div>
        <button className="bg-ink text-paper px-6 md:px-8 py-3 rounded-full font-medium hover:bg-forest transition-colors shadow-md whitespace-nowrap shrink-0" onClick={addToCart}>
          Add to bag
        </button>
      </div>
    </main>
  );
}
