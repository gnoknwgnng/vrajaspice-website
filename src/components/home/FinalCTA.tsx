import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="py-16 md:py-20 bg-[#F5EDD8] relative overflow-hidden">
      {/* Brush stroke top */}
      <svg
        className="absolute top-0 left-0 w-full h-12 opacity-20"
        viewBox="0 0 1440 50"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0,25 Q360,5 720,25 Q1080,45 1440,25"
          stroke="#8B1A1A"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-[#E8721C] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
          Start Your Pure Kitchen Journey
        </p>
        <h2 className="font-serif font-bold text-[#2C1810] text-3xl md:text-5xl mb-6 leading-tight">
          Bring Purity Back to{" "}
          <span className="text-[#8B1A1A]">Your Kitchen</span>
        </h2>
        <p className="text-[#4A2A1A] text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          Join thousands of satvik families who have discovered the joy of
          cooking with pure, authentic, no-onion-no-garlic spice blends.
          Starting at just ₹99.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 bg-[#8B1A1A] text-[#F5EDD8] px-10 py-5 rounded-2xl font-bold text-lg hover:bg-[#6B1212] transition-all duration-300 hover:shadow-[0_12px_30px_rgba(139,26,26,0.35)] hover:-translate-y-0.5"
          >
            Shop All Products →
          </Link>
          <a
            href="https://wa.me/919121552086?text=Hi%20Vrajaspice%2C%20I%27d%20like%20to%20place%20an%20order!"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-[#20BD5D] transition-all duration-300 hover:-translate-y-0.5"
          >
            💬 WhatsApp Us
          </a>
        </div>

        {/* Trust strip */}
        <div className="mt-12 flex flex-wrap gap-3 justify-center text-xs font-medium text-[#6B4E37]">
          {[
            "🔒 Secure Payments",
            "🚚 Free Shipping above ₹499",
            "🇮🇳 Made in India",
            "🌿 100% NONG",
            "✨ No Preservatives",
            "📦 Small Batch Crafted",
          ].map((item) => (
            <span
              key={item}
              className="bg-white/60 border border-[#EDE0C4] px-4 py-2 rounded-full"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
