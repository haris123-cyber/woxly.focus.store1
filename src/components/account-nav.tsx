"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Package, User, Heart, Home } from "lucide-react";
import { demoOrder } from "@/data/catalog";

export function AccountNav({ active }: { active: string }) {
  const navItems = [
    { id: "overview", label: "Overview", href: "/account", icon: Home },
    { id: "orders", label: "Orders", href: "/account/orders", icon: Package },
    { id: "profile", label: "Profile", href: "/account/profile", icon: User },
    { id: "wishlist", label: "Wishlist", href: "/wishlist", icon: Heart },
  ];

  return (
    <nav className="flex flex-col gap-2 bg-white border border-line rounded-3xl p-4 shadow-sm sticky top-24">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.id;
        return (
          <Link
            key={item.id}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm ${
              isActive 
                ? "bg-sage/30 text-ink" 
                : "text-muted hover:bg-line/20 hover:text-ink"
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? "text-forest" : ""}`} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function OrderRow() {
  return (
    <article className="flex gap-6 py-6 border-b border-line items-center w-full">
      <div className="relative w-24 h-24 bg-line/20 rounded-xl overflow-hidden shrink-0">
        <Image src="/images/sol-hero.png" alt="Sol Focus Lamp" fill className="object-cover" />
      </div>
      <div className="flex-1">
        <small className="text-muted text-xs font-bold uppercase tracking-wider block mb-1">Order {demoOrder.number}</small>
        <h3 className="text-lg font-medium text-ink">Sol Focus Lamp</h3>
        <p className="text-muted text-sm mt-1">{demoOrder.date} · ₹3,499</p>
      </div>
      <div className="flex flex-col items-end gap-3">
        <span className="flex items-center gap-2 bg-sage/20 text-forest text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
          <i className="w-1.5 h-1.5 rounded-full bg-forest" />
          {demoOrder.status}
        </span>
        <Link href={`/account/orders/${demoOrder.number}`} className="text-sm font-semibold text-ink hover:text-forest transition-colors flex items-center gap-2">
          View order <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}
