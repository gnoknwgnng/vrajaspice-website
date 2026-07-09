"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Send, Bot, ChevronDown, Sparkles, ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

// ── Types ──────────────────────────────────────────────────────────────────
interface ProductCard {
  slug: string;
  name: string;
  shortDescription: string;
  imageUrl: string;
  sellingPrice: number;
  mrp: number;
  weight: string;
  badge: string | null;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  products?: ProductCard[];
}

// ── Helpers ────────────────────────────────────────────────────────────────
function parseTextContent(content: string) {
  const parts = content.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-[#8B1A1A] font-bold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

const WELCOME: Message = {
  role: "assistant",
  content: "Namaste! 🙏 I'm Vraja, your spice guide. Tell me what you're cooking today and I'll find the perfect masala for you!",
};

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919121552086";

// ── Mini Product Card inside chat ─────────────────────────────────────────
function ChatProductCard({ product }: { product: ProductCard }) {
  const { addItem, items, updateQuantity, removeItem } = useCart();
  const cartItem = items.find((i) => i.product.slug === product.slug);
  const qty = cartItem?.quantity ?? 0;

  // Build a minimal product object compatible with CartContext
  const cartProduct = {
    id: 0,
    slug: product.slug,
    name: product.name,
    shortDescription: product.shortDescription,
    description: "",
    ingredients: "",
    weight: product.weight,
    sellingPrice: product.sellingPrice,
    mrp: product.mrp,
    stockQuantity: 99,
    featured: false,
    badge: product.badge,
    imageUrl: product.imageUrl,
    category: "",
    benefits: [],
    usageSuggestions: [],
    faqs: [],
    isActive: true,
  };

  const discount = Math.round(((product.mrp - product.sellingPrice) / product.mrp) * 100);

  return (
    <div
      className="rounded-2xl overflow-hidden flex-shrink-0"
      style={{
        width: 160,
        background: "#FFFFFF",
        border: "1px solid #EDE0C4",
        boxShadow: "0 2px 12px rgba(44,24,16,0.10)",
      }}
    >
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block relative" style={{ height: 110 }}>
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="160px"
          className="object-contain p-2"
        />
        {discount > 0 && (
          <span
            className="absolute top-1.5 left-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white"
            style={{ background: "#E8721C" }}
          >
            {discount}% OFF
          </span>
        )}
      </Link>

      {/* Info */}
      <div className="px-2.5 py-2">
        <p className="text-[11px] font-bold text-[#2C1810] leading-tight line-clamp-2 mb-0.5">
          {product.name}
        </p>
        <p className="text-[9px] text-[#8B4513] mb-1.5">{product.weight}</p>
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-[#8B1A1A] font-bold text-sm">₹{product.sellingPrice}</span>
          {product.mrp > product.sellingPrice && (
            <span className="text-[#C4A88A] text-[10px] line-through">₹{product.mrp}</span>
          )}
        </div>

        {/* Add to Cart / Stepper */}
        {qty === 0 ? (
          <button
            onClick={() => {
              addItem(cartProduct);
              toast.success(`${product.name} added! 🌿`);
            }}
            className="w-full flex items-center justify-center gap-1 py-1.5 rounded-xl text-[11px] font-bold text-white transition-all active:scale-95"
            style={{ background: "linear-gradient(135deg, #8B1A1A, #E8721C)" }}
          >
            <ShoppingCart className="w-3 h-3" />
            Add to Cart
          </button>
        ) : (
          <div
            className="flex items-center rounded-xl overflow-hidden h-7"
            style={{ border: "1.5px solid #8B1A1A" }}
          >
            <button
              onClick={() => {
                if (qty <= 1) {
                  removeItem(product.slug);
                  toast.success(`${product.name} removed`);
                } else {
                  updateQuantity(product.slug, qty - 1);
                }
              }}
              className="flex-shrink-0 w-7 h-full flex items-center justify-center hover:bg-[#FEF2F2] transition-colors"
            >
              {qty <= 1 ? (
                <Trash2 className="w-3 h-3 text-[#8B1A1A]" />
              ) : (
                <Minus className="w-3 h-3 text-[#8B1A1A]" />
              )}
            </button>
            <span className="flex-1 text-center text-[11px] font-bold text-[#2C1810]">{qty}</span>
            <button
              onClick={() => updateQuantity(product.slug, qty + 1)}
              className="flex-shrink-0 w-7 h-full flex items-center justify-center bg-[#8B1A1A] hover:bg-[#6B1212] transition-colors"
            >
              <Plus className="w-3 h-3 text-white" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main ChatBot Component ─────────────────────────────────────────────────
export default function ChatBot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  if (pathname.startsWith("/admin")) return null;

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  useEffect(() => {
    const t = setTimeout(() => { if (!isOpen) setHasUnread(true); }, 6000);
    return () => clearTimeout(t);
  }, []);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Message = { role: "user", content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updated.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply ?? "Sorry, something went wrong. Please try again!",
          products: data.products ?? [],
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Oops! I couldn't connect. Please check your internet and try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const suggestions = ["I'm making a curry 🍛", "Noodles recipe 🍜", "Fasting day 🙏", "Biryani 🍚"];

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I need help choosing the right Vrajaspice product.")}`;

  return (
    <>
      {/* ── Floating Trigger Button ─────────────────────────────── */}
      <button
        onClick={() => { setIsOpen(true); setHasUnread(false); }}
        aria-label="Open spice assistant"
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3.5 rounded-full shadow-2xl transition-all duration-300 ${
          isOpen ? "opacity-0 pointer-events-none scale-75" : "opacity-100 scale-100"
        }`}
        style={{
          background: "linear-gradient(135deg, #8B1A1A 0%, #E8721C 100%)",
          boxShadow: "0 8px 32px rgba(139,26,26,0.45)",
        }}
      >
        <span className="absolute inset-0 rounded-full animate-ping opacity-20 bg-[#E8721C]" />
        <Bot className="w-5 h-5 text-white flex-shrink-0" />
        <span className="text-white font-semibold text-sm whitespace-nowrap hidden sm:block">
          Spice Assistant
        </span>
        {hasUnread && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white animate-pulse" />
        )}
      </button>

      {/* ── Chat Window ─────────────────────────────────────────── */}
      <div
        className={`fixed z-50 flex flex-col overflow-hidden shadow-2xl transition-all duration-300 origin-bottom-right ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
        }`}
        style={{
          /* Full-screen on mobile, fixed size on desktop */
          bottom: "24px",
          right: "24px",
          width: "min(400px, calc(100vw - 24px))",
          height: "min(620px, calc(100dvh - 80px))",
          borderRadius: "20px",
          border: "1px solid rgba(212,160,23,0.25)",
          boxShadow: "0 24px 80px rgba(44,24,16,0.28)",
        }}
      >
        {/* ── Header ──────────────────────────────────────── */}
        <div
          className="flex items-center justify-between px-4 py-3 flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #8B1A1A 0%, #B84A0A 100%)" }}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[#8B1A1A]" />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">Vraja AI</p>
              <p className="text-white/70 text-[11px]">Spice Assistant · Online</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* WhatsApp button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[11px] font-bold transition-all hover:scale-105 active:scale-95"
              style={{ background: "#25D366", color: "white" }}
              title="Chat on WhatsApp"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>

            {/* Reset */}
            <button
              onClick={() => setMessages([WELCOME])}
              className="w-7 h-7 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/20 transition-all text-sm font-bold"
              title="Clear chat"
            >
              ↺
            </button>

            {/* Close */}
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/20 transition-all"
              aria-label="Close chat"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Messages ─────────────────────────────────────── */}
        <div
          className="flex-1 overflow-y-auto px-3 py-4 space-y-4"
          style={{
            background: "#EBE5DC",   /* WhatsApp-like background */
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4A017' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        >
          {messages.map((msg, idx) => (
            <div key={idx}>
              {/* Text bubble */}
              <div className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                {msg.role === "assistant" && (
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mb-0.5 shadow-md"
                    style={{ background: "linear-gradient(135deg, #8B1A1A, #E8721C)" }}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[78%] px-3.5 py-2.5 text-sm leading-relaxed shadow-sm relative ${
                    msg.role === "user"
                      ? "rounded-[18px] rounded-tr-sm text-white"
                      : "rounded-[18px] rounded-tl-sm text-[#2C1810]"
                  }`}
                  style={
                    msg.role === "user"
                      ? { background: "#DCF8C6" /* WhatsApp sent green */, color: "#1a3a1a" }
                      : { background: "#FFFFFF" }
                  }
                >
                  <p className="whitespace-pre-wrap text-[13px]">{parseTextContent(msg.content)}</p>
                  {/* Timestamp — suppress during SSR to avoid hydration mismatch */}
                  <p className={`text-[10px] mt-1 text-right ${msg.role === "user" ? "text-[#4A7C59]" : "text-[#C4A88A]"}`}
                     suppressHydrationWarning>
                    {typeof window !== "undefined"
                      ? new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
                      : ""}
                  </p>
                </div>
              </div>

              {/* Product cards row (below assistant message) */}
              {msg.role === "assistant" && msg.products && msg.products.length > 0 && (
                <div className="mt-2 ml-9 flex gap-2.5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
                  {msg.products.map((p) => (
                    <ChatProductCard key={p.slug} product={p} />
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {isLoading && (
            <div className="flex items-end gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 shadow-md"
                style={{ background: "linear-gradient(135deg, #8B1A1A, #E8721C)" }}
              >
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="px-4 py-3 rounded-[18px] rounded-tl-sm bg-white shadow-sm">
                <div className="flex gap-1 items-center">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{ background: "#8B1A1A", opacity: 0.6, animationDelay: `${i * 0.18}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick suggestions — only on fresh chat */}
        {messages.length <= 1 && (
          <div
            className="px-3 py-2 flex gap-2 overflow-x-auto flex-shrink-0"
            style={{ background: "#F0E8DC", borderTop: "1px solid #DDD0BB", scrollbarWidth: "none" }}
          >
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setInput(s.replace(/ [^\w\s]/g, "").trim());
                  setTimeout(() => inputRef.current?.focus(), 50);
                }}
                className="whitespace-nowrap text-[12px] font-medium px-3 py-1.5 rounded-full border flex-shrink-0 transition-all hover:scale-105 active:scale-95"
                style={{ border: "1.5px solid #C4A88A", color: "#6B3A1A", background: "#FFF8EE" }}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* ── Input Bar ───────────────────────────────────── */}
        <div
          className="flex items-center gap-2 px-3 py-2.5 flex-shrink-0"
          style={{ background: "#F0E8DC", borderTop: "1px solid #DDD0BB" }}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message…"
            disabled={isLoading}
            className="flex-1 text-[#2C1810] text-[13px] rounded-2xl px-4 py-2.5 outline-none placeholder:text-[#B0906A] disabled:opacity-50"
            style={{ background: "#FFFFFF", border: "1px solid #DDD0BB" }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-110 active:scale-95"
            style={{ background: "#25D366" /* WhatsApp send green */ }}
            aria-label="Send"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </>
  );
}
