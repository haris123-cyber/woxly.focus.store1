"use client";

import { useState, FormEvent } from "react";
import { ArrowRight, Check, Package, Truck, PackageCheck } from "lucide-react";
import { demoOrder } from "@/data/catalog";
import { SiteShell, PageHero } from "@/components/site-shell";

export function TrackOrderClient() {
  return (
    <SiteShell>
      <PageHero eyebrow="Order updates" title="Track your order" copy="Latest delivery status for your order." />
      <section className="max-w-2xl mx-auto px-6 pb-24 w-full">
        <OrderTracker />
      </section>
    </SiteShell>
  );
}

export function OrderTracker({ hideBorder }: { hideBorder?: boolean }) {
  return (
    <div className={`flex flex-col font-sans ${hideBorder ? '' : 'bg-white border border-line rounded-3xl p-8'}`}>
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
