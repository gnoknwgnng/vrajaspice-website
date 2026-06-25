# Vrajaspice — D2C E-Commerce Website

## 🌿 About
Premium D2C e-commerce website for **Vrajaspice** — an Indian spice brand offering authentic No Onion No Garlic (NONG) spice blends for satvik cooking.

**Tech Stack:** Next.js 14 + TypeScript + Tailwind CSS + Supabase + Razorpay

---

## 🚀 Quick Start (Local Development)

```bash
# Install dependencies
npm install

# Copy and configure environment variables
cp .env.local.example .env.local
# Fill in your Supabase, Razorpay, and other credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

---

## ⚙️ Environment Setup

### 1. Supabase Setup
1. Go to [supabase.com](https://supabase.com) and create a free project
2. Go to **Settings → API** and copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`
3. Go to **SQL Editor** and run the schema from `supabase/schema.sql`
4. Run `supabase/seed.sql` to add the 10 launch products

### 2. Razorpay Setup
1. Create account at [razorpay.com](https://razorpay.com)
2. Go to **Settings → API Keys** and generate keys
3. Add to `.env.local`:
   - `RAZORPAY_KEY_ID=rzp_test_...`
   - `RAZORPAY_KEY_SECRET=...`
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_...`

### 3. Email Setup (Optional)
1. Create free account at [resend.com](https://resend.com)
2. Add your domain or use their testing domain
3. Add `RESEND_API_KEY` to `.env.local`

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage
│   ├── shop/               # Shop page
│   ├── products/[slug]/    # Product detail pages
│   ├── cart/               # Cart page
│   ├── checkout/           # Checkout
│   ├── order-confirmation/ # Order success
│   ├── about/              # About Us
│   ├── contact/            # Contact
│   ├── faq/                # FAQs
│   ├── admin/              # Admin dashboard
│   └── api/                # API routes
├── components/
│   ├── layout/             # Header, Footer, CartDrawer
│   ├── home/               # Homepage sections
│   ├── ui/                 # ProductCard, Button, etc.
│   └── admin/              # Admin layout
├── context/
│   └── CartContext.tsx     # Cart state management
└── lib/
    ├── products.ts         # Product data
    └── supabase/           # Supabase clients
```

---

## 🛒 Features

- ✅ 10 premium NONG spice products
- ✅ Dynamic product detail pages with SEO
- ✅ Cart with localStorage persistence
- ✅ Shipping logic (free above ₹499)
- ✅ Coupon code support
- ✅ One-page checkout
- ✅ COD + Razorpay payment options
- ✅ Order confirmation flow
- ✅ Admin dashboard
- ✅ Newsletter lead capture
- ✅ SEO: sitemap, robots.txt, meta tags, OG tags
- ✅ Mobile-first responsive design
- ✅ Parchment + brush stroke design aesthetic

---

## 🎨 Brand

- **Colors:** Parchment `#F5EDD8`, Crimson `#8B1A1A`, Saffron `#E8721C`, Turmeric `#D4A017`
- **Fonts:** Playfair Display (headings) + Inter (body)
- **Style:** Warm parchment texture, brush stroke accents

---

## 🚀 Deployment (Vercel)

1. Push code to GitHub
2. Import project at [vercel.com](https://vercel.com)
3. Add all environment variables from `.env.local.example`
4. Deploy!

---

## 🔑 Admin Dashboard

URL: `/admin`
Default credentials (change before launch!):
- Email: `admin@vrajaspice.in`
- Password: `admin123`

---

## 📞 Support

WhatsApp: +91 91215 52086  
Email: hello@vrajaspice.in

---

*Made with ❤️ in India*
