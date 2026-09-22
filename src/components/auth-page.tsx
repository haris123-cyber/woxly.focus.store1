"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SiteShell } from "./site-shell";

export function AuthPage({ mode }: { mode: "login" | "signup" }) {
  const login = mode === "login";
  return (
    <SiteShell>
      <section className="min-h-[85vh] flex font-sans bg-[#fbfaf6]">
        <div className="w-full lg:w-1/1 flex flex-col justify-center px-6 sm:px-12 md:px-20 py-12 lg:py-20">
          <div className="max-w-md w-full mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-gray-500 mb-3 block">
              {login ? "Welcome back" : "Join Woxly"}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              {login ? "Sign in to your account" : "Create your account"}
            </h1>
            <p className="text-gray-500 text-sm sm:text-base mb-10 leading-relaxed">
              {login
                ? "Access your orders, track deliveries, and view saved products."
                : "Save your favourites and make checkout quicker and easier."}
            </p>

            <form onSubmit={e => e.preventDefault()} className="space-y-5">
              {!login && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full name</label>
                  <input
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-3.5 bg-white rounded-xl border border-gray-200 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all shadow-sm"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email address</label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-3.5 bg-white rounded-xl border border-gray-200 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                <input
                  type="password"
                  required
                  placeholder="At least 8 characters"
                  className="w-full px-4 py-3.5 bg-white rounded-xl border border-gray-200 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all shadow-sm"
                />
              </div>

              {login && (
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className="relative flex items-center justify-center w-5 h-5">
                      <input type="checkbox" className="peer appearance-none w-5 h-5 border border-gray-300 rounded cursor-pointer checked:bg-black checked:border-black transition-colors" />
                      <Check className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                    </div>
                    <span className="text-sm text-gray-600 group-hover:text-black transition-colors">Remember me</span>
                  </label>
                  <Link href="#" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">
                    Forgot password?
                  </Link>
                </div>
              )}

              <div className="pt-2">
                <Link
                  href="/account"
                  className="w-full flex items-center justify-center gap-2 bg-black text-white py-4 rounded-xl font-medium hover:bg-gray-800 transition-all active:scale-[0.98] shadow-md shadow-black/10"
                >
                  {login ? "Sign in" : "Create account"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </form>

            <div className="mt-8 text-center text-sm text-gray-500 border-t border-gray-200/60 pt-8">
              {login ? "New to Woxly?" : "Already have an account?"} {" "}
              <Link href={login ? "/signup" : "/login"} className="font-semibold text-black hover:underline underline-offset-4">
                {login ? "Create an account" : "Sign in here"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
