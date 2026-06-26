import Image from "next/image";
import Link from "next/link";

export default function OurStory() {
  return (
    <section className="py-16 md:py-24 bg-[#2C1810] relative overflow-hidden">
      {/* Brush stroke decorations */}
      <svg
        className="absolute top-0 left-0 w-64 h-64 opacity-10"
        viewBox="0 0 300 300"
        fill="none"
      >
        <path
          d="M-30,100 Q80,20 180,100 Q280,180 350,80"
          stroke="#E8721C"
          strokeWidth="50"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <svg
        className="absolute bottom-0 right-0 w-64 h-64 opacity-10"
        viewBox="0 0 300 300"
        fill="none"
      >
        <path
          d="M330,200 Q220,280 140,200 Q60,120 -50,240"
          stroke="#D4A017"
          strokeWidth="50"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src="/hero.png"
                alt="Vrajaspice story — traditional Indian spices"
                fill
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#2C1810]/60 to-transparent" />
            </div>
            {/* Floating quote */}
            <div className="absolute -bottom-4 -right-4 md:bottom-6 md:right-6 bg-[#8B1A1A] rounded-2xl px-6 py-4 shadow-xl max-w-xs">
              <div className="text-[#F5EDD8] text-sm font-medium leading-relaxed italic">
                &ldquo;Purity and taste can always coexist.&rdquo;
              </div>
              <div className="text-[#D4A017] text-xs mt-2 font-semibold">
                — The Vrajaspice Promise
              </div>
            </div>
          </div>

          {/* Text side */}
          <div>
            <p className="text-[#E8721C] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              Our Story
            </p>
            <h2 className="font-serif font-bold text-[#F5EDD8] text-3xl md:text-4xl mb-6 leading-tight">
              Born From a Belief in{" "}
              <span className="text-[#D4A017]">Purity and Taste</span>
            </h2>

            <div className="space-y-4 text-[#C4A88A] text-base leading-relaxed">
              <p>
                Vrajaspice was born from a simple belief — that purity and taste
                can coexist. Inspired by traditional Indian kitchens and the
                needs of satvik families worldwide, we set out to create spice
                blends that are authentic, flavourful, and manufactured in a dedicated No Onion No Garlic facility.
              </p>
              <p>
                Every blend starts with a question: would our grandmothers have
                approved? We source the finest whole spices from across India —
                Kashmiri chillies, Malabar pepper, Coorg cinnamon — and grind
                them fresh in small batches to preserve every note of aroma and
                flavour.
              </p>
              <p>
                We believe that those who choose to cook satvik deserve the same
                extraordinary taste as everyone else. That&apos;s the soul
                behind every pack of Vrajaspice.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8 mb-8">
              {[
                { num: "Dedicated", label: "NONG Facility" },
                { num: "100%", label: "Pure NONG" },
                { num: "0", label: "Artificial Additives" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center border border-[#4A2A1A] rounded-xl p-4"
                >
                  <div className="font-serif font-bold text-[#D4A017] text-2xl">
                    {stat.num}
                  </div>
                  <div className="text-[#C4A88A] text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-[#D4A017] text-[#2C1810] px-6 py-3 rounded-xl font-bold hover:bg-[#E4B027] transition-colors"
            >
              Read Our Full Story →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
