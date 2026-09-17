"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowRight, BatteryCharging, Check, ChevronDown, CircleCheck, Headphones, Leaf, Menu, Minus, PackageCheck, Plus, Quote, ShieldCheck, ShoppingBag, Sparkles, Truck, X, Zap } from "lucide-react";
import { bundles, faqs, product, reviews } from "@/data/store";
import { Logo } from "./logo";

const money = (value: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

export default function Storefront() {
  const [variant, setVariant] = useState(product.variants[0]);
  const [bundle, setBundle] = useState(bundles[0]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [pincode, setPincode] = useState("");
  const [delivery, setDelivery] = useState<"idle" | "valid" | "invalid">("idle");
  const heroActionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = heroActionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setStickyVisible(!entry.isIntersecting), { threshold: 0.1 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = cartOpen || menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [cartOpen, menuOpen]);

  const savings = useMemo(() => product.compareAtPrice - product.price, []);
  const addToCart = () => {
    setCartQuantity((quantity) => quantity + bundle.quantity);
    setCartOpen(true);
  };
  const checkDelivery = () => setDelivery(/^\d{6}$/.test(pincode) ? "valid" : "invalid");

  return (
    <main id="top">
      <div className="announcement">
        <span>Free shipping across India</span><i /> <span>30-day returns</span>
      </div>

      <header className="header">
        <Logo />
        <nav className="desktopNav" aria-label="Main navigation">
          <a href="#benefits">Why Sol</a><a href="#details">Details</a><a href="#reviews">Reviews</a><a href="#faq">FAQ</a>
        </nav>
        <div className="headerActions">
          <button className="iconButton mobileOnly" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu size={21} /></button>
          <button className="cartButton" onClick={() => setCartOpen(true)} aria-label={`Open cart with ${cartQuantity} items`}>
            <ShoppingBag size={20} /><span className="desktopLabel">Bag</span>{cartQuantity > 0 && <b>{cartQuantity}</b>}
          </button>
        </div>
      </header>

      <section className="hero sectionShell" aria-labelledby="hero-title">
        <div className="productGallery">
          <div className="heroImageWrap">
            <Image src={product.images[activeImage].src} alt={product.images[activeImage].alt} fill priority={activeImage === 0} sizes="(max-width: 800px) 100vw, 58vw" className="heroImage" />
            <span className="imageBadge"><Sparkles size={14} /> New arrival</span>
            <div className="galleryCounter">0{activeImage + 1} / 0{product.images.length}</div>
          </div>
          <div className="thumbs" aria-label="Product images">
            {product.images.map((image, index) => (
              <button key={image.src} className={activeImage === index ? "thumb active" : "thumb"} onClick={() => setActiveImage(index)} aria-label={`Show image ${index + 1}`}>
                <Image src={image.src} alt="" fill sizes="88px" />
              </button>
            ))}
          </div>
        </div>

        <div className="heroCopy">
          <div className="eyebrow">{product.eyebrow}</div>
          <h1 id="hero-title">{product.headline}</h1>
          <p className="heroDescription">{product.description}</p>
          <a className="rating" href="#reviews"><span>★★★★★</span> {product.rating} <em>({product.reviewCount} reviews)</em></a>
          <div className="priceRow"><strong>{money(bundle.price)}</strong>{bundle.quantity === 1 && <><s>{money(product.compareAtPrice)}</s><span>Save {money(savings)}</span></>}</div>

          <div className="optionBlock">
            <div className="optionHeading"><span>Colour</span><strong>{variant.name}</strong></div>
            <div className="swatches">
              {product.variants.map((item) => <button key={item.id} onClick={() => setVariant(item)} className={variant.id === item.id ? "swatch active" : "swatch"} aria-label={`Choose ${item.name}`} aria-pressed={variant.id === item.id}><i style={{ background: item.swatch }} />{variant.id === item.id && <Check size={14} />}</button>)}
            </div>
          </div>

          <div className="optionBlock">
            <div className="optionHeading"><span>Choose your set</span><small>Better together, less per lamp</small></div>
            <div className="bundleGrid">
              {bundles.map((item) => (
                <button key={item.quantity} className={bundle.quantity === item.quantity ? "bundle active" : "bundle"} onClick={() => setBundle(item)}>
                  {item.badge && <b>{item.badge}</b>}<span>{item.label}</span><small>{item.caption}</small><strong>{money(item.price)}</strong>
                </button>
              ))}
            </div>
          </div>

          <div className="heroActions" ref={heroActionRef}>
            <button className="primaryButton" onClick={addToCart}>Add to bag <span>{money(bundle.price)}</span></button>
            <p><CircleCheck size={16} /> In stock · Ships in 24 hours</p>
          </div>
          <div className="trustMini"><span><Truck /> Free shipping</span><span><ShieldCheck /> 2-year warranty</span><span><PackageCheck /> Easy returns</span></div>
        </div>
      </section>

      <section className="promiseStrip" aria-label="Product promises">
        <span><Zap /> Flicker-free light</span><span><BatteryCharging /> 18-hour battery</span><span><Leaf /> Built to last</span><span><ShieldCheck /> 2-year warranty</span>
      </section>

      <section className="intro sectionShell" id="benefits">
        <div><span className="sectionKicker">Your space, in a better light</span><h2>Focus without the fluorescent feeling.</h2></div>
        <p>Sol brings crisp, comfortable task light to your desk in a form that feels more like furniture than equipment.</p>
      </section>

      <section className="benefitGrid sectionShell">
        <article className="benefitCard dark"><span>01</span><div className="orb"><div /></div><h3>Comfort for your eyes</h3><p>A recessed diffuser softens every setting, keeping glare and flicker out of your line of sight.</p><a href="#details">See the difference <ArrowRight /></a></article>
        <article className="benefitCard"><span>02</span><BatteryCharging className="lineIcon"/><h3>Work, wire-free</h3><p>Up to 18 hours of cordless light. Move from desk to table without reaching for an outlet.</p><strong>18<small> hrs</small></strong></article>
        <article className="benefitCard amber"><span>03</span><div className="sunRings"><i/><i/><i/></div><h3>Three moods. One dial.</h3><p>From a warm evening glow to clear daylight. Tap to change tone, turn to dim.</p></article>
      </section>

      <section className="story sectionShell" id="details">
        <div className="storyImage"><Image src="/images/sol-lifestyle.png" alt="Sol lamp on a considered home desk" fill sizes="(max-width: 800px) 100vw, 58vw" /></div>
        <div className="storyCopy"><span className="sectionKicker">Made for real routines</span><h2>From first idea to last edit.</h2><p>Start with clean daylight for deep work. Wind down with a warm glow. Sol stays flexible when the day does not.</p><ul><li><Check /> Touch-and-turn control</li><li><Check /> 2700K · 4000K · 5000K</li><li><Check /> USB-C fast charging</li><li><Check /> Memory for your last setting</li></ul><a className="textLink" href="#specs">Explore the details <ArrowDown /></a></div>
      </section>

      <section className="detailFeature sectionShell" id="specs">
        <div className="detailCopy"><span className="sectionKicker">Quietly considered</span><h2>Everything you need. Nothing you don’t.</h2><p>A weighty, non-slip base. A tactile precision dial. A slim silhouette that leaves your desk feeling open.</p><div className="statGrid"><div><strong>720</strong><small>lumens</small></div><div><strong>18h</strong><small>battery</small></div><div><strong>95+</strong><small>colour accuracy</small></div></div></div>
        <div className="detailImage"><Image src="/images/sol-detail.png" alt="Precision brightness dial on the Sol Lamp" fill sizes="(max-width: 800px) 100vw, 52vw" /></div>
      </section>

      <section className="reviewSection sectionShell" id="reviews">
        <div className="reviewHeading"><span className="sectionKicker">Loved in the everyday</span><h2>“The light my desk was missing.”</h2><div className="reviewSummary"><strong>{product.rating}</strong><span>★★★★★<small>Based on {product.reviewCount} verified reviews</small></span></div></div>
        <div className="reviewGrid">{reviews.map((review) => <article key={review.name}><Quote /><div className="stars">★★★★★</div><blockquote>{review.quote}</blockquote><strong>{review.name}</strong><small>{review.meta}</small></article>)}</div>
      </section>

      <section className="delivery sectionShell">
        <div><span className="sectionKicker">Delivery, made clear</span><h2>See when Sol arrives.</h2><p>Enter your 6-digit pincode for an estimated delivery window.</p></div>
        <div className="deliveryCard"><label htmlFor="pincode">Delivery pincode</label><div><input id="pincode" value={pincode} maxLength={6} inputMode="numeric" placeholder="e.g. 560001" onChange={(event) => { setPincode(event.target.value.replace(/\D/g, "")); setDelivery("idle"); }} /><button onClick={checkDelivery}>Check</button></div>{delivery === "valid" && <p className="deliveryResult valid"><CircleCheck /> Delivery available · Arrives in 3–5 days · COD available</p>}{delivery === "invalid" && <p className="deliveryResult invalid">Enter a valid 6-digit Indian pincode.</p>}</div>
      </section>

      <section className="faq sectionShell" id="faq">
        <div className="faqIntro"><span className="sectionKicker">Good to know</span><h2>Questions, answered.</h2><p>Still deciding? We are happy to help.</p><a href="mailto:hello@woxly.com"><Headphones /> Talk to our product team</a></div>
        <div className="accordion">{faqs.map((faq, index) => <details key={faq.question} open={index === 0}><summary>{faq.question}<ChevronDown /></summary><p>{faq.answer}</p></details>)}</div>
      </section>

      <section className="finalCta">
        <div><span className="sectionKicker">A brighter way to work</span><h2>Make space for focus.</h2><p>Sol Focus Lamp · {variant.name}</p></div>
        <button className="lightButton" onClick={addToCart}>Add to bag · {money(bundle.price)} <ArrowRight /></button>
      </section>

      <footer className="footer sectionShell"><div className="footerBrand"><Logo /><p>Considered objects for calmer, brighter everyday spaces.</p></div><div><h3>Explore</h3><a href="#benefits">Why Sol</a><a href="#details">Details</a><a href="#reviews">Reviews</a></div><div><h3>Help</h3><a href="#faq">FAQs</a><a href="mailto:hello@woxly.com">Contact</a><a href="#">Shipping & returns</a></div><div><h3>Stay in the light</h3><p>Notes on better spaces, sent occasionally.</p><form onSubmit={(event) => event.preventDefault()}><input type="email" required placeholder="Email address" aria-label="Email address"/><button aria-label="Subscribe"><ArrowRight /></button></form></div><div className="footerBottom"><span>© 2026 Woxly</span><span>Privacy · Terms · Accessibility</span><span>Designed with intention</span></div></footer>

      <div className={stickyVisible ? "stickyCta visible" : "stickyCta"}><div><small>{product.name}</small><strong>{money(bundle.price)}</strong></div><button onClick={addToCart}>Add to bag</button></div>

      <div className={cartOpen ? "overlay visible" : "overlay"} onClick={() => setCartOpen(false)} />
      <aside className={cartOpen ? "drawer open" : "drawer"} aria-hidden={!cartOpen} aria-label="Shopping bag">
        <div className="drawerHeader"><div><span>Your bag</span><small>{cartQuantity} {cartQuantity === 1 ? "item" : "items"}</small></div><button onClick={() => setCartOpen(false)} aria-label="Close bag"><X /></button></div>
        {cartQuantity === 0 ? <div className="emptyCart"><ShoppingBag /><h2>Your bag is waiting.</h2><p>Bring a little better light to your desk.</p><button onClick={() => setCartOpen(false)}>Continue shopping</button></div> : <><div className="cartProgress"><span><Check /> You unlocked free shipping</span><i><b /></i></div><div className="cartItem"><div className="cartImage"><Image src="/images/sol-hero.png" alt="" fill sizes="100px" /></div><div><h3>{product.name}</h3><p>{variant.name} · Set of {bundle.quantity}</p><strong>{money(bundle.price)}</strong><div className="quantity"><button onClick={() => setCartQuantity(Math.max(0, cartQuantity - 1))}><Minus /></button><span>{cartQuantity}</span><button onClick={() => setCartQuantity(cartQuantity + 1)}><Plus /></button></div></div><button className="remove" onClick={() => setCartQuantity(0)}>Remove</button></div><div className="drawerFooter"><div><span>Subtotal</span><strong>{money(bundle.price)}</strong></div><p>Shipping is free. Taxes included.</p><button>Secure checkout <ArrowRight /></button><span><ShieldCheck /> Secure checkout · Easy 30-day returns</span></div></>}
      </aside>

      <div className={menuOpen ? "mobileMenu open" : "mobileMenu"}><div><Logo /><button onClick={() => setMenuOpen(false)}><X /></button></div><nav>{[["Why Sol", "#benefits"], ["Details", "#details"], ["Reviews", "#reviews"], ["FAQ", "#faq"]].map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}<ArrowRight /></a>)}</nav><p>Free shipping · 30-day returns</p></div>
    </main>
  );
}
