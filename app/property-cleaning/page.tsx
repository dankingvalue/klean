import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2, Home as HomeIcon, Sofa, Sparkles, Boxes, Construction,
  CheckCircle, MessageCircle, CalendarCheck, MapPin,
} from "lucide-react";
import PhotoSlot from "@/components/PhotoSlot";
import { BUSINESS, waLink } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Property & Commercial Cleaning — Quicklean, Nairobi",
  description:
    "Professional cleaning for homes, offices and rentals across Nairobi: routine cleans, move-in / move-out, post-construction, deep carpet and sofa cleaning. Quicklean, Nasra Gardens.",
};

const SPACES = [
  { icon: HomeIcon, title: "Homes & apartments", desc: "Routine and one-off deep cleans for living spaces, kitchens, bathrooms and bedrooms." },
  { icon: Building2, title: "Offices & workspaces", desc: "Scheduled cleaning that keeps desks, floors, kitchenettes and washrooms presentable for staff and clients." },
  { icon: Boxes, title: "Rentals & Airbnbs", desc: "Turnaround cleans between guests or tenants, so the unit is spotless and ready to hand over." },
  { icon: Construction, title: "Post-construction", desc: "Dust, debris and paint-splatter removal after building or renovation work — floor to ceiling." },
];

const INCLUDED = [
  "Floors swept, mopped and finished",
  "Kitchen surfaces, sinks and appliances wiped down",
  "Bathrooms scrubbed and sanitised",
  "Dusting of surfaces, sills and fittings",
  "Windows and glass cleaned (interior)",
  "Bins emptied and lined",
  "Deep carpet and sofa cleaning on request",
  "Waste cleared and space left ready to use",
];

const STEPS = [
  { n: "01", title: "Tell us the space", desc: "Message us the type of space, rough size and what you need. We'll ask a few questions to scope it." },
  { n: "02", title: "Get a clear quote", desc: "We quote per job — no vague hourly surprises. You approve before we start." },
  { n: "03", title: "We clean on schedule", desc: "Our team arrives on time with their own equipment and supplies, and works to the agreed checklist." },
  { n: "04", title: "You walk through", desc: "We finish with a quick walkthrough so you're happy before we leave. Repeat schedules welcome." },
];

export default function PropertyCleaningPage() {
  return (
    <div>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-16 lg:pt-24 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <p className="font-display inline-block text-xs font-semibold tracking-widest uppercase bg-peg/25 text-[#7a5a00] px-3 py-1 rounded-full">
            Property &amp; Space Cleaning
          </p>
          <h1 className="font-display text-4xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]">
            Spaces that feel<br />
            <span className="text-aqua">brand new.</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-md">
            Homes, offices, rentals and post-construction sites across Nairobi — cleaned by a
            professional team with their own equipment. Priced per job, done to a checklist.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 bg-ink text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#1a3a57] transition-colors shadow-lg"
            >
              <CalendarCheck className="w-5 h-5" /> Request a clean
            </Link>
            <a
              href={waLink("Hi Quicklean, I'd like a quote for property / space cleaning.")}
              className="inline-flex items-center justify-center gap-2 bg-white text-ink px-8 py-4 rounded-full font-semibold text-lg border border-mist hover:bg-[#eef4f3] transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-aqua" /> Get a quote
            </a>
          </div>
        </div>
        <PhotoSlot
          caption="Our team cleaning a space"
          hint="Drop a photo of your team at work here — /public/property-hero.jpg"
          aspect="aspect-[5/4]"
        />
      </section>

      {/* Spaces we clean */}
      <section className="bg-white border-y border-mist py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <h2 className="font-display text-3xl lg:text-4xl font-extrabold mb-3">Spaces we clean</h2>
            <p className="text-slate-600">From a one-bedroom to a full office floor, we scope each job to the space.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {SPACES.map((s) => (
              <article key={s.title} className="rounded-3xl border border-mist bg-paper p-8 flex gap-5">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-aqua/10 flex items-center justify-center">
                  <s.icon className="w-7 h-7 text-aqua" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-slate-600">{s.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* What's included + photo */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl lg:text-4xl font-extrabold mb-6">What a clean includes</h2>
            <p className="text-slate-600 mb-8 max-w-md">
              A standard clean covers everything below. Deep carpet, sofa and mattress cleaning can
              be added to any job.
            </p>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle className="w-5 h-5 text-aqua mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <PhotoSlot caption="Before" hint="/public/clean-before.jpg" aspect="aspect-square" />
            <PhotoSlot caption="After" hint="/public/clean-after.jpg" aspect="aspect-square" />
            <PhotoSlot caption="Carpet deep clean" hint="/public/carpet.jpg" aspect="aspect-square" />
            <PhotoSlot caption="Sofa cleaning" hint="/public/sofa.jpg" aspect="aspect-square" />
          </div>
        </div>
      </section>

      {/* Deep carpet & sofa callout */}
      <section className="px-6 lg:px-12 pb-20">
        <div className="max-w-7xl mx-auto rounded-3xl bg-ink text-white p-10 lg:p-14 grid lg:grid-cols-[1fr_auto] gap-8 items-center">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Sofa className="w-8 h-8 text-peg" />
              <h2 className="font-display text-2xl lg:text-3xl font-extrabold">Deep carpet &amp; sofa cleaning</h2>
            </div>
            <p className="text-slate-300 max-w-xl">
              Machine deep-cleaning at your home or office — lifting dust, stains and odours from
              carpets, sofas and mattresses while protecting the fabric. Book it on its own or add it
              to a full clean.
            </p>
          </div>
          <a
            href={waLink("Hi Quicklean, I'd like to book deep carpet / sofa cleaning.")}
            className="inline-flex items-center justify-center gap-2 bg-aqua text-white px-8 py-4 rounded-full font-semibold hover:bg-[#0c8b97] transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-5 h-5" /> Book carpet or sofa
          </a>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white border-y border-mist py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl lg:text-4xl font-extrabold mb-3">How it works</h2>
            <p className="text-slate-600">Clear scope, clear price, no surprises.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {STEPS.map((s) => (
              <div key={s.n} className="rounded-3xl bg-paper border border-mist p-7">
                <span className="font-display text-2xl font-extrabold text-aqua">{s.n}</span>
                <h3 className="font-display text-lg font-bold mt-3 mb-2">{s.title}</h3>
                <p className="text-slate-600 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Sparkles className="w-10 h-10 text-aqua mx-auto" />
          <h2 className="font-display text-3xl lg:text-4xl font-extrabold">Ready for a spotless space?</h2>
          <p className="text-slate-600">
            Tell us what you need and we'll come back with a clear, per-job quote. We cover Nasra
            Gardens and the wider Kangundo Road area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 bg-ink text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#1a3a57] transition-colors"
            >
              <CalendarCheck className="w-5 h-5" /> Request a clean
            </Link>
            <a
              href={waLink("Hi Quicklean, I'd like a quote for property / space cleaning.")}
              className="inline-flex items-center justify-center gap-2 border border-mist text-ink px-8 py-4 rounded-full font-semibold text-lg hover:bg-paper transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-aqua" /> {BUSINESS.phoneDisplay}
            </a>
          </div>
          <p className="text-sm text-slate-500 flex items-center justify-center gap-2 pt-2">
            <MapPin className="w-4 h-4" /> {BUSINESS.landmark}
          </p>
        </div>
      </section>
    </div>
  );
}
