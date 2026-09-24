"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Menu, Minus, Plus, ShieldCheck, ShoppingBag, X } from "lucide-react";
import { product } from "@/data/store";
import { Logo } from "./logo";
import { useCart } from "@/context/CartContext";

const money = (value: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

export function Navbar() {
  const { items, cartQuantity, updateQuantity, removeFromCart, cartOpen, setCartOpen, menuOpen, setMenuOpen } = useCart();
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <>
      <div className="bg-forest text-cream text-[13px] font-medium py-2 px-4 flex justify-center items-center gap-4">
        <span>Free shipping across India</span>
        <i className="w-1 h-1 rounded-full bg-cream/30" />
        <span>30-day returns</span>
      </div>

      <header className="bg-paper border-b border-line sticky top-0 z-[100] relative">
        <div className="max-w-[1200px] mx-auto w-full px-6 py-4 flex justify-between items-center">
          <Logo />
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-ink" aria-label="Main navigation">
            <Link href="/" className="hover:text-muted transition-colors">Home</Link>
            <Link href="/shop" className="hover:text-muted transition-colors">Shop</Link>
            <Link href="/blog" className="hover:text-muted transition-colors">Blog</Link>

            <Link href="/contact" className="hover:text-muted transition-colors">Support</Link>
          </nav>
          <div className="flex items-center gap-4 relative z-[105]">
            <Link href="/account" className="flex items-center gap-2 hover:opacity-70 transition-opacity font-medium text-sm cursor-pointer relative z-[110]" aria-label="Account">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
            </Link>

            {/* Desktop Cart Button */}
            <button className="hidden md:flex items-center gap-2 hover:opacity-70 transition-opacity font-medium text-sm cursor-pointer relative z-[110]" onClick={() => { setCartOpen(true); }} aria-label={`Open cart with ${cartQuantity} items`}>
              <ShoppingBag size={20} className="pointer-events-none" />
              {cartQuantity > 0 && <b className="bg-ink text-paper text-[11px] h-5 min-w-[20px] rounded-full flex items-center justify-center px-1 font-bold pointer-events-none">{cartQuantity}</b>}
            </button>

            {/* Mobile Cart Link */}
            <Link href="/cart" onClick={() => { setCartOpen(false); setMenuOpen(false); }} className="md:hidden flex items-center gap-2 hover:opacity-70 transition-opacity font-medium text-sm cursor-pointer relative z-[110]" aria-label={`View cart with ${cartQuantity} items`}>
              <ShoppingBag size={20} className="pointer-events-none" />
              {cartQuantity > 0 && <b className="bg-ink text-paper text-[11px] h-5 min-w-[20px] rounded-full flex items-center justify-center px-1 font-bold pointer-events-none">{cartQuantity}</b>}
            </Link>
            <button className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-line/50 transition-colors cursor-pointer relative z-[110]" onClick={() => { setMenuOpen(true); }} aria-label="Open menu">
              <Menu size={21} className="pointer-events-none" />
            </button>
          </div>
        </div>
      </header>

      {/* Cart Drawer & Overlay (Desktop only) */}
      <div className={`hidden md:block fixed inset-0 bg-ink/30 backdrop-blur-sm z-[110] transition-opacity duration-300 ${cartOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`} onClick={() => setCartOpen(false)} />
      <aside className={`hidden md:flex fixed inset-y-0 right-0 w-[420px] bg-paper shadow-2xl z-[120] transform transition-transform duration-300 ease-in-out flex-col ${cartOpen ? "translate-x-0" : "translate-x-full pointer-events-none"}`} aria-hidden={!cartOpen} aria-label="Shopping bag">
        <div className="flex justify-between items-center px-6 py-5 border-b border-line shrink-0">
          <div>
            <span className="font-serif text-xl block text-ink">Your bag</span>
            <small className="text-muted text-sm">{cartQuantity} {cartQuantity === 1 ? "item" : "items"}</small>
          </div>
          <button onClick={() => setCartOpen(false)} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-line/50 transition-colors text-ink" aria-label="Close bag"><X size={20} /></button>
        </div>
        {cartQuantity === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-sage flex items-center justify-center text-forest mb-6">
              <ShoppingBag size={28} />
            </div>
            <h2 className="font-serif text-2xl text-ink mb-2">Your bag is waiting.</h2>
            <p className="text-muted mb-8">Bring a little better light to your desk.</p>
            <button onClick={() => setCartOpen(false)} className="bg-ink text-paper px-6 py-3 rounded-full font-medium hover:bg-forest transition-colors">Continue shopping</button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="bg-sage text-forest text-sm font-medium py-3 px-4 rounded-xl flex items-center gap-2 mb-6">
                <Check size={16} /> <span>You unlocked free shipping</span>
              </div>
              <div className="flex flex-col gap-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-start relative">
                    <div className="relative w-24 h-24 bg-line/30 rounded-xl overflow-hidden shrink-0">
                      <Image src={item.image} alt={item.name} fill sizes="100px" className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-ink text-lg">{item.name}</h3>
                      <p className="text-muted text-sm mb-2">{item.variant ? `${item.variant} · ` : ""}{item.bundleLabel || "One item"}</p>
                      <strong className="block text-ink mb-3">{money(item.price)}</strong>
                      <div className="flex items-center gap-4 bg-paper border border-line rounded-full w-fit px-1 py-1">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-line/50 text-ink"><Minus size={14} /></button>
                        <span className="w-4 text-center font-medium text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-line/50 text-ink"><Plus size={14} /></button>
                      </div>
                    </div>
                    <button className="absolute top-0 right-0 text-muted hover:text-ink text-xs uppercase font-bold tracking-wider" onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 border-t border-line shrink-0 bg-paper">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted font-medium">Subtotal</span>
                <strong className="text-xl text-ink">{money(subtotal)}</strong>
              </div>
              <p className="text-sm text-muted mb-6">Shipping is free. Taxes included.</p>
              <Link href="/checkout" onClick={() => setCartOpen(false)} className="w-full bg-ink text-paper py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-forest transition-colors text-lg">
                Secure checkout <ArrowRight size={18} />
              </Link>
              <span className="flex items-center justify-center gap-2 text-xs text-muted mt-4 font-medium"><ShieldCheck size={14} /> Secure checkout · Easy 30-day returns</span>
            </div>
          </>
        )}
      </aside>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-paper z-[120] transform transition-transform duration-300 flex flex-col ${menuOpen ? "translate-y-0" : "-translate-y-full pointer-events-none"}`}>
        <div className="flex justify-between items-center px-6 py-4 border-b border-line shrink-0">
          <Logo />
          <button onClick={() => setMenuOpen(false)} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-line/50 transition-colors text-ink"><X size={20} /></button>
        </div>
        <nav className="flex flex-col px-6 py-8 gap-6 flex-1">
          {[["Home", "/"], ["Shop", "/shop"], ["Blog", "/blog"], ["Support", "/contact"], ["Account", "/account"]].map(([label, href]) => (
            <Link key={label} href={href} onClick={() => setMenuOpen(false)} className="font-serif text-3xl text-ink flex items-center justify-between border-b border-line pb-4">
              {label} <ArrowRight className="text-muted" />
            </Link>
          ))}
        </nav>
        <p className="p-6 text-center text-sm font-medium text-muted bg-sage/20 border-t border-line">Free shipping · 30-day returns</p>
      </div>
    </>
  );
}
