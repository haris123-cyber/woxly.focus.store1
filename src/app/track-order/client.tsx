"use client";

import { useState, FormEvent } from "react";
import { ArrowRight, Check, Package, Truck, PackageCheck } from "lucide-react";
import { demoOrder } from "@/data/catalog";
import { SiteShell, PageHero } from "@/components/site-shell";

export function TrackOrderClient() {
  const [tracked, setTracked] = useState(false);
  return (
    <SiteShell>
      <PageHero eyebrow="Order updates" title="Track your order" copy="Enter your order number and email address to see the latest delivery status." />
      <section className="max-w-4xl mx-auto px-6 pb-24 w-full flex flex-col md:flex-row gap-12 font-sans items-start">

        <form onSubmit={(e) => { e.preventDefault(); setTracked(true); }} className="flex-1 w-full bg-white border border-line rounded-3xl p-8 shadow-sm flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="order-number" className="text-sm font-semibold text-ink">Order number</label>
            <input id="order-number" required placeholder="e.g. WX-10482" className="w-full px-4 py-3 bg-white rounded-xl border border-line focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-all shadow-sm font-normal" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-semibold text-ink">Email address</label>
            <input id="email" type="email" required placeholder="you@example.com" className="w-full px-4 py-3 bg-white rounded-xl border border-line focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-all shadow-sm font-normal" />
          </div>
          <button type="submit" className="w-full py-4 bg-ink text-paper rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-forest transition-colors active:scale-[0.98] shadow-md mt-2">
            Track order <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="w-full md:w-[400px] shrink-0">
          {tracked ? (
            <OrderTracker />
          ) : (
            <div className="bg-sage/20 border border-sage/50 rounded-3xl p-8 flex flex-col items-start h-full">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-forest mb-6 shadow-sm"><Package className="w-6 h-6" /></div>
              <h2 className="text-xl font-serif font-bold text-ink mb-2">Your delivery, clearly tracked.</h2>
              <p className="text-forest/80 leading-relaxed">We’ll show every step from our studio to your door.</p>
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}

export function OrderTracker() {
  return (
    <div className="bg-white border border-line rounded-3xl p-8  flex flex-col font-sans">
      <div className="flex gap-4 items-start pb-6 border-b border-line mb-6">
        <div className="w-12 h-12 bg-sage/30 rounded-full flex items-center justify-center text-forest shrink-0"><Truck className="w-6 h-6" /></div>
        <div>
          <small className="text-muted text-xs font-bold uppercase tracking-wider block mb-1">{demoOrder.number}</small>
          <h2 className="text-xl font-medium text-ink mb-1">{demoOrder.status}</h2>
          <p className="text-forest text-sm font-medium">Estimated delivery {demoOrder.delivery}</p>
        </div>
      </div>

      <div className="relative pl-4">
        <div className="absolute top-2 bottom-6 left-[23px] w-0.5 bg-line" />

        <ul className="flex flex-col gap-6">
          <li className="relative flex gap-4 items-start">
            <div className="w-4 h-4 rounded-full bg-forest text-white flex items-center justify-center shrink-0 mt-1 z-10"><Check className="w-2.5 h-2.5" /></div>
            <div>
              <strong className="block text-ink font-medium text-sm">Order confirmed</strong>
              <small className="text-muted mt-0.5 block">14 Sep · 10:24 AM</small>
            </div>
          </li>
          <li className="relative flex gap-4 items-start">
            <div className="w-4 h-4 rounded-full border-2 border-line bg-white flex items-center justify-center shrink-0 mt-1 z-10" />
            <div>
              <strong className="block  text-muted font-medium text-sm">Shipped from our studio</strong>
              <small className="text-muted mt-0.5 block">16 Sep · 6:40 PM</small>
            </div>
          </li>
          <li className="relative flex gap-4 items-start">
            <div className="w-4 h-4 rounded-full border-2 border-line bg-white flex items-center justify-center shrink-0 mt-1 z-10" />
            <div>
              <strong className="block  text-muted font-medium text-sm">In transit</strong>
              <small className="text-muted mt-0.5 block">Arrived at Bengaluru facility</small>
            </div>
          </li>
          <li className="relative flex gap-4 items-start">
            <div className="w-4 h-4 rounded-full border-2 border-line bg-white flex items-center justify-center shrink-0 mt-1 z-10" />
            <div>
              <strong className="block text-muted font-medium text-sm">Delivered</strong>
              <small className="text-muted mt-0.5 block">Expected by 21 Sep</small>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
