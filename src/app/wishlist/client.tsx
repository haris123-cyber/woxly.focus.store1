"use client";

import { useState, useEffect } from "react";
import { catalog } from "@/data/catalog";
import { SiteShell } from "@/components/site-shell";
import { AccountNav } from "@/components/account-nav";
import { ProductCard } from "@/components/product-card";
import Link from "next/link";
import { ChevronLeft, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function WishlistClient() {
  const { wishlist, clearWishlist } = useCart();
  const wishlistedItems = catalog.filter(item => wishlist.includes(item.slug));
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (showConfirm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showConfirm]);

  return (
    <SiteShell>
      <div className="bg-[#fcfbf9] min-h-screen pb-12 font-sans text-zinc-900">
        <div className="max-w-6xl mx-auto px-4 pt-6 lg:pt-12">

          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <Link href="/account" className="inline-flex items-center gap-2 text-[13px] font-semibold text-muted mb-6 lg:hidden  px-4 py-2   ">
                <ChevronLeft className="w-4 h-4" />
                Back to menu
              </Link>
              <span className="text-forest text-sm font-bold uppercase tracking-wider mb-2 block">Saved for later</span>
              <h1 className="text-4xl font-serif text-ink">Your wishlist</h1>
            </div>

            {wishlistedItems.length > 0 && (
              <button
                onClick={() => setShowConfirm(true)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-700 transition-colors w-fit self-end md:self-auto"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            )}
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* Desktop Sidebar (Main Account Nav) */}
            <aside className="hidden lg:block w-[260px] shrink-0">
              <AccountNav active="wishlist" />
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 w-full max-w-2xl lg:max-w-none mx-auto">
              <div className="bg-white rounded-[2rem] p-6 lg:p-10 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">

                {wishlistedItems.length > 0 ? (
                  <section className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
                    {wishlistedItems.map(item => (
                      <ProductCard key={item.slug} product={item} />
                    ))}
                  </section>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-zinc-500 mb-6">Your wishlist is currently empty.</p>
                    <Link href="/shop" className="bg-ink text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-forest transition-colors inline-block">
                      Explore Shop
                    </Link>
                  </div>
                )}

              </div>
            </main>

          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-999 flex items-center justify-center bg-ink/40 px-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-lg text-center animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-xl font-serif text-ink mb-2">Clear Wishlist?</h2>
            <p className="text-muted text-sm mb-8">Are you sure you want to remove all items from your wishlist? This action cannot be undone.</p>
            <div className="flex gap-4 w-full">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 px-4 bg-line/30 hover:bg-line/50 rounded-full font-medium transition-colors text-ink text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => { clearWishlist(); setShowConfirm(false); }}
                className="flex-1 py-3 px-4 bg-red-500 hover:bg-red-600 rounded-full font-medium transition-colors text-white text-sm"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </SiteShell>
  );
}
