"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, ChevronDown, ShieldCheck } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { useCart } from "@/context/CartContext";

const money = (value: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

export function CheckoutClient() {
  const { items } = useCart();
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <SiteShell>
      <section className="bg-sage/10 min-h-screen pb-24 font-sans">
        <div className="max-w-6xl mx-auto px-6 pt-12 flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
          <div className="flex-1 w-full flex flex-col gap-8">
            <div>
              <Link href="/cart" className="text-sm font-bold uppercase tracking-wider text-muted hover:text-ink transition-colors flex items-center gap-2 mb-8 w-fit"><ArrowLeft className="w-4 h-4" /> Back to bag</Link>
              <span className="text-forest text-sm font-bold uppercase tracking-wider mb-2 block">Secure checkout</span>
              <h1 className="text-3xl md:text-4xl font-serif text-ink">Where should we send it?</h1>
            </div>
            <CheckoutForm />
          </div>

          <aside className="w-full lg:w-[420px] shrink-0 bg-white border border-line rounded-3xl p-8 sticky top-12 shadow-sm ">
            <h2 className="text-2xl font-serif font-bold text-ink mb-6">Order summary</h2>

            <div className="flex flex-col gap-4 mb-8 pb-8 border-b border-line">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="relative w-16 h-20 bg-line/20 rounded-lg overflow-hidden shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-ink">{item.name}</h3>
                    <p className="text-muted text-xs mt-1">{item.variant ? `${item.variant} · ` : ""}Qty {item.quantity}</p>
                    <strong className="block text-ink font-medium text-sm mt-1">{money(item.price * item.quantity)}</strong>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 text-ink mb-6">
              <div className="flex justify-between"><span className="text-muted">Subtotal</span><strong className="font-medium">{money(subtotal)}</strong></div>
              <div className="flex justify-between"><span className="text-muted">Delivery</span><strong className="font-medium text-forest">Free</strong></div>
              <div className="h-px bg-line/60 my-2" />
              <div className="flex justify-between items-end"><span className="font-medium text-lg">Total</span><strong className="text-2xl font-medium">{money(subtotal)}</strong></div>
            </div>
            <div className="flex items-center gap-3 text-sm text-forest bg-sage/30 px-4 py-3 rounded-xl"><ShieldCheck className="w-5 h-5 shrink-0" /> Your payment details are encrypted and secure.</div>
          </aside>
        </div>
      </section>
    </SiteShell>
  );
}
const SAVED_ADDRESSES = [
  {
    id: "home",
    label: "Home",
    firstName: "Haris",
    lastName: "User",
    address: "123 Main St, Apartment 4B",
    city: "Bangalore",
    pincode: "560001",
    state: "Karnataka",
    phone: "+91 98765 43210"
  },
  {
    id: "work",
    label: "Work",
    firstName: "Haris",
    lastName: "User",
    address: "Tech Park, Building C, Floor 3",
    city: "Mumbai",
    pincode: "400001",
    state: "Maharashtra",
    phone: "+91 98765 43210"
  }
];


function CheckoutForm() {
  const router = useRouter();
  const { items, placeOrder } = useCart();
  const [payment, setPayment] = useState("upi");
  const [addressMode, setAddressMode] = useState<"saved" | "new">("saved");
  const [selectedAddress, setSelectedAddress] = useState("home");
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    placeOrder();
    router.push("/order-success");
  };

  return (
    <form className="flex flex-col gap-12" onSubmit={handleSubmit}>
      <section className="bg-white border border-line rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-6 border-b border-line pb-4">
          <b className="w-8 h-8 rounded-full bg-ink text-paper flex items-center justify-center font-bold text-sm">1</b>
          <h2 className="text-xl font-medium text-ink">Contact</h2>
        </div>
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
            Email address
            <input type="email" placeholder="you@example.com" required className="w-full px-4 py-3 bg-white rounded-xl border border-line focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-all shadow-sm font-normal" />
          </label>
          <label className="flex items-center gap-3 text-sm text-ink cursor-pointer group mt-2">
            <div className="relative flex items-center justify-center w-5 h-5">
              <input type="checkbox" className="peer appearance-none w-5 h-5 border border-line rounded-md cursor-pointer checked:bg-ink checked:border-ink transition-colors" />
              <Check className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
            </div>
            <span className="group-hover:text-forest transition-colors">Send order updates on WhatsApp</span>
          </label>
        </div>
      </section>

      <section className="bg-white border border-line rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-6 border-b border-line pb-4">
          <b className="w-8 h-8 rounded-full bg-ink text-paper flex items-center justify-center font-bold text-sm">2</b>
          <h2 className="text-xl font-medium text-ink">Delivery address</h2>
        </div>
        <div className="flex gap-4 mb-6">
          <button
            type="button"
            onClick={() => setAddressMode("saved")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${addressMode === "saved" ? "bg-ink text-paper" : "bg-line/20 text-ink hover:bg-line/40"}`}
          >
            Saved addresses
          </button>
          <button
            type="button"
            onClick={() => setAddressMode("new")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${addressMode === "new" ? "bg-ink text-paper" : "bg-line/20 text-ink hover:bg-line/40"}`}
          >
            Add new address
          </button>
        </div>

        {addressMode === "saved" ? (
          <div className="flex flex-col gap-4">
            {SAVED_ADDRESSES.map((addr) => (
              <label key={addr.id} className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${selectedAddress === addr.id ? 'border-ink bg-sage/10' : 'border-line bg-white hover:border-ink/50'}`}>
                <div className="relative flex items-center justify-center w-5 h-5 shrink-0 mt-1">
                  <input type="radio" name="saved-address" checked={selectedAddress === addr.id} onChange={() => setSelectedAddress(addr.id)} className="peer appearance-none w-5 h-5 border border-line rounded-full cursor-pointer checked:border-ink transition-colors" />
                  <div className="absolute w-2.5 h-2.5 bg-ink rounded-full opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                </div>
                <div className="flex flex-col text-sm">
                  <span className="font-semibold text-ink flex items-center gap-2">{addr.label} {addr.id === "home" && <span className="bg-line/50 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider text-muted font-bold">Default</span>}</span>
                  <span className="text-ink mt-1">{addr.firstName} {addr.lastName}</span>
                  <span className="text-muted">{addr.address}, {addr.city}, {addr.state} {addr.pincode}</span>
                  <span className="text-muted mt-1">{addr.phone}</span>
                </div>
              </label>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col gap-2 text-sm font-semibold text-ink">First name<input required className="w-full px-4 py-3 bg-white rounded-xl border border-line focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-all shadow-sm font-normal" /></label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-ink">Last name<input required className="w-full px-4 py-3 bg-white rounded-xl border border-line focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-all shadow-sm font-normal" /></label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-ink md:col-span-2">Address<input required className="w-full px-4 py-3 bg-white rounded-xl border border-line focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-all shadow-sm font-normal" /></label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-ink">City<input required className="w-full px-4 py-3 bg-white rounded-xl border border-line focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-all shadow-sm font-normal" /></label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-ink">Pincode<input inputMode="numeric" maxLength={6} required className="w-full px-4 py-3 bg-white rounded-xl border border-line focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-all shadow-sm font-normal" /></label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
              State
              <input required className="w-full px-4 py-3 bg-white rounded-xl border border-line focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-all shadow-sm font-normal" />
            </label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-ink">Phone<input type="tel" required className="w-full px-4 py-3 bg-white rounded-xl border border-line focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-all shadow-sm font-normal" /></label>
          </div>
        )}
      </section>

      <section className="bg-white border border-line rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-6 border-b border-line pb-4">
          <b className="w-8 h-8 rounded-full bg-ink text-paper flex items-center justify-center font-bold text-sm">3</b>
          <h2 className="text-xl font-medium text-ink">Payment</h2>
        </div>
        <div className="flex flex-col gap-3">
          {[["upi", "UPI / QR"], ["cod", "Cash on delivery"]].map(([id, label]) => (
            <label key={id} className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${payment === id ? 'border-ink bg-sage/10' : 'border-line bg-white hover:border-ink/50'}`}>
              <div className="relative flex items-center justify-center w-5 h-5 shrink-0 mt-0.5">
                <input type="radio" name="payment" checked={payment === id} onChange={() => setPayment(id)} className="peer appearance-none w-5 h-5 border border-line rounded-full cursor-pointer checked:border-ink transition-colors" />
                <div className="absolute w-2.5 h-2.5 bg-ink rounded-full opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-ink">{label}</span>
                <small className="text-muted mt-1">{id === "cod" ? "Pay when your order arrives" : "Secure online payment"}</small>
              </div>
            </label>
          ))}
        </div>
      </section>

      <div className="flex flex-col gap-4">
        <button type="submit" disabled={items.length === 0} className="w-full py-4 bg-ink text-paper rounded-xl font-medium text-lg text-center flex items-center justify-center gap-2 hover:bg-forest transition-colors active:scale-[0.98] shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
          Place order · {money(subtotal)} <ArrowRight className="w-5 h-5" />
        </button>
        <p className="text-sm text-muted text-center leading-relaxed">
          By placing your order, you agree to our <Link href="/terms" className="text-ink font-semibold hover:underline underline-offset-4">terms</Link> and <Link href="/privacy-policy" className="text-ink font-semibold hover:underline underline-offset-4">privacy policy</Link>.
        </p>
      </div>
    </form>
  );
}
