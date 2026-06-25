import { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import { products as mockProducts, mapDbRowToProduct, Product } from "@/lib/products";
import ShopClient from "./ShopClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shop Premium Satvik NONG Spices | Vrajaspice",
  description: "Browse our collection of 100% No Onion No Garlic spice blends. Small-batch, natural, and preservative-free satvik masalas.",
};

export default async function ShopPage() {
  let productsList: Product[] = [];

  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: true });

    if (error || !data || data.length === 0) {
      console.warn("Supabase fetch failed or no products in Shop page. Using mock fallback.", error);
      productsList = mockProducts;
    } else {
      productsList = data.map(mapDbRowToProduct);
    }
  } catch (err) {
    console.error("Error loading products on Shop server component. Using mock fallback.", err);
    productsList = mockProducts;
  }

  return <ShopClient initialProducts={productsList} />;
}
