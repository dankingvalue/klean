import { createClient, type Client, type Row } from "@libsql/client";
import path from "path";
import fs from "fs";

// ── connection ────────────────────────────────────────────────────────────────
// Local file-based SQLite via LibSQL (pure JS, no native compilation).
// On Railway: mount a volume at /app/data so the file survives redeploys.
// DATABASE_URL env var lets you point at a Turso cloud DB in the future.

declare global {
  // eslint-disable-next-line no-var
  var __quicklean_db: Client | undefined;
}

function getDbUrl(): string {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  const dir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return `file:${path.join(dir, "quicklean.db")}`;
}

export function getDb(): Client {
  if (!global.__quicklean_db) {
    global.__quicklean_db = createClient({ url: getDbUrl() });
  }
  return global.__quicklean_db;
}

// ── schema ────────────────────────────────────────────────────────────────────
export async function ensureSchema(): Promise<void> {
  const db = getDb();
  await db.execute(`
    CREATE TABLE IF NOT EXISTS bookings (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      ref         TEXT    NOT NULL UNIQUE,
      name        TEXT    NOT NULL,
      phone       TEXT    NOT NULL,
      service     TEXT    NOT NULL,
      address     TEXT    NOT NULL,
      pickup_date TEXT,
      pickup_time TEXT,
      details     TEXT,
      estimate_total INTEGER,
      status      TEXT    NOT NULL DEFAULT 'new',
      created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
    )
  `);
}

// ── types ─────────────────────────────────────────────────────────────────────
export type BookingStatus =
  | "new" | "confirmed" | "picked_up" | "cleaning" | "delivered" | "cancelled";

export type Booking = {
  id: number;
  ref: string;
  name: string;
  phone: string;
  service: string;
  address: string;
  pickup_date: string | null;
  pickup_time: string | null;
  details: string | null;
  estimate_total: number | null;
  status: BookingStatus;
  created_at: string;
};

export const BOOKING_STATUSES: BookingStatus[] = [
  "new", "confirmed", "picked_up", "cleaning", "delivered", "cancelled",
];

// ── helpers ───────────────────────────────────────────────────────────────────
export function rowToBooking(r: Row): Booking {
  return {
    id:             Number(r.id),
    ref:            String(r.ref),
    name:           String(r.name),
    phone:          String(r.phone),
    service:        String(r.service),
    address:        String(r.address),
    pickup_date:    r.pickup_date != null ? String(r.pickup_date) : null,
    pickup_time:    r.pickup_time != null ? String(r.pickup_time) : null,
    details:        r.details     != null ? String(r.details)     : null,
    estimate_total: r.estimate_total != null ? Number(r.estimate_total) : null,
    status:         String(r.status) as BookingStatus,
    created_at:     String(r.created_at),
  };
}

export function makeRef(): string {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `QL-${Date.now().toString(36).toUpperCase().slice(-4)}${n}`;
}
