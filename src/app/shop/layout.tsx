import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All Spices — Premium NONG Masala Blends",
  description:
    "Browse all 10 premium No Onion No Garlic spice blends by Vrajaspice. Kitchen King Masala, Garam Masala, Biryani Masala, Sambar Masala and more — small-batch crafted, 100% pure, no preservatives.",
  openGraph: {
    title: "Shop Vrajaspice — Premium NONG Masala Blends",
    description:
      "Ten premium No Onion No Garlic spice blends for satvik, Jain, and ISKCON cooking. Free shipping above ₹499.",
    url: "https://vrajaspice.in/shop",
    images: [
      {
        url: "/hero.png",
        width: 1200,
        height: 630,
        alt: "Vrajaspice Shop — Premium Indian Spice Blends",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop Vrajaspice — Premium NONG Masala Blends",
    description:
      "Ten premium No Onion No Garlic spice blends for satvik cooking. Shop now.",
  },
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
