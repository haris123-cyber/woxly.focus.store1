import Link from "next/link";
import { ArrowRight, Heart, Mail, Package, User } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { OrderRow } from "@/components/account-nav";

export const metadata = { title: "Account | Woxly" };

export default function AccountPage() {
  return (
    <SiteShell>
      <div className="bg-sage/10 min-h-screen pb-24 font-sans">
        <div className="max-w-4xl mx-auto px-6 pt-12">
          
          {/* Header */}
          <section className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-line">
            <div>
              <span className="text-forest text-sm font-bold uppercase tracking-wider mb-2 block">My Woxly</span>
              <h1 className="text-4xl font-serif text-ink">Good morning, Haris.</h1>
              <p className="text-muted mt-2 text-lg">Manage your orders, details and saved pieces.</p>
            </div>
            <Link href="/" className="text-sm font-bold tracking-widest uppercase text-muted hover:text-ink transition-colors border-b-2 border-transparent hover:border-ink pb-1 w-fit">
              Sign out
            </Link>
          </section>

          {/* Navigation Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
            <Link href="/account/orders" className="group bg-white border border-line rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-ink/20 transition-all flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-sage/30 text-forest flex items-center justify-center shrink-0">
                  <Package className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-medium text-ink group-hover:text-forest transition-colors">My orders</span>
                  <small className="text-muted text-sm mt-0.5">View and track your purchases</small>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-muted group-hover:text-forest group-hover:translate-x-1 transition-all" />
            </Link>
            
            <Link href="/account/profile" className="group bg-white border border-line rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-ink/20 transition-all flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-sage/30 text-forest flex items-center justify-center shrink-0">
                  <User className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-medium text-ink group-hover:text-forest transition-colors">Profile</span>
                  <small className="text-muted text-sm mt-0.5">Personal details and addresses</small>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-muted group-hover:text-forest group-hover:translate-x-1 transition-all" />
            </Link>

            <Link href="/wishlist" className="group bg-white border border-line rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-ink/20 transition-all flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-sage/30 text-forest flex items-center justify-center shrink-0">
                  <Heart className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-medium text-ink group-hover:text-forest transition-colors">Wishlist</span>
                  <small className="text-muted text-sm mt-0.5">3 saved products</small>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-muted group-hover:text-forest group-hover:translate-x-1 transition-all" />
            </Link>

            <Link href="/contact" className="group bg-white border border-line rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-ink/20 transition-all flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-sage/30 text-forest flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-medium text-ink group-hover:text-forest transition-colors">Support</span>
                  <small className="text-muted text-sm mt-0.5">We’re here when you need us</small>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-muted group-hover:text-forest group-hover:translate-x-1 transition-all" />
            </Link>
          </section>

          {/* Recent Order */}
          <section className="bg-white border border-line rounded-3xl p-8 shadow-sm">
            <div className="flex items-end justify-between mb-8 pb-4 border-b border-line">
              <div>
                <span className="text-forest text-xs font-bold uppercase tracking-wider mb-2 block">Latest purchase</span>
                <h2 className="text-2xl font-serif text-ink">Recent order</h2>
              </div>
              <Link href="/account/orders" className="text-sm font-bold tracking-widest uppercase text-muted hover:text-ink transition-colors border-b-2 border-transparent hover:border-ink pb-1 hidden sm:block">
                View all orders
              </Link>
            </div>
            
            <OrderRow />
            
            <Link href="/account/orders" className="mt-8 text-sm font-bold tracking-widest uppercase text-ink block sm:hidden text-center border border-line rounded-full py-3 hover:bg-line/20">
              View all orders
            </Link>
          </section>
          
        </div>
      </div>
    </SiteShell>
  );
}
