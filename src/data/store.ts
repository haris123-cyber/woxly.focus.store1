import type { StoreProduct } from "@/types/store";

export const productsMap: Record<string, StoreProduct> = {
  "sol-focus-lamp": {
    id: "sol-01",
    name: "Sol Focus Lamp",
    eyebrow: "Designed for your best work",
    headline: "Light that helps you find your flow.",
    description: "A calm, glare-free desk light with effortless dimming and all-day battery life. Made to help you focus without making your space feel like an office.",
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
  },
  "sol-focus-lamp-sand": {
    id: "sol-02",
    name: "Sol Lamp · Sand",
    eyebrow: "Warm up your workspace",
    headline: "The calm of a quiet morning, bottled.",
    description: "The classic Sol Focus Lamp in a grounding, earthy Warm Sand finish. Perfect for bringing a touch of nature and warmth to austere desk setups.",
    price: 3499,
    compareAtPrice: 3499,
    rating: 4.8,
    reviewCount: 94,
    variants: [
      { id: "warm-sand", name: "Warm sand", swatch: "#e9dfcf", inStock: true }
    ],
    images: [
      { src: "/images/desk-companion.jpg", alt: "Sol Lamp in Sand finish on a wooden desk" },
      { src: "/images/sol-ambient.jpg", alt: "Warm light casting soft shadows" }
    ],
  },
  "sol-focus-lamp-graphite": {
    id: "sol-03",
    name: "Sol Lamp · Graphite",
    eyebrow: "Sleek and understated",
    headline: "Disappears into the background.",
    description: "Our signature task lamp in a stealthy Graphite finish. Engineered for modern, minimalist setups where the work takes center stage.",
    price: 3499,
    compareAtPrice: 3499,
    rating: 5.0,
    reviewCount: 211,
    variants: [
      { id: "graphite", name: "Graphite", swatch: "#343431", inStock: true },
    ],
    images: [
      { src: "/images/precision-dial.jpg", alt: "Graphite lamp base with precision dial" },
      { src: "/images/sol-hero.png", alt: "Sol lamp standing tall" }
    ],
  },
  "sol-ambient-glow": {
    id: "sol-04",
    name: "Sol Ambient Glow",
    eyebrow: "Set the mood",
    headline: "Atmosphere, on demand.",
    description: "A compact, omnidirectional light source designed for bedside tables and living spaces. Casts a warm, flickering glow that mimics candle light.",
    price: 2999,
    compareAtPrice: 3499,
    rating: 4.7,
    reviewCount: 65,
    variants: [
      { id: "soft-white", name: "Soft white", swatch: "#f7f5ef", inStock: true }
    ],
    images: [
      { src: "/images/sol-ambient.jpg", alt: "Ambient glow lamp illuminating a cozy corner" },
      { src: "/images/desk-companion.jpg", alt: "Ambient lamp on a nightstand" }
    ],
  },
  "sol-desk-companion": {
    id: "sol-05",
    name: "Desk Companion",
    eyebrow: "Compact brilliance",
    headline: "Small footprint, huge impact.",
    description: "A versatile companion light for tight spaces. Perfect for reading nooks, small desks, or as a supplementary light for detail work.",
    price: 3999,
    compareAtPrice: 3999,
    rating: 4.9,
    reviewCount: 154,
    variants: [
      { id: "warm-sand", name: "Warm sand", swatch: "#e9dfcf", inStock: true },
      { id: "graphite", name: "Graphite", swatch: "#343431", inStock: true },
    ],
    images: [
      { src: "/images/desk-companion.jpg", alt: "Desk companion lamp next to a notebook" },
      { src: "/images/sol-hero.png", alt: "Side profile of the desk companion" }
    ],
  },
  "sol-precision-dial": {
    id: "sol-06",
    name: "Precision Dial",
    eyebrow: "Tactile control",
    headline: "Take control of your atmosphere.",
    description: "A beautifully machined aluminum dial that pairs wirelessly with any Sol lamp. Turn to adjust brightness, tap to change color temperature.",
    price: 1499,
    compareAtPrice: 1499,
    rating: 4.6,
    reviewCount: 88,
    variants: [
      { id: "silver", name: "Machined Silver", swatch: "#e0e0e0", inStock: true },
      { id: "graphite", name: "Matte Graphite", swatch: "#343431", inStock: false },
    ],
    images: [
      { src: "/images/precision-dial.jpg", alt: "Close up of the precision machined dial" },
      { src: "/images/sol-detail.png", alt: "Dial resting on a wooden desk" }
    ],
  },
};

export const bundles = [
  { quantity: 1, label: "One lamp", caption: "For your desk", price: 3499 },
  { quantity: 2, label: "Pair of lamps", caption: "Save ₹999", price: 5999, badge: "Most popular" },
  { quantity: 3, label: "Studio set", caption: "Save ₹2,498", price: 7999, badge: "Best value" },
];

export const product = productsMap["sol-focus-lamp"];

export const faqs = [
  { question: "How long does the battery last?", answer: "Up to 18 hours at medium brightness, or 8 hours at full brightness. A full USB-C charge takes around 3 hours." },
  { question: "Can I change the light temperature?", answer: "Yes. Tap the dial to move between warm 2700K, balanced 4000K and daylight 5000K. Rotate it for smooth dimming." },
  { question: "Is the light harsh on the eyes?", answer: "Sol uses a recessed, flicker-free diffuser to spread light evenly across your work surface and reduce direct glare." },
  { question: "What is included in the box?", answer: "Your Sol lamp, a braided USB-C charging cable, a quick-start card and a two-year limited warranty." },
  { question: "What if it is not right for my desk?", answer: "You can return an unused lamp in its original packaging within 30 days of delivery." },
];

export const reviews = [
  {
    title: "Perfect for detailed sketching",
    quote: "It gives my desk the warmth I wanted, but the light is still bright enough for detailed sketching. The dimming is incredibly smooth.",
    name: "Mira S.",
    meta: "Verified buyer",
    rating: 5,
    date: "1 week ago",
    images: ["/images/sol-ambient.jpg", "/images/desk-companion.jpg", "/images/sol-detail.png"],
    helpfulCount: 12,
    unhelpfulCount: 0
  },
  {
    title: "Battery life is amazing",
    quote: "I've been using this for over 2 weeks and the battery easily lasts through my workdays. Premium build and minimal design.",
    name: "Arjun K.",
    meta: "Verified buyer",
    rating: 5,
    date: "2 weeks ago",
    images: ["/images/sol-hero.png"],
    helpfulCount: 8,
    unhelpfulCount: 0
  },
  {
    title: "Great product with minor issues",
    quote: "The light quality is excellent and looks beautiful on my desk. Only wish it came with a longer cable.",
    name: "Priya N.",
    meta: "Verified buyer",
    rating: 4,
    date: "3 weeks ago",
    images: ["/images/precision-dial.jpg", "/images/sol-lifestyle.png"],
    helpfulCount: 5,
    unhelpfulCount: 1
  },
  {
    title: "Lamp bulb pro",
    quote: "quality light's excellent and looks beautiful on my desk. Only wish it came with a longer cable.",
    name: "Priya N.",
    meta: "Verified buyer",
    rating: 4,
    date: "3 weeks ago",
    images: ["/images/pr.jpg", "/images/sol-lifestyle.png"],
    helpfulCount: 5,
    unhelpfulCount: 1
  },
];
