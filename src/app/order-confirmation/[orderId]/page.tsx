"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────
interface OrderItem {
  productId: number;
  productName: string;
  weight: string;
  quantity: number;
  sellingPrice: number;
  mrp: number;
  imageUrl: string;
}

interface OrderData {
  orderId: string;
  orderNumber: string;
  customerName: string;
  mobile: string;
  email: string;
  shippingAddress: {
    address1: string;
    address2?: string;
    city: string;
    state: string;
    pinCode: string;
  };
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  placedAt: string;
}

const PAYMENT_LABELS: Record<string, string> = {
  upi: "UPI",
  card: "Credit / Debit Card",
  netbanking: "Net Banking",
  cod: "Cash on Delivery",
};

// WhatsApp share message builder
function buildWhatsAppMessage(order: OrderData): string {
  const itemsText = order.items
    .map((i) => `• ${i.productName} (${i.weight}) × ${i.quantity}`)
    .join("\n");
  const msg =
    `🎉 I just ordered from *Vrajaspice* — premium NONG spices!\n\n` +
    `Order: ${order.orderNumber}\n` +
    `Items:\n${itemsText}\n` +
    `Total: ₹${order.total}\n\n` +
    `Check out their amazing spices at https://vrajaspice.in 🌿`;
  return encodeURIComponent(msg);
}

// ─── Checkmark animation component ───────────────────────────────────────────
function AnimatedCheckmark() {
  return (
    <div className="relative w-24 h-24 mx-auto mb-6">
      <svg
        className="w-24 h-24"
        viewBox="0 0 96 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Circle */}
        <circle
          cx="48"
          cy="48"
          r="44"
          stroke="#22c55e"
          strokeWidth="4"
          fill="#22c55e18"
          style={{
            strokeDasharray: "276",
            strokeDashoffset: "0",
            animation: "drawCircle 0.8s ease forwards",
          }}
        />
        {/* Check */}
        <path
          d="M26 50L40 64L70 34"
          stroke="#22c55e"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: "56",
            strokeDashoffset: "0",
            animation: "drawCheck 0.5s ease 0.7s forwards",
          }}
        />
      </svg>
      <style>{`
        @keyframes drawCircle {
          from { stroke-dashoffset: 276; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes drawCheck {
          from { stroke-dashoffset: 56; opacity: 0; }
          to { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.6s ease forwards; }
        .fade-up-1 { animation: fadeUp 0.6s ease 0.2s both; }
        .fade-up-2 { animation: fadeUp 0.6s ease 0.4s both; }
        .fade-up-3 { animation: fadeUp 0.6s ease 0.6s both; }
        .fade-up-4 { animation: fadeUp 0.6s ease 0.8s both; }
      `}</style>
    </div>
  );
}

// ─── Skeleton loader ──────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="animate-pulse space-y-4" style={{ color: "#2C1810" }}>
      <div className="w-24 h-24 rounded-full mx-auto" style={{ background: "#D4A01733" }} />
      <div className="h-6 rounded-xl w-3/4 mx-auto" style={{ background: "#D4A01733" }} />
      <div className="h-4 rounded-xl w-1/2 mx-auto" style={{ background: "#D4A01733" }} />
      <div className="h-4 rounded-xl w-2/3 mx-auto" style={{ background: "#D4A01733" }} />
    </div>
  );
}

export default function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = use(params);
  const router = useRouter();

  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Try to load order data from session storage (set by checkout page)
    try {
      const raw = sessionStorage.getItem(`vrajaspice_order_${orderId}`);
      if (raw) {
        setOrder(JSON.parse(raw));
        setLoading(false);
        return;
      }
    } catch {}

    // If not in session storage, fetch from API
    async function fetchOrder() {
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        if (!res.ok) throw new Error("Order not found.");
        const data = await res.json();
        setOrder(data);
      } catch {
        setError("We could not load your order details.");
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [orderId]);

  // Estimated delivery date (7-10 business days from now)
  const estimatedDelivery = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 10);
    return d.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  })();

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "#F5EDD8" }}
      >
        <div className="max-w-md w-full">
          <SkeletonCard />
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4 px-4"
        style={{ background: "#F5EDD8" }}
      >
        <div className="text-5xl">😕</div>
        <h2
          className="text-2xl font-bold text-center"
          style={{ fontFamily: "var(--font-serif)", color: "#2C1810" }}
        >
          {error || "Order not found"}
        </h2>
        <p className="text-sm text-center max-w-xs" style={{ color: "#8B4513" }}>
          If you believe this is a mistake, please contact our support team.
        </p>
        <Link
          href="/shop"
          className="px-6 py-3 rounded-full font-semibold text-sm mt-2"
          style={{ background: "#8B1A1A", color: "#F5EDD8" }}
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const isCOD = order.paymentMethod === "cod";
  const whatsappMsg = buildWhatsAppMessage(order);

  return (
    <div className="min-h-screen" style={{ background: "#F5EDD8" }}>
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* ── Success header ──────────────────────────────────────────────── */}
        <div className="text-center mb-8">
          <AnimatedCheckmark />

          <div className="fade-up-1">
            <h1
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{ fontFamily: "var(--font-serif)", color: "#2C1810" }}
            >
              Order Placed! 🎊
            </h1>
            <p className="text-base" style={{ color: "#8B4513" }}>
              Thank you,{" "}
              <strong style={{ color: "#8B1A1A" }}>{order.customerName}</strong>!
              Your spices are on their way.
            </p>
          </div>
        </div>

        {/* ── Order number card ────────────────────────────────────────────── */}
        <div
          className="rounded-2xl p-5 mb-5 text-center fade-up-2"
          style={{ background: "#FAF3E4", border: "1px solid #D4A01744" }}
        >
          <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#8B4513" }}>
            Order Number
          </p>
          <p
            className="text-2xl font-bold"
            style={{ fontFamily: "var(--font-serif)", color: "#8B1A1A" }}
          >
            {order.orderNumber}
          </p>
          <p className="text-xs mt-2" style={{ color: "#8B4513" }}>
            A confirmation has been sent to{" "}
            <strong style={{ color: "#2C1810" }}>{order.email}</strong>
          </p>
        </div>

        {/* ── Delivery info ────────────────────────────────────────────────── */}
        <div
          className="rounded-2xl p-5 mb-5 fade-up-2 flex items-start gap-4"
          style={{ background: "#22c55e12", border: "1px solid #22c55e33" }}
        >
          <span className="text-3xl mt-0.5">🚚</span>
          <div>
            <p className="font-semibold text-sm mb-1" style={{ color: "#166534" }}>
              Estimated Delivery
            </p>
            <p className="text-sm font-bold" style={{ color: "#2C1810" }}>
              {estimatedDelivery}
            </p>
            <p className="text-xs mt-1" style={{ color: "#8B4513" }}>
              7–10 business days · Shipped via trusted courier partners
            </p>
          </div>
        </div>

        {/* ── Order items ──────────────────────────────────────────────────── */}
        <div
          className="rounded-2xl p-5 mb-5 fade-up-3"
          style={{ background: "#FAF3E4", border: "1px solid #D4A01744" }}
        >
          <h2
            className="text-base font-bold mb-4"
            style={{ fontFamily: "var(--font-serif)", color: "#2C1810" }}
          >
            Your Order
          </h2>

          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.productId} className="flex items-center gap-3">
                <div
                  className="relative rounded-xl overflow-hidden flex-shrink-0"
                  style={{ width: 56, height: 56, background: "#F5EDD8" }}
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.productName}
                    fill
                    sizes="56px"
                    className="object-contain p-1"
                  />
                  <span
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                    style={{ background: "#8B1A1A", color: "#F5EDD8" }}
                  >
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium" style={{ color: "#2C1810" }}>
                    {item.productName}
                  </p>
                  <p className="text-xs" style={{ color: "#8B4513" }}>
                    {item.weight}
                  </p>
                </div>
                <p className="text-sm font-semibold" style={{ color: "#8B1A1A" }}>
                  ₹{item.sellingPrice * item.quantity}
                </p>
              </div>
            ))}
          </div>

          <div
            className="border-t mt-4 pt-4 space-y-2 text-sm"
            style={{ borderColor: "#D4A01744" }}
          >
            <div className="flex justify-between" style={{ color: "#8B4513" }}>
              <span>Subtotal</span>
              <span>₹{order.subtotal}</span>
            </div>
            <div className="flex justify-between" style={{ color: "#8B4513" }}>
              <span>Shipping</span>
              {order.shipping === 0 ? (
                <span className="font-semibold" style={{ color: "#166534" }}>FREE</span>
              ) : (
                <span>₹{order.shipping}</span>
              )}
            </div>
            <div
              className="border-t pt-2 flex justify-between font-bold text-base"
              style={{ borderColor: "#D4A01744", color: "#2C1810" }}
            >
              <span>Total Paid</span>
              <span style={{ color: "#8B1A1A" }}>₹{order.total}</span>
            </div>
          </div>
        </div>

        {/* ── Payment method ───────────────────────────────────────────────── */}
        <div
          className="rounded-2xl p-5 mb-5 fade-up-3 flex items-center gap-3"
          style={{ background: "#FAF3E4", border: "1px solid #D4A01744" }}
        >
          <span className="text-2xl">{isCOD ? "💰" : "🔐"}</span>
          <div>
            <p className="text-xs uppercase tracking-wider mb-0.5" style={{ color: "#8B4513" }}>
              Payment Method
            </p>
            <p className="text-sm font-semibold" style={{ color: "#2C1810" }}>
              {PAYMENT_LABELS[order.paymentMethod] ?? order.paymentMethod}
            </p>
            {isCOD && (
              <p className="text-xs mt-0.5" style={{ color: "#8B4513" }}>
                Pay ₹{order.total} when your order is delivered.
              </p>
            )}
          </div>
        </div>

        {/* ── Shipping address ─────────────────────────────────────────────── */}
        <div
          className="rounded-2xl p-5 mb-5 fade-up-3"
          style={{ background: "#FAF3E4", border: "1px solid #D4A01744" }}
        >
          <p className="text-xs uppercase tracking-wider mb-2" style={{ color: "#8B4513" }}>
            Shipping To
          </p>
          <p className="text-sm font-semibold" style={{ color: "#2C1810" }}>
            {order.customerName}
          </p>
          <p className="text-sm mt-0.5" style={{ color: "#8B4513" }}>
            {order.shippingAddress.address1}
            {order.shippingAddress.address2
              ? `, ${order.shippingAddress.address2}`
              : ""}
          </p>
          <p className="text-sm" style={{ color: "#8B4513" }}>
            {order.shippingAddress.city}, {order.shippingAddress.state} –{" "}
            {order.shippingAddress.pinCode}
          </p>
        </div>

        {/* ── Action buttons ───────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-3 fade-up-4">
          {/* Share on WhatsApp */}
          <a
            href={`https://wa.me/?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "#25D366", color: "#ffffff" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Share on WhatsApp
          </a>

          {/* Continue Shopping */}
          <Link
            href="/shop"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #8B1A1A 0%, #E8721C 100%)",
              color: "#F5EDD8",
            }}
          >
            Continue Shopping →
          </Link>
        </div>

        {/* ── Support contact ──────────────────────────────────────────────── */}
        <div
          className="mt-8 rounded-2xl p-5 text-center fade-up-4"
          style={{ background: "#E8721C12", border: "1px solid #E8721C33" }}
        >
          <p className="text-sm font-semibold mb-1" style={{ color: "#2C1810" }}>
            Need Help?
          </p>
          <p className="text-xs" style={{ color: "#8B4513" }}>
            Reach us on WhatsApp at{" "}
            <a
              href="https://wa.me/919121552086"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline"
              style={{ color: "#8B1A1A" }}
            >
              +91 91215 52086
            </a>{" "}
            or email{" "}
            <a
              href="mailto:support@vrajaspice.in"
              className="font-semibold underline"
              style={{ color: "#8B1A1A" }}
            >
              support@vrajaspice.in
            </a>
          </p>
          <p className="text-xs mt-2" style={{ color: "#8B4513" }}>
            We&apos;re available Mon–Sat, 10 AM – 6 PM IST
          </p>
        </div>
      </div>
    </div>
  );
}
