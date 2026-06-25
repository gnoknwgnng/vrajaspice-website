const features = [
  {
    icon: "🌿",
    title: "100% No Onion No Garlic",
    description:
      "Every blend is crafted without onion or garlic — pure, satvik, and suitable for Vaishnavs, ISKCON devotees, Jain families, and satvik households.",
    color: "from-[#4A7C59]/10 to-[#4A7C59]/5",
    border: "border-[#4A7C59]/20",
    iconBg: "bg-[#4A7C59]/15",
  },
  {
    icon: "⭐",
    title: "Premium Ingredients",
    description:
      "We source the finest whole spices — from Kashmiri chillies to Malabar black pepper — to ensure every pack delivers exceptional aroma and taste.",
    color: "from-[#D4A017]/10 to-[#D4A017]/5",
    border: "border-[#D4A017]/20",
    iconBg: "bg-[#D4A017]/15",
  },
  {
    icon: "🏺",
    title: "Small Batch Crafted",
    description:
      "Each batch is ground and packed in small quantities to preserve the freshness and potency of every spice. No mass production shortcuts.",
    color: "from-[#E8721C]/10 to-[#E8721C]/5",
    border: "border-[#E8721C]/20",
    iconBg: "bg-[#E8721C]/15",
  },
  {
    icon: "🌍",
    title: "Global Quality Standards",
    description:
      "Made in India, crafted for the world. Our spice blends meet global food safety standards while honouring centuries of Indian culinary tradition.",
    color: "from-[#8B1A1A]/10 to-[#8B1A1A]/5",
    border: "border-[#8B1A1A]/20",
    iconBg: "bg-[#8B1A1A]/15",
  },
];

export default function WhyVrajaspice() {
  return (
    <section className="py-16 md:py-24 bg-[#EDE0C4] relative overflow-hidden">
      {/* Decorative brush stroke */}
      <svg
        className="absolute top-0 right-0 w-48 h-48 opacity-15"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path
          d="M200,40 Q130,10 80,80 Q30,150 100,180"
          stroke="#8B1A1A"
          strokeWidth="25"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <svg
        className="absolute bottom-0 left-0 w-48 h-48 opacity-10"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path
          d="M0,160 Q70,190 120,120 Q170,50 100,20"
          stroke="#E8721C"
          strokeWidth="25"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#E8721C] text-sm font-semibold tracking-[0.2em] uppercase mb-3">
            Why Choose Us
          </p>
          <h2 className="font-serif font-bold text-[#2C1810] text-3xl md:text-4xl mb-4">
            Why Vrajaspice?
          </h2>
          <p className="text-[#6B4E37] max-w-2xl mx-auto text-base">
            We believe purity and taste can coexist. Every decision we make —
            from sourcing to grinding to packing — is guided by that belief.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`relative bg-gradient-to-br ${feature.color} border ${feature.border} rounded-2xl p-6 hover:shadow-[0_8px_30px_rgba(44,24,16,0.1)] transition-all duration-300 hover:-translate-y-1`}
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 ${feature.iconBg} rounded-xl flex items-center justify-center text-2xl mb-5`}
              >
                {feature.icon}
              </div>

              {/* Text */}
              <h3 className="font-serif font-bold text-[#2C1810] text-lg mb-3 leading-tight">
                {feature.title}
              </h3>
              <p className="text-[#6B4E37] text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Number */}
              <div className="absolute top-4 right-4 font-serif font-bold text-5xl text-[#2C1810]/5 leading-none select-none">
                0{i + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
