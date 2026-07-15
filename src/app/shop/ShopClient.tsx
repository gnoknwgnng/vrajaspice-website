"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { Product } from "@/lib/products";
import ProductCard from "@/components/ui/ProductCard";
import { supabase } from "@/lib/supabase";

/* ─── Types ─────────────────────────────────────────────────────────── */
type SortKey = "popularity" | "price-asc" | "price-desc";

const CATEGORIES = [
  "All",
  "Everyday Sabji & Curry Masalas",
  "Temple & Satvik Prasadam Masalas",
  "Continental Herb Blends",
  "Herb & Spice Sprinkle Mixes",
  "Rice & Pulao Masalas",
  "Breakfast & Tiffin Masalas",
  "Snack & Sprinkle Seasonings",
  "Classic Indian Masalas",
  "Health, Podi & Instant Mixes",
  "Ekadashi",
] as const;

type Category = (typeof CATEGORIES)[number];

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

interface BreadcrumbProps {
  category: string | null;
  onBack: () => void;
}

/* ─── Breadcrumb ─────────────────────────────────────────────────────── */
function Breadcrumb({ category, onBack }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
      <Link
        href="/"
        className="text-[#8B4513] hover:text-[#8B1A1A] transition-colors font-medium"
      >
        Home
      </Link>
      <ChevronDown className="w-3.5 h-3.5 text-[#C4A88A] -rotate-90" />
      {category ? (
        <>
          <button
            onClick={onBack}
            className="text-[#8B4513] hover:text-[#8B1A1A] transition-colors font-medium cursor-pointer"
          >
            Shop
          </button>
          <ChevronDown className="w-3.5 h-3.5 text-[#C4A88A] -rotate-90" />
          <span className="text-[#2C1810] font-semibold">{category}</span>
        </>
      ) : (
        <span className="text-[#2C1810] font-semibold">Shop</span>
      )}
    </nav>
  );
}

const CATEGORY_METADATA: Record<string, { image: string; desc: string }> = {
  "Everyday Sabji & Curry Masalas": {
    image: "/product-images/cat-everyday-masalas.png?v=2",
    desc: "Essential spices for your daily subzis, curries, and dals.",
  },
  "Temple & Satvik Prasadam Masalas": {
    image: "/product-images/cat-temple-satvik.png?v=2",
    desc: "Pure satvik masalas crafted for holy offerings and temple cooking.",
  },
  "Continental Herb Blends": {
    image: "/product-images/cat-continental-herbs.png?v=2",
    desc: "Premium dried herbs for Italian and Mediterranean dishes.",
  },
  "Herb & Spice Sprinkle Mixes": {
    image: "/product-images/cat-spice-sprinkles.png?v=2",
    desc: "Fragrant, hand-crafted sprinkles for pastas, paneer, and toasts.",
  },
  "Rice & Pulao Masalas": {
    image: "/product-images/cat-rice-pulao.png?v=2",
    desc: "Royal blends for biryanis, pulaos, and traditional rice varieties.",
  },
  "Breakfast & Tiffin Masalas": {
    image: "/product-images/cat-breakfast-tiffin.png?v=2",
    desc: "Quick, aromatic seasonings for pohas, upmas, idlis, and breakfasts.",
  },
  "Snack & Sprinkle Seasonings": {
    image: "/product-images/cat-snack-seasonings.png?v=2",
    desc: "Zesty sprinkles for popcorn, makhanas, salads, and healthy snacks.",
  },
  "Classic Indian Masalas": {
    image: "/product-images/cat-classic-indian.png?v=2",
    desc: "Authentic, traditional recipes for Garam Masala, Sambar, and Chole.",
  },
  "Health, Podi & Instant Mixes": {
    image: "/product-images/cat-health-podi.png?v=2",
    desc: "Nutritious podis, instant food, and healthy millet mixes.",
  },
  "Ekadashi": {
    image: "/product-images/cat-ekadashi.png?v=3",
    desc: "Pure grain-free, satvik ingredients specially for holy fasting days like Ekadashi.",
  },
};

/* ─── Client Component ────────────────────────────────────────────────── */
export default function ShopClient({ initialProducts }: { initialProducts: Product[] }) {
  const [productsList, setProductsList] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
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
    if (activeCategory !== "All") {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Sort
    if (sortKey === "price-asc") list.sort((a, b) => a.sellingPrice - b.sellingPrice);
    else if (sortKey === "price-desc") list.sort((a, b) => b.sellingPrice - a.sellingPrice);
    // "popularity" keeps featured first
    else list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

    return list;
  }, [productsList, activeCategory, sortKey, searchQuery]);

  const activeSortLabel =
    SORT_OPTIONS.find((o) => o.value === sortKey)?.label ?? "Popularity";

  return (
    <div className="min-h-screen bg-[#F5EDD8]">
      {/* ── Sticky Controls Bar ────────────────────────────────────────── */}
      {activeCategory !== "All" && (
        <div className="sticky top-0 z-20 bg-[#F5EDD8]/95 backdrop-blur-md border-b border-[#EDE0C4] shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
              {/* Search */}
              <div className="relative flex-shrink-0 w-full md:max-w-xs">
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
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8B4513] hover:text-[#8B1A1A] transition-colors cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="hidden md:block w-px h-6 bg-[#EDE0C4]" />

              <div className="flex items-center justify-end gap-3 w-full flex-1">
                {/* Sort */}
                <div className="relative shrink-0">
                  <button
                    onClick={() => setSortOpen((v) => !v)}
                    className="flex items-center gap-2 text-sm font-semibold text-[#2C1810] bg-white/70 border border-[#EDE0C4] hover:border-[#8B1A1A]/40 px-3 py-2.5 rounded-xl transition-all cursor-pointer h-9"
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
                            className={`w-full text-left px-4 py-3 text-sm transition-colors cursor-pointer ${
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
        </div>
      )}

      {/* ── Main Content ───────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="mb-6">
          <Breadcrumb category={activeCategory === "All" ? null : activeCategory} onBack={() => setActiveCategory("All")} />
        </div>

        {activeCategory === "All" ? (
          <div className="mb-12">
            {/* Header Text */}
            <div className="text-center mb-10">
              <p className="text-[#E8721C] text-sm font-semibold tracking-[0.2em] uppercase mb-2">
                Our Collections
              </p>
              <h2 className="font-serif font-bold text-[#2C1810] text-3xl md:text-4xl mb-4">
                Shop by Category
              </h2>
              <p className="text-[#6B4E37] max-w-xl mx-auto text-base">
                Discover our hand-crafted, small-batch spice blends made with 100% pure, satvik ingredients. No onion, no garlic.
              </p>
              <BrushStroke />
            </div>

            {/* 3x3 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {CATEGORIES.filter(c => c !== "All").map((cat) => {
                const meta = CATEGORY_METADATA[cat] || { image: "/placeholder.png", desc: "" };
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="group relative h-64 rounded-2xl overflow-hidden border border-[#EDE0C4] hover:border-[#E8721C]/60 hover:shadow-[0_8px_30px_rgba(232,114,28,0.15)] transition-all duration-300 text-left flex flex-col justify-end cursor-pointer w-full"
                  >
                    {/* Background image */}
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={meta.image}
                        alt={cat}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Dark overlay for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                    </div>

                    {/* Text content */}
                    <div className="relative z-10 p-6 flex flex-col justify-end h-full w-full">
                      <h3 className="font-serif font-bold text-white text-lg md:text-xl mb-1.5 leading-tight group-hover:text-[#D4A017] transition-colors">
                        {cat}
                      </h3>
                      <p className="text-white/80 text-xs line-clamp-2 leading-relaxed mb-4">
                        {meta.desc}
                      </p>
                      <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#D4A017] group-hover:text-[#F5EDD8] transition-colors bg-white/10 group-hover:bg-[#8B1A1A] px-3 py-1.5 rounded-lg border border-[#D4A017]/30 group-hover:border-[#8B1A1A] w-fit">
                        See All
                        <span className="inline-block transform group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Products List view */
          <>
            {/* Header Text */}
            <div className="text-center mb-10">
              <p className="text-[#E8721C] text-sm font-semibold tracking-[0.2em] uppercase mb-2">
                Category
              </p>
              <h2 className="font-serif font-bold text-[#2C1810] text-3xl md:text-4xl mb-4">
                {activeCategory}
              </h2>
              <p className="text-[#6B4E37] max-w-xl mx-auto text-base">
                {CATEGORY_METADATA[activeCategory]?.desc}
              </p>
              <BrushStroke />
            </div>

            {/* Result count + active chip */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-[#6B4E37]">
                Showing{" "}
                <span className="font-bold text-[#2C1810]">{filtered.length}</span>{" "}
                {filtered.length === 1 ? "product" : "products"}
                {searchQuery && (
                  <span className="text-[#8B4513]">
                    {" "}
                    · &ldquo;{searchQuery}&rdquo;
                  </span>
                )}
              </p>

              <button
                onClick={() => setActiveCategory("All")}
                className="flex items-center gap-1 text-xs font-medium text-[#8B1A1A] bg-[#8B1A1A]/10 px-2.5 py-1 rounded-full hover:bg-[#8B1A1A]/20 transition-colors cursor-pointer"
              >
                Back to Categories
                <X className="w-3 h-3" />
              </button>
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
                  Try adjusting your search or filters to find what you&apos;re looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All");
                  }}
                  className="inline-flex items-center gap-2 bg-[#8B1A1A] text-[#F5EDD8] px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#6B1212] transition-colors"
                >
                  Back to Categories
                </button>
              </div>
            )}
          </>
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
                  "🌿 No Onion No Garlic Facility",
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
