"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CircleCheck, Minus, PackageCheck, Plus, ShieldCheck, ShoppingBag } from "lucide-react";
import { SiteShell, PageHero } from "@/components/site-shell";

const money = (value: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

export function CartClient() {
  const { items, updateQuantity, removeFromCart, cartQuantity } = useCart();
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <SiteShell>
      <PageHero eyebrow="Your selection" title="Shopping bag" />
      <section className="max-w-6xl mx-auto px-6 pb-24 w-full flex flex-col lg:flex-row gap-12 lg:gap-24 font-sans items-start">
        <div className="flex-1 w-full">
          {cartQuantity === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center border border-line rounded-3xl bg-white">
              <div className="w-16 h-16 rounded-full bg-sage flex items-center justify-center text-forest mb-6">
                <ShoppingBag size={28} />
              </div>
              <h2 className="font-serif text-2xl text-ink mb-2">Your bag is waiting.</h2>
              <p className="text-muted mb-8">Bring a little better light to your desk.</p>
              <Link href="/shop" className="bg-ink text-paper px-6 py-3 rounded-full font-medium hover:bg-forest transition-colors">Continue shopping</Link>
            </div>
          ) : (
            <>
              <div className="bg-sage/20 border border-sage/50 text-forest text-sm font-medium py-3 px-4 rounded-xl flex items-center gap-2 mb-8">
                <CircleCheck className="w-5 h-5 shrink-0" />
                <span className="flex-1">You have free delivery</span>
                <div className="w-24 h-1.5 bg-white rounded-full overflow-hidden shrink-0"><div className="w-full h-full bg-forest rounded-full" /></div>
              </div>
              
              <div className="flex flex-col">
                {items.map(item => (
                  <article key={item.id} className="flex gap-6 py-6 border-b border-line last:border-0">
                    <div className="relative w-32 h-32 bg-line/20 rounded-xl overflow-hidden shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <small className="text-muted text-xs font-bold uppercase tracking-wider block mb-1">{item.category}</small>
                          <h2 className="text-xl font-medium text-ink">{item.name}</h2>
                          <p className="text-muted mt-1">{item.variant ? `${item.variant} · ` : ""}{item.bundleLabel || "One item"}</p>
                        </div>
                        <div className="text-right">
                          <strong className="block text-lg font-medium text-ink">{money(item.price * item.quantity)}</strong>
                          <button onClick={() => removeFromCart(item.id)} className="text-xs font-bold uppercase tracking-wider text-muted hover:text-ink transition-colors mt-2">Remove</button>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 bg-paper border border-line rounded-full w-fit px-1 py-1 mt-4">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-line/50 text-ink transition-colors"><Minus className="w-4 h-4" /></button>
                        <span className="w-6 text-center font-medium text-sm text-ink">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-line/50 text-ink transition-colors"><Plus className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>

        {cartQuantity > 0 && (
          <aside className="w-full lg:w-96 shrink-0 bg-white border border-line rounded-3xl p-8 sticky top-32 shadow-sm">
            <h2 className="text-2xl font-serif font-bold text-ink mb-6">Order summary</h2>
            <div className="flex flex-col gap-4 text-ink mb-6">
              <div className="flex justify-between">
                <span className="text-muted">Subtotal</span>
                <strong className="font-medium">{money(subtotal)}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Delivery</span>
                <strong className="font-medium text-forest">Free</strong>
              </div>
              <div className="h-px bg-line/60 my-2" />
              <div className="flex justify-between items-end">
                <span className="font-medium text-lg">Total <small className="block text-muted text-xs font-normal mt-1">incl. taxes</small></span>
                <strong className="text-2xl font-medium">{money(subtotal)}</strong>
              </div>
            </div>
            <Link href="/checkout" className="w-full py-4 bg-ink text-paper rounded-xl font-medium text-center flex items-center justify-center gap-2 hover:bg-forest transition-colors active:scale-[0.98] shadow-md mb-4">
              Continue to checkout <ArrowRight className="w-4 h-4" />
            </Link>
          <p className="flex items-center justify-center gap-2 text-xs text-muted font-medium"><ShieldCheck className="w-4 h-4" /> Secure checkout · 30-day returns</p>
        </aside>
        )}
      </section>

      <section className="bg-sage/20 py-16 px-6 mt-12 flex justify-center text-center">
        <div className="flex flex-col items-center max-w-md">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-forest mb-4 shadow-sm"><PackageCheck className="w-6 h-6" /></div>
          <strong className="text-lg font-bold text-ink mb-2">Need help with your order?</strong>
          <p className="text-muted mb-6">Our product team is available Monday–Saturday to assist with any questions.</p>
          <Link href="/contact" className="px-6 py-3 border border-ink text-ink font-medium rounded-full hover:bg-ink hover:text-paper transition-colors">Contact us</Link>
        </div>
      </section>
    </SiteShell>
  );
}
