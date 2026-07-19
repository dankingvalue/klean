import { NextRequest, NextResponse } from "next/server";
import { getDb, ensureSchema, makeRef, rowToBooking, type Booking } from "@/lib/db";
import { isAdmin } from "@/lib/auth";
import { SERVICE_OPTIONS } from "@/lib/catalog";

export const runtime = "nodejs";

const PHONE_RE = /^(?:\+?254|0)7\d{8}$/;

export async function POST(req: NextRequest) {
  const b = await req.json().catch(() => null);
  if (!b) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const name     = String(b.name    ?? "").trim();
  const phone    = String(b.phone   ?? "").replace(/\s+/g, "");
  const service  = String(b.service ?? "").trim();
  const address  = String(b.address ?? "").trim();
  const pickup_date  = b.pickup_date ? String(b.pickup_date).slice(0, 10)  : null;
  const pickup_time  = b.pickup_time ? String(b.pickup_time).slice(0, 40)  : null;
  const details      = b.details     ? String(b.details).slice(0, 2000)    : null;
  const estimate_total = Number.isFinite(Number(b.estimate_total))
    ? Math.max(0, Math.round(Number(b.estimate_total))) : null;

  const errors: Record<string, string> = {};
  if (name.length < 2)   errors.name    = "Please enter your name.";
  if (!PHONE_RE.test(phone)) errors.phone = "Enter a valid Safaricom/Airtel number, e.g. 0712 345 678.";
  if (!(SERVICE_OPTIONS as readonly string[]).includes(service)) errors.service = "Choose a service.";
  if (address.length < 5) errors.address = "Tell us where to pick up (estate, house/apt no.).";
  if (Object.keys(errors).length) return NextResponse.json({ errors }, { status: 422 });

  await ensureSchema();
  const db = getDb();

  let ref = makeRef();
  const { rows } = await db.execute({ sql: "SELECT 1 FROM bookings WHERE ref = ?", args: [ref] });
  if (rows.length) ref = makeRef();

  await db.execute({
    sql: `INSERT INTO bookings
            (ref, name, phone, service, address, pickup_date, pickup_time, details, estimate_total)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [ref, name, phone, service, address, pickup_date, pickup_time, details, estimate_total],
  });

  return NextResponse.json({ ok: true, ref }, { status: 201 });
}

export async function GET() {
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await ensureSchema();
  const { rows } = await getDb().execute(
    "SELECT * FROM bookings ORDER BY created_at DESC LIMIT 500"
  );
  const bookings: Booking[] = rows.map(rowToBooking);
  return NextResponse.json({ bookings });
}
