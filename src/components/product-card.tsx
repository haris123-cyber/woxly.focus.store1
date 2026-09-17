import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

type CardProduct = { slug: string; name: string; category: string; price: number; compareAt?: number; image: string; badge?: string };

export function ProductCard({ product }: { product: CardProduct }) {
  return <article className="productCard">
    <div className="productCardImage">
      <Link href="/product/sol-focus-lamp" aria-label={`View ${product.name}`}>
        <Image src={product.image} alt={product.name} fill sizes="(max-width: 800px) 50vw, 33vw" />
      </Link>
      {product.badge && <span>{product.badge}</span>}
      <button aria-label={`Save ${product.name}`}><Heart /></button>
    </div>
    <div className="productCardMeta"><div><small>{product.category}</small><h3><Link href="/product/sol-focus-lamp">{product.name}</Link></h3></div><strong>₹{product.price.toLocaleString("en-IN")}</strong></div>
  </article>;
}
