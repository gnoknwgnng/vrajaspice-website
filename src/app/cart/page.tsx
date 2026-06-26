"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

// ─── Coupon definitions ────────────────────────────────────────────────────────
const COUPONS: Record<string, { type: "percent" | "flat"; value: number; label: string }> = {
  LAUNCH10: { type: "percent", value: 10, label: "10% off" },
  SOUL50: { type: "flat", value: 50, label: "₹50 off" },
  ISKCON15: { type: "percent", value: 15, label: "15% off" },
};

// ─── Free-shipping threshold ───────────────────────────────────────────────────
const FREE_SHIPPING_AT = 499;
const SHIPPING_CHARGE = 49;

// ─── Trust badge data ─────────────────────────────────────────────────────────
const TRUST_BADGES = [
  { icon: "🔒", label: "100% Secure Checkout" },
  { icon: "🌿", label: "No Onion No Garlic Facility" },
  { icon: "🚚", label: "Free Shipping ₹499+" },
  { icon: "✅", label: "100% Pure & Natural" },
];

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, subtotal, clearCart } = useCart();

  // Coupon state
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  // Derived values
  const discount = useMemo(() => {
    if (!appliedCoupon) return 0;
    const c = COUPONS[appliedCoupon];
    if (!c) return 0;
    if (c.type === "percent") return Math.round((subtotal * c.value) / 100);
    return Math.min(c.value, subtotal);
  }, [appliedCoupon, subtotal]);

  const discountedSubtotal = subtotal - discount;
  const shippingAfterDiscount = discountedSubtotal >= FREE_SHIPPING_AT ? 0 : SHIPPING_CHARGE;
  const total = discountedSubtotal + shippingAfterDiscount;

  // Free-shipping progress
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_AT - subtotal);
  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_AT) * 100);

  // Total MRP savings
  const mrpSavings = items.reduce(
    (s, i) => s + (i.product.mrp - i.product.sellingPrice) * i.quantity,
    0
  );
  const totalSavings = mrpSavings + discount;

  function handleApplyCoupon() {
    const code = couponInput.trim().toUpperCase();
    if (!code) {
      setCouponError("Please enter a coupon code.");
      setCouponSuccess("");
      return;
    }
    if (COUPONS[code]) {
      setAppliedCoupon(code);
      setCouponError("");
      setCouponSuccess(`Coupon applied! You save ${COUPONS[code].label}.`);
    } else {
      setCouponError("Invalid coupon code. Try LAUNCH10, SOUL50, or ISKCON15.");
      setCouponSuccess("");
      setAppliedCoupon(null);
    }
  }

  function handleRemoveCoupon() {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponError("");
    setCouponSuccess("");
  }

  if (items.length === 0) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4 py-20"
        style={{ background: "#F5EDD8" }}
      >
        <div className="text-8xl mb-6">🛒</div>
        <h1
          className="text-3xl font-bold mb-3 text-center"
          style={{ fontFamily: "var(--font-serif)", color: "#2C1810" }}
        >
          Your cart is empty
        </h1>
        <p className="text-base mb-8 text-center max-w-sm" style={{ color: "#8B4513" }}>
          Looks like you haven&apos;t added any spices yet. Explore our handcrafted
          NONG blends and spice up your cooking!
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-base transition-all duration-200 hover:scale-105 active:scale-95"
          style={{ background: "#8B1A1A", color: "#F5EDD8" }}
        >
          Shop Now →
        </Link>
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          {TRUST_BADGES.map((b) => (
            <span
              key={b.label}
              className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full"
              style={{ background: "#E8721C22", color: "#8B4513" }}
            >
              <span>{b.icon}</span> {b.label}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#F5EDD8" }}>
      {/* Page header */}
      <div
        className="border-b px-4 py-6"
        style={{ borderColor: "#D4A01733", background: "#F0E4C8" }}
      >
        <div className="max-w-6xl mx-auto">
          <h1
            className="text-2xl md:text-3xl font-bold"
            style={{ fontFamily: "var(--font-serif)", color: "#2C1810" }}
          >
            Your Cart
          </h1>
          <p className="text-sm mt-1" style={{ color: "#8B4513" }}>
            {items.length} product{items.length !== 1 ? "s" : ""} in your cart
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Free-shipping banner */}
        {amountToFreeShipping > 0 ? (
          <div
            className="rounded-2xl p-4 mb-6 flex flex-col gap-2"
            style={{ background: "#E8721C18", border: "1px solid #E8721C44" }}
          >
            <div className="flex justify-between items-center text-sm font-medium" style={{ color: "#8B1A1A" }}>
              <span>🚚 Add ₹{amountToFreeShipping} more for FREE shipping!</span>
              <span className="text-xs" style={{ color: "#8B4513" }}>₹{subtotal} / ₹{FREE_SHIPPING_AT}</span>
            </div>
            <div
              className="w-full rounded-full overflow-hidden"
              style={{ background: "#D4A01733", height: "6px" }}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%`, background: "#E8721C" }}
              />
            </div>
          </div>
        ) : (
          <div
            className="rounded-2xl p-4 mb-6 flex items-center gap-3"
            style={{ background: "#22c55e18", border: "1px solid #22c55e44" }}
          >
            <span className="text-xl">🎉</span>
            <span className="text-sm font-semibold" style={{ color: "#166534" }}>
              You&apos;ve unlocked FREE shipping!
            </span>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── Cart items ──────────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col gap-4">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.slug}
                  className="flex gap-4 p-4 rounded-2xl shadow-sm"
                  style={{ background: "#FAF3E4", border: "1px solid #D4A01733" }}
                >
                  {/* Product image */}
                  <div
                    className="relative flex-shrink-0 rounded-xl overflow-hidden"
                    style={{ width: 96, height: 96, background: "#F5EDD8" }}
                  >
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      sizes="96px"
                      className="object-contain p-2"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h3
                        className="font-semibold text-base leading-snug line-clamp-2"
                        style={{ fontFamily: "var(--font-serif)", color: "#2C1810" }}
                      >
                        {product.name}
                      </h3>
                      <p className="text-xs mt-0.5" style={{ color: "#8B4513" }}>
                        {product.weight}
                      </p>
                    </div>

                    <div className="flex items-center justify-between flex-wrap gap-2 mt-2">
                      {/* Price */}
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold" style={{ color: "#8B1A1A" }}>
                          ₹{product.sellingPrice * quantity}
                        </span>
                        {product.mrp > product.sellingPrice && (
                          <span className="text-xs line-through" style={{ color: "#8B4513" }}>
                            ₹{product.mrp * quantity}
                          </span>
                        )}
                      </div>

                      {/* Qty controls + remove */}
                      <div className="flex items-center gap-1">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => updateQuantity(product.slug, quantity - 1)}
                          className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-base transition-all duration-150 hover:scale-110 active:scale-90"
                          style={{ background: "#8B1A1A22", color: "#8B1A1A" }}
                        >
                          −
                        </button>
                        <span
                          className="w-8 text-center font-semibold text-sm"
                          style={{ color: "#2C1810" }}
                        >
                          {quantity}
                        </span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() => updateQuantity(product.slug, quantity + 1)}
                          className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-base transition-all duration-150 hover:scale-110 active:scale-90"
                          style={{ background: "#8B1A1A22", color: "#8B1A1A" }}
                        >
                          +
                        </button>
                        <button
                          aria-label="Remove item"
                          onClick={() => removeItem(product.slug)}
                          className="ml-2 w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-150 hover:scale-110 active:scale-90"
                          style={{ background: "#ff000018", color: "#cc0000" }}
                        >
                          🗑
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Clear cart */}
            <button
              onClick={() => {
                if (confirm("Clear your entire cart?")) clearCart();
              }}
              className="mt-4 text-sm underline-offset-2 underline transition-opacity hover:opacity-70"
              style={{ color: "#8B4513" }}
            >
              Clear Cart
            </button>

            {/* Continue shopping */}
            <div className="mt-6">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-75"
                style={{ color: "#8B1A1A" }}
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* ── Order summary sidebar ─────────────────────────────────────── */}
          <div className="w-full lg:w-[380px] flex-shrink-0">
            <div
              className="rounded-2xl p-6 sticky top-24"
              style={{ background: "#FAF3E4", border: "1px solid #D4A01744" }}
            >
              <h2
                className="text-xl font-bold mb-5"
                style={{ fontFamily: "var(--font-serif)", color: "#2C1810" }}
              >
                Order Summary
              </h2>

              {/* Coupon */}
              <div className="mb-5">
                <label
                  className="text-xs font-semibold uppercase tracking-wider mb-2 block"
                  style={{ color: "#8B4513" }}
                >
                  Have a Coupon?
                </label>
                {appliedCoupon ? (
                  <div
                    className="flex items-center justify-between rounded-xl px-4 py-2.5"
                    style={{ background: "#22c55e18", border: "1px solid #22c55e55" }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">✅</span>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: "#166534" }}>
                          {appliedCoupon}
                        </p>
                        <p className="text-xs" style={{ color: "#166534" }}>
                          {couponSuccess}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-xs underline"
                      style={{ color: "#8B4513" }}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                      className="flex-1 px-3 py-2 rounded-xl text-sm outline-none border"
                      style={{
                        background: "#F5EDD8",
                        border: "1.5px solid #D4A01766",
                        color: "#2C1810",
                      }}
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150 hover:opacity-90 active:scale-95"
                      style={{ background: "#8B1A1A", color: "#F5EDD8" }}
                    >
                      Apply
                    </button>
                  </div>
                )}
                {couponError && (
                  <p className="text-xs mt-1.5" style={{ color: "#cc0000" }}>
                    {couponError}
                  </p>
                )}
              </div>

              {/* Summary rows */}
              <div className="space-y-3 text-sm" style={{ color: "#2C1810" }}>
                <div className="flex justify-between">
                  <span style={{ color: "#8B4513" }}>Subtotal</span>
                  <span className="font-medium">₹{subtotal}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between">
                    <span style={{ color: "#166534" }}>Discount ({appliedCoupon})</span>
                    <span className="font-semibold" style={{ color: "#166534" }}>
                      −₹{discount}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span style={{ color: "#8B4513" }}>Shipping</span>
                  {shippingAfterDiscount === 0 ? (
                    <span className="font-semibold" style={{ color: "#166534" }}>
                      FREE
                    </span>
                  ) : (
                    <span className="font-medium">₹{shippingAfterDiscount}</span>
                  )}
                </div>

                <div
                  className="border-t pt-3 flex justify-between text-base font-bold"
                  style={{ borderColor: "#D4A01744" }}
                >
                  <span>Total</span>
                  <span style={{ color: "#8B1A1A" }}>₹{total}</span>
                </div>
              </div>

              {/* Savings badge */}
              {totalSavings > 0 && (
                <div
                  className="mt-4 rounded-xl px-4 py-2 text-xs font-medium text-center"
                  style={{ background: "#22c55e18", color: "#166534" }}
                >
                  🎊 You&apos;re saving ₹{totalSavings} on this order!
                </div>
              )}

              {/* Proceed to Checkout */}
              <button
                onClick={() => router.push("/checkout")}
                className="w-full mt-6 py-4 rounded-2xl font-bold text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                style={{
                  background: "linear-gradient(135deg, #8B1A1A 0%, #E8721C 100%)",
                  color: "#F5EDD8",
                }}
              >
                Proceed to Checkout →
              </button>

              {/* Trust badges */}
              <div className="mt-5 grid grid-cols-2 gap-2">
                {TRUST_BADGES.map((b) => (
                  <div
                    key={b.label}
                    className="flex items-center gap-1.5 text-xs px-2 py-1.5 rounded-lg"
                    style={{ background: "#F5EDD8", color: "#8B4513" }}
                  >
                    <span className="text-sm">{b.icon}</span>
                    <span className="leading-tight">{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile sticky checkout ─────────────────────────────────────────────── */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 px-4 py-3 shadow-2xl"
        style={{ background: "#FAF3E4", borderTop: "1px solid #D4A01744" }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm" style={{ color: "#8B4513" }}>Total</span>
          <span className="text-lg font-bold" style={{ color: "#8B1A1A" }}>₹{total}</span>
        </div>
        <button
          onClick={() => router.push("/checkout")}
          className="w-full py-3.5 rounded-2xl font-bold text-base transition-all duration-200 active:scale-95 shadow-lg"
          style={{
            background: "linear-gradient(135deg, #8B1A1A 0%, #E8721C 100%)",
            color: "#F5EDD8",
          }}
        >
          Proceed to Checkout →
        </button>
      </div>
      {/* Spacer for mobile sticky bar */}
      <div className="lg:hidden h-32" />
    </div>
  );
}
