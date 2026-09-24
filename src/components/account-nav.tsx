"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Package, User, Heart, Home, MapPin, CreditCard, Bell, Settings, HelpCircle, ChevronRight, LogOut } from "lucide-react";
import { demoOrder } from "@/data/catalog";

export function AccountNav({ active }: { active: string }) {
  const navItems = [
    { id: "orders", title: "My Orders", subtitle: "Track, return or view your orders", icon: Package, href: "/account/orders" },
    { id: "wishlist", title: "Wishlist", subtitle: "Your favourite styles", icon: Heart, href: "/wishlist" },
    { id: "addresses", title: "Addresses", subtitle: "Manage your delivery addresses", icon: MapPin, href: "/account/profile" },
    { id: "profile", title: "My Profile", subtitle: "Personal information", icon: User, href: "/account/profile" },
    { id: "help", title: "Help & Support", subtitle: "Get help, contact us", icon: HelpCircle, href: "/contact" },
  ];

  return (
    <div className="flex flex-col gap-5">
      <nav className="bg-white rounded-[2rem] px-2 py-2 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col divide-y divide-zinc-100/80">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3.5 hover:bg-zinc-50/80 transition-colors rounded-[1.25rem] ${isActive ? "bg-zinc-50/80" : ""}`}
              >
                <div className="shrink-0">
                  <Icon className={`w-[22px] h-[22px] ${isActive ? "text-zinc-900" : "text-zinc-800"}`} strokeWidth={1.75} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-zinc-900">{item.title}</p>
                  <p className="text-[12px] text-zinc-500 mt-0.5 truncate">{item.subtitle}</p>
                </div>
                <ChevronRight className="w-[18px] h-[18px] text-zinc-400 shrink-0" />
              </Link>
            )
          })}
        </div>
      </nav>

      <Link href="/" className="flex items-center justify-center gap-2.5 bg-[#f0eee9] hover:bg-[#e6e4df] text-zinc-900 p-4 rounded-full font-semibold text-[15px] transition-colors">
        <LogOut className="w-5 h-5" strokeWidth={2} />
        Sign Out
      </Link>
    </div>
  );
}

import { useCart } from "@/context/CartContext";

export function RecentOrders() {
  const { orders } = useCart();
  const recentOrders = orders.slice(0, 2);

  if (recentOrders.length === 0) {
    return <p className="text-muted text-sm py-4">No recent orders.</p>;
  }

  return (
    <div className="flex flex-col [&>article:last-child]:border-0 [&>article:last-child]:pb-0">
      {recentOrders.map(order => (
        <OrderRow key={order.id} order={order} />
      ))}
    </div>
  );
}

import { Order } from "@/context/CartContext";

const money = (value: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

export function OrderRow({ order, hideViewOrder }: { order: Order; hideViewOrder?: boolean }) {
  const firstItem = order.items[0];
  if (!firstItem) return null;

  return (
    <article className="flex flex-col sm:flex-row gap-4 sm:gap-6 py-6  sm:items-center w-full">
      <div className="flex gap-4 sm:gap-6 items-center flex-1">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-line/20 rounded-xl overflow-hidden shrink-0">
          <Image src={firstItem.image} alt={firstItem.name} fill className="object-cover" />
        </div>
        <div className="flex-1">
          <small className="text-muted text-xs font-bold uppercase tracking-wider block mb-1">Order {order.id}</small>
          <h3 className="text-base sm:text-lg font-medium text-ink">
            {firstItem.name} {order.items.length > 1 ? `+ ${order.items.length - 1} more` : ""}
          </h3>
          <p className="text-muted text-sm mt-1">{order.date} · {money(order.total)}</p>
        </div>
      </div>
      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 mt-2 sm:mt-0 w-full sm:w-auto">
        <span className="flex items-center gap-2 bg-sage/20 text-forest text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full whitespace-nowrap">
          <i className="w-1.5 h-1.5 rounded-full bg-forest" />
          {order.status}
        </span>
        {!hideViewOrder && (
          <Link href={`/account/orders/${order.id}`} className="text-sm font-semibold text-ink hover:text-forest transition-colors flex items-center gap-2 whitespace-nowrap">
            View order <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </article>
  );
}
