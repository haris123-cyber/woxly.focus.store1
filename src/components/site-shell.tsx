"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { Logo } from "./logo";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-paper flex flex-col">
      {children}
    </main>
  );
}

export function PageHero({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return (
    <section className="px-6 py-16 md:py-24 text-center max-w-3xl mx-auto flex flex-col items-center">
      <span className="text-xs font-bold uppercase tracking-[0.15em] text-gray-500 mb-4 block">
        {eyebrow}
      </span>
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
        {title}
      </h1>
      {copy && (
        <p className="text-gray-600 text-lg leading-relaxed">
          {copy}
        </p>
      )}
    </section>
  );
}
