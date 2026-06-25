const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    role: "Vaishnav homemaker",
    text: "Finally a masala I can use every day without worrying about onion or garlic. The Kitchen King Masala has completely transformed our daily cooking. The aroma is incredible — it smells like it came straight from a traditional kitchen.",
    rating: 5,
    avatar: "PS",
    avatarBg: "bg-[#8B1A1A]",
  },
  {
    name: "Deepak Mehta",
    location: "Ahmedabad",
    role: "Jain businessman",
    text: "As a Jain, finding quality masalas without onion and garlic has always been a struggle. Vrajaspice has solved that completely. The Chole Masala makes the most authentic chole I've had — even without the onion and garlic.",
    rating: 5,
    avatar: "DM",
    avatarBg: "bg-[#8B4513]",
  },
  {
    name: "Smt. Radha Devi",
    location: "Vrindavan",
    role: "ISKCON devotee",
    text: "We use the Garam Masala and Khichdi Masala at our temple kitchen every day. The purity and quality are exceptional. It's heartening to find a brand that truly understands our needs.",
    rating: 5,
    avatar: "RD",
    avatarBg: "bg-[#4A7C59]",
  },
  {
    name: "Ananya Krishnan",
    location: "Bangalore",
    role: "Health-conscious professional",
    text: "I switched to Vrajaspice after realising how many hidden ingredients were in regular masalas. The Sambar Masala is absolutely authentic and reminds me of my grandmother's cooking. Worth every rupee.",
    rating: 5,
    avatar: "AK",
    avatarBg: "bg-[#D4A017]",
  },
  {
    name: "Raj Thakkar",
    location: "London",
    role: "NRI / Global Indian",
    text: "I'm based in London and discovering Vrajaspice was a revelation. The Biryani Masala makes a vegetarian biryani that guests cannot believe is cooked without onion or garlic. I order every month!",
    rating: 5,
    avatar: "RT",
    avatarBg: "bg-[#6B4E37]",
  },
  {
    name: "Dr. Meena Patel",
    location: "Surat",
    role: "Satvik lifestyle advocate",
    text: "The Ekadashi Sabzi Masala is perfect for our fasting days. It's thoughtfully crafted with sendha namak and exactly the spices permitted during vrat. Genuinely grateful this brand exists.",
    rating: 5,
    avatar: "MP",
    avatarBg: "bg-[#C8620C]",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-[#F5EDD8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#E8721C] text-sm font-semibold tracking-[0.2em] uppercase mb-3">
            Trusted By Thousands
          </p>
          <h2 className="font-serif font-bold text-[#2C1810] text-3xl md:text-4xl mb-4">
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center gap-1 text-[#D4A017] text-xl mb-2">
            {"★★★★★"}
          </div>
          <p className="text-[#6B4E37] text-sm">
            Loved by satvik families across India and the world
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white/70 border border-[#EDE0C4] rounded-2xl p-6 hover:shadow-[0_8px_30px_rgba(44,24,16,0.1)] transition-all duration-300 hover:-translate-y-1 relative"
            >
              <div className="text-5xl font-serif text-[#E8721C]/20 absolute top-4 right-5 select-none leading-none">
                &ldquo;
              </div>

              <div className="flex gap-0.5 text-[#D4A017] mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-sm">★</span>
                ))}
              </div>

              <p className="text-[#4A2A1A] text-sm leading-relaxed mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 ${t.avatarBg} rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-[#2C1810] text-sm">{t.name}</div>
                  <div className="text-[#8B4513] text-xs">
                    {t.role} &middot; {t.location}
                  </div>
                </div>
              </div>

              <div className="mt-4 inline-flex items-center gap-1 text-[10px] text-[#4A7C59] font-medium">
                <span>&#10003;</span> Verified Customer
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
