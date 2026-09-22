"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero, SiteShell } from "./site-shell";

export function PolicyPage({ type }: { type: "privacy" | "terms" | "shipping" | "returns" }) {
  const content = {
    privacy: { eyebrow: "Legal", title: "Privacy policy", intro: "How we collect, use and protect your personal information.", sections: [["Information we collect", "We collect information you provide when placing an order, creating an account or contacting us. This may include your name, contact details, delivery address and order history."], ["How we use information", "We use your information to fulfil orders, provide support, improve the storefront and send marketing only when you have chosen to receive it."], ["Your choices", "You can request access, correction or deletion of eligible personal data by contacting privacy@woxly.com."], ["Data security", "We use reasonable administrative and technical safeguards. Payment details are processed by certified payment providers and are not stored by Woxly."]] },
    terms: { eyebrow: "Legal", title: "Terms & conditions", intro: "The terms that apply when you browse or purchase from Woxly.", sections: [["Using this website", "By using this website, you agree to these terms and applicable laws. Product imagery and descriptions are provided as accurately as possible."], ["Orders and pricing", "Orders are accepted once payment is confirmed and stock is available. If a pricing or inventory error occurs, we will contact you before fulfilment."], ["Intellectual property", "Woxly branding, copy, imagery and product designs may not be reproduced without written permission."], ["Liability", "Nothing in these terms limits rights available to you under applicable consumer law."]] },
    shipping: { eyebrow: "Delivery", title: "Shipping & delivery", intro: "Clear timelines, careful packing and updates along the way.", sections: [["Processing", "In-stock orders typically leave our studio within one business day. Orders placed on Sundays or public holidays are processed the following business day."], ["Delivery estimates", "Most Indian metro deliveries arrive within 3–5 business days. Remote locations may require 5–8 business days."], ["Shipping charges", "Standard shipping is complimentary across India. Any expedited option and its cost will be shown at checkout."], ["Tracking", "You will receive a tracking link by email or WhatsApp after dispatch. You can also use our Track Order page."]] },
    returns: { eyebrow: "Peace of mind", title: "Return & refund policy", intro: "If it is not right for your space, we will help make it right.", sections: [["30-day returns", "Unused products in original packaging can be returned within 30 days of delivery. Contact us before sending an item back."], ["Damaged items", "Report transit damage within 48 hours with photos of the product and packaging so we can arrange a replacement."], ["Refunds", "Approved refunds are returned to the original payment method within 5–10 business days after inspection."], ["Non-returnable items", "Personalised items, gift cards and products marked final sale are not eligible unless they arrive damaged or defective."]] }
  }[type];

  return (
    <SiteShell>
      <PageHero eyebrow={content.eyebrow} title={content.title} copy={content.intro} />
      <section className="max-w-5xl mx-auto px-6 pb-24 flex flex-col md:flex-row gap-12 md:gap-24 font-sans w-full items-start">
        <aside className="w-full md:w-56 shrink-0 relative md:sticky md:top-32 flex flex-col gap-6">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-muted mb-1">Last updated</span>
            <strong className="block text-ink font-medium">17 September 2026</strong>
          </div>
          <div className="h-px bg-line/60 w-full" />
          <Link href="/contact" className="text-sm font-semibold text-ink hover:text-forest transition-colors flex items-center gap-2 group">
            Need help? Contact us <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </aside>
        
        <article className="flex-1 w-full max-w-2xl flex flex-col gap-12">
          {content.sections.map(([heading, body], i) => (
            <section key={heading}>
              <span className="block text-4xl font-serif text-line mb-4">0{i + 1}</span>
              <h2 className="text-xl font-bold font-serif text-ink mb-3">{heading}</h2>
              <p className="text-muted leading-relaxed">{body}</p>
            </section>
          ))}
        </article>
      </section>
    </SiteShell>
  );
}
