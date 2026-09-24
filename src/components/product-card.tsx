"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";

type CardProduct = { slug: string; name: string; category: string; price: number; compareAt?: number; image: string; badge?: string };

export function ProductCard({ product }: { product: CardProduct }) {
  const { wishlist, toggleWishlist } = useCart();
  const isWishlisted = wishlist.includes(product.slug);

  return (
    <article className="group flex flex-col font-sans">
      <div className="relative aspect-[4/5] bg-line/20 rounded-2xl overflow-hidden mb-4">
        <Link href={`/store/${product.slug}`} aria-label={`View ${product.name}`} className="absolute inset-0">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 800px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        {product.badge && (
          <span className="absolute top-4 left-4 bg-white text-ink text-[11px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm shadow-sm">
            {product.badge}
          </span>
        )}
        <button
          aria-label={`Save ${product.name}`}
          onClick={(e) => { e.preventDefault(); toggleWishlist(product.slug); }}
          className={`absolute z-20 top-4 right-4 w-9 h-9 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white hover:text-amber ${isWishlisted ? 'bg-white text-amber opacity-100 translate-y-0' : 'bg-white/80 text-ink opacity-100 translate-y-0 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0'}`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>
      <div className="flex flex-col gap-1">
        <div className="min-w-0 w-full">
          <small className="text-muted text-xs font-medium tracking-wide uppercase block mb-1 truncate">
            {product.category}
          </small>
          <h3 className="text-ink font-medium text-[14px] sm:text-[15px] md:text-base leading-tight truncate">
            <Link href={`/store/${product.slug}`} className="hover:text-muted transition-colors">
              {product.name}
            </Link>
          </h3>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 mt-1 shrink-0">
          <strong className="text-ink font-medium">
            ₹{product.price.toLocaleString("en-IN")}
          </strong>
          {product.compareAt && (
            <>
              <s className="text-black/50 text-[15px] sm:text-xs">₹{product.compareAt.toLocaleString("en-IN")}</s>
              <span className="text-[15px] font-bold ml-0 text-green-600 px-1.5 py-0.5 rounded-sm shrink-0 flex items-center">
                <ArrowDown size={12} color="currentColor" className="mr-0.5" />
                {Math.round(((product.compareAt - product.price) / product.compareAt) * 100)}%
              </span>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
