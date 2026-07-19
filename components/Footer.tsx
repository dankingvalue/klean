import Link from "next/link";
import { MessageCircle, MapPin, Phone, Clock } from "lucide-react";
import { BUSINESS, waLink } from "@/lib/catalog";

export default function Footer() {
  return (
    <footer className="bg-ink text-white px-6 lg:px-12 pt-14 pb-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        <div>
          <p className="font-display text-2xl font-extrabold">
            Quicklean<span className="text-aqua">.</span>
          </p>
          <p className="text-slate-400 text-sm mt-2 max-w-xs">
            {BUSINESS.name} — laundry, dry cleaning, deep carpet &amp; sofa cleaning, property
            cleaning and detergent supply in Nairobi.
          </p>
        </div>

        <div className="text-sm space-y-3 text-slate-300">
          <p className="flex items-start gap-2">
            <MapPin className="w-4 h-4 mt-0.5 text-aqua shrink-0" />
            <span>
              {BUSINESS.address}
              <br />
              {BUSINESS.landmark}
            </span>
          </p>
          <p className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-aqua" /> {BUSINESS.phoneDisplay}
          </p>
          <p className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-aqua" /> {BUSINESS.hours}
          </p>
        </div>

        <div className="flex flex-col items-start gap-4">
          <a
            href={waLink("Hi Quicklean, I'd like to schedule a pickup.")}
            className="inline-flex items-center gap-2 bg-aqua text-white px-6 py-3 rounded-full font-semibold hover:bg-[#0c8b97] transition-colors"
          >
            <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
          </a>
          <div className="flex flex-col items-start gap-1.5 text-sm">
            <Link href="/book" className="text-slate-300 hover:text-white font-medium">
              Book a pickup online →
            </Link>
            <Link href="/property-cleaning" className="text-slate-300 hover:text-white font-medium">
              Property &amp; space cleaning →
            </Link>
            <Link href="/why-us" className="text-slate-300 hover:text-white font-medium">
              Why choose Quicklean →
            </Link>
          </div>
        </div>
      </div>

      <p className="max-w-7xl mx-auto text-xs text-slate-500 mt-10 border-t border-white/10 pt-6">
        © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
      </p>
    </footer>
  );
}
