import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { products as staticProducts, Product } from "@/lib/products";

// ── Supabase server client (uses env vars directly — safe for server-only route) ──
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

function mapDbRowToProduct(row: any): Product {
  return {
    id: Number(row.id),
    slug: row.slug,
    name: row.name,
    shortDescription: row.short_description || "",
    description: row.description || "",
    ingredients: row.ingredients || "",
    weight: row.weight || "100g",
    sellingPrice: Number(row.selling_price),
    mrp: Number(row.mrp),
    stockQuantity: Number(row.stock_quantity),
    featured: !!row.featured,
    badge: row.badge,
    imageUrl: row.image_url || "/placeholder.png",
    category: row.category || "everyday",
    benefits: row.benefits || [],
    usageSuggestions: row.usage_suggestions || [],
    faqs: row.faqs || [],
    isActive: row.is_active !== undefined ? !!row.is_active : true,
  };
}

// ── Fetch live products from Supabase, fallback to static list ─────────────
async function fetchLiveProducts(): Promise<Product[]> {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("id", { ascending: true });

    if (error || !data || data.length === 0) {
      console.warn("[Chat] Supabase fetch failed — falling back to static products:", error?.message);
      return staticProducts.filter((p) => p.isActive !== false);
    }

    return data.map(mapDbRowToProduct);
  } catch (err) {
    console.warn("[Chat] Supabase error — using static fallback:", err);
    return staticProducts.filter((p) => p.isActive !== false);
  }
}

// ── Build LLM-readable product catalog ────────────────────────────────────
function buildProductCatalog(productList: Product[]): string {
  return productList
    .map((p) => {
      const lines = [
        `Product: ${p.name}`,
        `  Slug: ${p.slug}`,
        `  Category: ${p.category}`,
        `  Price: ₹${p.sellingPrice} (MRP ₹${p.mrp})`,
        `  Weight: ${p.weight}`,
        `  Description: ${p.shortDescription}`,
        `  Ingredients: ${p.ingredients}`,
      ];
      if (p.usageSuggestions?.length) {
        lines.push(`  Best for: ${p.usageSuggestions.slice(0, 3).join("; ")}`);
      }
      if (p.benefits?.length) {
        lines.push(`  Benefits: ${p.benefits.slice(0, 2).join("; ")}`);
      }
      if (p.badge) {
        lines.push(`  Badge: ${p.badge}`);
      }
      return lines.join("\n");
    })
    .join("\n\n");
}

// ── System prompt builder (called fresh per request with live catalog) ─────
function buildSystemPrompt(catalog: string): string {
  return `You are "Vraja", a warm and knowledgeable spice assistant for Vrajaspice — a premium Indian spice brand specialising in No Onion No Garlic (NONG) masala blends crafted for satvik, Jain, ISKCON, and Vaishnav cooking.

Your role:
- Help users find the RIGHT Vrajaspice product for their cooking needs
- Ask friendly follow-up questions when needed (e.g., "What are you cooking?", "Do you prefer mild or bold flavours?")
- Recommend 1-3 products maximum per response — don't overwhelm users
- Be concise, friendly, and enthusiastic about spices
- Always mention the price and a key benefit when recommending
- If users ask about non-spice topics, gently steer back to cooking and products
- Use emojis sparingly but warmly (1-2 per message max)
- When recommending a product, always format it like:
  **[Product Name]** (₹X) — [1-line reason why it suits their need]

CRITICAL RULES:
- ONLY recommend products that exist in the catalog below — NEVER make up or invent products
- Read the catalog CAREFULLY — match products by their name, description, and ingredients
- If the user asks for "noodles", look for a noodle-related product in the catalog first
- All products are NONG (No Onion No Garlic) — always highlight this
- If a user's request doesn't match any product, say so honestly and suggest the closest available option
- Keep responses under 150 words unless the user explicitly asks for details

VRAJASPICE LIVE PRODUCT CATALOG (${catalog.split("Product:").length - 1} products):
${catalog}

Always match the user's cooking intent to the MOST RELEVANT product in this catalog first before suggesting alternatives.`;
}

// ── POST handler ───────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Always fetch fresh products so the AI knows about newly added items
    const liveProducts = await fetchLiveProducts();
    const catalog = buildProductCatalog(liveProducts);
    const systemPrompt = buildSystemPrompt(catalog);

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages,
          ],
          max_tokens: 400,
          temperature: 0.5,
          stream: false,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API error:", errorText);
      return NextResponse.json(
        { error: "AI service unavailable. Please try again." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const reply =
      data.choices?.[0]?.message?.content ??
      "Sorry, I couldn't understand that. Could you rephrase?";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
