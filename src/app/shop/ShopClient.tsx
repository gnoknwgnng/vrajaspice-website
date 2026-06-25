"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { Product } from "@/lib/products";
import ProductCard from "@/components/ui/ProductCard";
import { supabase } from "@/lib/supabase";

/* ─── Types ─────────────────────────────────────────────────────────── */
type SortKey = "popularity" | "price-asc" | "price-desc";

const BADGE_FILTERS = [
  "All",
  "Best Seller",
  "Satvik Friendly",
  "Premium Blend",
  "Launch Special",
  "No Onion No Garlic",
] as const;

type BadgeFilter = (typeof BADGE_FILTERS)[number];

const SORT_OPTIONS: { label: string; value: SortKey }[] = [
  { label: "Popularity", value: "popularity" },
  { label: "Price: Low → High", value: "price-asc" },
  { label: "Price: High → Low", value: "price-desc" },
];

/* ─── Brush stroke SVG ───────────────────────────────────────────────── */
function BrushStroke() {
  return (
    <svg
      viewBox="0 0 320 18"
      className="w-full max-w-xs mx-auto mt-2 mb-0"
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M4,13 Q40,4 80,10 Q120,16 160,11 Q200,6 240,12 Q280,18 316,9"
        stroke="#E8721C"
        strokeWidth="4.5"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M8,14 Q60,8 110,13 Q160,18 210,12 Q260,6 312,11"
        stroke="#D4A017"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}

/* ─── Breadcrumb ─────────────────────────────────────────────────────── */
function Breadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
      <Link
        href="/"
        className="text-[#8B4513] hover:text-[#8B1A1A] transition-colors font-medium"
      >
        Home
      </Link>
      <ChevronDown className="w-3.5 h-3.5 text-[#C4A88A] -rotate-90" />
      <span className="text-[#2C1810] font-semibold">Shop</span>
    </nav>
  );
}

/* ─── Client Component ────────────────────────────────────────────────── */
export default function ShopClient({ initialProducts }: { initialProducts: Product[] }) {
  const [productsList, setProductsList] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<BadgeFilter>("All");
  const [sortKey, setSortKey] = useState<SortKey>("popularity");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOpen, setSortOpen] = useState(false);

  useEffect(() => {
    // Keep internal list in sync if server products change
    setProductsList(initialProducts);
  }, [initialProducts]);

  useEffect(() => {
    const fetchLatestProducts = () => {
      fetch("/api/products")
        .then((res) => res.json())
        .then((data) => {
          if (data && data.length > 0) {
            setProductsList(data);
          }
        })
        .catch((err) => console.error("Error loading products", err))
        .finally(() => setLoading(false));
    };

    // Subscribe to realtime updates on products table
    const channel = supabase
      .channel("realtime-products-shop")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        (payload) => {
          console.log("Realtime product change detected in Shop:", payload);
          fetchLatestProducts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const filtered = useMemo(() => {
    let list = productsList.filter((p) => p.isActive !== false);

    // Search
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.ingredients.toLowerCase().includes(q)
      );
    }

    // Filter
    if (activeFilter !== "All") {
      list = list.filter((p) => p.badge === activeFilter);
    }

    // Sort
    if (sortKey === "price-asc") list.sort((a, b) => a.sellingPrice - b.sellingPrice);
    else if (sortKey === "price-desc") list.sort((a, b) => b.sellingPrice - a.sellingPrice);
    // "popularity" keeps featured first
    else list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

    return list;
  }, [productsList, activeFilter, sortKey, searchQuery]);

  const activeSortLabel =
    SORT_OPTIONS.find((o) => o.value === sortKey)?.label ?? "Popularity";

  return (
    <div className="min-h-screen bg-[#F5EDD8]">
      {/* ── Page Header ────────────────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-[#F5EDD8] border-b border-[#EDE0C4]">
        {/* Parchment texture layer */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Decorative spice dots */}
        <div className="absolute top-6 left-8 w-2 h-2 rounded-full bg-[#E8721C] opacity-30" />
        <div className="absolute top-10 left-14 w-1.5 h-1.5 rounded-full bg-[#D4A017] opacity-25" />
        <div className="absolute top-4 left-20 w-1 h-1 rounded-full bg-[#8B1A1A] opacity-20" />
        <div className="absolute bottom-8 right-10 w-2.5 h-2.5 rounded-full bg-[#E8721C] opacity-25" />
        <div className="absolute bottom-4 right-24 w-1.5 h-1.5 rounded-full bg-[#D4A017] opacity-30" />
        <div className="absolute top-8 right-36 w-1 h-1 rounded-full bg-[#8B4513] opacity-20" />

        {/* Large faded background word */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden="true"
        >
          <span
            className="font-serif font-black text-[120px] md:text-[180px] tracking-[0.3em] text-[#8B1A1A]"
            style={{ opacity: 0.035 }}
          >
            SPICES
          </span>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <Breadcrumb />

          <div className="mt-6 text-center">
            <p className="text-[#E8721C] text-xs font-bold tracking-[0.25em] uppercase mb-3">
              🌿 All Products
            </p>

            <h1 className="font-serif font-black text-[#2C1810] text-4xl md:text-5xl lg:text-6xl leading-tight">
              Spice With Soul
            </h1>

            <BrushStroke />

            <p className="mt-5 text-[#6B4E37] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Ten premium No Onion No Garlic masala blends — small-batch crafted,
              free from preservatives and artificial colours, made for the discerning
              satvik kitchen.
            </p>

            {/* Trust pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {[
                "🌿 100% NONG",
                "🚫 No Preservatives",
                "🎨 No Artificial Colour",
                "🏺 Small Batch",
                "✅ Satvik Friendly",
              ].map((pill) => (
                <span
                  key={pill}
                  className="text-xs font-semibold text-[#4A7C59] bg-white/70 border border-[#4A7C59]/20 px-3 py-1 rounded-full"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ── Sticky Controls Bar ────────────────────────────────────────── */}
      <div className="sticky top-0 z-20 bg-[#F5EDD8]/95 backdrop-blur-md border-b border-[#EDE0C4] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B4513]" />
              <input
                type="text"
                placeholder="Search masalas, ingredients…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 text-sm rounded-xl border border-[#EDE0C4] bg-white/80 text-[#2C1810] placeholder:text-[#C4A88A] focus:outline-none focus:border-[#E8721C] focus:ring-2 focus:ring-[#E8721C]/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8B4513] hover:text-[#8B1A1A] transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="hidden sm:block w-px h-6 bg-[#EDE0C4]" />

            {/* Badge filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto flex-1">
              {BADGE_FILTERS.map((badge) => (
                <button
                  key={badge}
                  onClick={() => setActiveFilter(badge)}
                  className={`whitespace-nowrap text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200 border ${
                    activeFilter === badge
                      ? "bg-[#8B1A1A] text-[#F5EDD8] border-[#8B1A1A] shadow-sm"
                      : "bg-white/70 text-[#6B4E37] border-[#EDE0C4] hover:border-[#8B1A1A]/40 hover:text-[#8B1A1A]"
                  }`}
                >
                  {badge}
                </button>
              ))}
            </div>

            <div className="hidden sm:block w-px h-6 bg-[#EDE0C4]" />

            {/* Sort */}
            <div className="relative shrink-0">
              <button
                onClick={() => setSortOpen((v) => !v)}
                className="flex items-center gap-2 text-sm font-semibold text-[#2C1810] bg-white/70 border border-[#EDE0C4] hover:border-[#8B1A1A]/40 px-3 py-2.5 rounded-xl transition-all"
                aria-expanded={sortOpen}
                aria-haspopup="listbox"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#8B4513]" />
                <span className="hidden md:inline">{activeSortLabel}</span>
                <span className="md:hidden">Sort</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#8B4513] transition-transform ${
                    sortOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {sortOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setSortOpen(false)}
                  />
                  <div
                    role="listbox"
                    aria-label="Sort options"
                    className="absolute right-0 top-full mt-2 z-20 bg-white rounded-xl border border-[#EDE0C4] shadow-lg overflow-hidden w-48"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        role="option"
                        aria-selected={sortKey === opt.value}
                        onClick={() => {
                          setSortKey(opt.value);
                          setSortOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                          sortKey === opt.value
                            ? "bg-[#8B1A1A]/5 text-[#8B1A1A] font-semibold"
                            : "text-[#2C1810] hover:bg-[#F5EDD8]"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ───────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Result count + active chip */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-[#6B4E37]">
            Showing{" "}
            <span className="font-bold text-[#2C1810]">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "product" : "products"}
            {activeFilter !== "All" && (
              <span className="text-[#8B4513]"> · {activeFilter}</span>
            )}
            {searchQuery && (
              <span className="text-[#8B4513]">
                {" "}
                · &ldquo;{searchQuery}&rdquo;
              </span>
            )}
          </p>

          {activeFilter !== "All" && (
            <button
              onClick={() => setActiveFilter("All")}
              className="flex items-center gap-1 text-xs font-medium text-[#8B1A1A] bg-[#8B1A1A]/10 px-2.5 py-1 rounded-full hover:bg-[#8B1A1A]/20 transition-colors"
            >
              {activeFilter}
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Products grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#EDE0C4] flex items-center justify-center text-3xl">
              🌿
            </div>
            <h3 className="font-serif font-bold text-[#2C1810] text-xl mb-2">
              No products found
            </h3>
            <p className="text-[#6B4E37] text-sm mb-6 max-w-sm mx-auto">
              Try adjusting your search or filter to find what you&apos;re looking for.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("All");
              }}
              className="inline-flex items-center gap-2 bg-[#8B1A1A] text-[#F5EDD8] px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#6B1212] transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Bottom CTA banner */}
        {filtered.length > 0 && (
          <div className="mt-16 rounded-2xl bg-[#2C1810] p-8 md:p-10 text-center relative overflow-hidden">
            <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-[#8B1A1A] opacity-30" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-[#E8721C] opacity-15" />
            <div className="relative">
              <p className="text-[#D4A017] text-xs font-bold tracking-[0.2em] uppercase mb-3">
                Free Shipping
              </p>
              <h2 className="font-serif font-bold text-[#F5EDD8] text-2xl md:text-3xl mb-3">
                Free delivery on orders above ₹499
              </h2>
              <p className="text-[#C4A88A] text-sm mb-6 max-w-md mx-auto">
                Mix and match any products. Add 3+ masalas to your cart and shipping
                is on us.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {[
                  "🌿 No Onion No Garlic",
                  "🏺 Small Batch Crafted",
                  "✅ 100% Pure",
                ].map((t) => (
                  <span
                    key={t}
                    className="text-xs font-semibold text-[#D4A017] bg-[#D4A017]/10 border border-[#D4A017]/30 px-3 py-1.5 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
