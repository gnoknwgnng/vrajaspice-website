import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { products as mockProducts, getFeaturedProducts, Product, mapDbRowToProduct } from "@/lib/products";
import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/ui/ProductCard";
import HeroSection from "@/components/home/HeroSection";
import WhyVrajaspice from "@/components/home/WhyVrajaspice";
import ComparisonTable from "@/components/home/ComparisonTable";
import Testimonials from "@/components/home/Testimonials";
import OurStory from "@/components/home/OurStory";
import NewsletterSignup from "@/components/home/NewsletterSignup";
import FAQPreview from "@/components/home/FAQPreview";
import FinalCTA from "@/components/home/FinalCTA";

import FeaturedProductsGrid from "@/components/home/FeaturedProductsGrid";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Vrajaspice — Premium No Onion No Garlic Spices | Spice With Soul",
  description:
    "Shop premium NONG spice blends for satvik cooking. Kitchen King Masala, Garam Masala, Biryani Masala and more. No Onion. No Garlic. No Compromise. Made in India.",
};

export default async function HomePage() {
  let featured: Product[] = [];

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .order('id', { ascending: true });

    if (error || !data || data.length === 0) {
      featured = mockProducts.filter(p => p.featured);
    } else {
      featured = data
        .map(mapDbRowToProduct)
        .filter((p) => p.isActive !== false);
    }
  } catch (err) {
    console.error("Error fetching featured products from Supabase:", err);
    featured = mockProducts.filter(p => p.featured);
  }

  return (
    <>
      <HeroSection />
      <WhyVrajaspice />

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-[#F5EDD8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <p className="text-[#E8721C] text-sm font-semibold tracking-[0.2em] uppercase mb-3">
              Our Collection
            </p>
            <h2 className="font-serif font-bold text-[#2C1810] text-3xl md:text-4xl mb-4">
              Featured Products
            </h2>
            <p className="text-[#6B4E37] max-w-xl mx-auto text-base">
              Small-batch crafted spice blends — pure, authentic, and free from
              onion, garlic, and artificial additives.
            </p>
          </div>

          <FeaturedProductsGrid initialProducts={featured} />

          <div className="text-center mt-10">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#2C1810] text-[#F5EDD8] px-8 py-4 rounded-xl font-bold text-base hover:bg-[#8B1A1A] transition-colors duration-300"
            >
              View All 10 Products →
            </Link>
          </div>
        </div>
      </section>

      <ComparisonTable />
      <Testimonials />
      <OurStory />
      <NewsletterSignup />
      <FAQPreview />
      <FinalCTA />
    </>
  );
}
