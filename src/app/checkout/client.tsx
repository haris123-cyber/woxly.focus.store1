"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ChevronDown, ShieldCheck } from "lucide-react";
import { SiteShell } from "@/components/site-shell";

export function CheckoutClient() {
  return (
    <SiteShell>
      <section className="bg-sage/10 min-h-screen pb-24 font-sans">
        <div className="max-w-6xl mx-auto px-6 pt-12 flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
          <div className="flex-1 w-full flex flex-col gap-8">
            <div>
              <Link href="/cart" className="text-sm font-bold uppercase tracking-wider text-muted hover:text-ink transition-colors flex items-center gap-2 mb-8 w-fit"><ArrowLeft className="w-4 h-4" /> Back to bag</Link>
              <span className="text-forest text-sm font-bold uppercase tracking-wider mb-2 block">Secure checkout</span>
              <h1 className="text-3xl md:text-4xl font-serif text-ink">Where should we send it?</h1>
            </div>
            <CheckoutForm />
          </div>
          
          <aside className="w-full lg:w-[420px] shrink-0 bg-white border border-line rounded-3xl p-8 sticky top-12 shadow-sm">
            <h2 className="text-2xl font-serif font-bold text-ink mb-6">Order summary</h2>
            <div className="flex gap-4 items-center mb-8 pb-8 border-b border-line">
              <div className="relative w-20 h-24 bg-line/20 rounded-lg overflow-hidden shrink-0"><Image src="/images/sol-hero.png" alt="Sol Focus Lamp" fill className="object-cover" /></div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-ink">Sol Focus Lamp</h3>
                <p className="text-muted text-sm mt-1">Warm sand · Qty 1</p>
                <strong className="block text-ink font-medium mt-2">₹3,499</strong>
              </div>
            </div>
            <div className="flex flex-col gap-4 text-ink mb-6">
              <div className="flex justify-between"><span className="text-muted">Subtotal</span><strong className="font-medium">₹3,499</strong></div>
              <div className="flex justify-between"><span className="text-muted">Delivery</span><strong className="font-medium text-forest">Free</strong></div>
              <div className="h-px bg-line/60 my-2" />
              <div className="flex justify-between items-end"><span className="font-medium text-lg">Total</span><strong className="text-2xl font-medium">₹3,499</strong></div>
            </div>
            <div className="flex items-center gap-3 text-sm text-forest bg-sage/30 px-4 py-3 rounded-xl"><ShieldCheck className="w-5 h-5 shrink-0" /> Your payment details are encrypted and secure.</div>
          </aside>
        </div>
      </section>
    </SiteShell>
  );
}

function CheckoutForm() {
  const [payment, setPayment] = useState("upi");
  return (
    <form className="flex flex-col gap-12" onSubmit={e => e.preventDefault()}>
      <section className="bg-white border border-line rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-6 border-b border-line pb-4">
          <b className="w-8 h-8 rounded-full bg-ink text-paper flex items-center justify-center font-bold text-sm">1</b>
          <h2 className="text-xl font-medium text-ink">Contact</h2>
        </div>
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
            Email address
            <input type="email" placeholder="you@example.com" required className="w-full px-4 py-3 bg-white rounded-xl border border-line focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-all shadow-sm font-normal" />
          </label>
          <label className="flex items-center gap-3 text-sm text-ink cursor-pointer group mt-2">
            <div className="relative flex items-center justify-center w-5 h-5">
              <input type="checkbox" className="peer appearance-none w-5 h-5 border border-line rounded-md cursor-pointer checked:bg-ink checked:border-ink transition-colors" />
              <Check className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
            </div>
            <span className="group-hover:text-forest transition-colors">Send order updates on WhatsApp</span>
          </label>
        </div>
      </section>

      <section className="bg-white border border-line rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-6 border-b border-line pb-4">
          <b className="w-8 h-8 rounded-full bg-ink text-paper flex items-center justify-center font-bold text-sm">2</b>
          <h2 className="text-xl font-medium text-ink">Delivery address</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col gap-2 text-sm font-semibold text-ink">First name<input required className="w-full px-4 py-3 bg-white rounded-xl border border-line focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-all shadow-sm font-normal" /></label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-ink">Last name<input required className="w-full px-4 py-3 bg-white rounded-xl border border-line focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-all shadow-sm font-normal" /></label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-ink md:col-span-2">Address<input required className="w-full px-4 py-3 bg-white rounded-xl border border-line focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-all shadow-sm font-normal" /></label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-ink">City<input required className="w-full px-4 py-3 bg-white rounded-xl border border-line focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-all shadow-sm font-normal" /></label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-ink">Pincode<input inputMode="numeric" maxLength={6} required className="w-full px-4 py-3 bg-white rounded-xl border border-line focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-all shadow-sm font-normal" /></label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
            State
            <div className="relative">
              <select className="w-full px-4 py-3 bg-white rounded-xl border border-line focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-all shadow-sm font-normal appearance-none pr-10 cursor-pointer">
                <option>Karnataka</option><option>Maharashtra</option><option>Delhi</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted" />
            </div>
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-ink">Phone<input type="tel" required className="w-full px-4 py-3 bg-white rounded-xl border border-line focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-all shadow-sm font-normal" /></label>
        </div>
      </section>

      <section className="bg-white border border-line rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-6 border-b border-line pb-4">
          <b className="w-8 h-8 rounded-full bg-ink text-paper flex items-center justify-center font-bold text-sm">3</b>
          <h2 className="text-xl font-medium text-ink">Payment</h2>
        </div>
        <div className="flex flex-col gap-3">
          {[["upi", "UPI / QR"], ["card", "Credit or debit card"], ["cod", "Cash on delivery"]].map(([id, label]) => (
            <label key={id} className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${payment === id ? 'border-ink bg-sage/10' : 'border-line bg-white hover:border-ink/50'}`}>
              <div className="relative flex items-center justify-center w-5 h-5 shrink-0 mt-0.5">
                <input type="radio" name="payment" checked={payment === id} onChange={() => setPayment(id)} className="peer appearance-none w-5 h-5 border border-line rounded-full cursor-pointer checked:border-ink transition-colors" />
                <div className="absolute w-2.5 h-2.5 bg-ink rounded-full opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-ink">{label}</span>
                <small className="text-muted mt-1">{id === "cod" ? "Pay when your order arrives" : "Secure online payment"}</small>
              </div>
            </label>
          ))}
        </div>
      </section>

      <div className="flex flex-col gap-4">
        <Link href="/order-success" className="w-full py-4 bg-ink text-paper rounded-xl font-medium text-lg text-center flex items-center justify-center gap-2 hover:bg-forest transition-colors active:scale-[0.98] shadow-md">
          Place order · ₹3,499 <ArrowRight className="w-5 h-5" />
        </Link>
        <p className="text-sm text-muted text-center leading-relaxed">
          By placing your order, you agree to our <Link href="/terms" className="text-ink font-semibold hover:underline underline-offset-4">terms</Link> and <Link href="/privacy-policy" className="text-ink font-semibold hover:underline underline-offset-4">privacy policy</Link>.
        </p>
      </div>
    </form>
  );
}
