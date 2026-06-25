import type { Metadata } from "next";
import { products, getProductBySlug } from "@/lib/products";

/* ─── generateStaticParams ───────────────────────────────────────────── */
// Lives here (server component) because page.tsx is 'use client'
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} — Premium NONG Masala`,
    description: product.shortDescription + `. Buy ${product.name} (${product.weight}) at ₹${product.sellingPrice}. No Onion No Garlic, no preservatives, small-batch crafted by Vrajaspice.`,
    openGraph: {
      title: `${product.name} | Vrajaspice`,
      description: product.shortDescription,
      url: `https://vrajaspice.in/products/${product.slug}`,
      images: [
        {
          url: product.imageUrl,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Vrajaspice`,
      description: product.shortDescription,
      images: [product.imageUrl],
    },
    alternates: {
      canonical: `https://vrajaspice.in/products/${product.slug}`,
    },
  };
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
