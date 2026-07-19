import { createHash } from "crypto";
import { cookies } from "next/headers";

const COOKIE = "ql_admin";

function password(): string {
  return process.env.ADMIN_PASSWORD || "quicklean2026";
}

export function token(): string {
  return createHash("sha256").update(`ql:${password()}`).digest("hex");
}

export function checkPassword(input: string): boolean {
  return input === password();
}

export function isAdmin(): boolean {
  return cookies().get(COOKIE)?.value === token();
}

export function setAdminCookie() {
  cookies().set(COOKIE, token(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12, // 12 hours
  });
}

export function clearAdminCookie() {
  cookies().delete(COOKIE);
}
