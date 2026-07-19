"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  MapPin, Phone, Droplets, Shirt, Sparkles, Sofa, SprayCan,
  Home as HomeIcon, MessageCircle, Truck, PackageCheck, Clock, CalendarCheck,
} from "lucide-react";
import PricingEstimator from "@/components/PricingEstimator";
import { BUSINESS, CATALOG, waLink } from "@/lib/catalog";

const SERVICES: {
  icon: typeof Shirt;
  title: string;
  desc: string;
  cta: string;
  link?: string;
  msg?: string;
}[] = [
  {
    icon: Shirt,
    title: "Laundry & Dry Cleaning",
    desc: "Wash, dry and fold for everyday clothes, plus specialist dry cleaning for suits, kanzus and delicate fabrics.",
    cta: "Book laundry pickup",
    msg: "Hi Quicklean, I'd like to book a laundry / dry cleaning pickup.",
  },
  {
    icon: HomeIcon,
    title: "Property & Space Cleaning",
    desc: "Full cleaning for homes, offices and rentals — move-in, move-out and routine cleans handled by our team on site.",
    cta: "See property cleaning",
    link: "/property-cleaning",
  },
  {
    icon: Sofa,
    title: "Deep Carpet & Sofa Cleaning",
    desc: "Machine deep-cleaning for carpets, sofas and mattresses at your home. Stains, dust and odours out — fabric protected.",
    cta: "Book carpet or sofa clean",
    msg: "Hi Quicklean, I'd like to book deep carpet / sofa cleaning.",
  },
  {
    icon: SprayCan,
    title: "Cleaning Detergents Supply",
    desc: "We supply quality detergents and cleaning products to homes, offices and institutions — delivered to your door.",
    cta: "Order detergents",
    msg: "Hi Quicklean, I'd like to order cleaning detergents.",
  },
];

const STEPS = [
  { icon: Truck, title: "We pick up", desc: "Book online or on WhatsApp with your location and a convenient time. We collect from your door." },
  { icon: Droplets, title: "We clean", desc: "Clothes are sorted, washed with premium detergents, dried and hand-finished by our team." },
  { icon: PackageCheck, title: "We deliver", desc: "Everything comes back folded or on hangers within 24–48 hours, ready to wear." },
];

const REVIEWS = [
  { name: "Kamau W.", loc: "Nasra Gardens", text: "They saved my suits right before a huge week of meetings. The 24-hour turnaround is a lifesaver." },
  { name: "Sarah K.", loc: "Ruiru", text: "I tried the on-site carpet and sofa cleaning. The team was professional, on time, and my living room feels brand new." },
  { name: "David M.", loc: "Komarock", text: "Finally, a laundry that actually returns forgotten cash in pockets! The honesty guarantee is real." },
];

/* Hanging price tag — the site's signature element */
function Tag({ label, price, tilt = 0, delay = 0 }: { label: string; price: number; tilt?: number; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: -12, rotate: tilt - 4 }}
      animate={{ opacity: 1, y: 0, rotate: tilt }}
      transition={{ delay, type: "spring", stiffness: 120, damping: 12 }}
      style={{ rotate: `${tilt}deg` }}
      className="relative origin-top"
    >
      <span aria-hidden className="absolute left-1/2 -top-5 h-5 w-px bg-ink/40" />
      <span aria-hidden className="absolute left-1/2 -top-6 -ml-1.5 h-3 w-3 rounded-sm bg-peg shadow-sm" />
      <div className="bg-white border border-mist rounded-xl px-4 py-3 shadow-md w-36">
        <span aria-hidden className="mx-auto mb-1 block h-2.5 w-2.5 rounded-full border border-mist bg-paper" />
        <p className="text-xs text-slate-500 text-center leading-tight">{label}</p>
        <p className="text-center font-bold text-ink">Ksh {price}</p>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const reduce = useReducedMotion();

  return (
    <div>
      {/* ── Hero ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-20 lg:pt-24 lg:pb-28 grid lg:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <p className="font-display inline-block text-xs font-semibold tracking-widest uppercase bg-peg/25 text-[#7a5a00] px-3 py-1 rounded-full">
            Nasra Gardens · Opposite Shujaa Mall
          </p>
          <h1 className="font-display text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]">
            Fresh laundry,<br />
            <span className="text-aqua">zero hassle.</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-md">
            Wash &amp; fold, dry cleaning, deep carpet and sofa cleaning, property cleaning and
            detergent supply — picked up dirty, returned crisp.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 bg-ink text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#1a3a57] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink transition-colors shadow-lg"
            >
              <CalendarCheck className="w-5 h-5" /> Book a pickup
            </Link>
            <a
              href={waLink("Hi Quicklean, I'd like to schedule a laundry pickup.")}
              className="inline-flex items-center justify-center gap-2 bg-white text-ink px-8 py-4 rounded-full font-semibold text-lg border border-mist hover:bg-[#eef4f3] transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-aqua" /> WhatsApp instead
            </a>
          </div>
          <p className="text-sm text-slate-500 flex items-center gap-2">
            <Phone className="w-4 h-4" /> {BUSINESS.phoneDisplay} &nbsp;·&nbsp; 24–48 hr turnaround
          </p>
        </motion.div>

        {/* Signature: clothesline with real price tags */}
        <div className="relative">
          <div aria-hidden className="absolute inset-x-4 top-8 border-t-2 border-dashed border-ink/25" />
          <div className="relative flex justify-around pt-14 pb-6">
            <Tag label="Shirt · dry cleaned" price={150} tilt={-4} delay={0.15} />
            <Tag label="Suit · 3 pieces" price={600} tilt={3} delay={0.3} />
            <Tag label="Duvet · 6×6 large" price={700} tilt={-2} delay={0.45} />
          </div>
          <div className="mx-auto mt-6 max-w-sm rounded-2xl bg-white border border-mist p-5 flex items-center gap-4 shadow-sm">
            <Sparkles className="w-8 h-8 text-aqua shrink-0" />
            <p className="text-sm text-slate-600">
              Honest, printed prices — the same on this page as on our shop wall. No hidden fees.
            </p>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="bg-white border-y border-mist py-20 px-6 lg:px-12 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <h2 className="font-display text-3xl lg:text-4xl font-extrabold mb-3">
              Four ways we keep things clean
            </h2>
            <p className="text-slate-600">
              One booking covers all of it — clothes, carpets, whole properties, or the supplies to
              do it yourself.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {SERVICES.map((s, i) => (
              <motion.article
                key={s.title}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-3xl border border-mist bg-paper p-8 flex flex-col gap-4 hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 rounded-2xl bg-aqua/10 flex items-center justify-center">
                  <s.icon className="w-7 h-7 text-aqua" />
                </div>
                <h3 className="font-display text-xl font-bold">{s.title}</h3>
                <p className="text-slate-600 flex-1">{s.desc}</p>
                {s.link ? (
                  <Link href={s.link} className="font-semibold text-aqua hover:text-[#0c8b97] inline-flex items-center gap-1">
                    {s.cta} →
                  </Link>
                ) : (
                  <a href={waLink(s.msg!)} className="font-semibold text-aqua hover:text-[#0c8b97] inline-flex items-center gap-1">
                    {s.cta} →
                  </a>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Price list ── */}
      <section id="prices" className="py-20 px-6 lg:px-12 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl lg:text-4xl font-extrabold mb-3">
              Straight-off-the-wall pricing
            </h2>
            <p className="text-slate-600">
              Our full laundry price list. Carpet, sofa and property cleaning are quoted per job.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {CATALOG.map((group) => (
              <div key={group.title} className="relative rounded-3xl bg-white border border-mist shadow-sm overflow-hidden">
                <span aria-hidden className="absolute inset-x-0 top-0 h-1.5 bg-peg" />
                <div className="p-8">
                  <h3 className="font-display text-lg font-bold mb-5">{group.title}</h3>
                  <ul className="divide-y divide-dashed divide-mist">
                    {group.items.map((item) => (
                      <li key={item.id} className="flex items-baseline justify-between gap-3 py-2.5 text-sm">
                        <span className="text-slate-600">
                          {item.name}
                          {item.unit ? ` (per ${item.unit})` : ""}
                        </span>
                        <span className="font-bold whitespace-nowrap">Ksh {item.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Estimator ── */}
      <section id="estimator" className="pb-20 px-6 lg:px-12 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <PricingEstimator />
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how" className="bg-white border-y border-mist py-20 px-6 lg:px-12 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl lg:text-4xl font-extrabold mb-3">How Quicklean works</h2>
            <p className="text-slate-600">Three steps to free up your weekend.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="p-8 rounded-3xl bg-paper border border-mist text-center space-y-4"
              >
                <div className="w-16 h-16 mx-auto bg-aqua/10 rounded-full flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-aqua" />
                </div>
                <h3 className="font-display text-xl font-bold">{step.title}</h3>
                <p className="text-slate-600">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Location ── */}
      <section id="location" className="py-20 px-6 lg:px-12 scroll-mt-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <h2 className="font-display text-3xl lg:text-4xl font-extrabold">Find us in Nasra Gardens</h2>
            <p className="text-slate-600 max-w-md">
              Drop off in person or let us come to you — pickup and delivery cover Nasra Gardens,
              Komarock, Ruai and the wider Kangundo Road corridor.
            </p>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-aqua mt-0.5 shrink-0" />
                <span>
                  <strong>{BUSINESS.address}</strong>
                  <br />
                  {BUSINESS.landmark}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-aqua shrink-0" /> {BUSINESS.phoneDisplay}
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-aqua shrink-0" /> {BUSINESS.hours}
              </li>
            </ul>
            <a
              href={BUSINESS.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-ink text-white px-6 py-3 rounded-full font-semibold hover:bg-[#1a3a57] transition-colors"
            >
              <MapPin className="w-5 h-5" /> Open in Google Maps
            </a>
          </div>

          <div className="rounded-3xl overflow-hidden border border-mist shadow-sm bg-white">
            <iframe
              title="Quicklean location — Wallet Business Centre, Nasra Gardens"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                "Shujaa Mall, Kangundo Road, Nairobi"
              )}&output=embed`}
              className="w-full h-[380px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <p className="text-xs text-slate-500 px-4 py-3 bg-paper border-t border-mist">
              We're on the ground floor of Wallet Business Centre, directly opposite Shujaa Mall.
            </p>
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="bg-ink py-20 px-6 lg:px-12 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl font-extrabold mb-3">Trusted along Kangundo Road</h2>
            <p className="text-slate-300">What our community says about Quicklean.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {REVIEWS.map((review) => (
              <figure key={review.name} className="bg-white/5 p-8 rounded-3xl border border-white/10">
                <div className="text-peg mb-4" aria-label="5 out of 5 stars">★★★★★</div>
                <blockquote className="text-slate-200 mb-6 leading-relaxed">"{review.text}"</blockquote>
                <figcaption className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-aqua flex items-center justify-center font-bold mr-3">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold">{review.name}</div>
                    <div className="text-sm text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {review.loc}
                    </div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 bg-aqua text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#0c8b97] transition-colors"
            >
              <CalendarCheck className="w-5 h-5" /> Book your first pickup
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
