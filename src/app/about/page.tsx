import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Vrajaspice — born from a belief that purity and taste can coexist. Crafting premium No Onion No Garlic spice blends for satvik, Jain, ISKCON, and Vaishnav families worldwide.",
};

/* ─── Brush-stroke SVG decorations ──────────────────────────────────────── */
function BrushStroke({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4,18 Q60,4 120,14 Q180,24 240,10 Q300,0 360,16 Q390,22 416,12"
        stroke="#E8721C"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M30,22 Q90,10 150,20 Q210,28 270,15 Q330,4 400,18"
        stroke="#D4A017"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.45"
      />
    </svg>
  );
}

function LeafDivider() {
  return (
    <div className="flex items-center gap-4 my-2">
      <div className="flex-1 h-px bg-[#8B4513]/20" />
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#E8721C]" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6 8 4 14 12 22C20 14 18 8 12 2Z" />
      </svg>
      <div className="flex-1 h-px bg-[#8B4513]/20" />
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F5EDD8]">

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#F5EDD8] parchment-texture pt-28 pb-20 px-6">
        <svg
          className="absolute top-0 left-0 w-64 h-64 opacity-[0.06] -translate-x-16 -translate-y-16"
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          <circle cx="100" cy="100" r="90" fill="#8B1A1A" />
        </svg>
        <svg
          className="absolute bottom-0 right-0 w-72 h-72 opacity-[0.05] translate-x-20 translate-y-20"
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          <circle cx="100" cy="100" r="90" fill="#E8721C" />
        </svg>

        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-[#E8721C] font-sans text-sm font-semibold tracking-[0.25em] uppercase mb-4">
            Our Story
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#2C1810] leading-tight mb-6">
            Spice With <span className="text-[#8B1A1A]">Soul</span>
          </h1>
          <BrushStroke className="w-full max-w-md mx-auto mb-8" />
          <p className="text-xl text-[#4A2A1A] font-sans leading-relaxed max-w-2xl mx-auto">
            Vrajaspice was born from a simple belief that purity and taste can coexist. Inspired by
            traditional Indian kitchens and the needs of satvik families worldwide, we set out to
            create spice blends that are authentic, flavourful and free from onion and garlic.
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 px-6 bg-white/30">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div className="relative">
            <div className="aspect-square max-w-sm mx-auto rounded-2xl bg-gradient-to-br from-[#8B1A1A] to-[#E8721C] p-1 shadow-2xl">
              <div className="w-full h-full rounded-2xl bg-[#F5EDD8] flex flex-col items-center justify-center gap-6 p-10">
                <svg viewBox="0 0 80 80" className="w-24 h-24" fill="none" aria-hidden="true">
                  <ellipse cx="40" cy="58" rx="30" ry="14" fill="#8B1A1A" opacity="0.15" />
                  <rect x="20" y="36" width="40" height="24" rx="12" fill="#8B4513" />
                  <rect x="30" y="18" width="4" height="24" rx="2" fill="#2C1810" />
                  <ellipse cx="32" cy="17" rx="8" ry="4" fill="#D4A017" />
                  <circle cx="32" cy="46" r="3" fill="#E8721C" opacity="0.8" />
                  <circle cx="40" cy="42" r="2" fill="#D4A017" opacity="0.8" />
                  <circle cx="48" cy="48" r="2.5" fill="#8B1A1A" opacity="0.6" />
                </svg>
                <p className="font-serif text-[#8B1A1A] text-2xl font-bold text-center leading-tight">
                  Tradition in<br />every blend
                </p>
                <p className="font-sans text-[#4A2A1A] text-sm text-center">
                  Small-batch crafted · 100% pure · Made in India
                </p>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-[#D4A017] flex items-center justify-center shadow-lg">
              <span className="font-serif text-white text-xs text-center font-bold leading-tight">No<br />Onion<br />Garlic</span>
            </div>
          </div>

          <div>
            <p className="text-[#E8721C] font-sans text-sm font-semibold tracking-[0.2em] uppercase mb-3">
              How We Started
            </p>
            <h2 className="font-serif text-4xl font-bold text-[#2C1810] mb-6">
              A Kitchen, a Belief, a Brand
            </h2>
            <LeafDivider />
            <div className="space-y-4 mt-6 text-[#4A2A1A] font-sans text-base leading-relaxed">
              <p>
                Every great spice story begins in a grandmother&apos;s kitchen — with the warmth of
                a clay pot, the fragrance of freshly ground masala, and the love woven into every
                meal. Vrajaspice carries that same spirit forward.
              </p>
              <p>
                We noticed that millions of families following satvik or Jain lifestyles were
                compromising on flavour or spending hours crafting spice blends from scratch. We
                asked: <em>why should purity come at the cost of taste?</em>
              </p>
              <p>
                So we built Vrajaspice — a brand where every blend is crafted without onion or
                garlic, free of artificial colours and preservatives, and full of the bold,
                authentic flavours that Indian cooking is celebrated for.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Pillars */}
      <section className="py-20 px-6 bg-[#F5EDD8]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[#E8721C] font-sans text-sm font-semibold tracking-[0.25em] uppercase mb-3">
            What Drives Us
          </p>
          <h2 className="font-serif text-4xl font-bold text-[#2C1810] mb-3">Our Mission</h2>
          <BrushStroke className="w-64 mx-auto mb-8" />
          <p className="text-[#4A2A1A] text-lg max-w-2xl mx-auto mb-14">
            To make satvik cooking joyful, accessible, and deeply flavourful — one carefully crafted
            blend at a time.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "✦",
                color: "#8B1A1A",
                title: "Purity",
                desc: "Every ingredient is sourced with intention. No onion, no garlic, no artificial additives — ever. We are transparent about what goes into every jar.",
              },
              {
                icon: "◈",
                color: "#E8721C",
                title: "Authenticity",
                desc: "Our blends are rooted in regional Indian culinary traditions. We preserve the character of each spice so your food carries real, uncompromised flavour.",
              },
              {
                icon: "◆",
                color: "#D4A017",
                title: "Quality",
                desc: "Small-batch production. Freshly ground in controlled facilities. We obsess over texture, aroma, and shelf stability so every pinch delivers premium results.",
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className="card-warm rounded-2xl p-8 text-left hover:shadow-lg transition-shadow duration-300"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold mb-5"
                  style={{ background: pillar.color, color: "#F5EDD8" }}
                >
                  {pillar.icon}
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#2C1810] mb-3">
                  {pillar.title}
                </h3>
                <p className="text-[#4A2A1A] text-sm leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-20 px-6 bg-[#2C1810]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[#E8721C] font-sans text-sm font-semibold tracking-[0.25em] uppercase mb-3">
            Made For
          </p>
          <h2 className="font-serif text-4xl font-bold text-[#F5EDD8] mb-3">Who We Serve</h2>
          <BrushStroke className="w-64 mx-auto mb-10 opacity-80" />
          <p className="text-[#EDE0C4] text-lg max-w-2xl mx-auto mb-14">
            Vrajaspice is crafted for every household where food is an expression of values — where
            what you eat reflects who you are.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { label: "Vaishnavs", desc: "Devotional cuisine honouring the satvik tradition", emoji: "🪷" },
              { label: "ISKCON Devotees", desc: "Temple-kitchen approved, prasad-quality blends", emoji: "🔱" },
              { label: "Jain Families", desc: "Strict Jain dietary principles — no root vegetables", emoji: "☸️" },
              { label: "Satvik Households", desc: "Pure food philosophy without compromise", emoji: "🌿" },
              { label: "Health-Conscious Families", desc: "Clean label, no preservatives, no MSG", emoji: "💚" },
              { label: "Global Indian Diaspora", desc: "Authentic tastes of home, shipped anywhere in India", emoji: "🇮🇳" },
            ].map((group) => (
              <div
                key={group.label}
                className="rounded-xl border border-[#F5EDD8]/10 bg-[#F5EDD8]/5 p-6 text-left hover:bg-[#F5EDD8]/10 hover:border-[#E8721C]/40 transition-all duration-300"
              >
                <div className="text-3xl mb-3">{group.emoji}</div>
                <h3 className="font-serif text-lg font-bold text-[#F5EDD8] mb-1">{group.label}</h3>
                <p className="text-[#EDE0C4] text-sm">{group.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-6 bg-[#F5EDD8]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#E8721C] font-sans text-sm font-semibold tracking-[0.25em] uppercase mb-3">
              What We Stand For
            </p>
            <h2 className="font-serif text-4xl font-bold text-[#2C1810] mb-3">Our Values</h2>
            <BrushStroke className="w-64 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Radical Transparency",
                desc: "Every ingredient is listed, sourced ethically, and traceable. No hidden additives, no misleading labels. You deserve to know exactly what you're cooking with.",
                accent: "#8B1A1A",
              },
              {
                title: "Respect for Tradition",
                desc: "We collaborate with regional spice experts and follow generations-old grinding techniques to preserve authentic flavour profiles.",
                accent: "#E8721C",
              },
              {
                title: "Zero Compromise on Purity",
                desc: "Our NONG (No Onion No Garlic) promise is absolute. We maintain strict separation in sourcing, processing, and packaging.",
                accent: "#D4A017",
              },
              {
                title: "Community First",
                desc: "We actively support artisan spice farmers, pay fair prices, and give back to communities that make Indian spice culture so extraordinary.",
                accent: "#8B4513",
              },
            ].map((value) => (
              <div key={value.title} className="flex gap-5">
                <div
                  className="w-1 rounded-full flex-shrink-0"
                  style={{ background: value.accent }}
                />
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#2C1810] mb-2">{value.title}</h3>
                  <p className="text-[#4A2A1A] text-sm leading-relaxed">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 bg-[#8B1A1A]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-serif text-4xl font-bold text-[#F5EDD8] mb-3">
              Vrajaspice by the Numbers
            </h2>
            <BrushStroke className="w-64 mx-auto opacity-70" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { stat: "0", label: "Artificial Additives", sub: "ever" },
              { stat: "100%", label: "No Onion No Garlic", sub: "guaranteed" },
              { stat: "12+", label: "Unique Spice Blends", sub: "and counting" },
              { stat: "Pan India", label: "Delivery", sub: "shipped fresh" },
            ].map((item) => (
              <div key={item.label} className="p-4">
                <div className="font-serif text-4xl md:text-5xl font-bold text-[#D4A017] mb-1">
                  {item.stat}
                </div>
                <div className="text-[#F5EDD8] font-sans font-semibold text-sm mb-1">{item.label}</div>
                <div className="text-[#EDE0C4] text-xs uppercase tracking-widest">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[#F5EDD8] text-center">
        <p className="text-[#E8721C] font-sans text-sm font-semibold tracking-[0.25em] uppercase mb-3">
          Ready to Cook?
        </p>
        <h2 className="font-serif text-4xl font-bold text-[#2C1810] mb-4">
          Taste the Vrajaspice Difference
        </h2>
        <BrushStroke className="w-64 mx-auto mb-8" />
        <p className="text-[#4A2A1A] text-lg max-w-xl mx-auto mb-10">
          Browse our collection of premium NONG masalas and bring the soul of authentic Indian
          cooking into your kitchen.
        </p>
        <Link
          href="/products"
          className="inline-block bg-[#8B1A1A] text-[#F5EDD8] font-sans font-semibold px-10 py-4 rounded-full hover:bg-[#6B1212] transition-colors duration-300 shadow-lg hover:shadow-xl text-base tracking-wide"
        >
          Shop All Products →
        </Link>
      </section>
    </div>
  );
}
