import type { Metadata } from "next";
import { Playfair_Display, Inter, Quicksand } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import { Toaster } from "react-hot-toast";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-logo",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Vrajaspice — Premium No Onion No Garlic Spices | Spice With Soul",
    template: "%s | Vrajaspice",
  },
  description:
    "Shop premium NONG (No Onion No Garlic) spice blends crafted for satvik cooking. Vrajaspice offers authentic Indian masalas — pure, handmade, and free from preservatives. Perfect for Jain, ISKCON, Vaishnav, and satvik households.",
  keywords: [
    "No Onion No Garlic Masala",
    "Satvik Masala",
    "Jain Masala",
    "ISKCON Friendly Spices",
    "Pure Indian Spices",
    "Premium Spice Blends",
    "NONG Masala",
    "Vaishnav Masala",
    "Vrajaspice",
    "Spice With Soul",
  ],
  authors: [{ name: "Vrajaspice" }],
  creator: "Vrajaspice",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://vrajaspice.in",
    siteName: "Vrajaspice",
    title: "Vrajaspice — Spice With Soul",
    description:
      "Premium No Onion No Garlic spice blends for satvik cooking. Small-batch crafted, 100% pure, Made in India.",
    images: [
      {
        url: "/hero.png",
        width: 1200,
        height: 630,
        alt: "Vrajaspice — Premium Indian Spice Blends",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vrajaspice — Spice With Soul",
    description: "Premium No Onion No Garlic spice blends for satvik cooking.",
    images: ["/hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${quicksand.variable}`}>
      <body className="min-h-screen bg-[#F5EDD8] text-[#2C1810] antialiased">
        <AuthProvider>
          <CartProvider>
            <Header />
            <CartDrawer />
            <main>{children}</main>
            <Footer />
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: "#2C1810",
                  color: "#F5EDD8",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  borderRadius: "8px",
                  border: "1px solid #8B4513",
                },
                success: {
                  iconTheme: { primary: "#E8721C", secondary: "#F5EDD8" },
                },
              }}
            />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
