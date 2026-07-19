import type { Metadata } from "next";
import Link from "next/link";
import {
  Droplets, Wind, Shirt, PackageCheck, Search, ShieldCheck,
  Clock, Truck, Wallet, HeartHandshake, CheckCircle, MessageCircle, CalendarCheck,
} from "lucide-react";
import PhotoSlot from "@/components/PhotoSlot";
import { waLink } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Why Quicklean — Care in Every Step",
  description:
    "See how Quicklean treats your clothes: careful sorting, colours separated, gentle washing, clothes hung to keep their shape, ironing with care, and a quality check before delivery.",
};

/* Each step pairs a real photo slot with a short care note */
const PROCESS = [
  {
    icon: Search,
    caption: "Sorting & checking pockets",
    hint: "/public/sorting.jpg",
    title: "We sort before we wash",
    body: "Every load is sorted by fabric and colour first. We check pockets as we go — any cash, keys or valuables are set aside and returned to you.",
  },
  {
    icon: Droplets,
    caption: "Gentle, fabric-right washing",
    hint: "/public/washing.jpg",
    title: "The right wash for the fabric",
    body: "Colours are separated from whites, and delicates get gentler handling. We use quality detergents and match the wash to what each garment can take — no one-size-fits-all.",
  },
  {
    icon: Shirt,
    caption: "Hung to keep their shape",
    hint: "/public/hanging.jpg",
    title: "Hung with care",
    body: "Shirts, dresses and suits are hung properly so they dry in shape, without the creases and stretched shoulders that come from being bundled up.",
  },
  {
    icon: Wind,
    caption: "Ironing & pressing with care",
    hint: "/public/ironing.jpg",
    title: "Ironed, not scorched",
    body: "We press at the right heat for each fabric and finish by hand where it matters, so collars sit right and delicate materials are never scorched or shined.",
  },
  {
    icon: PackageCheck,
    caption: "Neatly folded or bagged",
    hint: "/public/folding.jpg",
    title: "Packaged to arrive fresh",
    body: "Everyday laundry comes back neatly folded; dry cleaning is delivered on hangers in protective bags, so it reaches you ready to wear or hang straight up.",
  },
  {
    icon: ShieldCheck,
    caption: "Final quality check",
    hint: "/public/quality-check.jpg",
    title: "Checked before it leaves us",
    body: "Nothing goes out without a final look — for stains we may have missed, missing buttons, or anything not up to standard. If it's not right, it doesn't leave.",
  },
];

const PROMISES = [
  { icon: HeartHandshake, title: "Your clothes, treated like ours", desc: "Careful handling from pickup to delivery — we treat every garment the way we'd want our own treated." },
  { icon: ShieldCheck, title: "Valuables returned", desc: "Anything we find in pockets — cash, keys, cards — is kept safe and handed back to you." },
  { icon: Clock, title: "24–48 hour turnaround", desc: "Most laundry is back with you within one to two days. Need it sooner? Ask and we'll do our best." },
  { icon: Truck, title: "Free local pickup & delivery", desc: "We collect and return within Nasra Gardens and the surrounding area at no extra cost." },
  { icon: Wallet, title: "Honest, printed prices", desc: "The same prices as on our shop wall — no hidden fees, and you can pay on delivery by cash or M-Pesa." },
  { icon: CheckCircle, title: "Not happy? Tell us", desc: "If something isn't right when it reaches you, let us know and we'll make it right." },
];

const FAQ = [
  { q: "How long does laundry take?", a: "Most orders are ready within 24 to 48 hours. Larger loads or delicate dry cleaning may take a little longer — we'll tell you when you book." },
  { q: "What areas do you cover for pickup?", a: "We offer free pickup and delivery in Nasra Gardens and the wider Kangundo Road corridor, including nearby estates. Message us your location to confirm." },
  { q: "How do I pay?", a: "Pay on delivery by cash or M-Pesa — whatever's easier for you. Prices match our in-shop list, so there are no surprises." },
  { q: "What if something is damaged or missing?", a: "We check every order before it leaves us and return anything found in pockets. In the rare case something isn't right, contact us and we'll sort it out." },
];

export default function WhyUsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-16 lg:pt-24">
        <div className="max-w-3xl">
          <p className="font-display inline-block text-xs font-semibold tracking-widest uppercase bg-peg/25 text-[#7a5a00] px-3 py-1 rounded-full">
            Why Quicklean
          </p>
          <h1 className="font-display text-4xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] mt-5">
            Care you can see,<br />
            <span className="text-aqua">in every step.</span>
          </h1>
          <p className="text-lg text-slate-600 mt-5 max-w-xl">
            Anyone can wash clothes. We're careful about how — how we sort them, wash them, hang
            them, iron them and check them before they come back to you. Here's exactly what happens
            to your laundry with us.
          </p>
        </div>
      </section>

      {/* Process: alternating photo + text */}
      <section className="bg-white border-y border-mist py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-16">
          {PROCESS.map((step, i) => (
            <div
              key={step.title}
              className={`grid lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "lg:[&>figure]:order-2" : ""}`}
            >
              <PhotoSlot caption={step.caption} hint={`Drop a photo here — ${step.hint}`} aspect="aspect-[4/3]" />
              <div>
                <div className="w-14 h-14 rounded-2xl bg-aqua/10 flex items-center justify-center mb-5">
                  <step.icon className="w-7 h-7 text-aqua" />
                </div>
                <h2 className="font-display text-2xl lg:text-3xl font-extrabold mb-3">{step.title}</h2>
                <p className="text-slate-600 text-lg max-w-md">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Care promises */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="font-display text-3xl lg:text-4xl font-extrabold mb-3">Our care promise</h2>
            <p className="text-slate-600">The standards we hold ourselves to on every single order.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROMISES.map((p) => (
              <div key={p.title} className="rounded-3xl border border-mist bg-white p-8 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-aqua/10 flex items-center justify-center mb-4">
                  <p.icon className="w-6 h-6 text-aqua" />
                </div>
                <h3 className="font-display text-lg font-bold mb-2">{p.title}</h3>
                <p className="text-slate-600 text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white border-y border-mist py-20 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl lg:text-4xl font-extrabold mb-10 text-center">Common questions</h2>
          <div className="divide-y divide-mist">
            {FAQ.map((f) => (
              <div key={f.q} className="py-6">
                <h3 className="font-display text-lg font-bold mb-2">{f.q}</h3>
                <p className="text-slate-600">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="font-display text-3xl lg:text-4xl font-extrabold">See the difference for yourself</h2>
          <p className="text-slate-600">Book your first pickup and let your clothes come back the way they should.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 bg-ink text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#1a3a57] transition-colors"
            >
              <CalendarCheck className="w-5 h-5" /> Book a pickup
            </Link>
            <a
              href={waLink("Hi Quicklean, I'd like to schedule a pickup.")}
              className="inline-flex items-center justify-center gap-2 border border-mist text-ink px-8 py-4 rounded-full font-semibold text-lg hover:bg-paper transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-aqua" /> WhatsApp us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
