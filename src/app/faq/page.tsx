import type { Metadata } from "next";
import FaqAccordion from "./FaqAccordion";

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions",
  description:
    "Find answers to common questions about Vrajaspice NONG spices — satvik suitability, ingredients, ordering, shipping, freshness, and storage.",
};

function BrushStroke({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4,18 Q60,4 120,14 Q180,24 240,10 Q300,0 360,16 Q390,22 416,12"
        stroke="#E8721C"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M30,22 Q90,10 150,20 Q210,28 270,15 Q330,4 400,18"
        stroke="#D4A017"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.45"
      />
    </svg>
  );
}

export const faqCategories = [
  {
    category: "About NONG",
    icon: "🌿",
    faqs: [
      {
        q: "What does NONG mean?",
        a: "NONG stands for No Onion No Garlic. It refers to food products crafted without these two ingredients, which are commonly avoided in satvik, Jain, and ISKCON-inspired cooking traditions.",
      },
      {
        q: "Why would someone avoid onion and garlic?",
        a: "Many communities — including Vaishnavs, ISKCON devotees, Jain families, and those following a satvik diet — avoid onion and garlic for spiritual, religious, or health reasons. Ayurveda classifies these as rajasic and tamasic foods that can disturb mental clarity and spiritual practice.",
      },
      {
        q: "Are Vrajaspice products certified NONG?",
        a: "Yes. Every Vrajaspice product is formulated, manufactured, and quality-checked to be entirely free of onion and garlic — including powders, extracts, and derivatives. Our dedicated manufacturing facility is 100% No Onion No Garlic, ensuring zero risk of cross-contamination.",
      },
      {
        q: "Do your products contain any animal-derived ingredients?",
        a: "No. All Vrajaspice products are 100% plant-based and vegetarian. We do not use any animal-derived flavours, colours, or additives.",
      },
    ],
  },
  {
    category: "Satvik & Religious Suitability",
    icon: "🔱",
    faqs: [
      {
        q: "Are Vrajaspice blends suitable for ISKCON devotees?",
        a: "Yes. Our blends contain no onion, no garlic, no meat-based ingredients, and no tamasic additives. They are designed to align with ISKCON dietary standards for prasadam cooking.",
      },
      {
        q: "Can Jain consumers use Vrajaspice products?",
        a: "Vrajaspice products do not contain onion, garlic, potatoes, carrots, beetroot, or other root vegetables in the spice blends themselves. However, we recommend checking the specific product label for your exact dietary requirements.",
      },
      {
        q: "Are these blends considered satvik?",
        a: "Our blends are formulated in the spirit of satvik cooking — free from onion, garlic, and any stimulating or tamasic ingredients. They are intended for use in satvik cuisine but are not formally certified by a religious body.",
      },
      {
        q: "Can I use these spices for temple or puja prasad cooking?",
        a: "Absolutely. Many of our customers use Vrajaspice blends specifically for temple cooking and prasad preparation. The purity of our ingredients makes them well-suited for devotional culinary use.",
      },
    ],
  },
  {
    category: "Products & Ingredients",
    icon: "🫙",
    faqs: [
      {
        q: "Do your products contain preservatives or artificial colours?",
        a: "No. Vrajaspice products are free from artificial preservatives, synthetic colours, and added MSG. We rely on the natural properties of spices to maintain freshness and flavour.",
      },
      {
        q: "What is the shelf life of Vrajaspice spice blends?",
        a: "When stored properly in a cool, dry place away from sunlight and moisture, Vrajaspice spice blends have a shelf life of 12–18 months from the date of manufacture. The best-before date is printed on each package.",
      },
      {
        q: "Are your spices irradiated or chemically treated?",
        a: "No. We do not use irradiation or chemical fumigants. Our spices undergo steam sterilisation where required to meet food safety standards, preserving aroma and colour integrity.",
      },
      {
        q: "Where do you source your spices from?",
        a: "We source our spices from reputed farming regions across India — chillies from Guntur, turmeric from Salem, coriander from Rajasthan, and more. We partner with farmers who share our commitment to quality.",
      },
      {
        q: "Are Vrajaspice products gluten-free?",
        a: "Most of our spice blends are naturally gluten-free. However, some blends may be processed in facilities that handle gluten-containing products. Please check the product label or contact us if you have a severe gluten intolerance.",
      },
    ],
  },
  {
    category: "Ordering & Shipping",
    icon: "📦",
    faqs: [
      {
        q: "How do I place an order?",
        a: "Simply browse our products, add items to your cart, and proceed to checkout. We accept UPI, credit/debit cards, and net banking across India.",
      },
      {
        q: "What is the minimum order value?",
        a: "There is no minimum order value. You can order as little as one product. However, free shipping is available on orders above ₹499.",
      },
      {
        q: "Do you ship internationally?",
        a: "Currently, we only ship within India. We are working on international shipping and hope to serve the global Indian diaspora soon. Stay tuned to our website and social media for updates.",
      },
      {
        q: "How long does delivery take?",
        a: "Orders are typically delivered within 3–5 business days across India. Remote areas or those with limited courier access may take an additional 1–2 days. You will receive a tracking link once your order is dispatched.",
      },
    ],
  },
  {
    category: "Freshness & Storage",
    icon: "✨",
    faqs: [
      {
        q: "How should I store my Vrajaspice spices?",
        a: "Store your spice blends in a cool, dry place away from direct sunlight, heat, and moisture. We recommend transferring the contents to an airtight glass jar after opening to maximise freshness and aroma.",
      },
      {
        q: "Can I refrigerate my spices?",
        a: "Refrigeration is generally not recommended for dried spice blends as the humidity inside a refrigerator can cause clumping and reduce aroma potency. Room temperature storage in an airtight container is ideal.",
      },
      {
        q: "What makes Vrajaspice fresher than supermarket spices?",
        a: "Unlike mass-produced spices that may sit in warehouses for months, Vrajaspice produces in small batches and ships directly to customers. This shorter supply chain means the spices you receive are significantly fresher and more aromatic.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-[#F5EDD8]">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 px-6 bg-[#F5EDD8] parchment-texture">
        <svg
          className="absolute top-0 left-0 w-80 h-80 opacity-[0.05] -translate-x-20 -translate-y-10"
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          <circle cx="100" cy="100" r="90" fill="#8B1A1A" />
        </svg>
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-[#E8721C] font-sans text-sm font-semibold tracking-[0.25em] uppercase mb-4">
            Got Questions?
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#2C1810] mb-4">
            Frequently Asked Questions
          </h1>
          <BrushStroke className="w-64 mx-auto mb-6" />
          <p className="text-[#4A2A1A] text-lg max-w-xl mx-auto">
            Everything you need to know about Vrajaspice, our NONG spice blends, and how we work.
            Can&apos;t find your answer? We&apos;re just a WhatsApp away.
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <FaqAccordion categories={faqCategories} />
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-16 px-6 bg-[#2C1810]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-[#25D366] flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
          <h2 className="font-serif text-3xl font-bold text-[#F5EDD8] mb-4">
            Still have questions?
          </h2>
          <p className="text-[#EDE0C4] text-base mb-8 max-w-md mx-auto">
            Our team is happy to help. Chat with us on WhatsApp for a quick and friendly response.
          </p>
          <a
            href="https://wa.me/919121552086?text=Hi%20Vrajaspice%2C%20I%20have%20a%20question!"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] text-white font-sans font-semibold px-8 py-4 rounded-full hover:bg-[#1ebe5d] transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Ask on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
