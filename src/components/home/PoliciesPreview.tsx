"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const policies = [
  {
    title: "Privacy Policy",
    content: (
      <div className="space-y-3 text-xs sm:text-sm">
        <p>At Vrajaspice, we value and respect your privacy. This policy outlines how we handle your personal information:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Information Collection:</strong> We collect only essential details required to process your orders, such as your name, email, phone number, and delivery address.</li>
          <li><strong>Data Security:</strong> All personal data is encrypted and stored securely. We do not store credit card details or payment credentials on our servers.</li>
          <li><strong>Third-Party Sharing:</strong> We never sell, rent, or trade your personal information. Information is shared only with trusted delivery partners to facilitate shipping.</li>
          <li><strong>Cookies:</strong> We use cookies to enhance your browsing experience, remember cart items, and analyze website traffic.</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Terms & Conditions",
    content: (
      <div className="space-y-3 text-xs sm:text-sm">
        <p>Welcome to Vrajaspice. By accessing and using our website, you agree to comply with the following terms:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Product Information:</strong> We make every effort to describe our handcrafted spice blends accurately. However, packaging and weight may vary slightly.</li>
          <li><strong>Order Acceptance:</strong> All orders placed on our website are subject to product availability and acceptance. We reserve the right to cancel orders for any reason.</li>
          <li><strong>Pricing:</strong> Prices for our products are subject to change without notice. All prices listed are in Indian Rupees (INR) and inclusive of taxes.</li>
          <li><strong>Intellectual Property:</strong> All content, images, logos, and recipes on this website are the property of Vrajaspice and protected by copyright laws.</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Shipping Policy",
    content: (
      <div className="space-y-3 text-xs sm:text-sm">
        <p>We want to ensure your pure satvik spices reach you as fresh as possible. Here is how our shipping works:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Processing Time:</strong> Orders are processed and packed in our dedicated No Onion No Garlic facility within 1–2 business days.</li>
          <li><strong>Shipping Charges:</strong> Free shipping is provided for all orders above ₹499. For orders under ₹499, a flat shipping charge of ₹49 is applied.</li>
          <li><strong>Delivery Timelines:</strong> We ship pan-India. Delivery typically takes 3–7 business days depending on your location (metro cities usually receive deliveries faster).</li>
          <li><strong>Tracking:</strong> A tracking number and link will be sent to your email and phone number as soon as the order is dispatched.</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Refund Policy",
    content: (
      <div className="space-y-3 text-xs sm:text-sm">
        <p>Because our spice blends are food items and perishable, we maintain the following refund and exchange guidelines:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>No Returns:</strong> Due to health, hygiene, and food safety standards, we cannot accept returns or exchanges on opened or unopened spice packs.</li>
          <li><strong>Damaged or Incorrect Items:</strong> If you receive a damaged jar, an incorrect spice blend, or a package with manufacturing defects, please contact us within 48 hours of delivery at support@vrajaspice.in.</li>
          <li><strong>Proof Required:</strong> Please share clear photos of the outer box, the invoice, and the damaged or incorrect items to help us verify your request.</li>
          <li><strong>Resolution:</strong> Upon verification, we will immediately arrange for a free replacement package or issue a full refund to your original payment method within 5–7 business days.</li>
        </ul>
      </div>
    ),
  },
];

export default function PoliciesPreview() {
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (!hash) return;

      let index = -1;
      if (hash === "#privacy-policy") index = 0;
      else if (hash === "#terms-and-conditions" || hash === "#terms") index = 1;
      else if (hash === "#shipping-policy") index = 2;
      else if (hash === "#refund-policy") index = 3;

      if (index !== -1) {
        setOpen(index);
        
        // Scroll to the policies section
        const element = document.getElementById("store-policies");
        if (element) {
          // Add a short delay to ensure rendering/hydration matches
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        }
      }
    };

    // Run on mount
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <section id="store-policies" className="py-16 md:py-24 bg-[#EDE0C4]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#E8721C] text-sm font-semibold tracking-[0.2em] uppercase mb-3">
            Terms & Policies
          </p>
          <h2 className="font-serif font-bold text-[#2C1810] text-3xl md:text-4xl mb-4">
            Our Store Policies
          </h2>
          <p className="text-[#6B4E37] text-base">
            Everything you need to know about shopping with Vrajaspice
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {policies.map((policy, i) => (
            <div
              key={i}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                open === i
                  ? "border-[#8B1A1A]/30 shadow-[0_4px_20px_rgba(139,26,26,0.08)]"
                  : "border-[#D4C4A0]"
              } bg-[#F5EDD8]`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
              >
                <span
                  className={`font-serif font-bold text-sm md:text-base leading-snug ${
                    open === i ? "text-[#8B1A1A]" : "text-[#2C1810]"
                  }`}
                >
                  {policy.title}
                </span>
                <span className="flex-shrink-0 text-[#8B4513]">
                  {open === i ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  open === i ? "max-h-[500px] border-t border-[#EDE0C4] pt-4" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-5 text-[#4A2A1A] leading-relaxed">
                  {policy.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
