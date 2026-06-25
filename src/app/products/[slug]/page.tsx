import { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { products as mockProducts, getProductBySlug, getRelatedProducts, mapDbRowToProduct, Product } from "@/lib/products";
import ProductDetailClient from "./ProductDetailClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { data, error } = await supabase
      .from("products")
      .select("name, short_description")
      .eq("slug", slug)
      .single();

    if (!error && data) {
      return {
        title: `${data.name} — Premium NONG Spice | Vrajaspice`,
        description: data.short_description || `Buy ${data.name} online. 100% No Onion No Garlic premium satvik blend.`,
      };
    }
  } catch (err) {
    console.error("Error generating metadata for product page:", err);
  }

  // Fallback to static meta
  const staticProduct = getProductBySlug(slug);
  if (staticProduct) {
    return {
      title: `${staticProduct.name} — Premium NONG Spice | Vrajaspice`,
      description: staticProduct.shortDescription,
    };
  }

  return {
    title: "Premium Satvik Spice | Vrajaspice",
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let product: Product | null = null;
  let related: Product[] = [];

  try {
    // 1. Fetch main product details
    const { data: dbProduct, error: productError } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .single();

    if (productError || !dbProduct) {
      console.warn(`Supabase product fetch failed for slug "${slug}". Using static fallback.`, productError);
      const staticProd = getProductBySlug(slug);
      if (staticProd) {
        product = staticProd;
      }
    } else {
      product = mapDbRowToProduct(dbProduct);
    }

    // 2. Fetch related products
    const { data: dbRelated, error: relatedError } = await supabase
      .from("products")
      .select("*")
      .neq("slug", slug)
      .limit(4);

    if (relatedError || !dbRelated || dbRelated.length === 0) {
      related = getRelatedProducts(slug, 4);
    } else {
      related = dbRelated.map(mapDbRowToProduct);
    }
  } catch (err) {
    console.error(`Error loading product page for slug "${slug}". Using mock fallbacks.`, err);
    product = getProductBySlug(slug) || null;
    related = getRelatedProducts(slug, 4);
  }

  if (!product) {
    return notFound();
  }

  return <ProductDetailClient initialProduct={product} initialRelated={related} />;
}
