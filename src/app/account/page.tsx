import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { AccountNav, OrderRow } from "@/components/account-nav";

export const metadata = { title: "Account | Woxly" };

export default function AccountPage() {
  return (
    <SiteShell>
      <div className="bg-[#fcfbf9] min-h-screen pb-12 font-sans text-zinc-900">
        <div className="max-w-6xl mx-auto px-4 pt-6 lg:pt-12">

          <main className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 lg:gap-8 items-start w-full">

              {/* Profile Card */}
              <section className="order-1 lg:col-start-2 lg:row-start-1 bg-white rounded-[2rem] p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-4">
                    <div className="relative w-[72px] h-[72px] rounded-full overflow-hidden bg-gray-100 shrink-0 shadow-sm">
                      <Image
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces&auto=format&q=80"
                        alt="Haris"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h1 className="text-[22px] font-serif text-zinc-900 leading-tight">Hi, Haris 👋</h1>
                      <p className="text-zinc-500 text-[13px] mt-1 tracking-tight">Fashion looks better on you.</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-zinc-400 shrink-0" />
                </div>


              </section>
              {/* Banner */}
              <section className="order-2 lg:col-start-2 lg:row-start-2 relative rounded-[20px] overflow-hidden bg-[#ecdacf] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex items-center min-h-[140px]">
                <div className="absolute right-0 top-0 bottom-0 w-[55%]">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=300&fit=crop&auto=format&q=80"
                    alt="Style Members"
                    fill
                    className="object-cover object-top"
                    style={{ maskImage: "linear-gradient(to right, transparent 0%, black 40%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 40%)" }}
                  />
                </div>
                <div className="relative z-10 p-6 max-w-[65%]">
                  <h2 className="text-[22px] font-serif italic mb-1.5 leading-tight text-zinc-900">Style<br />Members Get More</h2>
                  <p className="text-[11px] text-zinc-800 mb-4 leading-tight opacity-90">Exclusive deals, early access<br />and special rewards.</p>
                  <button className="bg-[#222] hover:bg-black transition-colors text-white text-[12px] font-medium px-4 py-2 rounded-full flex items-center gap-1.5 w-fit">
                    Explore Benefits <span className="text-[11px] font-serif">→</span>
                  </button>
                </div>
              </section>

              {/* Desktop Left Side: Menu (Shows between Banner and Orders on Mobile) */}
              <aside className="order-3 lg:col-start-1 lg:row-start-1 lg:row-span-3 w-full shrink-0">
                <AccountNav active="overview" />
              </aside>

              {/* My Orders */}
              <section className="order-4 lg:col-start-2 lg:row-start-3 bg-white rounded-[2rem] p-6 lg:p-8 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-[20px] font-serif text-zinc-900">Recent Orders</h2>
                  <Link href="/account/orders" className="text-[13px] font-medium text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-1">
                    View all <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="flex flex-col [&>article:last-child]:border-0 [&>article:last-child]:pb-0">
                  <OrderRow />
                  <OrderRow />
                </div>
              </section>

          </main>

        </div>
      </div>
    </SiteShell>
  );
}

