import type { StoreProduct } from "@/types/store";

export const product: StoreProduct = {
  id: "sol-01",
  name: "Sol Focus Lamp",
  eyebrow: "Designed for your best work",
  headline: "Light that helps you find your flow.",
  description:
    "A calm, glare-free desk light with effortless dimming and all-day battery life. Made to help you focus without making your space feel like an office.",
  price: 3499,
  compareAtPrice: 4299,
  rating: 4.9,
  reviewCount: 128,
  variants: [
    { id: "warm-sand", name: "Warm sand", swatch: "#e9dfcf", inStock: true },
    { id: "soft-white", name: "Soft white", swatch: "#f7f5ef", inStock: true },
    { id: "graphite", name: "Graphite", swatch: "#343431", inStock: true },
  ],
  images: [
    { src: "/images/sol-hero.png", alt: "Sol Focus Lamp in warm sand on a stone pedestal" },
    { src: "/images/sol-lifestyle.png", alt: "Sol Focus Lamp illuminating a quiet home workspace" },
    { src: "/images/sol-detail.png", alt: "Close detail of the Sol Focus Lamp dimmer dial" },
  ],
};

export const bundles = [
  { quantity: 1, label: "One lamp", caption: "For your desk", price: 3499 },
  { quantity: 2, label: "Pair of lamps", caption: "Save ₹999", price: 5999, badge: "Most popular" },
  { quantity: 3, label: "Studio set", caption: "Save ₹2,498", price: 7999, badge: "Best value" },
];

export const faqs = [
  { question: "How long does the battery last?", answer: "Up to 18 hours at medium brightness, or 8 hours at full brightness. A full USB-C charge takes around 3 hours." },
  { question: "Can I change the light temperature?", answer: "Yes. Tap the dial to move between warm 2700K, balanced 4000K and daylight 5000K. Rotate it for smooth dimming." },
  { question: "Is the light harsh on the eyes?", answer: "Sol uses a recessed, flicker-free diffuser to spread light evenly across your work surface and reduce direct glare." },
  { question: "What is included in the box?", answer: "Your Sol lamp, a braided USB-C charging cable, a quick-start card and a two-year limited warranty." },
  { question: "What if it is not right for my desk?", answer: "You can return an unused lamp in its original packaging within 30 days of delivery." },
];

export const reviews = [
  { quote: "It gives my desk the warmth I wanted, but the light is still bright enough for detailed sketching.", name: "Mira S.", meta: "Verified buyer · Bengaluru" },
  { quote: "The dial feels unusually good and the battery really does get me through a full week of evenings.", name: "Arjun K.", meta: "Verified buyer · Pune" },
  { quote: "Finally, a task light I do not want to hide when I finish work.", name: "Nadia R.", meta: "Verified buyer · Mumbai" },
];
