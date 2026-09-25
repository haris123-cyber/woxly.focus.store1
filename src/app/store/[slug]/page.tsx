"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, use } from "react";
import { ArrowDown, ArrowRight, BatteryCharging, Check, ChevronDown, CircleCheck, Eye, Headphones, PackageCheck, ShieldCheck, SlidersHorizontal, Truck, X, Heart, Flame, WashingMachine } from "lucide-react";
import { faqs, productsMap, reviews } from "@/data/store";
import { useCart } from "@/context/CartContext";
import { notFound, useRouter } from "next/navigation";

const money = (value: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

export default function Storefront({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const product = productsMap[resolvedParams.slug];

  if (!product) {
    notFound();
  }
  const router = useRouter();
  const { addToCart, setCartOpen, wishlist, toggleWishlist } = useCart();
  const [variant, setVariant] = useState(product.variants[0]);
  const [bundle, setBundle] = useState({ quantity: 1 });

  const dynamicBundles = useMemo(() => [
    { quantity: 1, label: "One item", caption: "For your desk", price: product.price },
    { quantity: 2, label: "Pair of items", caption: "Save ₹999", price: product.price * 2 - 999, badge: "Most popular" },
    { quantity: 3, label: "Studio set", caption: "Save ₹2,498", price: product.price * 3 - 2498, badge: "Best value" },
  ], [product.price]);

  const currentBundle = dynamicBundles.find(b => b.quantity === bundle.quantity) || dynamicBundles[0];

  const [activeImage, setActiveImage] = useState(0);
  const [stickyVisible, setStickyVisible] = useState(true);
  const [expandedBenefits, setExpandedBenefits] = useState<number[]>([0, 1, 2]);

  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<"idle" | "success" | "error">("idle");
  const handleCheckPincode = () => {
    setPincodeStatus(pincode.startsWith("9") ? "error" : "success");
  };

  const toggleBenefit = (index: number) => {
    setExpandedBenefits(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  // Review Section Interactivity State
  const [activeFilter, setActiveFilter] = useState<string | number>("all");
  const [lightboxState, setLightboxState] = useState<{ images: string[], index: number } | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isPurchasedUser, setIsPurchasedUser] = useState(false);
  const [sortOrder, setSortOrder] = useState<"recent" | "highest" | "lowest">("recent");

  const lightboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lightboxState && lightboxRef.current) {
      const slide = lightboxRef.current.children[lightboxState.index] as HTMLElement;
      if (slide) {
        lightboxRef.current.scrollTo({ left: slide.offsetLeft, behavior: 'instant' });
      }
    }
  }, [lightboxState?.index, lightboxState?.images]);

  const allReviewsPhotos = useMemo(() => reviews.flatMap(r => r.images || []), []);

  const heroActionRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const node = heroActionRef.current;
      if (node) {
        const rect = node.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        // Show sticky CTA if the main button is completely out of the safe view
        const isOutOfView = rect.top > (viewportHeight - 100) || rect.bottom < 50;
        setStickyVisible(isOutOfView);
      }
    };

    // Run immediately to set initial state
    handleScroll();

    // Re-check on scroll and resize
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Failsafe: check frequently for the first 2 seconds
    const interval = setInterval(handleScroll, 200);
    const timeout = setTimeout(() => clearInterval(interval), 2000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const handleAddToCart = () => {
    addToCart({
      id: `${resolvedParams.slug}-${variant.id}-${currentBundle.quantity}`,
      slug: resolvedParams.slug,
      name: product.name,
      price: Math.round(currentBundle.price / currentBundle.quantity),
      image: product.images[0].src,
      quantity: currentBundle.quantity,
      category: "Lighting", // Or product.category if it existed in productsMap, but fallback for now
      variant: variant.name,
      bundleLabel: currentBundle.label,
    });
    if (window.innerWidth < 768) {
      router.push("/cart");
    } else {
      setCartOpen(true);
    }
  };

  return (
    <main id="top" className="bg-paper min-h-screen text-ink pb-24">
      {/* Hero Section */}
      <section className="max-w-[1200px] mx-auto px-6 pt-0 md:pt-5 pb-6 md:pb-24 flex flex-col lg:flex-row gap-12 lg:gap-20" aria-labelledby="hero-title">

        {/* Product Gallery */}
        <div className="flex-1 max-w-[640px] w-full mx-auto">
          <div className="relative aspect-[4/5] bg-sage/30 rounded-sm overflow-hidden   -mx-6 md:mx-0 my-0 mb-4 border border-line">
            <button
              aria-label={`Save ${product.name}`}
              onClick={() => toggleWishlist(resolvedParams.slug)}
              className={`absolute top-6 right-6 z-20 w-12 h-12 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-105 ${wishlist.includes(resolvedParams.slug) ? 'bg-white text-amber' : 'bg-white/80 text-ink hover:bg-white hover:text-amber'}`}
            >
              <Heart className={`w-5 h-5 ${wishlist.includes(resolvedParams.slug) ? 'fill-current' : ''}`} />
            </button>

            <div
              ref={galleryRef}
              className="flex w-full h-full overflow-x-auto snap-x snap-mandatory  scrollbar-hide scroll-smooth"
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




        </div>

        {/* Hero Copy & Form */}
        <div className="flex-1 flex flex-col justify-center max-w-[480px] mx-auto lg:mx-0 sm:mt-5 -mt-10">
          <div className="flex justify-between items-start mb-4 gap-4">
            <div className="flex flex-col items-end gap-2 shrink-0">
              <div className="flex justify-start gap-2 mb-5">
                {product.badge && (
                  <span className="px-2 py-1 text-[10px] font-bold tracking-widest uppercase bg-[#7a2e2e] text-white">
                    {product.badge}
                  </span>
                )}
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <span className="px-2 py-1 text-[10px] font-bold tracking-widest uppercase bg-[green] text-white">
                    {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}% OFF
                  </span>
                )}
              </div>

            </div>
            <p className="flex justify-end items-center gap-1.5 text-sm text-[green] m-0 font-medium">
              <CircleCheck size={16} className="text-[green]" /> In stock
            </p>

          </div>

          <div className="text-[12px] font-semibold tracking-widest uppercase text-muted mt-2">{product.eyebrow}</div>

          <h1 id="hero-title" className="text-2xl md:text-5xl font-serif text-ink mb-4 leading-tight tracking-tight">{product.name}</h1>
          <p className="text-muted text-sm leading-relaxed mb-2">{product.description}</p>
          <a className="flex items-center gap-2 text-sm font-medium hover:text-muted transition-colors w-fit mb-4" href="#reviews">
            <span className="text-amber text-lg tracking-widest">★★★★★</span> <strong className="text-ink">{product.rating}</strong> <em className="text-muted not-italic">({product.reviewCount} reviews)</em>
          </a>

          <div className="flex items-center gap-3 mb-0 mt-2 pb-10 border-b border-line relative">
            <strong className="text-4xl font-serif text-ink">{money(currentBundle.price)}</strong>
            {currentBundle.quantity === 1 && (
              <div>
                <div className="flex flex-col text-md">
                  <s className="text-black text-xl font-serif ">{money(product.compareAtPrice)}</s>
                  <span className="text-[green] text-md font-semibold font-serif">Save {money(product.compareAtPrice - product.price)}</span>
                </div>
              </div>
            )}
            {product.urgencyMessage && (
              <div className="absolute -bottom-6 right-0 bg-sage text-forest px-6 py-3 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm border border-forest/20 animate-pulse">
                <Flame size={14} className="fill-current text-red-600" /> {product.urgencyMessage}
              </div>
            )}
          </div>

          <div className="mb-10 mt-10">

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

          <div className="mb-8">
            <div className="flex justify-between items-end mb-3">
              <span className="text-sm font-semibold tracking-widest uppercase text-muted">Delivery</span>
              <small className="text-muted text-xs font-medium">Check availability</small>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter pincode"
                maxLength={6}
                value={pincode}
                onChange={(e) => {
                  setPincode(e.target.value.replace(/\D/g, ''));
                  setPincodeStatus("idle");
                }}
                className="flex-1 bg-white border border-line rounded-xl px-4 py-3 text-ink focus:outline-none focus:border-ink transition-colors text-sm shadow-sm"
              />
              <button
                onClick={handleCheckPincode}
                disabled={pincode.length !== 6}
                className="bg-ink text-paper px-6 py-3 rounded-xl font-medium text-sm hover:bg-forest transition-colors disabled:bg-line/50 disabled:text-muted disabled:cursor-not-allowed shadow-sm"
              >
                Check
              </button>
            </div>
            {pincodeStatus === "success" && (
              <p className="text-forest text-xs font-medium mt-3 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1">
                <Check size={14} /> Delivery available to {pincode} (Usually 2-4 days)
              </p>
            )}
            {pincodeStatus === "error" && (
              <p className="text-red-500 text-xs font-medium mt-3 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1">
                <X size={14} /> Sorry, we don't deliver to {pincode} yet.
              </p>
            )}
          </div>

          <div className="mb-5" ref={heroActionRef}>
            <button className="w-full bg-ink text-paper py-5 rounded-full font-medium flex justify-center items-center gap-3 text-lg hover:bg-forest hover:-translate-y-0.5 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]" onClick={handleAddToCart}>
              Add to bag <span className="opacity-70 font-normal">·</span> <span>{money(currentBundle.price)}</span>
            </button>
          </div>

        </div>
      </section>
      <div className="relative my-2 border-y  mb-10 border-line/50">
        {/* Gradient fade to indicate scrollability on mobile */}
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#fcfbf9] to-transparent pointer-events-none z-10 md:hidden" />

        <div className="flex md:justify-center items-start py-6 gap-6 overflow-x-auto scrollbar-none snap-x px-6 md:px-0 text-[10px] md:text-xs font-semibold uppercase tracking-wider text-ink relative">
          <span className="flex flex-col items-center gap-3 shrink-0 snap-center min-w-[100px] text-center">
            <div className="w-14 h-14 bg-sage/40 rounded-full flex items-center justify-center text-forest shadow-sm"><Truck size={24} strokeWidth={1.5} /></div>
            Free shipping
          </span>
          <span className="flex flex-col items-center gap-3 shrink-0 snap-center min-w-[100px] text-center">
            <div className="w-14 h-14 bg-sage/40 rounded-full flex items-center justify-center text-forest shadow-sm"><ShieldCheck size={24} strokeWidth={1.5} /></div>
            2-year warranty
          </span>
          <span className="flex flex-col items-center gap-3 shrink-0 snap-center min-w-[100px] text-center">
            <div className="w-14 h-14 bg-sage/40 rounded-full flex items-center justify-center text-forest shadow-sm"><PackageCheck size={24} strokeWidth={1.5} /></div>
            Easy returns
          </span>
          <span className="flex flex-col items-center gap-3 shrink-0 snap-center min-w-[100px] text-center">
            <div className="w-14 h-14 bg-sage/40 rounded-full flex items-center justify-center text-forest shadow-sm"><WashingMachine size={24} strokeWidth={1.5} /></div>
            Easy to wash
          </span>
          <span className="flex flex-col items-center gap-3 shrink-0 snap-center min-w-[100px] text-center">
            <div className="w-14 h-14 bg-sage/40 rounded-full flex items-center justify-center text-forest shadow-sm"><PackageCheck size={24} strokeWidth={1.5} /></div>
            Easy returns
          </span>
        </div>
      </div>




      {/* Benefits Grid */}
      <section className="max-w-[1200px] mx-auto px-6 pb-6 md:pb-32 grid grid-cols-1 md:grid-cols-3 gap-2">
        <article className={`bg-ink text-paper rounded-xl flex flex-col cursor-pointer transition-all duration-300 border border-transparent ${expandedBenefits.includes(0) ? "p-8  md:p-10 min-h-[280px] md:min-h-[400px]" : "p-3 pl-5 pr-5   md:p-8"}`} onClick={() => toggleBenefit(0)}>
          <div className={`flex justify-between items-center ${expandedBenefits.includes(0) ? "mb-4" : ""}`}>
            <div className="text-paper opacity-80 transition-transform origin-left hover:scale-110"><Eye size={28} strokeWidth={1.5} /></div>
            <ChevronDown className={`transition-transform duration-300 opacity-50 ${expandedBenefits.includes(0) ? 'rotate-180' : ''}`} size={24} />
          </div>
          <div className={`mt-auto transition-all duration-500 overflow-hidden ${expandedBenefits.includes(0) ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <h3 className="text-2xl font-serif mb-3">Comfort for your eyes</h3>
            <p className="text-paper/70 leading-relaxed mb-6">A recessed diffuser softens every setting, keeping glare and flicker out of your line of sight.</p>
            <a href="#details" className="inline-flex items-center gap-2 font-medium border-b border-paper/30 pb-1 hover:border-paper transition-colors" onClick={e => e.stopPropagation()}>See the difference <ArrowRight size={16} /></a>
          </div>
        </article>

        <article className={`bg-sage/40 text-ink rounded-xl flex flex-col cursor-pointer transition-all duration-300 border border-line/50 hover:border-forest/30 ${expandedBenefits.includes(1) ? "p-8 md:p-10 min-h-[280px] md:min-h-[400px]" : "p-3 pl-5 pr-5   md:p-8"}`} onClick={() => toggleBenefit(1)}>
          <div className={`flex justify-between items-center ${expandedBenefits.includes(1) ? "mb-4" : ""}`}>
            <div className="text-forest opacity-80 transition-transform origin-left hover:scale-110"><BatteryCharging size={28} strokeWidth={1.5} /></div>
            <ChevronDown className={`transition-transform duration-300 opacity-50 ${expandedBenefits.includes(1) ? 'rotate-180' : ''}`} size={24} />
          </div>
          <div className={`mt-auto transition-all duration-500 overflow-hidden ${expandedBenefits.includes(1) ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <h3 className="text-2xl font-serif mb-3">Work, wire-free</h3>
            <p className="text-muted leading-relaxed mb-6">Up to 18 hours of cordless light. Move from desk to table without reaching for an outlet.</p>
            <strong className="text-3xl font-serif block">18<small className="text-base text-muted font-sans font-normal ml-1">hrs</small></strong>
          </div>
        </article>

        <article className={`bg-amber/10 text-ink rounded-xl flex flex-col cursor-pointer transition-all duration-300 border border-amber/20 hover:border-amber/30 ${expandedBenefits.includes(2) ? "p-8 md:p-10 min-h-[280px] md:min-h-[400px]" : "p-3 pl-5 pr-5   md:p-8"}`} onClick={() => toggleBenefit(2)}>
          <div className={`flex justify-between items-center ${expandedBenefits.includes(2) ? "mb-4" : ""}`}>
            <div className="text-amber opacity-80 transition-transform origin-left hover:scale-110"><SlidersHorizontal size={28} strokeWidth={1.5} /></div>
            <ChevronDown className={`transition-transform duration-300 opacity-50 ${expandedBenefits.includes(2) ? 'rotate-180' : ''}`} size={24} />
          </div>
          <div className={`mt-auto transition-all duration-500 overflow-hidden ${expandedBenefits.includes(2) ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <h3 className="text-2xl font-serif mb-3 text-amber">Three moods. One dial.</h3>
            <p className="text-ink/70 leading-relaxed">From a warm evening glow to clear daylight. Tap to change tone, turn to dim.</p>
          </div>
        </article>
      </section>

      {/* Story Section */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-6 pb-2 md:pb-2" id="details">
        <div className="w-full relative sm:hidden block rounded-[16px] md:rounded-[32px] overflow-hidden">
          <Image
            src="/images/feature-banner11.png"
            alt="Sol lamp features"
            width={1200}
            height={800}
            sizes="100vw"
            className="w-full h-auto object-contain"
            priority
          />
        </div>
        <div className="w-full relative hidden sm:block rounded-[16px] md:rounded-[32px] overflow-hidden">
          <Image
            src="/images/feature-banner11.png"
            alt="Sol lamp features"
            width={1200}
            height={800}
            sizes="100vw"
            className="w-full h-auto object-contain"
            priority
          />
        </div>

      </section>

      {/* Detail Section */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-6 pb-24 md:pb-32" id="details">
        <div className="w-full relative sm:hidden block rounded-[16px] md:rounded-[32px] overflow-hidden">
          <Image
            src="/images/feature-banner12.png"
            alt="Sol lamp features"
            width={1200}
            height={800}
            sizes="100vw"
            className="w-full h-auto object-contain"
            priority
          />
        </div>
        <div className="w-full relative hidden sm:block rounded-[16px] md:rounded-[32px] overflow-hidden">
          <Image
            src="/images/feature-banner12.png"
            alt="Sol lamp features"
            width={1200}
            height={800}
            sizes="100vw"
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      </section>

      {/* Reviews */}
      <section className="max-w-[1200px] mx-auto px-6 pb-24 md:pb-32" id="reviews">

        <div className="flex flex-row justify-between items-start mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif text-ink mb-1 md:mb-2">Customer Reviews</h2>
            <p className="text-muted text-xs md:text-sm">Real feedback from real customers</p>
          </div>
          <button onClick={() => setIsReviewModalOpen(true)} className="px-4 py-2 md:px-6 md:py-2.5 rounded-lg bg-ink text-paper text-sm md:text-base font-medium hover:bg-ink/90 transition-colors shrink-0">
            Write a review
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-10 lg:gap-16">
          {/* Left Column: Summary */}
          <div>
            {/* Summary Card */}
            <div className="border border-line rounded-2xl p-6 mb-8 flex flex-col">
              <div className="flex flex-row gap-6 md:flex-col md:gap-0 mb-6 md:mb-8 border-b md:border-b-0 border-line pb-6 md:pb-0">
                <div className="flex-1 md:flex-none">
                  <div className="flex items-baseline gap-2 mb-1 md:mb-2">
                    <span className="text-4xl md:text-5xl font-serif text-ink">4.6</span>
                    <span className="text-ink font-medium text-xs md:text-base">out of 5</span>
                  </div>
                  <div className="text-amber tracking-widest text-base md:text-lg mb-2">★★★★★</div>
                  <p className="text-muted text-xs md:text-sm">Based on 88 reviews</p>
                </div>

                {/* Progress Bars */}
                <div className="flex-[1.5] md:flex-none flex flex-col gap-2 md:gap-3">
                  {[
                    { stars: 5, count: 68, width: "77%" },
                    { stars: 4, count: 15, width: "17%" },
                    { stars: 3, count: 4, width: "5%" },
                    { stars: 2, count: 1, width: "1%" },
                    { stars: 1, count: 0, width: "0%" },
                  ].map((bar) => (
                    <div key={bar.stars} className="flex items-center gap-2 md:gap-3 text-xs md:text-sm">
                      <span className="w-5 md:w-6 text-ink font-medium flex items-center justify-between">{bar.stars} <span className="text-[8px] md:text-[10px]">★</span></span>
                      <div className="flex-1 h-2 md:h-2.5 bg-line/50 rounded-full overflow-hidden">
                        <div className="h-full bg-[#f6b759] rounded-full" style={{ width: bar.width }}></div>
                      </div>
                      <span className="w-5 md:w-6 text-right text-muted">{bar.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs md:text-sm text-[green] font-medium">
                <CircleCheck size={16} className="text-[green] shrink-0" />
                All reviews are from verified buyers
              </div>
            </div>

            {/* Customer Photos */}
            {allReviewsPhotos.length > 0 && (
              <div className="mb-8">
                <div className="flex justify-between items-end mb-4">
                  <h3 className="font-semibold text-ink">Customer photos</h3>
                  <button onClick={() => setLightboxState({ images: allReviewsPhotos, index: 0 })} className="text-[13px] font-medium text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-1">
                    View all photos <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
                  {allReviewsPhotos.slice(0, 4).map((img, i) => (
                    <button key={i} onClick={() => setLightboxState({ images: allReviewsPhotos, index: i })} className="relative w-[72px] h-[72px] md:w-20 md:h-20 rounded-xl overflow-hidden shrink-0 border border-line snap-start hover:opacity-90 transition-opacity">
                      <Image src={img} alt={`Customer photo ${i + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Reviews List */}
          <div>

            {/* Filters & Sort */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div className="flex flex-nowrap md:flex-wrap gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
                <button onClick={() => setActiveFilter("all")} className={`shrink-0 px-4 py-1.5 text-sm font-medium rounded-full ${activeFilter === "all" ? "bg-ink text-paper" : "border border-line text-ink hover:bg-line/20"}`}>All (88)</button>
                <button onClick={() => setActiveFilter(5)} className={`shrink-0 px-2 py-1 text-[12px] font-medium rounded-full ${activeFilter === 5 ? "bg-ink text-paper" : "border border-line text-ink hover:bg-line/20"}`}>5 ★ (68)</button>
                <button onClick={() => setActiveFilter(4)} className={`shrink-0 px-2 py-1 text-[12px] font-medium rounded-full ${activeFilter === 4 ? "bg-ink text-paper" : "border border-line text-ink hover:bg-line/20"}`}>4 ★ (15)</button>
                <button onClick={() => setActiveFilter(3)} className={`shrink-0 px-2 py-1 text-[12px] font-medium rounded-full ${activeFilter === 3 ? "bg-ink text-paper" : "border border-line text-ink hover:bg-line/20"}`}>3 ★ (4)</button>
                <button onClick={() => setActiveFilter(2)} className={`shrink-0 px-2 py-1 text-[12px] font-medium rounded-full ${activeFilter === 2 ? "bg-ink text-paper" : "border border-line text-ink hover:bg-line/20"}`}>2 ★ (1)</button>
                <button onClick={() => setActiveFilter(1)} className={`shrink-0 px-2 py-1 text-[12px] font-medium rounded-full ${activeFilter === 1 ? "bg-ink text-paper" : "border border-line text-ink hover:bg-line/20"}`}>1 ★ (0)</button>
              </div>
              <div className="relative shrink-0 ">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as "recent" | "highest" | "lowest")}
                  className="appearance-none bg-transparent border border-line text-ink text-sm font-medium rounded-sm hover:bg-line/20 outline-none cursor-pointer pl-4 pr-10 py-1.5 focus:border-ink transition-colors w-full"
                >
                  <option value="recent">Most recent</option>
                  <option value="highest">Highest rated</option>
                  <option value="lowest">Lowest rated</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-ink" />
              </div>
            </div>

            {/* Review Cards */}
            <div className="flex flex-col gap-4">
              {reviews
                .filter(r => activeFilter === "all" || r.rating === activeFilter)
                .sort((a, b) => {
                  if (sortOrder === "highest") return b.rating - a.rating;
                  if (sortOrder === "lowest") return a.rating - b.rating;
                  return 0;
                })
                .map((review, index) => (
                  <article key={index} className="border border-line rounded-2xl p-6">
                    {/* Review Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-sage flex items-center justify-center text-ink font-serif text-lg shrink-0">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <strong className="block text-ink text-sm font-medium">{review.name}</strong>
                          <div className="flex items-center gap-1 mt-0.5">
                            <CircleCheck size={12} className="text-[green]" />
                            <small className="text-[green] text-xs">{review.meta}</small>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-muted text-sm">{review.date}</span>
                      </div>
                    </div>

                    {/* Review Body */}
                    <div className="text-[#f6b759] text-sm mb-2">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</div>
                    <h3 className="text-base font-semibold text-ink mb-1.5">{review.title}</h3>
                    <p className="text-ink/80 text-sm leading-relaxed mb-4">{review.quote}</p>

                    {review.images && review.images.length > 0 && (
                      <div className="flex gap-2 mb-4">
                        {review.images.slice(0, 3).map((img, i) => (
                          <div key={i} onClick={() => setLightboxState({ images: review.images!, index: i })} className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-line cursor-pointer hover:opacity-80 transition-opacity">
                            <Image src={img} alt="Review attachment" fill className="object-cover" />
                          </div>
                        ))}
                        {review.images.length > 3 && (
                          <div onClick={() => setLightboxState({ images: review.images!, index: 3 })} className="w-16 h-16 rounded-lg bg-sage flex items-center justify-center text-ink text-sm font-medium shrink-0 cursor-pointer hover:bg-sage/80 transition-colors">
                            +{review.images.length - 3}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Review Footer */}
                    <div className="flex items-center gap-4 text-sm font-medium text-muted mt-2">
                      <button className="flex items-center gap-1.5 hover:text-ink transition-colors">
                        👍 Helpful ({review.helpfulCount})
                      </button>
                      <button className="flex items-center gap-1.5 hover:text-ink transition-colors">
                        👎 ({review.unhelpfulCount})
                      </button>
                    </div>
                  </article>
                ))}
            </div>
          </div>
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
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 w-[70%] max-w-[420px] md:w-auto bg-paper/95 backdrop-blur-md border border-line p-2 rounded-full shadow-2xl flex items-center justify-between gap-4 z-[90] transform transition-all duration-300 ${stickyVisible ? "translate-y-0 opacity-100 visible" : "translate-y-10 opacity-0 invisible"}`}>
        <div className="flex flex-col pl-3 md:pl-5 shrink-0">
          <small className="text-muted text-[10px] md:text-xs font-semibold uppercase tracking-wider">{product.name}</small>
          <strong className="text-ink font-serif text-lg md:text-xl leading-none mt-1">{money(currentBundle.price)}</strong>
        </div>
        <button className="bg-ink text-paper px-6 md:px-8 py-3 rounded-full font-medium hover:bg-forest transition-colors shadow-md whitespace-nowrap shrink-0" onClick={handleAddToCart}>
          Add to bag
        </button>
      </div>

      {/* Lightbox Modal */}
      {lightboxState && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 backdrop-blur-sm" onClick={() => setLightboxState(null)}>
          <button className="absolute top-4 right-4 md:top-6 md:right-6 text-paper/70 hover:text-white transition-colors z-[110] p-2" onClick={(e) => { e.stopPropagation(); setLightboxState(null); }}><X size={32} /></button>
          <div
            ref={lightboxRef}
            className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth"
            onClick={e => e.stopPropagation()}
          >
            {lightboxState.images.map((src, i) => (
              <div key={src + i} className="relative w-full h-full shrink-0 snap-center flex items-center justify-center p-4">
                <div className="relative w-full max-w-5xl aspect-square md:aspect-video">
                  <Image src={src} alt={`Fullscreen image ${i + 1}`} fill className="object-contain" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Write a Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/50 backdrop-blur-sm p-4" onClick={() => setIsReviewModalOpen(false)}>
          <div className="bg-paper rounded-2xl w-full max-w-lg p-6 md:p-8 relative" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-muted hover:text-ink transition-colors" onClick={() => setIsReviewModalOpen(false)}><X size={24} /></button>
            <h3 className="text-2xl font-serif text-ink mb-6">Write a review</h3>
            <form onSubmit={e => { e.preventDefault(); setIsReviewModalOpen(false); alert("Thank you for your review!"); }}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-ink mb-2">Rating</label>
                <div className="text-amber tracking-widest text-2xl cursor-pointer">★★★★★</div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-ink mb-2">Review Title</label>
                <input type="text" required className="w-full border border-line rounded-lg px-4 py-2 outline-none focus:border-ink transition-colors" placeholder="Summarize your experience" />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-ink mb-2">Review</label>
                <textarea required rows={4} className="w-full border border-line rounded-lg px-4 py-2 outline-none focus:border-ink transition-colors resize-none" placeholder="What did you like or dislike?"></textarea>
              </div>
              <div className="mb-4">
                <label className="flex items-center gap-2 text-sm font-medium text-ink cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPurchasedUser}
                    onChange={(e) => setIsPurchasedUser(e.target.checked)}
                    className="w-4 h-4 rounded border-line text-ink focus:ring-ink"
                  />
                  I have purchased this product
                </label>
              </div>
              <div className="mb-6">
                <label className={`block text-sm font-medium mb-2 ${isPurchasedUser ? 'text-ink' : 'text-muted'}`}>Add Photos (Optional)</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  disabled={!isPurchasedUser}
                  className={`w-full text-sm text-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold transition-colors ${isPurchasedUser ? 'file:bg-sage file:text-ink hover:file:bg-sage/80 cursor-pointer' : 'file:bg-line/50 file:text-muted cursor-not-allowed opacity-60'}`}
                />
              </div>
              <button type="submit" className="w-full bg-ink text-paper font-medium rounded-lg px-4 py-3 hover:bg-ink/90 transition-colors">Submit Review</button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
