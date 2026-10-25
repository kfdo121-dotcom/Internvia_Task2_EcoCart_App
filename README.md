# kilo: shop by footprint

Next.js 14 (App Router) · TypeScript · Tailwind · Prisma · PostgreSQL · Stripe Checkout

## Run it
```bash
cp .env.example .env          # fill in DATABASE_URL and Stripe test keys
npm install
npx prisma migrate dev --name init
npm run db:seed
npm run dev
# in another terminal, forward webhooks and copy the whsec_ into .env:
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```
Test card: `4242 4242 4242 4242`, any future date, any CVC.

## How it fits together
- **Carbon estimate:** `lib/carbon.ts` = Σ(material kg × emission factor) + weight × shipping km × freight factor. Stored on `Product.co2eKg`; the seed script shows how to recompute it.
- **Checkout:** `/api/checkout` takes only product IDs and quantities, reads prices from the DB, writes a `PENDING` order with snapshotted prices and footprints, then opens a Stripe Checkout session. The offset is its own line item.
- **Payment confirmation:** `/api/webhooks/stripe` verifies the signature and flips the order to `PAID`. It is idempotent, so Stripe retries are harmless.

## Not included yet
Auth and user accounts, inventory, shipping and tax (Stripe Tax), refunds, an admin UI, tests, and real offset retirement. The offset is recorded on the order (`offsetKg`, `offsetProjectId`); buying credits from the provider is a separate batch job you would add. Emission factors are illustrative, not audited.
