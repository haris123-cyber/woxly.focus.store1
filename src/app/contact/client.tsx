"use client";

import { useState } from "react";
import { ArrowRight, Check, Mail, MapPin, Phone } from "lucide-react";
import { SiteShell, PageHero } from "@/components/site-shell";

export function ContactClient() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <SiteShell>
      <PageHero 
        eyebrow="We’re listening" 
        title="How can we help?" 
        copy="Questions about a product, delivery or an existing order? Our small team will get back to you within one business day." 
      />
      <section className="max-w-5xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 font-sans w-full">
        <div className="flex flex-col gap-10">
          <article className="flex gap-5 items-start">
            <div className="w-12 h-12 rounded-full bg-sage/50 flex items-center justify-center text-forest shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-ink mb-1">Email us</h3>
              <p className="text-muted mb-1 font-medium">hello@woxly.com</p>
              <small className="text-muted/80 text-sm">Replies within one business day</small>
            </div>
          </article>
          <article className="flex gap-5 items-start">
            <div className="w-12 h-12 rounded-full bg-sage/50 flex items-center justify-center text-forest shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-ink mb-1">Call us</h3>
              <p className="text-muted mb-1 font-medium">+91 80 4567 8900</p>
              <small className="text-muted/80 text-sm">Mon–Sat, 10am–6pm IST</small>
            </div>
          </article>
          <article className="flex gap-5 items-start">
            <div className="w-12 h-12 rounded-full bg-sage/50 flex items-center justify-center text-forest shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-ink mb-1">Studio</h3>
              <p className="text-muted mb-1 font-medium">Indiranagar, Bengaluru</p>
              <small className="text-muted/80 text-sm">Visits by appointment</small>
            </div>
          </article>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center justify-center text-center p-12 bg-white rounded-2xl border border-line h-full min-h-[400px]">
             <div className="w-16 h-16 bg-sage/30 rounded-full flex items-center justify-center text-forest mb-6">
                <Check className="w-8 h-8" />
             </div>
             <h3 className="text-2xl font-bold font-serif text-ink mb-2">Message received</h3>
             <p className="text-muted leading-relaxed">Thanks for reaching out! Our team will get back to you within one business day.</p>
             <button onClick={() => setSubmitted(false)} className="mt-8 text-sm font-semibold text-ink hover:text-forest transition-colors flex items-center gap-2">
                Send another message <ArrowRight className="w-4 h-4" />
             </button>
          </div>
        ) : (
          <form className="flex flex-col gap-6" onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">Name</label>
              <input required className="w-full px-4 py-3.5 bg-white rounded-xl border border-line focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-all shadow-sm text-ink" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">Email</label>
              <input type="email" required className="w-full px-4 py-3.5 bg-white rounded-xl border border-line focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-all shadow-sm text-ink" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">What can we help with?</label>
              <div className="relative">
                <select className="w-full px-4 py-3.5 bg-white rounded-xl border border-line focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-all shadow-sm cursor-pointer text-ink appearance-none pr-10">
                  <option>Product question</option>
                  <option>Order support</option>
                  <option>Returns</option>
                  <option>Press and partnerships</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-muted">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">Message</label>
              <textarea rows={5} required className="w-full px-4 py-3.5 bg-white rounded-xl border border-line focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-all shadow-sm resize-none text-ink"></textarea>
            </div>
            <button className="w-full flex items-center justify-center gap-2 bg-ink text-paper py-4 rounded-xl font-medium hover:bg-forest transition-all active:scale-[0.98] shadow-md mt-2">
              Send message <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </section>
    </SiteShell>
  );
}
