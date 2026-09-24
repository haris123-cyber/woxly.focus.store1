"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, ChevronDown, ShieldCheck, Smartphone, Banknote, Percent } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { useCart } from "@/context/CartContext";

const money = (value: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

export function CheckoutClient() {
  const { items, loyaltyPoints } = useCart();
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const [useLoyalty, setUseLoyalty] = useState(false);
  const loyaltyDiscount = Math.min(loyaltyPoints, subtotal);
  const total = Math.max(0, subtotal - (useLoyalty ? loyaltyDiscount : 0));

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
            <CheckoutForm discount={useLoyalty ? loyaltyDiscount : 0} />
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

              {/* Loyalty Reward Section */}
              <div className="bg-sage/10 rounded-xl p-4 border border-sage/30 mt-2">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                    <div className="w-6 h-6 rounded-full bg-forest text-white flex items-center justify-center">
                      <Percent size={12} strokeWidth={3} />
                    </div>
                    Woxly Rewards
                  </div>
                  <span className="text-sm font-medium text-forest">{loyaltyPoints} pts</span>
                </div>
                <p className="text-xs text-muted mb-3">You have {loyaltyPoints} points available to redeem for {money(loyaltyDiscount)} off.</p>

                <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                  <div className="relative flex items-center justify-center w-5 h-5 shrink-0">
                    <input type="checkbox" disabled={loyaltyPoints === 0} checked={useLoyalty && loyaltyPoints > 0} onChange={(e) => setUseLoyalty(e.target.checked)} className="peer appearance-none w-5 h-5 border border-line rounded-md cursor-pointer checked:bg-forest checked:border-forest transition-colors disabled:opacity-50 disabled:cursor-not-allowed" />
                    <Check size={14} className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                  <span className={`font-medium ${loyaltyPoints === 0 ? 'opacity-50' : ''}`}>Redeem {money(loyaltyDiscount)}</span>
                </label>
              </div>

              {useLoyalty && loyaltyPoints > 0 && (
                <div className="flex justify-between text-forest">
                  <span>Reward discount</span>
                  <strong className="font-medium">-{money(loyaltyDiscount)}</strong>
                </div>
              )}

              <div className="h-px bg-line/60 my-2" />
              <div className="flex justify-between items-end"><span className="font-medium text-lg">Total</span><strong className="text-2xl font-medium">{money(total)}</strong></div>
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
    firstName: "muhammed",
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
    firstName: "muhammed",
    lastName: "User",
    address: "Tech Park, Building C, Floor 3",
    city: "Mumbai",
    pincode: "400001",
    state: "Maharashtra",
    phone: "+91 98765 43210"
  }
];


function CheckoutForm({ discount = 0 }: { discount?: number }) {
  const router = useRouter();
  const { items, placeOrder } = useCart();
  const [payment, setPayment] = useState("online");
  const [addressMode, setAddressMode] = useState<"saved" | "new">("saved");
  const [selectedAddress, setSelectedAddress] = useState("home");
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    placeOrder(payment === "online" ? "UPI · Paid" : "Cash on Delivery", discount);
    router.push("/order-success");
  };

  return (
    <form className="flex flex-col gap-12" onSubmit={handleSubmit}>


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
        <div className="flex flex-col gap-6 mt-2">
          {[
            {
              id: "online",
              label: "Pay Online",
              description: "UPI, Credit/Debit Cards, or Netbanking. Secure & instant.",
              badge: "SAVE 10 ON PREPAID ORDERS",
              promo: "Extra ₹10 off — online payment only.",
              icon: <Smartphone className="w-5 h-5 text-ink" />,
              iconBg: "bg-line/40"
            },
            {
              id: "cod",
              label: "Cash on Delivery",
              description: "Pay in cash when your order arrives.",
              icon: <Banknote className="w-5 h-5 text-ink" />,
              iconBg: "bg-line/40"
            }
          ].map((option) => (
            <label key={option.id} className={`relative flex items-start gap-4 p-5 rounded-2xl border cursor-pointer transition-colors ${payment === option.id ? 'border-ink bg-sage/5' : 'border-line bg-white hover:border-ink/50'}`}>

              {option.badge && (
                <span className="absolute -top-3 left-4 text-[10px] font-bold text-white bg-[#00a650] px-3 py-1 rounded-md uppercase tracking-wider shadow-sm z-10">
                  {option.badge}
                </span>
              )}

              <div className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0 mt-0.5 ${option.iconBg}`}>
                {option.icon}
              </div>

              <div className="flex flex-col flex-1 min-w-0">
                <span className="font-semibold text-ink text-base truncate">{option.label}</span>
                <small className="text-muted mt-1 leading-snug">{option.description}</small>

                {option.promo && (
                  <div className="flex items-start sm:items-center gap-2 mt-3 bg-green-50/50 border border-green-200/60 rounded-xl px-3 py-2 w-full sm:w-max">
                    <div className="flex items-center justify-center w-4 h-4 rounded-full bg-[#00a650] text-white shrink-0 mt-0.5 sm:mt-0">
                      <Percent className="w-2.5 h-2.5" />
                    </div>
                    <span className="text-xs font-semibold text-green-700 leading-snug">{option.promo}</span>
                  </div>
                )}
              </div>

              <div className="relative flex items-center justify-center w-5 h-5 shrink-0 mt-1">
                <input type="radio" name="payment" checked={payment === option.id} onChange={() => setPayment(option.id)} className="peer appearance-none w-5 h-5 border border-line rounded-full cursor-pointer checked:border-ink transition-colors bg-white" />
                <div className="absolute w-2.5 h-2.5 bg-ink rounded-full opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
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
