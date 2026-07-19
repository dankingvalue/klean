"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CalendarCheck, MessageCircle, CheckCircle, Loader2, MapPin } from "lucide-react";
import { BUSINESS, SERVICE_OPTIONS, waLink } from "@/lib/catalog";

const TIME_SLOTS = ["Morning (8 – 11 AM)", "Midday (11 AM – 2 PM)", "Afternoon (2 – 5 PM)"];

function BookingForm() {
  const search = useSearchParams();
  const prefillDetails = search.get("details") ?? "";
  const prefillTotal = search.get("total") ?? "";

  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: SERVICE_OPTIONS[0] as string,
    address: "",
    pickup_date: "",
    pickup_time: TIME_SLOTS[0],
    details: prefillDetails,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "failed">("idle");
  const [ref, setRef] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const waFallback = waLink(
    `Hi Quicklean, I'd like to book a pickup.\n\nName: ${form.name}\nPhone: ${form.phone}\nService: ${form.service}\nPickup address: ${form.address}\nDate: ${form.pickup_date || "Any"}\nTime: ${form.pickup_time}\n${form.details ? `\nItems / notes:\n${form.details}\n` : ""}${prefillTotal ? `\nEstimated total: Ksh ${prefillTotal}` : ""}`
  );

  const submit = async () => {
    setState("sending");
    setErrors({});
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          estimate_total: prefillTotal ? Number(prefillTotal) : null,
        }),
      });
      const data = await res.json();
      if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        setState("idle");
        return;
      }
      if (!res.ok) throw new Error("Request failed");
      setRef(data.ref);
      setState("done");
    } catch {
      setState("failed");
    }
  };

  if (state === "done") {
    return (
      <div className="max-w-lg mx-auto text-center bg-white border border-mist rounded-3xl p-10 shadow-sm">
        <CheckCircle className="w-14 h-14 text-aqua mx-auto mb-4" />
        <h1 className="font-display text-3xl font-extrabold mb-2">Pickup booked!</h1>
        <p className="text-slate-600 mb-1">
          Your booking reference is <strong className="text-ink">{ref}</strong>.
        </p>
        <p className="text-slate-600 mb-8">
          We'll call {form.phone} shortly to confirm. Want it even faster? Ping us the reference on
          WhatsApp.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={waLink(`Hi Quicklean, I just booked online. My reference is ${ref}.`)}
            className="inline-flex items-center justify-center gap-2 bg-aqua text-white px-6 py-3 rounded-full font-semibold hover:bg-[#0c8b97]"
          >
            <MessageCircle className="w-5 h-5" /> Confirm on WhatsApp
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold border border-mist hover:bg-paper"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-[1fr_340px] gap-10 items-start">
      <div className="bg-white border border-mist rounded-3xl p-8 lg:p-10 shadow-sm">
        <h1 className="font-display text-3xl lg:text-4xl font-extrabold mb-2">Book a pickup</h1>
        <p className="text-slate-600 mb-8">
          Fill this in and we'll call to confirm — or skip the form and{" "}
          <a href={waFallback} className="text-aqua font-semibold hover:underline">
            book on WhatsApp
          </a>
          .
        </p>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="field-label">Full name</label>
            <input id="name" className="field" placeholder="e.g. Amina Otieno" value={form.name} onChange={set("name")} />
            {errors.name && <p className="field-error">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="field-label">Phone number</label>
            <input id="phone" className="field" inputMode="tel" placeholder="07XX XXX XXX" value={form.phone} onChange={set("phone")} />
            {errors.phone && <p className="field-error">{errors.phone}</p>}
          </div>
          <div>
            <label htmlFor="service" className="field-label">Service</label>
            <select id="service" className="field" value={form.service} onChange={set("service")}>
              {SERVICE_OPTIONS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            {errors.service && <p className="field-error">{errors.service}</p>}
          </div>
          <div>
            <label htmlFor="address" className="field-label">Pickup address</label>
            <input id="address" className="field" placeholder="Estate, block & house no." value={form.address} onChange={set("address")} />
            {errors.address && <p className="field-error">{errors.address}</p>}
          </div>
          <div>
            <label htmlFor="date" className="field-label">Preferred date</label>
            <input id="date" type="date" className="field" min={new Date().toISOString().slice(0, 10)} value={form.pickup_date} onChange={set("pickup_date")} />
          </div>
          <div>
            <label htmlFor="time" className="field-label">Preferred time</label>
            <select id="time" className="field" value={form.pickup_time} onChange={set("pickup_time")}>
              {TIME_SLOTS.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="details" className="field-label">
              Items / notes {prefillTotal && <span className="font-normal text-slate-500">(from your estimate — Ksh {prefillTotal})</span>}
            </label>
            <textarea id="details" className="field min-h-[120px]" placeholder="e.g. 5 kg mixed clothes, 1 duvet 6×6, 2 suits for dry cleaning" value={form.details} onChange={set("details")} />
          </div>
        </div>

        {state === "failed" && (
          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
            The booking didn't reach our server. Your details are ready to send on WhatsApp instead —
            use the green button below and we'll take it from there.
          </div>
        )}

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <button
            onClick={submit}
            disabled={state === "sending"}
            className="inline-flex items-center justify-center gap-2 bg-ink text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#1a3a57] disabled:opacity-60 transition-colors"
          >
            {state === "sending" ? <Loader2 className="w-5 h-5 animate-spin" /> : <CalendarCheck className="w-5 h-5" />}
            {state === "sending" ? "Booking…" : "Book pickup"}
          </button>
          <a
            href={waFallback}
            className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-lg transition-colors ${
              state === "failed"
                ? "bg-aqua text-white hover:bg-[#0c8b97]"
                : "border border-mist text-ink hover:bg-paper"
            }`}
          >
            <MessageCircle className="w-5 h-5" /> Book on WhatsApp
          </a>
        </div>
      </div>

      <aside className="bg-white border border-mist rounded-3xl p-6 space-y-4 lg:sticky lg:top-24">
        <h2 className="font-display font-bold text-lg">Pickup & drop-off</h2>
        <p className="text-sm text-slate-600 flex items-start gap-2">
          <MapPin className="w-4 h-4 text-aqua mt-0.5 shrink-0" />
          <span>
            {BUSINESS.address}
            <br />
            {BUSINESS.landmark}
          </span>
        </p>
        <p className="text-sm text-slate-600">{BUSINESS.hours}</p>
        <div className="border-t border-dashed border-mist pt-4 text-sm text-slate-600 space-y-2">
          <p>· Free pickup & delivery within Nasra Gardens</p>
          <p>· 24–48 hr turnaround on laundry</p>
          <p>· Pay on delivery — cash or M-Pesa</p>
        </div>
      </aside>
    </div>
  );
}

export default function BookPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
      <Suspense fallback={<div className="text-center text-slate-500 py-20">Loading booking form…</div>}>
        <BookingForm />
      </Suspense>
    </div>
  );
}
