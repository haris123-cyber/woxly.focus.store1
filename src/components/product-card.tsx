import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

type CardProduct = { slug: string; name: string; category: string; price: number; compareAt?: number; image: string; badge?: string };

export function ProductCard({ product }: { product: CardProduct }) {
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
          className="absolute top-4 right-4 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-ink opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-white hover:text-amber"
        >
          <Heart className="w-4 h-4" />
        </button>
      </div>
      <div className="flex justify-between items-start gap-4">
        <div>
          <small className="text-muted text-xs font-medium tracking-wide uppercase block mb-1">
            {product.category}
          </small>
          <h3 className="text-ink font-medium text-[14px] sm:text-lg  leading-tight">
            <Link href={`/store/${product.slug}`} className="hover:text-muted transition-colors">
              {product.name}
            </Link>
          </h3>
        </div>
        <strong className="text-ink font-medium shrink-0">
          ₹{product.price.toLocaleString("en-IN")}
        </strong>
      </div>
    </article>
  );
}
