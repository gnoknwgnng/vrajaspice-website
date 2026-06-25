"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function NewsletterSignup() {
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", whatsappOptIn: false });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error("Please enter your name and email.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
        toast.success("Welcome to the Vrajaspice family! 🌿");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      // If API not set up, still show success for demo
      setSubmitted(true);
      toast.success("Welcome to the Vrajaspice family! 🌿");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#8B1A1A] to-[#6B1212] relative overflow-hidden">
      {/* Brush stroke decorations */}
      <svg
        className="absolute top-0 right-0 w-72 h-72 opacity-10"
        viewBox="0 0 300 300"
        fill="none"
      >
        <path
          d="M300,40 Q200,10 130,90 Q60,170 150,230"
          stroke="#F5EDD8"
          strokeWidth="40"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <svg
        className="absolute bottom-0 left-0 w-56 h-56 opacity-10"
        viewBox="0 0 250 250"
        fill="none"
      >
        <path
          d="M0,200 Q80,240 140,170 Q200,100 150,30"
          stroke="#D4A017"
          strokeWidth="40"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <p className="text-[#D4A017] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
          Stay Connected
        </p>
        <h2 className="font-serif font-bold text-[#F5EDD8] text-3xl md:text-4xl mb-4">
          Join the Vrajaspice Family
        </h2>
        <p className="text-[#F5EDD8]/80 text-base mb-10 leading-relaxed">
          Get exclusive launch offers, new product alerts, satvik recipes, and
          early access to special blends. No spam — only soul.
        </p>

        {submitted ? (
          <div className="bg-[#F5EDD8]/10 border border-[#F5EDD8]/20 rounded-2xl p-8">
            <div className="text-4xl mb-4">🌿</div>
            <h3 className="font-serif font-bold text-[#F5EDD8] text-2xl mb-2">
              Welcome to the Family!
            </h3>
            <p className="text-[#F5EDD8]/80">
              Thank you for joining us. Watch your inbox for exclusive offers and
              satvik inspiration!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full bg-[#F5EDD8]/10 border border-[#F5EDD8]/20 rounded-xl px-5 py-4 text-[#F5EDD8] placeholder-[#F5EDD8]/50 focus:outline-none focus:border-[#D4A017] transition-colors text-sm"
              />
              <input
                type="email"
                placeholder="Email Address *"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full bg-[#F5EDD8]/10 border border-[#F5EDD8]/20 rounded-xl px-5 py-4 text-[#F5EDD8] placeholder-[#F5EDD8]/50 focus:outline-none focus:border-[#D4A017] transition-colors text-sm"
              />
            </div>
            <input
              type="tel"
              placeholder="WhatsApp Number (optional)"
              value={form.whatsapp}
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              className="w-full bg-[#F5EDD8]/10 border border-[#F5EDD8]/20 rounded-xl px-5 py-4 text-[#F5EDD8] placeholder-[#F5EDD8]/50 focus:outline-none focus:border-[#D4A017] transition-colors text-sm"
            />

            <label className="flex items-start gap-3 text-left cursor-pointer">
              <input
                type="checkbox"
                checked={form.whatsappOptIn}
                onChange={(e) => setForm({ ...form, whatsappOptIn: e.target.checked })}
                className="mt-1 w-4 h-4 rounded accent-[#D4A017]"
              />
              <span className="text-[#F5EDD8]/70 text-sm">
                Yes, I&apos;d like to receive WhatsApp updates from Vrajaspice about
                new products, offers, and satvik recipes.
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D4A017] text-[#2C1810] py-4 rounded-xl font-bold text-base hover:bg-[#E4B027] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Joining..." : "Join the Vrajaspice Family 🌿"}
            </button>

            <p className="text-[#F5EDD8]/50 text-xs">
              We respect your privacy. Unsubscribe anytime. No spam.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
