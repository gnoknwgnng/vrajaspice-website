import { Check, X } from "lucide-react";

const rows = [
  { feature: "No Onion & Garlic", vrajaspice: true, regular: false },
  { feature: "No Artificial Colours", vrajaspice: true, regular: false },
  { feature: "No Preservatives", vrajaspice: true, regular: false },
  { feature: "Premium Grade Ingredients", vrajaspice: true, regular: false },
  { feature: "Satvik Friendly", vrajaspice: true, regular: false },
  { feature: "Small Batch Production", vrajaspice: true, regular: false },
  { feature: "ISKCON & Jain Approved", vrajaspice: true, regular: false },
  { feature: "Transparent Ingredient List", vrajaspice: true, regular: false },
];

export default function ComparisonTable() {
  return (
    <section className="py-16 md:py-24 bg-[#EDE0C4]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#E8721C] text-sm font-semibold tracking-[0.2em] uppercase mb-3">
            The Difference
          </p>
          <h2 className="font-serif font-bold text-[#2C1810] text-3xl md:text-4xl mb-4">
            Vrajaspice vs Regular Masalas
          </h2>
          <p className="text-[#6B4E37] max-w-xl mx-auto text-base">
            Not all masalas are created equal. See why thousands of satvik
            families are switching to Vrajaspice.
          </p>
        </div>

        {/* Table */}
        <div className="rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(44,24,16,0.12)] border border-[#D4C4A0]">
          {/* Column headers */}
          <div className="grid grid-cols-3 bg-[#2C1810]">
            <div className="px-6 py-4 text-[#C4A88A] text-sm font-medium">
              Feature
            </div>
            <div className="px-6 py-4 text-center">
              <div className="font-serif font-bold text-[#D4A017] text-lg">
                Vrajaspice
              </div>
              <div className="text-[#C4A88A] text-xs mt-0.5">Spice With Soul</div>
            </div>
            <div className="px-6 py-4 text-center text-[#C4A88A] text-sm font-medium">
              Regular Masalas
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-3 border-b border-[#D4C4A0] last:border-0 ${
                i % 2 === 0 ? "bg-[#F5EDD8]" : "bg-[#FAF3E8]"
              } transition-colors hover:bg-[#FFF5E4]`}
            >
              <div className="px-6 py-4 text-[#2C1810] font-medium text-sm">
                {row.feature}
              </div>
              <div className="px-6 py-4 flex justify-center items-center">
                <div className="w-7 h-7 bg-[#4A7C59] rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                </div>
              </div>
              <div className="px-6 py-4 flex justify-center items-center">
                <div className="w-7 h-7 bg-[#C4A88A]/30 rounded-full flex items-center justify-center">
                  <X className="w-4 h-4 text-[#8B4513]" strokeWidth={3} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA below table */}
        <div className="text-center mt-8">
          <p className="text-[#6B4E37] text-sm mb-4">
            Experience the Vrajaspice difference for yourself
          </p>
          <a
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#8B1A1A] text-[#F5EDD8] px-8 py-4 rounded-xl font-bold hover:bg-[#6B1212] transition-colors"
          >
            Shop Now — Starting ₹99
          </a>
        </div>
      </div>
    </section>
  );
}
