"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { Logo } from "./logo";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="sitePage">
      <div className="announcement"><span>Free shipping across India</span><i /><span>30-day returns</span></div>
      <header className="header siteHeader">
        <Logo />
        <nav className="desktopNav" aria-label="Main navigation">
          <Link href="/">Home</Link><Link href="/shop">Shop</Link><Link href="/about">Our story</Link><Link href="/blog">Journal</Link><Link href="/contact">Contact</Link>
        </nav>
        <div className="utilityNav">
          <Link href="/search" aria-label="Search"><Search /></Link>
          <Link href="/wishlist" aria-label="Wishlist"><Heart /></Link>
          <Link href="/account" aria-label="Account"><User /></Link>
          <Link href="/cart" aria-label="Cart"><ShoppingBag /></Link>
          <button className="iconButton mobileOnly" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu /></button>
        </div>
      </header>
      {children}
      <footer className="footer sectionShell innerFooter">
        <div className="footerBrand"><Logo /><p>Considered objects for calmer, brighter everyday spaces.</p></div>
        <div><h3>Shop</h3><Link href="/shop">All products</Link><Link href="/wishlist">Wishlist</Link><Link href="/track-order">Track order</Link></div>
        <div><h3>Help</h3><Link href="/faq">FAQs</Link><Link href="/shipping-delivery">Shipping</Link><Link href="/returns-refunds">Returns</Link><Link href="/contact">Contact</Link></div>
        <div><h3>Company</h3><Link href="/about">About</Link><Link href="/blog">Journal</Link><Link href="/privacy-policy">Privacy</Link><Link href="/terms">Terms</Link></div>
        <div className="footerBottom"><span>© 2026 Woxly</span><span>Secure payments · Thoughtful delivery</span><span>Made for focused brands</span></div>
      </footer>
      <div className={menuOpen ? "mobileMenu open" : "mobileMenu"}>
        <div><Logo /><button onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></button></div>
        <nav>{[["Home", "/"], ["Shop", "/shop"], ["Our story", "/about"], ["Journal", "/blog"], ["Contact", "/contact"], ["My account", "/account"]].map(([label, href]) => <Link key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</Link>)}</nav>
        <p>Free shipping · 30-day returns</p>
      </div>
    </div>
  );
}

export function PageHero({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return <section className="pageHero sectionShell"><span className="sectionKicker">{eyebrow}</span><h1>{title}</h1>{copy && <p>{copy}</p>}</section>;
}
