export function resolveCatalogMode(productCount) {
  if (productCount <= 0) return "coming-soon";
  if (productCount === 1) return "single";
  if (productCount === 2) return "comparison";
  if (productCount <= 5) return "curated";
  return "overflow";
}
