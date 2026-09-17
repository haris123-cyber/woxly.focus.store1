import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/shop", "/product/sol-focus-lamp", "/search", "/cart", "/checkout", "/track-order", "/login", "/signup", "/account", "/account/profile", "/account/orders", "/wishlist", "/blog", "/about", "/contact", "/faq", "/privacy-policy", "/terms", "/shipping-delivery", "/returns-refunds"];
  return routes.map(route => ({
    url: `https://woxly-focus-store.vercel.app${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/shop" ? "weekly" : "monthly",
  }));
}
