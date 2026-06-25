"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQCategory {
  category: string;
  icon: string;
  faqs: FAQItem[];
}

interface FaqAccordionProps {
  categories: FAQCategory[];
}

export default function FaqAccordion({ categories }: FaqAccordionProps) {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const activeCategory = categories[activeCategoryIndex];

  const handleCategoryChange = (index: number) => {
    setActiveCategoryIndex(index);
    setOpenFaqIndex(null); // Reset open questions when changing categories
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Category selector tabs */}
      <div className="flex flex-nowrap md:flex-wrap overflow-x-auto pb-4 md:pb-0 gap-2 border-b border-[#E6D7B8] scrollbar-none">
        {categories.map((cat, idx) => {
          const isActive = idx === activeCategoryIndex;
          return (
            <button
              key={cat.category}
              onClick={() => handleCategoryChange(idx)}
              className={`flex items-center gap-2 px-5 py-3 rounded-t-lg font-medium text-sm transition-all duration-300 whitespace-nowrap border-b-2 ${
                isActive
                  ? "bg-[#2C1810] text-[#F5EDD8] border-[#E8721C] shadow-sm"
                  : "bg-transparent text-[#5C3A21] border-transparent hover:bg-[#EDE0C4] hover:text-[#2C1810]"
              }`}
            >
              <span className="text-lg" role="img" aria-label={cat.category}>
                {cat.icon}
              </span>
              <span>{cat.category}</span>
            </button>
          );
        })}
      </div>

      {/* FAQs List */}
      <div className="space-y-4">
        {activeCategory.faqs.map((faq, idx) => {
          const isOpen = openFaqIndex === idx;
          return (
            <div
              key={idx}
              className="border border-[#E6D7B8] bg-[#FAF6EB] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:border-[#D4A017]"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-center justify-between text-left p-5 focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className="font-serif text-lg md:text-xl font-semibold text-[#2C1810] pr-4">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#8B1A1A] flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="px-5 pb-5 pt-1 text-[#4A2A1A] text-base leading-relaxed border-t border-[#F2E7CD]">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
