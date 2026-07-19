"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, MessageCircle, RotateCcw, CalendarCheck } from "lucide-react";
import { CATALOG, waLink, type CatalogItem } from "@/lib/catalog";

const ALL_ITEMS = Object.fromEntries(
  CATALOG.flatMap((g) => g.items.map((i) => [i.id, i]))
) as Record<string, CatalogItem>;

export default function PricingEstimator() {
  const router = useRouter();
  const [qty, setQty] = useState<Record<string, number>>({});
  const [tab, setTab] = useState(0);

  const setItem = (id: string, next: number) =>
    setQty((q) => ({ ...q, [id]: Math.max(0, Math.min(99, next)) }));

  const lines = useMemo(
    () =>
      Object.entries(qty)
        .filter(([, n]) => n > 0)
        .map(([id, n]) => ({ item: ALL_ITEMS[id], n, subtotal: ALL_ITEMS[id].price * n })),
    [qty]
  );
  const total = lines.reduce((sum, l) => sum + l.subtotal, 0);

  const orderText = useMemo(
    () =>
      lines
        .map((l) => `${l.item.name} × ${l.n}${l.item.unit ? ` ${l.item.unit}` : ""} — Ksh ${l.subtotal}`)
        .join("\n"),
    [lines]
  );

  const waUrl = waLink(
    `Hi Quicklean, I'd like to place an order:\n\n${orderText}\n\nEstimated total: Ksh ${total}\n\nPlease confirm pickup.`
  );

  const goToBooking = () => {
    const params = new URLSearchParams({ details: orderText, total: String(total) });
    router.push(`/book?${params.toString()}`);
  };

  return (
    <div className="rounded-3xl bg-white border border-mist shadow-sm overflow-hidden">
      <div className="p-8 lg:p-10 grid lg:grid-cols-[1fr_320px] gap-10">
        {/* Item picker */}
        <div>
          <h3 className="font-display text-2xl font-bold mb-1">Estimate your order</h3>
          <p className="text-slate-600 mb-6 text-sm">
            Add items to see your total, then book a pickup or send the whole order on WhatsApp.
          </p>

          <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Price categories">
            {CATALOG.map((g, i) => (
              <button
                key={g.title}
                role="tab"
                aria-selected={tab === i}
                onClick={() => setTab(i)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua ${
                  tab === i
                    ? "bg-ink text-white"
                    : "bg-paper text-slate-600 border border-mist hover:bg-[#eef4f3]"
                }`}
              >
                {g.title}
              </button>
            ))}
          </div>

          <ul className="divide-y divide-mist">
            {CATALOG[tab].items.map((item) => {
              const n = qty[item.id] ?? 0;
              return (
                <li key={item.id} className="flex items-center justify-between gap-4 py-3">
                  <div className="min-w-0">
                    <p className="font-medium text-ink truncate">{item.name}</p>
                    <p className="text-sm text-slate-500">
                      Ksh {item.price}
                      {item.unit ? ` / ${item.unit}` : " / item"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      aria-label={`Remove one ${item.name}`}
                      onClick={() => setItem(item.id, n - 1)}
                      disabled={n === 0}
                      className="w-9 h-9 rounded-full border border-mist flex items-center justify-center text-slate-600 disabled:opacity-30 hover:bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-aqua"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-bold tabular-nums">{n}</span>
                    <button
                      aria-label={`Add one ${item.name}`}
                      onClick={() => setItem(item.id, n + 1)}
                      className="w-9 h-9 rounded-full bg-aqua text-white flex items-center justify-center hover:bg-[#0c8b97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Summary */}
        <aside className="rounded-2xl bg-paper border border-mist p-6 flex flex-col h-fit lg:sticky lg:top-24">
          <h4 className="font-bold mb-4">Your estimate</h4>
          {lines.length === 0 ? (
            <p className="text-sm text-slate-500 flex-1">
              No items yet. Add clothes, duvets or ironing on the left and your total appears here.
            </p>
          ) : (
            <ul className="space-y-2 text-sm flex-1 mb-4">
              {lines.map((l) => (
                <li key={l.item.id} className="flex justify-between gap-3">
                  <span className="text-slate-600">
                    {l.item.name} × {l.n}
                  </span>
                  <span className="font-semibold whitespace-nowrap">Ksh {l.subtotal}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="border-t border-dashed border-mist pt-4 mt-2 flex justify-between items-baseline">
            <span className="text-sm text-slate-500">Estimated total</span>
            <span className="text-2xl font-black text-ink">Ksh {total}</span>
          </div>

          <button
            onClick={goToBooking}
            disabled={lines.length === 0}
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold bg-ink text-white hover:bg-[#1a3a57] disabled:bg-slate-200 disabled:text-slate-400 transition-colors"
          >
            <CalendarCheck className="w-5 h-5" /> Book pickup with these items
          </button>
          <a
            href={lines.length ? waUrl : undefined}
            aria-disabled={lines.length === 0}
            className={`mt-3 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold border transition-colors ${
              lines.length
                ? "border-aqua text-aqua hover:bg-aqua/10"
                : "border-mist text-slate-400 pointer-events-none"
            }`}
          >
            <MessageCircle className="w-5 h-5" /> Order via WhatsApp
          </a>
          {lines.length > 0 && (
            <button
              onClick={() => setQty({})}
              className="mt-3 inline-flex items-center justify-center gap-1.5 text-sm text-slate-500 hover:text-ink"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Clear estimate
            </button>
          )}
          <p className="text-xs text-slate-400 mt-4">
            Prices match our in-shop list. Carpet, sofa and property cleaning are quoted per job.
          </p>
        </aside>
      </div>
    </div>
  );
}
