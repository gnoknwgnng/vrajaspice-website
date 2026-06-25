"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

// ─── Indian states list ───────────────────────────────────────────────────────
const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
];

// ─── Payment methods ───────────────────────────────────────────────────────────
const PAYMENT_METHODS = [
  {
    id: "upi",
    icon: "📱",
    label: "UPI",
    description: "GPay, PhonePe, Paytm & more",
  },
  {
    id: "card",
    icon: "💳",
    label: "Credit / Debit Card",
    description: "Visa, Mastercard, RuPay",
  },
  {
    id: "netbanking",
    icon: "🏦",
    label: "Net Banking",
    description: "All major Indian banks",
  },
  {
    id: "cod",
    icon: "💰",
    label: "Cash on Delivery",
    description: "Pay when your order arrives",
  },
];

const FREE_SHIPPING_AT = 499;
const SHIPPING_CHARGE = 49;

type ShippingForm = {
  fullName: string;
  mobile: string;
  email: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  pinCode: string;
};

const EMPTY_FORM: ShippingForm = {
  fullName: "",
  mobile: "",
  email: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  pinCode: "",
};

type FormErrors = Partial<Record<keyof ShippingForm, string>>;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const { profile } = useAuth();

  const [form, setForm] = useState<ShippingForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [paymentMethod, setPaymentMethod] = useState<string>("upi");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [savedAddresses, setSavedAddresses] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("custom");

  const shipping = subtotal >= FREE_SHIPPING_AT ? 0 : SHIPPING_CHARGE;
  const total = subtotal + shipping;

  // Pre-fill user profile fields and fetch saved addresses
  useEffect(() => {
    if (profile) {
      setForm((prev) => ({
        ...prev,
        fullName: profile.full_name || prev.fullName,
        email: profile.email || prev.email,
        mobile: profile.mobile || prev.mobile,
      }));

      const fetchSavedAddresses = async () => {
        try {
          const { data, error } = await supabase
            .from("addresses")
            .select("id, line1, line2, city, state, pin_code")
            .eq("customer_id", profile.id);

          if (!error && data && data.length > 0) {
            setSavedAddresses(data);
            const first = data[0];
            setForm((prev) => ({
              ...prev,
              address1: first.line1,
              address2: first.line2 || "",
              city: first.city,
              state: first.state,
              pinCode: first.pin_code,
            }));
            setSelectedAddressId(String(first.id));
          }
        } catch (err) {
          console.error("Error loading customer addresses:", err);
        }
      };

      fetchSavedAddresses();
    }
  }, [profile]);

  // ── Validation ──────────────────────────────────────────────────────────────
  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required.";
    if (!form.mobile.trim() || !/^\+?[6-9]\d{9}$/.test(form.mobile.replace(/\s/g, ""))) {
      errs.mobile = "Enter a valid 10-digit Indian mobile number.";
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Enter a valid email address.";
    }
    if (!form.address1.trim()) errs.address1 = "Address line 1 is required.";
    if (!form.city.trim()) errs.city = "City is required.";
    if (!form.state) errs.state = "Please select a state.";
    if (!form.pinCode.trim() || !/^\d{6}$/.test(form.pinCode)) {
      errs.pinCode = "Enter a valid 6-digit PIN code.";
    }
    return errs;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ShippingForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  // ── Submit ──────────────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Scroll to first error
      const firstKey = Object.keys(errs)[0];
      document.getElementById(firstKey)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const orderPayload = {
        customerId: profile?.id || null,
        customerName: form.fullName,
        mobile: form.mobile,
        email: form.email,
        shippingAddress: {
          address1: form.address1,
          address2: form.address2,
          city: form.city,
          state: form.state,
          pinCode: form.pinCode,
        },
        items: items.map((i) => ({
          productId: i.product.id,
          productName: i.product.name,
          weight: i.product.weight,
          quantity: i.quantity,
          sellingPrice: i.product.sellingPrice,
          mrp: i.product.mrp,
          imageUrl: i.product.imageUrl,
        })),
        subtotal,
        shipping,
        total,
        paymentMethod,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      if (!res.ok) throw new Error("Failed to place order.");

      const { orderId } = await res.json();

      if (paymentMethod === "cod") {
        // COD: just redirect to confirmation
        clearCart();
        router.push(`/order-confirmation/${orderId}`);
      } else {
        // Online: Razorpay integration scaffold
        // TODO: Load Razorpay script and open payment modal
        // For now, simulate successful payment and redirect
        clearCart();
        router.push(`/order-confirmation/${orderId}`);
      }
    } catch (err) {
      console.error(err);
      setSubmitError(
        "Something went wrong while placing your order. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  // ── Empty cart guard ────────────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4 px-4"
        style={{ background: "#F5EDD8" }}
      >
        <div className="text-6xl">🛒</div>
        <h2
          className="text-2xl font-bold"
          style={{ fontFamily: "var(--font-serif)", color: "#2C1810" }}
        >
          Your cart is empty
        </h2>
        <p className="text-sm" style={{ color: "#8B4513" }}>
          Add some spices before checking out.
        </p>
        <Link
          href="/shop"
          className="px-6 py-3 rounded-full font-semibold text-sm mt-2"
          style={{ background: "#8B1A1A", color: "#F5EDD8" }}
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#F5EDD8" }}>
      {/* Header */}
      <div
        className="border-b px-4 py-5"
        style={{ borderColor: "#D4A01733", background: "#F0E4C8" }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1
            className="text-2xl md:text-3xl font-bold"
            style={{ fontFamily: "var(--font-serif)", color: "#2C1810" }}
          >
            Secure Checkout
          </h1>
          <Link
            href="/cart"
            className="text-sm underline"
            style={{ color: "#8B4513" }}
          >
            ← Back to Cart
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* ── Left: Form ──────────────────────────────────────────────── */}
            <div className="flex-1 min-w-0 space-y-8">
              {/* Shipping details */}
              <section
                className="rounded-2xl p-6"
                style={{ background: "#FAF3E4", border: "1px solid #D4A01733" }}
              >
                <h2
                  className="text-lg font-bold mb-5 flex items-center gap-2"
                  style={{ fontFamily: "var(--font-serif)", color: "#2C1810" }}
                >
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: "#8B1A1A", color: "#F5EDD8" }}
                  >
                    1
                  </span>
                  Shipping Details
                </h2>

                {savedAddresses.length > 0 && (
                  <div className="mb-6 p-4 bg-[#FAF6EB] border border-[#D4A01733] rounded-xl">
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#8B4513" }}>
                      Select a Saved Address
                    </label>
                    <select
                      value={selectedAddressId}
                      onChange={(e) => {
                        const idVal = e.target.value;
                        setSelectedAddressId(idVal);
                        if (idVal === "custom") {
                          setForm((prev) => ({
                            ...prev,
                            address1: "",
                            address2: "",
                            city: "",
                            state: "",
                            pinCode: "",
                          }));
                        } else {
                          const selected = savedAddresses.find((a) => String(a.id) === idVal);
                          if (selected) {
                            setForm((prev) => ({
                              ...prev,
                              address1: selected.line1,
                              address2: selected.line2 || "",
                              city: selected.city,
                              state: selected.state,
                              pinCode: selected.pin_code,
                            }));
                          }
                        }
                      }}
                      className="w-full px-4 py-3 bg-[#F5EDD8] border border-[#D4A01766] text-[#2C1810] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#8B1A1A]"
                    >
                      {savedAddresses.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.line1}, {a.city} ({a.pin_code})
                        </option>
                      ))}
                      <option value="custom">Use a different address...</option>
                    </select>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-semibold mb-1 uppercase tracking-wider"
                      style={{ color: "#8B4513" }}
                    >
                      Full Name <span style={{ color: "#8B1A1A" }}>*</span>
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      placeholder="e.g. Priya Sharma"
                      value={form.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{
                        background: "#F5EDD8",
                        border: `1.5px solid ${errors.fullName ? "#cc0000" : "#D4A01766"}`,
                        color: "#2C1810",
                      }}
                    />
                    {errors.fullName && (
                      <p className="text-xs mt-1" style={{ color: "#cc0000" }}>
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Mobile */}
                  <div>
                    <label
                      htmlFor="mobile"
                      className="block text-xs font-semibold mb-1 uppercase tracking-wider"
                      style={{ color: "#8B4513" }}
                    >
                      Mobile <span style={{ color: "#8B1A1A" }}>*</span>
                    </label>
                    <input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      autoComplete="tel"
                      placeholder="10-digit mobile number"
                      value={form.mobile}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{
                        background: "#F5EDD8",
                        border: `1.5px solid ${errors.mobile ? "#cc0000" : "#D4A01766"}`,
                        color: "#2C1810",
                      }}
                    />
                    {errors.mobile && (
                      <p className="text-xs mt-1" style={{ color: "#cc0000" }}>
                        {errors.mobile}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold mb-1 uppercase tracking-wider"
                      style={{ color: "#8B4513" }}
                    >
                      Email <span style={{ color: "#8B1A1A" }}>*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@email.com"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{
                        background: "#F5EDD8",
                        border: `1.5px solid ${errors.email ? "#cc0000" : "#D4A01766"}`,
                        color: "#2C1810",
                      }}
                    />
                    {errors.email && (
                      <p className="text-xs mt-1" style={{ color: "#cc0000" }}>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Address Line 1 */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="address1"
                      className="block text-xs font-semibold mb-1 uppercase tracking-wider"
                      style={{ color: "#8B4513" }}
                    >
                      Address Line 1 <span style={{ color: "#8B1A1A" }}>*</span>
                    </label>
                    <input
                      id="address1"
                      name="address1"
                      type="text"
                      autoComplete="address-line1"
                      placeholder="House / Flat No., Street, Area"
                      value={form.address1}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{
                        background: "#F5EDD8",
                        border: `1.5px solid ${errors.address1 ? "#cc0000" : "#D4A01766"}`,
                        color: "#2C1810",
                      }}
                    />
                    {errors.address1 && (
                      <p className="text-xs mt-1" style={{ color: "#cc0000" }}>
                        {errors.address1}
                      </p>
                    )}
                  </div>

                  {/* Address Line 2 */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="address2"
                      className="block text-xs font-semibold mb-1 uppercase tracking-wider"
                      style={{ color: "#8B4513" }}
                    >
                      Address Line 2{" "}
                      <span className="normal-case font-normal text-xs" style={{ color: "#8B4513" }}>
                        (Optional)
                      </span>
                    </label>
                    <input
                      id="address2"
                      name="address2"
                      type="text"
                      autoComplete="address-line2"
                      placeholder="Landmark, Building name, etc."
                      value={form.address2}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{
                        background: "#F5EDD8",
                        border: "1.5px solid #D4A01766",
                        color: "#2C1810",
                      }}
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-xs font-semibold mb-1 uppercase tracking-wider"
                      style={{ color: "#8B4513" }}
                    >
                      City <span style={{ color: "#8B1A1A" }}>*</span>
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      autoComplete="address-level2"
                      placeholder="e.g. Mumbai"
                      value={form.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{
                        background: "#F5EDD8",
                        border: `1.5px solid ${errors.city ? "#cc0000" : "#D4A01766"}`,
                        color: "#2C1810",
                      }}
                    />
                    {errors.city && (
                      <p className="text-xs mt-1" style={{ color: "#cc0000" }}>
                        {errors.city}
                      </p>
                    )}
                  </div>

                  {/* State */}
                  <div>
                    <label
                      htmlFor="state"
                      className="block text-xs font-semibold mb-1 uppercase tracking-wider"
                      style={{ color: "#8B4513" }}
                    >
                      State <span style={{ color: "#8B1A1A" }}>*</span>
                    </label>
                    <select
                      id="state"
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none appearance-none"
                      style={{
                        background: "#F5EDD8",
                        border: `1.5px solid ${errors.state ? "#cc0000" : "#D4A01766"}`,
                        color: form.state ? "#2C1810" : "#8B4513",
                      }}
                    >
                      <option value="" disabled>
                        Select State / UT
                      </option>
                      {STATES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    {errors.state && (
                      <p className="text-xs mt-1" style={{ color: "#cc0000" }}>
                        {errors.state}
                      </p>
                    )}
                  </div>

                  {/* PIN Code */}
                  <div>
                    <label
                      htmlFor="pinCode"
                      className="block text-xs font-semibold mb-1 uppercase tracking-wider"
                      style={{ color: "#8B4513" }}
                    >
                      PIN Code <span style={{ color: "#8B1A1A" }}>*</span>
                    </label>
                    <input
                      id="pinCode"
                      name="pinCode"
                      type="text"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      placeholder="6-digit PIN"
                      maxLength={6}
                      value={form.pinCode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{
                        background: "#F5EDD8",
                        border: `1.5px solid ${errors.pinCode ? "#cc0000" : "#D4A01766"}`,
                        color: "#2C1810",
                      }}
                    />
                    {errors.pinCode && (
                      <p className="text-xs mt-1" style={{ color: "#cc0000" }}>
                        {errors.pinCode}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              {/* Payment method */}
              <section
                className="rounded-2xl p-6"
                style={{ background: "#FAF3E4", border: "1px solid #D4A01733" }}
              >
                <h2
                  className="text-lg font-bold mb-5 flex items-center gap-2"
                  style={{ fontFamily: "var(--font-serif)", color: "#2C1810" }}
                >
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: "#8B1A1A", color: "#F5EDD8" }}
                  >
                    2
                  </span>
                  Payment Method
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PAYMENT_METHODS.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      className="flex items-start gap-3 p-4 rounded-xl text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                      style={{
                        background:
                          paymentMethod === method.id ? "#8B1A1A18" : "#F5EDD8",
                        border: `2px solid ${
                          paymentMethod === method.id ? "#8B1A1A" : "#D4A01766"
                        }`,
                      }}
                    >
                      <span className="text-2xl mt-0.5">{method.icon}</span>
                      <div>
                        <p
                          className="font-semibold text-sm"
                          style={{
                            color:
                              paymentMethod === method.id ? "#8B1A1A" : "#2C1810",
                          }}
                        >
                          {method.label}
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: "#8B4513" }}>
                          {method.description}
                        </p>
                      </div>
                      {paymentMethod === method.id && (
                        <div className="ml-auto mt-0.5">
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center"
                            style={{ background: "#8B1A1A" }}
                          >
                            <svg
                              width="10"
                              height="8"
                              viewBox="0 0 10 8"
                              fill="none"
                            >
                              <path
                                d="M1 4L3.5 6.5L9 1"
                                stroke="#F5EDD8"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Razorpay note */}
                {paymentMethod !== "cod" && (
                  <div
                    className="mt-4 rounded-xl px-4 py-3 flex items-center gap-3"
                    style={{ background: "#E8721C12", border: "1px solid #E8721C33" }}
                  >
                    <span className="text-xl">🔐</span>
                    <p className="text-xs" style={{ color: "#8B4513" }}>
                      Payments are processed securely via{" "}
                      <strong style={{ color: "#2C1810" }}>Razorpay</strong>. Your
                      card details are never stored on our servers.
                    </p>
                  </div>
                )}
              </section>

              {/* Error message */}
              {submitError && (
                <div
                  className="rounded-xl px-4 py-3 text-sm"
                  style={{
                    background: "#ff000012",
                    border: "1px solid #ff000033",
                    color: "#cc0000",
                  }}
                >
                  {submitError}
                </div>
              )}

              {/* Submit button (desktop) */}
              <div className="hidden lg:block">
                <PlaceOrderButton
                  paymentMethod={paymentMethod}
                  isSubmitting={isSubmitting}
                  total={total}
                />
                <TrustRow />
              </div>
            </div>

            {/* ── Right: Cart summary ──────────────────────────────────────── */}
            <div className="w-full lg:w-[360px] flex-shrink-0">
              <div
                className="rounded-2xl p-6 sticky top-24"
                style={{ background: "#FAF3E4", border: "1px solid #D4A01744" }}
              >
                <h2
                  className="text-lg font-bold mb-4"
                  style={{ fontFamily: "var(--font-serif)", color: "#2C1810" }}
                >
                  Order Summary
                </h2>

                {/* Items */}
                <div className="space-y-3 mb-4">
                  {items.map(({ product, quantity }) => (
                    <div key={product.slug} className="flex items-center gap-3">
                      <div
                        className="relative rounded-lg overflow-hidden flex-shrink-0"
                        style={{ width: 52, height: 52, background: "#F5EDD8" }}
                      >
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          sizes="52px"
                          className="object-contain p-1"
                        />
                        {/* Qty badge */}
                        <span
                          className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold"
                          style={{ background: "#8B1A1A", color: "#F5EDD8" }}
                        >
                          {quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-sm font-medium line-clamp-1"
                          style={{ color: "#2C1810" }}
                        >
                          {product.name}
                        </p>
                        <p className="text-xs" style={{ color: "#8B4513" }}>
                          {product.weight}
                        </p>
                      </div>
                      <p className="text-sm font-semibold" style={{ color: "#8B1A1A" }}>
                        ₹{product.sellingPrice * quantity}
                      </p>
                    </div>
                  ))}
                </div>

                <div
                  className="border-t pt-4 space-y-2 text-sm"
                  style={{ borderColor: "#D4A01744" }}
                >
                  <div className="flex justify-between" style={{ color: "#8B4513" }}>
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between" style={{ color: "#8B4513" }}>
                    <span>Shipping</span>
                    {shipping === 0 ? (
                      <span className="font-semibold" style={{ color: "#166534" }}>
                        FREE
                      </span>
                    ) : (
                      <span>₹{shipping}</span>
                    )}
                  </div>
                  <div
                    className="border-t pt-2 flex justify-between font-bold text-base"
                    style={{ borderColor: "#D4A01744", color: "#2C1810" }}
                  >
                    <span>Total</span>
                    <span style={{ color: "#8B1A1A" }}>₹{total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile submit button */}
          <div className="lg:hidden mt-6">
            <PlaceOrderButton
              paymentMethod={paymentMethod}
              isSubmitting={isSubmitting}
              total={total}
            />
            <TrustRow />
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function PlaceOrderButton({
  paymentMethod,
  isSubmitting,
  total,
}: {
  paymentMethod: string;
  isSubmitting: boolean;
  total: number;
}) {
  const isCOD = paymentMethod === "cod";
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full py-4 rounded-2xl font-bold text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
      style={{
        background: isCOD
          ? "linear-gradient(135deg, #D4A017 0%, #8B4513 100%)"
          : "linear-gradient(135deg, #8B1A1A 0%, #E8721C 100%)",
        color: "#F5EDD8",
      }}
    >
      {isSubmitting ? (
        <span className="flex items-center justify-center gap-2">
          <svg
            className="animate-spin"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeOpacity="0.3"
              strokeWidth="3"
            />
            <path
              d="M12 2a10 10 0 0 1 10 10"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          Placing Order…
        </span>
      ) : isCOD ? (
        `Confirm COD Order — ₹${total} →`
      ) : (
        `Pay with Razorpay — ₹${total} →`
      )}
    </button>
  );
}

function TrustRow() {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {[
        { icon: "🔒", text: "SSL Secured" },
        { icon: "🛡️", text: "100% Safe" },
        { icon: "🔄", text: "Easy Returns" },
        { icon: "📞", text: "24/7 Support" },
      ].map((b) => (
        <span
          key={b.text}
          className="flex items-center gap-1.5 text-xs"
          style={{ color: "#8B4513" }}
        >
          <span>{b.icon}</span> {b.text}
        </span>
      ))}
    </div>
  );
}
