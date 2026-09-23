"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { SiteShell } from "@/components/site-shell";
import { AccountNav, OrderRow } from "@/components/account-nav";
import { OrderTracker } from "@/app/track-order/client";

export function OrderDetailsClient({ orderId }: { orderId: string }) {
  const { orders } = useCart();
  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return (
      <SiteShell>
        <section className="bg-sage/10 min-h-screen pb-24 font-sans pt-12 text-center flex flex-col items-center justify-center">
          <h1 className="text-4xl font-serif text-ink mb-4">Order not found</h1>
          <Link href="/account/orders" className="text-forest font-medium hover:underline">
            Back to my orders
          </Link>
        </section>
      </SiteShell>
    );
  }

  const money = (value: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

  return (
    <SiteShell>
      <section className="bg-sage/10 min-h-screen pb-24 font-sans">
        <div className="max-w-6xl mx-auto px-6 pt-12">

          <div className="mb-12">
            <Link className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-muted hover:text-ink transition-colors mb-6" href="/account/orders">
              <ArrowLeft className="w-4 h-4" /> Back to orders
            </Link>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-line">
              <div>
                <span className="text-forest text-sm font-bold uppercase tracking-wider mb-2 block">Order {order.id}</span>
                <h1 className="text-4xl font-serif text-ink">{order.status}</h1>
                <p className="text-muted mt-2 text-lg">Placed on {order.date}</p>
              </div>
              <Link href="/track-order" className="inline-flex items-center gap-2 bg-ink text-paper px-6 py-3 rounded-full text-sm font-medium hover:bg-forest transition-colors w-fit">
                Track delivery <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            <aside className="w-full lg:w-64 shrink-0 hidden lg:block">
              <AccountNav active="orders" />
            </aside>

            <div className="flex-1 w-full grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-8">

              <div className="flex flex-col gap-8">
                <div className="bg-white border border-line rounded-3xl p-8 shadow-sm">
                  <h2 className="text-xl font-medium text-ink mb-2 pb-6 border-b border-line">Order items</h2>
                  <OrderRow order={order} />
                </div>

                <div className="bg-white border border-line rounded-3xl p-8 shadow-sm">
                  <h2 className="text-xl font-medium text-ink mb-8">Order progress</h2>
                  <OrderTracker />
                </div>
              </div>

              <aside className="flex flex-col gap-6">
                <section className="bg-white border border-line rounded-3xl p-8 shadow-sm">
                  <h3 className="text-lg font-medium text-ink mb-4 pb-4 border-b border-line">Delivery address</h3>
                  <p className="text-muted text-sm leading-relaxed">
                    <strong className="text-ink font-medium">Haris K</strong><br />
                    24, Residency Road<br />
                    Bengaluru 560001<br />
                    +91 98765 43210
                  </p>
                </section>

                <section className="bg-white border border-line rounded-3xl p-8 shadow-sm">
                  <h3 className="text-lg font-medium text-ink mb-4 pb-4 border-b border-line">Payment</h3>
                  <p className="text-muted text-sm leading-relaxed">
                    <strong className="text-ink font-medium">UPI · Paid</strong><br />
                    Transaction ending 2381
                  </p>
                </section>

                <section className="bg-white border border-line rounded-3xl p-8 shadow-sm">
                  <h3 className="text-lg font-medium text-ink mb-4 pb-4 border-b border-line">Summary</h3>
                  <div className="flex flex-col gap-3 text-sm">
                    <div className="flex justify-between text-muted"><span>Subtotal</span><span className="text-ink font-medium">{money(order.total)}</span></div>
                    <div className="flex justify-between text-muted"><span>Delivery</span><span className="text-ink font-medium">Free</span></div>
                    <div className="h-px bg-line my-1" />
                    <div className="flex justify-between text-ink text-base"><strong>Total</strong><strong>{money(order.total)}</strong></div>
                  </div>
                </section>
              </aside>

            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
