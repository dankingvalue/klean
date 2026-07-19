import { NextRequest, NextResponse } from "next/server";
import { checkPassword, setAdminCookie, clearAdminCookie, isAdmin } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({ admin: isAdmin() });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  if (typeof body.password === "string" && checkPassword(body.password)) {
    setAdminCookie();
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ ok: false, error: "Wrong password." }, { status: 401 });
}

export async function DELETE() {
  clearAdminCookie();
  return NextResponse.json({ ok: true });
}
