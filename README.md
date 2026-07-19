# Quicklean & General Supply Enterprise — Website

Next.js 14 (App Router) + Tailwind + SQLite. Marketing site, price estimator,
online booking with database storage, WhatsApp fallback, and a staff admin panel.

## Quick start
```bash
npm install
cp .env.example .env      # set ADMIN_PASSWORD
npm run dev               # http://localhost:3000
```

## Pages
| Route      | What it is |
|------------|------------|
| `/`        | Home: services, full price list, estimator, location map, reviews |
| `/book`    | Booking form → saved to SQLite, with WhatsApp fallback if the API fails |
| `/admin`   | Staff dashboard (password from `ADMIN_PASSWORD`): view bookings, change status, call/WhatsApp the client |

## Data
Bookings are stored in `data/quicklean.db` (auto-created). Back this file up.
The price catalog and business details (phone, address, hours) live in `lib/catalog.ts` — edit prices there and every page, the estimator, and WhatsApp messages update together.

## Deploying
Runs anywhere Node runs (VPS, Railway, Render): `npm run build && npm start`.
Note: Vercel serverless won't persist the SQLite file — use a VPS/persistent host,
or swap `lib/db.ts` for Turso/Postgres if you want Vercel.
