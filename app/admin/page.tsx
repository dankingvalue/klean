"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, LogOut, RefreshCw, Lock, Phone } from "lucide-react";
import { waLink } from "@/lib/catalog";

type Booking = {
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
  status: string;
  created_at: string;
};

const STATUSES = ["new", "confirmed", "picked_up", "cleaning", "delivered", "cancelled"];
const STATUS_STYLE: Record<string, string> = {
  new: "bg-peg/30 text-[#7a5a00]",
  confirmed: "bg-aqua/15 text-aqua",
  picked_up: "bg-blue-100 text-blue-700",
  cleaning: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-slate-200 text-slate-500",
};

export default function AdminPage() {
  const [auth, setAuth] = useState<"checking" | "locked" | "in">("checking");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/bookings");
    if (res.status === 401) {
      setAuth("locked");
      setLoading(false);
      return;
    }
    const data = await res.json();
    setBookings(data.bookings ?? []);
    setAuth("in");
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const login = async () => {
    setLoginError("");
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setPassword("");
      load();
    } else {
      setLoginError("Wrong password. Try again.");
    }
  };

  const logout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    setAuth("locked");
    setBookings([]);
  };

  const updateStatus = async (id: number, status: string) => {
    setBookings((bs) => bs.map((b) => (b.id === id ? { ...b, status } : b)));
    await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  };

  if (auth === "checking") {
    return (
      <div className="flex justify-center py-32">
        <Loader2 className="w-8 h-8 animate-spin text-aqua" />
      </div>
    );
  }

  if (auth === "locked") {
    return (
      <div className="max-w-sm mx-auto px-6 py-24">
        <div className="bg-white border border-mist rounded-3xl p-8 shadow-sm text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-aqua/10 flex items-center justify-center mb-4">
            <Lock className="w-7 h-7 text-aqua" />
          </div>
          <h1 className="font-display text-2xl font-extrabold mb-1">Staff sign-in</h1>
          <p className="text-sm text-slate-500 mb-6">Enter the admin password to view bookings.</p>
          <input
            type="password"
            className="field mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
          />
          {loginError && <p className="field-error mb-3">{loginError}</p>}
          <button
            onClick={login}
            className="w-full bg-ink text-white rounded-full py-3 font-semibold hover:bg-[#1a3a57]"
          >
            Sign in
          </button>
        </div>
      </div>
    );
  }

  const shown = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);
  const counts = STATUSES.reduce<Record<string, number>>((acc, s) => {
    acc[s] = bookings.filter((b) => b.status === s).length;
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-extrabold">Bookings</h1>
          <p className="text-sm text-slate-500">
            {bookings.length} total · {counts.new ?? 0} new
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={load}
            className="inline-flex items-center gap-2 border border-mist rounded-full px-4 py-2 text-sm font-semibold hover:bg-white"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh
          </button>
          <button
            onClick={logout}
            className="inline-flex items-center gap-2 border border-mist rounded-full px-4 py-2 text-sm font-semibold hover:bg-white"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {["all", ...STATUSES].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize ${
              filter === s ? "bg-ink text-white" : "bg-white border border-mist text-slate-600 hover:bg-paper"
            }`}
          >
            {s.replace("_", " ")}
            {s !== "all" && counts[s] ? ` · ${counts[s]}` : ""}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <div className="bg-white border border-mist rounded-3xl p-12 text-center text-slate-500">
          No bookings here yet. New online bookings will appear automatically — hit Refresh.
        </div>
      ) : (
        <div className="space-y-4">
          {shown.map((b) => (
            <article key={b.id} className="bg-white border border-mist rounded-2xl p-6 grid lg:grid-cols-[1fr_auto] gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="font-mono text-sm font-bold text-slate-500">{b.ref}</span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full capitalize ${STATUS_STYLE[b.status] ?? ""}`}>
                    {b.status.replace("_", " ")}
                  </span>
                  <span className="text-xs text-slate-400">{new Date(b.created_at + "Z").toLocaleString("en-KE")}</span>
                </div>
                <p className="font-bold text-lg">
                  {b.name} <span className="font-normal text-slate-500">· {b.service}</span>
                </p>
                <p className="text-sm text-slate-600">
                  {b.address}
                  {b.pickup_date ? ` · ${b.pickup_date}` : ""} {b.pickup_time ? `· ${b.pickup_time}` : ""}
                </p>
                {b.details && (
                  <p className="text-sm text-slate-500 mt-2 whitespace-pre-line border-l-2 border-mist pl-3">{b.details}</p>
                )}
                {b.estimate_total != null && b.estimate_total > 0 && (
                  <p className="text-sm font-semibold mt-2">Estimate: Ksh {b.estimate_total}</p>
                )}
              </div>
              <div className="flex lg:flex-col gap-2 items-stretch shrink-0">
                <select
                  value={b.status}
                  onChange={(e) => updateStatus(b.id, e.target.value)}
                  className="field !py-2 text-sm capitalize"
                  aria-label={`Status for ${b.ref}`}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s.replace("_", " ")}
                    </option>
                  ))}
                </select>
                <a
                  href={`tel:${b.phone}`}
                  className="inline-flex items-center justify-center gap-1.5 border border-mist rounded-xl px-3 py-2 text-sm font-semibold hover:bg-paper"
                >
                  <Phone className="w-4 h-4" /> {b.phone}
                </a>
                <a
                  href={waLink(`Hi ${b.name}, this is Quicklean regarding your booking ${b.ref}.`).replace(
                    /wa\.me\/\d+/,
                    `wa.me/${b.phone.replace(/^0/, "254").replace(/^\+/, "")}`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 bg-aqua text-white rounded-xl px-3 py-2 text-sm font-semibold hover:bg-[#0c8b97]"
                >
                  WhatsApp client
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
