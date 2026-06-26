"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Menu, X, Search, Phone, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQs" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const { totalItems, toggleCart } = useCart();
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      {/* Top bar */}
      <div className="bg-[#8B1A1A] text-[#F5EDD8] text-xs py-2 px-4 text-center font-medium tracking-wide">
        🌿 Free shipping on orders above ₹499 &nbsp;|&nbsp; 100% No Onion No Garlic &nbsp;|&nbsp; Made in India
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#F5EDD8]/95 backdrop-blur-md shadow-[0_2px_20px_rgba(44,24,16,0.12)]"
            : "bg-[#F5EDD8]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 md:w-12 md:h-12 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/logo.png"
                  alt="Vrajaspice"
                  fill
                  className="object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <div className="w-full h-full flex items-center justify-center bg-[#8B1A1A] rounded-full text-[#F5EDD8] font-serif font-bold text-xl absolute inset-0 opacity-0 peer-error:opacity-100">
                  V
                </div>
              </div>
              <div>
                <div className="font-logo font-bold text-2xl md:text-3xl leading-none tracking-tight flex items-center gap-0.5 lowercase">
                  <span className="text-[#C14420]">vraja</span>
                  <span className="text-[#4E7D22]">spice</span>
                </div>
                <div className="text-[#8B4513] text-[9px] tracking-[0.25em] uppercase font-medium mt-0.5 hidden sm:block">
                  Spice With Soul
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#2C1810] font-medium text-sm tracking-wide hover:text-[#E8721C] transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E8721C] transition-all duration-300 group-hover:w-full rounded-full" />
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3 md:gap-4">
              {/* WhatsApp */}
              <a
                href="https://wa.me/919121552086?text=Hi%20Vrajaspice%2C%20I%27d%20like%20to%20know%20more%20about%20your%20products!"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-1.5 bg-[#25D366] text-white text-xs font-semibold px-3 py-2 rounded-full hover:bg-[#20BD5D] transition-colors duration-200"
              >
                <Phone className="w-3.5 h-3.5" />
                WhatsApp Us
              </a>



              {/* User Account */}
              <Link
                href={user ? "/account" : "/login"}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#EDE0C4] transition-colors duration-200 text-[#4A2A1A]"
                aria-label="User account"
              >
                <User className="w-4.5 h-4.5" />
              </Link>

              {/* Cart */}
              <button
                onClick={toggleCart}
                className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#EDE0C4] transition-colors duration-200 text-[#4A2A1A]"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="w-4.5 h-4.5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#E8721C] text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center min-w-[18px] min-h-[18px] px-0.5">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#EDE0C4] transition-colors duration-200 text-[#4A2A1A]"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-80 border-t border-[#EDE0C4]" : "max-h-0"
          }`}
        >
          <nav className="px-4 py-4 space-y-1 bg-[#F5EDD8]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-[#2C1810] font-medium rounded-lg hover:bg-[#EDE0C4] hover:text-[#8B1A1A] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={user ? "/account" : "/login"}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 text-[#2C1810] font-medium rounded-lg hover:bg-[#EDE0C4] hover:text-[#8B1A1A] transition-colors duration-200"
            >
              {user ? "My Account" : "Sign In / Register"}
            </Link>
            <a
              href="https://wa.me/919121552086"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 text-[#25D366] font-semibold"
            >
              <Phone className="w-4 h-4" />
              WhatsApp Us
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}
