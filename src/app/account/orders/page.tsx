import { SiteShell } from "@/components/site-shell";
import { AccountNav, OrderRow } from "@/components/account-nav";

export const metadata = { title: "My Orders | Woxly" };

export default function OrdersPage() {
  return (
    <SiteShell>
      <section className="bg-sage/10 min-h-screen pb-24 font-sans">
        <div className="max-w-6xl mx-auto px-6 pt-12">
          
          <div className="mb-12">
            <span className="text-forest text-sm font-bold uppercase tracking-wider mb-2 block">Purchase history</span>
            <h1 className="text-4xl font-serif text-ink">My orders</h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            {/* Sidebar Navigation */}
            <aside className="w-full lg:w-64 shrink-0">
              <AccountNav active="orders" />
            </aside>

            {/* Orders Content */}
            <div className="flex-1 w-full">
              <div className="bg-white border border-line rounded-3xl p-8 shadow-sm">
                
                {/* Filters */}
                <div className="flex gap-4 border-b border-line pb-6 mb-2 overflow-x-auto scrollbar-none">
                  <button className="px-5 py-2 rounded-full text-sm font-medium transition-colors bg-ink text-paper shrink-0">All orders</button>
                  <button className="px-5 py-2 rounded-full text-sm font-medium transition-colors text-ink hover:bg-line/30 border border-transparent hover:border-line/50 shrink-0">In progress</button>
                  <button className="px-5 py-2 rounded-full text-sm font-medium transition-colors text-ink hover:bg-line/30 border border-transparent hover:border-line/50 shrink-0">Delivered</button>
                </div>

                {/* Orders List */}
                <div className="flex flex-col">
                  <OrderRow />
                  <OrderRow />
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
