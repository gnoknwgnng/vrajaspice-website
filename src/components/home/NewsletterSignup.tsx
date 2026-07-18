"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwGeeTVRZObXkhVUj9KX9-S0ivfCVg1EHxP0FAXhbNK4R8dwJrbapQg9aOjcvPMN_w/exec";

export default function BulkOrderContact() {
  const [form, setForm] = useState({ name: "", phone: "", enquiry: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.enquiry) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      // Use no-cors mode since Google Apps Script doesn't return CORS headers for redirect responses
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          enquiry: form.enquiry,
        }),
      });
      setSubmitted(true);
      toast.success("Thank you! We'll get back to you shortly.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#8B1A1A] to-[#6B1212] relative overflow-hidden">
      {/* Decorative brush strokes */}
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
          Bulk Orders
        </p>
        <h2 className="font-serif font-bold text-[#F5EDD8] text-3xl md:text-4xl mb-4">
          Contact Us for Bulk Orders
        </h2>
        <p className="text-[#F5EDD8]/80 text-base mb-10 leading-relaxed">
          Looking to order in bulk for your family, temple, restaurant, or
          gifting? Get in touch and we'll craft a special deal just for you.
        </p>

        {/* Trust chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {["🏺 Wholesale Pricing", "📦 Custom Packaging", "🚚 Pan-India Delivery", "🌿 100% NONG"].map((t) => (
            <span
              key={t}
              className="text-xs font-semibold text-[#D4A017] bg-[#D4A017]/10 border border-[#D4A017]/30 px-3 py-1.5 rounded-full"
            >
              {t}
            </span>
          ))}
        </div>

        {submitted ? (
          <div className="bg-[#F5EDD8]/10 border border-[#F5EDD8]/20 rounded-2xl p-8">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="font-serif font-bold text-[#F5EDD8] text-2xl mb-2">
              Enquiry Received!
            </h3>
            <p className="text-[#F5EDD8]/80">
              Thank you for reaching out. Our team will contact you within 24 hours
              to discuss your bulk order requirements.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {/* Name */}
            <div>
              <label className="block text-[#F5EDD8]/70 text-xs font-semibold mb-1.5 tracking-wide uppercase">
                Name <span className="text-[#D4A017]">*</span>
              </label>
              <input
                type="text"
                id="bulk-name"
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full bg-[#F5EDD8]/10 border border-[#F5EDD8]/20 rounded-xl px-5 py-4 text-[#F5EDD8] placeholder-[#F5EDD8]/40 focus:outline-none focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017]/30 transition-all text-sm"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-[#F5EDD8]/70 text-xs font-semibold mb-1.5 tracking-wide uppercase">
                Phone Number <span className="text-[#D4A017]">*</span>
              </label>
              <input
                type="tel"
                id="bulk-phone"
                placeholder="Your WhatsApp / mobile number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
                className="w-full bg-[#F5EDD8]/10 border border-[#F5EDD8]/20 rounded-xl px-5 py-4 text-[#F5EDD8] placeholder-[#F5EDD8]/40 focus:outline-none focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017]/30 transition-all text-sm"
              />
            </div>

            {/* Enquiry */}
            <div>
              <label className="block text-[#F5EDD8]/70 text-xs font-semibold mb-1.5 tracking-wide uppercase">
                Enquiry <span className="text-[#D4A017]">*</span>
              </label>
              <textarea
                id="bulk-enquiry"
                rows={4}
                placeholder="Tell us about your bulk order — quantity, products, occasion, etc."
                value={form.enquiry}
                onChange={(e) => setForm({ ...form, enquiry: e.target.value })}
                required
                className="w-full bg-[#F5EDD8]/10 border border-[#F5EDD8]/20 rounded-xl px-5 py-4 text-[#F5EDD8] placeholder-[#F5EDD8]/40 focus:outline-none focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017]/30 transition-all text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D4A017] text-[#2C1810] py-4 rounded-xl font-bold text-base hover:bg-[#E4B027] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_6px_20px_rgba(212,160,23,0.35)]"
            >
              {loading ? "Sending Enquiry..." : "Send Bulk Order Enquiry →"}
            </button>

            <p className="text-[#F5EDD8]/40 text-xs text-center">
              We typically respond within 24 hours. You can also reach us on{" "}
              <a
                href="https://wa.me/919121552086"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4A017] hover:underline"
              >
                WhatsApp
              </a>
              .
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
