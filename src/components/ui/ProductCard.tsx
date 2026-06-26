"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Zap } from "lucide-react";
import { Product, getDiscountPercent } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const badgeColors: Record<string, string> = {
  "Best Seller": "bg-[#8B1A1A] text-[#F5EDD8]",
  "Premium Blend": "bg-[#8B4513] text-[#F5EDD8]",
  "Satvik Friendly": "bg-[#4A7C59] text-white",
  "No Onion No Garlic": "bg-[#2C1810] text-[#D4A017]",
  "Launch Special": "bg-[#D4A017] text-[#2C1810]",
  "Small Batch": "bg-[#6B4E37] text-[#F5EDD8]",
};

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addItem } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const discount = getDiscountPercent(product.sellingPrice, product.mrp);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast.error("Please login to add items to your cart! 🌿");
      router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }
    addItem(product);
    toast.success(`${product.name} added to cart! 🌿`);
  };

  return (
    <div className="group relative bg-white/60 rounded-2xl overflow-hidden border border-[#EDE0C4] hover:border-[#E8721C]/40 hover:shadow-[0_8px_40px_rgba(139,26,26,0.12)] transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-[#EDE0C4]">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-[#2C1810]/0 group-hover:bg-[#2C1810]/10 transition-all duration-300" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.badge && (
              <span
                className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                  badgeColors[product.badge] ?? "bg-[#8B1A1A] text-[#F5EDD8]"
                }`}
              >
                {product.badge}
              </span>
            )}
            {discount > 0 && (
              <span className="text-[10px] font-bold bg-[#E8721C] text-white px-2.5 py-1 rounded-full">
                {discount}% OFF
              </span>
            )}
          </div>

          {/* Quick Buy overlay on hover */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <button
              onClick={handleAddToCart}
              className="w-full bg-[#8B1A1A]/90 backdrop-blur-sm text-[#F5EDD8] py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#8B1A1A] transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              Quick Add
            </button>
          </div>
        </div>
      </Link>

      {/* Details */}
      <div className="p-4">
        {/* Weight tag */}
        <span className="text-[10px] font-medium text-[#8B4513] bg-[#EDE0C4] px-2 py-0.5 rounded-full">
          {product.weight}
        </span>

        {/* Name */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-serif font-bold text-[#2C1810] text-base mt-2 mb-1 leading-tight hover:text-[#8B1A1A] transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-[#6B4E37] text-xs leading-relaxed mb-3 line-clamp-2">
          {product.shortDescription}
        </p>

        {/* NONG badge */}
        <div className="flex flex-wrap items-center gap-1 mb-3">
          <span className="text-[9px] font-semibold text-[#4A7C59] bg-[#E8F5E9] px-2 py-0.5 rounded-full border border-[#4A7C59]/20 whitespace-nowrap">
            🌿 NONG
          </span>
          <span className="text-[9px] font-semibold text-[#4A7C59] bg-[#E8F5E9] px-2 py-0.5 rounded-full border border-[#4A7C59]/20 whitespace-nowrap">
            No Preservatives
          </span>
        </div>

        {/* Price */}
        <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5 mb-4">
          <span className="font-bold text-[#8B1A1A] text-lg sm:text-xl">
            ₹{product.sellingPrice}
          </span>
          <span className="text-[#C4A88A] text-xs sm:text-sm line-through">
            ₹{product.mrp}
          </span>
          <span className="text-[9px] sm:text-[10px] font-bold text-[#E8721C] whitespace-nowrap">
            Save ₹{product.mrp - product.sellingPrice}
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 items-center">
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-1.5 bg-[#8B1A1A] text-[#F5EDD8] h-10 rounded-xl font-semibold text-xs sm:text-sm hover:bg-[#6B1212] transition-colors"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
          <Link
            href={`/products/${product.slug}`}
            className="hidden sm:flex items-center justify-center bg-[#EDE0C4] text-[#2C1810] w-10 h-10 rounded-xl font-semibold text-sm hover:bg-[#E5D5A8] transition-colors"
            title="View Details"
          >
            <Zap className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
