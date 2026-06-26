"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    q: "What does No Onion No Garlic (NONG) mean?",
    a: "NONG stands for No Onion No Garlic. All Vrajaspice blends are crafted completely without onion and garlic — making them suitable for Vaishnavs, ISKCON devotees, Jain consumers, and anyone following a satvik or pure vegetarian lifestyle.",
  },
  {
    q: "Are the spices manufactured in a dedicated facility?",
    a: "Yes. Every Vrajaspice blend is formulated, ground, and packed in a dedicated 100% No Onion No Garlic facility. This ensures zero risk of cross-contamination, maintaining absolute purity for your satvik dietary requirements.",
  },
  {
    q: "Are Vrajaspice products suitable for Jain cooking?",
    a: "Yes! All our masalas are formulated without onion, garlic, and other Jain-restricted ingredients. Our blends are ideal for Jain households looking for premium, authentic flavour without compromise.",
  },
  {
    q: "Are these masalas suitable for satvik cooking?",
    a: "Absolutely. Every Vrajaspice blend is designed for satvik cooking — using only pure, plant-based spices with no onion, garlic, meat derivatives, or artificial additives. Our Ekadashi and Farali masalas are specifically designed for fasting days.",
  },
  {
    q: "Do your products contain preservatives or artificial colours?",
    a: "No. We believe food should be pure and honest. All Vrajaspice blends are free from artificial colours, preservatives, and flavour enhancers. The colour you see comes purely from natural spices like Kashmiri chilli and turmeric.",
  },
  {
    q: "How long do the spices stay fresh?",
    a: "Our masalas have a shelf life of 12 months from the date of manufacture. For best results, store in a cool, dry place away from direct sunlight. Keep the lid tightly closed after use.",
  },
  {
    q: "Do you ship across India? What are the shipping charges?",
    a: "Yes, we ship pan-India. Orders above ₹499 qualify for free shipping. For orders below ₹499, a flat shipping charge of ₹49 is applied.",
  },
];

export default function FAQPreview() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-16 md:py-24 bg-[#EDE0C4]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#E8721C] text-sm font-semibold tracking-[0.2em] uppercase mb-3">
            Got Questions?
          </p>
          <h2 className="font-serif font-bold text-[#2C1810] text-3xl md:text-4xl mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[#6B4E37] text-base">
            Everything you need to know about Vrajaspice
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                open === i
                  ? "border-[#8B1A1A]/30 shadow-[0_4px_20px_rgba(139,26,26,0.08)]"
                  : "border-[#D4C4A0]"
              } bg-[#F5EDD8]`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
              >
                <span
                  className={`font-medium text-sm md:text-base leading-snug ${
                    open === i ? "text-[#8B1A1A]" : "text-[#2C1810]"
                  }`}
                >
                  {faq.q}
                </span>
                <span className="flex-shrink-0 text-[#8B4513]">
                  {open === i ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  open === i ? "max-h-48" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-5 text-[#4A2A1A] text-sm leading-relaxed border-t border-[#EDE0C4] pt-4">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-8">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-[#8B1A1A] font-semibold hover:underline text-sm"
          >
            View All FAQs →
          </Link>
        </div>
      </div>
    </section>
  );
}
