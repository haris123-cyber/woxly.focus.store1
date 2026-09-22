"use client";

import { useState } from "react";
import { AccountNav } from "@/components/account-nav";
import { SiteShell } from "@/components/site-shell";
import { Check, ShieldCheck } from "lucide-react";

export function ProfileClient() {
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <SiteShell>
      <section className="bg-sage/10 min-h-screen pb-24 font-sans">
        <div className="max-w-6xl mx-auto px-6 pt-12">
          <div className="mb-12">
            <span className="text-forest text-sm font-bold uppercase tracking-wider mb-2 block">Account settings</span>
            <h1 className="text-4xl font-serif text-ink">Your profile</h1>
            <p className="text-muted mt-2">Manage your contact details and default delivery addresses.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            {/* Sidebar Navigation */}
            <aside className="w-full lg:w-64 shrink-0">
              <AccountNav active="profile" />
            </aside>

            {/* Profile Content */}
            <div className="flex-1 w-full flex flex-col gap-8">
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                
                {/* Personal Information */}
                <div className="bg-white border border-line rounded-3xl p-8 shadow-sm">
                  <h2 className="text-xl font-medium text-ink mb-6 pb-4 border-b border-line">Personal details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
                      First name
                      <input required defaultValue="Haris" className="w-full px-4 py-3.5 bg-white rounded-xl border border-line focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-all shadow-sm font-normal" />
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
                      Last name
                      <input required defaultValue="K" className="w-full px-4 py-3.5 bg-white rounded-xl border border-line focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-all shadow-sm font-normal" />
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-semibold text-ink md:col-span-2">
                      Email address
                      <input type="email" required defaultValue="haris@example.com" className="w-full px-4 py-3.5 bg-white rounded-xl border border-line focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-all shadow-sm font-normal" />
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-semibold text-ink md:col-span-2">
                      Phone number
                      <input type="tel" required defaultValue="+91 98765 43210" className="w-full px-4 py-3.5 bg-white rounded-xl border border-line focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-all shadow-sm font-normal" />
                    </label>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="bg-white border border-line rounded-3xl p-8 shadow-sm">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-line">
                    <h2 className="text-xl font-medium text-ink">Default delivery address</h2>
                    <span className="text-xs font-bold uppercase tracking-wider text-muted bg-line/20 px-3 py-1 rounded-full">Primary</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <label className="flex flex-col gap-2 text-sm font-semibold text-ink md:col-span-2">
                      Street address
                      <input required defaultValue="24, Residency Road, Shanthala Nagar" className="w-full px-4 py-3.5 bg-white rounded-xl border border-line focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-all shadow-sm font-normal" />
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-semibold text-ink md:col-span-2">
                      Apartment, suite, etc. (optional)
                      <input defaultValue="Apt 4B" className="w-full px-4 py-3.5 bg-white rounded-xl border border-line focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-all shadow-sm font-normal" />
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
                      City
                      <input required defaultValue="Bengaluru" className="w-full px-4 py-3.5 bg-white rounded-xl border border-line focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-all shadow-sm font-normal" />
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
                      State / Province
                      <div className="relative">
                        <select className="w-full px-4 py-3.5 bg-white rounded-xl border border-line focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-all shadow-sm font-normal appearance-none pr-10 cursor-pointer">
                          <option>Karnataka</option>
                          <option>Maharashtra</option>
                          <option>Delhi</option>
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-muted">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </div>
                      </div>
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-semibold text-ink md:col-span-2">
                      Pincode
                      <input required inputMode="numeric" maxLength={6} defaultValue="560001" className="w-full px-4 py-3.5 bg-white rounded-xl border border-line focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-all shadow-sm font-normal" />
                    </label>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <button type="submit" className="px-8 py-4 bg-ink text-paper rounded-xl font-medium flex items-center justify-center hover:bg-forest transition-colors active:scale-[0.98] shadow-md min-w-[160px]">
                    {saved ? <Check className="w-5 h-5 text-white" /> : "Save changes"}
                  </button>
                  {saved && <span className="text-sm font-medium text-forest animate-fade-in flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Profile updated successfully</span>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
