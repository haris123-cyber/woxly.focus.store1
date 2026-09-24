"use client";

import { useState } from "react";
import { SiteShell } from "@/components/site-shell";
import { AccountNav, OrderRow } from "@/components/account-nav";
import Link from "next/link";
import { ChevronLeft, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function OrdersClient() {
  const [filter, setFilter] = useState("all");
  const { orders, clearOrders } = useCart();

  const filteredOrders = orders.filter(order => {
    if (filter === "all") return true;
    if (filter === "in-progress") return order.status !== "DELIVERED";
    if (filter === "delivered") return order.status === "DELIVERED";
    return true;
  });

  return (
    <SiteShell>
      <section className="bg-sage/10 min-h-screen pb-24 font-sans">
        <div className="max-w-6xl mx-auto px-6 pt-12">

          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <Link href="/account" className="inline-flex items-center gap-2 text-[13px] font-semibold text-muted mb-6 lg:hidden  px-4 py-2   ">
                <ChevronLeft className="w-4 h-4" />
                Back to menu
              </Link>
              <span className="text-forest text-sm font-bold uppercase tracking-wider mb-2 block">Purchase history</span>
              <h1 className="text-4xl font-serif text-ink">My orders</h1>
            </div>

            {orders.length > 0 && (
              <button 
                onClick={() => {
                  if (window.confirm("Are you sure you want to clear your order history?")) {
                    clearOrders();
                  }
                }}
                className="inline-flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-700 transition-colors w-fit"
              >
                <Trash2 className="w-4 h-4" />
                Clear History
              </button>
            )}
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            {/* Sidebar Navigation */}
            <aside className="w-full lg:w-64 shrink-0 hidden lg:block">
              <AccountNav active="orders" />
            </aside>

            {/* Orders Content */}
            <div className="flex-1 w-full">
              <div className="bg-white border border-line rounded-3xl p-8 shadow-sm">

                {/* Filters */}
                <div className="flex gap-4 border-b border-line pb-3 mb-2 overflow-x-auto scrollbar-none">
                  <button onClick={() => setFilter("all")} className={`px-5 py-2 rounded-full text-sm font-medium transition-colors shrink-0 ${filter === 'all' ? 'bg-ink text-paper' : 'text-ink hover:bg-line/30 border border-transparent hover:border-line/50'}`}>All orders</button>
                  <button onClick={() => setFilter("in-progress")} className={`px-5 py-2 rounded-full text-sm font-medium transition-colors shrink-0 ${filter === 'in-progress' ? 'bg-ink text-paper' : 'text-ink hover:bg-line/30 border border-transparent hover:border-line/50'}`}>In progress</button>
                  <button onClick={() => setFilter("delivered")} className={`px-5 py-2 rounded-full text-sm font-medium transition-colors shrink-0 ${filter === 'delivered' ? 'bg-ink text-paper' : 'text-ink hover:bg-line/30 border border-transparent hover:border-line/50'}`}>Delivered</button>
                </div>

                {/* Orders List */}
                <div className="flex flex-col">
                  {filteredOrders.length === 0 ? (
                    <div className="py-12 text-center text-muted">
                      <p>No orders found.</p>
                    </div>
                  ) : (
                    filteredOrders.map(order => (
                      <OrderRow key={order.id} order={order} />
                    ))
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
