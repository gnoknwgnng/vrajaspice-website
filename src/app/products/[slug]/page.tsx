"use client";

import { useState, use, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ShoppingCart,
  Zap,
  ChevronDown,
  Check,
  Star,
  Shield,
  Leaf,
  Package,
  FlaskConical,
  Sparkles,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
// Note: generateStaticParams lives in layout.tsx (server component)
import {
  products,
  getProductBySlug,
  getRelatedProducts,
  getDiscountPercent,
  Product,
} from "@/lib/products";
import ProductCard from "@/components/ui/ProductCard";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase";


/* ─── Badge colours ──────────────────────────────────────────────────── */
const badgeColors: Record<string, string> = {
  "Best Seller": "bg-[#8B1A1A] text-[#F5EDD8]",
  "Premium Blend": "bg-[#8B4513] text-[#F5EDD8]",
  "Satvik Friendly": "bg-[#4A7C59] text-white",
  "No Onion No Garlic": "bg-[#2C1810] text-[#D4A017]",
  "Launch Special": "bg-[#D4A017] text-[#2C1810]",
};

/* ─── Trust badge data ───────────────────────────────────────────────── */
const TRUST_BADGES = [
  { icon: Leaf, label: "100% NONG", sub: "No Onion No Garlic" },
  { icon: Shield, label: "No Preservatives", sub: "Purely natural" },
  { icon: Sparkles, label: "No Artificial Colours", sub: "Real spice colour" },
  { icon: Package, label: "Small Batch", sub: "Fresh & aromatic" },
  { icon: FlaskConical, label: "Satvik Friendly", sub: "Pure ingredients" },
];

/* ─── FAQ Accordion item ─────────────────────────────────────────────── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#EDE0C4] last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4 text-left gap-4 group"
        aria-expanded={open}
      >
        <span className="font-semibold text-[#2C1810] text-sm md:text-base group-hover:text-[#8B1A1A] transition-colors">
          {q}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[#8B4513] shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 pb-4" : "max-h-0"
        }`}
      >
        <p className="text-[#6B4E37] text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

/* ─── Breadcrumb ─────────────────────────────────────────────────────── */
function Breadcrumb({ name }: { name: string }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#8B4513] mb-6 flex-wrap">
      <Link href="/" className="hover:text-[#8B1A1A] transition-colors font-medium">
        Home
      </Link>
      <ChevronDown className="w-3 h-3 -rotate-90 opacity-60" />
      <Link href="/shop" className="hover:text-[#8B1A1A] transition-colors font-medium">
        Shop
      </Link>
      <ChevronDown className="w-3 h-3 -rotate-90 opacity-60" />
      <span className="text-[#2C1810] font-semibold line-clamp-1">{name}</span>
    </nav>
  );
}

/* ─── Quantity Selector ──────────────────────────────────────────────── */
function QuantitySelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-0 border border-[#EDE0C4] rounded-xl overflow-hidden bg-white/80">
      <button
        onClick={() => onChange(Math.max(1, value - 1))}
        className="w-10 h-10 flex items-center justify-center text-[#8B4513] hover:bg-[#F5EDD8] transition-colors font-bold text-lg"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="w-10 text-center font-bold text-[#2C1810] text-sm">
        {value}
      </span>
      <button
        onClick={() => onChange(value + 1)}
        className="w-10 h-10 flex items-center justify-center text-[#8B4513] hover:bg-[#F5EDD8] transition-colors font-bold text-lg"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const staticProduct = getProductBySlug(slug);
  const [product, setProduct] = useState<Product | null>(staticProduct || null);
  const [activeRelated, setActiveRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();

  useEffect(() => {
    // Set static related fallback initially
    setActiveRelated(getRelatedProducts(slug, 4));

    const fetchLatestDetails = () => {
      fetch("/api/products")
        .then((res) => res.json())
        .then((data: Product[]) => {
          const found = data.find((p) => p.slug === slug);
          if (found) {
            if (found.isActive !== false) {
              setProduct(found);
            } else {
              setProduct(null);
            }
          } else {
            setProduct(null);
          }

          // Filter and set active related products
          const activeList = data.filter((p) => p.slug !== slug && p.isActive !== false).slice(0, 4);
          setActiveRelated(activeList);
        })
        .catch((err) => {
          console.error("Error fetching dynamic product details:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchLatestDetails();

    // Subscribe to realtime updates on products table
    const channel = supabase
      .channel(`realtime-product-detail-${slug}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        (payload) => {
          console.log("Realtime product change detected in Details:", payload);
          fetchLatestDetails();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [slug]);

  // If loading and we have no product, show loader
  if (loading && !product) {
    return (
      <div className="min-h-screen bg-[#F5EDD8] flex items-center justify-center">
        <div className="text-center">
          <svg className="w-8 h-8 animate-spin text-[#8B1A1A] mx-auto mb-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-[#2C1810] font-sans font-medium text-sm">Loading product details...</p>
        </div>
      </div>
    );
  }

  // If product is null (or deactivated), return a clean fallback
  if (!product) {
    return (
      <div className="min-h-screen bg-[#F5EDD8] flex items-center justify-center p-4">
        <div className="text-center max-w-md bg-[#FAF6EB] border border-[#E6D7B8] p-8 rounded-2xl shadow-sm">
          <Package className="w-12 h-12 text-[#8B1A1A] mx-auto mb-4" />
          <h2 className="font-serif text-xl font-bold text-[#2C1810] mb-2">Product Unavailable</h2>
          <p className="text-sm text-[#8B4513]/70 mb-6">
            This spice blend is currently out of stock or temporarily inactive in our catalog.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-[#2C1810] hover:bg-[#8B1A1A] text-[#F5EDD8] px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
          >
            Explore Other Spices
          </Link>
        </div>
      </div>
    );
  }

  const related = activeRelated;
  const discount = getDiscountPercent(product.sellingPrice, product.mrp);

  const handleAddToCart = () => {
    addItem(product, qty);
    toast.success(`${product.name} × ${qty} added to cart! 🌿`);
  };

  const handleBuyNow = () => {
    addItem(product, qty);
    toast.success(`${product.name} added — proceeding to checkout!`);
    // Cart drawer will open from addItem
  };

  const ingredientChips = product.ingredients.split(",").map((i) => i.trim());

  return (
    <div className="min-h-screen bg-[#F5EDD8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Breadcrumb name={product.name} />

        {/* ── Hero Section ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16">
          {/* Image */}
          <div className="relative">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-[#EDE0C4] border border-[#EDE0C4] shadow-[0_8px_40px_rgba(44,24,16,0.12)]">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                priority
                className="object-cover"
              />

              {/* Badges overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.badge && (
                  <span
                    className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                      badgeColors[product.badge] ?? "bg-[#8B1A1A] text-[#F5EDD8]"
                    }`}
                  >
                    {product.badge}
                  </span>
                )}
                {discount > 0 && (
                  <span className="text-xs font-bold bg-[#E8721C] text-white px-3 py-1.5 rounded-full">
                    {discount}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Floating rating card */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl px-5 py-3 shadow-lg border border-[#EDE0C4] flex items-center gap-3 whitespace-nowrap">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-[#D4A017] text-[#D4A017]"
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-[#2C1810]">4.9</span>
              <span className="text-[10px] text-[#8B4513]">· 200+ reviews</span>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col pt-4">
            {/* Weight tag */}
            <span className="self-start text-xs font-semibold text-[#8B4513] bg-[#EDE0C4] px-3 py-1 rounded-full mb-3">
              Net Wt. {product.weight}
            </span>

            {/* Name */}
            <h1 className="font-serif font-black text-[#2C1810] text-3xl md:text-4xl lg:text-[2.6rem] leading-tight mb-3">
              {product.name}
            </h1>

            {/* Short description */}
            <p className="text-[#6B4E37] text-base md:text-lg leading-relaxed mb-6">
              {product.shortDescription}
            </p>

            {/* Price block */}
            <div className="flex items-end gap-3 mb-2">
              <span className="font-black text-[#8B1A1A] text-4xl md:text-5xl">
                ₹{product.sellingPrice}
              </span>
              <span className="text-[#C4A88A] text-lg line-through mb-1">
                ₹{product.mrp}
              </span>
            </div>
            {discount > 0 && (
              <div className="flex items-center gap-2 mb-6">
                <span className="text-sm font-bold text-white bg-[#E8721C] px-3 py-1 rounded-full">
                  Save ₹{product.mrp - product.sellingPrice} ({discount}% off)
                </span>
                <span className="text-xs text-[#4A7C59] font-semibold">
                  Inclusive of all taxes
                </span>
              </div>
            )}

            {/* Quantity + Buttons */}
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <QuantitySelector value={qty} onChange={setQty} />
              <button
                onClick={handleAddToCart}
                className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-[#8B1A1A] text-[#F5EDD8] py-3 px-6 rounded-xl font-bold text-sm hover:bg-[#6B1212] active:scale-95 transition-all duration-200 shadow-[0_4px_16px_rgba(139,26,26,0.3)]"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-[#E8721C] text-white py-3 px-6 rounded-xl font-bold text-sm hover:bg-[#C8620C] active:scale-95 transition-all duration-200 shadow-[0_4px_16px_rgba(232,114,28,0.3)]"
              >
                <Zap className="w-4 h-4" />
                Buy Now
              </button>
            </div>

            {/* Shipping note */}
            <p className="text-xs text-[#4A7C59] font-semibold mb-6">
              🚚 Free shipping on orders above ₹499 &nbsp;·&nbsp; 📦 Usually dispatched in 1-2 days
            </p>

            {/* NONG Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
              {TRUST_BADGES.map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="flex flex-col items-center text-center p-3 rounded-xl bg-white/70 border border-[#EDE0C4] hover:border-[#4A7C59]/30 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-[#E8F5E9] flex items-center justify-center mb-1.5">
                    <Icon className="w-4 h-4 text-[#4A7C59]" />
                  </div>
                  <span className="text-[10px] font-bold text-[#2C1810] leading-tight">
                    {label}
                  </span>
                  <span className="text-[9px] text-[#8B4513] mt-0.5">{sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Content Sections ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Left: Full description + Ingredients + Benefits + Usage */}
          <div className="lg:col-span-2 space-y-10">
            {/* Full Description */}
            <section>
              <h2 className="font-serif font-bold text-[#2C1810] text-2xl mb-4 flex items-center gap-2">
                <span className="w-1 h-7 bg-[#E8721C] rounded-full inline-block" />
                About This Blend
              </h2>
              <p className="text-[#4A2A1A] leading-relaxed text-base">
                {product.description}
              </p>
            </section>

            {/* Ingredients */}
            <section>
              <h2 className="font-serif font-bold text-[#2C1810] text-2xl mb-4 flex items-center gap-2">
                <span className="w-1 h-7 bg-[#D4A017] rounded-full inline-block" />
                Ingredients
              </h2>
              <div className="flex flex-wrap gap-2">
                {ingredientChips.map((ing) => (
                  <span
                    key={ing}
                    className="text-xs font-semibold text-[#4A2A1A] bg-white/80 border border-[#EDE0C4] px-3 py-1.5 rounded-full hover:border-[#D4A017]/50 transition-colors"
                  >
                    {ing}
                  </span>
                ))}
              </div>
              <p className="text-xs text-[#8B4513] mt-3 font-medium">
                * May contain traces of nuts. Manufactured in a facility that processes tree nuts.
              </p>
            </section>

            {/* Benefits */}
            <section>
              <h2 className="font-serif font-bold text-[#2C1810] text-2xl mb-4 flex items-center gap-2">
                <span className="w-1 h-7 bg-[#4A7C59] rounded-full inline-block" />
                Why You&apos;ll Love It
              </h2>
              <ul className="space-y-3">
                {product.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#4A7C59]/15 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#4A7C59]" />
                    </span>
                    <span className="text-[#4A2A1A] text-sm leading-relaxed">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Usage suggestions */}
            <section>
              <h2 className="font-serif font-bold text-[#2C1810] text-2xl mb-4 flex items-center gap-2">
                <span className="w-1 h-7 bg-[#8B1A1A] rounded-full inline-block" />
                How to Use
              </h2>
              <ul className="space-y-3">
                {product.usageSuggestions.map((usage, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#8B1A1A]/10 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-black text-[#8B1A1A]">
                      {i + 1}
                    </span>
                    <span className="text-[#4A2A1A] text-sm leading-relaxed">
                      {usage}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right: Sticky product card */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Re-order card */}
              <div className="bg-white/80 border border-[#EDE0C4] rounded-2xl p-6 shadow-sm">
                <p className="text-xs font-bold text-[#E8721C] tracking-widest uppercase mb-1">
                  Quick Order
                </p>
                <p className="font-serif font-bold text-[#2C1810] text-lg mb-1">
                  {product.name}
                </p>
                <p className="text-xs text-[#8B4513] mb-4">{product.weight}</p>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-black text-[#8B1A1A]">
                    ₹{product.sellingPrice}
                  </span>
                  <span className="text-sm text-[#C4A88A] line-through">
                    ₹{product.mrp}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <QuantitySelector value={qty} onChange={setQty} />
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleAddToCart}
                    className="w-full flex items-center justify-center gap-2 bg-[#8B1A1A] text-[#F5EDD8] py-3 rounded-xl font-bold text-sm hover:bg-[#6B1212] transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="w-full flex items-center justify-center gap-2 bg-[#E8721C] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#C8620C] transition-colors"
                  >
                    <Zap className="w-4 h-4" />
                    Buy Now
                  </button>
                </div>

                <div className="mt-4 pt-4 border-t border-[#EDE0C4]">
                  <div className="space-y-2">
                    {[
                      "✅ 100% Pure NONG Blend",
                      "📦 Dispatched in 1-2 days",
                      "🚚 Free shipping on ₹499+",
                      "↩️ Easy returns policy",
                    ].map((item) => (
                      <p key={item} className="text-xs text-[#6B4E37]">
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Storage tip */}
              <div className="bg-[#2C1810] rounded-2xl p-5 text-center">
                <p className="text-[#D4A017] text-xs font-bold tracking-wider uppercase mb-1">
                  Storage Tip
                </p>
                <p className="text-[#F5EDD8] text-sm leading-relaxed">
                  Store in a cool, dry place away from direct sunlight. Best consumed within 12 months of manufacture.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── FAQ Section ───────────────────────────────────────────── */}
        {product.faqs.length > 0 && (
          <section className="mb-16">
            <h2 className="font-serif font-bold text-[#2C1810] text-2xl md:text-3xl mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto bg-white/70 rounded-2xl border border-[#EDE0C4] px-6 divide-y-0">
              {product.faqs.map((faq) => (
                <FAQItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </section>
        )}

        {/* ── Related Products ──────────────────────────────────────── */}
        <section>
          <div className="text-center mb-8">
            <p className="text-[#E8721C] text-xs font-bold tracking-[0.2em] uppercase mb-2">
              You Might Also Like
            </p>
            <h2 className="font-serif font-bold text-[#2C1810] text-2xl md:text-3xl">
              Explore More Blends
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {related.map((p, i) => (
              <ProductCard key={p.slug} product={p} priority={i < 2} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#2C1810] text-[#F5EDD8] px-8 py-4 rounded-xl font-bold text-sm hover:bg-[#8B1A1A] transition-colors duration-300"
            >
              View All 10 Products →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
