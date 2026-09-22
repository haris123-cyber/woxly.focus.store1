import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { demoOrder } from "@/data/catalog";
import { SiteShell } from "@/components/site-shell";

export const metadata = { title: "Order Confirmed | Woxly" };

export default function OrderSuccessPage() {
  return (
    <SiteShell>
      <section className="min-h-[70vh] flex items-center justify-center py-24 px-6 font-sans">
        <div className="max-w-xl w-full flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-sage/30 rounded-full flex items-center justify-center text-forest mb-8">
            <Check className="w-10 h-10" />
          </div>
          <span className="text-forest text-sm font-bold uppercase tracking-wider mb-3 block">Order confirmed</span>
          <h1 className="text-4xl md:text-5xl font-serif text-ink mb-4">Thank you. It’s on its way.</h1>
          <p className="text-muted text-lg mb-12">We sent a confirmation to you@example.com. Your order is being prepared with care.</p>
          
          <div className="w-full bg-white border border-line rounded-3xl p-8 shadow-sm flex flex-col sm:flex-row justify-between gap-6 mb-10 text-left">
            <div>
              <small className="text-muted text-xs font-bold uppercase tracking-wider block mb-1">Order number</small>
              <strong className="text-ink font-medium text-lg">{demoOrder.number}</strong>
            </div>
            <div>
              <small className="text-muted text-xs font-bold uppercase tracking-wider block mb-1">Estimated delivery</small>
              <strong className="text-ink font-medium text-lg">{demoOrder.delivery}</strong>
            </div>
            <div>
              <small className="text-muted text-xs font-bold uppercase tracking-wider block mb-1">Total</small>
              <strong className="text-ink font-medium text-lg">₹3,499</strong>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
            <Link href="/track-order" className="w-full sm:w-auto px-8 py-4 bg-ink text-paper rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-forest transition-colors shadow-md">
              Track your order <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/shop" className="w-full sm:w-auto px-8 py-4 bg-white border border-line text-ink rounded-xl font-medium hover:bg-sage/10 transition-colors">
              Continue shopping
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
