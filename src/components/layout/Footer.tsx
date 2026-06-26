"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, Heart } from "lucide-react";

const footerLinks = {
  shop: [
    { href: "/shop", label: "All Products" },
    { href: "/shop?badge=Best+Seller", label: "Best Sellers" },
    { href: "/shop?badge=Satvik+Friendly", label: "Satvik Blends" },
    { href: "/shop?badge=Launch+Special", label: "Launch Specials" },
  ],
  company: [
    { href: "/about", label: "About Vrajaspice" },
    { href: "/faq", label: "FAQs" },
    { href: "/contact", label: "Contact Us" },
  ],
  policies: [
    { href: "/#privacy-policy", label: "Privacy Policy" },
    { href: "/#terms-and-conditions", label: "Terms & Conditions" },
    { href: "/#shipping-policy", label: "Shipping Policy" },
    { href: "/#refund-policy", label: "Refund Policy" },
  ],
};

const trustBadges = [
  "🌿 No Onion No Garlic Facility",
  "🇮🇳 Made in India",
  "✨ Small Batch Crafted",
  "🚫 No Preservatives",
  "🎨 No Artificial Colours",
  "🕊️ Satvik Friendly",
];

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-[#2C1810] text-[#EDE0C4]">
      {/* Trust Strip */}
      <div className="border-b border-[#4A2A1A] overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap py-3">
          {[...trustBadges, ...trustBadges].map((badge, i) => (
            <span
              key={i}
              className="inline-block mx-8 text-sm font-medium text-[#D4A017]"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <div className="font-logo font-bold text-3xl leading-none tracking-tight flex items-center gap-0.5 lowercase">
                <span className="text-[#C14420]">vraja</span>
                <span className="text-[#4E7D22]">spice</span>
              </div>
              <div className="text-[#D4A017] text-xs tracking-[0.25em] uppercase mt-1">
                Spice With Soul
              </div>
            </div>
            <p className="text-[#C4A88A] text-sm leading-relaxed mb-6 max-w-xs">
              Premium No Onion No Garlic spice blends crafted for satvik cooking.
              Pure ingredients. Authentic flavour. Small-batch made in India.
            </p>
            {/* Contact */}
            <div className="space-y-2 mb-6">
              <a
                href="https://wa.me/919121552086"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#C4A88A] hover:text-[#25D366] transition-colors"
              >
                <Phone className="w-4 h-4" />
                +91 91215 52086
              </a>
              <a
                href="mailto:vrajaspice@gmail.com"
                className="flex items-center gap-2 text-sm text-[#C4A88A] hover:text-[#E8721C] transition-colors"
              >
                <Mail className="w-4 h-4" />
                vrajaspice@gmail.com
              </a>
              <div className="flex items-center gap-2 text-sm text-[#C4A88A]">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                Made in India 🇮🇳
              </div>
            </div>
            {/* Socials */}
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Youtube, href: "#", label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-[#4A2A1A] text-[#C4A88A] hover:bg-[#E8721C] hover:text-white hover:border-[#E8721C] transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-serif font-semibold text-[#F5EDD8] mb-4 text-lg">
              Shop
            </h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#C4A88A] hover:text-[#E8721C] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-serif font-semibold text-[#F5EDD8] mb-4 text-lg">
              Company
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#C4A88A] hover:text-[#E8721C] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-serif font-semibold text-[#F5EDD8] mb-4 text-lg">
              Policies
            </h4>
            <ul className="space-y-2">
              {footerLinks.policies.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    scroll={false}
                    className="text-sm text-[#C4A88A] hover:text-[#E8721C] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-[#4A2A1A] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#C4A88A] text-sm text-center md:text-left">
            © {new Date().getFullYear()} Vrajaspice. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-[#C4A88A] text-sm">
            Made with <Heart className="w-3.5 h-3.5 text-[#8B1A1A] fill-current" /> in India
          </p>
          <div className="flex items-center gap-2 text-xs text-[#8A6A50]">
            <span className="px-2 py-1 border border-[#4A2A1A] rounded">🔒 Secure Payments</span>
            <span className="px-2 py-1 border border-[#4A2A1A] rounded">⚡ Fast Delivery</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </footer>
  );
}
