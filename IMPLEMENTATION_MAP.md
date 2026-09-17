# Focus Store implementation map

This repository was empty when implementation began, so the frontend is a standalone reference implementation rather than an integration with an existing Woxly commerce repository.

## Architecture

- `src/app`: Next.js App Router shell, metadata and product structured data.
- `src/components/storefront.tsx`: interactive single-product experience and guarded UI states.
- `src/data/store.ts`: demo content boundary; replace this module with a server-side storefront context adapter.
- `src/types/store.ts`: normalized product and variant contracts.
- `src/lib/catalog-mode.mjs`: PRD catalog-mode resolver, isolated for testing.
- `tests`: catalog boundary tests.

## Production integration seams

The cart, checkout, inventory, pincode, reviews and analytics interactions are deliberately local demo behavior. They must be replaced with existing Woxly services. Client-side prices and delivery results in this demo are not authoritative.

## Implemented PRD coverage

Compact adaptive header, product hero, real UI price derivation, colour variants, quantity bundles, cart drawer, trust strip, benefits, lifestyle story, feature proof, specifications, review summary, delivery checker UI, returns and warranty reassurance, FAQ, final CTA, footer, mobile purchase bar, metadata and Product JSON-LD.
