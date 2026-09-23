export type Variant = {
  id: string;
  name: string;
  swatch: string;
  inStock: boolean;
};

export type StoreProduct = {
  id: string;
  name: string;
  eyebrow: string;
  headline: string;
  description: string;
  price: number;
  compareAtPrice: number;
  rating: number;
  reviewCount: number;
  variants: Variant[];
  images: { src: string; alt: string }[];
  badge?: string;
  urgencyMessage?: string;
};
