"use client";

import { ArrowRight } from "lucide-react";
import { Logo } from "./logo";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-paper border-t border-line">
      <div className="max-w-[1200px] mx-auto px-6 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="md:col-span-1">
            <div className="mb-6"><Logo /></div>
            <p className="text-muted">Considered objects for calmer, brighter everyday spaces.</p>
          </div>
          <div>
            <h3 className="font-medium text-ink mb-6">Explore</h3>
            <div className="flex flex-col gap-4 text-muted">
              <Link href="/store#benefits" className="hover:text-ink transition-colors">Why Sol</Link>
              <Link href="/store#details" className="hover:text-ink transition-colors">Details</Link>
              <Link href="/store#reviews" className="hover:text-ink transition-colors">Reviews</Link>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-ink mb-6">Help</h3>
            <div className="flex flex-col gap-4 text-muted">
              <Link href="/store#faq" className="hover:text-ink transition-colors">FAQs</Link>
              <a href="mailto:hello@woxly.com" className="hover:text-ink transition-colors">Contact</a>
              <Link href="#" className="hover:text-ink transition-colors">Shipping & returns</Link>
            </div>
          </div>

        </div>
        <div className="flex flex-col md:flex-row justify-between items-center py-8 border-t border-line text-sm text-muted gap-4">
          <span>© 2026 Woxly</span>
          <div className="flex gap-4">
            <span className="hover:text-ink cursor-pointer">Privacy</span>
            <span>·</span>
            <span className="hover:text-ink cursor-pointer">Terms</span>
            <span>·</span>
            <span className="hover:text-ink cursor-pointer">Accessibility</span>
          </div>
          <span>Designed with intention</span>
        </div>
      </div>
    </footer>
  );
}
