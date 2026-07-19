"use client";

import Link from "next/link";
import { useState } from "react";
import { MessageCircle, Menu, X } from "lucide-react";
import { waLink } from "@/lib/catalog";

const LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/property-cleaning", label: "Property cleaning" },
  { href: "/why-us", label: "Why us" },
  { href: "/#prices", label: "Price list" },
  { href: "/book", label: "Book pickup" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur border-b border-mist">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        <Link href="/" className="font-display text-xl font-extrabold tracking-tight">
          Quicklean<span className="text-aqua">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-ink">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={waLink("Hi Quicklean, I'd like to schedule a pickup.")}
            className="hidden sm:inline-flex items-center gap-2 bg-aqua text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#0c8b97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua transition-colors"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp us
          </a>
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="md:hidden w-10 h-10 rounded-full border border-mist flex items-center justify-center"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-mist bg-paper px-6 py-4 flex flex-col gap-4 text-slate-700 font-medium">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="hover:text-ink">
              {l.label}
            </Link>
          ))}
          <a
            href={waLink("Hi Quicklean, I'd like to schedule a pickup.")}
            className="inline-flex items-center gap-2 bg-aqua text-white font-semibold px-4 py-2.5 rounded-full w-fit"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp us
          </a>
        </nav>
      )}
    </header>
  );
}
