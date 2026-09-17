# Woxly Focus Store

A production-structured, mobile-first Next.js storefront reference based on the Woxly Focus Store PRD. The current product and commerce responses are fictional demo content; connect the adapters to Woxly services before accepting real orders.

## Included routes

The frontend includes the home sales experience, shop, product detail, search, cart, checkout, confirmation and tracking flows; login, sign-up, account, profile, orders and wishlist pages; and blog, about, contact, FAQ and complete policy pages.

All commerce, authentication, delivery and account mutations currently use frontend demo state. The visual flows are ready to connect to Woxly APIs without moving business rules into presentation components.

## Run locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Validate

```bash
pnpm lint
pnpm test
pnpm build
```

## Deploy

Push the repository to GitHub, import it in Vercel and keep the framework preset as Next.js. No environment variables are required for this frontend demo.
