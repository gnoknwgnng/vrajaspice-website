"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

export default function CartDrawer() {
  const pathname = usePathname();
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, shippingCharge, total, totalItems } =
    useCart();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleRemove = (slug: string, name: string) => {
    removeItem(slug);
    toast.success(`${name} removed from cart`);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#F5EDD8] z-50 shadow-2xl transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#EDE0C4]">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-[#8B1A1A]" />
            <h2 className="font-serif font-bold text-[#2C1810] text-xl">
              Your Cart
              {totalItems > 0 && (
                <span className="ml-2 text-sm font-sans font-normal text-[#8B4513]">
                  ({totalItems} {totalItems === 1 ? "item" : "items"})
                </span>
              )}
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#EDE0C4] transition-colors"
            aria-label="Close cart"
          >
            <X className="w-4 h-4 text-[#4A2A1A]" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="w-20 h-20 rounded-full bg-[#EDE0C4] flex items-center justify-center mb-4">
                <ShoppingBag className="w-10 h-10 text-[#C4A88A]" />
              </div>
              <h3 className="font-serif font-semibold text-[#2C1810] text-xl mb-2">
                Your cart is empty
              </h3>
              <p className="text-[#8B4513] text-sm mb-6">
                Explore our premium spice blends
              </p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="inline-flex items-center gap-2 bg-[#8B1A1A] text-[#F5EDD8] px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#6B1212] transition-colors"
              >
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.slug}
                className="flex gap-4 bg-white/50 rounded-xl p-4 border border-[#EDE0C4]"
              >
                {/* Image */}
                <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-[#EDE0C4]">
                  <Image
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-[#2C1810] text-sm leading-tight mb-1 line-clamp-2">
                    {item.product.name}
                  </h4>
                  <p className="text-xs text-[#8B4513] mb-2">{item.product.weight}</p>
                  <div className="flex items-center justify-between">
                    {/* Qty Controls */}
                    <div className="flex items-center gap-2 bg-[#EDE0C4] rounded-lg px-1">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.slug, item.quantity - 1)
                        }
                        className="w-7 h-7 flex items-center justify-center hover:text-[#8B1A1A] transition-colors"
                        aria-label="Decrease"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-5 text-center font-semibold text-sm text-[#2C1810]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.slug, item.quantity + 1)
                        }
                        className="w-7 h-7 flex items-center justify-center hover:text-[#8B1A1A] transition-colors"
                        aria-label="Increase"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <div className="font-bold text-[#8B1A1A] text-sm">
                        ₹{item.product.sellingPrice * item.quantity}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => handleRemove(item.product.slug, item.product.name)}
                  className="w-7 h-7 flex items-center justify-center text-[#C4A88A] hover:text-[#8B1A1A] transition-colors flex-shrink-0"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-[#EDE0C4] bg-[#F5EDD8] space-y-3">
            {/* Shipping note */}
            {shippingCharge > 0 && (
              <div className="flex items-center gap-2 bg-[#FFF8E8] border border-[#D4A017]/30 rounded-lg px-4 py-2.5 text-xs text-[#8B4513]">
                <span>🚚</span>
                Add ₹{499 - subtotal} more for FREE shipping!
              </div>
            )}

            {/* Subtotal */}
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-[#4A2A1A]">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-[#4A2A1A]">
                <span>Shipping</span>
                <span className={shippingCharge === 0 ? "text-green-600 font-medium" : ""}>
                  {shippingCharge === 0 ? "FREE" : `₹${shippingCharge}`}
                </span>
              </div>
              <div className="flex justify-between font-bold text-base text-[#2C1810] border-t border-[#EDE0C4] pt-2">
                <span>Total</span>
                <span className="text-[#8B1A1A]">₹{total}</span>
              </div>
            </div>

            {/* Trust */}
            <p className="text-center text-xs text-[#8B4513]">
              🔒 Secure checkout &nbsp;|&nbsp; 100% NONG Certified
            </p>

            {/* Buttons */}
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full bg-[#8B1A1A] text-[#F5EDD8] text-center py-4 rounded-xl font-bold text-base hover:bg-[#6B1212] transition-colors"
            >
              Proceed to Checkout
            </Link>
            <Link
              href="/cart"
              onClick={closeCart}
              className="block w-full text-center py-3 text-sm text-[#8B1A1A] font-medium hover:underline"
            >
              View Full Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
