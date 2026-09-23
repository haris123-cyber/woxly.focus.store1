import { catalog } from "@/data/catalog";
import { SiteShell } from "@/components/site-shell";
import { AccountNav } from "@/components/account-nav";
import { ProductCard } from "@/components/product-card";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata = { title: "Wishlist | Woxly" };

export default function WishlistPage() {
  return (
    <SiteShell>
      <div className="bg-[#fcfbf9] min-h-screen pb-12 font-sans text-zinc-900">
        <div className="max-w-6xl mx-auto px-4 pt-6 lg:pt-12">

          <div className="mb-12">
            <Link href="/account" className="inline-flex items-center gap-2 text-[13px] font-semibold text-zinc-600 hover:text-zinc-900 transition-colors mb-6 lg:hidden bg-white px-4 py-2 rounded-full shadow-sm border border-zinc-100">
              <ChevronLeft className="w-4 h-4" />
              Back to menu
            </Link>
            <span className="text-forest text-sm font-bold uppercase tracking-wider mb-2 block">Saved for later</span>
            <h1 className="text-4xl font-serif text-ink">Your wishlist</h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* Desktop Sidebar (Main Account Nav) */}
            <aside className="hidden lg:block w-[260px] shrink-0">
              <AccountNav active="wishlist" />
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 w-full max-w-2xl lg:max-w-none mx-auto">
              <div className="bg-white rounded-[2rem] p-6 lg:p-10 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">

                <section className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
                  {catalog.map(item => (
                    <ProductCard key={item.slug} product={item} />
                  ))}
                </section>
              </div>
            </main>

          </div>
        </div>
      </div>
    </SiteShell>
  );
}
