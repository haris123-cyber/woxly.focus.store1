import { catalog } from "@/data/catalog";
import { PageHero, SiteShell } from "@/components/site-shell";
import { AccountNav } from "@/components/account-nav";
import { ProductCard } from "@/components/product-card";

export const metadata = { title: "Wishlist | Woxly" };

export default function WishlistPage() {
  return (
    <SiteShell>
      <AccountNav active="wishlist" />
      <PageHero eyebrow="Saved for later" title="Your wishlist" copy="A quiet corner for the pieces you want to come back to." />
      <section className="productGrid sectionShell">
        {catalog.map(item => (
          <ProductCard key={item.slug} product={item} />
        ))}
      </section>
    </SiteShell>
  );
}
