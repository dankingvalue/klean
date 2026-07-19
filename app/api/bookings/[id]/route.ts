import { NextRequest, NextResponse } from "next/server";
import { getDb, ensureSchema, BOOKING_STATUSES } from "@/lib/db";
import { isAdmin } from "@/lib/auth";

export const runtime = "nodejs";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0)
    return NextResponse.json({ error: "Bad id" }, { status: 400 });

  const body = await req.json().catch(() => ({}));
  const status = String(body.status ?? "");
  if (!(BOOKING_STATUSES as string[]).includes(status))
    return NextResponse.json({ error: "Invalid status" }, { status: 422 });

  await ensureSchema();
  const result = await getDb().execute({
    sql:  "UPDATE bookings SET status = ? WHERE id = ?",
    args: [status, id],
  });

  if (result.rowsAffected === 0)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ ok: true });
}
