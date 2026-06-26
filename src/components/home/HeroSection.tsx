"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Leaf, Star } from "lucide-react";

const trustBadges = [
  { icon: "🌿", text: "No Onion No Garlic" },
  { icon: "🎨", text: "No Artificial Colours" },
  { icon: "🚫", text: "No Preservatives" },
  { icon: "🇮🇳", text: "Made in India" },
  { icon: "✨", text: "Small Batch Crafted" },
  { icon: "🕊️", text: "Satvik Friendly" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden bg-[#F5EDD8]">
      {/* Parchment texture background */}
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Brush stroke decorative SVG - top left */}
      <svg
        className="absolute top-0 left-0 w-64 h-64 opacity-10"
        viewBox="0 0 300 300"
        fill="none"
      >
        <path
          d="M-20,80 Q60,20 140,80 Q220,140 300,60"
          stroke="#8B1A1A"
          strokeWidth="40"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Brush stroke - bottom right */}
      <svg
        className="absolute bottom-0 right-0 w-72 h-72 opacity-10"
        viewBox="0 0 300 300"
        fill="none"
      >
        <path
          d="M300,200 Q220,280 140,200 Q60,120 0,240"
          stroke="#E8721C"
          strokeWidth="40"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16 md:py-24">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            {/* Pre-headline pill */}
            <div className="inline-flex items-center gap-2 bg-[#8B1A1A]/10 border border-[#8B1A1A]/20 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-[#E8721C] rounded-full animate-pulse" />
              <span className="text-[#8B1A1A] text-sm font-semibold tracking-wide">
                100% No Onion · No Garlic · No Compromise
              </span>
            </div>

            {/* Main headline */}
            <h1 className="font-serif font-bold text-[#2C1810] text-4xl sm:text-5xl md:text-6xl leading-[1.1] mb-5">
              Pure Spices.{" "}
              <span className="text-[#8B1A1A]">Authentic</span>{" "}
              Taste.
              <br />
              <span className="relative">
                Spice{" "}
                <span className="text-[#E8721C]">With Soul.</span>
                {/* Brush stroke underline */}
                <svg
                  className="absolute -bottom-3 left-0 w-full"
                  viewBox="0 0 400 16"
                  fill="none"
                >
                  <path
                    d="M4,12 Q100,4 200,10 Q300,16 396,8"
                    stroke="#E8721C"
                    strokeWidth="5"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.7"
                  />
                </svg>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-[#4A2A1A] text-lg md:text-xl leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 mt-4">
              Premium spice blends crafted for satvik cooking — without
              compromising on flavour. Made for Vaishnavs, ISKCON devotees,
              Jain families, and everyone who believes in pure, clean food.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 bg-[#8B1A1A] text-[#F5EDD8] px-8 py-4 rounded-xl font-bold text-base hover:bg-[#6B1212] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(139,26,26,0.4)] hover:-translate-y-0.5"
              >
                Shop Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 bg-transparent text-[#8B1A1A] border-2 border-[#8B1A1A] px-8 py-4 rounded-xl font-bold text-base hover:bg-[#8B1A1A]/10 transition-all duration-300"
              >
                Explore Products
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {trustBadges.map((badge) => (
                <div
                  key={badge.text}
                  className="flex items-center gap-1.5 bg-white/60 border border-[#EDE0C4] rounded-full px-3 py-1.5 text-xs font-medium text-[#4A2A1A]"
                >
                  <span>{badge.icon}</span>
                  <span>{badge.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative flex items-center justify-center">
            {/* Decorative circle */}
            <div className="absolute w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-[#E8721C]/20 to-[#D4A017]/20 blur-3xl" />

            {/* Main image */}
            <div className="relative w-full max-w-md aspect-square">
              <Image
                src="/hero.png"
                alt="Vrajaspice premium spice arrangement forming S"
                fill
                priority
                className="object-contain drop-shadow-2xl"
              />
            </div>

            {/* Floating stat cards */}
            <div className="absolute top-4 left-2 sm:-left-4 md:-left-8 bg-white/80 backdrop-blur-sm border border-[#EDE0C4] rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-lg max-w-[140px] sm:max-w-[180px]">
              <div className="text-[#8B1A1A] font-bold text-[10px] sm:text-xs uppercase tracking-wide">Manufactured in a</div>
              <div className="text-[#6B4E37] text-[9px] sm:text-[11px] font-bold mt-0.5 leading-tight">No Onion, No Garlic Facility</div>
            </div>
            <div className="absolute bottom-6 right-2 sm:-right-4 md:right-0 bg-white/80 backdrop-blur-sm border border-[#EDE0C4] rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-lg">
              <div className="font-serif font-bold text-[#8B1A1A] text-xl sm:text-2xl">100%</div>
              <div className="text-[#6B4E37] text-[10px] sm:text-xs font-medium">Pure NONG</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,30 Q360,0 720,30 Q1080,60 1440,30 L1440,60 L0,60 Z"
            fill="#EDE0C4"
            opacity="0.5"
          />
        </svg>
      </div>
    </section>
  );
}
